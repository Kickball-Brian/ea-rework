import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticBtn from './MagneticBtn'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-inner > *', {
        scrollTrigger: { trigger: '.contact-inner', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-inner">
          <h2 className="section-title">
            We're Waiting<br />
            <span className="gradient-text">To Help You</span>
          </h2>
          <p className="section-subtitle">
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
          <p className="contact-email">
            Or email us at{' '}
            <a href="mailto:info@emailagency.com">info@emailagency.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}
