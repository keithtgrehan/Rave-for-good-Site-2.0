import type { Event } from "./events";

export type EventLocale = "en" | "de";

export type LocalizedEventCopy = Pick<Event, "title" | "description" | "imageAlt">;

const germanEventCopy: Record<string, LocalizedEventCopy> = {
  "rave-for-good-cleanup-2026-08-16": {
    title: "Rave for Good Aufräumaktion",
    description:
      "Eine mobile Gemeinschaftsaktion, die Berlins elektronische Musikszene für konkretes Engagement im öffentlichen Raum zusammenbringt.",
    imageAlt: "Freiwillige von Rave for Good bei einer Aufräumaktion in Berlin",
  },
  "trash-pickup-2026-07-19": {
    title: "Aufräumaktion im Juli",
    description:
      "Eine gemeinschaftliche Aufräumaktion im Park, bei der Freiwillige, lokale Artists und Berlins Musikszene gemeinsam Verantwortung für den öffentlichen Raum übernahmen.",
    imageAlt: "Freiwillige von Rave for Good reinigen gemeinsam einen öffentlichen Raum in Berlin",
  },
  "berlin-park-cleanup-2026-06-14": {
    title: "Berliner Park-Aufräumaktion",
    description:
      "Eine Berliner Gemeinschaftsaktion, bei der Freiwillige, Artists, Raver und Menschen aus der Nachbarschaft gemeinsam öffentliche Räume pflegten.",
    imageAlt: "Freiwillige von Rave for Good bei einer Park-Aufräumaktion in Berlin",
  },
};

export function localizeEvent(event: Event, locale: EventLocale): Event & LocalizedEventCopy {
  if (locale === "en") return event;

  const localized = germanEventCopy[event.id];
  if (!localized) {
    throw new RangeError(`Missing German event localization for "${event.id}"`);
  }

  return { ...event, ...localized };
}

export function hasEventLocalization(eventId: string, locale: EventLocale) {
  return locale === "en" || Boolean(germanEventCopy[eventId]);
}
