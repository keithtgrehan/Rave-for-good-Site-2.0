# Live Repo Fix Report

## Summary of outcome
- The real deployed repo at `~/GitHub/Rave-for-good-Site-2.0` was audited and updated directly.
- `/get-involved` now has a working PayPal Donate CTA that opens in a new tab and preset amount buttons that populate the custom amount input.
- `/about` now shows more of the team photo with less aggressive cropping, and the remaining placeholder team-member block has been removed.
- The footer Instagram and email icon links now point to the requested destinations in the actual deployed repo.

## Validation results
- `pnpm install`: passed
- `pnpm --filter @workspace/rave-for-good typecheck`: passed
- `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build`: passed
- Build output verified in `artifacts/rave-for-good/dist`, including:
  - `artifacts/rave-for-good/dist/index.html`
  - `artifacts/rave-for-good/dist/assets/index-_7HSn5I-.css`
  - `artifacts/rave-for-good/dist/assets/index-BrP3v6Xv.js`
- `git status --short` shows the intended tracked changes in this repo:
  - `artifacts/rave-for-good/src/components/layout/Footer.tsx`
  - `artifacts/rave-for-good/src/pages/about.tsx`
  - `artifacts/rave-for-good/src/pages/get-involved.tsx`
  - `audit/live_repo_fix_audit.md`
  - `audit/live_repo_fix_report.md`

## Exact files to commit
- `artifacts/rave-for-good/src/pages/get-involved.tsx`
- `artifacts/rave-for-good/src/pages/about.tsx`
- `artifacts/rave-for-good/src/components/layout/Footer.tsx`
- `audit/live_repo_fix_audit.md`
- `audit/live_repo_fix_report.md`

## Notes
- The root cause was a repo mismatch: previous edits landed in a different non-deployed worktree and did not affect the GitHub/Vercel-connected repo.
- In this deployed repo, the live issue sources were local page/component files rather than a shared content config.
- During validation, the local environment was missing optional native `rollup` and `lightningcss` links inside `node_modules`. Those were repaired locally in `node_modules` only so the required build could complete, without changing tracked package manifests.
