export type ImpactEvidence = {
  title: string;
  href: string;
};

type ImpactProjectDetails = {
  id: string;
  status: "completed" | "active" | "planned";
  beneficiaries?: string;
  deliveryOrganisations?: string[];
  costs?: string;
  funding?: string;
  outcomes?: string[];
  evidence: ImpactEvidence[];
};

type EventLinkedImpactProject = ImpactProjectDetails & {
  eventId: string;
  title?: never;
  summary?: never;
  image?: never;
  imageAlt?: never;
};

type StandaloneImpactProject = ImpactProjectDetails & {
  eventId?: never;
  title: string;
  summary: string;
  image?: string;
  imageAlt?: string;
};

export type ImpactProject = EventLinkedImpactProject | StandaloneImpactProject;

export const impactProjects: ImpactProject[] = [
  {
    id: "trash-pickup-participation",
    eventId: "trash-pickup-2026-07-19",
    status: "completed",
    deliveryOrganisations: ["Rave for Good e.V."],
    outcomes: ["Volunteer participation was documented for this cleanup."],
    evidence: [],
  },
  {
    id: "berlin-park-cleanup-participation",
    eventId: "berlin-park-cleanup-2026-06-14",
    status: "completed",
    deliveryOrganisations: ["Rave for Good e.V."],
    outcomes: ["Volunteer participation was documented for this cleanup."],
    evidence: [],
  },
  {
    id: "zigla-pakala-water-access",
    title: "Zigla Pakala water access",
    summary: "Rave for Good used funds raised through community events to support new well infrastructure in Zigla Pakala, Burkina Faso.",
    status: "completed",
    beneficiaries: "Residents of Zigla Pakala",
    outcomes: ["A new well was financed and built to improve access to clean water."],
    evidence: [],
    image: "/images/zigla-pakala-well-1.jpg",
    imageAlt: "Community members around the well site in Zigla Pakala",
  },
];
