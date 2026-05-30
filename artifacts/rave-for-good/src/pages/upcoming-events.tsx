import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut }
  }
};

export default function UpcomingEvents() {
  return (
    <div className="w-full relative overflow-hidden" data-testid="page-upcoming-events">
      <div className="absolute right-0 top-0 h-[360px] w-[360px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.075)_0%,transparent_68%)] pointer-events-none sm:h-[680px] sm:w-[760px]" />
      <div className="absolute bottom-0 left-0 h-[320px] w-[320px] bg-[radial-gradient(ellipse,rgba(77,163,255,0.055)_0%,transparent_70%)] pointer-events-none sm:h-[520px] sm:w-[520px]" />

      <div className="pt-24 pb-14 sm:pt-28 sm:pb-24 md:pt-44 md:pb-36">
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="mb-12 max-w-5xl sm:mb-20 md:mb-28">
            <motion.div
              className="mb-6 flex items-center gap-2 sm:mb-8 sm:gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                Calendar
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 font-display text-[clamp(2.8rem,13vw,9rem)] font-bold uppercase leading-[0.86] tracking-[-0.035em] sm:mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              Upcoming <br />
              <span className="text-primary">Events</span>
            </motion.h1>

            <motion.p
              className="max-w-2xl text-lg font-light leading-relaxed text-foreground/55 sm:text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Rave for Good appearances, collaborations and fundraisers.
            </motion.p>
          </div>

          <motion.article
            className="group grid overflow-hidden border border-white/[0.06] bg-card lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            data-testid="card-rfg-nova"
          >
            <div className="relative aspect-[1068/645] overflow-hidden bg-background lg:aspect-auto lg:min-h-[520px] lg:bg-muted">
              <img
                src="/images/events/rfg-nova/festival-flyer.jpg"
                alt="RFG at NOVUM festival flyer for June 26 to 29, 2026"
                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/82 via-background/16 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card/36" />
            </div>

            <div className="flex min-w-0 flex-col justify-between p-5 sm:p-8 md:p-10 lg:p-12">
              <div>
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                  Featured appearance
                </p>
                <h2 className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-[-0.035em] text-foreground/92 sm:text-5xl md:text-6xl">
                  RFG @ Nova
                </h2>

                <div className="mb-8 grid gap-3 border-y border-white/[0.06] py-5 font-mono text-[10px] uppercase tracking-[0.11em] text-foreground/38 sm:grid-cols-2 sm:tracking-[0.16em]">
                  <div className="flex min-w-0 items-center gap-2">
                    <CalendarDays size={14} className="shrink-0 text-primary/70" />
                    <span className="min-w-0 leading-relaxed">June 26–29, 2026</span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2">
                    <MapPin size={14} className="shrink-0 text-accent/70" />
                    <span className="min-w-0 leading-relaxed">Palace in Debrznica, Poland</span>
                  </div>
                </div>

                <p className="max-w-[54ch] text-base font-light leading-relaxed text-foreground/55 sm:text-lg">
                  Rave for Good joins NOVUM for a four-day electronic music gathering at a 19th-century palace in the forest, surrounded by water, nature and open-air dancefloors.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/upcoming-events/rfg-nova" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="btn-cta h-12 w-full rounded-none px-6 text-xs font-bold uppercase tracking-[0.14em] sm:w-auto sm:px-8"
                    data-testid="link-rfg-nova"
                  >
                    View Event
                    <ArrowRight size={14} />
                  </Button>
                </Link>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/28">
                  Palace in Debrznica
                </span>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
