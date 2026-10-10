# Verification

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

| Category | Score |
| --- | ---: |
| Performance | 90 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Measured FCP: 1.5 s; LCP: 3.6 s; total blocking time: 0 ms; CLS: 0. Measurements vary with network, host load, and browser version. These are lab measurements, not real-user Core Web Vitals.

## Product and service limitations

- Hardware and software capabilities are concept targets, not verified product behavior.
- AI beauty images and simplified procedural 3D studies share a design direction but are not identical engineering models. Exploded internals and ports are illustrative.
- Signup remains disabled at the owner's request. No email service, D1 instance, payment system, public email, or reservation system is active.
- Contact drafts download locally and are not sent.
- The 3D viewer is an optional lazy chunk (~141 kB gzip). It requires WebGL and offers image galleries when unavailable.
- No claims are made about manufactured devices, certifications, energy savings, customers, company registration, or release dates.
