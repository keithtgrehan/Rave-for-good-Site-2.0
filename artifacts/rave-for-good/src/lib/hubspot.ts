import hubspotFormsConfig from "../../../../config/hubspot.forms.json"

export type HubSpotFormKey = keyof typeof hubspotFormsConfig.forms

export type HubSpotFormConfig = (typeof hubspotFormsConfig.forms)[HubSpotFormKey]

export const hubspotConfig = hubspotFormsConfig

export function isHubSpotFormKey(value: string | null | undefined): value is HubSpotFormKey {
  return typeof value === "string" && value in hubspotFormsConfig.forms
}

export function getHubSpotForm(key: HubSpotFormKey) {
  return hubspotFormsConfig.forms[key]
}

export function getHubSpotFormDestination(key: HubSpotFormKey) {
  return getHubSpotForm(key).destinationPath
}

export function getHubSpotEmbedScriptSource(region = hubspotFormsConfig.region) {
  return `https://js-${region}.hsforms.net/forms/embed/v2.js`
}
