import { motion } from "framer-motion";
import { Link } from "wouter";
import { Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { impactData } from "@/data/impact";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

const raisedNum = 12000;
const goalNum  = 18000;
const progressPct = Math.round((raisedNum / goalNum) * 100);

export default function Impact() {
  return (
    <div className="w-full relative overflow-hidden" data-testid="page-impact">
      {/* Page ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.07)_0%,transparent_65%)] pointer-events-none" />

      <div className="pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="container px-4 md:px-6 relative z-10">

          {/* ─── Header ─────────────────────────────────── */}
          <div className="max-w-5xl mb-20 md:mb-28">
            <motion.div
              className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Droplets size={14} className="text-primary/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">Flagship Initiative</span>
            </motion.div>
            <motion.h1
              className="font-display text-[clamp(3.5rem,10vw,9rem)] font-bold uppercase tracking-[-0.035em] leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              data-testid="heading-impact"
            >
              Project:<br/>
              <span className="text-foreground/35">Zigla Pakala</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-foreground/50 font-light leading-[1.65] max-w-[56ch]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Transforming night culture into life-saving infrastructure in Burkina Faso.
            </motion.p>
          </div>

          {/* ─── Stats Grid ─────────────────────────────── */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            {[
              { value: impactData.stats.wellsCompleted, label: "Well Built", accent: true, testid: "stat-impact-1" },
              { value: `${impactData.stats.peopleServed}+`, label: "People Served", accent: true, testid: "stat-impact-2" },
              { value: impactData.stats.amountRaised, label: "Total Raised", accent: true, testid: "stat-impact-3" },
              { value: impactData.stats.targetGoal, label: "Next Goal", accent: false, testid: "stat-impact-4" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-background p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group"
                data-testid={stat.testid}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(109,94,245,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                <div className={`font-display text-[2.5rem] md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-none mb-3 ${stat.accent ? 'text-primary' : 'text-foreground/50'}`}>
                  {stat.value}
                </div>
                <div className={`font-mono text-[10px] uppercase tracking-[0.18em] ${stat.accent ? 'text-foreground/35' : 'text-primary/60'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mb-24 md:mb-36"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
          >
            <div className="flex justify-between items-center mb-2.5">
              <span className="font-mono text-[10px] text-foreground/35 uppercase tracking-[0.16em]">{impactData.stats.amountRaised} raised</span>
              <span className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.16em]">{progressPct}% of {impactData.stats.targetGoal} goal</span>
            </div>
            <div className="h-px bg-white/[0.06] relative overflow-visible">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>

          {/* ─── Story + Timeline ────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32 items-start">

            <motion.div
              className="lg:sticky lg:top-32"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[4/5] bg-muted relative overflow-hidden border border-white/[0.06]">
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10" />
                <img
                  src="/images/impact.png"
                  alt="Well project in Burkina Faso"
                  className="w-full h-full object-cover"
                  data-testid="img-impact-story"
                />
              </div>
              <div className="mt-6 border-l border-primary/25 pl-5">
                <p className="text-sm text-foreground/40 italic font-light leading-[1.8]">
                  "Water access changes everything. It means health, it means kids staying in school, it means a community can thrive."
                </p>
              </div>
            </motion.div>

            <div className="space-y-16 lg:space-y-20">
              {impactData.timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeIn}
                  className="relative pl-6 border-l border-white/[0.06]"
                  data-testid={`timeline-item-${i}`}
                >
                  <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] border border-primary/40 bg-background" />
                  <div className="font-mono text-[10px] text-primary/55 uppercase tracking-[0.2em] mb-4">Phase 0{i + 1}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[-0.015em] mb-4">{item.phase}</h3>
                  <p className="text-[15px] text-foreground/50 font-light leading-[1.75] max-w-[52ch]">
                    {item.description}
                  </p>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                className="pt-12 border-t border-white/[0.06] pl-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="inline-block border border-primary/25 text-primary/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] mb-6">
                  Next Phase
                </div>
                <h4 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[-0.015em] mb-4">Fund the Next Well</h4>
                <p className="text-foreground/45 mb-8 font-light leading-[1.75] max-w-[48ch] text-sm">
                  We are actively raising {impactData.stats.targetGoal} for the second infrastructure phase. Direct donations bypass overhead and go straight to the project.
                </p>
                <Link href="/get-involved">
                  <Button
                    className="btn-cta w-full sm:w-auto rounded-none font-bold tracking-[0.14em] uppercase h-14 px-10"
                    data-testid="button-impact-donate"
                  >
                    Donate Now
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
