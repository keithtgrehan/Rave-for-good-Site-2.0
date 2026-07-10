import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { events } from "@/data/events";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
};

export default function Events() {
  const pastEvents = events.filter((event) => event.status === "past");

  return (
    <div className="w-full relative overflow-hidden" data-testid="page-events">
      <div className="absolute top-0 right-0 h-[320px] w-[360px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.06)_0%,transparent_65%)] pointer-events-none sm:h-[600px] sm:w-[800px]" />

      <div className="pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-44 md:pb-36">
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="mb-16 sm:mb-24 md:mb-36">
            <motion.div
              className="mb-6 flex items-center gap-2 sm:mb-8 sm:gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-mono text-[10px] text-primary/70 uppercase tracking-[0.2em]">Archive</span>
            </motion.div>
            <motion.h1
              className="mb-6 font-display text-[clamp(3rem,15vw,9rem)] font-bold uppercase leading-[0.85] tracking-[-0.035em] sm:mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
              data-testid="heading-events"
            >
              Past <br />
              <span className="text-primary">Events</span>
            </motion.h1>
            <motion.p
              className="text-[11px] text-foreground/35 font-mono uppercase tracking-[0.22em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Music, people, and purpose in action.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: easeOut }}
            >
              <Link
                href="/upcoming-events"
                className="link-line group mt-8 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary transition-colors duration-200 hover:text-accent"
                data-testid="link-events-upcoming"
              >
                Upcoming Events
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div>
            <h2 className="mb-4 border-b border-white/[0.055] pb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground/30 sm:text-sm">
              Recent community milestones
            </h2>
            <p className="text-foreground/45 text-sm font-light leading-relaxed mb-10 max-w-[48ch]">
              Each recap captures what happened on the night and what it helped fund beyond the dance floor.
            </p>

            <motion.div
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {pastEvents.map((event) => (
                <motion.article
                  key={event.id}
                  variants={cardVariant}
                  className="group bg-card border border-white/[0.06] overflow-hidden"
                  data-testid={`past-event-${event.id}`}
                >
                  <img src={event.image} alt={event.title} className="h-56 w-full object-cover sm:h-72 md:h-80" />
                  <div className="p-5 sm:p-8">
                    <h3 className="mb-4 font-display text-xl font-bold uppercase leading-[1] tracking-[-0.01em] sm:text-2xl">{event.title}</h3>
                    <p className="font-mono text-[10px] text-foreground/30 uppercase tracking-[0.16em] mb-4">
                      {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} · {event.city} · {event.venue}
                    </p>
                    <p className="text-foreground/45 text-sm font-light leading-relaxed max-w-[52ch]">{event.description}</p>
                    {event.detailPath ? (
                      <Link href={event.detailPath}>
                        <span className="link-line mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/40 transition-colors hover:text-primary" data-testid={`link-past-event-${event.id}`}>
                          View Archive
                          <ArrowRight size={13} />
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
