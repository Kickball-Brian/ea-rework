import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'
import TeamSection from '../components/TeamSection'

gsap.registerPlugin(ScrollTrigger)

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
      <TeamSection />

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
