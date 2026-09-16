import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from '../hooks/usePageMeta'
import LeadLogicForm from '../components/LeadLogicForm'
import '../styles/ea.css'
import '../styles/contact-page.css'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  usePageMeta(
    'Contact Us | Email Agency',
    "Ready to take your business marketing strategy to the next level? Call (877) 674-6366, email info@emailagency.com, or send us a message."
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ea-contact-hero > *', {
        autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      })
      gsap.from('.ea-contact-info-item', {
        scrollTrigger: { trigger: '.ea-contact-info-list', start: 'top 82%' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ea" ref={pageRef}>
      <section className="ea-contact-hero">
        <div className="ea-wrap">
          <span className="ea-eyebrow">contact us</span>
          <p className="ea-bigtext">Get In Touch Today</p>
          <p className="ea-contact-lead">
            We're here to help. Ready to take your business marketing strategy
            to the next level?
          </p>
        </div>
      </section>

      <section className="ea-contact-body">
        <div className="ea-wrap">
          <div className="ea-contact-row">
            <div>
              <h2 className="ea-contact-form-title">Send Us A Message</h2>
              <p className="ea-contact-form-body">
                Have a question or inquiry better suited for email? A member
                of our team will get back to you as soon as possible.
              </p>
              <LeadLogicForm />
            </div>

            <div className="ea-contact-info-list">
              <a href="mailto:info@emailagency.com" className="ea-contact-info-item">
                <span className="ea-contact-info-label">Send Us An Email</span>
                <span className="ea-contact-info-value">info@emailagency.com</span>
              </a>
              <a href="tel:8776746366" className="ea-contact-info-item">
                <span className="ea-contact-info-label">Give Us A Call</span>
                <span className="ea-contact-info-value">(877) 674-6366</span>
              </a>
              <a href="tel:8774983614" className="ea-contact-info-item">
                <span className="ea-contact-info-label">Alternate Line</span>
                <span className="ea-contact-info-value">(877) 498-3614</span>
              </a>
              <a
                href="https://maps.google.com/?q=9141+Delemar+Ct+Wellington+FL+33414"
                target="_blank"
                rel="noreferrer"
                className="ea-contact-info-item"
              >
                <span className="ea-contact-info-label">Office</span>
                <span className="ea-contact-info-value" style={{ display: 'block', whiteSpace: 'pre-line' }}>
                  {'9141 Delemar Ct\nWellington, FL 33414'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
