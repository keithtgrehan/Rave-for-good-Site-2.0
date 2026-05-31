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

test("the rendered homepage autoloads the non-autoplay SoundCloud iframe before past events", async (t) => {
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
