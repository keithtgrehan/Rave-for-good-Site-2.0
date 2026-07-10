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
};

export const events: Event[] = [
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
