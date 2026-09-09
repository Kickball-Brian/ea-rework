# Animation reference — septiembrearquitectura.com

Captured 2026-09-09. Reference the user flagged as the target look/feel for the
Email Agency rework: playful, motion-forward, editorial. This is a catalogue of
every animation on that site plus how to rebuild each with **our** stack
(React 19 + GSAP + ScrollTrigger + Lenis).

## Their stack (from the deployed bundle)

| Concern | They use | Our equivalent |
|---|---|---|
| Smooth scroll | **GSAP ScrollSmoother** (`normalizeScroll:true`, `effects:true`) | **Lenis** (already installed) + `ScrollTrigger.update` on scroll |
| Scroll animation | **GSAP ScrollTrigger** | same (installed) |
| Parallax / speed | ScrollSmoother `data-speed` / `data-lag` effects | ScrollTrigger `scrub` + `y` tween, or a small `data-speed` helper over Lenis |
| Text splitting | **Splitting.js** (`data-letter`, per-word spans) | `Splitting` (tiny, MIT) or hand-rolled word/char wrapper |
| Layout morph | **GSAP Flip** plugin | GSAP Flip (free plugin) |
| Carousels | **Swiper** | Swiper, or Embla (lighter) |
| Page transitions | **Barba.js / PJAX** (`pjax:complete`) | React Router + Framer Motion `AnimatePresence` (already wired in `App.jsx`) |
| Preloader | Custom `loader.js` w/ fake progress | port the pattern (below) |
| Custom cursor | Custom, `data-cursor-style` w/ 11 states | extend our existing `Cursor.jsx` |
| Easing | `ease-out-cubic`, `ease-out-quart`, `ease-in-out-cubic`, GSAP `power1–3`, `CustomEase` | GSAP `power2.out` / `power3.inOut` / `expo.out`; `CustomEase` if needed |

They drive most reveals through a **declarative attribute system** (`data-aos`,
`data-trigger`, `data-translate-*`, `data-parallax-*`, `data-colorizer`,
`data-spacer`, `data-cursor-style`). Worth copying that pattern — it keeps
animation config in the markup and out of a hundred `useEffect`s.

---

## 1. Preloader (first load + every page transition)

**What:** Full-screen cream panel. Red "Septiembre." wordmark centred. A live
`NN %` counter at the bottom counting up (partly real asset progress, partly a
faked easing curve so it always feels smooth). At 100% the panel wipes away and
the hero animates in. Re-runs on every Barba navigation (shorter, no "first-"
prefix).

**Mechanism:** `loader.js` tracks `img[data-preload]` / `video[data-preload]`
completion + module readiness, blends that with a time-based fake curve
(`img.percent*0.6 + module.percent*0.4`, then `i*0.65 + h*0.35`), and writes:
- `body[data-load]` = `first-loading` → `first-leaving` → `first-done` (then just
  `loading`/`leaving`/`done` on subsequent loads)
- CSS vars on the loader el: `--percentage` (0–1) and `--percentage2` (`NN%`)
- `[data-load-progress]` = integer percent

All visual styling of the loader is pure CSS keyed off those attributes/vars.

**Rebuild:** Port `loader.js` almost verbatim (it's framework-agnostic, ~60
lines minified). Mount a `<Loader/>` overlay in `App.jsx` above the router;
gate the hero entrance on `body[data-load="first-done"]`. For route changes,
trigger it from a React Router navigation listener instead of `pjax:complete`.

---

## 2. Hero — wordmark with image window + scatter-parallax

**What (on load):** Huge "Septiembre." wordmark. The middle letters act as a
**mask/window** — a portrait image is visible *through* the glyphs. A small
"arquitectura" label fades in bottom-right. "Scroll" hint fades in bottom-centre.

**What (on scroll):** The wordmark **pins** while:
- the image window **scales up** / the masked image parallaxes
- a **scatter gallery** of 5–6 architecture photos flies in from off-screen and
  drifts past at different speeds (each a different `data-speed` / translate-from)
- images sit both behind and in front of the wordmark (z-index layering)
Then the whole thing releases into section 3.

**Mechanism:** `background-clip: text` (or an SVG `<text>` mask / a PNG text
window) over a positioned image; ScrollTrigger `pin` on the hero with
`scrub: true`; each scatter image is a ScrollSmoother effect element
(`data-speed="0.8"`…`"1.3"`) plus `data-translate-x-from` / `data-translate-y-from`
in `rem`.

**Rebuild:**
- Text window: `.hero-mask{background:url(img) center/cover; -webkit-background-clip:text; color:transparent}` — cross-browser-safe, we already lean on big display type.
- Pin + scrub with ScrollTrigger.
- Scatter parallax: give each image `data-speed`; a ~15-line Lenis helper reads
  `data-speed` and sets `y = progress * (1-speed) * range` on scroll (mimics
  ScrollSmoother effects).
- Respect `prefers-reduced-motion` — collapse to a static hero.

---

## 3. Scatter image grid (parallax field)

**What:** Between hero and about — images at varied positions/sizes, each moving
at its own scroll speed so the field shears as you scroll. Some overlap the
pinned wordmark.

**Mechanism:** ScrollSmoother `data-speed` per image (values ~0.85–1.25).

**Rebuild:** same `data-speed` helper as §2. This is the single highest-value
effect to nail for the "less static" brief — cheap, reads as premium.

---

## 4. Scroll-scrubbed text reveal ("about us" paragraph)

**What:** A big paragraph starts with the first ~4 lines in full crimson and the
rest in a pale/washed tint. As you scroll, the colour "fills" **word by word**
top-to-bottom until the whole block is saturated. Tied to scroll position
(scrubbed), not a one-shot.

**Mechanism:** Split into word `<span>`s (Splitting.js). ScrollTrigger with
`scrub`, `start: "top 80%"`, `end: "bottom 60%"`, tweening each word's `color`
(or `opacity` / `--fill`) with a `stagger` mapped across the scroll range.
Marked `data-aos="fadeInUp2 … , d:loop, trigger:.paragraph-trigger"` — `d:loop`
= re-fire every time it (re)enters view.

**Rebuild:** `Splitting({ target, by: 'words' })` → GSAP `fromTo` on
`.word` with `scrollTrigger:{ scrub:true }` and `stagger`. Good candidate for a
reusable `<ScrollRevealText>` component.

---

## 5. Section colour inversion (`data-colorizer`)

**What:** Scrolling into the "projects" block, the **entire page background flips
to crimson with cream text** (and cursor + header invert). Flips back on exit.
Smooth, ~400ms.

**Mechanism:** Sections carry `data-colorizer="about-us"` etc. A ScrollTrigger
per colour section toggles a class / CSS vars on `:root` or `<body>` at
`start: "top 50%"`. All colours are CSS custom properties so the swap is one
class.

**Rebuild:** Define the palette as CSS vars (we already do in `index.css`). Add a
`data-theme` swap driven by ScrollTrigger `onEnter`/`onLeaveBack`. Transition
`background-color`/`color` on `body` ~300–400ms `ease-in-out`.

---

## 6. Declarative reveal system (`data-aos`)

Their in-house AOS clone. Grammar:

```
data-aos="<name> <duration> <easing> <delay> [, d:loop] [, trigger:<selector>]"
```

Names seen: `fadeIn`, `fadeInUp`, `fadeInUp2`, `fadeInLeft`.
Examples in the wild:
- `data-aos="fadeIn .6s ease-in-out .2s, d:loop"`
- `data-aos="fadeInLeft .8s ease-out-cubic .4s, d:loop"`
- `data-aos="fadeInUp2 .8s ease-out-cubic .4s, d:loop, trigger:.paragraph-trigger"`

`d:loop` → animation replays on every enter (default is once). `trigger:` →
use another element's position instead of self.

Also standalone transform attributes (no `data-aos`):
`data-translate-x="-15rem"`, `data-translate-x-from="10rem"`,
`data-translate-y-from="15rem"`, `data-translate-y="-20vh"`,
`data-parallax-y-from="7rem"`, `data-start="200% bottom"`, `data-end="500% top"`,
`data-duration="2"`, `data-trigger="#section-culture"`.

**Rebuild:** small module that on mount queries `[data-aos]`, parses the string,
and builds a ScrollTrigger per element. Keeps JSX declarative. ~80 lines.

---

## 7. Pinned / sticky headings (`data-spacer`)

Section titles (e.g. "todos los proyectos⁰⁵" with a superscript index number)
pin while their content scrolls, using a `data-spacer` element to reserve
layout height. Standard ScrollTrigger `pin` + `pinSpacing`.

Section index numbers (`01`…`05`) as small superscripts next to headings — a
recurring editorial motif worth keeping.

---

## 8. Project slider (Swiper)

Numbered `1 . 5`, big prev/next arrows, drag. Cursor changes to `prev` / `next` /
`drag` over the slider zones. Slide change cross-fades the caption text
(`data-aos` fade on the active slide's copy).

**Rebuild:** Swiper or Embla; wire slide-change to a GSAP fade on the caption;
hook the cursor state to hover zones.

---

## 9. Custom cursor (`data-cursor-style`, 11 states)

A lerp-followed custom cursor (smoothed `mouseX/mouseY`). State set by the
`data-cursor-style` attr on whatever's hovered:

| value | count | meaning |
|---|---|---|
| `small` | 74 | shrink to dot over text/links |
| `view` | 12 | "view" pill over project thumbs |
| `open` | 8 | "open" over expandables |
| `small-white` / `white` | 8 | inverted on dark/crimson sections |
| `default` | 2 | reset |
| `drag` | 1 | over slider |
| `play` | 1 | over video |
| `prev` / `next` | 2 | slider arrows |
| `mix` | 1 | `mix-blend-mode` over imagery |

**Rebuild:** extend our `Cursor.jsx` — add a `data-cursor-style` reader on
`mouseover` (event delegation, like it already does for `.cursor-hover`), map
each value to a modifier class, keep the lerp follower. Add `mix-blend-mode`
variant.

---

## 10. Marquee

Infinite horizontal text loops (`Marquee` component in the bundle, `infinite`).
Used for ticker-style rows.

**Rebuild:** GSAP `xPercent` loop with `repeat:-1` and duplicated content, or CSS
`@keyframes translateX` (we already have `.tort-ticker` from LawLogic to adapt).

---

## 11. Misc details worth stealing

- "Scroll" hint bottom-centre with a thin animated line (we have `.hero-scroll-hint`).
- Vertical pinned badge on the right edge ("W. Honors" award mark).
- Everything eases with `ease-out-cubic` / `ease-out-quart` — snappy in, soft
  settle. Durations mostly `.6s`–`.8s`, delays `.2s`–`.6s` staggered.
- Generous negative space; type is the hero, imagery is secondary and always in
  motion.

---

## Suggested build order for us

1. Lenis + ScrollTrigger wiring (done) → add the `data-speed` parallax helper (§3).
2. Port the preloader (§1).
3. `data-aos` declarative reveal module (§6) — unlocks most section reveals.
4. Hero mask + pin + scatter (§2).
5. `<ScrollRevealText>` scrubbed word fill (§4).
6. `data-colorizer` theme inversion (§5).
7. Cursor state expansion (§9).
8. Sliders + marquee (§8, §10) as needed per section.

GSAP **Flip** and **CustomEase** are free; **ScrollSmoother** is Club GSAP
(paid) — Lenis + the `data-speed` helper covers what we need without it.
