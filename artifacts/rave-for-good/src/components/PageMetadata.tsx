import { useEffect } from "react";
import { useLocation } from "wouter";
import { DEFAULT_OPEN_GRAPH_IMAGE, absoluteUrl, routeMetadataForPath } from "@/data/route-manifest";

function setManagedMeta(key: "name" | "property", value: string, content: string) {
  const selector = `meta[${key}="${value}"]`;
  const matches = Array.from(document.head.querySelectorAll<HTMLMetaElement>(selector));
  const element = matches.shift() ?? document.createElement("meta");

  matches.forEach((duplicate) => duplicate.remove());
  element.setAttribute(key, value);
  element.content = content;
  element.dataset.rfgManaged = "true";
  if (!element.isConnected) document.head.appendChild(element);
}

function removeManagedMeta(key: "name" | "property", value: string) {
  document.head.querySelectorAll(`meta[${key}="${value}"]`).forEach((element) => element.remove());
}

function setManagedLink(rel: string, href: string, hrefLang?: string) {
  const selector = hrefLang ? `link[rel="${rel}"][hreflang="${hrefLang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  const matches = Array.from(document.head.querySelectorAll<HTMLLinkElement>(selector));
  const element = matches.shift() ?? document.createElement("link");

  matches.forEach((duplicate) => duplicate.remove());
  element.rel = rel;
  element.href = href;
  if (hrefLang) element.hreflang = hrefLang;
  element.dataset.rfgManaged = "true";
  if (!element.isConnected) document.head.appendChild(element);
}

function removeManagedLink(rel: string) {
  document.head.querySelectorAll(`link[rel="${rel}"]`).forEach((element) => element.remove());
}

export function metadataStateForPath(location: string) {
  const metadata = routeMetadataForPath(location);
  const isKnown = Boolean(metadata);
  const title = metadata?.title ?? "Page Not Found | Rave for Good";
  const description = metadata?.description ?? "The requested Rave for Good page could not be found.";

  return {
    title,
    description,
    lang: metadata?.lang ?? "en",
    robots: isKnown && metadata?.indexable ? "index,follow" : "noindex,follow",
    canonicalUrl: metadata ? absoluteUrl(metadata.path) : null,
    imageUrl: absoluteUrl(metadata?.image ?? DEFAULT_OPEN_GRAPH_IMAGE),
    locale: metadata?.lang === "de" ? "de_DE" : "en_GB",
    alternates: metadata?.alternates ?? [],
  } as const;
}

export function PageMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const state = metadataStateForPath(location);

    document.title = state.title;
    document.documentElement.lang = state.lang;
    setManagedMeta("name", "description", state.description);
    setManagedMeta("name", "robots", state.robots);
    setManagedMeta("property", "og:title", state.title);
    setManagedMeta("property", "og:description", state.description);
    if (state.canonicalUrl) {
      setManagedMeta("property", "og:url", state.canonicalUrl);
    } else {
      removeManagedMeta("property", "og:url");
    }
    setManagedMeta("property", "og:type", "website");
    setManagedMeta("property", "og:image", state.imageUrl);
    setManagedMeta("property", "og:locale", state.locale);
    setManagedMeta("name", "twitter:card", "summary_large_image");
    setManagedMeta("name", "twitter:title", state.title);
    setManagedMeta("name", "twitter:description", state.description);
    setManagedMeta("name", "twitter:image", state.imageUrl);
    if (state.canonicalUrl) {
      setManagedLink("canonical", state.canonicalUrl);
    } else {
      removeManagedLink("canonical");
    }

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
    state.alternates.forEach((alternate) => {
      setManagedLink("alternate", absoluteUrl(alternate.path), alternate.hrefLang);
    });
  }, [location]);

  return null;
}
