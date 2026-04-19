import { motion } from "framer-motion";
import { Link } from "wouter";
import { Building2, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHubSpotFormDestination } from "@/lib/hubspot";

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
    <div className="w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-40 md:pb-32" data-testid="page-partners">
      <div className="container px-4 sm:px-6">
        <div className="mb-14 max-w-4xl sm:mb-20 md:mb-32">
          <motion.h1
            className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tighter sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-partners"
          >
            <span className="text-primary">Partnerships</span>
          </motion.h1>
          <motion.p
            className="text-lg font-light leading-relaxed text-foreground/55 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Work with us to create events and campaigns that are culturally strong and socially meaningful.
          </motion.p>
        </div>

        <div className="mb-20 sm:mb-24 md:mb-32">
          <h2 className="mb-8 border-b border-white/[0.06] pb-4 font-display text-xl font-bold uppercase tracking-tighter text-foreground/70 sm:mb-10 sm:text-2xl">
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
                className="bg-card p-6 transition-colors duration-300 hover:bg-background sm:p-8"
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
          className="relative overflow-hidden border border-white/[0.06] bg-card p-8 text-center sm:p-10 md:p-20"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(109,94,245,0.07)_0%,rgba(77,163,255,0.04)_40%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <p className="font-mono text-[10px] text-primary/70 uppercase tracking-[0.18em] mb-6">What partners can expect</p>
            <h2 className="mb-6 font-display text-3xl font-bold uppercase tracking-tighter sm:text-4xl md:text-6xl">Start a Partnership</h2>
            <p className="mx-auto mb-8 max-w-2xl text-base font-light leading-relaxed text-foreground/50 sm:mb-10 sm:text-lg md:text-xl">
              Clear campaign concept and role definition. Joint communication plan and event visibility. Impact reporting after each activation.
            </p>
            <Link href={getHubSpotFormDestination("partner")}>
              <Button className="h-12 w-full rounded-none px-6 font-bold uppercase tracking-widest sm:h-14 sm:w-auto sm:px-10" data-testid="button-partner-contact">
                Share your collaboration idea
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
