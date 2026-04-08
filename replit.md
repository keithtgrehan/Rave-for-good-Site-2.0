# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the "Rave for Good" NGO website — a Berlin-based organisation that fundraises through electronic music events for humanitarian impact (clean water projects in Burkina Faso).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Rave for Good Website (`artifacts/rave-for-good`)
- **Type**: React + Vite frontend-only SPA
- **Preview path**: `/` (root)
- **Tech**: React, Vite, Tailwind CSS, Framer Motion, wouter
- **Pages**: Home, About, Events, Impact, Partners, Get Involved, Contact
- **Design**: Dark Berlin nightlife aesthetic with acid green (#B8FF57) accent, Space Grotesk display font
- **Content**: Structured data files in `src/data/` (events.ts, impact.ts, team.ts, partners.ts)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/rave-for-good run dev` — run the website locally

## Design System

- **Colors**: Deep black base (#0A0A0A, #111111), Acid Green accent (#B8FF57), Off-white text (#F5F0EB)
- **Typography**: Space Grotesk (display/headers), Inter (body)
- **Motion**: Framer Motion scroll-triggered reveals, staggered card animations
- **Texture**: Noise/grain overlay for atmospheric depth

## Future Upgrades (from brief)
- Donations integration (Stripe or similar)
- CMS integration (Contentful, Sanity, or similar)
- Event sync (Resident Advisor API)
- Instagram feed embed
- Partner CRM
- Volunteer signup form backend

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
