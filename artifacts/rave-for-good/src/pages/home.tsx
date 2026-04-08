import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Droplets, HeartHandshake, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";
import { impactData } from "@/data/impact";
import { partners } from "@/data/partners";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }
  })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  const upcomingEvents = events.filter(e => e.status === "upcoming").slice(0, 1);

  return (
    <div className="w-full">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">

        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Atmospheric Berlin club"
            className="w-full h-full object-cover object-center grayscale mix-blend-luminosity opacity-25"
            data-testid="img-hero-bg"
          />
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/15 z-10" />
          {/* Animated violet/blue glow — breathing depth */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_72%,rgba(109,94,245,0.14)_0%,rgba(77,163,255,0.07)_38%,transparent_68%)] z-[11] pointer-events-none"
            animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)] z-[12] pointer-events-none" />
        </div>

        {/* Content */}
        <div className="container relative z-20 px-4 md:px-6 pt-24">
          <div className="max-w-5xl mx-auto text-center">

            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h1
                className="font-display text-[clamp(3rem,10vw,9rem)] font-bold tracking-[-0.03em] uppercase leading-[0.85] mb-8"
                data-testid="heading-hero"
              >
                We turn{" "}
                <em className="text-primary not-italic">dancefloors</em>
                <br />
                into direct impact.
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-foreground/55 mb-12 max-w-xl mx-auto font-light leading-relaxed"
              custom={0.45}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              data-testid="text-hero-sub"
            >
              Berlin nightlife, channelled into clean water and community action.
              Built in Berlin. Felt in Burkina Faso.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              custom={0.65}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Link href="/events">
                <Button
                  size="lg"
                  className="btn-cta w-full sm:w-auto rounded-none font-bold tracking-[0.14em] uppercase text-xs px-10 h-14"
                  data-testid="button-hero-events"
                >
                  View Events
                </Button>
              </Link>
              <Link href="/get-involved">
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-cta w-full sm:w-auto rounded-none border-white/[0.18] text-foreground/65 hover:border-white/40 hover:text-foreground font-bold tracking-[0.14em] uppercase text-xs px-10 h-14 bg-transparent"
                  data-testid="button-hero-involved"
                >
                  Support the Mission
                </Button>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Bottom gradient fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────── */}
      <div className="w-full bg-card py-[14px] overflow-hidden flex border-y border-white/[0.055]" data-testid="section-marquee">
        <motion.div
          className="flex whitespace-nowrap gap-10 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="font-display font-medium text-xs uppercase tracking-[0.22em] text-foreground/30">More than a party</span>
              <span className="text-primary/50 text-xs">✦</span>
              <span className="font-display font-medium text-xs uppercase tracking-[0.22em] text-foreground/30">A scene that gives back</span>
              <span className="text-primary/50 text-xs">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── CONCEPT ──────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-background relative overflow-hidden" data-testid="section-concept">
        {/* Section radial glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="lg:col-span-5" variants={itemFade}>
              <h2 className="font-display text-4xl md:text-[3.25rem] font-bold uppercase tracking-[-0.025em] leading-[1.0] mb-0">
                From the booth <br/>to the field.
              </h2>
            </motion.div>
            <motion.div className="lg:col-span-7 flex flex-col justify-center" variants={itemFade}>
              <p className="text-xl md:text-2xl text-foreground/55 leading-[1.65] font-light max-w-[62ch]">
                Rave for Good bridges the gap between Berlin's vibrant electronic music culture and urgent humanitarian needs. We organize high-impact club nights where 100% of proceeds go directly to carefully vetted community projects, starting with clean water access in Burkina Faso.
              </p>
              <div className="mt-10">
                <Link href="/about">
                  <span className="link-line inline-flex items-center gap-2 text-foreground/45 hover:text-foreground font-medium uppercase tracking-[0.16em] text-[11px] transition-colors duration-200 cursor-pointer group" data-testid="link-concept-about">
                    Read our story
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED EVENT ───────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="pb-28 md:pb-40 bg-background" data-testid="section-featured-event">
          <div className="container px-4 md:px-6">

            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <motion.h2
                className="font-display text-4xl md:text-5xl font-bold uppercase tracking-[-0.025em]"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Next <span className="text-primary">Event</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="/events">
                  <span className="link-line uppercase tracking-[0.16em] text-[11px] font-medium text-foreground/35 hover:text-foreground/70 cursor-pointer flex items-center gap-2 group transition-colors duration-200" data-testid="link-all-events">
                    All Events
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Full-bleed event card */}
            <motion.div
              className="group relative overflow-hidden card-lift card-glow border border-white/[0.06] hover:border-white/[0.1]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "21/9" }}>
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10 z-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent z-20" />
                <img
                  src={upcomingEvents[0].image}
                  alt={upcomingEvents[0].title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-[30%] transition-all duration-700 scale-[1.04] group-hover:scale-100"
                  data-testid="img-featured-event"
                />
                {/* Text content over image */}
                <div className="absolute inset-0 z-30 flex items-center">
                  <div className="px-10 md:px-16 py-10 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                      <span className="border border-white/[0.14] text-foreground/60 px-3 py-[5px] font-mono text-[10px] font-bold uppercase tracking-[0.14em]" data-testid="text-featured-date">
                        {new Date(upcomingEvents[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="font-mono text-[10px] text-foreground/45 uppercase tracking-[0.14em]" data-testid="text-featured-venue">
                        {upcomingEvents[0].venue}, {upcomingEvents[0].city}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.025em] leading-[0.9] mb-6" data-testid="heading-featured-title">
                      {upcomingEvents[0].title}
                    </h3>
                    <p className="text-foreground/60 mb-8 text-sm md:text-base font-light leading-relaxed max-w-[50ch] hidden sm:block" data-testid="text-featured-desc">
                      {upcomingEvents[0].description}
                    </p>
                    <Button
                      className="btn-cta rounded-none font-bold tracking-[0.14em] uppercase h-12 px-8 group/btn"
                      data-testid="button-featured-tickets"
                    >
                      Get Tickets
                      <ArrowUpRight size={16} className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      )}

      {/* ─── IMPACT HIGHLIGHT ─────────────────────────────── */}
      <section className="py-28 md:py-40 bg-card relative overflow-hidden" data-testid="section-impact">
        {/* Section glow */}
        <div className="absolute top-1/2 right-0 w-[700px] h-[700px] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(ellipse,rgba(77,163,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase mb-5 block">Direct Action</span>
              <h2 className="font-display text-4xl md:text-[3.5rem] lg:text-[4rem] font-bold uppercase tracking-[-0.025em] leading-[1.0] mb-6">
                Project:<br/>Zigla Pakala
              </h2>
              <p className="text-lg text-foreground/55 mb-12 leading-[1.7] font-light max-w-[52ch]">
                Our flagship initiative funding clean water infrastructure in Burkina Faso. What starts as sweat and sound in Berlin becomes life-changing infrastructure.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <div className="font-display text-[2.8rem] md:text-5xl font-bold text-primary tracking-[-0.02em] leading-none mb-2" data-testid="stat-impact-raised">{impactData.stats.amountRaised}</div>
                  <div className="font-mono text-[10px] text-foreground/35 uppercase tracking-[0.18em]">Raised to date</div>
                </div>
                <div>
                  <div className="font-display text-[2.8rem] md:text-5xl font-bold text-primary tracking-[-0.02em] leading-none mb-2" data-testid="stat-impact-served">{impactData.stats.peopleServed}+</div>
                  <div className="font-mono text-[10px] text-foreground/35 uppercase tracking-[0.18em]">People Served</div>
                </div>
              </div>

              <Link href="/impact">
                <Button
                  variant="outline"
                  className="btn-cta rounded-none border-white/[0.18] text-foreground/65 hover:border-white/40 hover:text-foreground font-bold tracking-[0.14em] uppercase h-14 px-8 bg-transparent"
                  data-testid="button-impact-report"
                >
                  View Full Report
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="relative aspect-[4/5] bg-muted overflow-hidden border border-white/[0.06]"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent z-10" />
              <img
                src="/images/impact.png"
                alt="Well project in Burkina Faso"
                className="w-full h-full object-cover object-center"
                data-testid="img-impact-highlight"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-bold bg-background/75 backdrop-blur-sm px-3 py-1.5 border border-white/[0.08]" data-testid="text-impact-location">
                  {impactData.stats.location}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary/80 font-bold">
                  Phase 1 ✓
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── GET INVOLVED ─────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-background relative overflow-hidden" data-testid="section-get-involved">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl md:text-[3.25rem] font-bold uppercase tracking-[-0.025em] mb-3">
              Join the <em className="text-primary not-italic">Movement</em>
            </h2>
            <p className="text-foreground/40 text-sm font-light">Multiple ways to plug into the mission.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: Zap, title: "Attend", desc: "Dance for a cause at our upcoming events.", link: "/events" },
              { icon: HeartHandshake, title: "Donate", desc: "Directly fund our water infrastructure projects.", link: "/get-involved" },
              { icon: Droplets, title: "Partner", desc: "For venues, artists, and brands.", link: "/partners" },
              { icon: ArrowRight, title: "Volunteer", desc: "Join our crew on the ground in Berlin.", link: "/contact" }
            ].map((item, i) => (
              <motion.div key={i} variants={itemFade}>
                <Link href={item.link}>
                  <div
                    className="h-full bg-card p-8 md:p-10 card-lift card-glow hover:bg-background group cursor-pointer border border-transparent hover:border-white/[0.06]"
                    data-testid={`card-involved-${item.title.toLowerCase()}`}
                  >
                    <item.icon size={22} className="text-primary/60 mb-8 group-hover:text-primary transition-colors duration-200" />
                    <h3 className="font-display text-xl font-bold uppercase tracking-[-0.01em] mb-3 group-hover:text-foreground transition-colors duration-200">{item.title}</h3>
                    <p className="text-foreground/45 text-sm font-light leading-relaxed">{item.desc}</p>
                    <div className="mt-6 flex items-center gap-1.5 text-foreground/25 group-hover:text-primary transition-colors duration-200">
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

      {/* ─── PARTNERS ─────────────────────────────────────── */}
      <section className="py-16 border-y border-white/[0.055] bg-card overflow-hidden" data-testid="section-partners">
        <div className="container px-4 md:px-6">
          <p className="text-center font-mono text-[10px] text-foreground/25 uppercase tracking-[0.22em] mb-12">Supported by the scene</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="font-display font-bold text-xl md:text-2xl uppercase tracking-[-0.01em] text-foreground/18 hover:text-foreground/55 transition-colors duration-400 cursor-default"
                data-testid={`text-partner-${i}`}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
