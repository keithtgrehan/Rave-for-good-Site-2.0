import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer as createNetServer } from "node:net";
import { createRequire } from "node:module";
import path from "node:path";

const mode = process.argv[2];
if (mode !== "vite" && mode !== "vercel") {
  throw new Error("Usage: node scripts/local-routing-test.mjs <vite|vercel>");
}

const appRoot = path.resolve(import.meta.dirname, "..");
const repositoryRoot = path.resolve(appRoot, "../..");
const require = createRequire(import.meta.url);
const viteCli = path.join(path.dirname(require.resolve("vite/package.json")), "bin/vite.js");
const vercelLink = mode === "vercel"
  ? JSON.parse(await readFile(path.join(appRoot, ".vercel/project.json"), "utf8"))
  : null;

if (vercelLink && (!vercelLink.orgId || !vercelLink.projectId)) {
  throw new Error("The local Vercel link is missing its organisation or project ID");
}

async function availablePort() {
  return new Promise((resolve, reject) => {
    const server = createNetServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : undefined;
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

const port = await availablePort();
const origin = `http://127.0.0.1:${port}`;
const packageManager = process.env.npm_execpath ?? "pnpm";
const command = mode === "vite"
  ? [process.execPath, [viteCli, "preview", "--config", "vite.config.ts", "--host", "127.0.0.1", "--strictPort"]]
  : [packageManager, [
      "dlx",
      "vercel@50.28.0",
      "dev",
      "--yes",
      "--listen",
      `127.0.0.1:${port}`,
      "--local-config",
      path.join(appRoot, "vercel.json"),
    ]];

const child = spawn(command[0], command[1], {
  cwd: mode === "vercel" ? repositoryRoot : appRoot,
  env: {
    ...process.env,
    BASE_PATH: "/",
    CI: mode === "vercel" ? "1" : process.env.CI,
    PORT: String(port),
    RFG_VERCEL_LOCAL: mode === "vercel" ? "1" : "0",
    VERCEL_TELEMETRY_DISABLED: "1",
    ...(vercelLink ? {
      VERCEL_ORG_ID: vercelLink.orgId,
      VERCEL_PROJECT_ID: vercelLink.projectId,
    } : {}),
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
child.stdout.on("data", (chunk) => {
  output += chunk;
  process.stdout.write(chunk);
});
child.stderr.on("data", (chunk) => {
  output += chunk;
  process.stderr.write(chunk);
});

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`${mode} server exited before startup (${child.exitCode}).\n${output}`);
    }
    try {
      await fetch(origin, { redirect: "manual" });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error(`${mode} server did not become ready within 45 seconds.\n${output}`);
}

try {
  await waitForServer();
  await new Promise((resolve, reject) => {
    const matrix = spawn(process.execPath, [path.join(appRoot, "scripts/http-matrix.mjs"), origin, mode === "vite" ? "Vite Preview" : "Vercel Local"], {
      cwd: appRoot,
      stdio: "inherit",
    });
    matrix.once("error", reject);
    matrix.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`HTTP matrix exited with ${code}`)));
  });
} finally {
  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
}
