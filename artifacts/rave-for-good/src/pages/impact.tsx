import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { events, type Event } from "@/data/events";
import { impactProjects, type ImpactProject } from "@/data/impact";
import { formatEventDate } from "@/lib/event-dates";

const statusLabels = {
  completed: "Completed",
  active: "Active",
  planned: "Planned",
} as const;

export default function Impact({
  eventRecords = events,
  projects = impactProjects,
}: {
  eventRecords?: readonly Event[];
  projects?: readonly ImpactProject[];
}) {
  return (
    <div className="relative w-full overflow-hidden pb-20 pt-24 sm:pt-28 md:pb-32 md:pt-44" data-testid="page-impact">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(109,94,245,0.07)_0%,transparent_65%)]" />
      <div className="container relative z-10 px-4 sm:px-6">
        <header className="mb-16 max-w-5xl sm:mb-24">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-primary-readable">Projects and evidence</p>
          <motion.h1 className="mb-8 font-display text-[clamp(3.5rem,10vw,9rem)] font-bold uppercase leading-[0.85] tracking-[-0.035em]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            Our social mission
          </motion.h1>
          <p className="max-w-3xl text-lg font-light leading-relaxed text-foreground/75 sm:text-xl md:text-2xl">
            We believe nightlife can mobilise people, resources and attention for practical community action. These records separate published facts from information that has not yet been documented.
          </p>
        </header>

        <section className="mb-16 grid gap-10 border-y border-white/[0.1] py-12 sm:mb-24 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:gap-16" aria-labelledby="impact-story-heading">
          <div className="space-y-6 text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            <h2 id="impact-story-heading" className="font-display text-3xl font-bold uppercase leading-[0.95] text-foreground sm:text-4xl">
              Music, community and practical action
            </h2>
            <p>
              Rave for Good began in 2018 with a simple idea: bring people together through music and dance while creating positive impact beyond the dance floor. Private raves grew into a community that raises awareness, gathers support and directs collective energy towards meaningful initiatives.
            </p>
            <p>
              In December 2021, Rave for Good e.V. was formally established. That step created a durable structure for creative initiatives and for connecting music culture with practical community and humanitarian action.
            </p>
            <p>
              The first major focus is Zigla Pakala in Burkina Faso, where access to basic infrastructure, including clean water and energy, is limited. Funds raised through community events supported the financing and construction of a new well to improve access to clean water for residents.
            </p>
            <p>
              The wider mission extends beyond one project. Rave for Good brings electronic music culture, solidarity and social responsibility together, turning shared experiences into support that can be documented and reviewed.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <img src="/images/zigla-pakala-well-1.jpg" alt="Community members around the well site in Zigla Pakala" className="aspect-[4/3] h-full w-full border border-white/[0.1] bg-muted object-cover" />
            <img src="/images/zigla-pakala-well-2.jpg" alt="Technical well drilling activity in Zigla Pakala" className="aspect-[4/3] h-full w-full border border-white/[0.1] bg-muted object-cover" />
          </div>
        </section>

        <div className="space-y-8">
          {projects.map((project) => {
            const event = project.eventId
              ? eventRecords.find((candidate) => candidate.id === project.eventId)
              : undefined;
            if (project.eventId && !event) throw new RangeError(`Missing event "${project.eventId}" for impact project "${project.id}"`);

            const title = event?.title ?? project.title;
            const summary = event?.description ?? project.summary;
            const image = event?.image ?? project.image;
            const imageAlt = event?.imageAlt ?? project.imageAlt ?? "";

            return (
            <article key={project.id} className="grid overflow-hidden border border-white/[0.1] bg-card lg:grid-cols-[minmax(260px,0.58fr)_minmax(0,1fr)]" data-testid={`impact-project-${project.id}`}>
              {image ? (
                <figure className="bg-background">
                  <img src={image} alt={imageAlt} className="h-full min-h-72 w-full object-cover" />
                  {event?.imageCredit ? <figcaption className="border-t border-white/[0.08] px-5 py-3 text-xs text-muted-foreground">{event.imageCredit}</figcaption> : null}
                </figure>
              ) : null}
              <div className="p-6 sm:p-8 md:p-10">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-primary-readable">{statusLabels[project.status]}</span>
                  {event ? <time dateTime={event.date} className="text-sm text-muted-foreground">{formatEventDate(event.date)}</time> : null}
                </div>
                <h2 className="mb-5 font-display text-3xl font-bold uppercase leading-[0.95] sm:text-4xl">{title}</h2>
                <p className="mb-8 max-w-3xl leading-relaxed text-muted-foreground sm:text-lg">{summary}</p>

                <dl className="grid gap-x-8 gap-y-5 border-y border-white/[0.1] py-6 sm:grid-cols-2">
                  {event?.volunteerCount ? <div><dt className="mb-1 text-sm font-semibold text-foreground/90">Volunteer participation</dt><dd className="text-muted-foreground">{event.volunteerCount} volunteers</dd></div> : null}
                  {project.beneficiaries ? <div><dt className="mb-1 text-sm font-semibold text-foreground/90">Beneficiaries</dt><dd className="text-muted-foreground">{project.beneficiaries}</dd></div> : null}
                  {project.deliveryOrganisations?.length ? <div><dt className="mb-1 text-sm font-semibold text-foreground/90">Delivery organisations</dt><dd className="text-muted-foreground">{project.deliveryOrganisations.join(", ")}</dd></div> : null}
                  {project.costs ? <div><dt className="mb-1 text-sm font-semibold text-foreground/90">Costs</dt><dd className="text-muted-foreground">{project.costs}</dd></div> : null}
                  {project.funding ? <div><dt className="mb-1 text-sm font-semibold text-foreground/90">Funding</dt><dd className="text-muted-foreground">{project.funding}</dd></div> : null}
                  {project.outcomes?.length ? <div className="sm:col-span-2"><dt className="mb-1 text-sm font-semibold text-foreground/90">Published outcomes</dt><dd className="text-muted-foreground">{project.outcomes.join(" ")}</dd></div> : null}
                </dl>

                <div className="mt-6">
                  <h3 className="mb-3 font-display text-xl font-bold uppercase">Evidence and downloads</h3>
                  {project.evidence.length ? (
                    <ul className="space-y-2">{project.evidence.map((item) => <li key={item.href}><a href={item.href} className="inline-flex min-h-11 items-center gap-2 py-2 font-semibold text-primary-readable"><Download size={15} />{item.title}</a></li>)}</ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No public evidence download has been supplied for this record yet.</p>
                  )}
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
