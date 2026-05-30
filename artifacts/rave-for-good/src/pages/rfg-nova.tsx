import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ticketUrl = "https://kicket.com/wydarzenia/novum-palac-debrznica-21966?eventId=318928";
const imageBasePath = "/images/events/rfg-nova";
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut }
  }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const conceptCards = [
  {
    title: "Nature",
    copy: "The palace grounds become a meeting point for trees, water and sound, with the forest setting the tempo around the dancefloor."
  },
  {
    title: "Music",
    copy: "An electronic journey from organic deep house and tech-house into powerful techno, moving from daylight into late-night discovery."
  },
  {
    title: "Art",
    copy: "Workshops, meditation and relaxation zones create space to recharge before returning fully to the festival experience."
  },
  {
    title: "People",
    copy: "Tolerance, freedom and community shape the weekend, bringing dancers together around shared passion and positive energy."
  }
];

const placesOfPower = [
  {
    title: "Earth",
    styles: "deep house • tech-house • melodic",
    copy: "The main palace hall — a light and sound feast for the senses."
  },
  {
    title: "Fire",
    styles: "techno • minimal • industrial",
    copy: "The palace basement — built for the strongest rhythms."
  },
  {
    title: "Water",
    styles: "deep house • house",
    copy: "The waterside stage — daytime organic sounds, sun and dance."
  },
  {
    title: "Air",
    styles: "chill spot • food court",
    copy: "A space to rest, breathe and reset between sets."
  }
];

const venueImages = [
  {
    src: `${imageBasePath}/venue-aerial.jpg`,
    alt: "Aerial view of Palace in Debrznica with the surrounding forest and water reservoir",
    caption: "Palace grounds"
  },
  {
    src: `${imageBasePath}/venue-lake.jpg`,
    alt: "Lake and forest dancefloor setting at the Palace in Debrznica",
    caption: "Waterside setting"
  },
  {
    src: `${imageBasePath}/venue-ship-stage.jpg`,
    alt: "Wooden ship stage beside the lake at the NOVUM festival site",
    caption: "Ship stage"
  },
  {
    src: `${imageBasePath}/venue-interior.jpg`,
    alt: "Interior lounge area inside the Palace in Debrznica with plants and warm wood details",
    caption: "Palace interior"
  }
];

export default function RfgNova() {
  return (
    <div className="w-full relative overflow-hidden" data-testid="page-rfg-nova">
      <div className="absolute right-0 top-0 h-[420px] w-[420px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.08)_0%,transparent_68%)] pointer-events-none sm:h-[760px] sm:w-[820px]" />
      <div className="absolute left-0 top-[45rem] h-[360px] w-[360px] bg-[radial-gradient(ellipse,rgba(77,163,255,0.055)_0%,transparent_70%)] pointer-events-none sm:h-[640px] sm:w-[640px]" />

      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-24 md:pt-40 md:pb-32" data-testid="hero-rfg-nova">
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 xl:gap-24">
            <motion.div
              className="flex min-w-0 flex-col justify-center"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div className="mb-6 flex items-center gap-3" variants={fadeUp}>
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                  Upcoming Event
                </span>
              </motion.div>

              <motion.h1
                className="mb-6 font-display text-[clamp(3.25rem,14vw,9rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
                variants={fadeUp}
              >
                RFG @ <br />
                <span className="text-primary">NOVUM</span>
              </motion.h1>

              <motion.p
                className="mb-8 border-y border-white/[0.06] py-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.11em] text-foreground/40 sm:tracking-[0.16em]"
                variants={fadeUp}
              >
                June 26–29, 2026 · Palace in Debrznica
              </motion.p>

              <motion.p
                className="mb-10 max-w-2xl text-base font-light leading-relaxed text-foreground/58 sm:text-lg md:text-xl"
                variants={fadeUp}
              >
                Rave for Good joins NOVUM for a four-day electronic music gathering at a 19th-century palace in the forest, surrounded by water, nature and open-air dancefloors.
              </motion.p>

              <motion.div className="flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
                <Button
                  asChild
                  size="lg"
                  className="btn-cta h-12 w-full rounded-none px-6 text-xs font-bold uppercase tracking-[0.14em] sm:w-auto sm:px-8"
                  data-testid="button-buy-rfg-nova"
                >
                  <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                    Buy Tickets
                    <ArrowUpRight size={14} />
                  </a>
                </Button>
                <Link href="/upcoming-events" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="btn-cta h-12 w-full rounded-none border-white/[0.18] bg-transparent px-6 text-xs font-bold uppercase tracking-[0.14em] text-foreground/65 hover:border-white/40 hover:text-foreground sm:w-auto sm:px-8"
                  >
                    <ArrowLeft size={14} />
                    Back to Upcoming Events
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative aspect-[1068/645] overflow-hidden border border-white/[0.06] bg-background sm:min-h-[440px] lg:aspect-auto lg:min-h-[620px] lg:bg-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.18 }}
            >
              <img
                src={`${imageBasePath}/festival-flyer.jpg`}
                alt="NOVUM festival flyer for June 26 to 29, 2026 at Palace in Debrznica"
                className="h-full w-full object-contain object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/76 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 border border-white/[0.08] bg-background/78 px-3 py-2.5 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6 sm:gap-3 sm:px-4 sm:py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/45 sm:text-[10px] sm:tracking-[0.18em]">
                  Palace in Debrznica, Poland
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary/75 sm:text-[10px] sm:tracking-[0.18em]">
                  26–29.06.2026
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative bg-card py-14 sm:py-20 md:py-28">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div className="lg:col-span-4" variants={fadeUp}>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                Overview
              </p>
              <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-5xl">
                Two nights in the forest
              </h2>
            </motion.div>
            <motion.div className="lg:col-span-8" variants={fadeUp}>
              <p className="max-w-[74ch] text-base font-light leading-[1.65] text-foreground/58 sm:text-xl md:text-2xl">
                For two days and two nights, NOVUM brings three stages, music from dawn to dawn, nature, art, workshops and relaxation zones into one palace landscape. The weekend is built around tolerance, freedom and community, with open-air dancefloors and quiet reset spaces moving in the same rhythm.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-14 sm:py-20 md:py-32">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                Festival concept
              </p>
              <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-5xl">
                Nature, music, art, people
              </h2>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-px border border-white/[0.05] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {conceptCards.map((card) => (
              <motion.article
                key={card.title}
                className="bg-card p-5 transition-colors duration-300 hover:bg-background sm:p-7"
                variants={fadeUp}
              >
                <h3 className="mb-5 font-display text-2xl font-bold uppercase tracking-[-0.02em] text-foreground/88">
                  {card.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-foreground/48">
                  {card.copy}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-card py-14 sm:py-20 md:py-32" data-testid="section-four-places">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mb-10 max-w-4xl md:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70" variants={fadeUp}>
              Four places of power
            </motion.p>
            <motion.h2
              className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-5xl"
              variants={fadeUp}
            >
              Four stages, four energies
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {placesOfPower.map((place) => (
              <motion.article
                key={place.title}
                className="border border-white/[0.06] bg-background p-5 sm:p-7 md:p-8"
                variants={fadeUp}
              >
                <div className="mb-6 flex min-w-0 flex-col gap-2 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-[-0.025em] text-primary sm:text-4xl">
                    {place.title}
                  </h3>
                  <span className="min-w-0 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-foreground/36 sm:tracking-[0.16em]">
                    {place.styles}
                  </span>
                </div>
                <p className="text-base font-light leading-relaxed text-foreground/56">
                  {place.copy}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-14 sm:py-20 md:py-32">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                Venue
              </p>
              <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-5xl">
                Palace, forest and water
              </h2>
            </motion.div>
            <motion.p className="max-w-md text-sm font-light leading-relaxed text-foreground/45" variants={fadeUp}>
              A 19th-century palace surrounded by greenery, water and open-air gathering spaces.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <Carousel
              opts={{ align: "start", loop: true }}
              className="relative"
              data-testid="rfg-nova-carousel"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {venueImages.map((image) => (
                  <CarouselItem key={image.src} className="pl-2 sm:pl-4">
                    <figure className="overflow-hidden border border-white/[0.06] bg-card">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
                      />
                      <figcaption className="border-t border-white/[0.06] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/35 sm:px-5 sm:tracking-[0.16em]">
                        {image.caption}
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                aria-label="Previous venue image"
                className="left-2 top-[calc(50%-18px)] h-12 w-12 -translate-y-1/2 rounded-none border-white/[0.16] bg-background/85 text-foreground/80 backdrop-blur-md hover:text-foreground sm:left-5 sm:top-1/2"
              />
              <CarouselNext
                aria-label="Next venue image"
                className="right-2 top-[calc(50%-18px)] h-12 w-12 -translate-y-1/2 rounded-none border-white/[0.16] bg-background/85 text-foreground/80 backdrop-blur-md hover:text-foreground sm:right-5 sm:top-1/2"
              />
            </Carousel>
          </motion.div>
        </div>
      </section>

      <section className="bg-card py-14 sm:py-20 md:py-28">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="border border-white/[0.06] bg-background p-6 sm:p-8 md:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                  June 26–29, 2026
                </p>
                <h2 className="mb-5 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-5xl">
                  Join us at NOVUM
                </h2>
                <p className="max-w-2xl text-base font-light leading-relaxed text-foreground/52 sm:text-lg">
                  Meet Rave for Good in Debrznica for a weekend of music, community and shared energy in the palace grounds.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="btn-cta h-12 w-full shrink-0 rounded-none px-6 text-xs font-bold uppercase tracking-[0.14em] sm:w-auto sm:px-8"
              >
                <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                  Buy Tickets
                  <ArrowUpRight size={14} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
