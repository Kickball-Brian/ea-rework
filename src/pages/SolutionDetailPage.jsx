import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import MagneticBtn from '../components/MagneticBtn'
import usePageMeta from '../hooks/usePageMeta'
import { SOLUTIONS, solutionBySlug } from '../data/solutions'

gsap.registerPlugin(ScrollTrigger)

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const solution = solutionBySlug(slug)

  usePageMeta(
    solution ? `${solution.title} | Email Agency` : 'Solutions | Email Agency',
    solution ? solution.body.slice(0, 155) : 'Marketing solutions from Email Agency.'
  )

  const pageRef = useRef(null)
  useEffect(() => {
    if (!solution) return
    const ctx = gsap.context(() => {
      gsap.from('.sol-detail-media', {
        opacity: 0, y: 60, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.sol-detail-media', start: 'top 82%' },
      })
      gsap.from('.sol-detail-more li', {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.sol-detail-more', start: 'top 85%' },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [solution])

  if (!solution) return <Navigate to="/solutions" replace />

  const others = SOLUTIONS.filter((s) => s.slug !== solution.slug)

  return (
    <div ref={pageRef}>
      <PageHero>
        <span className="section-label">Solution</span>
        <h1 className="page-title">{solution.title}</h1>
        <p className="page-lead">{solution.body}</p>
        <div className="contact-ctas" style={{ marginTop: 28 }}>
          <MagneticBtn>
            <Link to="/contact-us" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
              Book A Consultation
            </Link>
          </MagneticBtn>
          <MagneticBtn>
            <Link to="/solutions" className="btn btn-ghost" style={{ fontSize: 15, padding: '14px 32px' }}>
              All Solutions →
            </Link>
          </MagneticBtn>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="sol-detail-media">
            <img
              src={`/images/solutions/${solution.slug}.webp`}
              alt={solution.title}
              width="1600"
              height="2000"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container">
          <span className="section-label">More Solutions</span>
          <ul className="sol-detail-more">
            {others.map((s) => (
              <li key={s.slug}>
                <Link to={`/solutions/${s.slug}`}>
                  <span className="sol-detail-more-icon" aria-hidden="true">{s.icon}</span>
                  {s.title}
                  <span className="sol-detail-more-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
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
              <MagneticBtn>
                <Link to="/contact-us" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
                  Book A Consultation
                </Link>
              </MagneticBtn>
              <MagneticBtn>
                <a href="tel:8776746366" className="btn btn-ghost" style={{ fontSize: 16, padding: '16px 36px' }}>
                  (877) 674-6366
                </a>
              </MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
