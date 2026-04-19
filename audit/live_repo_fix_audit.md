# Live Repo Fix Audit

## Files inspected
- `artifacts/rave-for-good/src/App.tsx`
- `artifacts/rave-for-good/src/pages/get-involved.tsx`
- `artifacts/rave-for-good/src/pages/about.tsx`
- `artifacts/rave-for-good/src/components/layout/Footer.tsx`
- `artifacts/rave-for-good/src/data/team.ts`
- `artifacts/rave-for-good/src/components/ui/button.tsx`

## Files changed
- `artifacts/rave-for-good/src/pages/get-involved.tsx`
- `artifacts/rave-for-good/src/pages/about.tsx`
- `artifacts/rave-for-good/src/components/layout/Footer.tsx`
- `audit/live_repo_fix_audit.md`
- `audit/live_repo_fix_report.md`

## Source-of-truth paths

### `/get-involved`
- Route source: `artifacts/rave-for-good/src/App.tsx`
- Actual page source: `artifacts/rave-for-good/src/pages/get-involved.tsx`
- This repo does not alias `/get-involved` to another page. The live donate controls and Donate button are implemented directly in `get-involved.tsx`.

### `/about`
- Route source: `artifacts/rave-for-good/src/App.tsx`
- Actual page source: `artifacts/rave-for-good/src/pages/about.tsx`
- The team photo crop and the placeholder team-member block both come directly from `about.tsx`.

### Footer
- Actual footer source: `artifacts/rave-for-good/src/components/layout/Footer.tsx`
- In this repo, the Instagram and email footer links are hardcoded in the footer component itself.
- There is no `site-content.ts` footer link source in this codebase to override the footer.

## Why previous fixes missed the deployed repo
- The earlier fixes were applied in a different local worktree: `/Users/keith/Desktop/rave-for-good-local/source/artifacts/rave-for-good`
- That separate folder is not the GitHub/Vercel-connected repo used for deployment.
- This deployed repo has different route and data structure:
  - `/get-involved` here is its own page file, not a re-exported donate page
  - footer links here are hardcoded in `Footer.tsx`, not driven by a central `site-content.ts`
  - `/about` here still contained the placeholder team-member block and an aggressively cropped `object-cover` team image

## Exact fixes applied

### `artifacts/rave-for-good/src/pages/get-involved.tsx`
- Added local `useState` for the donation amount input.
- Wired `€10`, `€25`, and `€50` buttons to populate the custom amount input.
- Bound the custom amount input to the same state so manual entry still works.
- Converted the visible Donate CTA into the actual clickable PayPal link using:
  - `href="https://www.paypal.com/paypalme/RaveForGoodeV"`
  - `target="_blank"`
  - `rel="noopener noreferrer"`

### `artifacts/rave-for-good/src/pages/about.tsx`
- Changed the team photo container from `aspect-[3/4]` to `aspect-[4/3]`.
- Changed the image fit from `object-cover` to `object-contain object-center` to reduce cropping without distortion.
- Removed the `team` data import.
- Removed the placeholder team-member grid.
- Removed the team-member names paragraph under that grid so no placeholder/name block remains.

### `artifacts/rave-for-good/src/components/layout/Footer.tsx`
- Updated Instagram to:
  - `https://www.instagram.com/raveforgoodofficial/`
  - `target="_blank"`
  - `rel="noopener noreferrer"`
- Updated the email icon link to:
  - `mailto:info@raveforgood.berlin`
