import { useEffect, useId, useState } from "react"
import { getHubSpotEmbedScriptSource, getHubSpotForm, type HubSpotFormKey, hubspotConfig } from "@/lib/hubspot"

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string
          portalId: string
          formId: string
          target: string
        }) => void
      }
    }
  }
}

const scriptLoads = new Map<string, Promise<void>>()

function loadHubSpotScript(src: string) {
  const existingPromise = scriptLoads.get(src)

  if (existingPromise) {
    return existingPromise
  }

  const promise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)

    if (existingScript) {
      if (window.hbspt) {
        resolve()
        return
      }

      existingScript.addEventListener("load", () => resolve(), { once: true })
      existingScript.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.body.appendChild(script)
  })

  scriptLoads.set(src, promise)
  return promise
}

type HubSpotFormEmbedProps = {
  formKey: HubSpotFormKey
}

export function HubSpotFormEmbed({ formKey }: HubSpotFormEmbedProps) {
  const form = getHubSpotForm(formKey)
  const generatedId = useId().replace(/:/g, "")
  const targetId = `hubspot-form-${formKey}-${generatedId}`
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const target = document.getElementById(targetId)

    if (!target) {
      return
    }

    let cancelled = false
    setHasError(false)
    target.innerHTML = ""

    loadHubSpotScript(getHubSpotEmbedScriptSource(hubspotConfig.region))
      .then(() => {
        if (cancelled || !window.hbspt) {
          return
        }

        target.innerHTML = ""
        window.hbspt.forms.create({
          region: hubspotConfig.region,
          portalId: hubspotConfig.portalId,
          formId: form.id,
          target: `#${targetId}`,
        })
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true)
        }
      })

    return () => {
      cancelled = true

      if (target) {
        target.innerHTML = ""
      }
    }
  }, [form.id, targetId])

  return (
    <div className="space-y-4">
      <div id={targetId} data-testid={`hubspot-form-${formKey}`} />
      {hasError ? (
        <p className="text-sm text-foreground/50 font-light" data-testid="hubspot-form-fallback">
          The form could not be loaded right now. Please email hello@raveforgood.berlin and we will help directly.
        </p>
      ) : null}
    </div>
  )
}
