import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut }
  }
};

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function UpcomingEvents() {
  const upcomingEvents = events.filter((event) => event.status === "upcoming");

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

          {upcomingEvents.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              data-testid="upcoming-events-list"
            >
              {upcomingEvents.map((event) => (
                <motion.article
                  key={event.id}
                  className="card-lift flex min-w-0 flex-col overflow-hidden border border-white/[0.06] bg-card"
                  variants={fadeUp}
                  data-testid={`upcoming-event-${event.id}`}
                >
                  <div className="bg-background p-3 sm:p-5">
                    <img
                      src={event.image}
                      alt={`${event.title} event flyer`}
                      width="1080"
                      height="1440"
                      className="aspect-[3/4] h-auto w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70">
                      <time dateTime={event.date}>{formatEventDate(event.date)}</time>
                    </p>
                    <h2 className="mb-5 font-display text-3xl font-bold uppercase leading-[0.92] tracking-[-0.025em] text-foreground/92 sm:text-4xl">
                      {event.title}
                    </h2>

                    <div className="mb-6 space-y-2 border-y border-white/[0.07] py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/48">
                      {event.startTime && event.endTime ? (
                        <p>
                          <time dateTime={`${event.date}T${event.startTime}`}>{event.startTime}</time>
                          <span aria-hidden="true">–</span>
                          <time dateTime={`${event.date}T${event.endTime}`}>{event.endTime}</time>
                        </p>
                      ) : null}
                      <p>{event.city} · {event.venue}</p>
                    </div>

                    <p className="mb-8 flex-1 text-sm font-light leading-relaxed text-foreground/52 sm:text-base">
                      {event.description}
                    </p>

                    {event.detailPath ? (
                      <Button
                        asChild
                        size="lg"
                        className="btn-cta h-12 w-full rounded-none px-6 text-xs font-bold uppercase tracking-[0.14em] sm:w-auto sm:px-8"
                      >
                        <Link
                          href={event.detailPath}
                          data-testid={`link-upcoming-event-${event.id}`}
                        >
                          View Event
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="border border-white/[0.06] bg-card p-6 sm:p-8 md:p-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              data-testid="upcoming-events-empty-state"
            >
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                No upcoming events announced
              </p>
              <h2 className="mb-5 max-w-3xl font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] text-foreground/92 sm:text-4xl md:text-5xl">
                New dates will be shared when they are ready
              </h2>
              <p className="mb-8 max-w-2xl text-base font-light leading-relaxed text-foreground/55 sm:text-lg">
                Until the next event is announced, explore the archive to see how the community has already shown up for music, local action and fundraising.
              </p>
              <Button
                asChild
                size="lg"
                className="btn-cta h-12 w-full rounded-none px-6 text-xs font-bold uppercase tracking-[0.14em] sm:w-auto sm:px-8"
              >
                <Link href="/events" data-testid="link-upcoming-events-archive">
                  View Past Events
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
