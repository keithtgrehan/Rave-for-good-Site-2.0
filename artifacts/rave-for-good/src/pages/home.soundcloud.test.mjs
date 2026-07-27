import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { createServer as createNetServer } from "node:net";
import path from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { build, createServer, preview } from "vite";
import react from "@vitejs/plugin-react";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sourceRoot = path.join(appRoot, "src");
const publicRoot = path.join(appRoot, "public");
const distRoot = path.join(appRoot, "dist");
const configFile = path.join(appRoot, "vite.config.ts");
const reviewClock = new Date("2026-07-27T12:00:00+02:00");

let ssrServer;
let previewServer;
let previewOrigin;

async function availablePort() {
  return await new Promise((resolve, reject) => {
    const socket = createNetServer();
    socket.once("error", reject);
    socket.listen(0, "127.0.0.1", () => {
      const address = socket.address();
      const port = typeof address === "object" && address ? address.port : undefined;
      socket.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function attributeValues(markup, attribute) {
  return [...markup.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => decodeHtml(match[1]));
}

function occurrences(markup, value) {
  return markup.split(value).length - 1;
}

async function previewFetch(pathname, options = {}) {
  return fetch(`${previewOrigin}${pathname}`, { redirect: "manual", ...options });
}

before(async () => {
  const port = await availablePort();
  assert.ok(port);
  process.env.PORT = String(port);
  process.env.BASE_PATH = "/";

  globalThis.location = new URL("https://www.raveforgood.berlin/");
  globalThis.history = { pushState() {}, replaceState() {} };
  globalThis.addEventListener = () => {};
  globalThis.removeEventListener = () => {};
  globalThis.window = globalThis;

  ssrServer = await createServer({
    appType: "custom",
    configFile: false,
    logLevel: "error",
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [react()],
    root: appRoot,
    resolve: { alias: { "@": sourceRoot }, dedupe: ["react", "react-dom"] },
    server: { middlewareMode: true, hmr: false, watch: null },
  });

  await build({ configFile, logLevel: "error" });
  previewServer = await preview({
    configFile,
    logLevel: "error",
    preview: { host: "127.0.0.1", port, strictPort: true },
  });
  previewOrigin = `http://127.0.0.1:${port}`;
});

after(async () => {
  await ssrServer?.close();
  await new Promise((resolve, reject) => {
    if (!previewServer?.httpServer) return resolve();
    previewServer.httpServer.close((error) => error ? reject(error) : resolve());
  });
});

test("Europe/Berlin formatting and single-day status remain DST-safe", async () => {
  const { formatEventDate, berlinDateKey, getEventStatus } = await ssrServer.ssrLoadModule("/src/lib/event-dates.ts");

  assert.equal(formatEventDate("2026-08-16", "en-GB"), "Sunday, 16 August 2026");
  assert.equal(formatEventDate("2026-08-16", "de-DE"), "Sonntag, 16. August 2026");
  assert.equal(berlinDateKey(new Date("2026-03-29T00:30:00Z")), "2026-03-29");
  assert.equal(berlinDateKey(new Date("2026-03-29T22:30:00Z")), "2026-03-30");
  assert.equal(berlinDateKey(new Date("2026-10-25T22:30:00Z")), "2026-10-25");
  assert.equal(berlinDateKey(new Date("2026-10-25T23:30:00Z")), "2026-10-26");

  const dateOnly = { date: "2026-08-16" };
  const timed = { date: "2026-08-16", endsAt: "2026-08-16T20:00:00+02:00" };
  assert.equal(getEventStatus(dateOnly, new Date("2026-08-16T21:59:59Z")), "upcoming");
  assert.equal(getEventStatus(dateOnly, new Date("2026-08-16T22:00:00Z")), "past");
  assert.equal(getEventStatus(timed, new Date("2026-08-16T17:59:59Z")), "upcoming");
  assert.equal(getEventStatus(timed, new Date("2026-08-16T18:00:00Z")), "past");
  assert.throws(
    () => getEventStatus({ date: "2026-08-16", endDate: "2026-08-17", endsAt: "2026-08-16T20:00:00+02:00" }, reviewClock),
    /cannot define both endDate and endsAt/,
  );
});

test("multi-day events remain current through endDate and transition at Berlin midnight", async () => {
  const { getEventStatus } = await ssrServer.ssrLoadModule("/src/lib/event-dates.ts");
  const { events } = await ssrServer.ssrLoadModule("/src/data/events.ts");
  const nova = events.find((event) => event.id === "rfg-nova");

  assert.equal(nova.date, "2026-06-26");
  assert.equal(nova.endDate, "2026-06-29");
  assert.equal(getEventStatus(nova, new Date("2026-06-29T21:59:59Z")), "upcoming");
  assert.equal(getEventStatus(nova, new Date("2026-06-29T22:00:00Z")), "past");

  const autumnDstEvent = { date: "2026-10-24", endDate: "2026-10-25" };
  assert.equal(getEventStatus(autumnDstEvent, new Date("2026-10-25T22:59:59Z")), "upcoming");
  assert.equal(getEventStatus(autumnDstEvent, new Date("2026-10-25T23:00:00Z")), "past");
  assert.throws(() => getEventStatus({ date: "2026-10-25", endDate: "2026-10-24" }, reviewClock), /cannot be before/);
});

test("central records classify and order the verified cleanup events", async () => {
  const { events, partitionEvents } = await ssrServer.ssrLoadModule("/src/data/events.ts");
  const { upcoming, past } = partitionEvents(events, reviewClock);
  const august = upcoming.find((event) => event.id === "rave-for-good-cleanup-2026-08-16");

  assert.ok(august);
  assert.equal(august.durationHours, 6);
  assert.deepEqual(august.musicProgramme, { throughout: true, includesDjs: true });
  assert.deepEqual(august.logistics, { time: "tbc", meetingPoint: "tbc", route: "tbc" });
  assert.equal(past[0].id, "trash-pickup-2026-07-19");
  assert.equal(past[0].volunteerCount, 28);
  assert.equal(past.find((event) => event.id === "berlin-park-cleanup-2026-06-14").volunteerCount, 16);
  assert.ok(events.every((event) => !("status" in event)));
  assert.deepEqual(past.map((event) => event.date), [...past].map((event) => event.date).sort().reverse());
});

test("event changes propagate to Home, Cleanup, Events, Impact, email subjects, and route metadata", async () => {
  const [
    { events },
    { default: Home },
    { ParkCleanupPage },
    { default: UpcomingEvents },
    { default: Impact },
    { createCanonicalRoutes },
  ] = await Promise.all([
    ssrServer.ssrLoadModule("/src/data/events.ts"),
    ssrServer.ssrLoadModule("/src/pages/home.tsx"),
    ssrServer.ssrLoadModule("/src/pages/park-cleanup.tsx"),
    ssrServer.ssrLoadModule("/src/pages/upcoming-events.tsx"),
    ssrServer.ssrLoadModule("/src/pages/impact.tsx"),
    ssrServer.ssrLoadModule("/src/data/route-manifest.ts"),
  ]);

  const changedEvents = events.map((event) => {
    if (event.id === "rave-for-good-cleanup-2026-08-16") {
      return { ...event, date: "2026-08-23", durationHours: 7 };
    }
    if (event.id === "trash-pickup-2026-07-19") {
      return {
        ...event,
        description: "Updated central cleanup description.",
        volunteerCount: 31,
        image: "/images/updated-central-cleanup.jpg",
      };
    }
    return event;
  });

  const home = renderToStaticMarkup(React.createElement(Home, { now: reviewClock, eventRecords: changedEvents }));
  const cleanup = renderToStaticMarkup(React.createElement(ParkCleanupPage, { locale: "en", now: reviewClock, eventRecords: changedEvents }));
  const eventPage = renderToStaticMarkup(React.createElement(UpcomingEvents, { now: reviewClock, eventRecords: changedEvents }));
  const impact = renderToStaticMarkup(React.createElement(Impact, { eventRecords: changedEvents }));
  const metadata = createCanonicalRoutes(changedEvents);

  for (const markup of [home, cleanup, eventPage]) {
    assert.match(markup, /23 August 2026/);
    assert.match(markup, /seven-hour moving cleanup/);
  }
  assert.match(home, /subject=23%20August%202026%20cleanup/);
  for (const markup of [home, cleanup, eventPage, impact]) {
    assert.match(markup, /Updated central cleanup description/);
    assert.match(markup, /updated-central-cleanup\.jpg/);
  }
  assert.match(impact, /31 volunteers/);
  assert.match(metadata.find((route) => route.path === "/park-cleanup").description, /seven-hour moving cleanup/);
  assert.match(metadata.find((route) => route.path === "/park-cleanup").description, /23 August 2026/);
});

test("German Cleanup uses localized event copy without duplicating factual fields", async () => {
  const [{ ParkCleanupPage }, { events }, { hasEventLocalization }, { createCanonicalRoutes }] = await Promise.all([
    ssrServer.ssrLoadModule("/src/pages/park-cleanup.tsx"),
    ssrServer.ssrLoadModule("/src/data/events.ts"),
    ssrServer.ssrLoadModule("/src/data/event-localizations.ts"),
    ssrServer.ssrLoadModule("/src/data/route-manifest.ts"),
  ]);
  const markup = renderToStaticMarkup(React.createElement(ParkCleanupPage, { locale: "de", now: reviewClock }));
  const germanMetadata = createCanonicalRoutes().find((route) => route.path === "/de/park-cleanup");

  assert.match(markup, /Sonntag, 16\. August 2026/);
  assert.match(markup, /Eine sechsstündige mobile Aufräumaktion/);
  assert.match(markup, /Aufräumaktion im Juli/);
  assert.match(markup, /Berliner Park-Aufräumaktion/);
  assert.match(markup, /Freiwillige von Rave for Good reinigen gemeinsam/);
  assert.doesNotMatch(markup, /A community park cleanup|A Berlin community cleanup|Rave for Good volunteers cleaning/);
  assert.ok(events.filter((event) => event.category === "community").every((event) => hasEventLocalization(event.id, "de")));
  assert.equal(
    germanMetadata.description,
    "Mach am Sonntag, 16. August 2026 bei einer sechsstündigen mobilen Aufräumaktion mit Musik und DJs während der gesamten Aktion mit.",
  );
});

test("the July archive renders every central lineup slot at its linked destination", async () => {
  const [{ ParkCleanupPage }, { default: UpcomingEvents }, { events }] = await Promise.all([
    ssrServer.ssrLoadModule("/src/pages/park-cleanup.tsx"),
    ssrServer.ssrLoadModule("/src/pages/upcoming-events.tsx"),
    ssrServer.ssrLoadModule("/src/data/events.ts"),
  ]);
  const july = events.find((event) => event.id === "trash-pickup-2026-07-19");
  const cleanup = renderToStaticMarkup(React.createElement(ParkCleanupPage, { locale: "en", now: reviewClock }));
  const archive = renderToStaticMarkup(React.createElement(UpcomingEvents, { now: reviewClock }));

  assert.equal(july.lineup.length, 6);
  assert.equal(july.detailPath, "/park-cleanup#trash-pickup-2026-07-19-lineup");
  assert.match(archive, /href="\/park-cleanup#trash-pickup-2026-07-19-lineup"/);
  assert.match(cleanup, /id="trash-pickup-2026-07-19-lineup"/);
  for (const slot of july.lineup) {
    assert.match(cleanup, new RegExp(`dateTime="2026-07-19T${slot.time}"`));
    assert.match(cleanup, new RegExp(slot.artist.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("NOVUM renders the central date range without competing duration claims", async () => {
  const { default: RfgNova } = await ssrServer.ssrLoadModule("/src/pages/rfg-nova.tsx");
  const markup = renderToStaticMarkup(React.createElement(RfgNova));

  assert.match(markup, /dateTime="2026-06-26"/);
  assert.match(markup, /dateTime="2026-06-29"/);
  assert.doesNotMatch(markup, /two days|two nights|four-day|weekend/i);
});

test("unsupported donation and Zigla Pakala assertions are absent from public pages", async () => {
  const [{ default: Home }, { default: GetInvolved }, { default: Contact }] = await Promise.all([
    ssrServer.ssrLoadModule("/src/pages/home.tsx"),
    ssrServer.ssrLoadModule("/src/pages/get-involved.tsx"),
    ssrServer.ssrLoadModule("/src/pages/contact.tsx"),
  ]);
  const markup = [Home, GetInvolved, Contact]
    .map((Component) => renderToStaticMarkup(React.createElement(Component)))
    .join("\n");

  assert.doesNotMatch(markup, /thousands of people|three (?:wells|in the area)|directly improving their health|100% of|zero to admin|private donors/i);
});

test("cleanup imagery has approved credits and event dates use semantic time elements", async () => {
  const [{ default: Home }, { ParkCleanupPage }, { default: UpcomingEvents }] = await Promise.all([
    ssrServer.ssrLoadModule("/src/pages/home.tsx"),
    ssrServer.ssrLoadModule("/src/pages/park-cleanup.tsx"),
    ssrServer.ssrLoadModule("/src/pages/upcoming-events.tsx"),
  ]);
  const pages = {
    home: renderToStaticMarkup(React.createElement(Home, { now: reviewClock })),
    cleanup: renderToStaticMarkup(React.createElement(ParkCleanupPage, { locale: "en", now: reviewClock })),
    germanCleanup: renderToStaticMarkup(React.createElement(ParkCleanupPage, { locale: "de", now: reviewClock })),
    events: renderToStaticMarkup(React.createElement(UpcomingEvents, { now: reviewClock })),
  };

  assert.equal(occurrences(pages.home, "© raveforgood.berlin e.V."), 3);
  assert.equal(occurrences(pages.cleanup, "© raveforgood.berlin e.V."), 5);
  assert.equal(occurrences(pages.germanCleanup, "© raveforgood.berlin e.V."), 5);
  assert.equal(occurrences(pages.events, "© raveforgood.berlin e.V."), 3);
  for (const markup of Object.values(pages)) {
    assert.match(markup, /<figure/);
    assert.match(markup, /<figcaption/);
    assert.match(markup, /<time dateTime="2026-08-16"/);
    assert.match(markup, /<time dateTime="2026-07-19"/);
    assert.match(markup, /<time dateTime="2026-06-14"/);
  }
});

test("About hides an empty committee block and renders verified records automatically", async () => {
  const { default: About } = await ssrServer.ssrLoadModule("/src/pages/about.tsx");
  const empty = renderToStaticMarkup(React.createElement(About));
  const populated = renderToStaticMarkup(React.createElement(About, {
    committeeRecords: [{ id: "verified-member", fullName: "Verified Member", role: "Committee role", verified: true }],
  }));

  assert.doesNotMatch(empty, /Rave For Good Committee/);
  assert.match(empty, /Berlin-based association and collective/);
  assert.match(populated, /Rave For Good Committee/);
  assert.match(populated, /Verified Member/);
});

test("metadata state is deterministic, production-canonical, and complete for every route", async () => {
  const [{ canonicalRoutes }, { metadataStateForPath }] = await Promise.all([
    ssrServer.ssrLoadModule("/src/data/route-manifest.ts"),
    ssrServer.ssrLoadModule("/src/components/PageMetadata.tsx"),
  ]);

  assert.equal(new Set(canonicalRoutes.map((route) => route.path)).size, 17);
  assert.equal(new Set(canonicalRoutes.map((route) => route.title)).size, 17);
  assert.equal(new Set(canonicalRoutes.map((route) => route.description)).size, 17);
  for (const route of canonicalRoutes) {
    const state = metadataStateForPath(route.path);
    assert.equal(state.title, route.title);
    assert.equal(state.description, route.description);
    assert.equal(state.lang, route.lang);
    assert.equal(state.robots, "index,follow");
    assert.equal(state.canonicalUrl, `https://www.raveforgood.berlin${route.path === "/" ? "/" : route.path}`);
  }

  const impressum = metadataStateForPath("/impressum");
  assert.equal(impressum.title, "Impressum | Rave for Good e.V.");
  assert.equal(impressum.robots, "index,follow");
  assert.equal(impressum.canonicalUrl, "https://www.raveforgood.berlin/impressum");
  assert.equal(metadataStateForPath("/missing").robots, "noindex,follow");
  assert.equal(metadataStateForPath("/missing").canonicalUrl, null);
});

test("the built preview serves canonical routes, exact redirects, real assets, and real 404s", async () => {
  const { canonicalRoutes } = await ssrServer.ssrLoadModule("/src/data/route-manifest.ts");
  const vercel = JSON.parse(await readFile(path.join(appRoot, "vercel.json"), "utf8"));

  for (const route of canonicalRoutes) {
    const response = await previewFetch(route.path);
    assert.equal(response.status, 200, route.path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/, route.path);
  }

  assert.deepEqual(vercel.redirects, [
    { source: "/events/rfg-nova", destination: "/upcoming-events/rfg-nova", permanent: true },
    { source: "/events", destination: "/upcoming-events", permanent: true },
    { source: "/imprint", destination: "/impressum", permanent: true },
    { source: "/privacy", destination: "/datenschutz", permanent: true },
  ]);
  for (const redirect of vercel.redirects) {
    const response = await previewFetch(redirect.source);
    assert.equal(response.status, 308, redirect.source);
    assert.equal(response.headers.get("location"), redirect.destination, redirect.source);
  }

  const builtAssets = await readdir(path.join(distRoot, "assets"));
  const javascriptAsset = builtAssets.find((file) => file.endsWith(".js"));
  assert.ok(javascriptAsset);
  assert.equal((await previewFetch(`/assets/${javascriptAsset}`)).status, 200);
  assert.equal((await previewFetch("/images/cleanup-collective-group-berlin.jpeg")).status, 200);

  for (const missingPath of ["/definitely-missing", "/missing.pdf", "/assets/missing.js", "/nested/assets/missing.png"]) {
    const response = await previewFetch(missingPath);
    const body = await response.text();
    assert.equal(response.status, 404, missingPath);
    assert.match(body, /Page Not Found \| Rave for Good/, missingPath);
    assert.doesNotMatch(body, /Dance for Change/, missingPath);
  }
});

test("built HTML contains route-specific initial metadata without duplicates", async () => {
  const { canonicalRoutes } = await ssrServer.ssrLoadModule("/src/data/route-manifest.ts");

  for (const route of canonicalRoutes) {
    const response = await previewFetch(route.path);
    const html = await response.text();
    const expectedCanonical = `https://www.raveforgood.berlin${route.path === "/" ? "/" : route.path}`;
    assert.match(html, new RegExp(`<html lang="${route.lang}"`), route.path);
    assert.equal(occurrences(html, "<title>"), 1, route.path);
    assert.equal(occurrences(html, 'name="description"'), 1, route.path);
    assert.equal(occurrences(html, 'name="robots"'), 1, route.path);
    assert.equal(occurrences(html, 'rel="canonical"'), 1, route.path);
    assert.ok(html.includes(`<title>${route.title}</title>`), route.path);
    assert.ok(html.includes(`content="${route.description.replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`), route.path);
    assert.ok(html.includes(`href="${expectedCanonical}"`), route.path);
    assert.ok(html.includes(`property="og:url" content="${expectedCanonical}"`), route.path);
    assert.equal(occurrences(html, 'name="twitter:card"'), 1, route.path);
  }

  const notFound = await (await previewFetch("/missing-route")).text();
  assert.match(notFound, /name="robots" content="noindex,follow"/);
  assert.equal(occurrences(notFound, 'rel="canonical"'), 0);
  assert.equal(occurrences(notFound, 'property="og:url"'), 0);
});

test("robots and sitemap are genuine, complete, and exclude redirects", async () => {
  const { canonicalRoutes } = await ssrServer.ssrLoadModule("/src/data/route-manifest.ts");
  const vercel = JSON.parse(await readFile(path.join(appRoot, "vercel.json"), "utf8"));
  const robotsResponse = await previewFetch("/robots.txt");
  const sitemapResponse = await previewFetch("/sitemap.xml");
  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();

  assert.equal(robotsResponse.status, 200);
  assert.match(robotsResponse.headers.get("content-type") ?? "", /^text\/plain\b/);
  assert.match(robots, /^User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/www\.raveforgood\.berlin\/sitemap\.xml/);
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/);
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">[\s\S]*<\/urlset>\s*$/);

  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expected = canonicalRoutes.filter((route) => route.indexable).map((route) => `https://www.raveforgood.berlin${route.path === "/" ? "/" : route.path}`);
  assert.deepEqual(locations, expected);
  for (const redirect of vercel.redirects) {
    assert.ok(!locations.some((location) => new URL(location).pathname === redirect.source));
  }
});

test("rendered internal links and image assets resolve to canonical routes and public files", async () => {
  const [
    { canonicalRoutes },
    { default: Home },
    { default: About },
    { default: UpcomingEvents },
    { default: RfgNova },
    { ParkCleanupPage },
    { default: BerlinParkCleanup },
    { default: CrewRadio },
    { default: Impact },
    { PartnersPage },
    { default: Artists },
    { default: GetInvolved },
    { default: Contact },
    { default: Impressum },
    { default: Datenschutz },
    { default: Transparency },
    { Header },
    { Footer },
  ] = await Promise.all([
    ssrServer.ssrLoadModule("/src/data/route-manifest.ts"),
    ssrServer.ssrLoadModule("/src/pages/home.tsx"),
    ssrServer.ssrLoadModule("/src/pages/about.tsx"),
    ssrServer.ssrLoadModule("/src/pages/upcoming-events.tsx"),
    ssrServer.ssrLoadModule("/src/pages/rfg-nova.tsx"),
    ssrServer.ssrLoadModule("/src/pages/park-cleanup.tsx"),
    ssrServer.ssrLoadModule("/src/pages/berlin-park-cleanup.tsx"),
    ssrServer.ssrLoadModule("/src/pages/crew-radio.tsx"),
    ssrServer.ssrLoadModule("/src/pages/impact.tsx"),
    ssrServer.ssrLoadModule("/src/pages/partners.tsx"),
    ssrServer.ssrLoadModule("/src/pages/artists.tsx"),
    ssrServer.ssrLoadModule("/src/pages/get-involved.tsx"),
    ssrServer.ssrLoadModule("/src/pages/contact.tsx"),
    ssrServer.ssrLoadModule("/src/pages/impressum.tsx"),
    ssrServer.ssrLoadModule("/src/pages/datenschutz.tsx"),
    ssrServer.ssrLoadModule("/src/pages/transparency.tsx"),
    ssrServer.ssrLoadModule("/src/components/layout/Header.tsx"),
    ssrServer.ssrLoadModule("/src/components/layout/Footer.tsx"),
  ]);

  const pageElements = [
    React.createElement(Header),
    React.createElement(Footer),
    React.createElement(Home, { now: reviewClock }),
    React.createElement(About),
    React.createElement(UpcomingEvents, { now: reviewClock }),
    React.createElement(RfgNova),
    React.createElement(ParkCleanupPage, { locale: "en", now: reviewClock }),
    React.createElement(ParkCleanupPage, { locale: "de", now: reviewClock }),
    React.createElement(BerlinParkCleanup),
    React.createElement(CrewRadio),
    React.createElement(Impact),
    React.createElement(PartnersPage, { locale: "en" }),
    React.createElement(PartnersPage, { locale: "de" }),
    React.createElement(Artists),
    React.createElement(GetInvolved),
    React.createElement(Contact),
    React.createElement(Impressum),
    React.createElement(Datenschutz),
    React.createElement(Transparency),
  ];
  const markup = pageElements.map((element) => renderToStaticMarkup(element)).join("\n");
  const validPaths = new Set(canonicalRoutes.map((route) => route.path));
  const redirectPaths = new Set(["/events", "/events/rfg-nova", "/imprint", "/privacy"]);

  for (const href of attributeValues(markup, "href")) {
    if (!href.startsWith("/")) continue;
    const pathname = new URL(href, "https://www.raveforgood.berlin").pathname;
    if (path.extname(pathname)) {
      await access(path.join(publicRoot, pathname));
      continue;
    }
    assert.ok(validPaths.has(pathname) || redirectPaths.has(pathname), `Broken internal link: ${href}`);
  }
  for (const src of attributeValues(markup, "src")) {
    if (!src.startsWith("/")) continue;
    const pathname = new URL(src, "https://www.raveforgood.berlin").pathname;
    await access(path.join(publicRoot, pathname));
  }

  assert.doesNotMatch(markup, /Alles im Fluss|SpreeCleanUp|BSR/);
});

test("mobile focus-wrap logic and SoundCloud accessibility contracts behave as configured", async () => {
  const [
    { mobileFocusWrapTarget },
    { SoundCloudPlayer, buildSoundCloudEmbedSrc },
  ] = await Promise.all([
    ssrServer.ssrLoadModule("/src/components/layout/Header.tsx"),
    ssrServer.ssrLoadModule("/src/components/SoundCloudPlayer.tsx"),
  ]);
  const first = { id: "first" };
  const last = { id: "last" };
  const middle = { id: "middle" };
  assert.equal(mobileFocusWrapTarget(first, last, first, true), last);
  assert.equal(mobileFocusWrapTarget(first, last, last, false), first);
  assert.equal(mobileFocusWrapTarget(first, last, middle, false), null);

  const markup = renderToStaticMarkup(React.createElement(SoundCloudPlayer));
  const iframeSrc = buildSoundCloudEmbedSrc("https://soundcloud.com/soupcollectiveberlin");
  const parsed = new URL(iframeSrc);
  assert.match(markup, /title="Rave for Good SoundCloud player"/);
  assert.match(markup, /Open Soup Collective on SoundCloud/);
  assert.equal(parsed.origin, "https://w.soundcloud.com");
  assert.equal(parsed.searchParams.get("url"), "https://soundcloud.com/soupcollectiveberlin");
  assert.equal(parsed.searchParams.get("auto_play"), "false");
});

test("public Impressum content and provider facts remain present", async () => {
  const { default: Impressum } = await ssrServer.ssrLoadModule("/src/pages/impressum.tsx");
  const markup = renderToStaticMarkup(React.createElement(Impressum));
  for (const value of [
    "Angaben gemäß § 5 DDG",
    "Rave for Good e.V.",
    "VR 39221 B",
    "27/676/50019",
    "Keith Grehan",
    "Haftung für Inhalte",
    "Haftung für Links",
    "Urheberrecht",
  ]) {
    assert.match(markup, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
