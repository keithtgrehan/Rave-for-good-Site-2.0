import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sourceRoot = path.join(appRoot, "src");

test("the app root route uses src/pages/home.tsx", async () => {
  const appSource = await readFile(path.join(sourceRoot, "App.tsx"), "utf8");

  assert.match(appSource, /import Home from ["']@\/pages\/home["'];/);
  assert.match(appSource, /<Route path="\/" component=\{Home\} \/>/);
});

test("the app registers the Crew Radio route", async () => {
  const appSource = await readFile(path.join(sourceRoot, "App.tsx"), "utf8");

  assert.match(appSource, /import CrewRadio from ["']@\/pages\/crew-radio["'];/);
  assert.match(appSource, /<Route path="\/crew-radio" component=\{CrewRadio\} \/>/);
});

test("the app registers the Berlin park cleanup route", async () => {
  const appSource = await readFile(path.join(sourceRoot, "App.tsx"), "utf8");

  assert.match(appSource, /import BerlinParkCleanup from ["']@\/pages\/berlin-park-cleanup["'];/);
  assert.match(appSource, /<Route path="\/berlin-park-cleanup" component=\{BerlinParkCleanup\} \/>/);
});

test("the footer includes the Berlin park cleanup discovery link", async () => {
  const footerSource = await readFile(
    path.join(sourceRoot, "components/layout/Footer.tsx"),
    "utf8",
  );

  assert.match(footerSource, /href: "\/berlin-park-cleanup", label: "Park Cleanup"/);
});

test("the Berlin park cleanup page uses the required image and donation CTA", async () => {
  const cleanupSource = await readFile(
    path.join(sourceRoot, "pages/berlin-park-cleanup.tsx"),
    "utf8",
  );

  assert.match(cleanupSource, /Berlin Local Action/);
  assert.match(cleanupSource, /Berlin Park Cleanup/);
  assert.match(cleanupSource, /\/images\/berlin-park-cleanup\.jpg/);
  assert.match(cleanupSource, /Support the cleanup/);
  assert.match(cleanupSource, /https:\/\/paypal\.me\/RaveForGoodeV/);
  assert.match(cleanupSource, /info@raveforgood\.berlin/);
});

test("Novum is archived under past events and removed from upcoming cards", async () => {
  const eventsSource = await readFile(path.join(sourceRoot, "data/events.ts"), "utf8");
  const upcomingSource = await readFile(
    path.join(sourceRoot, "pages/upcoming-events.tsx"),
    "utf8",
  );
  const novaSource = await readFile(path.join(sourceRoot, "pages/rfg-nova.tsx"), "utf8");
  const appSource = await readFile(path.join(sourceRoot, "App.tsx"), "utf8");

  assert.match(eventsSource, /id: "rfg-nova"/);
  assert.match(eventsSource, /date: "2026-06-26"/);
  assert.match(eventsSource, /venue: "Palace in Debrznica"/);
  assert.match(eventsSource, /status: "past"/);
  assert.match(eventsSource, /image: "\/images\/events\/rfg-nova\/festival-flyer\.jpg"/);

  assert.doesNotMatch(upcomingSource, /data-testid="card-rfg-nova"/);
  assert.match(upcomingSource, /No upcoming events announced/);

  assert.match(appSource, /<Route path="\/events\/rfg-nova" component=\{RfgNova\} \/>/);
  assert.match(appSource, /<Route path="\/upcoming-events\/rfg-nova" component=\{RfgNova\} \/>/);
  assert.doesNotMatch(novaSource, /Buy Tickets/);
  assert.doesNotMatch(novaSource, /Back to Upcoming Events/);
  assert.match(novaSource, /Back to Past Events/);
});

test("the rendered homepage autoloads the non-autoplay SoundCloud iframe before past events", async (t) => {
  const homeSource = await readFile(path.join(sourceRoot, "pages/home.tsx"), "utf8");

  assert.match(homeSource, /import \{ SoundCloudPlayer \} from ["']@\/components\/SoundCloudPlayer["'];/);
  assert.match(homeSource, /<SoundCloudPlayer \/>/);

  const server = await createServer({
    appType: "custom",
    configFile: false,
    logLevel: "error",
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
    plugins: [react()],
    root: appRoot,
    resolve: {
      alias: {
        "@": sourceRoot,
      },
      dedupe: ["react", "react-dom"],
    },
    server: {
      middlewareMode: true,
      hmr: false,
      watch: null,
    },
  });

  t.after(async () => {
    await server.close();
  });

  const { default: Home } = await server.ssrLoadModule("/src/pages/home.tsx");
  const { buildSoundCloudEmbedSrc } = await server.ssrLoadModule("/src/components/SoundCloudPlayer.tsx");
  globalThis.location = new URL("http://localhost/");
  globalThis.history = {
    pushState() {},
    replaceState() {},
  };
  globalThis.addEventListener = () => {};
  globalThis.removeEventListener = () => {};

  const markup = renderToStaticMarkup(React.createElement(Home));
  const soundCloudIndex = markup.indexOf('data-testid="section-soundcloud-player"');
  const pastEventsIndex = markup.indexOf('data-testid="section-featured-event"');

  assert.notEqual(soundCloudIndex, -1, "missing SoundCloud section");
  assert.notEqual(pastEventsIndex, -1, "missing past events section");
  assert.ok(
    soundCloudIndex < pastEventsIndex,
    "SoundCloud section must render before past events",
  );

  const soundCloudMarkup = markup.slice(soundCloudIndex, pastEventsIndex);
  const iframeMatch = soundCloudMarkup.match(/<iframe\b(?=[^>]*data-testid="soundcloud-player-iframe")[^>]*src="([^"]+)"[^>]*>/);

  assert.ok(iframeMatch, "missing SoundCloud iframe");
  assert.doesNotMatch(soundCloudMarkup, /data-testid="button-load-soundcloud-player"/);
  assert.doesNotMatch(soundCloudMarkup, /Load SoundCloud player/);
  assert.match(soundCloudMarkup, /data-testid="link-open-soup-soundcloud"/);
  assert.match(soundCloudMarkup, /Open Soup Collective on SoundCloud/);

  const renderedIframeSrc = new URL(iframeMatch[1].replaceAll("&amp;", "&"));

  assert.equal(renderedIframeSrc.origin, "https://w.soundcloud.com");
  assert.equal(renderedIframeSrc.searchParams.get("auto_play"), "false");
  assert.equal(
    renderedIframeSrc.searchParams.get("url"),
    "https://soundcloud.com/soupcollectiveberlin",
  );

  const iframeSrc = buildSoundCloudEmbedSrc("https://soundcloud.com/soupcollectiveberlin");

  const parsedIframeSrc = new URL(iframeSrc);
  assert.equal(parsedIframeSrc.origin, "https://w.soundcloud.com");
  assert.equal(parsedIframeSrc.pathname, "/player/");
  assert.equal(
    parsedIframeSrc.searchParams.get("url"),
    "https://soundcloud.com/soupcollectiveberlin",
  );
  assert.equal(parsedIframeSrc.searchParams.get("auto_play"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("hide_related"), "true");
  assert.equal(parsedIframeSrc.searchParams.get("show_comments"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("show_user"), "true");
  assert.equal(parsedIframeSrc.searchParams.get("show_reposts"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("show_teaser"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("visual"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("color"), "2563eb");
});
