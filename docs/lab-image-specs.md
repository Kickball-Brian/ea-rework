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

## 3. `ea-solutions` — panel images (`.ea-solutions-panel`, image slot TBD)

Pinned horizontal-scroll section — **6 panels, one per solution** (Lead
Generation, LeadLogic, Call Center Services, Media Buys, Social Media
Management, Web Design). Copy is verbatim from `emailagency.com/solutions/`.

**Images are deliberately left out** — to be added from resized originals. Panels
are currently a centred text block (number / title / paragraph). When an image is
added, drop it in the `{/* image slot */}` marker and the panel becomes a
2-column layout (text | image), matching the reference.

Suggested target once added: **1 image per panel = 6 images**, landscape or
portrait per art direction, exported at **~1600 px on the long edge (2×)**.
The panel is a full 100vw with `padding: 0 clamp(24px, 10vw, 220px)`, so a
half-panel image lands around **700–860 px wide** on desktop → export ~1600 wide.

## 4. `ea-solutions` — thumbnail strip

Now a numbered nav (`01`–`06`), **no images**. Nothing to source.

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

- **Header logo** — currently the text wordmark "Lorem.". If a real mark is
  wanted: SVG (preferred) or a 2× PNG ~ 240 × 64.
- **Hero text-mask media** — the reference shows an image/GIF *through* the hero
  letters. Not built here. If added: a looping video or wide image roughly
  **1600 × 500** (matches the wordmark bounding box) plus a poster still.
- **Project thumbnails** (§ "otros proyectos") — the reference reveals a thumb
  per project row on hover. Not built. If added: **4:3**, export **1200 × 900**,
  one per project (8 rows currently).

---

## Totals to source

| group | count | export size | ratio |
|---|---|---|---|
| Hero scatter | 5 | 720 × 960 | 3:4 |
| About media | 1 | 1600 × 1000 (still or loop) | 16:10 |
| ea-solutions panels | 6 | ~1600 on long edge | TBD by art direction |
| Team headshots | 18 | 800 × 1000 (have) | 4:5 |

**New assets needed: 12** (5 + 1 + 6), plus the 18 headshots already in the repo.
The ea-solutions section renders without images for now — the count/title/paragraph
panels stand on their own until originals are dropped in.
