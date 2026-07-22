import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

const donationUrl = "https://paypal.me/RaveForGoodeV";
const contactEmail = "info@raveforgood.berlin";
const positioningStatement =
  "The Rave for Good Cleanup Collective brings together Berlin’s electronic music community to protect and restore the city’s parks, canals and public spaces through community action.";
const partnershipStatement =
  "We partner with existing environmental organisations rather than reinventing the wheel.";
const pageTitle = "Rave for Good Cleanup Collective | Rave for Good";
const pageDescription = positioningStatement;
const canonicalUrl = "https://www.raveforgood.berlin/park-cleanup";
const openGraphImageUrl =
  "https://www.raveforgood.berlin/images/cleanup-collective-group-berlin.jpeg";
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut }
  }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const upcomingCommunityEvents = events.filter(
  (event) => event.category === "community" && event.status === "upcoming",
);

const previousCommunityEvents = events.filter(
  (event) => event.category === "community" && event.status === "past",
);

function setUniqueMeta(selector: string, attributes: Record<string, string>) {
  const matches = Array.from(
    document.head.querySelectorAll<HTMLMetaElement>(selector),
  );
  const meta = matches.shift() ?? document.createElement("meta");

  for (const duplicate of matches) {
    duplicate.remove();
  }

  for (const [name, value] of Object.entries(attributes)) {
    meta.setAttribute(name, value);
  }

  if (!meta.isConnected) {
    document.head.appendChild(meta);
  }
}

function setUniqueCanonical() {
  const matches = Array.from(
    document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
  );
  const canonical = matches.shift() ?? document.createElement("link");

  for (const duplicate of matches) {
    duplicate.remove();
  }

  canonical.rel = "canonical";
  canonical.href = canonicalUrl;

  if (!canonical.isConnected) {
    document.head.appendChild(canonical);
  }
}

function useParkCleanupMetadata() {
  useEffect(() => {
    document.title = pageTitle;
    setUniqueMeta('meta[name="description"]', {
      name: "description",
      content: pageDescription,
    });
    setUniqueMeta('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    setUniqueMeta('meta[property="og:description"]', {
      property: "og:description",
      content: pageDescription,
    });
    setUniqueMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    setUniqueMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    setUniqueMeta('meta[property="og:image"]', {
      property: "og:image",
      content: openGraphImageUrl,
    });
    setUniqueCanonical();

    return () => {
      if (document.title === pageTitle) {
        document.title = "Rave for Good";
      }

      document
        .querySelectorAll(
          'meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[property="og:url"], meta[property="og:type"], meta[property="og:image"]',
        )
        .forEach((element) => element.remove());

      document
        .querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')
        .forEach((element) => element.remove());
    };
  }, []);
}

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function ParkCleanup() {
  useParkCleanupMetadata();

  return (
    <div className="relative w-full overflow-hidden" data-testid="page-park-cleanup">
      <div className="pointer-events-none absolute right-0 top-0 h-[360px] w-[360px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.075)_0%,transparent_68%)] sm:h-[680px] sm:w-[760px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] bg-[radial-gradient(ellipse,rgba(77,163,255,0.055)_0%,transparent_70%)] sm:h-[520px] sm:w-[520px]" />

      <section className="relative pb-14 pt-24 sm:pb-20 sm:pt-28 md:pb-28 md:pt-44">
        <motion.div
          className="container relative z-10 px-4 sm:px-6"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div className="mb-6 flex items-center gap-3" variants={fadeUp}>
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
              Berlin Community Action
            </span>
          </motion.div>

          <motion.h1
            className="mb-7 font-display text-[clamp(2.5rem,9.5vw,7.25rem)] font-bold uppercase leading-[0.84] tracking-[-0.04em]"
            variants={fadeUp}
            data-testid="heading-park-cleanup"
          >
            <span className="block whitespace-nowrap">Rave for Good</span>
            <span className="block whitespace-nowrap text-primary">Cleanup</span>
            <span className="block whitespace-nowrap">Collective</span>
          </motion.h1>

          <motion.p
            className="max-w-4xl text-lg font-light leading-relaxed text-foreground/68 sm:text-xl md:text-2xl"
            variants={fadeUp}
          >
            {positioningStatement}
          </motion.p>

          <motion.p
            className="mt-5 max-w-3xl border-l-2 border-primary/55 pl-5 text-sm font-medium leading-relaxed text-foreground/52 sm:mt-6 sm:text-base md:text-lg"
            variants={fadeUp}
          >
            {partnershipStatement}
          </motion.p>
        </motion.div>
      </section>

      <section
        className="relative pb-14 sm:pb-20 md:pb-28"
        aria-label="Rave for Good Cleanup Collective gallery"
      >
        <motion.div
          className="container grid grid-cols-1 gap-4 px-4 sm:gap-6 sm:px-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.figure
            className="relative aspect-[7/6] overflow-hidden border border-white/[0.07] bg-card"
            variants={fadeUp}
          >
            <img
              src="/images/cleanup-collective-group-berlin.jpeg"
              alt="Rave for Good volunteers taking part in a Berlin park cleanup"
              width="1106"
              height="960"
              decoding="async"
              className="h-full w-full object-cover"
              data-testid="img-cleanup-collective-group"
            />
          </motion.figure>

          <motion.figure
            className="relative aspect-[7/6] overflow-hidden border border-white/[0.07] bg-card"
            variants={fadeUp}
          >
            <img
              src="/images/rave-for-good-cleanup-team.jpeg"
              alt="Rave for Good cleanup team with collected waste bags in Berlin"
              width="1118"
              height="955"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              data-testid="img-cleanup-team"
            />
          </motion.figure>
        </motion.div>
      </section>

      <section
        className="relative bg-card py-14 sm:py-20 md:py-28"
        aria-labelledby="upcoming-community-events"
      >
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mb-10 max-w-4xl sm:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70"
              variants={fadeUp}
            >
              Next action
            </motion.p>
            <motion.h2
              id="upcoming-community-events"
              className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-6xl"
              variants={fadeUp}
            >
              Upcoming Community Events
            </motion.h2>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {upcomingCommunityEvents.map((event) => (
              <motion.article
                key={event.id}
                className="grid min-w-0 overflow-hidden border border-white/[0.07] bg-background lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)]"
                variants={fadeUp}
                data-testid={`community-event-${event.id}`}
              >
                <div className="min-w-0 p-6 sm:p-8 md:p-10 lg:p-12">
                  <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary/75">
                    <time dateTime={event.date}>{formatEventDate(event.date)}</time>
                  </p>
                  <h3 className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-[-0.03em] text-foreground/94 sm:text-5xl md:text-6xl">
                    {event.title}
                  </h3>

                  <dl className="mb-9 grid gap-5 border-y border-white/[0.07] py-6 sm:grid-cols-2">
                    {event.startTime && event.endTime ? (
                      <div>
                        <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/34">
                          Operating time
                        </dt>
                        <dd className="font-display text-2xl font-bold uppercase text-foreground/88">
                          <time dateTime={`${event.date}T${event.startTime}`}>
                            {event.startTime}
                          </time>
                          <span aria-hidden="true">–</span>
                          <time dateTime={`${event.date}T${event.endTime}`}>
                            {event.endTime}
                          </time>
                        </dd>
                      </div>
                    ) : null}

                    <div>
                      <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/34">
                        City
                      </dt>
                      <dd className="font-display text-2xl font-bold uppercase text-foreground/88">
                        {event.city}
                      </dd>
                    </div>
                  </dl>

                  {event.startLocation && event.endLocation ? (
                    <div className="mb-9 border-l-2 border-primary/55 pl-5">
                      <p className="mb-3 flex items-start gap-3 text-base font-light leading-relaxed text-foreground/62 sm:text-lg">
                        <MapPin className="mt-1 shrink-0 text-primary" size={17} aria-hidden="true" />
                        <span>
                          Starts at <strong className="font-medium text-foreground/88">{event.startLocation}</strong> at {event.startTime}.
                        </span>
                      </p>
                      <p className="flex items-start gap-3 text-base font-light leading-relaxed text-foreground/62 sm:text-lg">
                        <MapPin className="mt-1 shrink-0 text-accent" size={17} aria-hidden="true" />
                        <span>
                          Finishes at <strong className="font-medium text-foreground/88">{event.endLocation}</strong> at {event.endTime}.
                        </span>
                      </p>
                      <p className="mt-4 text-sm font-light leading-relaxed text-foreground/42">
                        The cleanup moves from the start point to the finish point through shared public space.
                      </p>
                    </div>
                  ) : null}

                  <p className="mb-10 max-w-[62ch] text-base font-light leading-relaxed text-foreground/54 sm:text-lg">
                    {event.description}
                  </p>

                  {event.lineup?.length ? (
                    <div>
                      <h4 className="mb-5 font-display text-2xl font-bold uppercase tracking-[-0.02em] text-foreground/88">
                        Lineup
                      </h4>
                      <ol className="border-t border-white/[0.07]" data-testid="trash-pickup-lineup">
                        {event.lineup.map((slot) => (
                          <li
                            key={`${slot.time}-${slot.artist}`}
                            className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 border-b border-white/[0.07] py-4 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-6"
                          >
                            <time
                              dateTime={`${event.date}T${slot.time}`}
                              className="font-mono text-xs font-bold tracking-[0.12em] text-primary"
                            >
                              {slot.time}
                            </time>
                            <span className="min-w-0 break-words font-display text-lg font-bold uppercase leading-tight text-foreground/84 sm:text-xl">
                              {slot.artist}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                </div>

                <figure className="flex min-w-0 items-center justify-center border-t border-white/[0.07] bg-card p-3 sm:p-5 lg:border-l lg:border-t-0">
                  <img
                    src={event.image}
                    alt="Trash Pickup community cleanup flyer for Sunday 19 July 2026, featuring the Rave for Good lineup and route from Lohmühlenplatz to Schlesischer Busch"
                    width="1080"
                    height="1440"
                    className="aspect-[3/4] h-auto w-full max-w-[720px] object-contain"
                    data-testid="img-trash-pickup-flyer"
                  />
                </figure>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-14 sm:py-20 md:py-28" aria-labelledby="previous-community-events">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mb-10 sm:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70"
              variants={fadeUp}
            >
              Archive
            </motion.p>
            <motion.h2
              id="previous-community-events"
              className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-6xl"
              variants={fadeUp}
            >
              Previous Events
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {previousCommunityEvents.map((event) => (
              <motion.article
                key={event.id}
                className="card-lift overflow-hidden border border-white/[0.07] bg-card"
                variants={fadeUp}
                data-testid={`previous-community-event-${event.id}`}
              >
                <div className="bg-background p-3">
                  <img
                    src={event.image}
                    alt={`${event.title} flyer`}
                    width="1080"
                    height="1440"
                    loading="lazy"
                    className="aspect-[3/4] h-auto w-full object-contain"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/70">
                    <time dateTime={event.date}>{formatEventDate(event.date)}</time>
                  </p>
                  <h3 className="mb-4 font-display text-2xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-foreground/90 sm:text-3xl">
                    {event.title}
                  </h3>
                  <p className="mb-6 text-sm font-light leading-relaxed text-foreground/50 sm:text-base">
                    {event.description}
                  </p>
                  {event.detailPath ? (
                    <Link
                      href={event.detailPath}
                      className="link-line inline-flex min-h-11 items-center gap-2 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-card"
                      data-testid={`link-previous-community-event-${event.id}`}
                    >
                      View Previous Event
                      <ArrowRight size={13} />
                    </Link>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-white/[0.06] bg-card py-14 sm:py-20 md:py-24">
        <motion.div
          className="container grid grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
              Take part
            </p>
            <h2 className="mb-5 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-5xl">
              Support community action
            </h2>
            <p className="max-w-2xl text-base font-light leading-relaxed text-foreground/52 sm:text-lg">
              Help fund cleanup materials and future charity projects, or contact the crew to volunteer and collaborate.
            </p>
          </motion.div>

          <motion.div className="flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <Button
              asChild
              size="lg"
              className="btn-cta h-12 min-h-11 rounded-none px-7 text-xs font-bold uppercase tracking-[0.14em]"
            >
              <a href={donationUrl} target="_blank" rel="noopener noreferrer" data-testid="button-donate-park-cleanup">
                Support the cleanup
                <ArrowRight size={14} />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 min-h-11 rounded-none px-7 text-xs font-bold uppercase tracking-[0.14em]"
            >
              <a href={`mailto:${contactEmail}`} data-testid="link-volunteer-park-cleanup">
                <Mail size={14} />
                Volunteer
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
