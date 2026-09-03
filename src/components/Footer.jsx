import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">

        {/* ── Desktop layout (hidden on mobile) ── */}
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Email Agency home">
              <span className="footer-logo-text">Email Agency</span>
            </Link>
            <p>
              The nation's leading marketing resource. Lead generation, software,
              media buys, call center, social media, and web design — a more
              tailored solution and honest service.
            </p>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/solutions">Lead Generation</Link></li>
              <li><Link to="/solutions">LeadLogic Software</Link></li>
              <li><Link to="/solutions">Media Buys</Link></li>
              <li><Link to="/solutions">Call Center Services</Link></li>
              <li><Link to="/solutions">Social Media Management</Link></li>
              <li><Link to="/solutions">Web Design</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:8776746366">(877) 674-6366</a></li>
              <li><a href="mailto:info@emailagency.com">info@emailagency.com</a></li>
              <li><a href="https://maps.google.com/?q=9141+Delemar+Ct+Wellington+FL+33414" target="_blank" rel="noreferrer">Wellington, FL 33414</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow</h4>
            <ul>
              <li><a href="https://www.linkedin.com/company/email-agency" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://www.facebook.com/EmailAgencyInc" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* ── Mobile layout: centered + pills (hidden on desktop) ── */}
        <div className="footer-mobile">
          <Link to="/" aria-label="Email Agency home">
            <span className="footer-logo-text">Email Agency</span>
          </Link>
          <p className="footer-mobile-tagline">
            The nation's leading marketing resource — a more tailored solution and honest service.
          </p>
          <Link to="/contact-us" className="footer-mobile-cta">Book A Consultation</Link>

          <div className="footer-pill-group">
            <span className="footer-pill-label">Company</span>
            <div className="footer-pills">
              <Link to="/" className="footer-pill">Home</Link>
              <Link to="/about-us" className="footer-pill">About Us</Link>
              <Link to="/solutions" className="footer-pill">Solutions</Link>
              <Link to="/contact-us" className="footer-pill">Contact Us</Link>
            </div>
          </div>

          <div className="footer-pill-group">
            <span className="footer-pill-label">Contact</span>
            <div className="footer-pills">
              <a href="tel:8776746366" className="footer-pill">(877) 674-6366</a>
              <a href="mailto:info@emailagency.com" className="footer-pill">info@emailagency.com</a>
            </div>
          </div>

          <div className="footer-pill-group">
            <span className="footer-pill-label">Follow</span>
            <div className="footer-pills">
              <a href="https://www.linkedin.com/company/email-agency" target="_blank" rel="noreferrer" className="footer-pill">LinkedIn</a>
              <a href="https://www.facebook.com/EmailAgencyInc" target="_blank" rel="noreferrer" className="footer-pill">Facebook</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Email Agency Inc. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
