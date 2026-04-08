import { motion } from "framer-motion";
import { MapPin, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="w-full pt-32 pb-24 md:pt-40 md:pb-32" data-testid="page-contact">
      <div className="container px-4 md:px-6">

        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-contact"
          >
            Open <br/><span className="text-primary">Channel</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/55 font-light leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reach out for partnerships, volunteering, or press inquiries. We operate in Berlin, impacting globally.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card border border-white/[0.06] p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-8 text-foreground/80">Send a Transmission</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()} data-testid="form-contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">Name</label>
                    <Input className="bg-background border-white/[0.08] rounded-none focus-visible:ring-primary/50" data-testid="input-contact-name" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">Email</label>
                    <Input type="email" className="bg-background border-white/[0.08] rounded-none focus-visible:ring-primary/50" data-testid="input-contact-email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">Subject</label>
                  <select className="flex h-10 w-full rounded-none border border-white/[0.08] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-foreground/70" data-testid="select-contact-subject">
                    <option>Partnership Inquiry</option>
                    <option>Volunteer Application</option>
                    <option>Press / Media</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">Message</label>
                  <Textarea className="bg-background border-white/[0.08] rounded-none focus-visible:ring-primary/50 min-h-[150px] font-light" data-testid="textarea-contact-message" />
                </div>
                <Button type="submit" className="w-full rounded-none font-bold tracking-widest uppercase h-14" data-testid="button-contact-submit">
                  Transmit
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-5 space-y-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.18em] mb-6">Direct Lines</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-foreground/30 mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-bold uppercase tracking-tight mb-1 text-sm">Email</div>
                    <a href="mailto:hello@raveforgood.org" className="text-foreground/50 hover:text-foreground transition-colors text-sm font-light">hello@raveforgood.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageSquare className="text-foreground/30 mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-bold uppercase tracking-tight mb-1 text-sm">WhatsApp</div>
                    <span className="text-foreground/50 text-sm font-light">+49 151 0000 0000</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-foreground/30 mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-bold uppercase tracking-tight mb-1 text-sm">HQ</div>
                    <address className="text-foreground/50 text-sm font-light not-italic">
                      Berlin, Germany<br/>
                      Registered NGO (e.V.)
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/[0.06]">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-6">FAQ</h3>
              <div className="space-y-8">
                <div data-testid="faq-item-1">
                  <h4 className="font-semibold mb-2 text-sm text-foreground/80 uppercase tracking-wide">Where do the funds go?</h4>
                  <p className="text-foreground/45 text-sm leading-relaxed font-light">100% of event profits and public donations go directly to our active water projects. Administrative costs are covered by specific private donors.</p>
                </div>
                <div data-testid="faq-item-2">
                  <h4 className="font-semibold mb-2 text-sm text-foreground/80 uppercase tracking-wide">Are you a registered charity?</h4>
                  <p className="text-foreground/45 text-sm leading-relaxed font-light">Yes, Rave for Good is a registered eingetragener Verein (e.V.) in Germany. Donations are tax-deductible for German residents.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
