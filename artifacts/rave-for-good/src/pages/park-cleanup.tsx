import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLEANUP_PHOTO_CREDIT, events, type Event, partitionEvents } from "@/data/events";
import { localizeEvent } from "@/data/event-localizations";
import { SITE_CONTACT, contactMailto } from "@/data/site";
import { cleanupFormatDescription, cleanupParticipationSubject, eventLogisticsRows } from "@/lib/event-content";
import { formatEventDate } from "@/lib/event-dates";

export type SiteLocale = "en" | "de";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

const copy = {
  en: {
    locale: "en-GB",
    eyebrow: "Berlin community action",
    title: "Rave for Good Cleanup Collective",
    positioning: "The Rave for Good Cleanup Collective brings together Berlin’s electronic music community to protect and restore the city’s parks, canals and public spaces through community action.",
    partnership: "We partner with existing environmental organisations rather than reinventing the wheel.",
    galleryLabel: "Rave for Good Cleanup Collective gallery",
    galleryAlts: [
      "Rave for Good volunteers taking part in a Berlin cleanup",
      "Rave for Good cleanup volunteers with collected waste bags in Berlin",
    ],
    nextEyebrow: "Next cleanup",
    participation: "Take part",
    partnershipCta: "Partner with us",
    previous: "Past cleanups",
    volunteers: "volunteers",
    lineup: "Line-up",
    contributionEyebrow: "What we contribute",
    contributionTitle: "Community energy, organised for action",
    contributionIntro: "Rave for Good brings practical strengths from Berlin’s electronic music community into clearly defined environmental collaborations.",
    contributions: [
      ["Community mobilisation", "We connect cleanup action with volunteers from Berlin’s electronic music community."],
      ["Artists and DJs", "We curate music and coordinate participating artists and DJs as part of the moving cleanup format."],
      ["Communications and content", "We support outreach, event communications and responsible documentation of the activity."],
      ["Volunteer coordination", "We help volunteers understand how to join and coordinate participation within agreed roles."],
    ],
    contactTitle: "Join the next cleanup",
    contactCopy: (name: string) => `Email ${name} to take part, ask a question or discuss a future environmental collaboration.`,
    partnerPath: "/partners",
    languagePath: "/de/park-cleanup",
    languageLabel: "Deutsch",
  },
  de: {
    locale: "de-DE",
    eyebrow: "Gemeinschaftliches Handeln in Berlin",
    title: "Rave for Good Cleanup Collective",
    positioning: "Das Rave for Good Cleanup Collective bringt Berlins elektronische Musikszene zusammen, um die Parks, Kanäle und öffentlichen Räume der Stadt durch gemeinschaftliches Handeln zu schützen und wiederherzustellen.",
    partnership: "Wir arbeiten mit bestehenden Umweltorganisationen zusammen, statt das Rad neu zu erfinden.",
    galleryLabel: "Bilder des Rave for Good Cleanup Collective",
    galleryAlts: [
      "Freiwillige von Rave for Good bei einer Aufräumaktion in Berlin",
      "Freiwillige des Rave for Good Cleanup Collective mit gesammelten Müllsäcken in Berlin",
    ],
    nextEyebrow: "Nächste Aufräumaktion",
    participation: "Mitmachen",
    partnershipCta: "Kooperation anfragen",
    previous: "Vergangene Aufräumaktionen",
    volunteers: "Freiwillige",
    lineup: "Musikprogramm",
    contributionEyebrow: "Unser Beitrag",
    contributionTitle: "Gemeinschaftliche Energie, praktisch organisiert",
    contributionIntro: "Rave for Good bringt konkrete Stärken der Berliner elektronischen Musikszene in klar vereinbarte Umweltkooperationen ein.",
    contributions: [
      ["Community-Mobilisierung", "Wir verbinden Aufräumaktionen mit Freiwilligen aus Berlins elektronischer Musikszene."],
      ["Artists und DJs", "Wir kuratieren die Musik und koordinieren beteiligte Artists und DJs im mobilen Cleanup-Format."],
      ["Kommunikation und Inhalte", "Wir unterstützen Reichweite, Veranstaltungsinformationen und eine verantwortungsvolle Dokumentation."],
      ["Koordination der Freiwilligen", "Wir erklären, wie man mitmacht, und koordinieren die Teilnahme innerhalb klar vereinbarter Rollen."],
    ],
    contactTitle: "Bei der nächsten Aktion mitmachen",
    contactCopy: (name: string) => `Schreib ${name}, wenn du teilnehmen, eine Frage stellen oder eine künftige Umweltkooperation besprechen möchtest.`,
    partnerPath: "/de/partners",
    languagePath: "/park-cleanup",
    languageLabel: "English",
  },
} as const;

export function ParkCleanupPage({
  locale = "en",
  now = new Date(),
  eventRecords = events,
}: {
  locale?: SiteLocale;
  now?: Date;
  eventRecords?: readonly Event[];
}) {
  const text = copy[locale];
  const { upcoming, past } = partitionEvents(eventRecords, now);
  const nextCleanup = upcoming.find((event) => event.category === "community");
  const pastCleanups = past.filter((event) => event.category === "community");
  const localizedNextCleanup = nextCleanup ? localizeEvent(nextCleanup, locale) : undefined;
  const nextCleanupLogistics = nextCleanup ? eventLogisticsRows(nextCleanup, locale) : [];

  return (
    <div className="relative w-full overflow-hidden" data-testid={`page-park-cleanup-${locale}`}>
      <div className="pointer-events-none absolute right-0 top-0 h-[680px] w-[760px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.075)_0%,transparent_68%)]" />

      <section className="relative pb-14 pt-24 sm:pb-20 sm:pt-28 md:pb-28 md:pt-44">
        <motion.div className="container relative z-10 px-4 sm:px-6" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div className="mb-6 flex flex-wrap items-center justify-between gap-4" variants={fadeUp}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-readable">{text.eyebrow}</p>
            <Link href={text.languagePath} className="inline-flex min-h-11 items-center border border-white/[0.18] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground/80 hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {text.languageLabel}
            </Link>
          </motion.div>
          <motion.h1 className="mb-7 max-w-6xl font-display text-[clamp(2.7rem,10vw,7.25rem)] font-bold uppercase leading-[0.84] tracking-[-0.04em]" variants={fadeUp}>
            {text.title}
          </motion.h1>
          <motion.p className="max-w-4xl text-lg font-light leading-relaxed text-foreground/75 sm:text-xl md:text-2xl" variants={fadeUp}>
            {text.positioning}
          </motion.p>
          <motion.p className="mt-6 max-w-3xl border-l-2 border-primary-readable pl-5 text-base font-medium leading-relaxed text-muted-foreground sm:text-lg" variants={fadeUp}>
            {text.partnership}
          </motion.p>
        </motion.div>
      </section>

      <section className="pb-16 sm:pb-20 md:pb-28" aria-label={text.galleryLabel}>
        <div className="container grid grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-2">
          {["/images/cleanup-collective-group-berlin.jpeg", "/images/rave-for-good-cleanup-team.jpeg"].map((src, index) => (
            <motion.figure key={src} className="overflow-hidden border border-white/[0.1] bg-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src={src} alt={text.galleryAlts[index]} className="aspect-[7/6] h-full w-full object-cover" />
              <figcaption className="border-t border-white/[0.08] px-4 py-3 text-xs text-muted-foreground">{CLEANUP_PHOTO_CREDIT}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {nextCleanup ? (
        <section className="relative bg-card py-16 sm:py-20 md:py-28" aria-labelledby="next-cleanup-heading">
          <div className="container grid gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-readable" variants={fadeUp}>{text.nextEyebrow}</motion.p>
              <motion.h2 id="next-cleanup-heading" className="mb-6 font-display text-4xl font-bold uppercase leading-[0.92] tracking-[-0.03em] sm:text-5xl md:text-6xl" variants={fadeUp}>
                <time dateTime={nextCleanup.date}>{formatEventDate(nextCleanup.date, text.locale)}</time>
              </motion.h2>
              <motion.p className="mb-8 max-w-2xl text-lg leading-relaxed text-foreground/75" variants={fadeUp}>
                {cleanupFormatDescription(nextCleanup, locale).replace(/^./, (character) => character.toUpperCase())}.
              </motion.p>
              <motion.dl className="mb-8 divide-y divide-white/[0.1] border-y border-white/[0.1] text-sm sm:text-base" variants={fadeUp}>
                {nextCleanupLogistics.map((row) => (
                  <div key={row.key} className="grid gap-2 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5">
                    <dt className="sr-only">{row.label}</dt>
                    <dd className="font-semibold text-foreground/90 sm:col-span-2">{row.value}</dd>
                  </div>
                ))}
              </motion.dl>
              <motion.div className="flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
                <Button asChild size="lg" className="btn-cta h-12 rounded-none px-7 text-xs font-bold uppercase tracking-[0.14em]">
                  <a href={contactMailto(cleanupParticipationSubject(nextCleanup, locale))}>
                    <Mail size={15} /> {text.participation}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-none px-7 text-xs font-bold uppercase tracking-[0.14em]">
                  <Link href={text.partnerPath}>{text.partnershipCta} <ArrowRight size={14} /></Link>
                </Button>
              </motion.div>
            </motion.div>
            <figure className="self-start overflow-hidden border border-white/[0.1] bg-background p-3">
              <img src={nextCleanup.image} alt={localizedNextCleanup?.imageAlt ?? localizedNextCleanup?.title} className="aspect-[7/6] w-full object-cover" />
              <figcaption className="px-2 pt-3 text-xs text-muted-foreground">{nextCleanup.imageCredit ?? CLEANUP_PHOTO_CREDIT}</figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <section className="py-16 sm:py-20 md:py-28" aria-labelledby="past-cleanups-heading">
        <div className="container px-4 sm:px-6">
          <h2 id="past-cleanups-heading" className="mb-10 font-display text-3xl font-bold uppercase tracking-[-0.025em] sm:text-4xl md:text-5xl">{text.previous}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pastCleanups.map((event) => {
              const localizedEvent = localizeEvent(event, locale);
              return (
                <article key={event.id} className="overflow-hidden border border-white/[0.1] bg-card">
                  <figure>
                    <img src={event.image} alt={localizedEvent.imageAlt ?? `${localizedEvent.title} event image`} className="aspect-[4/3] w-full bg-background object-contain" />
                    {event.imageCredit ? <figcaption className="border-t border-white/[0.08] px-6 py-3 text-xs text-muted-foreground sm:px-8">{event.imageCredit}</figcaption> : null}
                  </figure>
                  <div className="p-6 sm:p-8">
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-readable"><time dateTime={event.date}>{formatEventDate(event.date, text.locale)}</time></p>
                    <h3 className="mb-4 font-display text-2xl font-bold uppercase">{localizedEvent.title}</h3>
                    {event.volunteerCount ? <p className="mb-4 text-lg font-semibold text-foreground/90">{event.volunteerCount} {text.volunteers}</p> : null}
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{localizedEvent.description}</p>
                    {event.lineup?.length ? (
                      <section
                        id={`${event.id}-lineup`}
                        className="mt-7 border-t border-white/[0.1] pt-6"
                        aria-labelledby={`${event.id}-lineup-heading`}
                      >
                        <h4 id={`${event.id}-lineup-heading`} className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-primary-readable">
                          {text.lineup}
                        </h4>
                        <ol className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                          {event.lineup.map((slot) => (
                            <li key={`${event.id}-${slot.time}`} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 py-3 text-sm sm:text-base">
                              <time dateTime={`${event.date}T${slot.time}`} className="font-mono font-semibold text-primary-readable">{slot.time}</time>
                              <span className="font-medium text-foreground/90">{slot.artist}</span>
                            </li>
                          ))}
                        </ol>
                      </section>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-card py-16 sm:py-20 md:py-28" aria-labelledby="cleanup-contribution-heading">
        <div className="container px-4 sm:px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-primary-readable">{text.contributionEyebrow}</p>
          <h2 id="cleanup-contribution-heading" className="mb-5 max-w-4xl font-display text-3xl font-bold uppercase leading-[0.95] sm:text-4xl md:text-5xl">{text.contributionTitle}</h2>
          <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{text.contributionIntro}</p>
          <div className="grid gap-px bg-white/[0.12] md:grid-cols-2 xl:grid-cols-4">
            {text.contributions.map(([title, description]) => (
              <article key={title} className="bg-background p-6 sm:p-8">
                <h3 className="mb-4 font-display text-xl font-bold uppercase text-foreground/95">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="container grid gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 className="mb-4 font-display text-3xl font-bold uppercase sm:text-4xl">{text.contactTitle}</h2>
            <p className="max-w-2xl text-muted-foreground">{text.contactCopy(SITE_CONTACT.name)}</p>
          </div>
          <a className="link-line inline-flex min-h-11 items-center gap-2 py-3 font-semibold text-primary-readable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" href={contactMailto()}>
            {SITE_CONTACT.name} · {SITE_CONTACT.email}
          </a>
        </div>
      </section>
    </div>
  );
}

export default function ParkCleanup() {
  return <ParkCleanupPage locale="en" />;
}
