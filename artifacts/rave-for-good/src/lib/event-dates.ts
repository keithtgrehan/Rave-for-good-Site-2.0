export const EVENT_TIME_ZONE = "Europe/Berlin";

export type SingleDayDateOnlyEvent = {
  date: string;
  endDate?: never;
  endsAt?: never;
};

export type MultiDayDateOnlyEvent = {
  date: string;
  endDate: string;
  endsAt?: never;
};

export type ExplicitlyTimedEvent = {
  date: string;
  endDate?: never;
  endsAt: string;
};

export type EventDateRecord =
  | SingleDayDateOnlyEvent
  | MultiDayDateOnlyEvent
  | ExplicitlyTimedEvent;

export type EventStatus = "upcoming" | "past";

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseDateParts(date: string) {
  const match = ISO_DATE_PATTERN.exec(date);

  if (!match) {
    throw new RangeError(`Invalid calendar date: "${date}"`);
  }

  const [, rawYear, rawMonth, rawDay] = match;
  const year = Number(rawYear);
  const month = Number(rawMonth);
  const day = Number(rawDay);
  const validationDate = new Date(Date.UTC(year, month - 1, day, 12));

  if (
    validationDate.getUTCFullYear() !== year ||
    validationDate.getUTCMonth() !== month - 1 ||
    validationDate.getUTCDate() !== day
  ) {
    throw new RangeError(`Invalid calendar date: "${date}"`);
  }

  return { year, month, day };
}

function datePartsToKey(parts: { year: number; month: number; day: number }) {
  return [
    String(parts.year).padStart(4, "0"),
    String(parts.month).padStart(2, "0"),
    String(parts.day).padStart(2, "0"),
  ].join("-");
}

export function berlinDateKey(now: Date = new Date()) {
  if (Number.isNaN(now.getTime())) {
    throw new RangeError("Cannot derive a Berlin date from an invalid clock");
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: EVENT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type === "year" || part.type === "month" || part.type === "day")
      .map((part) => [part.type, Number(part.value)]),
  ) as { year: number; month: number; day: number };

  return datePartsToKey(values);
}

export function formatEventDate(
  date: string,
  locale = "en-GB",
  options: Intl.DateTimeFormatOptions = {},
) {
  const { year, month, day } = parseDateParts(date);
  const stableInstant = new Date(Date.UTC(year, month - 1, day, 12));

  return new Intl.DateTimeFormat(locale, {
    timeZone: EVENT_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(stableInstant);
}

export function getEventStatus(
  event: EventDateRecord,
  now: Date = new Date(),
): EventStatus {
  if (event.endDate !== undefined && event.endsAt !== undefined) {
    throw new RangeError("Event records cannot define both endDate and endsAt");
  }

  parseDateParts(event.date);

  if (event.endDate) {
    parseDateParts(event.endDate);

    if (event.endDate < event.date) {
      throw new RangeError(`Event endDate "${event.endDate}" cannot be before start date "${event.date}"`);
    }
  }

  if (Number.isNaN(now.getTime())) {
    throw new RangeError("Cannot determine event status from an invalid clock");
  }

  if (event.endsAt) {
    const end = new Date(event.endsAt);

    if (Number.isNaN(end.getTime())) {
      throw new RangeError(`Invalid event endsAt value: "${event.endsAt}"`);
    }

    return now.getTime() >= end.getTime() ? "past" : "upcoming";
  }

  const finalCalendarDate = event.endDate ?? event.date;
  return finalCalendarDate < berlinDateKey(now) ? "past" : "upcoming";
}

export function partitionEvents<T extends EventDateRecord>(
  records: readonly T[],
  now: Date = new Date(),
) {
  const upcoming = records
    .filter((event) => getEventStatus(event, now) === "upcoming")
    .sort((left, right) => left.date.localeCompare(right.date));
  const past = records
    .filter((event) => getEventStatus(event, now) === "past")
    .sort((left, right) => right.date.localeCompare(left.date));

  return { upcoming, past };
}
