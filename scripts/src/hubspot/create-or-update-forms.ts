import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

type HubSpotFormKey = "contact" | "volunteer" | "partner"

type HubSpotFormField = {
  objectTypeId: "0-1"
  name: string
  label: string
  required: boolean
  hidden: false
  fieldType: "single_line_text" | "email"
  validation?: {
    blockedEmailDomains: string[]
    useDefaultBlockList: boolean
  }
}

type HubSpotFormResponse = {
  id: string
  name: string
  formType: string
  createdAt: string
  updatedAt: string
  archived: boolean
  displayOptions?: {
    submitButtonText?: string
  }
}

type HubSpotFormsConfig = {
  portalId: string
  region: string
  syncedAt: string
  forms: Record<
    HubSpotFormKey,
    {
      name: string
      id: string
      formType: string
      destinationPath: string
      createdAt: string
      updatedAt: string
      submitButtonText: string
    }
  >
}

const FORM_SPECS: Record<
  HubSpotFormKey,
  {
    name: string
    destinationPath: string
    submitButtonText: string
    thankYouMessage: string
    fields: HubSpotFormField[]
  }
> = {
  contact: {
    name: "Contact",
    destinationPath: "/contact?form=contact",
    submitButtonText: "Send inquiry",
    thankYouMessage: "Thank you for your message. We'll get back to you soon.",
    fields: [
      { objectTypeId: "0-1", name: "firstname", label: "First Name", required: true, hidden: false, fieldType: "single_line_text" },
      { objectTypeId: "0-1", name: "lastname", label: "Last Name", required: false, hidden: false, fieldType: "single_line_text" },
      {
        objectTypeId: "0-1",
        name: "email",
        label: "Email",
        required: true,
        hidden: false,
        fieldType: "email",
        validation: { blockedEmailDomains: [], useDefaultBlockList: false },
      },
    ],
  },
  volunteer: {
    name: "Volunteer",
    destinationPath: "/contact?form=volunteer",
    submitButtonText: "Apply",
    thankYouMessage: "Thanks for volunteering. We'll follow up with next steps.",
    fields: [
      { objectTypeId: "0-1", name: "firstname", label: "First Name", required: true, hidden: false, fieldType: "single_line_text" },
      { objectTypeId: "0-1", name: "lastname", label: "Last Name", required: false, hidden: false, fieldType: "single_line_text" },
      {
        objectTypeId: "0-1",
        name: "email",
        label: "Email",
        required: true,
        hidden: false,
        fieldType: "email",
        validation: { blockedEmailDomains: [], useDefaultBlockList: false },
      },
    ],
  },
  partner: {
    name: "Partner",
    destinationPath: "/contact?form=partner",
    submitButtonText: "Share details",
    thankYouMessage: "Thanks for reaching out. We'll review your partnership idea and reply soon.",
    fields: [
      { objectTypeId: "0-1", name: "firstname", label: "First Name", required: true, hidden: false, fieldType: "single_line_text" },
      { objectTypeId: "0-1", name: "lastname", label: "Last Name", required: false, hidden: false, fieldType: "single_line_text" },
      {
        objectTypeId: "0-1",
        name: "email",
        label: "Email",
        required: true,
        hidden: false,
        fieldType: "email",
        validation: { blockedEmailDomains: [], useDefaultBlockList: false },
      },
      { objectTypeId: "0-1", name: "company", label: "Company", required: false, hidden: false, fieldType: "single_line_text" },
      { objectTypeId: "0-1", name: "website", label: "Website", required: false, hidden: false, fieldType: "single_line_text" },
    ],
  },
}

const currentFilePath = fileURLToPath(import.meta.url)
const repoRoot = path.resolve(path.dirname(currentFilePath), "..", "..", "..")
const envFilePath = path.join(repoRoot, ".env.local")
const configDirectoryPath = path.join(repoRoot, "config")
const configFilePath = path.join(configDirectoryPath, "hubspot.forms.json")

async function main() {
  // Future Codex usage:
  // 1. Update FORM_SPECS below when form fields or labels change.
  // 2. Run `pnpm --filter @workspace/scripts exec tsx src/hubspot/create-or-update-forms.ts` from the repo root.
  // 3. Commit the refreshed config file alongside any CTA or page updates.
  const envValues = await readDotEnvFile(envFilePath)
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN ?? envValues.HUBSPOT_PRIVATE_APP_TOKEN
  const portalId = process.env.HUBSPOT_PORTAL_ID ?? envValues.HUBSPOT_PORTAL_ID

  if (!token) {
    throw new Error("HUBSPOT_PRIVATE_APP_TOKEN is required in process.env or .env.local")
  }

  if (!portalId) {
    throw new Error("HUBSPOT_PORTAL_ID is required in process.env or .env.local")
  }

  const accountDetails = await hubSpotRequest<{ dataHostingLocation?: string }>(
    token,
    "https://api.hubapi.com/account-info/v3/details",
  )
  const region = accountDetails.dataHostingLocation ?? "na1"
  const existingForms = await listAllForms(token)

  const results = await Promise.all(
    (Object.entries(FORM_SPECS) as [HubSpotFormKey, (typeof FORM_SPECS)[HubSpotFormKey]][]).map(async ([key, spec]) => {
      const existingForm = existingForms.find((form) => form.name === spec.name && !form.archived)

      if (existingForm) {
        return { key, status: "found" as const, form: existingForm }
      }

      const createdForm = await createForm(token, spec)
      return { key, status: "created" as const, form: createdForm }
    }),
  )

  const config: HubSpotFormsConfig = {
    portalId,
    region,
    syncedAt: new Date().toISOString(),
    forms: {
      contact: mapFormConfig("contact", results),
      volunteer: mapFormConfig("volunteer", results),
      partner: mapFormConfig("partner", results),
    },
  }

  await mkdir(configDirectoryPath, { recursive: true })
  await writeFile(configFilePath, `${JSON.stringify(config, null, 2)}\n`, "utf8")

  console.log(
    JSON.stringify(
      {
        portalId,
        region,
        configFilePath,
        forms: results.map(({ key, status, form }) => ({
          key,
          name: form.name,
          id: form.id,
          status,
          createdAt: form.createdAt,
          updatedAt: form.updatedAt,
        })),
      },
      null,
      2,
    ),
  )
}

function mapFormConfig(
  key: HubSpotFormKey,
  results: Array<{ key: HubSpotFormKey; status: "found" | "created"; form: HubSpotFormResponse }>,
) {
  const match = results.find((result) => result.key === key)

  if (!match) {
    throw new Error(`Missing HubSpot result for form key "${key}"`)
  }

  const spec = FORM_SPECS[key]

  return {
    name: match.form.name,
    id: match.form.id,
    formType: match.form.formType,
    destinationPath: spec.destinationPath,
    createdAt: match.form.createdAt,
    updatedAt: match.form.updatedAt,
    submitButtonText: match.form.displayOptions?.submitButtonText ?? spec.submitButtonText,
  }
}

async function listAllForms(token: string) {
  const forms: HubSpotFormResponse[] = []
  let nextUrl = "https://api.hubapi.com/marketing/v3/forms?limit=100"

  while (nextUrl) {
    const page = await hubSpotRequest<{
      results?: HubSpotFormResponse[]
      paging?: { next?: { link?: string; after?: string } }
    }>(token, nextUrl)

    forms.push(...(page.results ?? []))

    if (page.paging?.next?.link) {
      nextUrl = page.paging.next.link
      continue
    }

    if (page.paging?.next?.after) {
      const url = new URL("https://api.hubapi.com/marketing/v3/forms")
      url.searchParams.set("limit", "100")
      url.searchParams.set("after", page.paging.next.after)
      nextUrl = url.toString()
      continue
    }

    nextUrl = ""
  }

  return forms
}

async function createForm(
  token: string,
  spec: (typeof FORM_SPECS)[HubSpotFormKey],
) {
  const now = new Date().toISOString()
  const payload = {
    name: spec.name,
    formType: "hubspot",
    createdAt: now,
    updatedAt: now,
    archived: false,
    fieldGroups: spec.fields.map((field) => ({
      groupType: "default_group",
      richTextType: "text",
      fields: [field],
    })),
    configuration: {
      language: "en",
      cloneable: true,
      editable: true,
      archivable: true,
      recaptchaEnabled: false,
      notifyContactOwner: false,
      createNewContactForNewEmail: false,
      prePopulateKnownValues: true,
      allowLinkToResetKnownValues: false,
      postSubmitAction: {
        type: "thank_you",
        value: spec.thankYouMessage,
      },
      embedType: "V3",
    },
    displayOptions: {
      renderRawHtml: false,
      theme: "default_style",
      submitButtonText: spec.submitButtonText,
      cssClass: null,
    },
    legalConsentOptions: {
      type: "none",
    },
  }

  return hubSpotRequest<HubSpotFormResponse>(token, "https://api.hubapi.com/marketing/v3/forms", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

async function hubSpotRequest<T>(token: string, url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`HubSpot request failed (${response.status}): ${errorBody}`)
  }

  return (await response.json()) as T
}

async function readDotEnvFile(filePath: string) {
  try {
    const fileContents = await readFile(filePath, "utf8")
    return Object.fromEntries(
      fileContents
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => {
          const separatorIndex = line.indexOf("=")

          if (separatorIndex === -1) {
            return [line, ""]
          }

          const key = line.slice(0, separatorIndex).trim()
          const rawValue = line.slice(separatorIndex + 1).trim()
          const value = rawValue.replace(/^['"]|['"]$/g, "")

          return [key, value]
        }),
    )
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return {}
    }

    throw error
  }
}

await main()
