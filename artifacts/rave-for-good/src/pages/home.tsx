import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Droplets, HeartHandshake, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";
import { impactData } from "@/data/impact";
import { partners } from "@/data/partners";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const upcomingEvents = events.filter(e => e.status === "upcoming").slice(0, 1);
  const pastEvents = events.filter(e => e.status === "past").slice(0, 2);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 z-0">
          {/* Atmospheric violet/blue depth lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_75%,rgba(77,163,255,0.07)_0%,rgba(109,94,245,0.05)_35%,transparent_65%)] z-[11] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10 z-10" />
          <img
            src="/images/hero.png"
            alt="Atmospheric Berlin club crowd"
            className="w-full h-full object-cover object-center grayscale mix-blend-luminosity opacity-30"
            data-testid="img-hero-bg"
          />
        </div>

        <div className="container relative z-20 px-4 md:px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6" data-testid="heading-hero">
                We turn <span className="text-primary italic px-2">dancefloors</span><br/>into direct impact.
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              data-testid="text-hero-sub"
            >
              Berlin nightlife, channelled into clean water and community action. Built in Berlin. Felt in Burkina Faso.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/events">
                <Button size="lg" className="w-full sm:w-auto rounded-none font-bold tracking-widest uppercase text-sm px-8 py-6 h-auto" data-testid="button-hero-events">
                  View Events
                </Button>
              </Link>
              <Link href="/get-involved">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-none border-white/20 text-foreground/70 hover:border-white/40 hover:text-foreground font-bold tracking-widest uppercase text-sm px-8 py-6 h-auto bg-transparent transition-colors" data-testid="button-hero-involved">
                  Support the Mission
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="w-full bg-card py-4 overflow-hidden flex border-y border-white/[0.06]" data-testid="section-marquee">
        <motion.div
          className="flex whitespace-nowrap gap-8 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 26, repeat: Infinity }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="font-display font-medium text-sm uppercase tracking-[0.18em] text-foreground/35">More than a party</span>
              <span className="text-primary/60 text-sm">✦</span>
              <span className="font-display font-medium text-sm uppercase tracking-[0.18em] text-foreground/35">A scene that gives back</span>
              <span className="text-primary/60 text-sm">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CONCEPT INTRO */}
      <section className="py-24 md:py-32 bg-background border-b border-white/[0.06]" data-testid="section-concept">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="lg:col-span-5" variants={fadeIn}>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
                From the booth <br/>to the field.
              </h2>
            </motion.div>
            <motion.div className="lg:col-span-7 flex flex-col justify-center" variants={fadeIn}>
              <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light">
                Rave for Good bridges the gap between Berlin's vibrant electronic music culture and urgent humanitarian needs. We organize high-impact club nights where 100% of proceeds go directly to carefully vetted community projects, starting with clean water access in Burkina Faso.
              </p>
              <div className="mt-8">
                <Link href="/about">
                  <span className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground font-medium uppercase tracking-widest text-xs transition-colors cursor-pointer group" data-testid="link-concept-about">
                    Read our story
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED EVENT */}
      {upcomingEvents.length > 0 && (
        <section className="py-24 md:py-32 bg-card" data-testid="section-featured-event">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <motion.h2
                className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Next <span className="text-primary">Dance</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link href="/events">
                  <span className="uppercase tracking-widest text-xs font-medium text-foreground/40 hover:text-foreground/80 cursor-pointer flex items-center gap-2 group transition-colors" data-testid="link-all-events">
                    All Events
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="group relative border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[4/3] lg:aspect-auto bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-background/20 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-700" />
                  <img
                    src={upcomingEvents[0].image}
                    alt={upcomingEvents[0].title}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    data-testid="img-featured-event"
                  />
                </div>
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="border border-white/[0.12] text-foreground/50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]" data-testid="text-featured-date">
                      {new Date(upcomingEvents[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest" data-testid="text-featured-venue">
                      {upcomingEvents[0].venue}, {upcomingEvents[0].city}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6" data-testid="heading-featured-title">
                    {upcomingEvents[0].title}
                  </h3>
                  <p className="text-foreground/60 mb-10 text-base font-light leading-relaxed" data-testid="text-featured-desc">
                    {upcomingEvents[0].description}
                  </p>
                  <Button className="w-fit rounded-none font-bold tracking-widest uppercase group/btn h-14 px-8" data-testid="button-featured-tickets">
                    Get Tickets
                    <ArrowUpRight size={18} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* IMPACT HIGHLIGHT */}
      <section className="py-24 md:py-32 bg-background border-y border-white/[0.06]" data-testid="section-impact">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-mono text-[10px] tracking-[0.18em] uppercase mb-4 block">Direct Action</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
                Project:<br/>Zigla Pakala
              </h2>
              <p className="text-lg text-foreground/60 mb-10 leading-relaxed font-light">
                Our flagship initiative funding clean water infrastructure in Burkina Faso. What starts as sweat and sound in Berlin becomes life-changing infrastructure.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-impact-raised">{impactData.stats.amountRaised}</div>
                  <div className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">Raised to date</div>
                </div>
                <div>
                  <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-impact-served">{impactData.stats.peopleServed}+</div>
                  <div className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">People Served</div>
                </div>
              </div>

              <Link href="/impact">
                <Button variant="outline" className="rounded-none border-white/20 text-foreground/70 hover:border-white/40 hover:text-foreground font-bold tracking-widest uppercase h-14 px-8 bg-transparent transition-colors" data-testid="button-impact-report">
                  View Full Report
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="relative aspect-square lg:aspect-[4/5] bg-muted overflow-hidden border border-white/[0.06]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
              <img
                src="/images/impact.png"
                alt="Well project in Burkina Faso"
                className="w-full h-full object-cover object-center"
                data-testid="img-impact-highlight"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold bg-background/70 backdrop-blur px-3 py-1 border border-white/[0.08]" data-testid="text-impact-location">
                  {impactData.stats.location}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80 font-bold">
                  Phase 1 Complete
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GET INVOLVED CARDS */}
      <section className="py-24 md:py-32 bg-card" data-testid="section-get-involved">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
              Join the <span className="text-primary italic px-1">Movement</span>
            </h2>
            <p className="text-foreground/50 text-base font-light">Multiple ways to plug into the mission.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: Zap, title: "Attend", desc: "Dance for a cause at our upcoming events.", link: "/events" },
              { icon: HeartHandshake, title: "Donate", desc: "Directly fund our water infrastructure projects.", link: "/get-involved" },
              { icon: Droplets, title: "Partner", desc: "For venues, artists, and brands.", link: "/partners" },
              { icon: ArrowRight, title: "Volunteer", desc: "Join our crew on the ground in Berlin.", link: "/contact" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Link href={item.link}>
                  <div className="h-full bg-background p-8 hover:bg-card transition-colors duration-300 group cursor-pointer" data-testid={`card-involved-${item.title.toLowerCase()}`}>
                    <item.icon size={24} className="text-primary/70 mb-6 group-hover:text-primary transition-colors duration-300" />
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-3">{item.title}</h3>
                    <p className="text-foreground/50 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARTNERS STRIP */}
      <section className="py-16 border-y border-white/[0.06] bg-background overflow-hidden" data-testid="section-partners">
        <div className="container px-4 md:px-6">
          <p className="text-center font-mono text-[10px] text-foreground/30 uppercase tracking-[0.18em] mb-10">Supported by the scene</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center">
            {partners.map((partner, i) => (
              <div key={i} className="font-display font-bold text-xl md:text-2xl uppercase tracking-tighter text-foreground/20 hover:text-foreground/60 transition-colors duration-500 cursor-default" data-testid={`text-partner-${i}`}>
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
