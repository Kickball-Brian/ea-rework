import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'

gsap.registerPlugin(ScrollTrigger)

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

const team = [
  { name: 'Amie Lawson',        title: 'Chief Executive Officer' },
  { name: 'Michelle Pocius',    title: 'Chief Operations Officer' },
  { name: 'Nick Thompson',      title: 'Chief Revenue Officer' },
  { name: 'Marc Loreti',        title: 'Chief Sales Officer' },
  { name: 'Harry Russell',      title: 'Chief Financial Officer' },
  { name: 'Max Ray',            title: 'Chief Growth Officer' },
  { name: 'Dan Robinson',       title: 'VP of Sales' },
  { name: 'Shane Bader',        title: 'VP of Operations' },
  { name: 'Josh Starks',        title: 'Sr. Business Development Manager' },
  { name: 'Mark Muzzini',       title: 'Sr. Business Development Manager – Legal' },
  { name: 'Josh Mathews',       title: 'SVP of TV Marketing' },
  { name: 'Jared Cassavechia',  title: 'Senior Vice President Media' },
  { name: 'Adam Thayer',        title: 'VP – Media Analytics & Client Services' },
  { name: 'Brian Remavich',     title: 'Chief Marketing Officer' },
  { name: 'Patrick Sjoholm',    title: 'Chief Technology Officer' },
  { name: 'Jessica Remavich PA-C', title: 'Medical Director' },
  { name: 'Anthony Loveland',   title: 'Chief Compliance Officer' },
  { name: 'Seth VanderMay',     title: 'Director of Medical Verification' },
  { name: 'Amanda Farris',      title: 'Chief Partnership Officer' },
]

const values = [
  { icon: '👥', label: 'Great Staff', desc: 'A team with deep experience across the marketing industry, aligned around our clients’ growth.' },
  { icon: '💬', label: 'Good Communication', desc: 'Clear, honest service and real connections — clients always have the final say in what is genuine.' },
  { icon: '📊', label: 'Mastery of Data', desc: 'Result-oriented programs built on data, so campaigns are measured, tuned, and accountable.' },
]

export default function AboutPage() {
  usePageMeta(
    'About Us | Email Agency',
    'Email Agency delivers effective, innovative, and integrated brand marketing solutions. Learn about our mission, history, core values, and leadership team.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-capability', {
        scrollTrigger: { trigger: '.about-capabilities', start: 'top 82%' },
        opacity: 0, y: 40, duration: 0.65, stagger: 0.1, ease: 'power3.out',
      })
      gsap.from('.team-card', {
        scrollTrigger: { trigger: '.team-grid', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.6, stagger: 0.06, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero>
        <span className="section-label">About Us</span>
        <h1 className="page-title">Marketing That Forges a <span className="gradient-text">Connection</span></h1>
        <p className="page-lead">
          Email Agency creates campaigns that forge a connection by using
          compelling visual language, charm, and artful messaging. The real value
          is in real connections.
        </p>
      </PageHero>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="about-story-text">
              <span className="section-label">Our Mission</span>
              <h2 className="section-title">Grow Your Business to the <span className="gradient-text">Next Level</span></h2>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17, marginBottom: 20 }}>
                Email Agency's mission is to provide effective, innovative, and
                integrated brand marketing solutions to help our customers grow
                their businesses to the next level and realize their marketing
                goals.
              </p>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17, marginBottom: 20 }}>
                We offer result-oriented brand marketing programs, social media
                campaigns, and public relations strategies that enhance our
                clients' brand awareness, foster their growth, and improve their
                sales.
              </p>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17 }}>
                Creating an emotional currency is a smart and affirmative strategy
                to show your clients you really get them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container">
          <div className="about-story">
            <div className="about-story-text">
              <span className="section-label">Our History</span>
              <h2 className="section-title">A Well-Respected <span className="gradient-text">Brand</span></h2>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17 }}>
                The company began as a small marketing firm and expanded to serve
                public and private sectors. Our well-respected brand is a result
                of sustainable, responsible, and innovative business strategies
                coupled with deep experience in the marketing industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Core Values</span>
            <h2 className="section-title">What We <span className="gradient-text">Stand On</span></h2>
          </div>
          <div className="about-capabilities">
            {values.map((v) => (
              <div className="about-capability" key={v.label}>
                <div className="service-icon">{v.icon}</div>
                <h3>{v.label}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidiary */}
      <section className="section section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container">
          <div className="about-story">
            <div className="about-story-text">
              <span className="section-label">Our Family of Companies</span>
              <h2 className="section-title">Parent Company of <span className="gradient-text">LawLogic</span></h2>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17 }}>
                Email Agency Inc. is the parent company of LawLogic, which
                specializes in legal lead generation with unique processes and
                proprietary software to ensure compliance and eliminate fraud
                from claimants.
              </p>
              <p style={{ marginTop: 20 }}>
                <a href="https://lawlogic.law" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                  Visit LawLogic →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Meet the <span className="gradient-text">Email Agency Team</span></h2>
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <div className="team-card" key={m.name}>
                <div className="team-linkedin-wrap no-photo">
                  <div className="team-avatar">{initials(m.name)}</div>
                </div>
                <div className="team-card-info">
                  <div className="team-name-link">{m.name}</div>
                  <div className="team-title">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section contact" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="contact-inner">
            <h2 className="section-title">Ready to Transform Your Business?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
              Get in touch with us today and let's start transforming your
              business from the ground up.
            </p>
            <div className="contact-ctas">
              <MagneticBtn><Link to="/contact-us" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>Request A Phone Call</Link></MagneticBtn>
              <MagneticBtn><Link to="/solutions" className="btn btn-ghost" style={{ fontSize: 16, padding: '16px 36px' }}>Our Solutions →</Link></MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
