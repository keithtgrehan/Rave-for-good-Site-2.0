import { events, type Event } from "./events";
import { cleanupFormatDescription, cleanupFormatDescriptionGermanDative } from "../lib/event-content";
import { formatEventDate } from "../lib/event-dates";

export const SITE_URL = "https://www.raveforgood.berlin";
export const DEFAULT_OPEN_GRAPH_IMAGE = "/opengraph.jpg";

export type RouteAlternate = {
  hrefLang: "en" | "de" | "x-default";
  path: string;
};

export type RouteMetadata = {
  path: string;
  title: string;
  description: string;
  lang: "en" | "de";
  image?: string;
  indexable: boolean;
  alternates?: RouteAlternate[];
};

const cleanupAlternates: RouteAlternate[] = [
  { hrefLang: "en", path: "/park-cleanup" },
  { hrefLang: "de", path: "/de/park-cleanup" },
  { hrefLang: "x-default", path: "/park-cleanup" },
];

const partnerAlternates: RouteAlternate[] = [
  { hrefLang: "en", path: "/partners" },
  { hrefLang: "de", path: "/de/partners" },
  { hrefLang: "x-default", path: "/partners" },
];

export function createCanonicalRoutes(eventRecords: readonly Event[] = events): RouteMetadata[] {
  const augustCleanup = eventRecords.find((event) => event.id === "rave-for-good-cleanup-2026-08-16");
  const juneCleanup = eventRecords.find((event) => event.id === "berlin-park-cleanup-2026-06-14");
  const novaEvent = eventRecords.find((event) => event.id === "rfg-nova");

  if (!augustCleanup || !juneCleanup?.volunteerCount || !novaEvent) {
    throw new Error("Required cleanup metadata records are missing");
  }

  const augustDateEnglish = formatEventDate(augustCleanup.date, "en-GB");
  const augustDateGerman = formatEventDate(augustCleanup.date, "de-DE");
  const augustFormatEnglish = cleanupFormatDescription(augustCleanup, "en");
  const augustFormatGermanDative = cleanupFormatDescriptionGermanDative(augustCleanup);
  const juneDateEnglish = formatEventDate(juneCleanup.date, "en-GB");

  return [
  {
    path: "/",
    title: "Rave for Good | Berlin Music and Community Action",
    description: "Rave for Good connects Berlin’s electronic music culture with fundraising, community cleanups and practical social action.",
    lang: "en",
    indexable: true,
  },
  {
    path: "/about",
    title: "About Rave for Good | Story and Governance",
    description: "Learn how Rave for Good brings music, community participation and transparent social action together in Berlin.",
    lang: "en",
    image: "/images/team.jpg",
    indexable: true,
  },
  {
    path: "/upcoming-events",
    title: "Events | Rave for Good Berlin",
    description: `See the next Rave for Good cleanup on ${augustDateEnglish} and browse the complete community and music event archive.`,
    lang: "en",
    image: augustCleanup.image,
    indexable: true,
  },
  {
    path: "/upcoming-events/rfg-nova",
    title: `${novaEvent.title.replace("@", "at")} | Rave for Good Event Archive`,
    description: `Archive details and imagery from ${novaEvent.title} at the NOVUM electronic music gathering in ${novaEvent.city}.`,
    lang: "en",
    image: novaEvent.image,
    indexable: true,
  },
  {
    path: "/park-cleanup",
    title: "Cleanup Collective | Rave for Good Berlin",
    description: `Join ${augustFormatEnglish} on ${augustDateEnglish}.`,
    lang: "en",
    image: augustCleanup.image,
    indexable: true,
    alternates: cleanupAlternates,
  },
  {
    path: "/de/park-cleanup",
    title: "Cleanup Collective Berlin | Rave for Good",
    description: `Mach am ${augustDateGerman} bei ${augustFormatGermanDative} mit.`,
    lang: "de",
    image: augustCleanup.image,
    indexable: true,
    alternates: cleanupAlternates,
  },
  {
    path: "/berlin-park-cleanup",
    title: `${juneCleanup.title} Archive | Rave for Good`,
    description: `Archive of the Rave for Good Berlin Park Cleanup held on ${juneDateEnglish} with ${juneCleanup.volunteerCount} volunteers.`,
    lang: "en",
    image: juneCleanup.image,
    indexable: true,
  },
  {
    path: "/crew-radio",
    title: "Crew Radio | Rave for Good",
    description: "Listen to sounds from the Rave for Good extended electronic music community.",
    lang: "en",
    indexable: true,
  },
  {
    path: "/artists",
    title: "Artists | Rave for Good",
    description: "Discover artists connected with the Rave for Good electronic music community.",
    lang: "en",
    indexable: true,
  },
  {
    path: "/impact",
    title: "Impact and Project Evidence | Rave for Good",
    description: "Explore verified Rave for Good cleanup participation, social projects, outcomes and available evidence.",
    lang: "en",
    image: "/images/zigla-pakala-well-1.jpg",
    indexable: true,
  },
  {
    path: "/partners",
    title: "Partner With Rave for Good | Berlin",
    description: "Learn how environmental organisations and Rave for Good can combine expertise, community reach and clear responsibilities.",
    lang: "en",
    indexable: true,
    alternates: partnerAlternates,
  },
  {
    path: "/de/partners",
    title: "Kooperationen | Rave for Good Berlin",
    description: "Erfahre, wie Umweltorganisationen und Rave for Good Fachwissen, Community-Reichweite und klare Rollen verbinden können.",
    lang: "de",
    indexable: true,
    alternates: partnerAlternates,
  },
  {
    path: "/get-involved",
    title: "Get Involved | Rave for Good",
    description: "Attend events, volunteer, donate or support Rave for Good community action in Berlin.",
    lang: "en",
    indexable: true,
  },
  {
    path: "/contact",
    title: "Contact Rave for Good | Berlin",
    description: "Contact Rave for Good about participation, press, bookings and general coordination.",
    lang: "en",
    indexable: true,
  },
  {
    path: "/transparency",
    title: "Transparency and Governance | Rave for Good",
    description: "Find verified Rave for Good governance information, public documents and project evidence as it becomes available.",
    lang: "en",
    indexable: true,
  },
  {
    path: "/impressum",
    title: "Impressum | Rave for Good e.V.",
    description: "Impressum und Anbieterkennzeichnung von Rave for Good e.V. in Berlin.",
    lang: "de",
    indexable: true,
  },
  {
    path: "/datenschutz",
    title: "Datenschutz | Rave for Good e.V.",
    description: "Datenschutzerklärung von Rave for Good e.V. mit Informationen zu Hosting, Kontakt und Spenden.",
    lang: "de",
    indexable: true,
  },
  ];
}

export const canonicalRoutes = createCanonicalRoutes();

export function routeMetadataForPath(pathname: string) {
  const normalized = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  return canonicalRoutes.find((route) => route.path === normalized);
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
