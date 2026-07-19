export type EventLineupItem = {
  time: string;
  artist: string;
};

export type EventCategory = "music" | "community";

export type Event = {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  description: string;
  status: "upcoming" | "past";
  image: string;
  detailPath?: string;
  startTime?: string;
  endTime?: string;
  startLocation?: string;
  endLocation?: string;
  lineup?: EventLineupItem[];
  category?: EventCategory;
};

export const events: Event[] = [
  {
    id: "trash-pickup-2026-07-19",
    title: "Trash Pickup",
    date: "2026-07-19",
    startTime: "14:00",
    endTime: "20:00",
    startLocation: "Lohmühlenplatz",
    endLocation: "Schlesischer Busch",
    venue: "Lohmühlenplatz → Schlesischer Busch",
    city: "Berlin",
    description:
      "A community park cleanup bringing together volunteers, local artists and Berlin’s music community for direct action in shared public space.",
    status: "upcoming",
    category: "community",
    image: "/images/events/trash-pickup-2026-07-19.jpg",
    detailPath: "/park-cleanup",
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
    startTime: "14:00",
    endTime: "20:00",
    startLocation: "Lohmühlenplatz",
    endLocation: "Schlesischer Busch",
    venue: "Lohmühlenplatz → Schlesischer Busch",
    city: "Berlin",
    description:
      "A Berlin community cleanup bringing volunteers, artists, ravers and neighbours together to care for shared public space.",
    status: "past",
    category: "community",
    image: "/images/berlin-park-cleanup.jpg",
    detailPath: "/berlin-park-cleanup"
  },
  {
    id: "rfg-nova",
    title: "RFG @ NOVUM",
    date: "2026-06-26",
    venue: "Palace in Debrznica",
    city: "Poland",
    description: "Rave for Good joined NOVUM for a four-day electronic music gathering at a 19th-century palace in the forest, surrounded by water, nature and open-air dancefloors.",
    status: "past",
    image: "/images/events/rfg-nova/festival-flyer.jpg",
    detailPath: "/events/rfg-nova"
  },
  {
    id: "party-of-hearts-kater-blau",
    title: "Party of Hearts at Kater Blau",
    date: "2024-06-28",
    venue: "Kater Blau",
    city: "Berlin",
    description: "The Party of Hearts returned to Berlin with a colorful multi-floor fundraising night after moving from Mensch Meier.",
    status: "past",
    image: "/images/kater.png"
  },
  {
    id: "rave-the-planet-2024",
    title: "Rave The Planet 2024",
    date: "2024-08-17",
    venue: "Rave The Planet",
    city: "Berlin",
    description: "A full-day community activation with partner collectives, artists, and volunteers managing float operations and safety.",
    status: "past",
    image: "/images/rave-the-planet.jpg"
  },
  {
    id: "rave-for-good-im-meier-2023",
    title: "Rave for Good im Meier 2023",
    date: "2023-11-11",
    venue: "Mensch Meier",
    city: "Berlin",
    description: "A final 2023 fundraiser featuring DJ sets and live sets before the venue closure.",
    status: "past",
    image: "/images/meier-lineup.png"
  }
];
