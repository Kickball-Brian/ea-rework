import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from '../hooks/usePageMeta'
import Hero from '../components/Hero'
import Contact from '../components/Contact'

gsap.registerPlugin(ScrollTrigger)

const SOLUTIONS = [
  { icon: '🎯', title: 'Lead Generation', desc: 'Get more sales. Acquiring new leads for your business through a wide variety of strategies, such as email marketing and networking — turning prospects into customers and clients.' },
  { icon: '🧭', title: 'LeadLogic', desc: 'Management software. A full-featured lead management (LMS) and CRM platform built around leads requiring documents for delivery — custom verticals, call center forms, QA processes, and delivery campaigns without a programmer.' },
  { icon: '📺', title: 'Media Buys', desc: 'Build an audience. We increase your exposure through media channels, ensuring you get the most impact from your marketing budget.' },
  { icon: '📞', title: 'Call Center Services', desc: 'Keep your team selling. Manage customer calls and queries in an efficient, practical manner and create the impression of a more professional operation.' },
  { icon: '💬', title: 'Social Media Management', desc: 'Engage your audience. Experienced in using social channels to boost your brand and build a close relationship with customers online.' },
  { icon: '🖥️', title: 'Web Design', desc: 'Create your online presence. An aesthetic, easy-to-navigate, up-to-date website that turns marketing spend into traffic. Let our team handle everything.' },
]

const CLIENTS = [
  'Pharm Alliance', 'Max Scripts', 'Pulaski', 'Milberg', 'Monsour',
  'DC Law', 'NLG', 'Scout', 'Scott + Scott',
]

function ValueProp() {
  return (
    <section className="section">
      <div className="container">
        <div className="company-intro-grid">
          <div className="company-intro-text">
            <span className="section-label">Offering You A More Tailored Solution</span>
            <h2 className="section-title">Honest <span className="gradient-text">Service</span></h2>
            <p>
              At Email Agency, we provide businesses with a range of essential
              marketing services, helping your business to thrive. Grow your
              customer leads and sales, boost your brand image, and get ahead of
              your competition. Contact our team today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionsPreview() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section section-dark" ref={ref} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Our Range of <span className="gradient-text">Marketing Solutions</span></h2>
        </div>
        <div className="services-grid">
          {SOLUTIONS.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/solutions" className="btn btn-ghost">View Our Solutions →</Link>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="section-label">Social Proof</span>
        <h2 className="section-title">Proven Strategies Generate <span className="gradient-text">Happy Clients</span></h2>
        <div className="client-list" aria-label="Selected clients">
          {CLIENTS.map((c) => (
            <span className="client-list-item" key={c}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  usePageMeta(
    "Email Agency — The Nation's Leading Marketing Resource",
    'Email Agency provides lead generation, LeadLogic software, media buys, call center services, social media management, and web design — a more tailored marketing solution.'
  )
  return (
    <>
      <Hero />
      <ValueProp />
      <SolutionsPreview />
      <SocialProof />
      <Contact />
    </>
  )
}
