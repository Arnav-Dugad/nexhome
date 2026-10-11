# Verification

## Profectus360 update — 11 October 2026

- Rebranded public content, metadata, navigation, favicon, download filenames, and theme storage. Existing repository and hosting URLs are preserved.
- Express interest records anonymous product selections in a dedicated Cloudflare D1 database. Product links preselect a concept. Email signup stays disabled; no public email is published.
- Strict TypeScript build and ESLint pass. Wrangler-generated temporary files are excluded from linting.
- Eight API checks pass, using real SQLite for interest persistence, retry deduplication, retention, and rate limiting. Invalid origins, payloads, product IDs, consent, and honeypots are rejected. Storage failures do not report success.
- All ten browser checks pass across the final runs against Cloudflare's local Pages runtime and local D1. These cover public routes and images, seven responsive widths, existing interactions, local contact download, disabled email signup, and the new interest flow from product preselection through validation, an unavailable response, recovery, and confirmed storage.
- Axe audits pass on all twenty public routes in both light and dark themes. The forty-page audit has a 180-second allowance to accommodate a busy development machine; the final audit completed in 22 seconds.
- Desktop and mobile hero and interest-page screenshots reviewed. Initial JavaScript remains approximately 90 kB gzip; 3D is still loaded on demand.
- The production interest schema has been applied. Live publication and verification are performed after pushing the release commit.

## Original release — 10 October 2026

Tested on 10 October 2026 with Node 24.16.0, Playwright Chromium 156, and Lighthouse 13.5.0.

## Local production build

- TypeScript strict checks and ESLint pass, including Pages Functions.
- Static build emits 21 routes, including an actual 404 page.
- Browser suites cover every public route, image loading, metadata, internal links, all product galleries, fullscreen dialog dismissal, FAQs, finish selection, keyboard rotation, catalog filters, comparison, six simulated routines, brightness controls, mobile navigation, theme persistence, contact download, disabled signup, reduced motion, and keyboard skip link.
- Layout checks cover 320, 375, 390, 768, 1024, 1440, and 1920 pixels on home, catalog, product, intelligence, early-access, and contact pages.
- Axe WCAG A/AA automated audits pass on every public route in both themes. Automated audits are not a full manual accessibility certification.
- Four API contract tests cover disabled storage, cross-origin rejection, email/consent/payload/content-type validation, and honeypot handling.
- Screenshots captured and reviewed for desktop and mobile hero, catalog, product, and intelligence pages. Screenshot artifacts and traces are intentionally ignored by Git.

## Lighthouse

Local homepage, mobile simulation, compressed production-style static delivery:

| Category       | Score |
| -------------- | ----: |
| Performance    |    90 |
| Accessibility  |   100 |
| Best Practices |   100 |
| SEO            |   100 |

Measured FCP: 1.5 s; LCP: 3.6 s; total blocking time: 0 ms; CLS: 0. Measurements vary with network, host load, and browser version. These are lab measurements, not real-user Core Web Vitals.

## Verified Cloudflare deployment

Live: https://nexhome.pages.dev  
Repository: https://github.com/Arnav-Dugad/nexhome  
Project: `nexhome`; branch: `main`; build: `npm run build`; output: `dist`; configured Node major: 24 (observed build runtime 24.13.1).

Cloudflare deployment history confirms `github:push` triggers, cloning the exact pushed commit, a successful build, Functions compilation, and asset publication. Multiple subsequent pushes triggered successful rebuilds. Public routes and images load, unknown routes return HTTP 404, `/api/status` returns HTTP 200 with `signups: false`, and `/api/signup` returns HTTP 503 without saving data. Security headers and the hash-authorized inline theme initializer were verified live with no console errors during normal page loading.

All nine Playwright suites passed locally and against the live deployment. All four API contract tests passed locally. A final reduced-motion check also passed after disabling scroll-linked animations for that preference.

Final optimized production homepage, mobile Lighthouse:

| Category       | Score |
| -------------- | ----: |
| Performance    |    91 |
| Accessibility  |   100 |
| Best Practices |   100 |
| SEO            |   100 |

Production FCP: 1.7 s; LCP: 3.4 s; TBT: 0 ms; CLS: 0. Initial JavaScript is ~90 kB gzip; 3D remains an on-demand chunk. Lab scores vary and are not field performance guarantees.

## Product and service limitations

- Hardware and software capabilities are concept targets, not verified product behavior.
- AI beauty images and simplified procedural 3D studies share a design direction but are not identical engineering models. Exploded internals and ports are illustrative.
- Email signup remains disabled at the owner's request. Anonymous interest uses a dedicated D1 instance; no email service, payment system, public email, or reservation system is active.
- Contact drafts download locally and are not sent.
- The 3D viewer is an optional lazy chunk (~141 kB gzip). It requires WebGL and offers image galleries when unavailable.
- No claims are made about manufactured devices, certifications, energy savings, customers, company registration, or release dates.
