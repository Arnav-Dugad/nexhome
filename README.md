# NEXHOME

**Intelligence, beautifully integrated.** A pre-launch smart-home concept website, designed with India in mind.

Live: https://nexhome.pages.dev  
Source: https://github.com/Arnav-Dugad/nexhome

NEXHOME and its five devices are concepts in development. Images do not show manufactured prototypes. Specifications, features, and INR prices are provisional targets. There are no purchases, reservations, certifications, customer claims, or invented company credentials.

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
npx playwright install chromium
npm test
```

The production preview resolves the generated static routes and returns the actual 404 page. Development uses Vite's fallback routing. The production build creates 21 static pages, including a 404 page, and a sitemap and robots file. Override `SITE_URL` when building for a different canonical origin.

## Pages and interactions

Home, product catalog, Core / Sense / Light / Control / Air product pages, Intelligence, Design, Our Story, Journal with four articles, Early Access, Contact, Privacy, Terms, Cookies, and 404.

Catalog filters, selectable comparisons, finish exploration, on-demand rotatable Three.js models with keyboard controls, fullscreen native-dialog galleries, FAQs, a six-scene browser simulator, lighting controls, mobile navigation with focus management, reduced-motion support, and persistent light/dark theme.

## Architecture

- React 19, TypeScript strict mode, Vite 8, Motion, Lucide, Three.js. Stable installed versions are pinned in the manifest and lockfile.
- `src/data.ts`: product concepts, articles, routes, metadata.
- `src/App.tsx`: page compositions and content.
- `src/components`: shared UI, simulated routines, lazy 3D renderer.
- `src/tokens.css` and `src/styles.css`: design system and responsive layouts.
- `scripts/prerender.mjs`: React server rendering, canonical metadata, sitemap, robots, 404.
- `public/images`: optimized local WebP assets at 640 and 1280 pixels.
- `assets/source`: original AI PNGs and procedural-render PNGs; not deployed.
- `functions/api`: genuine Cloudflare Pages Functions for signup availability and optional future storage.
- `migrations`: optional D1 schema; no database has been provisioned.
- `tests`: Playwright interaction, route, image, responsive, keyboard, and axe accessibility checks.

No private browser credentials, analytics, remote images, or paid runtime APIs. Three.js loads only when requested and renders on interaction rather than continuously.

## Registration and contact

**Signup is unavailable at the owner's request. No public email is published.** `/api/status` returns `signups: false`. No D1 database, mailing service, payment system, or reservation system is active. Contact downloads a browser-local inquiry draft and explicitly says it is not sent.

The optional signup handler has same-origin checks, payload limits, normalization, explicit consent, unique emails, honeypot protection, and atomic per-minute throttling using daily IP hashes. It remains disabled unless a D1 binding, `SIGNUPS_ENABLED=true`, and `PUBLIC_CONTACT_EMAIL` are present. Before enabling, publish a verified data operator and request channel, finalize retention, update disclosures, test end to end, and add stronger challenge protection as needed.

## Deployment

Cloudflare Pages project: `nexhome`. Production branch: `main`. Build command: `npm run build`. Output: `dist`. Node: 24. Native GitHub integration builds changes pushed to `main`.

```sh
git push origin main
```

Authorized manual deployment to the existing project:

```sh
npx wrangler login
npm run build
npm run deploy
```

See Cloudflare's [Git integration documentation](https://developers.cloudflare.com/pages/configuration/git-integration/) and [Direct Upload guide](https://developers.cloudflare.com/pages/get-started/direct-upload/). Never commit OAuth tokens or API keys. Wrangler configuration contains no secrets.

## Assets and licenses

Eight original AI concept images: five product beauty images, family lineup, Core material macro, Control lifestyle. Twenty-five secondary views come from original procedural Three.js models (rear, macro, studio, lifestyle, exploded). Models are simplified design studies and may differ from beauty images; internals and ports are illustrative.

AI output is supplied as concept artwork without asserting exclusive copyright or trademark rights. No stock products, real prototypes, team portraits, or press logos are misrepresented. Software code is MIT licensed. Inter is SIL Open Font License 1.1, included in the repository. Dependencies retain their upstream licenses. See `LICENSE` and `THIRD_PARTY_NOTICES.md`.

## Verification

See `docs/verification.md` for measurements and limitations. Scores describe one test run, not guarantees for every device or future deployment.
