import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'
import { SOLUTIONS } from '../data/solutions'

gsap.registerPlugin(ScrollTrigger)

const CLIENTS = [
  'Pharm Alliance', 'Max Scripts', 'Pulaski', 'Milberg', 'Monsour',
  'DC Law', 'NLG', 'Scout', 'Scott + Scott',
]

export default function SolutionsPage() {
  usePageMeta(
    'Solutions | Email Agency',
    'Lead Generation, LeadLogic software, Call Center Services, Media Buys, Social Media Management, and Web Design — the full range of marketing solutions from Email Agency.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-full-card', {
        scrollTrigger: { trigger: '.services-full-list', start: 'top 80%' },
        opacity: 0, y: 60, duration: 0.8, stagger: 0.14, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero>
        <span className="section-label">Solutions</span>
        <h1 className="page-title">Our Range of <span className="gradient-text">Marketing Solutions</span></h1>
        <p className="page-lead">
          Our expert team is available to boost your business's marketing
          potential, reach new customers, and become an authority within your
          market. Check out the range of marketing solutions we offer.
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="services-full-list">
            {SOLUTIONS.map((s) => (
              <div className="service-full-card" key={s.slug}>
                <div className="service-full-icon">{s.icon}</div>
                <div className="service-full-body">
                  <h2>{s.title}</h2>
                  <p>{s.body}</p>
                  <Link to={`/solutions/${s.slug}`} className="service-full-link">Learn More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
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

      <section className="section contact" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="contact-inner">
            <h2 className="section-title">We're Waiting To Help You</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
              Get in touch with us today and let's start getting you the leads you
              need to succeed.
            </p>
            <div className="contact-ctas">
              <MagneticBtn><Link to="/contact-us" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>Book A Consultation</Link></MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
