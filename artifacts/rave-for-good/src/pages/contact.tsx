import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { HubSpotFormEmbed } from "@/components/hubspot/HubSpotFormEmbed";
import { getHubSpotForm, isHubSpotFormKey } from "@/lib/hubspot";

export default function Contact() {
  const rawFormKey = typeof window === "undefined"
    ? null
    : new URLSearchParams(window.location.search).get("form")
  const activeFormKey = isHubSpotFormKey(rawFormKey) ? rawFormKey : "contact"
  const activeForm = getHubSpotForm(activeFormKey)

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
            Contact
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/55 font-light leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            For bookings, partnerships, press, and collaborations. Tell us what you are planning and we will get back to you
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card border border-white/[0.06] p-8 md:p-10">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground/80">{activeForm.name} Form</h2>
                  <p className="text-sm text-foreground/45 font-light mt-2">
                    This request is handled through our HubSpot form setup so CTA routing stays code-driven and in sync.
                  </p>
                </div>
                <span className="inline-flex items-center justify-center min-h-10 px-4 py-2 border border-white/[0.1] text-foreground/55 bg-transparent rounded-none text-sm font-medium uppercase tracking-[0.12em]">
                  {activeForm.submitButtonText}
                </span>
              </div>
              <div data-testid={`form-contact-${activeFormKey}`}>
                <HubSpotFormEmbed formKey={activeFormKey} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 space-y-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.18em] mb-6">Direct contact</h3>
              <p className="text-foreground/45 text-sm leading-relaxed font-light mb-6">
                Use the form for structured requests, or email us directly for quick coordination.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-foreground/30 mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-bold uppercase tracking-tight mb-1 text-sm">Email</div>
                    <a href="mailto:info@raveforgood.berlin" className="text-foreground/50 hover:text-foreground transition-colors text-sm font-light">info@raveforgood.berlin</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-foreground/30 mt-1 shrink-0" size={18} />
                  <div>
                    <div className="font-bold uppercase tracking-tight mb-1 text-sm">Address</div>
                    <address className="text-foreground/50 text-sm font-light not-italic">
                      Relativ Studios<br />
                      Weserstr. 190<br />
                      Berlin 12045
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
