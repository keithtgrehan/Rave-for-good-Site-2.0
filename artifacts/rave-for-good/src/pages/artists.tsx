import { motion } from "framer-motion";
import { ArrowUpRight, Headphones } from "lucide-react";
import { artists } from "@/data/artists";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.035 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

export default function Artists() {
  const linkedArtists = artists.filter((artist) => artist.soundcloudUrls.length > 0).length;

  return (
    <div className="w-full relative overflow-hidden" data-testid="page-artists">
      <div className="absolute top-0 right-0 w-[760px] h-[520px] bg-[radial-gradient(ellipse,rgba(77,163,255,0.065)_0%,rgba(109,94,245,0.035)_42%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[520px] h-[420px] bg-[radial-gradient(ellipse,rgba(109,94,245,0.045)_0%,transparent_70%)] pointer-events-none" />

      <div className="pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mb-20 md:mb-28 max-w-5xl">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-primary-readable uppercase tracking-[0.2em]">Community Lineup</span>
            </motion.div>

            <motion.h1
              className="font-display text-[clamp(4rem,12vw,9rem)] font-bold uppercase tracking-[-0.035em] leading-[0.85] mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
              data-testid="heading-artists"
            >
              Our <br />
              <span className="text-primary">Artists</span>
            </motion.h1>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <p className="text-xl md:text-2xl text-foreground/55 font-light leading-relaxed max-w-3xl">
                DJs and selectors who have helped turn Berlin dancefloors into direct action.
              </p>
              <div className="border border-white/[0.06] bg-card px-6 py-5 min-w-[180px]">
                <div className="font-display text-3xl font-bold tracking-[-0.03em] text-foreground/90">{artists.length}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Artists</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-readable mt-2">{linkedArtists} linked</div>
              </div>
            </motion.div>
          </div>

          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.04]"
            initial="hidden"
            animate="visible"
            variants={stagger}
            aria-label="Artist list"
          >
            {artists.map((artist, index) => {
              const hasSingleSoundCloud = artist.soundcloudUrls.length === 1;
              const hasMultipleSoundCloudUrls = artist.soundcloudUrls.length > 1;
              const artistNameClassName =
                "font-display text-xl md:text-2xl font-bold uppercase tracking-[-0.02em] text-foreground/85 break-words";

              return (
                <motion.li
                  key={`${artist.name}-${index}`}
                  variants={itemVariant}
                  className="group bg-card hover:bg-background transition-colors duration-300 px-5 py-4 md:px-7 md:py-5 min-h-[76px] flex items-center justify-between gap-5"
                  data-testid={`artist-row-${index}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="hidden sm:flex w-8 h-8 border border-white/[0.08] items-center justify-center text-primary/50 group-hover:text-primary group-hover:border-primary/30 transition-colors shrink-0">
                      <Headphones size={14} />
                    </span>
                    <div className="min-w-0">
                      {hasSingleSoundCloud ? (
                        <a
                          href={artist.soundcloudUrls[0]}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={`${artistNameClassName} inline-flex items-center gap-2 hover:text-primary transition-colors`}
                          data-testid={`artist-link-${index}`}
                          aria-label={`${artist.name} on SoundCloud`}
                        >
                          {artist.name}
                          <ArrowUpRight size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary/60" />
                        </a>
                      ) : (
                        <span className={`${artistNameClassName} block`}>
                          {artist.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {hasMultipleSoundCloudUrls && (
                    <div className="flex flex-wrap justify-end gap-2 shrink-0">
                      {artist.soundcloudUrls.map((url, urlIndex) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="border border-white/[0.08] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-primary-readable hover:text-foreground hover:border-primary/35 transition-colors inline-flex items-center gap-1"
                          data-testid={`artist-soundcloud-${index}-${urlIndex}`}
                          aria-label={`${artist.name} SoundCloud${artist.soundcloudUrls.length > 1 ? ` ${urlIndex + 1}` : ""}`}
                        >
                          SC{artist.soundcloudUrls.length > 1 ? ` ${urlIndex + 1}` : ""}
                          <ArrowUpRight size={11} />
                        </a>
                      ))}
                    </div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
