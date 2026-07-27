import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { canonicalRoutes, SITE_URL, type RouteMetadata } from "../../src/data/route-manifest";

const expectedOpenGraphProperties = ["og:title", "og:description", "og:url", "og:type", "og:image", "og:locale"];
const expectedTwitterNames = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"];

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

function htmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function monitorConsole(page: Page) {
  const problems: string[] = [];
  page.on("console", (message) => {
    if (/GL Driver Message .*GPU stall due to ReadPixels/.test(message.text())) return;
    if (message.type() === "error" || message.type() === "warning") {
      problems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
  return problems;
}

async function expectSingleMetadataState(page: Page, route: RouteMetadata) {
  const canonicalUrl = new URL(route.path, SITE_URL).toString();
  await expect(page).toHaveTitle(route.title);
  await expect(page.locator('html')).toHaveAttribute("lang", route.lang);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", route.description);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index,follow");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonicalUrl);

  for (const property of expectedOpenGraphProperties) {
    await expect(page.locator(`meta[property="${property}"]`), property).toHaveCount(1);
  }
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonicalUrl);
  for (const name of expectedTwitterNames) {
    await expect(page.locator(`meta[name="${name}"]`), name).toHaveCount(1);
  }

  const alternates = route.alternates ?? [];
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(alternates.length);
  for (const alternate of alternates) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${alternate.hrefLang}"]`)).toHaveAttribute(
      "href",
      new URL(alternate.path, SITE_URL).toString(),
    );
  }
}

async function expectRenderedPage(page: Page) {
  await expect(page.locator("#root main h1")).toHaveCount(1);
  await expect(page.locator("#root main h1")).toHaveCSS("opacity", "1");
  await expect.poll(() => page.locator("#root").evaluate((root) => root.children.length)).toBeGreaterThan(0);
  await expect(page.locator('meta[name="description"][data-rfg-managed="true"]')).toHaveCount(1);
}

test("all canonical routes expose correct initial HTML and hydrated metadata", async ({ page, request }) => {
  const consoleProblems = monitorConsole(page);

  for (const route of canonicalRoutes) {
    const response = await request.get(route.path);
    expect(response.status(), route.path).toBe(200);
    const html = await response.text();
    const canonicalUrl = new URL(route.path, SITE_URL).toString();
    expect(html, route.path).toContain(`<html lang="${route.lang}">`);
    expect(html, route.path).toContain(`<title>${htmlEscape(route.title)}</title>`);
    expect(html, route.path).toContain(`content="${htmlEscape(route.description)}"`);
    expect(html, route.path).toContain(`rel="canonical" href="${canonicalUrl}"`);

    await page.goto(route.path, { waitUntil: "load" });
    await expectRenderedPage(page);
    await expectSingleMetadataState(page, route);
  }

  expect(consoleProblems).toEqual([]);
});

test("client navigation clears stale English, German, alternate and Impressum metadata", async ({ page }) => {
  const consoleProblems = monitorConsole(page);
  const route = (path: string) => canonicalRoutes.find((candidate) => candidate.path === path)!;

  await page.goto("/about");
  await expectRenderedPage(page);
  await expectSingleMetadataState(page, route("/about"));

  await page.locator('nav[data-testid="nav-desktop"] a[href="/park-cleanup"]').click();
  await expect(page).toHaveURL(/\/park-cleanup$/);
  await expectSingleMetadataState(page, route("/park-cleanup"));

  await page.locator('main a[href="/de/park-cleanup"]').click();
  await expect(page).toHaveURL(/\/de\/park-cleanup$/);
  await expectSingleMetadataState(page, route("/de/park-cleanup"));

  await page.locator('footer a[href="/impressum"]').click();
  await expect(page).toHaveURL(/\/impressum$/);
  await expectSingleMetadataState(page, route("/impressum"));
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);

  expect(consoleProblems).toEqual([]);
});

test("the mobile navigation traps focus and restores focus and body scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const consoleProblems = monitorConsole(page);
  await page.goto("/");

  const trigger = page.getByTestId("button-mobile-menu-toggle");
  const overlay = page.getByTestId("nav-mobile");
  await trigger.click();
  await expect(overlay).toBeVisible();
  await expect(page.getByTestId("button-mobile-menu-close")).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await expect.poll(() => page.evaluate(() => document.body.style.touchAction)).toBe("none");

  const focusable = overlay.locator('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
  const first = focusable.first();
  const last = focusable.last();
  await last.focus();
  await page.keyboard.press("Tab");
  await expect(first).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(last).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(overlay).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
  await expect.poll(() => page.evaluate(() => document.body.style.touchAction)).toBe("");
  expect(consoleProblems).toEqual([]);
});

for (const viewport of [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  test(`${viewport.name} routes have no overflow or broken images`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const consoleProblems = monitorConsole(page);

    for (const route of canonicalRoutes) {
      await page.goto(route.path, { waitUntil: "load" });
      await expectRenderedPage(page);
      const overflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(overflow.scrollWidth, route.path).toBeLessThanOrEqual(overflow.clientWidth + 1);

      await expect.poll(
        () => page.locator("img").evaluateAll((images) => (images as HTMLImageElement[])
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.getAttribute("src"))),
        { message: route.path },
      ).toEqual([]);
    }

    expect(consoleProblems).toEqual([]);
  });
}

test("SoundCloud loads in its iframe and retains the accessible direct link", async ({ page }) => {
  const consoleProblems = monitorConsole(page);
  await page.goto("/crew-radio", { waitUntil: "load" });
  const iframe = page.locator('iframe[title="Rave for Good SoundCloud player"]');
  await expect(iframe).toHaveCount(1);
  await expect(iframe).toHaveAttribute("src", /^https:\/\/w\.soundcloud\.com\/player/);
  await expect.poll(() => page.frames().some((frame) => frame.url().startsWith("https://w.soundcloud.com/player"))).toBe(true);
  const soundCloudFrame = page.frames().find((frame) => frame.url().startsWith("https://w.soundcloud.com/player"));
  expect(soundCloudFrame).toBeDefined();
  await expect.poll(async () => (await soundCloudFrame!.locator("body").innerText()).trim().length).toBeGreaterThan(0);
  await expect(page.locator('a[href="https://soundcloud.com/soupcollectiveberlin"]')).toHaveAccessibleName(
    "Open Soup Collective on SoundCloud",
  );
  expect(consoleProblems).toEqual([]);
});

test("all rendered internal links and assets resolve", async ({ page, request }) => {
  const targets = new Set<string>();
  for (const route of canonicalRoutes) {
    await page.goto(route.path, { waitUntil: "load" });
    await expectRenderedPage(page);
    const values = await page.locator('a[href], img[src], script[src], link[href]').evaluateAll((elements) =>
      elements.flatMap((element) => [element.getAttribute("href"), element.getAttribute("src")]).filter(Boolean) as string[],
    );
    const currentOrigin = new URL(page.url()).origin;
    for (const value of values) {
      const url = new URL(value, currentOrigin);
      if (url.origin === currentOrigin) targets.add(`${url.pathname}${url.search}`);
    }
  }

  for (const target of targets) {
    const response = await request.get(target, { maxRedirects: 0 });
    expect(response.status(), target).toBeLessThan(400);
  }
});

for (const viewport of [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  test(`${viewport.name} pages pass a complete rendered color-contrast scan`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const failures: Array<{ path: string; nodes: Array<{ target: unknown; html: string; ratio: unknown; expected: unknown }> }> = [];
    for (const route of canonicalRoutes) {
      await page.goto(route.path, { waitUntil: "load" });
      await expectRenderedPage(page);
      await page.addStyleTag({ content: 'main [style*="opacity"] { opacity: 1 !important; transform: none !important; }' });
      const results = await new AxeBuilder({ page }).exclude("iframe").withRules(["color-contrast"]).analyze();
      const nodes = results.violations.flatMap((violation) => violation.nodes.map((node) => ({
        target: node.target,
        html: node.html,
        ratio: node.any[0]?.data?.contrastRatio,
        expected: node.any[0]?.data?.expectedContrastRatio,
      })));
      if (nodes.length) failures.push({ path: route.path, nodes });
    }

    if (viewport.name === "mobile") {
      await page.goto("/");
      await page.getByTestId("button-mobile-menu-toggle").click();
      await expect(page.getByTestId("nav-mobile")).toBeVisible();
      await page.addStyleTag({ content: 'main [style*="opacity"] { opacity: 1 !important; transform: none !important; }' });
      const menuResults = await new AxeBuilder({ page }).exclude("iframe").withRules(["color-contrast"]).analyze();
      const menuNodes = menuResults.violations.flatMap((violation) => violation.nodes.map((node) => ({
        target: node.target,
        html: node.html,
        ratio: node.any[0]?.data?.contrastRatio,
        expected: node.any[0]?.data?.expectedContrastRatio,
      })));
      if (menuNodes.length) failures.push({ path: "open mobile menu", nodes: menuNodes });
    }
    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });
}

test("hydrated 404 metadata stays non-indexable without canonical or Open Graph URL tags", async ({ page, request }) => {
  const response = await request.get("/missing-browser-route");
  expect(response.status()).toBe(404);
  const html = await response.text();
  expect(html).toContain('name="robots" content="noindex,follow"');
  expect(html).not.toContain('rel="canonical"');
  expect(html).not.toContain('property="og:url"');

  await page.goto("/missing-browser-route");
  await expect(page.locator("main h1")).toHaveText("404 Page Not Found");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,follow");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
});
