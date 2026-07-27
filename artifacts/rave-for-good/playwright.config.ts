import { defineConfig, devices } from "@playwright/test";
import os from "node:os";
import path from "node:path";

const port = 4197;

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: path.join(os.tmpdir(), "rave-for-good-playwright-results"),
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "line",
  timeout: 180_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    ...devices["Desktop Chrome"],
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },
  webServer: {
    command: "pnpm run serve -- --strictPort",
    cwd: import.meta.dirname,
    env: {
      BASE_PATH: "/",
      PORT: String(port),
    },
    port,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
