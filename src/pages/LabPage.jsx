import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from '../hooks/usePageMeta'
import TeamSection from '../components/TeamSection'
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

// ea-solutions — six panels, copy verbatim from emailagency.com/solutions/.
// Images intentionally omitted (to be added from resized originals).
const SOLUTIONS = [
  {
    title: 'Lead Generation',
    body: 'Lead generation is one of our specialties, which is focused on acquiring new leads for your business. Through a wide variety of strategies, such as email marketing and networking, we help businesses attract prospects and turn them into customers and clients.',
  },
  {
    title: 'LeadLogic',
    body: 'LeadLogic software is a full featured lead management (LMS) and customer relationship management (CRM) software built around leads requiring documents for delivery. Build custom verticals, call center forms, QA processes, delivery campaigns without needing a programmer, and run reporting on your data like a professional.',
  },
  {
    title: 'Call Center Services',
    body: 'Are you struggling to handle call volume at your growing business? Would you like to create the impression of a more professional operation? We offer call center services that allow you to manage customer calls and queries in an efficient and practical manner.',
  },
  {
    title: 'Media Buys',
    body: "We help increase your business's exposure through media channels, ensuring you get the most impact from your marketing budget.",
  },
  {
    title: 'Social Media Management',
    body: "Our team is experienced in utilizing social media channels to boost your business's brand and maximize the potential that social channels offer. We help your business to create a close relationship with customers online.",
  },
  {
    title: 'Web Design',
    body: 'Much of your marketing efforts will be to increase traffic to your website. Therefore, it is essential that your website is aesthetic, easy to navigate, and up-to-date. Let our team handle everything.',
  },
]

function Ph({ className = '', style }) {
  return <div className={`ph ${className}`} style={style} aria-hidden="true" />
}

export default function LabPage() {
  usePageMeta('Layout study — Lab', 'Internal layout and animation study. Placeholder content.')

  // Internal study page — keep it out of search results even in production
  useEffect(() => {
    const tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex, nofollow'
    document.head.appendChild(tag)
    return () => tag.remove()
  }, [])

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

    // Positions were computed before the word-split reflow and before the
    // display font swapped in — recompute once both have settled.
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh())
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(rafId)
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
        <span className="lab-logo">Lorem.</span>
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
          <h1 className="lab-hero-mark">Lorem.</h1>
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
                <span className="ea-solutions-num">{String(i + 1).padStart(2, '0')}<span className="ea-solutions-count"> / {String(SOLUTIONS.length).padStart(2, '0')}</span></span>
                <h3 className="ea-solutions-title">{s.title}</h3>
                <p className="ea-solutions-body">{s.body}</p>
                {/* image slot — add resized original here */}
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
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
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
              <a className="lab-footer-mail" href="#lab">lorem@ipsum.com</a>
            </div>
          </div>
          <div className="lab-footer-row">
            <p style={{ maxWidth: '46ch', opacity: 0.7, fontSize: 13, lineHeight: 1.6 }}>{LOREM_MED}</p>
            <p style={{ opacity: 0.7, fontSize: 13, lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet<br />Consectetur adipiscing elit<br />00000 Lorem, IP
            </p>
          </div>
          <div className="lab-footer-mark">Lorem.</div>
        </div>
      </footer>
    </div>
  )
}
