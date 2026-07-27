import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const origin = process.argv[2];
const label = process.argv[3] ?? "local server";
if (!origin) throw new Error("Usage: node scripts/http-matrix.mjs <origin> [label]");

const appRoot = path.resolve(import.meta.dirname, "..");
const distRoot = path.join(appRoot, "dist");
const vercel = JSON.parse(await readFile(path.join(appRoot, "vercel.json"), "utf8"));
const sitemapBody = await readFile(path.join(distRoot, "sitemap.xml"), "utf8");
const canonicalPaths = [...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
assert.equal(canonicalPaths.length, 17, "built sitemap must contain all 17 canonical routes");

async function request(pathname) {
  return fetch(new URL(pathname, origin), { redirect: "manual" });
}

for (const pathname of canonicalPaths) {
  const response = await request(pathname);
  assert.equal(response.status, 200, `${label} ${pathname}`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/, `${label} ${pathname}`);
}

for (const redirect of vercel.redirects) {
  const response = await request(redirect.source);
  assert.equal(response.status, 308, `${label} ${redirect.source}`);
  assert.equal(response.headers.get("location"), redirect.destination, `${label} ${redirect.source}`);
}

const builtAssets = await readdir(path.join(distRoot, "assets"));
const javascriptAsset = builtAssets.find((file) => file.endsWith(".js"));
assert.ok(javascriptAsset, "production build must emit a JavaScript asset");
for (const asset of [`/assets/${javascriptAsset}`, "/favicon.svg", "/images/cleanup-collective-group-berlin.jpeg"]) {
  assert.equal((await request(asset)).status, 200, `${label} ${asset}`);
}

const robots = await request("/robots.txt");
assert.equal(robots.status, 200, `${label} robots.txt`);
assert.match(robots.headers.get("content-type") ?? "", /^text\/plain\b/, `${label} robots.txt`);

const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.status, 200, `${label} sitemap.xml`);
assert.match(sitemap.headers.get("content-type") ?? "", /xml/, `${label} sitemap.xml`);
const servedSitemap = await sitemap.text();
const xmlValidation = spawnSync("xmllint", ["--noout", "-"], { input: servedSitemap, encoding: "utf8" });
assert.equal(xmlValidation.status, 0, xmlValidation.stderr || `${label} sitemap.xml is not valid XML`);

for (const pathname of ["/definitely-missing", "/missing.pdf", "/assets/missing.js", "/nested/assets/missing.png"]) {
  const response = await request(pathname);
  const body = await response.text();
  assert.equal(response.status, 404, `${label} ${pathname}`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/, `${label} ${pathname}`);
  assert.match(body, /Page Not Found \| Rave for Good/, `${label} ${pathname}`);
  assert.doesNotMatch(body, /rel="canonical"|property="og:url"/, `${label} ${pathname}`);
}

console.log(`${label} HTTP matrix passed: ${canonicalPaths.length} routes, ${vercel.redirects.length} redirects, assets, robots, sitemap, and 4 genuine 404 cases.`);
