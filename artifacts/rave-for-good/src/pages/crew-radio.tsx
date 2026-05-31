import { motion } from "framer-motion";
import { SoundCloudPlayer } from "@/components/SoundCloudPlayer";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CrewRadio() {
  return (
    <div className="w-full relative overflow-hidden" data-testid="page-crew-radio">
      <div className="absolute right-0 top-0 h-[420px] w-[520px] bg-[radial-gradient(ellipse,rgba(77,163,255,0.065)_0%,rgba(109,94,245,0.035)_42%,transparent_70%)] pointer-events-none sm:h-[620px] sm:w-[760px]" />

      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-40 md:pb-12">
        <div className="container relative z-10 px-4 sm:px-6">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
              Listen
            </p>
            <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
              Crew Radio
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-foreground/55 sm:text-xl md:text-2xl">
              Sounds from the Rave for Good crew, friends, and extended community.
            </p>
          </motion.div>
        </div>
      </section>

      <SoundCloudPlayer />
    </div>
  );
}
