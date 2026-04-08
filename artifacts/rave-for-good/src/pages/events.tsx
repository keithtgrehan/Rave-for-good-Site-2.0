import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Events() {
  const upcomingEvents = events.filter(e => e.status === "upcoming");
  const pastEvents = events.filter(e => e.status === "past");

  return (
    <div className="w-full pt-32 pb-24 md:pt-40 md:pb-32" data-testid="page-events">
      <div className="container px-4 md:px-6">
        
        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-events"
          >
            The <br/><span className="text-primary">Agenda</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-foreground/70 font-mono uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Dancefloors engineered for direct action.
          </motion.p>
        </div>

        {/* UPCOMING EVENTS */}
        <div className="mb-32">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tighter mb-10 flex items-center gap-4">
            <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            Upcoming
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 gap-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {upcomingEvents.map((event) => (
              <motion.div 
                key={event.id}
                variants={cardVariant}
                className="group border border-border bg-card hover:border-primary transition-colors grid grid-cols-1 md:grid-cols-12 overflow-hidden"
                data-testid={`event-card-${event.id}`}
              >
                <div className="md:col-span-4 aspect-video md:aspect-auto bg-muted relative overflow-hidden border-b md:border-b-0 md:border-r border-border">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                </div>
                <div className="md:col-span-8 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest">
                      {event.venue}, {event.city}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">
                    {event.title}
                  </h3>
                  <p className="text-foreground/70 mb-8 max-w-2xl">
                    {event.description}
                  </p>
                  <Button className="w-fit rounded-none font-bold tracking-widest uppercase group/btn px-8" data-testid={`button-tickets-${event.id}`}>
                    Get Tickets
                    <ArrowUpRight size={16} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* PAST EVENTS */}
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tighter mb-10 text-foreground/50 border-b border-border pb-4">
            Archive & Impact
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {pastEvents.map((event) => (
              <motion.div 
                key={event.id}
                variants={cardVariant}
                className="border border-border bg-background p-8"
                data-testid={`past-event-${event.id}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="font-mono text-xs text-foreground/50 uppercase tracking-widest">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest mb-1">Raised</div>
                    <div className="font-display text-xl font-bold text-primary">{event.amountRaised}</div>
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">
                  {event.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
