import { motion } from "framer-motion";
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
  const pastEvents = events.filter((event) => event.status === "past");

  return (
    <div className="w-full relative overflow-hidden" data-testid="page-events">
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mb-24 md:mb-36">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-mono text-[10px] text-primary/70 uppercase tracking-[0.2em]">Archive</span>
            </motion.div>
            <motion.h1
              className="font-display text-[clamp(4rem,12vw,9rem)] font-bold uppercase tracking-[-0.035em] leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] mb-4 text-foreground/30 border-b border-white/[0.055] pb-4">
              Recent community milestones
            </h2>
            <p className="text-foreground/45 text-sm font-light leading-relaxed mb-10 max-w-[48ch]">
              Each recap captures what happened on the night and what it helped fund beyond the dance floor.
            </p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
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
                  <img src={event.image} alt={event.title} className="h-80 w-full object-cover" />
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-[-0.01em] leading-[1.0] mb-4">{event.title}</h3>
                    <p className="font-mono text-[10px] text-foreground/30 uppercase tracking-[0.16em] mb-4">
                      {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} · {event.city} · {event.venue}
                    </p>
                    <p className="text-foreground/45 text-sm font-light leading-relaxed max-w-[52ch]">{event.description}</p>
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
