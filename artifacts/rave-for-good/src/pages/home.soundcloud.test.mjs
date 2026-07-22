import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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

test("the app registers the Park Cleanup hub route", async () => {
  const appSource = await readFile(path.join(sourceRoot, "App.tsx"), "utf8");

  assert.match(appSource, /import ParkCleanup from ["']@\/pages\/park-cleanup["'];/);
  assert.match(appSource, /<Route path="\/park-cleanup" component=\{ParkCleanup\} \/>/);
});

test("the header exposes Park Cleanup in both navs with shared active-state aliases", async () => {
  const headerSource = await readFile(
    path.join(sourceRoot, "components/layout/Header.tsx"),
    "utf8",
  );

  assert.match(
    headerSource,
    /\{ href: "\/park-cleanup", label: "Park Cleanup", testId: "park-cleanup" \}/,
  );
  assert.match(headerSource, /data-testid=\{`link-\$\{link\.testId\}`\}/);
  assert.match(headerSource, /data-testid=\{`mobile-link-\$\{link\.testId\}`\}/);
  assert.match(headerSource, /function isNavLinkActive\(currentPath: string, href: string\)/);
  assert.match(headerSource, /currentPath\.startsWith\("\/park-cleanup\/"\)/);
  assert.match(headerSource, /currentPath === "\/berlin-park-cleanup"/);
  assert.match(headerSource, /currentPath\.startsWith\("\/upcoming-events\/"\)/);
  assert.equal(
    headerSource.match(/isNavLinkActive\(location, link\.href\)/g)?.length,
    2,
  );
});

test("the footer points Park Cleanup discovery to the hub", async () => {
  const footerSource = await readFile(
    path.join(sourceRoot, "components/layout/Footer.tsx"),
    "utf8",
  );

  assert.match(footerSource, /href: "\/park-cleanup", label: "Park Cleanup"/);
  assert.doesNotMatch(
    footerSource,
    /href: "\/berlin-park-cleanup", label: "Park Cleanup"/,
  );
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
  assert.match(cleanupSource, /Previous Community Event · 14 June 2026/);
  assert.match(cleanupSource, /Back to Park Cleanup/);
  assert.match(cleanupSource, /href="\/park-cleanup"/);
});

test("the Park Cleanup hub renders central community events and required actions", async () => {
  const hubSource = await readFile(
    path.join(sourceRoot, "pages/park-cleanup.tsx"),
    "utf8",
  );

  assert.match(hubSource, /Upcoming Community Events/);
  assert.match(hubSource, /Previous Events/);
  assert.match(
    hubSource,
    /event\.category === "community" && event\.status === "upcoming"/,
  );
  assert.match(
    hubSource,
    /event\.category === "community" && event\.status === "past"/,
  );
  assert.match(hubSource, /Trash Pickup community cleanup flyer for Sunday 19 July 2026/);
  assert.match(hubSource, /data-testid="trash-pickup-lineup"/);
  assert.match(hubSource, /View Previous Event/);
  assert.match(hubSource, /https:\/\/paypal\.me\/RaveForGoodeV/);
  assert.match(hubSource, /info@raveforgood\.berlin/);
  assert.match(hubSource, /Rave for Good Cleanup Collective \| Rave for Good/);
  assert.match(
    hubSource,
    /The Rave for Good Cleanup Collective brings together Berlin’s electronic music community to protect and restore the city’s parks, canals and public spaces through community action\./,
  );
  assert.match(
    hubSource,
    /We partner with existing environmental organisations rather than reinventing the wheel\./,
  );
  assert.match(hubSource, /\/images\/cleanup-collective-group-berlin\.jpeg/);
  assert.match(hubSource, /\/images\/rave-for-good-cleanup-team\.jpeg/);
  assert.match(hubSource, /md:grid-cols-2/);
  assert.equal(hubSource.match(/aspect-\[7\/6\]/g)?.length, 2);
  assert.match(
    hubSource,
    /Rave for Good volunteers taking part in a Berlin park cleanup/,
  );
  assert.match(
    hubSource,
    /Rave for Good cleanup team with collected waste bags in Berlin/,
  );
  assert.match(hubSource, /https:\/\/www\.raveforgood\.berlin\/park-cleanup/);
  assert.match(
    hubSource,
    /https:\/\/www\.raveforgood\.berlin\/images\/cleanup-collective-group-berlin\.jpeg/,
  );
});

test("central event data includes the exact Trash Pickup schedule and cleanup archive", async () => {
  const eventsSource = await readFile(path.join(sourceRoot, "data/events.ts"), "utf8");

  assert.match(eventsSource, /export type EventLineupItem/);
  assert.match(eventsSource, /export type EventCategory = "music" \| "community"/);
  assert.match(eventsSource, /id: "trash-pickup-2026-07-19"/);
  assert.match(eventsSource, /date: "2026-07-19"/);
  assert.match(eventsSource, /startTime: "14:00"/);
  assert.match(eventsSource, /endTime: "20:00"/);
  assert.match(eventsSource, /startLocation: "Lohmühlenplatz"/);
  assert.match(eventsSource, /endLocation: "Schlesischer Busch"/);
  assert.match(eventsSource, /image: "\/images\/events\/trash-pickup-2026-07-19\.jpg"/);
  assert.match(eventsSource, /status: "upcoming"/);
  assert.match(eventsSource, /category: "community"/);
  assert.match(eventsSource, /\{ time: "14:00", artist: "l_udwig" \}/);
  assert.match(eventsSource, /\{ time: "15:00", artist: "Confidentially Blonde" \}/);
  assert.match(eventsSource, /\{ time: "16:00", artist: "Clelio" \}/);
  assert.match(eventsSource, /\{ time: "17:00", artist: "Radio Renato" \}/);
  assert.match(eventsSource, /\{ time: "18:00", artist: "Fyschy" \}/);
  assert.match(eventsSource, /\{ time: "19:00", artist: "Prisoner of Wicked" \}/);

  const archiveRecord = eventsSource.slice(
    eventsSource.indexOf('id: "berlin-park-cleanup-2026-06-14"'),
    eventsSource.indexOf('id: "rfg-nova"'),
  );
  assert.match(archiveRecord, /title: "Berlin Park Cleanup"/);
  assert.match(archiveRecord, /date: "2026-06-14"/);
  assert.match(archiveRecord, /status: "past"/);
  assert.match(archiveRecord, /category: "community"/);
  assert.match(archiveRecord, /image: "\/images\/berlin-park-cleanup\.jpg"/);
  assert.match(archiveRecord, /detailPath: "\/berlin-park-cleanup"/);
});

test("Upcoming Events renders central upcoming records and retains the empty state", async () => {
  const upcomingSource = await readFile(
    path.join(sourceRoot, "pages/upcoming-events.tsx"),
    "utf8",
  );

  assert.match(upcomingSource, /import \{ events \} from ["']@\/data\/events["'];/);
  assert.match(
    upcomingSource,
    /events\.filter\(\(event\) => event\.status === "upcoming"\)/,
  );
  assert.match(upcomingSource, /upcomingEvents\.length > 0/);
  assert.match(upcomingSource, /upcomingEvents\.map\(\(event\) =>/);
  assert.match(upcomingSource, /data-testid="upcoming-events-list"/);
  assert.match(upcomingSource, /data-testid="upcoming-events-empty-state"/);
  assert.match(upcomingSource, /No upcoming events announced/);
  assert.match(upcomingSource, /View Past Events/);
});

test("cleanup flyer assets retain their expected byte content", async () => {
  const newFlyer = await readFile(
    path.join(appRoot, "public/images/events/trash-pickup-2026-07-19.jpg"),
  );
  const archiveFlyer = await readFile(
    path.join(appRoot, "public/images/berlin-park-cleanup.jpg"),
  );

  assert.equal(
    createHash("md5").update(newFlyer).digest("hex"),
    "f43b08fb5fa3b2eb142dd63de8dcc006",
  );
  assert.equal(
    createHash("md5").update(archiveFlyer).digest("hex"),
    "f860be2cb09b4b88faca44d244374782",
  );
  assert.notDeepEqual(newFlyer, archiveFlyer);
});

test("Cleanup Collective gallery assets are distinct JPEG images", async () => {
  const galleryImages = await Promise.all([
    readFile(path.join(appRoot, "public/images/cleanup-collective-group-berlin.jpeg")),
    readFile(path.join(appRoot, "public/images/rave-for-good-cleanup-team.jpeg")),
  ]);

  for (const image of galleryImages) {
    assert.equal(image.subarray(0, 3).toString("hex"), "ffd8ff");
  }

  assert.notDeepEqual(galleryImages[0], galleryImages[1]);
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
