import type { EventDateRecord } from "../lib/event-dates";

const singleDayDateOnly = {
  date: "2026-08-16",
} satisfies EventDateRecord;

const multiDayDateOnly = {
  date: "2026-06-26",
  endDate: "2026-06-29",
} satisfies EventDateRecord;

const explicitlyTimed = {
  date: "2026-07-19",
  endsAt: "2026-07-19T20:00:00+02:00",
} satisfies EventDateRecord;

// @ts-expect-error endDate and endsAt are intentionally mutually exclusive.
const conflictingEndValues: EventDateRecord = {
  date: "2026-07-19",
  endDate: "2026-07-20",
  endsAt: "2026-07-19T20:00:00+02:00",
};

void [singleDayDateOnly, multiDayDateOnly, explicitlyTimed, conflictingEndValues];
