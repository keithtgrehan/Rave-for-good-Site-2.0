import { defineConfig, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { canonicalRoutes, DEFAULT_OPEN_GRAPH_IMAGE, SITE_URL, absoluteUrl } from "./src/data/route-manifest";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

const outputDirectory = path.resolve(import.meta.dirname, "dist");

const staticContentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function routeHead(route: (typeof canonicalRoutes)[number], includeLocation = true) {
  const canonicalUrl = absoluteUrl(route.path);
  const imageUrl = absoluteUrl(route.image ?? DEFAULT_OPEN_GRAPH_IMAGE);
  const alternates = (route.alternates ?? [])
    .map((alternate) => `<link rel="alternate" hreflang="${alternate.hrefLang}" href="${absoluteUrl(alternate.path)}" />`)
    .join("\n    ");

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${route.indexable ? "index,follow" : "noindex,follow"}" />`,
    ...(includeLocation ? [`<link rel="canonical" href="${canonicalUrl}" />`] : []),
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    ...(includeLocation ? [`<meta property="og:url" content="${canonicalUrl}" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:locale" content="${route.lang === "de" ? "de_DE" : "en_GB"}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    alternates,
  ].filter(Boolean).join("\n    ");
}

function injectRouteHead(
  template: string,
  route: (typeof canonicalRoutes)[number],
  includeLocation = true,
) {
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`)
    .replace(/\s*<title>.*?<\/title>/, "")
    .replace("</head>", `    ${routeHead(route, includeLocation)}\n  </head>`);
}

function staticRouteOutputPlugin() {
  const previewRedirects = new Map([
    ["/events", "/upcoming-events"],
    ["/events/rfg-nova", "/upcoming-events/rfg-nova"],
    ["/imprint", "/impressum"],
    ["/privacy", "/datenschutz"],
  ]);
  const previewRoutes = new Map(
    canonicalRoutes.map((route) => [
      route.path,
      route.path === "/"
        ? path.join(outputDirectory, "index.html")
        : path.join(outputDirectory, route.path.slice(1), "index.html"),
    ]),
  );

  async function serveNotFound(response: ServerResponse, method: string) {
    const html = await readFile(path.join(outputDirectory, "404.html"), "utf8");
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(method === "HEAD" ? undefined : html);
  }

  async function serveStaticRequest(
    request: IncomingMessage,
    response: ServerResponse,
    next: () => void,
    includeRedirects: boolean,
  ) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      next();
      return;
    }

    const pathname = new URL(request.url ?? "/", "http://localhost").pathname.replace(/\/+$/, "") || "/";
    const redirectTarget = includeRedirects ? previewRedirects.get(pathname) : undefined;

    if (redirectTarget) {
      response.statusCode = 308;
      response.setHeader("Location", redirectTarget);
      response.end();
      return;
    }

    const routeFile = previewRoutes.get(pathname);
    if (routeFile) {
      const html = await readFile(routeFile, "utf8");
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html; charset=utf-8");
      response.end(request.method === "HEAD" ? undefined : html);
      return;
    }

    if (path.extname(pathname)) {
      const candidate = path.resolve(outputDirectory, `.${pathname}`);
      const isInsideOutput = candidate.startsWith(`${outputDirectory}${path.sep}`);

      if (isInsideOutput) {
        try {
          if ((await stat(candidate)).isFile()) {
            const body = await readFile(candidate);
            response.statusCode = 200;
            response.setHeader(
              "Content-Type",
              staticContentTypes[path.extname(candidate).toLowerCase()] ?? "application/octet-stream",
            );
            response.end(request.method === "HEAD" ? undefined : body);
            return;
          }
        } catch {
          // The explicit 404 below handles nonexistent build assets.
        }
      }
    }

    await serveNotFound(response, request.method);
  }

  return {
    name: "rave-for-good-static-route-output",
    enforce: "post" as const,
    configureServer(server: ViteDevServer) {
      if (process.env.RFG_VERCEL_LOCAL === "1") {
        server.middlewares.use((request, response, next) =>
          serveStaticRequest(request, response, next, false),
        );
      }
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use((request, response, next) =>
        serveStaticRequest(request, response, next, true),
      );
    },
    async closeBundle() {
      const sourceTemplate = await readFile(path.join(outputDirectory, "index.html"), "utf8");

      for (const route of canonicalRoutes) {
        const html = injectRouteHead(sourceTemplate, route);
        const destination = route.path === "/"
          ? path.join(outputDirectory, "index.html")
          : path.join(outputDirectory, route.path.slice(1), "index.html");
        await mkdir(path.dirname(destination), { recursive: true });
        await writeFile(destination, html, "utf8");
      }

      const notFoundRoute = {
        path: "/404",
        title: "Page Not Found | Rave for Good",
        description: "The requested Rave for Good page could not be found.",
        lang: "en" as const,
        indexable: false,
      };
      await writeFile(
        path.join(outputDirectory, "404.html"),
        injectRouteHead(sourceTemplate, notFoundRoute, false),
        "utf8",
      );

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...canonicalRoutes
          .filter((route) => route.indexable)
          .map((route) => `  <url><loc>${escapeHtml(absoluteUrl(route.path))}</loc></url>`),
        "</urlset>",
        "",
      ].join("\n");
      await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap, "utf8");
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    staticRouteOutputPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: outputDirectory,
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
