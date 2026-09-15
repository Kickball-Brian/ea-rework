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

const CATEGORIES = [
  { label: 'consectetur', count: '18' },
  { label: 'adipiscing', count: '07' },
  { label: 'incididunt', count: '12' },
  { label: 'exercitation', count: '04' },
  { label: 'omnis projects', count: '41' },
]

const PROJECTS = [
  'Lorem Ipsum Dolor', 'Consectetur Adipiscing', 'Tempor Incididunt', 'Labore Dolore',
  'Aliqua Enim', 'Minim Veniam', 'Nostrud Exercitation', 'Ullamco Laboris',
]

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
  const [cat, setCat] = useState(0)
  const [swapping, setSwapping] = useState(false)
  const [activePanel, setActivePanel] = useState(0)

  const pickCat = (i) => {
    if (i === cat) return
    setSwapping(true)
    setTimeout(() => { setCat(i); setSwapping(false) }, 220)
  }

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
        const dir = i % 2 ? 1 : -1
        const dist = 120 + i * 60
        heroTl.fromTo(item, { yPercent: dir * 12 }, { yPercent: -dir * 40, y: -dist, ease: 'none' }, 0)
      })
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

      // 3 ─ Other projects: reveal list rows
      gsap.from('.ea-proj-list li', {
        autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: '.ea-proj-list', start: 'top 82%' },
      })

      // 4 ─ ea-solutions: pinned horizontal scroll, one panel per solution
      const track = el.querySelector('.ea-solutions-track')
      const amount = () => track.scrollWidth - window.innerWidth
      solST.current = ScrollTrigger.create({
        trigger: '.ea-solutions',
        start: 'top top',
        end: () => '+=' + amount(),
        scrub: 0.4,
        pin: '.ea-solutions-pin',
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setActivePanel(Math.round(self.progress * (SOLUTIONS.length - 1))),
        animation: gsap.to(track, { x: () => -amount(), ease: 'none' }),
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

        ScrollTrigger.create({
          trigger: '.ea-parent-media',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (video.duration) video.currentTime = video.duration * self.progress
          },
        })
      }
    }, root)

    // Recompute after the word-split reflow, the display-font swap, and once the
    // pinned section's spacer has been laid out (which shifts everything below it).
    const refresh = () => ScrollTrigger.refresh()
    const rafId = requestAnimationFrame(refresh)
    const t1 = setTimeout(refresh, 300)
    const t2 = setTimeout(refresh, 900)
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', refresh)
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
          <span className="ea-hero-scroll">Scroll</span>
        </div>
      </section>

      {/* 2 ─ About */}
      <section className="ea-about">
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
            <div className="ea-about-video"><Ph /></div>
          </div>
        </div>
      </section>

      {/* 3 ─ Other projects */}
      <section className="ea-projects">
        <div className="ea-wrap">
          <span className="ea-projects-eyebrow">otros proyectos</span>
          <div className={`ea-cat-title${swapping ? ' is-swapping' : ''}`}>
            <span className="swap">{CATEGORIES[cat].label}</span>
            <span className="num">{CATEGORIES[cat].count}</span>
          </div>
          <div className="ea-cat-btns">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.label}
                className={`ea-cat-btn${i === cat ? ' is-active' : ''}`}
                onClick={() => pickCat(i)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <ul className="ea-proj-list">
            {PROJECTS.map((p, i) => (
              <li key={p}><span>{String(i + 1).padStart(2, '0')}</span>{p}<span>2024</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 ─ ea-solutions — six panels, one per solution (images TBD) */}
      <section className="ea-solutions" id="ea-solutions">
        <div className="ea-solutions-pin">
          <div className="ea-solutions-track">
            {SOLUTIONS.map((s, i) => (
              <article className="ea-solutions-panel" key={s.title}>
                <div className="ea-solutions-copy">
                  <span className="ea-solutions-num">{String(i + 1).padStart(2, '0')}<span className="ea-solutions-count"> / {String(SOLUTIONS.length).padStart(2, '0')}</span></span>
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
            <a
              className="ea-parent-cta"
              href="https://lawlogic.law"
              target="_blank"
              rel="noreferrer"
            >
              Explore LawLogic
            </a>
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
    </div>
  )
}
