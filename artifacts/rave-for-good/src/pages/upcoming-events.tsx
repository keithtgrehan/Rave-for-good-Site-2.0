import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events, type Event, partitionEvents } from "@/data/events";
import { cleanupFormatDescription, eventLogisticsRows } from "@/lib/event-content";
import { formatEventDate } from "@/lib/event-dates";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

function EventDateDisplay({ event }: { event: Event }) {
  if (!event.endDate) {
    return <time dateTime={event.date}>{formatEventDate(event.date)}</time>;
  }

  return (
    <>
      <time dateTime={event.date}>{formatEventDate(event.date)}</time>
      <span aria-hidden="true"> – </span>
      <time dateTime={event.endDate}>{formatEventDate(event.endDate)}</time>
    </>
  );
}

function EventCard({ event, archive = false }: { event: Event; archive?: boolean }) {
  const logistics = archive ? [] : eventLogisticsRows(event, "en");

  return (
    <motion.article
      className="card-lift flex min-w-0 flex-col overflow-hidden border border-white/[0.1] bg-card"
      variants={fadeUp}
      data-testid={`${archive ? "past" : "upcoming"}-event-${event.id}`}
    >
      <figure className="bg-background p-3 sm:p-5">
        <img
          src={event.image}
          alt={event.imageAlt ?? `${event.title} event image`}
          width="1080"
          height="1440"
          className="aspect-[4/3] h-auto w-full object-contain"
        />
        {event.imageCredit ? (
          <figcaption className="pt-3 text-xs text-muted-foreground">
            {event.imageCredit}
          </figcaption>
        ) : null}
      </figure>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-readable">
          <EventDateDisplay event={event} />
        </p>
        <h3 className="mb-5 font-display text-3xl font-bold uppercase leading-[0.92] tracking-[-0.025em] text-foreground/95 sm:text-4xl">
          {event.title}
        </h3>

        <dl className="mb-6 space-y-3 border-y border-white/[0.1] py-5 text-sm text-muted-foreground">
          {logistics.map((row) => (
            <div key={row.key} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
              <dt className="font-semibold text-foreground/85">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
          {!logistics.length && event.startTime && event.endTime ? (
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
              <dt className="font-semibold text-foreground/85">Time</dt>
              <dd>
                <time dateTime={`${event.date}T${event.startTime}`}>{event.startTime}</time>
                <span aria-hidden="true">–</span>
                <time dateTime={`${event.date}T${event.endTime}`}>{event.endTime}</time>
              </dd>
            </div>
          ) : null}
          {event.venue ? (
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
              <dt className="font-semibold text-foreground/85">Location</dt>
              <dd>{event.city} · {event.venue}</dd>
            </div>
          ) : (
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
              <dt className="font-semibold text-foreground/85">City</dt>
              <dd>{event.city}</dd>
            </div>
          )}
          {event.volunteerCount ? (
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
              <dt className="font-semibold text-foreground/85">Participation</dt>
              <dd>{event.volunteerCount} volunteers</dd>
            </div>
          ) : null}
        </dl>

        {event.durationHours && event.musicProgramme ? (
          <p className="mb-5 text-sm font-semibold text-foreground/85">
            {cleanupFormatDescription(event, "en").replace(/^./, (character) => character.toUpperCase())}
          </p>
        ) : null}
        <p className="mb-8 flex-1 text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
          {event.description}
        </p>

        {event.detailPath ? (
          <Button asChild size="lg" className="btn-cta h-12 w-full rounded-none px-6 text-xs font-bold uppercase tracking-[0.14em] sm:w-auto sm:px-8">
            <Link href={event.detailPath} data-testid={`link-event-${event.id}`}>
              {archive ? "View archive" : "View event"} <ArrowRight size={14} />
            </Link>
          </Button>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function UpcomingEvents({
  now = new Date(),
  eventRecords = events,
}: {
  now?: Date;
  eventRecords?: readonly Event[];
}) {
  const { upcoming, past } = partitionEvents(eventRecords, now);

  return (
    <div className="relative w-full overflow-hidden" data-testid="page-upcoming-events">
      <div className="pointer-events-none absolute right-0 top-0 h-[360px] w-[360px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.075)_0%,transparent_68%)] sm:h-[680px] sm:w-[760px]" />

      <div className="pb-16 pt-24 sm:pb-20 sm:pt-28 md:pb-32 md:pt-44">
        <div className="container relative z-10 px-4 sm:px-6">
          <header className="mb-14 max-w-5xl sm:mb-20 md:mb-24">
            <motion.p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-primary-readable" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Calendar and archive
            </motion.p>
            <motion.h1 className="mb-6 font-display text-[clamp(3rem,14vw,9rem)] font-bold uppercase leading-[0.86] tracking-[-0.035em]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOut }}>
              Events
            </motion.h1>
            <motion.p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl md:text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Upcoming Rave for Good community action, appearances and fundraisers, followed by the full archive.
            </motion.p>
          </header>

          <section aria-labelledby="upcoming-events-heading" className="mb-20 sm:mb-28">
            <h2 id="upcoming-events-heading" className="mb-8 border-b border-white/[0.1] pb-5 font-display text-3xl font-bold uppercase tracking-[-0.02em] sm:text-4xl">
              Upcoming events
            </h2>
            {upcoming.length ? (
              <motion.div className="grid grid-cols-1 gap-6 lg:grid-cols-2" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} data-testid="upcoming-events-list">
                {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
              </motion.div>
            ) : (
              <p className="border border-white/[0.1] bg-card p-8 text-muted-foreground" data-testid="upcoming-events-empty-state">
                No upcoming events have been announced. New dates will be published here when confirmed.
              </p>
            )}
          </section>

          <section aria-labelledby="past-events-heading">
            <h2 id="past-events-heading" className="mb-8 border-b border-white/[0.1] pb-5 font-display text-3xl font-bold uppercase tracking-[-0.02em] sm:text-4xl">
              Past-event archive
            </h2>
            <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} data-testid="past-events-list">
              {past.map((event) => <EventCard key={event.id} event={event} archive />)}
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
