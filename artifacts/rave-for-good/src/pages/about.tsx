import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { committeeMembers, type CommitteeMember } from "@/data/governance";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About({
  committeeRecords = committeeMembers,
}: {
  committeeRecords?: readonly CommitteeMember[];
}) {
  return (
    <div className="w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-40 md:pb-32" data-testid="page-about">
      <div className="container px-4 sm:px-6">
        <div className="mb-14 max-w-4xl sm:mb-20 md:mb-32">
          <motion.h1
            className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tighter sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-about"
          >
            Our <br />
            <span className="text-primary">Story</span>
          </motion.h1>
          <motion.div
            className="h-px mb-8 bg-gradient-to-r from-primary/50 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-lg font-light leading-relaxed text-foreground/60 sm:text-xl md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Rave for Good began in 2018 with a simple but powerful idea: to bring our community together through music and dance while creating a positive impact beyond the dance floor.
          </motion.p>
        </div>

        <div className="mb-20 grid grid-cols-1 items-center gap-10 sm:mb-24 sm:gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            className="relative aspect-[5/4] border border-white/[0.06] bg-card sm:aspect-[4/3]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/team.jpg"
              alt="Members of the Rave for Good community"
              className="w-full h-full object-contain object-center"
              data-testid="img-about-story"
            />
          </motion.div>

          <motion.div
            className="space-y-6 text-base font-light leading-relaxed text-foreground/55 sm:space-y-8 sm:text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.p variants={fadeIn}>
              What started as private raves quickly grew into a movement with purpose - raising awareness, collecting donations from our scene, and using the collective energy of nightlife to support meaningful initiatives.
            </motion.p>
            <motion.p variants={fadeIn}>
              In December 2021, we took the next step by formally establishing Rave for Good e.V. This milestone marked the beginning of a new chapter - one filled with creative initiatives, ambitious projects, and the challenge of transforming the power of music culture into lasting change.
            </motion.p>
            <motion.p variants={fadeIn} className="text-foreground/80 font-normal">
              Our first major focus lies in Zigla Pakala, a small village in Burkina Faso - one of the poorest countries in the world. Here, basic infrastructure such as water and energy supply is almost nonexistent.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-10 max-w-3xl text-sm font-light leading-relaxed text-foreground/55 sm:text-base">
            Rave for Good is a Berlin-based association and collective. Our community incorporates a wide variety of sounds including house, techno, breakbeat, slow wave, jungle and garage.
          </p>

          {committeeRecords.length ? (
            <section aria-labelledby="committee-heading">
              <h2 id="committee-heading" className="mb-8 border-b border-white/[0.06] pb-5 font-display text-3xl font-bold uppercase tracking-tighter sm:mb-12 sm:pb-6 sm:text-4xl">
                Rave For Good Committee
              </h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {committeeRecords.map((member) => (
                  <article key={member.id} className="border border-white/[0.1] bg-card p-6">
                    <h3 className="mb-2 font-display text-xl font-bold uppercase">{member.fullName}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </motion.div>

        <section className="mt-14 border border-white/[0.1] bg-card p-6 sm:p-8 md:p-10" aria-labelledby="governance-transparency-heading">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-primary-readable">Governance</p>
          <h2 id="governance-transparency-heading" className="mb-5 font-display text-3xl font-bold uppercase sm:text-4xl">Governance and transparency</h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-muted-foreground">
            Committee profiles and supporting governance documents are published only after they have been reviewed. The transparency page provides the structure for verified registration, governance and project evidence as it becomes available.
          </p>
          <Link href="/transparency" className="link-line inline-flex min-h-11 items-center gap-2 py-3 font-semibold text-primary-readable">
            View transparency information <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  );
}
