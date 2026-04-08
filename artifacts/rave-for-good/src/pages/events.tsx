import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Events() {
  const upcomingEvents = events.filter(e => e.status === "upcoming");
  const pastEvents = events.filter(e => e.status === "past");

  return (
    <div className="w-full relative overflow-hidden" data-testid="page-events">
      {/* Page ambient glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="container px-4 md:px-6 relative z-10">

          {/* Page header */}
          <div className="mb-24 md:mb-36">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-primary/70 uppercase tracking-[0.2em]">Live Schedule</span>
            </motion.div>
            <motion.h1
              className="font-display text-[clamp(4rem,12vw,9rem)] font-bold uppercase tracking-[-0.035em] leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              data-testid="heading-events"
            >
              The <br/><span className="text-primary">Agenda</span>
            </motion.h1>
            <motion.p
              className="text-[11px] text-foreground/35 font-mono uppercase tracking-[0.22em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Dancefloors engineered for direct action.
            </motion.p>
          </div>

          {/* ─── UPCOMING EVENTS ──────────────────────────── */}
          <div className="mb-32 md:mb-44">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] mb-10 flex items-center gap-3 text-foreground/40 border-b border-white/[0.055] pb-4">
              Upcoming
            </h2>

            <motion.div
              className="flex flex-col gap-4"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={cardVariant}
                  className="group relative overflow-hidden card-lift card-glow border border-white/[0.06] hover:border-white/[0.1]"
                  data-testid={`event-card-${event.id}`}
                >
                  {/* Full-bleed image with content overlay */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "21/8" }}>
                    {/* Gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/65 to-background/10 z-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-20" />

                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-[20%] transition-all duration-700 scale-[1.04] group-hover:scale-100"
                    />

                    {/* Overlaid content */}
                    <div className="relative z-30 h-full flex items-center px-8 md:px-14 py-8">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <span className="border border-white/[0.15] text-foreground/65 px-3 py-[5px] font-mono text-[10px] font-bold uppercase tracking-[0.14em] bg-background/20 backdrop-blur-sm">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="font-mono text-[10px] text-foreground/45 uppercase tracking-[0.14em]">
                            {event.venue}, {event.city}
                          </span>
                        </div>

                        <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-[-0.025em] leading-[0.9] mb-4">
                          {event.title}
                        </h3>

                        <p className="text-foreground/55 mb-7 text-sm font-light leading-relaxed max-w-[48ch] hidden md:block">
                          {event.description}
                        </p>

                        <Button
                          className="btn-cta rounded-none font-bold tracking-[0.14em] uppercase h-12 px-8 group/btn"
                          data-testid={`button-tickets-${event.id}`}
                        >
                          Get Tickets
                          <ArrowUpRight size={15} className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ─── ARCHIVE ──────────────────────────────────── */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] mb-10 text-foreground/30 border-b border-white/[0.055] pb-4">
              Archive & Impact
            </h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {pastEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={cardVariant}
                  className="group bg-card hover:bg-background p-8 md:p-10 card-lift transition-colors duration-200 relative overflow-hidden"
                  data-testid={`past-event-${event.id}`}
                >
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(109,94,245,0.04)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="font-mono text-[10px] text-foreground/30 uppercase tracking-[0.16em]">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[9px] text-foreground/25 uppercase tracking-widest mb-1.5">Raised</div>
                        <div className="font-display text-xl font-bold text-primary/75 tracking-[-0.01em]">{event.amountRaised}</div>
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-[-0.01em] leading-[1.0] mb-4">
                      {event.title}
                    </h3>
                    <p className="text-foreground/45 text-sm font-light leading-relaxed max-w-[52ch]">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
