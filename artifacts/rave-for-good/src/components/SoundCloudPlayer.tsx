import { useState } from "react";

const LOAD_SOUNDCLOUD_IMMEDIATELY = true;

export const SOUNDCLOUD_MIX_URLS = [
  "https://soundcloud.com/soupcollectiveberlin",
  // TODO: Add individual Soup Collective mix URLs here for true random mix playback.
] as const;

export function getRandomSoundCloudUrl(randomSource: () => number = Math.random) {
  const index = Math.min(
    SOUNDCLOUD_MIX_URLS.length - 1,
    Math.floor(randomSource() * SOUNDCLOUD_MIX_URLS.length),
  );

  return SOUNDCLOUD_MIX_URLS[index] ?? SOUNDCLOUD_MIX_URLS[0];
}

export function buildSoundCloudEmbedSrc(soundCloudUrl: string) {
  return (
    "https://w.soundcloud.com/player/?" +
    new URLSearchParams({
      url: soundCloudUrl,
      auto_play: "false",
      hide_related: "true",
      show_comments: "false",
      show_user: "true",
      show_reposts: "false",
      show_teaser: "false",
      visual: "false",
      color: "2563eb",
    }).toString()
  );
}

export function SoundCloudPlayer() {
  const [selectedUrl] = useState(getRandomSoundCloudUrl);
  const src = buildSoundCloudEmbedSrc(selectedUrl);

  return (
    <section
      aria-labelledby="soundcloud-player-heading"
      className="relative overflow-hidden bg-background py-20 sm:py-24 md:py-32"
      data-testid="section-soundcloud-player"
    >
      <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(77,163,255,0.07)_0%,rgba(109,94,245,0.045)_36%,transparent_72%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent/70">
              Listen
            </p>
            <h2
              id="soundcloud-player-heading"
              className="font-display text-3xl font-bold uppercase leading-[1] tracking-[-0.025em] sm:text-4xl md:text-[3.25rem]"
            >
              Sounds from the <span className="text-primary">community</span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-base font-light leading-[1.7] text-foreground/50 sm:text-lg">
              Sounds from the Rave for Good extended family, starting with Soup
              Collective Berlin.
            </p>
          </div>

          <div className="relative overflow-hidden border border-white/[0.075] bg-card/80 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.42)] sm:p-4">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(77,163,255,0.12),transparent_34%,rgba(109,94,245,0.11)_100%)]" />
            <div className="relative mb-3 flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/35">
              <span>RFG frequency</span>
              <span className="text-accent/70">SC-01</span>
            </div>

            {LOAD_SOUNDCLOUD_IMMEDIATELY && (
              <>
                <iframe
                  title="Rave for Good SoundCloud player"
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={src}
                  className="relative block w-full border-0 bg-background"
                  data-testid="soundcloud-player-iframe"
                />
                <a
                  href={selectedUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-cta relative mt-3 flex min-h-11 w-full items-center justify-center border border-white/[0.09] bg-background/70 px-5 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/70 hover:border-primary/45 hover:text-foreground"
                  data-testid="link-open-soup-soundcloud"
                >
                  Open Soup Collective on SoundCloud
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
