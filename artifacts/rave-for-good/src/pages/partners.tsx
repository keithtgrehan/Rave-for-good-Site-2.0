import { motion } from "framer-motion";
import { Link } from "wouter";
import { Handshake, Music, Building2, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { partners } from "@/data/partners";

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
        
        {/* Header */}
        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-partners"
          >
            Built by the <br/><span className="text-primary">Scene</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-foreground/80 font-serif leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We don't do corporate sponsorships. We build tactical alliances with venues, artists, and collectives who share our ethos.
          </motion.p>
        </div>

        {/* Partner Types Grid */}
        <div className="mb-32">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tighter mb-10 border-b border-border pb-4">
            How to Partner
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: Building2, title: "Venues", desc: "Donate the door, waive the fee, or host a specific fundraiser night." },
              { icon: Music, title: "Artists", desc: "Waive fees for our events or donate proceeds from specific releases." },
              { icon: Megaphone, title: "Collectives", desc: "Co-host an event where profits go to the NGO." },
              { icon: Handshake, title: "Agencies", desc: "Provide logistical, ticketing, or media support pro bono." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={cardVariant}
                className="bg-card border border-border p-8"
                data-testid={`card-partner-type-${i}`}
              >
                <item.icon size={32} className="text-primary mb-6" />
                <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Existing Partners */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-4">Current Allies</h2>
            <p className="text-foreground/60 font-mono text-xs uppercase tracking-widest">Standing with us</p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-6 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {partners.map((partner, i) => (
              <motion.div 
                key={i} 
                variants={cardVariant}
                className="px-8 py-6 border border-border bg-background hover:border-primary/50 hover:bg-card transition-all text-center flex-grow sm:flex-grow-0"
                data-testid={`partner-logo-${i}`}
              >
                <div className="font-display font-bold text-2xl uppercase tracking-tighter mb-2">{partner.name}</div>
                <div className="text-primary font-mono text-[10px] uppercase tracking-widest">{partner.type}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          className="bg-primary text-primary-foreground p-12 md:p-20 text-center"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 text-background">
            Ready to align?
          </h2>
          <p className="text-background/80 font-medium text-lg md:text-xl max-w-2xl mx-auto mb-10">
            If your venue, agency, or collective wants to integrate direct impact into your operations, let's talk.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="rounded-none border-background text-background hover:bg-background hover:text-primary font-bold tracking-widest uppercase h-14 px-10" data-testid="button-partner-contact">
              Initiate Contact
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
