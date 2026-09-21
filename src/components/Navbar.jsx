import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'About Us',   to: '/#ea-about' },
  { label: 'Solutions',  to: '/#ea-solutions' },
  { label: 'Phoenix Rising Foundation', to: '/phoenix-rising-foundation' },
  { label: 'Contact Us', to: '/contact-us' },
]

// ── Animated hamburger ────────────────────────────────────────────────────────
function HamburgerIcon({ onClick, isOpen }) {
  return (
    <button
      className={`nav-hamburger${isOpen ? ' is-open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <svg viewBox="0 0 100 100" width="32" height="32" aria-hidden="true">
        <line className="ham-line ham-line-top" x1="20" y1="35" x2="80" y2="35" />
        <line className="ham-line ham-line-mid" x1="20" y1="50" x2="80" y2="50" />
        <line className="ham-line ham-line-bot" x1="20" y1="65" x2="80" y2="65" />
      </svg>
    </button>
  )
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden,   setHidden]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (current) => {
    const prev = scrollY.getPrevious() ?? 0
    if (current > prev && current > 150 && !menuOpen) setHidden(true)
    else setHidden(false)
    setScrolled(current > 60)
  })

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── Fixed bar ── */}
      <motion.nav
        className={`navbar solid${scrolled ? ' scrolled' : ''}`}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: hidden ? 0.32 : 0.2, ease: 'easeInOut' }}
      >
        <div className="container">
          <Link to="/" className="nav-logo" aria-label="Email Agency home" onClick={close}>
            <img src="/images/brand/ea-logo-black.png" alt="Email Agency" className="nav-logo-img" width="640" height="235" />
          </Link>

          <HamburgerIcon
            onClick={() => setMenuOpen((o) => !o)}
            isOpen={menuOpen}
          />
        </div>
      </motion.nav>

      {/* ── Mobile overlay ──
          Always mounted (not conditionally rendered on menuOpen) so its
          links — About Us, Phoenix Rising Foundation, Contact Us — are
          real <a> tags in the DOM on every page load, not just once a
          visitor clicks the hamburger. A crawler that doesn't interact
          with the page (which is all of them — Googlebot renders JS but
          doesn't click buttons) previously couldn't discover those pages
          through primary nav at all. Framer Motion's `animate` prop
          (instead of AnimatePresence's mount/unmount) drives the same
          fade/slide visually; `inert` handles making it unfocusable,
          unclickable, and hidden from the accessibility tree while
          closed, without touching the DOM presence a crawler reads. */}
      <motion.div
        className="nav-overlay-backdrop"
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
        onClick={close}
        aria-hidden="true"
      />

      <motion.aside
        className="nav-overlay-panel"
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 40 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
        aria-label="Site navigation"
        inert={!menuOpen}
      >
        <button className="overlay-close-btn" onClick={close} aria-label="Close menu">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M17 5L5 17M5 5l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="nav-overlay-inner">
          <p className="overlay-menu-label">Menu</p>

          <nav className="nav-overlay-links">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="overlay-nav-link" onClick={close}>{l.label}</Link>
            ))}
          </nav>

          <div className="nav-overlay-footer">
            <a href="tel:8776746366" className="overlay-phone">(877) 674-6366</a>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
