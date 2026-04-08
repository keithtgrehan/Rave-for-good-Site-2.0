import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { team } from "@/data/team";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <div className="w-full pt-32 pb-24 md:pt-40 md:pb-32" data-testid="page-about">
      <div className="container px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-about"
          >
            The <br/>
            <span className="text-primary">Origin</span>
          </motion.h1>
          <motion.div 
            className="h-1 w-24 bg-primary mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p 
            className="text-xl md:text-3xl text-foreground/80 font-serif leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Rave for Good began in a late-night conversation outside a Berlin club in 2022. We asked a simple question: What if the immense energy and capital flowing through nightlife could be captured for tangible humanitarian impact?
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32 items-center">
          <motion.div 
            className="relative aspect-[3/4] border border-border"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
            <img 
              src="/images/about.png" 
              alt="Berlin music community" 
              className="w-full h-full object-cover grayscale"
              data-testid="img-about-story"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-8 text-lg text-foreground/70"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.p variants={fadeIn}>
              Berlin's club culture has always been rooted in community, safe spaces, and collective experience. However, that community often remains isolated within the walls of the venue.
            </motion.p>
            <motion.p variants={fadeIn}>
              We realized that the infrastructure of a party—promoters, artists, venues, and dancers—could function exactly like a high-efficiency fundraising machine, without losing the authenticity of the experience.
            </motion.p>
            <motion.p variants={fadeIn} className="text-foreground font-bold">
              In 2023, we registered as an official NGO (e.V.) in Germany. Our mandate: 100% of event profits fund clean water and community action projects, fully audited and transparent.
            </motion.p>
            <motion.div variants={fadeIn} className="pt-8">
              <Link href="/impact">
                <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-widest uppercase h-14 px-8" data-testid="button-about-impact">
                  See Our Impact
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-12 border-b border-border pb-6">
            The Committee
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group" data-testid={`card-team-${i}`}>
                <div className="aspect-square bg-muted border border-border mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary">Reach out via Contact</span>
                  </div>
                  <span className="font-display text-6xl font-bold text-foreground/10">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-1">{member.name}</h3>
                <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">{member.role}</p>
                <p className="text-sm text-foreground/60">{member.background}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
