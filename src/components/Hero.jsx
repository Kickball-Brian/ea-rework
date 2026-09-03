import { useRef } from 'react'
import { Link } from 'react-router-dom'
import HalftoneDots from './HalftoneDots'
import MagneticBtn from './MagneticBtn'

// Headline is split into words, then characters, for the staggered entrance
// animation defined in index.css (.hero-char).
const LINE_ONE = ['The', "Nation's", 'Leading']
const LINE_TWO = 'Marketing Resource'

export default function Hero() {
  const ref = useRef(null)

  let idx = 0

  return (
    <section className="hero hero--flat" ref={ref}>
      <div className="hero-overlay" />

      <HalftoneDots position="tr" size="xl" density="md" opacity="normal" speed={0.3} style={{ zIndex: 0 }} rotate="-8deg" />
      <HalftoneDots position="bl" size="lg" density="sm" opacity="faint" speed={0.15} style={{ zIndex: 0 }} rotate="6deg" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <h1>
            {LINE_ONE.map((word, wi) => (
              <span key={wi} className="hero-word" style={{ display: 'inline-block', marginRight: '0.28em', whiteSpace: 'nowrap' }}>
                {word.split('').map((ch, ci) => (
                  <span key={ci} className="hero-char" style={{ display: 'inline-block', animationDelay: `${0.32 + idx++ * 0.035}s` }}>{ch}</span>
                ))}
              </span>
            ))}
            <br />
            <span className="hero-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {LINE_TWO.split('').map((ch, ci) => (
                <span
                  key={ci}
                  className={`hero-char${ch !== ' ' ? ' gradient-text' : ''}`}
                  style={{ display: 'inline-block', animationDelay: `${0.32 + idx++ * 0.035}s`, minWidth: ch === ' ' ? '0.28em' : undefined }}
                >{ch === ' ' ? ' ' : ch}</span>
              ))}
            </span>
          </h1>

          <p className="hero-sub" style={{ animationDelay: '0.85s' }}>
            At Email Agency, we provide businesses with a range of essential
            marketing services, helping your business to thrive. Grow your
            customer leads and sales, boost your brand image, and get ahead of
            your competition.
          </p>

          <div className="hero-ctas" style={{ animationDelay: '1.05s' }}>
            <MagneticBtn>
              <Link to="/contact-us" className="btn btn-primary">Book A Consultation</Link>
            </MagneticBtn>
            <MagneticBtn>
              <Link to="/solutions" className="btn btn-ghost">View Our Solutions →</Link>
            </MagneticBtn>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" style={{ animationDelay: '1.5s' }}>
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
