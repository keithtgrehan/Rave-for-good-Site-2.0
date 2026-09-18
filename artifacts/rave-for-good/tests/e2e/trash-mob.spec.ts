import { test, expect } from "@playwright/test";

const poster = 'img[src="/images/events/trash-mob-2026-09-19-poster.jpeg"]';
const lineup = "#trash-mob-2026-09-19-lineup";
const slots = ["15:00BIUSH", "16:00Ser Silvestre", "17:00Balzac", "18:00Goodrug", "19:00Esben"];

for (const timezoneId of ["Europe/Berlin", "America/Los_Angeles"]) {
  test.describe(timezoneId, () => {
    test.use({ timezoneId });
    test("archives exactly at Berlin midnight on an already-open page", async ({ page }) => {
      await page.clock.install({ time: new Date("2026-09-19T23:59:59.000+02:00") });
      await page.clock.pauseAt(new Date("2026-09-19T23:59:59.000+02:00"));
      await page.goto("/park-cleanup");
      const upcoming = page.locator('section[aria-labelledby="next-cleanup-heading"]');
      const past = page.locator('section[aria-labelledby="past-cleanups-heading"]');
      await expect(upcoming.locator(poster)).toHaveCount(1);
      await expect(page.locator(poster)).toHaveCount(1);
      await expect(page.locator(`${lineup} li`)).toHaveText(slots);
      await expect(past.locator("article")).toHaveCount(3);
      await page.clock.runFor(999);
      await expect(upcoming).toHaveCount(1);
      await page.clock.runFor(1);
      await expect(upcoming).toHaveCount(0);
      await expect(past.locator("article")).toHaveCount(4);
      await expect(past.locator("article").first().getByRole("heading", { name: "Trash Mob", exact: true })).toHaveCount(1);
      await expect(page.locator(poster)).toHaveCount(1);
      await expect(page.locator(`${lineup} li`)).toHaveText(slots);
      await expect(page.locator("#trash-pickup-2026-07-19-lineup li")).toHaveCount(6);
    });

    test("resynchronizes after inactive-tab return without a timer tick", async ({ page }) => {
      await page.clock.install({ time: new Date("2026-09-19T20:01:00+02:00") });
      await page.goto("/de/park-cleanup");
      await expect(page.getByRole("heading", { name: "Kommende Veranstaltungen" })).toHaveCount(1);
      await expect(page.getByText("15:00–20:00 · Berliner Zeit")).toHaveCount(1);
      await page.evaluate(() => Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" }));
      await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
      await page.clock.setSystemTime(new Date("2026-09-20T00:00:00+02:00"));
      await page.evaluate(() => {
        Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await expect(page.getByRole("heading", { name: "Kommende Veranstaltungen" })).toHaveCount(0);
      await expect(page.locator('section[aria-labelledby="past-cleanups-heading"] article').first().locator(poster)).toHaveCount(1);
      await expect(page.locator(`${lineup} li`)).toHaveText(slots);
    });
  });
}

for (const width of [1440, 390]) {
  test(`poster and lineup layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.clock.setFixedTime(new Date("2026-09-19T15:00:00+02:00"));
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/park-cleanup");
    const section = page.locator('section[aria-labelledby="next-cleanup-heading"]');
    await section.scrollIntoViewIfNeeded();
    await expect(page.locator(poster)).toBeVisible();
    await expect(page.locator(`${lineup} li`)).toHaveText(slots);
    await expect(page.getByText("Schlesischer Busch → Görlitzer Park", { exact: true })).toBeVisible();
    const dimensions = await page.locator(poster).evaluate((img: HTMLImageElement) => ({
      width: img.width, height: img.height, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
      fit: getComputedStyle(img).objectFit,
    }));
    expect(dimensions.naturalWidth).toBeGreaterThan(0);
    expect(dimensions.width / dimensions.height).toBeCloseTo(dimensions.naturalWidth / dimensions.naturalHeight, 2);
    expect(dimensions.fit).toBe("contain");
    const textBox = await page.locator(lineup).boundingBox();
    const imageBox = await page.locator(poster).boundingBox();
    if (width > 1024) expect(imageBox!.x).toBeGreaterThan(textBox!.x + textBox!.width);
    else expect(imageBox!.y).toBeGreaterThan(textBox!.y + textBox!.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const order = await page.locator('[data-testid="page-park-cleanup-en"] > section').evaluateAll((sections) => sections.slice(0, 3).map((section) => section.getAttribute("aria-labelledby") ?? section.getAttribute("aria-label")));
    expect(order).toEqual([null, "next-cleanup-heading", "Rave for Good Cleanup Collective gallery"]);
    await page.waitForTimeout(800);
    await section.screenshot({ path: `/tmp/trash-mob-${width}.png` });
    expect(errors).toEqual([]);
  });
}

test("one date-only source record remains upcoming after the displayed finish", async () => {
  const { events, partitionEvents } = await import("../../src/data/events");
  const matching = events.filter((event) => event.id === "trash-mob-2026-09-19");
  expect(matching).toHaveLength(1);
  expect(matching[0].endsAt).toBeUndefined();
  expect(matching[0].endTime).toBe("20:00");
  for (const instant of ["2026-09-19T20:00:00+02:00", "2026-09-19T23:59:59.999+02:00"]) {
    expect(partitionEvents(events, new Date(instant)).upcoming).toContain(matching[0]);
  }
  const { upcoming, past } = partitionEvents(events, new Date("2026-09-20T00:00:00+02:00"));
  expect(upcoming.filter((event) => event.category === "community")).toHaveLength(0);
  expect(past[0]).toBe(matching[0]);
});
