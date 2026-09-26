# AGENTS.md — gymweb (Royal Fitness World)

Zero-build static site. No `package.json`, no bundler, no tests, no CI. Open HTML directly or serve statically.

## Run
- No install/build step. Preview with any static server, e.g. `python -m http.server` in repo root, then open `index.html` / `portal.html`.
- `type="module"` scripts prefer `http://` over `file://` (module CORS).

## Structure (all live code)
- `index.html` → landing page. Loads `css/base.css` + `css/landing.css`, `js/landing.js` only.
- `portal.html` → member app (Dashboard / Workout / Body Metrics / Live Session / Profile screens switched via `data-screen` / `data-back`). Loads `css/base.css` + `css/portal.css`, `js/portal.js` + `js/bg.js`.
- `reference.html` → static design mock (3 phone mockups). Not linked from nav; do not wire app logic into it.
- `css/base.css` = shared tokens/utilities; `landing.css` / `portal.css` are page-specific.
- `js/bg.js` = canvas dotted-glow background (`#bg-canvas`, auto-injected). Loaded by `portal.html` only.
- `js/data.js`, `js/storage.js`, `js/icons.js` are **unused ES modules** (exported but imported by nothing). Live logic lives self-contained in `landing.js` / `portal.js` — edit those, not the unused modules.

## Gotchas
- Image filenames contain spaces and typos (`images/dumbell rack.png`, `deadkift.png`, `gyminteriar.png`). Keep exact names; quote paths.
- `portal.js` persists to `localStorage` key `rfw_portal` (falls back to reading legacy `axion_portal`). Reset via Profile → Clear All Data.
- `landing.js` `renderFacilities()` / `renderReviews()` / `initHeroPrompt()` target IDs (`facilitiesGrid`, `reviewsGrid`, `heroInput`…) that don't exist in current `index.html` — they no-op via guards. Landing content = `GymData.programs` (first 3 rendered) + `GymData.plans`; pricing toggle just re-renders monthly/annual.
- Trial modal (`#trialModal` openers `heroClaimBtn`, `openTrialBtn3`; others in the opener list are absent and guarded) is front-end only — submit shows an in-memory confirmation, no backend/`saveLead` call.
- Convention: inline SVG icons only, no emojis (see headers in `landing.js` / `portal.js`).
