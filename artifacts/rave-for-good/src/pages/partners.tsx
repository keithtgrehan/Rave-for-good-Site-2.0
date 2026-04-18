import { motion } from "framer-motion";
import { Link } from "wouter";
import { Building2, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function Partners() {
  return (
    <div className="w-full pt-32 pb-24 md:pt-40 md:pb-32" data-testid="page-partners">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-partners"
          >
            <span className="text-primary">Partnerships</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/55 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Work with us to create events and campaigns that are culturally strong and socially meaningful.
          </motion.p>
        </div>

        <div className="mb-32">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tighter mb-10 border-b border-white/[0.06] pb-4 text-foreground/70">
            Partnership Types
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: Building2, title: "Venue Partners", desc: "Co-host impact-driven events with a clear fundraising and awareness strategy." },
              { icon: Music, title: "Brand Partners", desc: "Sponsor projects with transparent outcome reporting and responsible storytelling." },
              { icon: Users, title: "Community Partners", desc: "Build collaborative formats with artists, collectives, and local networks." }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                className="bg-card hover:bg-background transition-colors duration-300 p-8"
                data-testid={`card-partner-type-${i}`}
              >
                <item.icon size={22} className="text-primary/60 mb-6" />
                <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-foreground/50 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative border border-white/[0.06] bg-card p-12 md:p-20 text-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(109,94,245,0.07)_0%,rgba(77,163,255,0.04)_40%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <p className="font-mono text-[10px] text-primary/70 uppercase tracking-[0.18em] mb-6">What partners can expect</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">Start a Partnership</h2>
            <p className="text-foreground/50 font-light text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Clear campaign concept and role definition. Joint communication plan and event visibility. Impact reporting after each activation.
            </p>
            <Link href="/contact">
              <Button className="rounded-none font-bold tracking-widest uppercase h-14 px-10" data-testid="button-partner-contact">
                Share your collaboration idea
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
