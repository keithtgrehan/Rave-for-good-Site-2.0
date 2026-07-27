import type { EventDateRecord } from "../lib/event-dates";

export type EventLineupItem = {
  time: string;
  artist: string;
};

export type EventCategory = "music" | "community";

export type EventLogisticsStatus = "confirmed" | "tbc";

export type EventLogistics = {
  time: EventLogisticsStatus;
  meetingPoint: EventLogisticsStatus;
  route: EventLogisticsStatus;
};

export type EventMusicProgramme = {
  throughout: boolean;
  includesDjs: boolean;
};

type EventDetails = {
  id: string;
  title: string;
  venue?: string;
  city: string;
  description: string;
  image: string;
  imageAlt?: string;
  imageCredit?: string;
  detailPath?: string;
  startTime?: string;
  endTime?: string;
  startLocation?: string;
  endLocation?: string;
  route?: string;
  logistics?: EventLogistics;
  lineup?: EventLineupItem[];
  category?: EventCategory;
  durationHours?: number;
  musicProgramme?: EventMusicProgramme;
  volunteerCount?: number;
};

export type Event = EventDetails & EventDateRecord;

export const CLEANUP_PHOTO_CREDIT = "© raveforgood.berlin e.V.";

export const events: Event[] = [
  {
    id: "rave-for-good-cleanup-2026-08-16",
    title: "Rave for Good Cleanup",
    date: "2026-08-16",
    city: "Berlin",
    description:
      "A moving community cleanup bringing Berlin’s electronic music scene together for direct action in shared public space.",
    category: "community",
    durationHours: 6,
    musicProgramme: {
      throughout: true,
      includesDjs: true,
    },
    logistics: {
      time: "tbc",
      meetingPoint: "tbc",
      route: "tbc",
    },
    image: "/images/cleanup-collective-group-berlin.jpeg",
    imageAlt: "Rave for Good volunteers taking part in a Berlin cleanup",
    imageCredit: CLEANUP_PHOTO_CREDIT,
    detailPath: "/park-cleanup",
  },
  {
    id: "trash-pickup-2026-07-19",
    title: "Trash Pickup",
    date: "2026-07-19",
    endsAt: "2026-07-19T20:00:00+02:00",
    startTime: "14:00",
    endTime: "20:00",
    startLocation: "Lohmühlenplatz",
    endLocation: "Schlesischer Busch",
    venue: "Lohmühlenplatz → Schlesischer Busch",
    city: "Berlin",
    description:
      "A community park cleanup bringing together volunteers, local artists and Berlin’s music community for direct action in shared public space.",
    category: "community",
    volunteerCount: 28,
    image: "/images/events/trash-pickup-2026-07-19.jpg",
    imageAlt: "Rave for Good volunteers cleaning a shared public space in Berlin",
    imageCredit: CLEANUP_PHOTO_CREDIT,
    detailPath: "/park-cleanup#trash-pickup-2026-07-19-lineup",
    lineup: [
      { time: "14:00", artist: "l_udwig" },
      { time: "15:00", artist: "Confidentially Blonde" },
      { time: "16:00", artist: "Clelio" },
      { time: "17:00", artist: "Radio Renato" },
      { time: "18:00", artist: "Fyschy" },
      { time: "19:00", artist: "Prisoner of Wicked" }
    ]
  },
  {
    id: "berlin-park-cleanup-2026-06-14",
    title: "Berlin Park Cleanup",
    date: "2026-06-14",
    endsAt: "2026-06-14T20:00:00+02:00",
    startTime: "14:00",
    endTime: "20:00",
    startLocation: "Lohmühlenplatz",
    endLocation: "Schlesischer Busch",
    venue: "Lohmühlenplatz → Schlesischer Busch",
    city: "Berlin",
    description:
      "A Berlin community cleanup bringing volunteers, artists, ravers and neighbours together to care for shared public space.",
    category: "community",
    volunteerCount: 16,
    image: "/images/berlin-park-cleanup.jpg",
    imageAlt: "Rave for Good volunteers taking part in a Berlin park cleanup",
    imageCredit: CLEANUP_PHOTO_CREDIT,
    detailPath: "/berlin-park-cleanup"
  },
  {
    id: "rfg-nova",
    title: "RFG @ NOVUM",
    date: "2026-06-26",
    endDate: "2026-06-29",
    venue: "Palace in Debrznica",
    city: "Poland",
    description: "Rave for Good joined NOVUM for an electronic music gathering at a 19th-century palace in the forest, surrounded by water, nature and open-air dancefloors.",
    image: "/images/events/rfg-nova/festival-flyer.jpg",
    detailPath: "/upcoming-events/rfg-nova"
  },
  {
    id: "party-of-hearts-kater-blau",
    title: "Party of Hearts at Kater Blau",
    date: "2024-06-28",
    venue: "Kater Blau",
    city: "Berlin",
    description: "The Party of Hearts returned to Berlin with a colorful multi-floor fundraising night after moving from Mensch Meier.",
    image: "/images/kater.png"
  },
  {
    id: "rave-the-planet-2024",
    title: "Rave The Planet 2024",
    date: "2024-08-17",
    venue: "Rave The Planet",
    city: "Berlin",
    description: "A full-day community activation with partner collectives, artists, and volunteers managing float operations and safety.",
    image: "/images/rave-the-planet.jpg"
  },
  {
    id: "rave-for-good-im-meier-2023",
    title: "Rave for Good im Meier 2023",
    date: "2023-11-11",
    venue: "Mensch Meier",
    city: "Berlin",
    description: "A final 2023 fundraiser featuring DJ sets and live sets before the venue closure.",
    image: "/images/meier-lineup.png"
  }
];

export { getEventStatus, partitionEvents } from "../lib/event-dates";
