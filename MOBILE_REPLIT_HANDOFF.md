# Mobile Replit Handoff

## Branch

- Current branch: `add-artists-page`
- Artists page implementation commit confirmed before this handoff file: `325880c66b903431ae50a1a70ebe95129dfda2a5`
- Remote status at handoff time: up to date with `origin/add-artists-page`

## App Root

- Use this as the Replit app root: `artifacts/rave-for-good`
- Do not run from the repository root when doing app QA or responsive fixes.

## Routes To Test

Test mobile responsiveness and browser behavior on these routes:

- `/`
- `/about`
- `/events`
- `/artists`
- `/impact`
- `/partners`
- `/get-involved`
- `/contact`

Primary QA target:

- `/artists`

## Artists Page Confirmation

The artists page exists on this branch.

Confirmed files:

- `artifacts/rave-for-good/src/pages/artists.tsx`
- `artifacts/rave-for-good/src/data/artists.ts`
- `artifacts/rave-for-good/src/App.tsx`
- `artifacts/rave-for-good/src/components/layout/Header.tsx`

`/artists` is registered in `src/App.tsx` and linked from `src/components/layout/Header.tsx` for both desktop and mobile navigation.

## Validation Results

Run from `artifacts/rave-for-good` unless noted otherwise.

- `pnpm install` - passed
- `pnpm typecheck` - passed
- `PORT=3000 BASE_PATH=/ pnpm build` - passed
- `git diff --check` from the repository root - passed

Build output summary:

- Vite built successfully.
- Output directory: `artifacts/rave-for-good/dist`

## SoundCloud Warning

Do not include unrelated SoundCloud homepage embed work in this QA/fix task.

At handoff time there are no uncommitted SoundCloud files in the worktree. The SoundCloud URLs in `artifacts/rave-for-good/src/data/artists.ts` are part of the artists page data and should not be confused with the separate homepage SoundCloud embed work from other branches.

## Replit Instructions

- Checkout `add-artists-page`.
- Use `artifacts/rave-for-good` as the app root.
- Start QA from `/artists`, then check the full route list above.
- Focus only on responsive/browser QA and mobile layout fixes from this branch/root.
- Do not merge `main`.
- Do not make broad styling rewrites.
- Do not touch unrelated SoundCloud homepage embed files or work.
