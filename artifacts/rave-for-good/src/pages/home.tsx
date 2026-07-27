import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Droplets, HeartHandshake, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SoundCloudPlayer } from "@/components/SoundCloudPlayer";
import { events, type Event, partitionEvents } from "@/data/events";
import { contactMailto } from "@/data/site";
import { cleanupFormatDescription, cleanupParticipationSubject, eventLogisticsRows } from "@/lib/event-content";
import { formatEventDate } from "@/lib/event-dates";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay }
  })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } }
};

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function Home({
  now = new Date(),
  eventRecords = events,
}: {
  now?: Date;
  eventRecords?: readonly Event[];
}) {
  const { upcoming, past } = partitionEvents(eventRecords, now);
  const nextCleanup = upcoming.find((event) => event.category === "community");
  const pastEvents = past.slice(0, 6);
  const nextCleanupSummary = nextCleanup
    ? [
        `${sentenceCase(cleanupFormatDescription(nextCleanup, "en"))}.`,
        ...eventLogisticsRows(nextCleanup, "en").map((row) => `${row.value}.`),
      ].join(" ")
    : "";

  return (
    <div className="w-full">
      <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden sm:min-h-[95vh]" data-testid="section-hero">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rave-the-planet.jpg"
            alt="Rave for Good at Rave The Planet"
            className="w-full h-full object-cover object-center opacity-25"
            data-testid="img-hero-bg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30 z-10" />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_72%,rgba(109,94,245,0.14)_0%,rgba(77,163,255,0.07)_38%,transparent_68%)] z-[11] pointer-events-none"
            animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)] z-[12] pointer-events-none" />
        </div>

        <div className="container relative z-20 px-4 sm:px-6 pt-28 sm:pt-32 md:pt-24">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div custom={0.2} variants={fadeUp} initial="hidden" animate="visible">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground sm:mb-6">Berlin Music + Community Collective</p>
              <h1
                className="mb-6 font-display text-[clamp(2.75rem,14vw,9rem)] font-bold uppercase leading-[0.85] tracking-[-0.03em] sm:mb-8"
                data-testid="heading-hero"
              >
                Dance for Change
              </h1>
            </motion.div>

            <motion.p
              className="mx-auto mb-10 max-w-xl px-1 text-base font-light leading-relaxed text-foreground/55 sm:mb-12 sm:text-lg md:text-xl"
              custom={0.45}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              data-testid="text-hero-sub"
            >
              Rave for Good connects Berlin&apos;s electronic music culture with projects that create real social impact
            </motion.p>

            <motion.div
              className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
              custom={0.65}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Link href="/upcoming-events">
                <Button
                  size="lg"
                  className="btn-cta h-12 w-full rounded-none px-6 text-xs font-bold uppercase tracking-[0.14em] sm:h-14 sm:w-auto sm:px-10"
                  data-testid="button-hero-upcoming-events"
                >
                  Upcoming Events
                </Button>
              </Link>
              <Link href="/partners">
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-cta h-12 w-full rounded-none border-white/[0.18] bg-transparent px-6 text-xs font-bold uppercase tracking-[0.14em] text-foreground/65 hover:border-white/40 hover:text-foreground sm:h-14 sm:w-auto sm:px-10"
                  data-testid="button-hero-involved"
                >
                  Partner With Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none sm:h-32" />
      </section>

      <div className="w-full bg-card py-[14px] overflow-hidden flex border-y border-white/[0.055]" data-testid="section-marquee">
        <motion.div
          className="flex whitespace-nowrap gap-10 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="font-display font-medium text-xs uppercase tracking-[0.22em] text-muted-foreground">More than a party</span>
              <span className="text-primary/50 text-xs">✦</span>
              <span className="font-display font-medium text-xs uppercase tracking-[0.22em] text-muted-foreground">A scene that gives back</span>
              <span className="text-primary/50 text-xs">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      <section className="relative overflow-hidden bg-background py-20 sm:py-24 md:py-40" data-testid="section-concept">
        <div className="absolute top-0 left-0 h-[360px] w-[360px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.05)_0%,transparent_70%)] pointer-events-none sm:h-[600px] sm:w-[600px]" />

        <div className="container relative z-10 px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-12 lg:gap-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="lg:col-span-5" variants={itemFade}>
              <h2 className="font-display text-3xl font-bold uppercase leading-[1] tracking-[-0.025em] sm:text-4xl md:text-[3.25rem]">
                From dance floor <br />to direct impact
              </h2>
            </motion.div>
            <motion.div className="lg:col-span-7 flex flex-col justify-center" variants={itemFade}>
              <p className="max-w-[62ch] text-lg font-light leading-[1.65] text-foreground/55 sm:text-xl md:text-2xl">
                Rave for Good began in 2018 with a simple but powerful idea: to bring our community together through music and dance while creating a positive impact beyond the dance floor. What started as private raves quickly grew into a movement with purpose - raising awareness, collecting donations from our scene, and using the collective energy of nightlife to support meaningful initiatives.
              </p>
              <div className="mt-10">
                <Link href="/about">
                  <span className="link-line inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium uppercase tracking-[0.16em] text-[11px] transition-colors duration-200 cursor-pointer group" data-testid="link-concept-about">
                    Read our story
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SoundCloudPlayer />

      {nextCleanup ? (
        <section className="relative overflow-hidden border-y border-white/[0.08] bg-card py-16 sm:py-20 md:py-28" data-testid="section-next-cleanup">
          <div className="absolute right-0 top-0 h-[420px] w-[520px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.12)_0%,transparent_68%)] pointer-events-none" />
          <div className="container relative z-10 grid gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.65fr)] lg:items-center lg:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-readable" variants={itemFade}>
                Next cleanup
              </motion.p>
              <motion.h2 className="mb-5 font-display text-4xl font-bold uppercase leading-[0.92] tracking-[-0.03em] sm:text-5xl md:text-6xl" variants={itemFade}>
                <time dateTime={nextCleanup.date}>{formatEventDate(nextCleanup.date)}</time>
              </motion.h2>
              <motion.p className="mb-7 max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg" variants={itemFade}>
                {nextCleanupSummary}
              </motion.p>
              <motion.div className="flex flex-col gap-3 sm:flex-row" variants={itemFade}>
                <Button asChild size="lg" className="btn-cta h-12 rounded-none px-7 text-xs font-bold uppercase tracking-[0.14em]">
                  <Link href="/park-cleanup" data-testid="home-next-cleanup-details">
                    Cleanup details <ArrowRight size={14} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-none px-7 text-xs font-bold uppercase tracking-[0.14em]">
                  <a href={contactMailto(cleanupParticipationSubject(nextCleanup, "en"))} data-testid="home-next-cleanup-email">
                    Take part
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.figure
              className="overflow-hidden border border-white/[0.1] bg-background"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src={nextCleanup.image} alt={nextCleanup.imageAlt ?? nextCleanup.title} className="aspect-[7/6] h-full w-full object-cover" />
              {nextCleanup.imageCredit ? (
                <figcaption className="border-t border-white/[0.08] px-4 py-3 text-xs text-muted-foreground">
                  {nextCleanup.imageCredit}
                </figcaption>
              ) : null}
            </motion.figure>
          </div>
        </section>
      ) : null}

      <section className="bg-background pb-20 sm:pb-28 md:pb-40" data-testid="section-featured-event">
        <div className="container px-4 sm:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <motion.h2
              className="font-display text-3xl font-bold uppercase tracking-[-0.025em] sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              Past events <span className="text-primary">highlights</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <Link href="/upcoming-events">
                <span className="link-line uppercase tracking-[0.16em] text-[11px] font-medium text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-2 group transition-colors duration-200" data-testid="link-all-events">
                  All Events
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {pastEvents.map((event) => (
              <motion.article
                key={event.id}
                className="border border-white/[0.06] bg-card overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: easeOut }}
                data-testid={`home-past-event-${event.id}`}
              >
                <figure>
                  <img src={event.image} alt={event.imageAlt ?? `${event.title} event image`} className="h-56 w-full object-cover sm:h-72" />
                  {event.imageCredit ? (
                    <figcaption className="border-t border-white/[0.08] px-5 py-3 text-xs text-muted-foreground sm:px-6">
                      {event.imageCredit}
                    </figcaption>
                  ) : null}
                </figure>
                <div className="p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <time dateTime={event.date}>{formatEventDate(event.date, "en-GB", { weekday: undefined, day: "2-digit", month: "short" })}</time> · {event.city}
                  </p>
                  <h3 className="mt-4 mb-3 font-display text-xl font-bold uppercase leading-[1] tracking-[-0.015em] sm:text-2xl">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">{event.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-card py-20 sm:py-24 md:py-40" data-testid="section-impact">
        <div className="absolute top-1/2 right-0 h-[360px] w-[360px] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(ellipse,rgba(77,163,255,0.06)_0%,transparent_70%)] pointer-events-none sm:h-[700px] sm:w-[700px]" />

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: easeOut }}
            >
              <span className="text-primary-readable font-mono text-[10px] tracking-[0.2em] uppercase mb-5 block">Direct Action</span>
              <h2 className="mb-6 font-display text-3xl font-bold uppercase leading-[1] tracking-[-0.025em] sm:text-4xl md:text-[3.5rem] lg:text-[4rem]">
                Impact highlight:<br />Zigla Pakala, Burkina Faso
              </h2>
              <p className="mb-5 max-w-[52ch] text-base font-light leading-[1.7] text-foreground/55 sm:mb-6 sm:text-lg">
                Zigla Pakala in Burkina Faso is the first major focus of Rave for Good&apos;s humanitarian work. The project connects funds raised through music and community events with work focused on access to clean water.
              </p>
              <p className="mb-8 max-w-[52ch] text-base font-light leading-[1.7] text-foreground/55 sm:mb-12 sm:text-lg">
                The Impact page presents the association&apos;s current project record and clearly identifies where public supporting material has not yet been supplied.
              </p>

              <Link href="/impact">
                <Button
                  variant="outline"
                  className="btn-cta h-12 w-full rounded-none border-white/[0.18] bg-transparent px-6 font-bold uppercase tracking-[0.14em] text-foreground/65 hover:border-white/40 hover:text-foreground sm:h-14 sm:w-auto sm:px-8"
                  data-testid="button-impact-report"
                >
                  View Full Report
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="relative aspect-[5/4] border border-white/[0.06] bg-muted overflow-hidden sm:aspect-[4/5]"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: easeOut }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent z-10" />
              <img
                src="/images/zigla-pakala-well-2.jpg"
                alt="Well drilling process in Zigla Pakala"
                className="w-full h-full object-cover object-center"
                data-testid="img-impact-highlight"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between sm:bottom-6 sm:left-6 sm:right-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-bold bg-background/75 backdrop-blur-sm px-3 py-1.5 border border-white/[0.08]" data-testid="text-impact-location">
                  Zigla Pakala Water Access
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-20 sm:py-24 md:py-40" data-testid="section-get-involved">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <h2 className="mb-3 font-display text-3xl font-bold uppercase tracking-[-0.025em] sm:text-4xl md:text-[3.25rem]">
              Join the <em className="text-primary not-italic">Movement</em>
            </h2>
            <p className="text-muted-foreground text-sm font-light">Multiple ways to plug into the mission.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-px bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: Zap, title: "Attend", desc: "Show up to events and power direct fundraising through community participation.", link: "/upcoming-events" },
              { icon: HeartHandshake, title: "Donate", desc: "Directly fund our water infrastructure projects.", link: "/get-involved" },
              { icon: Droplets, title: "Partner", desc: "For venues, artists, and brands.", link: "/partners" },
              { icon: ArrowRight, title: "Volunteer", desc: "Join our crew on the ground in Berlin.", link: "/get-involved" }
            ].map((item, i) => (
              <motion.div key={i} variants={itemFade}>
                <Link href={item.link}>
                  <div
                    className="card-lift card-glow group h-full cursor-pointer border border-transparent bg-card p-6 hover:bg-background hover:border-white/[0.06] sm:p-8 md:p-10"
                    data-testid={`card-involved-${item.title.toLowerCase()}`}
                  >
                    <item.icon size={22} className="text-primary/60 mb-8 group-hover:text-primary transition-colors duration-200" />
                    <h3 className="font-display text-xl font-bold uppercase tracking-[-0.01em] mb-3 group-hover:text-foreground transition-colors duration-200">{item.title}</h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">{item.desc}</p>
                    <div className="mt-6 flex items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors duration-200">
                      <span className="font-mono text-[10px] uppercase tracking-widest">Explore</span>
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
