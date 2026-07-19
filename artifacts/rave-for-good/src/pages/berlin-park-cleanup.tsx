import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const donationUrl = "https://paypal.me/RaveForGoodeV";
const contactEmail = "info@raveforgood.berlin";
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
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const localActionSections = [
  {
    title: "What we do locally",
    copy: "We bring people together for practical Berlin-based action: cleaning shared spaces, creating low-barrier volunteer moments, and keeping community care connected to music culture."
  },
  {
    title: "Why it matters",
    copy: "Public spaces belong to everyone. Looking after them is a direct way to turn collective energy into something visible, useful, and rooted in the city we move through."
  },
  {
    title: "How to join",
    copy: "Come with time, care, and a willingness to help. For volunteer coordination, artist involvement, or cleanup questions, email the Rave for Good crew directly."
  }
];

export default function BerlinParkCleanup() {
  return (
    <div className="w-full relative overflow-hidden" data-testid="page-berlin-park-cleanup">
      <div className="absolute right-0 top-0 h-[360px] w-[360px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.075)_0%,transparent_68%)] pointer-events-none sm:h-[680px] sm:w-[760px]" />
      <div className="absolute bottom-0 left-0 h-[320px] w-[320px] bg-[radial-gradient(ellipse,rgba(77,163,255,0.055)_0%,transparent_70%)] pointer-events-none sm:h-[520px] sm:w-[520px]" />

      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-20 md:pt-44 md:pb-28">
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
            <motion.div
              className="flex min-w-0 flex-col justify-center"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Link
                  href="/park-cleanup"
                  className="link-line mb-6 inline-flex min-h-11 items-center gap-2 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/48 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  data-testid="link-back-to-park-cleanup"
                >
                  <ArrowLeft size={13} />
                  Back to Park Cleanup
                </Link>
              </motion.div>

              <motion.div className="mb-6 flex flex-wrap items-center gap-3" variants={fadeUp}>
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                  Berlin Local Action
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/38">
                  Previous Community Event · 14 June 2026
                </span>
              </motion.div>

              <motion.h1
                className="mb-6 font-display text-[clamp(3.15rem,13vw,8.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
                variants={fadeUp}
                aria-label="Berlin Park Cleanup"
                data-testid="heading-berlin-park-cleanup"
              >
                Berlin Park <br />
                <span className="text-primary">Cleanup</span>
              </motion.h1>

              <motion.p
                className="max-w-2xl text-base font-light leading-relaxed text-foreground/58 sm:text-lg md:text-xl"
                variants={fadeUp}
              >
                A community cleanup by Rave for Good — bringing Berlin’s creative scene together for direct local action.
              </motion.p>
            </motion.div>

            <motion.figure
              className="overflow-hidden border border-white/[0.06] bg-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
            >
              <div className="relative bg-background">
                <img
                  src="/images/berlin-park-cleanup.jpg"
                  alt="Rave for Good Trash Pickup visual with a DJ pushing a mobile sound system in the rain"
                  className="w-full object-cover"
                  data-testid="img-berlin-park-cleanup"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/38 via-transparent to-transparent" />
              </div>

              <figcaption className="border-t border-white/[0.06] p-5 sm:p-7 md:p-8">
                <p className="mb-5 max-w-[58ch] text-sm font-light leading-relaxed text-foreground/52 sm:text-base">
                  Your donation helps cover cleanup materials, community organising, artist support, and future Rave for Good charity projects.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    size="lg"
                    className="btn-cta h-12 w-full rounded-none px-6 text-xs font-bold uppercase tracking-[0.14em] sm:w-auto sm:px-8"
                    data-testid="button-support-cleanup"
                  >
                    <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                      Support the cleanup
                      <ArrowRight size={14} />
                    </a>
                  </Button>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="link-line inline-flex items-center justify-center gap-2 py-3 text-xs font-medium uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground sm:justify-start"
                    data-testid="link-cleanup-contact"
                  >
                    <Mail size={14} />
                    {contactEmail}
                  </a>
                </div>
              </figcaption>
            </motion.figure>
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
                Community care
              </p>
              <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl md:text-5xl">
                Local work, wider impact
              </h2>
            </motion.div>
            <motion.div className="space-y-6 lg:col-span-8" variants={fadeUp}>
              <p className="max-w-[74ch] text-base font-light leading-[1.7] text-foreground/58 sm:text-xl md:text-2xl">
                Rave for Good is a Berlin-based collective using music, community, and creativity to support meaningful action. We work locally through hands-on initiatives like park cleanups, while also raising awareness and funds for charities abroad.
              </p>
              <p className="max-w-[74ch] text-base font-light leading-[1.7] text-foreground/58 sm:text-xl md:text-2xl">
                This cleanup brings volunteers, artists, ravers, and neighbours together to care for shared public spaces. It is simple: show up, clean up, connect, and help turn community energy into visible impact.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-14 sm:py-20 md:py-32">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-1 gap-px border border-white/[0.05] bg-white/[0.04] md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {localActionSections.map((section) => (
              <motion.article
                key={section.title}
                className="bg-card p-6 transition-colors duration-300 hover:bg-background sm:p-8 md:p-10"
                variants={fadeUp}
              >
                <h2 className="mb-5 font-display text-2xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-foreground/88 sm:text-3xl">
                  {section.title}
                </h2>
                <p className="text-sm font-light leading-relaxed text-foreground/50 sm:text-base">
                  {section.copy}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
