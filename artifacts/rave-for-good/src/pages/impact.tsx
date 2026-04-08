import { motion } from "framer-motion";
import { Link } from "wouter";
import { Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { impactData } from "@/data/impact";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Impact() {
  return (
    <div className="w-full pt-32 pb-24 md:pt-40 md:pb-32" data-testid="page-impact">
      <div className="container px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Droplets className="text-primary" />
            <span className="font-mono text-sm uppercase tracking-widest text-primary">Flagship Initiative</span>
          </motion.div>
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-impact"
          >
            Project:<br/>
            <span className="text-foreground/50">Zigla Pakala</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-foreground/80 font-serif leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transforming night culture into life-saving infrastructure in Burkina Faso.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border mb-24 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-background p-8 md:p-10 flex flex-col justify-center" data-testid="stat-impact-1">
            <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">{impactData.stats.wellsCompleted}</div>
            <div className="font-mono text-xs text-foreground/60 uppercase tracking-widest">Well Built</div>
          </div>
          <div className="bg-background p-8 md:p-10 flex flex-col justify-center" data-testid="stat-impact-2">
            <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">{impactData.stats.peopleServed}+</div>
            <div className="font-mono text-xs text-foreground/60 uppercase tracking-widest">People Served</div>
          </div>
          <div className="bg-background p-8 md:p-10 flex flex-col justify-center" data-testid="stat-impact-3">
            <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">{impactData.stats.amountRaised}</div>
            <div className="font-mono text-xs text-foreground/60 uppercase tracking-widest">Total Raised</div>
          </div>
          <div className="bg-background p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-primary/30" data-testid="stat-impact-4">
            <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{impactData.stats.targetGoal}</div>
            <div className="font-mono text-xs text-primary uppercase tracking-widest">Next Goal</div>
          </div>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32 items-start">
          <motion.div 
            className="sticky top-32"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/5] bg-muted relative overflow-hidden border border-border">
              <img 
                src="/images/impact.png" 
                alt="Well project in Burkina Faso" 
                className="w-full h-full object-cover grayscale"
                data-testid="img-impact-story"
              />
            </div>
            <div className="mt-6 border-l-2 border-primary pl-4">
              <p className="text-sm text-foreground/60 italic font-serif">
                "Water access changes everything. It means health, it means kids staying in school, it means a community can thrive."
              </p>
            </div>
          </motion.div>

          <div className="space-y-16">
            {impactData.timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="relative"
                data-testid={`timeline-item-${i}`}
              >
                <div className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Phase 0{i + 1}</div>
                <h3 className="font-display text-3xl font-bold uppercase tracking-tighter mb-4">{item.phase}</h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
                {i < impactData.timeline.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-16 left-0 w-px h-12 bg-border" />
                )}
              </motion.div>
            ))}

            <motion.div 
              className="pt-12 border-t border-border"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight mb-4">Fund the Next Well</h4>
              <p className="text-foreground/70 mb-8">
                We are actively raising €18,000 for the second infrastructure phase. Direct donations bypass overhead and go straight to the project.
              </p>
              <Link href="/get-involved">
                <Button className="w-full sm:w-auto rounded-none font-bold tracking-widest uppercase h-14 px-8" data-testid="button-impact-donate">
                  Donate Now
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
