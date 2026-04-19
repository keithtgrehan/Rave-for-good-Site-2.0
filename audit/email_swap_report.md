# Email Swap Report

## Summary of outcome
- All repo occurrences of the previous contact address in the deployed repo were replaced with `info@raveforgood.berlin`.
- Visible email text and functional `mailto:` links were both updated where applicable.
- The deployed repo now has zero remaining occurrences of the old email address.

## Validation results
- `pnpm install`
- `pnpm --filter @workspace/rave-for-good typecheck`
- `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rave-for-good build`
- Repo-wide zero-occurrence check for the previous contact address

## Exact files ready to commit
- `artifacts/rave-for-good/src/pages/contact.tsx`
- `artifacts/rave-for-good/src/components/layout/Footer.tsx`
- `artifacts/rave-for-good/src/components/hubspot/HubSpotFormEmbed.tsx`
- `audit/live_repo_fix_audit.md`
- `audit/email_swap_audit.md`
- `audit/email_swap_report.md`
