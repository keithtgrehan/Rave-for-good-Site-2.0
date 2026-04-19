import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <div className="w-full pt-32 pb-24 md:pt-40 md:pb-32" data-testid="page-about">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="heading-about"
          >
            Our <br />
            <span className="text-primary">Story</span>
          </motion.h1>
          <motion.div
            className="h-px mb-8 bg-gradient-to-r from-primary/50 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-xl md:text-3xl text-foreground/60 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Rave for Good began in 2018 with a simple but powerful idea: to bring our community together through music and dance while creating a positive impact beyond the dance floor.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32 items-center">
          <motion.div
            className="relative aspect-[4/3] border border-white/[0.06] bg-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/team.jpg"
              alt="Rave for Good committee"
              className="w-full h-full object-contain object-center"
              data-testid="img-about-story"
            />
          </motion.div>

          <motion.div
            className="space-y-8 text-lg text-foreground/55 font-light leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.p variants={fadeIn}>
              What started as private raves quickly grew into a movement with purpose - raising awareness, collecting donations from our scene, and using the collective energy of nightlife to support meaningful initiatives.
            </motion.p>
            <motion.p variants={fadeIn}>
              In December 2021, we took the next step by formally establishing our nonprofit organization. This milestone marked the beginning of a new chapter - one filled with creative initiatives, ambitious projects, and the challenge of transforming the power of music culture into lasting change.
            </motion.p>
            <motion.p variants={fadeIn} className="text-foreground/80 font-normal">
              Our first major focus lies in Zigla Pakala, a small village in Burkina Faso - one of the poorest countries in the world. Here, basic infrastructure such as water and energy supply is almost nonexistent.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-tighter mb-12 border-b border-white/[0.06] pb-6">
            Rave For Good Committee
          </h2>

          <p className="text-foreground/55 font-light leading-relaxed max-w-3xl mb-10">
            Rave for Good is a Berlin based NGO and collective, we incorporate a wide variety of sounds including but not limited to house, techno, breakbeat, slow wave, jungle and garage.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
