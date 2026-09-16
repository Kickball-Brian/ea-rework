import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import usePageMeta from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'
import '../styles/contact-form.css'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  usePageMeta(
    'Contact Us | Email Agency',
    "Ready to take your business marketing strategy to the next level? Call (877) 674-6366, email info@emailagency.com, or send us a message."
  )
  const pageRef = useRef(null)
  const formContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-item', {
        scrollTrigger: { trigger: '.contact-info-list', start: 'top 82%' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  // A JSX <script> tag doesn't execute (React inserts it as an inert DOM
  // node), so the LeadLogic form-embed script has to be added the normal
  // DOM way instead, into the same container the #ll-form div lives in.
  // Guarded against double-injection (React StrictMode double-invokes
  // effects in dev) — the script declares top-level `let`/`const`s, so
  // loading it twice throws "already been declared".
  //
  // form.min.js's own follow-up steps are gated behind DOMContentLoaded
  // (to inject the widget script) and window.onload (to instantiate and
  // show the form) — both of which already fired on this page well before
  // a client-side route change mounts this component, so they'd never
  // fire again on their own. Chained script.onload callbacks replicate
  // what each of those handlers would have done.
  useEffect(() => {
    if (document.querySelector('script[src="/form.min.js"]')) return

    const loader = document.createElement('script')
    loader.src = '/form.min.js'
    loader.onload = () => {
      const widget = document.createElement('script')
      widget.src = 'https://docs.emailagency.com/form/embed/js/form-embed/idom/docs.emailagency.com/akey/dd66202d-6b53-11ed-bdfa-fa163eff53f0/code/EACONTACT'
      widget.onload = () => {
        setTimeout(() => {
          const init = document.createElement('script')
          init.textContent = 'window.Form = new LlForm(); window.Form.initiate();'
          document.head.appendChild(init)
        }, 400)
      }
      document.head.appendChild(widget)
    }
    formContainerRef.current?.appendChild(loader)
  }, [])

  // #ll-form's fields are injected by the vendor widget on its own timeline
  // (an AJAX call that can land well after this component mounts), so a
  // MutationObserver rather than a fixed timeout is what catches them.
  // Each .form-control starts as a 5x5px box (thick border already applied
  // via contact-form.css) and grows to its natural size as it scrolls into
  // view — a one-shot reveal per field, not a reversible scrub, so a field
  // never shrinks back down under someone mid-typing in it.
  useEffect(() => {
    const seen = new WeakSet()

    const growIn = (field) => {
      if (seen.has(field)) return
      seen.add(field)
      const { width, height } = field.getBoundingClientRect()
      gsap.set(field, { width: 5, height: 5, overflow: 'hidden' })
      gsap.to(field, {
        width, height,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: field, start: 'top 90%' },
      })
    }

    const scan = () => {
      document.querySelectorAll('#ll-form .form-control').forEach(growIn)
    }

    const observer = new MutationObserver(scan)
    if (formContainerRef.current) {
      observer.observe(formContainerRef.current, { childList: true, subtree: true })
    }
    scan()

    return () => observer.disconnect()
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
            {/* LeadLogic form embed (EACONTACT campaign) — same setup as the
                LawLogic Rework contact page: the script populates #ll-form. */}
            <div className="contact-form-wrap" ref={formContainerRef}>
              <h2 className="section-title" style={{ fontSize: 28, marginBottom: 8 }}>Send Us A Message</h2>
              <p className="section-subtitle" style={{ margin: '0 0 28px' }}>
                Have a question or inquiry better suited for email? A member of our
                team will get back to you as soon as possible.
              </p>
              <div id="ll-form"></div>
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
