import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'
import '../styles/phoenix-rising.css'

gsap.registerPlugin(ScrollTrigger)

const PROGRAMS = [
  { label: 'Mental Health Services', desc: 'Trauma-informed counseling and peer support for survivors working through the impact of assault.' },
  { label: 'Rehab & Recovery Support', desc: 'Comprehensive rehabilitation and peer-led recovery groups.' },
  { label: 'Job Training & Remote Placement', desc: 'Skills development and remote work placement for survivors who can’t return to a traditional workplace.' },
  { label: 'Shelter & Relocation Services', desc: 'Safe housing and relocation assistance for survivors who need to leave an unsafe situation.' },
  { label: 'Legal Services', desc: 'Guidance on protective orders and legal advocacy through the recovery process.' },
]

const SPONSOR_TIERS = [
  { name: 'Silver', desc: 'Community-level support, with annual report recognition and a tax receipt.' },
  { name: 'Gold', desc: 'Core contributor recognition, adding a website logo placement and social media posts.' },
  { name: 'Platinum', desc: 'Major program support with named sponsorship options and two gala seats.' },
  { name: 'Founding Partner', desc: 'Leadership-level support with permanent designation, full naming rights, and a premier gala table for eight.' },
]

export default function PhoenixRisingFoundationPage() {
  usePageMeta(
    'Phoenix Rising Foundation | Email Agency',
    'Phoenix Rising Foundation supports sexual assault survivors with mental health, recovery, job training, housing, and legal services. Founded by Email Agency CEO Amie Lawson.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prf-program', {
        scrollTrigger: { trigger: '.prf-programs-grid', start: 'top 82%' },
        opacity: 0, y: 40, duration: 0.65, stagger: 0.1, ease: 'power3.out',
      })
      gsap.from('.prf-tier', {
        scrollTrigger: { trigger: '.prf-tiers-grid', start: 'top 82%' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero bgImage="/images/phoenix-rising/hero.webp">
        <img
          src="/images/phoenix-rising/logo.svg"
          alt="Phoenix Rising Foundation"
          style={{ height: 44, marginBottom: 20, background: '#fff', padding: '8px 14px', borderRadius: 8 }}
        />
        <h1 className="page-title">Phoenix Rising Foundation</h1>
        <p className="page-lead">
          Empowering survivors. Rebuilding lives. Founded by Email Agency&apos;s
          CEO, Amie Lawson.
        </p>
      </PageHero>

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="about-story-text">
              <h2 className="section-title">Survivors Shouldn&apos;t Have to <span className="gradient-text">Rebuild Alone</span></h2>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17, marginBottom: 20 }}>
                Phoenix Rising Foundation was founded by Email Agency&apos;s own
                CEO, Amie Lawson, so &quot;support&quot; undersells the
                relationship. It&apos;s a nonprofit dedicated to supporting
                sexual assault survivors through dignity-centered services.
                Assault doesn&apos;t just cause trauma in isolation, it can cost
                survivors their safety, their job, their housing, and their
                mental health all at once. Phoenix Rising Foundation exists to
                address that full picture, not just one piece of it.
              </p>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17 }}>
                Roughly 85% of every donation goes directly to survivor programs,
                and their confidential intake line is staffed Monday through
                Friday, 9 AM to 5 PM, at{' '}
                <a href="tel:8008857473" style={{ color: 'var(--accent)' }}>(800) 885-7473</a>.
              </p>
            </div>
            <div className="about-story-image-placeholder">
              <img
                className="about-story-img"
                src="/images/phoenix-rising/why-this-work-matters.webp"
                alt="A Phoenix Rising Foundation counseling session"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section prf-programs-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="section-title" style={{ color: '#111' }}>Five Core <span className="gradient-text">Programs</span></h2>
          </div>
          <div className="prf-programs-grid">
            {PROGRAMS.map((p) => (
              <div className="prf-program" key={p.label}>
                <h3>{p.label}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section className="section">
        <div className="container">
          <div className="about-story" style={{ marginBottom: 64 }}>
            <div className="about-story-text">
              <h2 className="section-title">Ways to <span className="gradient-text">Sponsor</span></h2>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: 17 }}>
                Phoenix Rising Foundation invites law firms and organizations to
                extend their advocacy beyond the courtroom by supporting survivor
                recovery programs directly.
              </p>
            </div>
            <div className="about-story-image-placeholder">
              <img
                className="about-story-img"
                src="/images/phoenix-rising/why-partner.webp"
                alt="A handshake between a sponsor and a Phoenix Rising Foundation representative"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="about-capabilities prf-tiers-grid">
            {SPONSOR_TIERS.map((t) => (
              <div className="about-capability prf-tier" key={t.name}>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section contact" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="contact-inner">
            <h2 className="section-title">Learn More or Get Involved</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
              Visit Phoenix Rising Foundation directly to read more about their
              work or to become a sponsor.
            </p>
            <div className="contact-ctas">
              <MagneticBtn>
                <a
                  href="https://thephoenixrisingfoundation.net/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: 16, padding: '16px 36px' }}
                >
                  Visit Phoenix Rising Foundation
                </a>
              </MagneticBtn>
              <MagneticBtn>
                <a
                  href="https://thephoenixrisingfoundation.net/sponsors/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                  style={{ fontSize: 16, padding: '16px 36px' }}
                >
                  Become a Sponsor →
                </a>
              </MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
