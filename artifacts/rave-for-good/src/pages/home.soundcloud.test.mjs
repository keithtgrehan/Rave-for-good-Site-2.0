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

test("the rendered homepage includes the SoundCloud iframe before past events", async (t) => {
  const homeSource = await readFile(path.join(sourceRoot, "pages/home.tsx"), "utf8");

  assert.match(homeSource, /import \{ SoundCloudPlayer \} from ["']@\/components\/SoundCloudPlayer["'];/);
  assert.match(homeSource, /<SoundCloudPlayer \/>/);

  const server = await createServer({
    appType: "custom",
    configFile: false,
    logLevel: "error",
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
    },
  });

  t.after(async () => {
    await server.close();
  });

  const { default: Home } = await server.ssrLoadModule("/src/pages/home.tsx");
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
  assert.match(soundCloudMarkup, /<iframe\b[^>]*data-testid="soundcloud-player-iframe"[^>]*>/);
  assert.doesNotMatch(soundCloudMarkup, /display:\s*none|visibility:\s*hidden/);

  const iframeTag = soundCloudMarkup.match(
    /<iframe\b[^>]*data-testid="soundcloud-player-iframe"[^>]*>/,
  )?.[0];

  assert.ok(iframeTag, "missing SoundCloud iframe tag");
  assert.match(iframeTag, /allow="autoplay"/);

  const iframeSrc = iframeTag
    .match(/\bsrc="([^"]+)"/)?.[1]
    ?.replaceAll("&amp;", "&");

  assert.ok(iframeSrc, "missing SoundCloud iframe src");

  const parsedIframeSrc = new URL(iframeSrc);
  assert.equal(parsedIframeSrc.origin, "https://w.soundcloud.com");
  assert.equal(parsedIframeSrc.pathname, "/player/");
  assert.equal(
    parsedIframeSrc.searchParams.get("url"),
    "https://soundcloud.com/soupcollectiveberlin",
  );
  assert.equal(parsedIframeSrc.searchParams.get("auto_play"), "true");
  assert.equal(parsedIframeSrc.searchParams.get("hide_related"), "true");
  assert.equal(parsedIframeSrc.searchParams.get("show_comments"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("show_user"), "true");
  assert.equal(parsedIframeSrc.searchParams.get("show_reposts"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("show_teaser"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("visual"), "false");
  assert.equal(parsedIframeSrc.searchParams.get("color"), "2563eb");

  assert.match(soundCloudMarkup, /Open Soup Collective on SoundCloud/);
  assert.match(soundCloudMarkup, /href="https:\/\/soundcloud\.com\/soupcollectiveberlin"/);
});
