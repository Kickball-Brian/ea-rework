# Email Agency — Website Rework

React + Vite rebuild of **emailagency.com** (currently WordPress). Toolchain and
design system carried over from the LawLogic rework.

## Stack

- React 19 + React Router 7
- Vite 8
- GSAP + ScrollTrigger, Lenis (smooth scroll), Framer Motion (page transitions)
- Deploys to Netlify (`netlify.toml`)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Routes

| Path | Page | Legacy WordPress URL |
|---|---|---|
| `/` | Home (`LabPage` — new motion-forward build; some sections still lorem) | `/` |
| `/home` | `HomePage` — the earlier crimson/cream marketing home, kept for reference | — |
| `/about-us` | About Us | `/about-us/` |
| `/solutions` | Solutions | `/solutions/` |
| `/contact-us` | Contact Us | `/contact-us/` |
| `/privacy-policy` | Privacy Policy | `/privacy-policy/` |
| `/terms-conditions` | Terms & Conditions | `/terms-conditions/` |

`/lab` redirects to `/`. `LabPage` renders its own header/footer, so the shared
`Navbar`/`Footer` are suppressed on `/` — those in-page nav links are still
placeholders and need wiring before go-live.

Legacy trailing-slash slugs are 301-redirected in `netlify.toml`.

## Before go-live

See the pre-migration SEO checklist in project memory. Key open items:

- Confirm the Privacy Policy copy verbatim + resolve the effective date; migrate
  the full Terms & Conditions text (currently a placeholder).
- Replace placeholder brand assets: `public/favicon.svg`, `public/images/og-image.jpg`,
  and add a real Email Agency logo (nav/footer currently use a text logo).
- Wire analytics (`src/main.jsx`) and GTM (`index.html`) with Email Agency IDs.
- Confirm the Netlify contact form routes notifications to `info@emailagency.com`.
- Crawl the live site for any URLs not covered by the routes above and add 301s.
- Remove the `X-Robots-Tag: noindex` header block from `netlify.toml`.
