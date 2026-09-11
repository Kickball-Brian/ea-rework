import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/site-footer.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Site-wide footer. Self-contained: owns its own styles (site-footer.css) and
 * its own scroll animation — it doesn't depend on the page it's dropped into,
 * so it drops into any route (including the homepage) unchanged.
 */
export default function SiteFooter() {
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.from('.site-footer-row', {
        y: 80, autoAlpha: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      })
      gsap.from('.site-footer-mark', {
        y: 120, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" ref={ref}>
      <div className="site-footer-wrap">
        <div className="site-footer-row site-footer-row--top">
          <div className="site-footer-block">
            <span className="site-footer-title">Stay up to date</span>
            <ul className="site-footer-social">
              <li><a href="https://www.linkedin.com/company/email-agency" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://www.facebook.com/EmailAgencyInc" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
          <div className="site-footer-block">
            <span className="site-footer-title">Write to</span>
            <a className="site-footer-mail" href="mailto:info@emailagency.com">info@emailagency.com</a>
          </div>
        </div>

        <div className="site-footer-row site-footer-row--nav">
          <nav className="site-footer-nav" aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/solutions">Solutions</Link>
            <Link to="/contact-us">Contact Us</Link>
          </nav>
          <div className="site-footer-contact">
            <a href="tel:8776746366">(877) 674-6366</a>
            <a
              href="https://maps.google.com/?q=9141+Delemar+Ct+Wellington+FL+33414"
              target="_blank"
              rel="noreferrer"
            >
              9141 Delemar Ct, Wellington, FL 33414
            </a>
          </div>
        </div>

        <div className="site-footer-mark" aria-hidden="true">Email Agency</div>

        <div className="site-footer-bottom">
          <span>© {year} Email Agency Inc. All rights reserved.</span>
          <div className="site-footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
