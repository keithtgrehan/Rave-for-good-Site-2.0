# Email Swap Audit

## Files inspected
- `artifacts/rave-for-good/src/pages/contact.tsx`
- `artifacts/rave-for-good/src/components/layout/Footer.tsx`
- `artifacts/rave-for-good/src/components/hubspot/HubSpotFormEmbed.tsx`
- `artifacts/rave-for-good/src/pages/about.tsx`
- `artifacts/rave-for-good/src/pages/events.tsx`
- `artifacts/rave-for-good/src/pages/get-involved.tsx`
- `artifacts/rave-for-good/src/pages/home.tsx`
- `artifacts/rave-for-good/src/pages/impact.tsx`
- `artifacts/rave-for-good/src/pages/not-found.tsx`
- `artifacts/rave-for-good/src/pages/partners.tsx`
- `audit/live_repo_fix_audit.md`

## Files changed
- `artifacts/rave-for-good/src/pages/contact.tsx`
- `artifacts/rave-for-good/src/components/layout/Footer.tsx`
- `artifacts/rave-for-good/src/components/hubspot/HubSpotFormEmbed.tsx`
- `audit/live_repo_fix_audit.md`
- `audit/email_swap_audit.md`
- `audit/email_swap_report.md`

## Centralized or repeated
- The contact email is repeated, not centralized.
- In this repo it appeared in direct page/component markup and in one audit document.
- No shared email constant or config source was present for a single-point update.

## Exact locations updated
- `artifacts/rave-for-good/src/pages/contact.tsx`
  - visible email text updated to `info@raveforgood.berlin`
  - `mailto:` link updated to `mailto:info@raveforgood.berlin`
- `artifacts/rave-for-good/src/components/layout/Footer.tsx`
  - footer email icon link updated to `mailto:info@raveforgood.berlin`
- `artifacts/rave-for-good/src/components/hubspot/HubSpotFormEmbed.tsx`
  - fallback helper copy updated to `info@raveforgood.berlin`
- `audit/live_repo_fix_audit.md`
  - prior repo-fix audit updated so no old email remains anywhere in the repo

## Legal pages / metadata check
- No `/impressum` or `/privacy` page source files exist in this deployed repo.
- No additional metadata or centralized config references to the previous contact address were found.

## Zero-occurrence confirmation
- Repo-wide search for the previous contact address returns zero results after the change.
