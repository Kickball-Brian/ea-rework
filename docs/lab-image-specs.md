# `/lab` — image specs

Every image slot on the `/lab` page (currently rendered as a `.ph` placeholder
block). Sizes are derived from the CSS in `src/styles/lab.css`; "rendered max" is
the largest the element gets on a wide desktop, "export" is the 2× retina target
to hand to production.

**General:**
- Format: **WebP** (JPEG fallback optional). Video slots: **MP4 (H.264) + WebM**, muted, looped.
- Colour: sRGB, quality ~80.
- Provide the **export** size; the browser scales down. Anything below "min" will look soft.
- All slots except the hero scatter are below the fold → keep `loading="lazy"`.
- Nothing here needs an alpha channel.

---

## 1. Hero — scatter field (`.lab-scatter-item .ph`)

Portrait **3:4**. Decorative, drift on scroll (parallax). 5 distinct images.

| # | class | rendered max (w×h) | min export | **export (2×)** |
|---|---|---|---|---|
| 1 | `.s1` | 230 × 307 | 230 × 307 | **460 × 614** |
| 2 | `.s2` | 260 × 347 | 260 × 347 | **520 × 694** |
| 3 | `.s3` | 320 × 427 | 320 × 427 | **640 × 854** |
| 4 | `.s4` | 200 × 267 | 200 × 267 | **400 × 534** |
| 5 | `.s5` | 230 × 307 | 230 × 307 | **460 × 614** |

Simplest: deliver all 5 at a single **720 × 960** (3:4) and let them scale. ~5 images.

---

## 2. About — feature media (`.lab-about-video .ph`)

**16:10** landscape, right column of the about row. Can be a still **or** a short
silent loop (the reference uses an autoplaying `.mov`).

| slot | rendered max | min export | **export (2×)** |
|---|---|---|---|
| about media | ~860 × 538 | 900 × 563 | **1600 × 1000** |

Video: 1600 × 1000, ≤ ~8 s loop, MP4 + WebM, no audio. 1 asset.

---

## 3. `ea-solutions` — panel images (`.ea-solutions-media img`) ✅

Pinned horizontal-scroll section — **6 panels, one per solution**. Each panel is
a 2-column layout: copy (number / title / paragraph) | image, portrait **4:5**,
`object-fit: cover`, subtle hover zoom.

**Provided** — `public/images/solutions/` at **1600 × 2000** webp:
`lead-generation`, `leadlogic`, `call-center-services`, `media-buys`,
`social-media-management`, `web-design`. Renders ~470–620 px wide on desktop, so
1600 × 2000 covers 2×. (`web-design.webp` is 924 KB — worth re-compressing.)

## 4. `ea-solutions` — thumbnail strip (`.ea-solutions-thumb img`) ✅

**1:1** square nav tiles, one per panel. **Provided** —
`public/images/solutions/<slug>-tn.webp` at **200 × 200**. Rendered ~46–82 px, so
200 covers 2×.

---

## 4b. `/solutions/:slug` — hero background (`.sol-hero-bg`) ⬜ new crop needed

Full-bleed parallax hero on each of the 6 solution detail pages
(`SolutionDetailPage.jsx`). Currently reuses the existing portrait
`<slug>.webp` (1600 × 2000, 4:5) via `object-fit: cover`, which works but
crops a portrait shot into a landscape frame — a purpose-cut **landscape**
image will look better.

**Container:** full viewport width, `min-height: 68vh`. The image is scaled to
`height: 132%` of that box and animated `-22% yPercent` on scroll for the
parallax (so the source needs the extra vertical bleed already baked in via
that 132% — no extra padding needed from you beyond exporting at the size below).

**Recommended export: 2400 × 1350 px (16:9), landscape, ≤ 400 KB WebP.**
- Covers desktop hero widths up to ~1800 CSS px at retina density, with the
  132%-scale parallax range included.
- Keep the main subject centered in the middle ~60% of the frame — on mobile
  the same image crops to a much narrower, taller slice (`min-height: 68vh`
  at phone width), so anything near the left/right edges will get cut off.
- Suggested filename: `public/images/solutions/<slug>-hero.webp` (keep the
  existing `<slug>.webp` and `<slug>-tn.webp` as-is — those still feed the
  `/solutions` overview cards and the homepage `ea-solutions` panels/thumbs).
  Send the word when the 6 are in and I'll swap `SolutionDetailPage.jsx` to
  point at the new files.

---

## 5. Team marquee (`<TeamSection>` — `.ts-member-img img`)

Portrait **4:5**, `object-fit: cover`, scales to ~1.09× on hover.
**Already provided** — 18 headshots in `public/images/team/` at **800 × 1000**,
which exceeds the retina target below. 1 member (Mark Muzzini) has no photo and
renders an initials tile.

| slot | rendered max (w×h) | min export | export (2×) | status |
|---|---|---|---|---|
| headshot | ~281 × 351 | 281 × 351 | 562 × 702 | ✅ have 800 × 1000 |

19 members (18 photos + 1 initials).

---

## 6. Optional / not yet built

- **Header / nav / footer logo** — ✅ provided. `public/images/brand/ea-logo-black.png`
  (light backgrounds) and `ea-logo-white.png` (dark), 640 px wide, ~40 KB each,
  downscaled from the originals in `brand-src/`. Used in `Navbar`, `Footer`, and
  the `/lab` header. An SVG version would be sharper at any size if available.
- **Hero text-mask media** — the reference shows an image/GIF *through* the hero
  letters. Not built here. If added: a looping video or wide image roughly
  **1600 × 500** (matches the wordmark bounding box) plus a poster still.
- **Project thumbnails** (§ "otros proyectos") — the reference reveals a thumb
  per project row on hover. Not built. If added: **4:3**, export **1200 × 900**,
  one per project (8 rows currently).

---

## Totals to source

| group | count | export size | ratio | status |
|---|---|---|---|---|
| Hero scatter | 5 | 720 × 960 | 3:4 | ⬜ still `.ph` |
| About media | 1 | 1600 × 1000 (still or loop) | 16:10 | ⬜ still `.ph` |
| Parent-company lockup (`.lab-parent-media`) | 1 | ~1200 × 900 | 4:3 | ⬜ still `.ph` — EA + LawLogic logos |
| ea-solutions panels | 6 | 1600 × 2000 | 4:5 | ✅ provided |
| ea-solutions thumbnails | 6 | 200 × 200 (`-tn`) | 1:1 | ✅ provided |
| Team headshots | 18 | 800 × 1000 | 4:5 | ✅ provided |
| Brand logo | 2 | 640 px wide | ~2.7:1 | ✅ provided |

**Still needed: 7** — 5 hero scatter, 1 about-media, 1 parent-company lockup.
