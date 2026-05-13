import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-40 md:pb-32" data-testid="page-contact">
      <div className="container px-4 sm:px-6">
        <div className="mb-14 max-w-4xl sm:mb-20 md:mb-32">
          <motion.h1
            className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tighter sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-contact"
          >
            Contact
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg font-light leading-relaxed text-foreground/55 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            For bookings, partnerships, press, volunteering, and collaborations. Email us directly and we will get back to you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-24">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card border border-white/[0.06] p-5 sm:p-8 md:p-10">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">Direct email</p>
              <h2 className="mb-5 font-display text-3xl font-bold uppercase tracking-tight text-foreground/88 sm:text-4xl">
                Start a conversation
              </h2>
              <p className="mb-8 max-w-xl text-sm font-light leading-relaxed text-foreground/50 sm:text-base">
                Send a short note with the topic, timeline, and any useful links. This keeps communication simple and avoids collecting information through a website form.
              </p>
              <Button asChild className="h-12 w-full rounded-none px-6 font-bold uppercase tracking-widest sm:h-14 sm:w-auto sm:px-10" data-testid="button-contact-email">
                <a href="mailto:info@raveforgood.berlin">
                  Email us
                  <ArrowUpRight size={16} />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="space-y-10 lg:col-span-5 lg:space-y-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.18em] mb-6">Direct contact</h3>
              <p className="text-foreground/45 text-sm leading-relaxed font-light mb-6">
                Use this email for partnerships, press, volunteer interest, donation questions, and general coordination.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Mail className="text-foreground/30 mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-bold uppercase tracking-tight mb-1 text-sm">Email</div>
                    <a href="mailto:info@raveforgood.berlin" className="text-foreground/50 hover:text-foreground transition-colors text-sm font-light">info@raveforgood.berlin</a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <MapPin className="text-foreground/30 mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-bold uppercase tracking-tight mb-1 text-sm">Address</div>
                    <address className="text-foreground/50 text-sm font-light not-italic break-words">
                      Rave for Good e.V.<br />
                      c/o Relativ Studios<br />
                      Weserstr. 190<br />
                      12045 Berlin<br />
                      Deutschland
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-10 sm:pt-12">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-6">FAQ</h3>
              <div className="space-y-8">
                <div data-testid="faq-item-1">
                  <h4 className="font-semibold mb-2 text-sm text-foreground/80 uppercase tracking-wide">Where do the funds go?</h4>
                  <p className="text-foreground/45 text-sm leading-relaxed font-light">100% of event profits and public donations go directly to our active water projects. Administrative costs are covered by specific private donors.</p>
                </div>
                <div data-testid="faq-item-2">
                  <h4 className="font-semibold mb-2 text-sm text-foreground/80 uppercase tracking-wide">Are you a registered charity?</h4>
                  <p className="text-foreground/45 text-sm leading-relaxed font-light">Rave for Good is a registered eingetragener Verein (e.V.) in Germany with the non-profit purpose Förderung der Entwicklungszusammenarbeit.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
