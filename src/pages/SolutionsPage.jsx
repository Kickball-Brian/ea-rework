import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../components/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import MagneticBtn from '../components/MagneticBtn'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: '🎯',
    title: 'Lead Generation',
    desc: "Lead generation is one of our specialties, which is focused on acquiring new leads for your business. Through a wide variety of strategies, such as email marketing and networking, we help businesses attract prospects and turn them into customers and clients.",
    cta: 'Learn More',
  },
  {
    icon: '🧭',
    title: 'LeadLogic',
    desc: "LeadLogic software is a full featured lead management (LMS) and customer relationship management (CRM) software built around leads requiring documents for delivery. Build custom verticals, call center forms, QA processes, delivery campaigns without needing a programmer, and run reporting on your data like a professional.",
    cta: 'Book A Consultation',
  },
  {
    icon: '📞',
    title: 'Call Center Services',
    desc: "Are you struggling to handle call volume at your growing business? Would you like to create the impression of a more professional operation? We offer call center services that allow you to manage customer calls and queries in an efficient and practical manner.",
    cta: 'Book A Consultation',
  },
  {
    icon: '📺',
    title: 'Media Buys',
    desc: "We help increase your business's exposure through media channels, ensuring you get the most impact from your marketing budget.",
    cta: 'Book A Consultation',
  },
  {
    icon: '💬',
    title: 'Social Media Management',
    desc: "Our team is experienced in utilizing social media channels to boost your business's brand and maximize the potential that social channels offer. We help your business to create a close relationship with customers online.",
    cta: 'Book A Consultation',
  },
  {
    icon: '🖥️',
    title: 'Web Design',
    desc: "Much of your marketing efforts will be to increase traffic to your website. Therefore, it is essential that your website is aesthetic, easy to navigate, and up-to-date. Let our team handle everything.",
    cta: 'Book A Consultation',
  },
]

const CLIENTS = [
  'Pharm Alliance', 'Max Scripts', 'Pulaski', 'Milberg', 'Monsour',
  'DC Law', 'NLG', 'Scout', 'Scott + Scott',
]

export default function SolutionsPage() {
  usePageMeta(
    'Solutions | Email Agency',
    'Lead Generation, LeadLogic software, Call Center Services, Media Buys, Social Media Management, and Web Design — the full range of marketing solutions from Email Agency.'
  )
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-full-card', {
        scrollTrigger: { trigger: '.services-full-list', start: 'top 80%' },
        opacity: 0, y: 60, duration: 0.8, stagger: 0.14, ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <PageHero>
        <span className="section-label">Solutions</span>
        <h1 className="page-title">Our Range of <span className="gradient-text">Marketing Solutions</span></h1>
        <p className="page-lead">
          Our expert team is available to boost your business's marketing
          potential, reach new customers, and become an authority within your
          market. Check out the range of marketing solutions we offer.
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="services-full-list">
            {services.map((s) => (
              <div className="service-full-card" key={s.title}>
                <div className="service-full-icon">{s.icon}</div>
                <div className="service-full-body">
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>
                  <Link to="/contact-us" className="service-full-link">{s.cta} →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Social Proof</span>
          <h2 className="section-title">Proven Strategies Generate <span className="gradient-text">Happy Clients</span></h2>
          <div className="client-list" aria-label="Selected clients">
            {CLIENTS.map((c) => (
              <span className="client-list-item" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="container">
          <div className="contact-inner">
            <h2 className="section-title">We're Waiting To Help You</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 40px' }}>
              Get in touch with us today and let's start getting you the leads you
              need to succeed.
            </p>
            <div className="contact-ctas">
              <MagneticBtn><Link to="/contact-us" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>Book A Consultation</Link></MagneticBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
