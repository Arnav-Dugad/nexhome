# Profectus360

**Intelligence, beautifully integrated.** A pre-launch smart-home concept website, designed with India in mind.

Live: https://profectus360.pages.dev

Source: https://github.com/Arnav-Dugad/profectus360

Profectus360 and its five devices are concepts in development. Images do not show manufactured prototypes. Specifications, features, and INR prices are provisional targets. There are no purchases, reservations, certifications, customer claims, or invented company credentials.

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
npx wrangler d1 migrations apply profectus360-interest --local
npx wrangler pages dev dist --port 4173
```

With the Cloudflare preview running, use a second terminal for browser checks:

```sh
npx playwright install chromium
npm test
```

The Cloudflare preview serves generated pages and the working API with local D1 storage. `npm run preview` offers a static-only preview. Development uses Vite's fallback routing. The production build creates 21 static pages, including a 404 page, and a sitemap and robots file. Override `SITE_URL` when building for a different canonical origin.

## Pages and interactions

Home, product catalog, Core / Sense / Light / Control / Air product pages, Intelligence, Design, Our Story, Journal with four articles, Express Interest, Contact, Privacy, Terms, Cookies, and 404.

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
- `functions/api`: Cloudflare Pages Functions for anonymous product interest, status, and disabled email signup.
- `migrations`: anonymous product-interest D1 schema and a separate, inactive email-signup schema.
- `tests`: Playwright interaction, route, image, responsive, keyboard, and axe accessibility checks.

No private browser credentials, analytics, remote images, or paid runtime APIs. Three.js loads only when requested and renders on interaction rather than continuously.

## Registration and contact

**Email signup remains unavailable. Public support and privacy contact: support@profectus360.in.** Express interest is a working anonymous feedback form: visitors choose product concepts and consent to saving their choices. Cloudflare Pages Functions persist choices, a random retry receipt, consent version, and timestamp in the dedicated `profectus360-interest` D1 database. No names, emails, free-text messages, or persistent browser IDs are collected. Product-page buttons preselect that product.

The handler validates same-origin JSON requests and allowed products, limits payloads, rejects honeypots, and applies atomic rate limiting using short-lived daily IP hashes kept separately from choices. Retries use one receipt to avoid duplicate records. Preference records older than 180 days and rate-limit entries older than one hour are deleted on subsequent submissions. This is anonymous feedback, with no subscription, payment, or reservation. Contact offers a mail-app draft addressed to support@profectus360.in and a browser-local download. Visitors review and send emails in their own mail app; the website does not transmit inquiry text.

For the complete local form-to-database flow:

```sh
npx wrangler d1 migrations apply profectus360-interest --local
npm run build
npx wrangler pages dev dist --port 4173
```

`npm run preview` serves static pages only; interest submission returns an explicit unavailable response. The automated API suite exercises the handler with SQLite, and browser tests cover form validation, product preselection, failure recovery, and confirmed success.

Before production deployment, apply new migrations with `npx wrangler d1 migrations apply profectus360-interest --remote`. Anonymous choices can be reviewed through the Cloudflare D1 console; no public read endpoint exposes submissions.

The separate, inactive email-signup handler has same-origin checks, payload limits, normalization, explicit consent, unique emails, honeypot protection, and atomic per-minute throttling using daily IP hashes. It remains disabled unless a D1 binding, `SIGNUPS_ENABLED=true`, and `PUBLIC_CONTACT_EMAIL` are present. Before enabling, publish a verified data operator and request channel, finalize retention, update disclosures, test end to end, and add stronger challenge protection as needed.

## Deployment

The GitHub repository and production Cloudflare Pages project are named `profectus360`. The project uses the matching `profectus360.pages.dev` address and the existing interest database. The original host redirects to the new address through the `profectus360-legacy` project; its redirect source is in `deploy/legacy-redirect`, and automatic Git builds are disabled there. Cloudflare Pages project: `profectus360`. Production branch: `main`. Build command: `npm run build`. Output: `dist`. Node: 24. Native GitHub integration builds changes pushed to `main`.

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
