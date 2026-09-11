import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!reduce) {
        // Hero background rises faster than the page scrolls past it —
        // the image is over-scaled (130% height) so the extra travel never
        // reveals an edge.
        gsap.to('.sol-hero-bg', {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: { trigger: '.sol-hero', start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.from('.sol-hero-content > *', {
          autoAlpha: 0, y: 30, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1,
        })
      }
      gsap.from('.sol-article-intro', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.sol-article-intro', start: 'top 85%' },
      })
      gsap.from('.sol-article-block', {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.sol-article', start: 'top 78%' },
      })
      gsap.from('.sol-detail-more li', {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.sol-detail-more', start: 'top 85%' },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [solution])

  if (!solution) return <Navigate to="/solutions" replace />

  const [intro, ...rest] = solution.article
  const others = SOLUTIONS.filter((s) => s.slug !== solution.slug)

  return (
    <div ref={pageRef}>
      {/* Hero — full-bleed parallax background image */}
      <section className="sol-hero">
        <div className="sol-hero-bg-wrap" aria-hidden="true">
          <img
            className="sol-hero-bg"
            src={`/images/solutions/${solution.slug}.webp`}
            alt=""
            fetchPriority="high"
          />
          <div className="sol-hero-overlay" />
        </div>
        <div className="sol-hero-content">
          <span className="sol-hero-tag">Solution</span>
          <h1 className="sol-hero-title">{solution.title}</h1>
          <p className="sol-hero-subtitle">{solution.body}</p>
        </div>
      </section>

      {/* Article body */}
      <section className="section">
        <div className="container">
          <div className="sol-article">
            <div className="sol-article-intro">
              <h2>{intro.heading}</h2>
              {intro.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {rest.map((sec, i) => (
              <div className="sol-article-block" key={sec.heading}>
                <hr className="sol-article-rule" />
                <span className="sol-article-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{sec.heading}</h3>
                {sec.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More solutions */}
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

      {/* CTA */}
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
