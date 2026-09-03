import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  usePageMeta(
    'Contact Us | Email Agency',
    "Ready to take your business marketing strategy to the next level? Call (877) 674-6366, email info@emailagency.com, or send us a message."
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-item', {
        scrollTrigger: { trigger: '.contact-info-list', start: 'top 82%' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero minHeight="40vh">
        <span className="section-label">Contact Us</span>
        <h1 className="page-title">Get In Touch <span className="gradient-text">Today</span></h1>
        <p className="page-lead">
          We're here to help. Ready to take your business marketing strategy to
          the next level?
        </p>
      </PageHero>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="contact-page-grid">
            {/* Message form — wired for Netlify Forms.
                TODO(go-live): confirm form notifications route to info@emailagency.com. */}
            <div className="contact-form-wrap">
              <h2 className="section-title" style={{ fontSize: 28, marginBottom: 8 }}>Send Us A Message</h2>
              <p className="section-subtitle" style={{ margin: '0 0 28px' }}>
                Have a question or inquiry better suited for email? A member of our
                team will get back to you as soon as possible.
              </p>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="ea-form"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="ea-form-hp">
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </p>
                <div className="ea-form-row">
                  <label>
                    <span>Name</span>
                    <input type="text" name="name" required autoComplete="name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" name="email" required autoComplete="email" />
                  </label>
                </div>
                <div className="ea-form-row">
                  <label>
                    <span>Phone</span>
                    <input type="tel" name="phone" autoComplete="tel" />
                  </label>
                  <label>
                    <span>Company</span>
                    <input type="text" name="company" autoComplete="organization" />
                  </label>
                </div>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows={5} required />
                </label>
                <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>Submit</button>
              </form>
            </div>

            {/* Contact info */}
            <div className="contact-info-list">
              <a href="mailto:info@emailagency.com" className="contact-info-item">
                <div className="contact-info-icon">✉️</div>
                <div>
                  <div className="contact-info-label">Send Us An Email</div>
                  <div className="contact-info-value">info@emailagency.com</div>
                </div>
              </a>
              <a href="tel:8776746366" className="contact-info-item">
                <div className="contact-info-icon">📞</div>
                <div>
                  <div className="contact-info-label">Give Us A Call</div>
                  <div className="contact-info-value">(877) 674-6366</div>
                </div>
              </a>
              <a href="tel:8774983614" className="contact-info-item">
                <div className="contact-info-icon">☎️</div>
                <div>
                  <div className="contact-info-label">Alternate Line</div>
                  <div className="contact-info-value">(877) 498-3614</div>
                </div>
              </a>
              <a
                href="https://maps.google.com/?q=9141+Delemar+Ct+Wellington+FL+33414"
                target="_blank"
                rel="noreferrer"
                className="contact-info-item"
              >
                <div className="contact-info-icon">📍</div>
                <div>
                  <div className="contact-info-label">Office</div>
                  <div className="contact-info-value" style={{ whiteSpace: 'pre-line' }}>
                    {'9141 Delemar Ct\nWellington, FL 33414'}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
