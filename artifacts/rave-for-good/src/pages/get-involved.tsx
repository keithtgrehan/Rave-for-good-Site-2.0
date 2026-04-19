import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getHubSpotFormDestination } from "@/lib/hubspot";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function GetInvolved() {
  const [donationAmount, setDonationAmount] = useState("");

  return (
    <div className="w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-40 md:pb-32" data-testid="page-get-involved">
      <div className="container px-4 sm:px-6">

        <div className="mb-14 max-w-4xl sm:mb-20">
          <motion.h1
            className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tighter sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-get-involved"
          >
            Take <br/><span className="text-primary">Action</span>
          </motion.h1>
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/40 sm:text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose your vector of impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

          {/* Main Action: Donate */}
          <motion.div
            className="bg-card border border-white/[0.06] p-5 sm:p-8 md:p-12 lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            data-testid="section-donate"
          >
            <div className="mb-6 inline-block border border-primary/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary/80 sm:mb-8">
              Direct Support
            </div>
            <h2 className="mb-5 font-display text-3xl font-bold uppercase tracking-tighter sm:text-4xl md:mb-6 md:text-5xl">
              Fund the well
            </h2>
            <p className="mb-8 text-base font-light leading-relaxed text-foreground/55 sm:mb-10 sm:text-lg">
              Can't make it to a dancefloor? You can still contribute directly to our active infrastructure projects. 100% of public donations go to implementation, zero to admin overhead.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-3 sm:gap-3">
                {["€10", "€25", "€50"].map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant="outline"
                    className="h-12 rounded-none border-white/[0.1] bg-transparent font-display text-lg transition-colors hover:border-primary/50 hover:text-primary sm:h-16 sm:text-xl"
                    data-testid={`button-donate-${amt.replace('€', '')}`}
                    aria-pressed={donationAmount === amt.replace("€", "")}
                    onClick={() => setDonationAmount(amt.replace("€", ""))}
                  >
                    {amt}
                  </Button>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Input
                  type="number"
                  placeholder="Custom Amount (€)"
                  className="h-12 rounded-none border-white/[0.08] bg-background font-display text-base focus-visible:ring-primary/50 sm:h-14 sm:text-lg"
                  data-testid="input-donate-custom"
                  value={donationAmount}
                  onChange={(event) => setDonationAmount(event.target.value)}
                />
                <Button asChild className="h-12 w-full rounded-none px-8 font-bold uppercase tracking-widest sm:h-14 sm:w-auto" data-testid="button-donate-submit">
                  <a
                    href="https://www.paypal.com/paypalme/RaveForGoodeV"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Donate
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Secondary Actions */}
          <motion.div
            className="flex flex-col gap-px bg-white/[0.04] lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >

            <div className="group flex flex-1 flex-col bg-card p-6 transition-colors duration-300 hover:bg-background sm:p-8" data-testid="card-attend">
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

            <div className="group flex flex-1 flex-col bg-card p-6 transition-colors duration-300 hover:bg-background sm:p-8" data-testid="card-volunteer">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">Volunteer</h3>
              <p className="text-foreground/50 text-sm mb-6 flex-grow font-light leading-relaxed">
                We need hands in Berlin: door staff, promoters, designers. Donate your time and skills to the crew.
              </p>
              <Link href={getHubSpotFormDestination("volunteer")}>
                <span className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary font-medium uppercase tracking-widest text-xs transition-colors cursor-pointer" data-testid="link-volunteer-contact">
                  Apply to Crew <ArrowRight size={14} />
                </span>
              </Link>
            </div>

            <div className="group flex flex-1 flex-col bg-card p-6 transition-colors duration-300 hover:bg-background sm:p-8" data-testid="card-partner">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">Partner</h3>
              <p className="text-foreground/50 text-sm mb-6 flex-grow font-light leading-relaxed">
                Represent a venue, label, or artist agency? Let's build a structural alliance.
              </p>
              <Link href={getHubSpotFormDestination("partner")}>
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
