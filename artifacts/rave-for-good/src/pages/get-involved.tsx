import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function GetInvolved() {
  return (
    <div className="w-full pt-32 pb-24 md:pt-40 md:pb-32" data-testid="page-get-involved">
      <div className="container px-4 md:px-6">

        <div className="max-w-4xl mb-20">
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-get-involved"
          >
            Take <br/><span className="text-primary">Action</span>
          </motion.h1>
          <motion.p
            className="text-base text-foreground/40 font-mono uppercase tracking-[0.18em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose your vector of impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Action: Donate */}
          <motion.div
            className="lg:col-span-7 bg-card border border-white/[0.06] p-8 md:p-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            data-testid="section-donate"
          >
            <div className="inline-block border border-primary/30 text-primary/80 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] mb-8">
              Direct Support
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
              Fund the well
            </h2>
            <p className="text-foreground/55 text-lg mb-10 font-light leading-relaxed">
              Can't make it to a dancefloor? You can still contribute directly to our active infrastructure projects. 100% of public donations go to implementation, zero to admin overhead.
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {["€10", "€25", "€50"].map((amt) => (
                  <Button key={amt} variant="outline" className="rounded-none border-white/[0.1] hover:border-primary/50 hover:text-primary font-display text-xl h-16 bg-transparent transition-colors" data-testid={`button-donate-${amt.replace('€', '')}`}>
                    {amt}
                  </Button>
                ))}
              </div>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Custom Amount (€)"
                  className="bg-background border-white/[0.08] rounded-none focus-visible:ring-primary/50 h-14 font-display text-lg"
                  data-testid="input-donate-custom"
                />
                <Button className="rounded-none font-bold tracking-widest uppercase px-8 h-14" data-testid="button-donate-submit">
                  Donate
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Secondary Actions */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-px bg-white/[0.04]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >

            <div className="bg-card hover:bg-background transition-colors duration-300 p-8 group flex flex-col flex-1" data-testid="card-attend">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">Attend</h3>
              <p className="text-foreground/50 text-sm mb-6 flex-grow font-light leading-relaxed">
                The easiest way to help. Buy a ticket, come dance. Your door fee becomes clean water.
              </p>
              <Link href="/events">
                <span className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary font-medium uppercase tracking-widest text-xs transition-colors cursor-pointer" data-testid="link-attend-events">
                  Find Events <ArrowRight size={14} />
                </span>
              </Link>
            </div>

            <div className="bg-card hover:bg-background transition-colors duration-300 p-8 group flex flex-col flex-1" data-testid="card-volunteer">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">Volunteer</h3>
              <p className="text-foreground/50 text-sm mb-6 flex-grow font-light leading-relaxed">
                We need hands in Berlin: door staff, promoters, designers. Donate your time and skills to the crew.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary font-medium uppercase tracking-widest text-xs transition-colors cursor-pointer" data-testid="link-volunteer-contact">
                  Apply to Crew <ArrowRight size={14} />
                </span>
              </Link>
            </div>

            <div className="bg-card hover:bg-background transition-colors duration-300 p-8 group flex flex-col flex-1" data-testid="card-partner">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">Partner</h3>
              <p className="text-foreground/50 text-sm mb-6 flex-grow font-light leading-relaxed">
                Represent a venue, label, or artist agency? Let's build a structural alliance.
              </p>
              <Link href="/partners">
                <span className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary font-medium uppercase tracking-widest text-xs transition-colors cursor-pointer" data-testid="link-partner-info">
                  View Info <ArrowRight size={14} />
                </span>
              </Link>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
