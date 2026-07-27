# Rave for Good Site 2.0

Production website for **Rave for Good e.V.** — a Vite + React + TypeScript single-page site for the association and collective, events, partners, impact reporting, and contact/donation flows.

Repository: `https://github.com/keithtgrehan/Rave-for-good-Site-2.0`

---

## 1. What this project is

This repo contains the rebuilt Rave for Good website. The active site lives in:

```txt
artifacts/rave-for-good
```

It is a static React app built with Vite. Routing is handled client-side with `wouter`. Styling is handled with Tailwind CSS, CSS variables, and shadcn/Radix-style UI primitives.

The production build outputs static files to:

```txt
artifacts/rave-for-good/dist
```

---

## 2. Tech stack

| Layer | Tool |
|---|---|
| App framework | React |
| Language | TypeScript |
| Build tool | Vite |
| Routing | wouter |
| Styling | Tailwind CSS + CSS variables |
| UI primitives | shadcn-style components + Radix UI |
| Icons | lucide-react |
| Animation | framer-motion |
| Package manager | pnpm |
| Hosting target | Static hosting / Replit / Vercel-style deploy |

---

## 3. Requirements

Recommended:

```bash
node --version   # Node 20+
pnpm --version   # pnpm 9+
```

If `pnpm` is missing:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

## 4. Local setup

```bash
git clone https://github.com/keithtgrehan/Rave-for-good-Site-2.0.git
cd Rave-for-good-Site-2.0
pnpm install
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good dev
```

Open:

```txt
http://localhost:3000
```

---

## 5. Main commands

From the repo root:

```bash
# Install dependencies
pnpm install

# Run local dev server
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good dev

# Type-check all workspace packages
pnpm run typecheck

# Type-check only the website
pnpm --filter @workspace/rave-for-good typecheck

# Build production files
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build

# Preview production build locally
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good serve
```

Successful production build output:

```txt
artifacts/rave-for-good/dist
```

---

## 6. Project structure

```txt
.
├── artifacts/
│   └── rave-for-good/
│       ├── public/
│       │   ├── favicon.svg
│       │   ├── opengraph.jpg
│       │   └── images/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   ├── index.css
│       │   ├── pages/
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   │   ├── Header.tsx
│       │   │   │   ├── Footer.tsx
│       │   │   │   └── Layout.tsx
│       │   │   └── ui/
│       │   ├── data/
│       │   │   ├── events.ts
│       │   │   ├── event-localizations.ts
│       │   │   ├── governance.ts
│       │   │   ├── impact.ts
│       │   │   ├── partners.ts
│       │   │   ├── route-manifest.ts
│       │   │   ├── site.ts
│       │   │   └── transparency.ts
│       │   ├── hooks/
│       │   └── lib/
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── components.json
├── audit/
├── config/
├── lib/
├── scripts/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── replit.md
```

---

## 7. How the site is built

| File | Purpose |
|---|---|
| `artifacts/rave-for-good/src/main.tsx` | Mounts the React app. |
| `artifacts/rave-for-good/src/App.tsx` | Defines layout, providers, and routes. |
| `artifacts/rave-for-good/src/index.css` | Global styles, Tailwind imports, theme tokens, responsive styling. |

Routes live in:

```txt
artifacts/rave-for-good/src/App.tsx
```

Typical route pattern:

```tsx
<Route path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/upcoming-events" component={UpcomingEvents} />
<Route path="/impact" component={Impact} />
<Route path="/partners" component={Partners} />
<Route path="/get-involved" component={GetInvolved} />
<Route path="/contact" component={Contact} />
<Route component={NotFound} />
```

To add a page:

1. Create `src/pages/new-page.tsx`.
2. Import it in `src/App.tsx`.
3. Add a route.
4. Add canonical metadata in `src/data/route-manifest.ts`.
5. Add links in `Header.tsx` and/or `Footer.tsx`.
6. Run typecheck and build.

---

## 8. Key files to edit

| Change needed | File |
|---|---|
| Homepage content | `artifacts/rave-for-good/src/pages/home.tsx` |
| About page | `artifacts/rave-for-good/src/pages/about.tsx` |
| Events | `artifacts/rave-for-good/src/data/events.ts` |
| Impact projects and evidence | `artifacts/rave-for-good/src/data/impact.ts` |
| Partners | `artifacts/rave-for-good/src/data/partners.ts` |
| Governance | `artifacts/rave-for-good/src/data/governance.ts` |
| Contact page | `artifacts/rave-for-good/src/pages/contact.tsx` |
| Header/nav/mobile menu | `artifacts/rave-for-good/src/components/layout/Header.tsx` |
| Footer | `artifacts/rave-for-good/src/components/layout/Footer.tsx` |
| Global styles/colors | `artifacts/rave-for-good/src/index.css` |
| Images | `artifacts/rave-for-good/public/images/` |
| Vite config | `artifacts/rave-for-good/vite.config.ts` |
| Replit artifact config | `artifacts/rave-for-good/.replit-artifact/artifact.toml` |

---

## 9. Static data schemas

There is no database. The site uses static TypeScript data.

### `src/data/events.ts`

```ts
type Event = {
  id: string;
  title: string;
  date: string;          // YYYY-MM-DD
  endDate?: string;      // YYYY-MM-DD for a multi-day event with no exact end time
  endsAt?: string;       // ISO timestamp when a precise end is known
  venue?: string;
  city: string;
  description: string;
  image: string;         // e.g. "/images/event-1.png"
  imageAlt?: string;
  imageCredit?: string;
  durationHours?: number;
  musicProgramme?: {
    throughout: boolean;
    includesDjs: boolean;
  };
  volunteerCount?: number;
};
```

### `src/data/impact.ts`

```ts
type ImpactProject = {
  id: string;
  eventId?: string;      // References central event facts when the project is an event
  status: "completed" | "active" | "planned";
  beneficiaries?: string;
  deliveryOrganisations?: string[];
  costs?: string;
  funding?: string;
  outcomes?: string[];
  evidence: Array<{ title: string; href: string }>;
};
```

### `src/data/partners.ts`

```ts
type ConfirmedPartner = {
  id: string;
  name: string;
  role: string;
  website?: string;
  logo?: string;
  verifiedInWriting: true;
};
```

### `src/data/governance.ts`

```ts
type CommitteeMember = {
  id: string;
  fullName: string;
  role: string;
  verified: true;
};
```

Only add committee and partner records after verification. Route titles, descriptions,
canonicals, language alternates and sitemap membership live in
`src/data/route-manifest.ts`.

---

## 10. Safe editing workflow

```bash
git checkout main
git pull origin main
git checkout -b fix/short-description
```

Validate:

```bash
pnpm install
pnpm --filter @workspace/rave-for-good typecheck
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build
```

Commit:

```bash
git status --short
git add artifacts/rave-for-good README.md
git commit -m "Update website content and documentation"
git push -u origin fix/short-description
```

Open a pull request into `main`.

---

## 11. Common edits

### Add or update an event

Edit:

```txt
artifacts/rave-for-good/src/data/events.ts
```

Rules:

- Use a unique `id`.
- Use date format `YYYY-MM-DD`.
- Event status is derived in Europe/Berlin from `date`, optional date-only `endDate`, and optional `endsAt`; do not store it manually.
- Add `endsAt` when a precise event end is confirmed. Date-only events remain upcoming throughout their Berlin calendar date.
- Add `endDate` for multi-day events whose final date is known but exact end time is not.
- Store event images in `public/images/`.

### Replace an image

Put the image in:

```txt
artifacts/rave-for-good/public/images/
```

Reference it as:

```ts
image: "/images/file-name.png"
```

Do not reference local desktop paths.

### Change navigation

Edit:

```txt
artifacts/rave-for-good/src/components/layout/Header.tsx
```

Check footer links too:

```txt
artifacts/rave-for-good/src/components/layout/Footer.tsx
```

### Change colors

Edit:

```txt
artifacts/rave-for-good/src/index.css
```

Prefer CSS variables/design tokens over hardcoded one-off colors.

---

## 12. Environment variables

Required:

```bash
PORT=3000
BASE_PATH=/
```

Examples:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good dev
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build
```

If deploying under a subpath, set `BASE_PATH` accordingly.

---

## 13. Deployment

Build command:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build
```

Publish directory:

```txt
artifacts/rave-for-good/dist
```

The build emits an HTML entry for every canonical route plus a no-index `404.html`, `robots.txt`, and `sitemap.xml`. Preserve those files when configuring static hosting.

### Replit artifact config

```txt
artifacts/rave-for-good/.replit-artifact/artifact.toml
```

Expected values:

```toml
kind = "web"
previewPath = "/"
router = "path"
publicDir = "artifacts/rave-for-good/dist"
```

---

## 14. Files not to edit manually

Avoid manual edits to:

```txt
node_modules/
dist/
```

Only commit `pnpm-lock.yaml` when dependencies intentionally change.

Do not commit:

```txt
.env
.DS_Store
*.log
```

---

## 15. Publish checklist

Run:

```bash
pnpm install
pnpm run typecheck
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build
```

Manual checks:

- Homepage loads.
- Desktop nav works.
- Mobile menu opens/closes cleanly.
- Footer links work.
- `/about`, `/upcoming-events`, `/impact`, `/partners`, `/get-involved`, `/contact` load directly.
- Images are not broken.
- Event links are real.
- Legal pages are reviewed before publishing.
- Contact/donation links are correct.
- Social preview image works.

---

## 16. AI/Codex/Replit editing rules

Use this instruction when handing the repo to Codex or Replit Agent:

```txt
Work only inside artifacts/rave-for-good unless explicitly instructed otherwise.
Do not rewrite unrelated pages.
Do not change routes, copy, images, or legal text unless requested.
Do not touch node_modules or dist.
Preserve existing design tokens and responsive behavior.
After changes, run:
- pnpm --filter @workspace/rave-for-good typecheck
- PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build
Report changed files and validation results.
```

---

## 17. Troubleshooting

### `PORT environment variable is required`

Use:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good dev
```

### `BASE_PATH environment variable is required`

Use:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build
```

### Refresh gives 404 in production

Do not add a catch-all rewrite to `/index.html`; it would hide real 404 responses and route-specific initial metadata. Build the site and confirm the host publishes this directory unchanged:

```txt
artifacts/rave-for-good/dist
```

The Vite build creates one `index.html` inside every canonical route directory and an
explicit `404.html`. Configure the host to serve directory indexes, preserve the four
redirects in `vercel.json`, and use `404.html` with HTTP 404 for unknown paths.

### Images do not load

Check location:

```txt
artifacts/rave-for-good/public/images/
```

Check reference path:

```txt
/images/file-name.png
```

### TypeScript alias fails

Check:

```txt
artifacts/rave-for-good/tsconfig.json
artifacts/rave-for-good/vite.config.ts
```

Both should support `@/` pointing to `src/`.

---

## 18. Current status

The site is a static React/Vite app with a clear content/data split.

Most regular edits happen in:

```txt
src/pages/
src/data/
src/components/layout/
src/index.css
public/images/
```

Always typecheck and build before publishing.
