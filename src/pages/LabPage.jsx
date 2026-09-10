import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from '../hooks/usePageMeta'
import TeamSection from '../components/TeamSection'
import MagneticBtn from '../components/MagneticBtn'
import { SOLUTIONS } from '../data/solutions'
import '../styles/lab.css'

gsap.registerPlugin(ScrollTrigger)

/* Layout / animation study modelled on septiembrearquitectura.com's homepage.
   Most copy is lorem-ipsum placeholder; the About section carries real copy. */

// About — big scroll-scrubbed paragraph. First two words ("Email Agency's")
// render bold via STRONG_WORDS.
const ABOUT_LEAD =
  "Email Agency's mission is to provide effective, innovative, and integrated brand marketing solutions to help our customers to grow their businesses to the next level and realize their marketing goals. We have result-oriented brand marketing programs, social media campaigns, and public relations strategies that enhance our client's brand awareness, foster their growth and improve their sales."
const LOREM_MED =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.'
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

function Ph({ className = '', style }) {
  return <div className={`ph ${className}`} style={style} aria-hidden="true" />
}

export default function LabPage() {
  usePageMeta(
    "Email Agency — The Nation's Leading Marketing Resource",
    'Email Agency provides lead generation, LeadLogic software, media buys, call center services, social media management, and web design — a more tailored marketing solution.'
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
    const big = el.querySelector('.lab-bigtext')
    if (big && !big.dataset.split) {
      big.dataset.split = '1'
      big.innerHTML = ABOUT_LEAD.split(' ')
        .map((w, i) => `<span class="w${STRONG_WORDS.has(i) ? ' w-strong' : ''}">${w}</span>`)
        .join(' ')
    }

    if (reduce) return

    const ctx = gsap.context(() => {
      // 1 ─ Hero: pin the wordmark, drift the scatter images past it
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.lab-hero',
          start: 'top top',
          end: '+=120%',
          scrub: true,
          pin: '.lab-hero-pin',
          anticipatePin: 1,
        },
      })
      gsap.utils.toArray('.lab-scatter-item').forEach((item, i) => {
        const dir = i % 2 ? 1 : -1
        const dist = 120 + i * 60
        heroTl.fromTo(item, { yPercent: dir * 12 }, { yPercent: -dir * 40, y: -dist, ease: 'none' }, 0)
      })
      gsap.from('.lab-hero-mark', { autoAlpha: 0, y: 30, duration: 1, ease: 'power3.out' })
      gsap.from('.lab-hero-sub', { autoAlpha: 0, y: 20, duration: 0.9, delay: 0.4, ease: 'power3.out' })

      // 2 ─ About: colour inversion + word-by-word colour fill
      ScrollTrigger.create({
        trigger: '.lab-about',
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => el.classList.toggle('is-inverted', self.isActive),
      })
      gsap.fromTo('.lab-bigtext .w',
        { opacity: 0.16 },
        {
          opacity: 1, ease: 'none', stagger: 0.4,
          scrollTrigger: { trigger: '.lab-bigtext', start: 'top 78%', end: 'bottom 62%', scrub: true },
        }
      )
      gsap.from('.lab-about-row > *', {
        autoAlpha: 0, y: 60, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.lab-about-row', start: 'top 80%' },
      })

      // 3 ─ Other projects: reveal list rows
      gsap.from('.lab-proj-list li', {
        autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: '.lab-proj-list', start: 'top 82%' },
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
        trigger: '.lab-parent',
        start: 'top 60%',
        end: 'bottom 40%',
        invalidateOnRefresh: true,
        onToggle: (self) => el.classList.toggle('is-inverted', self.isActive),
      })
      gsap.from('.lab-parent-row > *', {
        autoAlpha: 0, y: 60, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.lab-parent-row', start: 'top 80%' },
      })

      // 6 ─ Footer parallax
      gsap.from('.lab-footer-row', {
        y: 90, autoAlpha: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.lab-footer', start: 'top 88%' },
      })
      gsap.from('.lab-footer-mark', {
        y: 140, ease: 'none',
        scrollTrigger: { trigger: '.lab-footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
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
    <div className="lab" ref={root}>
      <header className="lab-header">
        <img src="/images/brand/ea-logo-black.png" alt="Email Agency" className="lab-logo" width="640" height="235" />
        <button className="lab-menu-btn" aria-label="Menu"><span /><span /></button>
      </header>

      {/* 1 ─ Hero */}
      <section className="lab-hero">
        <div className="lab-hero-pin">
          <div className="lab-hero-scatter">
            {[1, 2, 3, 4, 5].map((n) => (
              <div className={`lab-scatter-item s${n}`} key={n}><Ph /></div>
            ))}
          </div>
          <h1 className="lab-hero-mark">Email Agency</h1>
          <span className="lab-hero-sub">ipsum</span>
          <span className="lab-hero-scroll">Scroll</span>
        </div>
      </section>

      {/* 2 ─ About */}
      <section className="lab-about">
        <div className="lab-wrap">
          <span className="lab-eyebrow">about us</span>
          <p className="lab-bigtext">{ABOUT_LEAD}</p>

          <div className="lab-about-row">
            <p className="lab-about-title">
              The real value is in <strong>real connections</strong>, and clients will
              always have the final say in what is genuine. Creating an emotional
              currency is a smart and affirmative strategy to show your clients you
              really get them. Email Agency creates campaigns that forge a connection
              by using compelling visual language, charm, and artful messaging.{' '}
              <strong>It is not rocket science, but it's emotional sensitivity.</strong>
            </p>
            <div className="lab-about-video"><Ph /></div>
          </div>
        </div>
      </section>

      {/* 3 ─ Other projects */}
      <section className="lab-projects">
        <div className="lab-wrap">
          <span className="lab-projects-eyebrow">otros proyectos</span>
          <div className={`lab-cat-title${swapping ? ' is-swapping' : ''}`}>
            <span className="swap">{CATEGORIES[cat].label}</span>
            <span className="num">{CATEGORIES[cat].count}</span>
          </div>
          <div className="lab-cat-btns">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.label}
                className={`lab-cat-btn${i === cat ? ' is-active' : ''}`}
                onClick={() => pickCat(i)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <ul className="lab-proj-list">
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
      <section className="lab-parent">
        <div className="lab-parent-row">
          {/* EA + LawLogic lockup — drop the real image here */}
          <div className="ph lab-parent-media" aria-hidden="true" />
          <div className="lab-parent-copy">
            <h2 className="lab-parent-title">
              Email Agency Inc. is the parent company of LawLogic
            </h2>
            <p className="lab-parent-body">
              LawLogic is a legal lead generation agency in the legal marketing space,
              that employs unique processes and proprietary software to ensure
              compliance and eliminate fraud from claimants. We have developed a
              top-tier workflow that encompasses affiliate screening, intake services,
              QA fraud detection, medical verification, and seamless delivery to law
              firms.
            </p>
            <a
              className="lab-parent-cta"
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

      {/* 6 ─ Footer */}
      <footer className="lab-footer">
        <div className="lab-wrap">
          <div className="lab-footer-row">
            <div>
              <span className="lab-footer-title">Stay up to date</span>
              <ul>
                <li><a href="#lab">Instagram</a></li>
                <li><a href="#lab">LinkedIn</a></li>
                <li><a href="#lab">Facebook</a></li>
              </ul>
            </div>
            <div>
              <span className="lab-footer-title">Write to</span>
              <a className="lab-footer-mail" href="mailto:info@emailagency.com">info@emailagency.com</a>
            </div>
          </div>
          <div className="lab-footer-row">
            <p style={{ maxWidth: '46ch', opacity: 0.7, fontSize: 13, lineHeight: 1.6 }}>{LOREM_MED}</p>
            <p style={{ opacity: 0.7, fontSize: 13, lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet<br />Consectetur adipiscing elit<br />00000 Lorem, IP
            </p>
          </div>
          <div className="lab-footer-mark">Email Agency</div>
        </div>
      </footer>
    </div>
  )
}
