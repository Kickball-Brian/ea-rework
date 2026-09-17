import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from '../hooks/usePageMeta'
import TeamSection from '../components/TeamSection'
import MagneticBtn from '../components/MagneticBtn'
import { SOLUTIONS } from '../data/solutions'
import '../styles/ea.css'

gsap.registerPlugin(ScrollTrigger)

/* Layout / animation study modelled on septiembrearquitectura.com's homepage.
   Most copy is lorem-ipsum placeholder; the About section carries real copy. */

// About — big scroll-scrubbed paragraph. First two words ("Email Agency's")
// render bold via STRONG_WORDS.
const ABOUT_LEAD =
  "Email Agency's mission is to provide effective, innovative, and integrated brand marketing solutions to help our customers to grow their businesses to the next level and realize their marketing goals. We have result-oriented brand marketing programs, social media campaigns, and public relations strategies that enhance our client's brand awareness, foster their growth and improve their sales."
const STRONG_WORDS = new Set([0, 1]) // first two words rendered bold

// Hero scatter slot → scroll-scrubbed video. Slot 3 is the logo image instead.
const SCATTER_VIDEOS = {
  1: '/images/hero/s1-2.mp4',
  2: '/images/hero/s2.mp4',
  4: '/images/hero/s4_1.mp4',
  5: '/images/hero/s5.mp4',
}

function Ph({ className = '', style }) {
  return <div className={`ph ${className}`} style={style} aria-hidden="true" />
}

export default function LabPage() {
  usePageMeta(
    "Email Agency: The Nation's Leading Marketing Resource",
    'Email Agency provides lead generation, LeadLogic software, media buys, call center services, social media management, and web design, a more tailored marketing solution.'
  )

  const root = useRef(null)
  const solST = useRef(null)
  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = root.current

    // Split the big paragraph into word spans for the scrubbed reveal
    const big = el.querySelector('.ea-bigtext')
    if (big && !big.dataset.split) {
      big.dataset.split = '1'
      big.innerHTML = ABOUT_LEAD.split(' ')
        .map((w, i) => `<span class="w${STRONG_WORDS.has(i) ? ' w-strong' : ''}">${w}</span>`)
        .join(' ')
    }

    if (reduce) return

    // Declared here (not with the rest of the solutions-panel setup inside
    // the context callback below) so the outer cleanup can remove its
    // resize listener — gsap.context().revert() only tears down GSAP's own
    // tweens/triggers, not plain addEventListener calls.
    let setPanelWidth
    const ctx = gsap.context(() => {
      // 1 ─ Hero: pin the wordmark, drift the scatter images past it.
      // The scatter videos scrub their playback position off the same
      // pinned-scroll progress instead of autoplaying.
      const scatterVideos = gsap.utils.toArray('.ea-scatter-video')
      scatterVideos.forEach((v) => {
        v.pause()
        const prime = () => { v.play().then(() => v.pause()).catch(() => {}) }
        if (v.readyState >= 1) prime()
        else v.addEventListener('loadedmetadata', prime, { once: true })
      })
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ea-hero',
          start: 'top top',
          end: '+=120%',
          scrub: 0.35,
          pin: '.ea-hero-pin',
          anticipatePin: 1,
          onUpdate: (self) => {
            scatterVideos.forEach((v) => {
              if (!v.duration) return
              const t = v.duration * self.progress
              // Skip sub-frame deltas so we don't fire redundant seeks every tick
              if (Math.abs(v.currentTime - t) > 1 / 30) v.currentTime = t
            })
          },
        },
      })
      gsap.utils.toArray('.ea-scatter-item').forEach((item, i) => {
        if (item.classList.contains('s3')) return // s3 gets its own treatment below
        const dir = i % 2 ? 1 : -1
        const dist = 120 + i * 60
        heroTl.fromTo(item, { yPercent: dir * 12 }, { yPercent: -dir * 40, y: -dist, ease: 'none' }, 0)
      })
      // s3 (the logo mark): on phones it sits below the headline (CSS), so
      // instead of drifting up past the text like the others, send it
      // travelling down and growing into the About section's crimson
      // background, fading out as it goes so it blends into the red rather
      // than crossing anything. Desktop/tablet keep the original upward
      // drift, since s3 sits above the text there and never conflicts with it.
      if (window.innerWidth < 768) {
        const s3Grow = heroTl.fromTo('.ea-scatter-item.s3',
          { y: 0, scale: 1 },
          { y: 260, scale: 8.8, ease: 'power1.in' },
          0
        )
        // Hold full opacity through the first half of the scroll, then fade
        // out over the second half so it still reaches 0, just later. Sized
        // and positioned relative to s3Grow's own duration (not a hardcoded
        // number) so it always lands exactly at the growth tween's end,
        // regardless of GSAP's default tween duration.
        heroTl.fromTo('.ea-scatter-item.s3',
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: s3Grow.duration() / 2, ease: 'power1.in' },
          `<${s3Grow.duration() / 2}`
        )
      } else {
        heroTl.fromTo('.ea-scatter-item.s3', { yPercent: -12 }, { yPercent: 40, y: -240, ease: 'none' }, 0)
      }
      gsap.from('.ea-hero-mark', { autoAlpha: 0, y: 30, duration: 1, ease: 'power3.out' })
      gsap.from('.ea-hero-sub', { autoAlpha: 0, y: 20, duration: 0.9, delay: 0.4, ease: 'power3.out' })

      // 2 ─ About: colour inversion + word-by-word colour fill
      ScrollTrigger.create({
        trigger: '.ea-about',
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => el.classList.toggle('is-inverted', self.isActive),
      })
      gsap.fromTo('.ea-bigtext .w',
        { opacity: 0.16 },
        {
          opacity: 1, ease: 'none', stagger: 0.4,
          scrollTrigger: { trigger: '.ea-bigtext', start: 'top 78%', end: 'bottom 62%', scrub: true },
        }
      )
      gsap.from('.ea-about-row > *', {
        autoAlpha: 0, y: 60, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.ea-about-row', start: 'top 80%' },
      })

      // 4 ─ ea-solutions: pinned horizontal scroll, one panel per solution
      const track = el.querySelector('.ea-solutions-track')
      const solutionsPinEl = el.querySelector('.ea-solutions-pin')
      const amount = () => track.scrollWidth - window.innerWidth
      // Each panel's CSS width has to equal window.innerWidth exactly, the
      // same value amount()/the scrub math already uses, or the two drift
      // out of sync. Panels were sized with plain `100vw`, which on several
      // real Android devices (confirmed: Samsung Galaxy S25+, both Chrome
      // and Samsung Internet) is NOT the same number as window.innerWidth —
      // a longstanding viewport-unit quirk Chrome DevTools' device
      // emulation doesn't reproduce, so it never showed up in that testing.
      // The mismatch compounds across panels: by panel 2-3 two adjacent
      // panels were both partially on screen at once, each cropped, instead
      // of one full-width panel — exactly what those device screenshots
      // showed. Measuring window.innerWidth in JS and feeding it back in as
      // a CSS custom property keeps both sides using the literal same
      // number no matter how any given browser rounds/reports vw.
      setPanelWidth = () => track.style.setProperty('--panel-w', window.innerWidth + 'px')
      setPanelWidth()
      // GSAP's pin spacer is always pinEl's own height taller than the
      // configured scroll distance — room for the pinned element to hand
      // off back into normal document flow once the trigger's `end` is
      // reached. On desktop that release buffer is a small fraction of the
      // total (amount() is large — wide panels) and goes unnoticed. On
      // mobile .ea-solutions-pin is a full 100svh while amount() is
      // comparatively small (narrow panels), so that buffer became a third
      // or more of the whole scroll-through: the pin let go and the last
      // panel visibly slid/detached well before the user had actually
      // finished scrolling past the section. Folding that buffer into the
      // scrubbed timeline itself as an explicit hold — instead of leaving
      // it as an uncontrolled release tail — keeps the last panel correctly
      // pinned in place for that whole distance instead of drifting.
      // Both durations are plain pixel counts, not seconds — with scrub,
      // only their ratio to each other matters (it maps directly onto the
      // scroll distance each segment gets). The main tween needs its own
      // explicit duration here too: left unset, it defaults to GSAP's
      // standard 0.5s versus the hold's ~800px, which let the hold swallow
      // almost the entire timeline and made the horizontal slide-through
      // (and the thumbnail row's active-dot tracking, driven by the same
      // progress) finish within the first ~10% of the actual scroll.
      const solutionsTl = gsap.timeline()
      solutionsTl.to(track, { x: () => -amount(), duration: () => amount(), ease: 'none' })
      solutionsTl.to({}, { duration: () => solutionsPinEl.offsetHeight })
      solST.current = ScrollTrigger.create({
        trigger: '.ea-solutions',
        start: 'top top',
        end: () => '+=' + (amount() + solutionsPinEl.offsetHeight),
        scrub: 0.4,
        pin: solutionsPinEl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // scrub alone only smooths the animation while actively scrolling —
        // it never settles to a resting position. Touch-scroll momentum on
        // phones routinely stops mid-drag, which without snapping leaves
        // the track sitting between two panels, each cropped and half
        // visible (the "lost alignment" the real-device screenshots
        // showed). snapTo picks the nearest of the N panel positions, with
        // the whole hold segment collapsing to one point since the track
        // doesn't move during it anyway.
        snap: {
          snapTo: (value) => {
            const holdFraction = solutionsPinEl.offsetHeight / (amount() + solutionsPinEl.offsetHeight)
            const scrollPortion = 1 - holdFraction
            const points = SOLUTIONS.map((_, i) => (i / (SOLUTIONS.length - 1)) * scrollPortion)
            return points.reduce((n, p) => (Math.abs(value - p) < Math.abs(value - n) ? p : n), points[0])
          },
          duration: { min: 0.2, max: 0.6 },
          ease: 'power2.out',
        },
        onUpdate: (self) => {
          // self.progress spans the hold too, so scale it back down to just
          // the horizontal-scroll portion before mapping it to a panel index.
          const holdFraction = solutionsPinEl.offsetHeight / (amount() + solutionsPinEl.offsetHeight)
          const scrollProgress = Math.min(1, self.progress / (1 - holdFraction))
          setActivePanel(Math.round(scrollProgress * (SOLUTIONS.length - 1)))
        },
        animation: solutionsTl,
      })

      // 4b ─ Parent company: same colour inversion as About + row reveal
      // (created after the pinned section above so its positions account for the
      // pin spacer)
      ScrollTrigger.create({
        trigger: '.ea-parent',
        start: 'top 60%',
        end: 'bottom 40%',
        invalidateOnRefresh: true,
        onToggle: (self) => el.classList.toggle('is-inverted', self.isActive),
      })
      gsap.from('.ea-parent-row > *', {
        autoAlpha: 0, y: 60, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.ea-parent-row', start: 'top 80%' },
      })

      // 4c ─ LawLogic video: scrub playback position to scroll instead of
      // autoplaying — the video acts as a filmstrip driven by ScrollTrigger.
      const video = el.querySelector('.ea-parent-video')
      if (video) {
        video.pause()
        const prime = () => { video.play().then(() => video.pause()).catch(() => {}) }
        if (video.readyState >= 1) prime()
        else video.addEventListener('loadedmetadata', prime, { once: true })

        const parentTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.ea-parent-media',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.35,
            onUpdate: (self) => {
              if (!video.duration) return
              // Hold on the opening frames (the logo) through the first 15%
              // of scroll before the filmstrip starts advancing, so it gets
              // more time on screen instead of immediately scrubbing past it.
              const holdThrough = 0.15
              const adjusted = Math.max(0, (self.progress - holdThrough) / (1 - holdThrough))
              const t = video.duration * adjusted
              if (Math.abs(video.currentTime - t) > 1 / 30) video.currentTime = t
            },
          },
        })
        parentTl.fromTo(video, { scale: 1 }, { scale: 1.5, ease: 'none' }, 0)
      }
    }, root)

    // Recompute after the word-split reflow, the display-font swap, and once the
    // pinned section's spacer has been laid out (which shifts everything below it).
    // Guarded to before the user has actually started scrolling — a refresh
    // recalculates every ScrollTrigger's start/end, including the solutions
    // pin's own `end` (invalidateOnRefresh: true). window.load in particular
    // can fire several seconds late on this page (multiple <video> elements),
    // easily after a user has already scrolled deep into that pin. A stray
    // mid-pin refresh isn't the cause of the mobile panel-alignment bug fixed
    // above (that traced to the pin's release-buffer math, not refresh
    // timing) — this guard is a separate, cheap precaution against the
    // exact same recalculation happening while it could still do damage.
    const refresh = () => { if (window.scrollY < 50) ScrollTrigger.refresh() }
    const rafId = requestAnimationFrame(refresh)
    const t1 = setTimeout(refresh, 300)
    const t2 = setTimeout(refresh, 900)
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    window.addEventListener('resize', setPanelWidth)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', setPanelWidth)
      ctx.revert()
    }
  }, [])

  const jumpToPanel = (i) => {
    const st = solST.current
    if (!st) return
    const target = st.start + (i / (SOLUTIONS.length - 1)) * (st.end - st.start)
    st.scroll(target)
  }

  return (
    <div className="ea" ref={root}>
      {/* 1 ─ Hero */}
      <section className="ea-hero">
        <div className="ea-hero-pin">
          <div className="ea-hero-scatter">
            {[1, 2, 3, 4, 5].map((n) => (
              <div className={`ea-scatter-item s${n}`} key={n}>
                {SCATTER_VIDEOS[n] ? (
                  <video
                    className="ea-scatter-video"
                    src={SCATTER_VIDEOS[n]}
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                  />
                ) : n === 3 ? (
                  <img src="/images/hero/ea-logo2.webp" alt="Email Agency" loading="eager" decoding="async" width="1500" height="2000" />
                ) : (
                  <Ph />
                )}
              </div>
            ))}
          </div>
          <h1 className="ea-hero-mark">Email Agency</h1>
          <span className="ea-hero-sub">Performance Solutions</span>
        </div>
      </section>

      {/* 2 ─ About */}
      <section className="ea-about" id="ea-about">
        <div className="ea-wrap">
          <span className="ea-eyebrow">about us</span>
          <p className="ea-bigtext">{ABOUT_LEAD}</p>

          <div className="ea-about-row">
            <p className="ea-about-title">
              The real value is in <strong>real connections</strong>, and clients will
              always have the final say in what is genuine. Creating an emotional
              currency is a smart and affirmative strategy to show your clients you
              really get them. Email Agency creates campaigns that forge a connection
              by using compelling visual language, charm, and artful messaging.{' '}
              <strong>It is not rocket science, but it's emotional sensitivity.</strong>
            </p>
            <div className="ea-about-video">
              <img
                src="/images/about/real-connections.webp"
                alt="Illuminated connections between city skyscrapers at dusk"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 ─ ea-solutions — six panels, one per solution (images TBD) */}
      <section className="ea-solutions" id="ea-solutions">
        <div className="ea-solutions-pin">
          <div className="ea-solutions-track">
            {SOLUTIONS.map((s) => (
              <article className="ea-solutions-panel" key={s.title}>
                <div className="ea-solutions-copy">
                  <h3 className="ea-solutions-title">{s.title}</h3>
                  <p className="ea-solutions-body">{s.body}</p>
                  <MagneticBtn>
                    <Link to={`/solutions/${s.slug}`} className="ea-solutions-cta">Learn More →</Link>
                  </MagneticBtn>
                </div>
                <div className="ea-solutions-media">
                  <img
                    src={`/images/solutions/${s.slug}.webp`}
                    alt={s.title}
                    width="1600"
                    height="2000"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            ))}
          </div>
          <div className="ea-solutions-thumbs">
            {SOLUTIONS.map((s, i) => (
              <button
                key={s.title}
                className={`ea-solutions-thumb${i === activePanel ? ' is-active' : ''}`}
                onClick={() => jumpToPanel(i)}
                aria-label={s.title}
              >
                <img
                  src={`/images/solutions/${s.slug}-tn.webp`}
                  alt=""
                  width="200"
                  height="200"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4b ─ Parent company — colour-inverting section, flipped row (media | copy) */}
      <section className="ea-parent">
        <div className="ea-parent-row">
          <div className="ea-parent-media">
            <video
              className="ea-parent-video"
              src="/videos/lawlogic.mp4"
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
          <div className="ea-parent-copy">
            <h2 className="ea-parent-title">
              Email Agency Inc. is the parent company of LawLogic
            </h2>
            <p className="ea-parent-body">
              LawLogic is a legal lead generation agency in the legal marketing space,
              that employs unique processes and proprietary software to ensure
              compliance and eliminate fraud from claimants. We have developed a
              top-tier workflow that encompasses affiliate screening, intake services,
              QA fraud detection, medical verification, and seamless delivery to law
              firms.
            </p>
            <MagneticBtn>
              <a
                className="ea-parent-cta"
                href="https://lawlogic.law"
                target="_blank"
                rel="noreferrer"
              >
                Explore LawLogic
              </a>
            </MagneticBtn>
          </div>
        </div>
      </section>

      {/* 5 ─ Team (shared component) */}
      <TeamSection
        leadLabel="Our History"
        lead={
          'Email agency started as a small company offering marketing services. We have broadened the scope of our operations and services to fully support public and private sector clients. Our well-respected brand is a result of sustainable, responsible, and innovative business strategies coupled with deep experience in the marketing industry.\n\n' +
          'Today, our clients can count on us to respond to their marketing needs with a sense of urgency and an expectation that we will deliver successful marketing solutions.'
        }
      />

      {/* 6 ─ Contact CTA, under the team section. Links out to the Contact
          page rather than embedding the form widget here — that widget's
          own loading-spinner overlay would otherwise fire on every first
          visit to the homepage. */}
      <section className="ea-form-section">
        <div className="ea-wrap">
          <h2 className="ea-form-title">Send Us A Message</h2>
          <p className="ea-form-subtitle">
            Have a question or inquiry better suited for email? A member of our
            team will get back to you as soon as possible.
          </p>
          <MagneticBtn>
            <Link to="/contact-us" className="ea-parent-cta">Contact Us</Link>
          </MagneticBtn>
        </div>
      </section>
    </div>
  )
}
