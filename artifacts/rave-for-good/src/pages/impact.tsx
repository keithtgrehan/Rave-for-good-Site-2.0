import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

export default function Impact() {
  return (
    <div className="w-full relative overflow-hidden" data-testid="page-impact">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.07)_0%,transparent_65%)] pointer-events-none" />

      <div className="pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mb-20 md:mb-28">
            <motion.div
              className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">Our Social Mission</span>
            </motion.div>
            <motion.h1
              className="font-display text-[clamp(3.5rem,10vw,9rem)] font-bold uppercase tracking-[-0.035em] leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              data-testid="heading-impact"
            >
              Our Social <br />
              <span className="text-foreground/35">Mission</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-foreground/50 font-light leading-[1.65] max-w-[56ch]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              We believe nightlife can do more than entertain. It can mobilize people, resources, and attention where they are needed most
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="space-y-6 text-[15px] text-foreground/50 font-light leading-[1.75]"
            >
              <motion.p variants={fadeIn}>
                Rave for Good began in 2018 with a simple but powerful idea: to bring our community together through music and dance while creating a positive impact beyond the dance floor. What started as private raves quickly grew into a movement with purpose - raising awareness, collecting donations from our scene, and using the collective energy of nightlife to support meaningful initiatives
              </motion.p>
              <motion.p variants={fadeIn}>
                In December 2021, we took the next step by formally establishing our nonprofit organization. This milestone marked the beginning of a new chapter - one filled with creative initiatives, ambitious projects, and the challenge of transforming the power of music culture into lasting change
              </motion.p>
              <motion.p variants={fadeIn}>
                Our first major focus lies in Zigla Pakala, a small village in Burkina Faso - one of the poorest countries in the world. Here, basic infrastructure such as water and energy supply is almost nonexistent. Access to clean drinking water has long been a daily struggle, with thousands of people depending on a single functioning well after the other three in the area dried up
              </motion.p>
              <motion.p variants={fadeIn}>
                With the support of our community and funds raised through our events, we have already financed and built a new well in Zigla Pakala. This well now provides vital access to clean water for the villagers, directly improving their health, safety, and quality of life. It is a first step - and a living proof - that together we can turn the energy of our raves into concrete, life-changing results
              </motion.p>
              <motion.p variants={fadeIn}>
                As a Berlin-based NGO, we believe that access to water, energy, and sustainable infrastructure is not a privilege but a human right. Our mission is to provide Zigla Pakala and other communities in need with sustainable living conditions. Through carefully designed projects and the support we generate from our events, we aim to bring tangible solutions that improve everyday life: access to clean water, renewable energy systems, and opportunities for long-term resilience
              </motion.p>
              <motion.p variants={fadeIn}>
                But our vision goes beyond one village. By uniting the global rave and electronic music community with the principles of solidarity and social responsibility, we want to show that nightlife culture has the power to change lives. Each event we organize is not only a celebration but also an act of giving back - a chance to transform collective joy into meaningful support for those who need it most
              </motion.p>
              <motion.p variants={fadeIn}>
                Rave for Good is more than just a name. It is a promise to continue building a bridge between music, community, and humanitarian action. Together, we can keep the beat alive - not only on the dance floor, but in the lives of people whose futures depend on access to the most basic resources
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-6 lg:sticky lg:top-32"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[4/5] bg-muted relative overflow-hidden border border-white/[0.06]">
                <img
                  src="/images/zigla-pakala-well-1.jpg"
                  alt="Community around the Zigla Pakala well drill site"
                  className="w-full h-full object-cover"
                  data-testid="img-impact-story-primary"
                />
              </div>
              <div className="aspect-[4/5] bg-muted relative overflow-hidden border border-white/[0.06]">
                <img
                  src="/images/zigla-pakala-well-2.jpg"
                  alt="Technical well drilling activity in Zigla Pakala"
                  className="w-full h-full object-cover"
                  data-testid="img-impact-story-secondary"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
