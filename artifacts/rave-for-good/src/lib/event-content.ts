import type { Event } from "../data/events";
import type { EventLocale } from "../data/event-localizations";
import { formatEventDate } from "./event-dates";

const ENGLISH_NUMBER_WORDS: Record<number, string> = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
};

function requireDuration(event: Event) {
  if (!event.durationHours) throw new RangeError(`Event "${event.id}" is missing durationHours`);
  return event.durationHours;
}

function requireMusicProgramme(event: Event) {
  if (!event.musicProgramme?.throughout || !event.musicProgramme.includesDjs) {
    throw new RangeError(`Event "${event.id}" is missing the confirmed throughout-DJ programme`);
  }
}

export function cleanupFormatDescription(event: Event, locale: EventLocale) {
  const duration = requireDuration(event);
  requireMusicProgramme(event);

  if (locale === "de") {
    return duration === 6
      ? "eine sechsstündige mobile Aufräumaktion mit Musik und DJs während der gesamten Aktion"
      : `eine ${duration}-stündige mobile Aufräumaktion mit Musik und DJs während der gesamten Aktion`;
  }

  const durationLabel = ENGLISH_NUMBER_WORDS[duration] ?? String(duration);
  return `a ${durationLabel}-hour moving cleanup with music and DJs throughout`;
}

export function cleanupFormatDescriptionGermanDative(event: Event) {
  const duration = requireDuration(event);
  requireMusicProgramme(event);

  return duration === 6
    ? "einer sechsstündigen mobilen Aufräumaktion mit Musik und DJs während der gesamten Aktion"
    : `einer ${duration}-stündigen mobilen Aufräumaktion mit Musik und DJs während der gesamten Aktion`;
}

export type EventLogisticsRow = {
  key: "time" | "meetingPoint" | "route";
  label: string;
  value: string;
};

export function eventLogisticsRows(event: Event, locale: EventLocale): EventLogisticsRow[] {
  const logistics = event.logistics;
  if (!logistics) return [];

  const german = locale === "de";
  const timeValue = logistics.time === "tbc"
    ? german ? "Genaue Uhrzeit: Wird noch bekannt gegeben" : "Exact time: To be confirmed"
    : event.startTime && event.endTime
      ? `${event.startTime}–${event.endTime}`
      : event.startTime ?? "";
  const meetingPointValue = logistics.meetingPoint === "tbc"
    ? german ? "Treffpunkt: Wird noch bekannt gegeben" : "Meeting point: To be confirmed"
    : event.startLocation ?? event.venue ?? "";
  const routeValue = logistics.route === "tbc"
    ? german ? "Routendetails werden in Kürze veröffentlicht" : "Route details will be published shortly"
    : event.route ?? [event.startLocation, event.endLocation].filter(Boolean).join(" → ");

  return [
    { key: "time", label: german ? "Uhrzeit" : "Time", value: timeValue },
    { key: "meetingPoint", label: german ? "Treffpunkt" : "Meeting point", value: meetingPointValue },
    { key: "route", label: "Route", value: routeValue },
  ];
}

export function cleanupParticipationSubject(event: Event, locale: EventLocale) {
  const date = formatEventDate(event.date, locale === "de" ? "de-DE" : "en-GB", {
    weekday: undefined,
  });
  return locale === "de" ? `Aufräumaktion am ${date}` : `${date} cleanup`;
}
