import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function initials(name) {
  return name
    .replace(/\bPA-C\b/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

// slug === headshot filename in /public/images/team/<slug>.webp
// photo:false → no headshot on file yet, render an initials tile
const TEAM = [
  { name: 'Amie Lawson',          title: 'Chief Executive Officer',              slug: 'amie-lawson' },
  { name: 'Michelle Pocius',      title: 'Chief Operations Officer',             slug: 'michelle-pocius' },
  { name: 'Nick Thompson',        title: 'Chief Revenue Officer',                slug: 'nick-thompson' },
  { name: 'Marc Loreti',          title: 'Chief Sales Officer',                  slug: 'marc-loreti' },
  { name: 'Harry Russell',        title: 'Chief Financial Officer',              slug: 'harry-russell' },
  { name: 'Max Ray',              title: 'Chief Growth Officer',                 slug: 'max-ray' },
  { name: 'Brian Remavich',       title: 'Chief Marketing Officer',              slug: 'brian-remavich' },
  { name: 'Patrick Sjoholm',      title: 'Chief Technology Officer',             slug: 'patrick-sjoholm' },
  { name: 'Anthony Loveland',     title: 'Chief Compliance Officer',             slug: 'anthony-loveland' },
  { name: 'Amanda Farris',        title: 'Chief Partnership Officer',            slug: 'amanda-farris' },
  { name: 'Dan Robinson',         title: 'VP of Sales',                          slug: 'dan-robinson' },
  { name: 'Shane Bader',          title: 'VP of Operations',                     slug: 'shane-bader' },
  { name: 'Adam Thayer',          title: 'VP — Media Analytics & Client Services', slug: 'adam-thayer' },
  { name: 'Jared Cassavechia',    title: 'SVP, Media',                           slug: 'jared-cassavechia' },
  { name: 'Josh Mathews',         title: 'SVP of TV Marketing',                  slug: 'josh-mathews' },
  { name: 'Josh Starks',          title: 'Sr. Business Development Manager',      slug: 'josh-starks' },
  { name: 'Mark Muzzini',         title: 'Sr. Business Development Manager — Legal', photo: false },
  { name: 'Jessica Remavich PA-C', title: 'Medical Director',                    slug: 'jessica-remavich' },
  { name: 'Seth VanderMay',       title: 'Director of Medical Verification',     slug: 'seth-vandermay' },
]

export default function TeamSection({
  eyebrow = 'The Team',
  title = 'The people behind Email Agency',
  team = TEAM,
}) {
  const rootRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const ctx = gsap.context(() => {
      if (reduce) return

      // Staggered card reveal
      gsap.from('.ts-card', {
        y: 64,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: { each: 0.05, from: 'start' },
        scrollTrigger: { trigger: '.ts-grid', start: 'top 80%' },
      })

      // Heading rises in
      gsap.from('.ts-head > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.ts-head', start: 'top 85%' },
      })

      // Background-reactive headshots: each image drifts within its frame as the
      // card travels through the viewport (image is over-scaled so edges never show)
      gsap.utils.toArray('.ts-photo img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.ts-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    }, rootRef)

    // Pointer parallax inside the frame (hover-capable devices only)
    let cleanupPointer = () => {}
    if (fine && !reduce) {
      const cards = rootRef.current.querySelectorAll('.ts-card')
      const handlers = []
      cards.forEach((card) => {
        const img = card.querySelector('.ts-photo img')
        if (!img) return
        // Only x/y (px) here — the scroll scrub owns yPercent, so they don't fight.
        const onMove = (e) => {
          const r = card.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height
          gsap.to(img, { x: dx * 16, y: dy * 16, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
        }
        const onLeave = () => gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        handlers.push([card, onMove, onLeave])
      })
      cleanupPointer = () => handlers.forEach(([c, m, l]) => {
        c.removeEventListener('mousemove', m)
        c.removeEventListener('mouseleave', l)
      })
    }

    return () => {
      cleanupPointer()
      ctx.revert()
    }
  }, [team])

  return (
    <section className="section ts" ref={rootRef}>
      <div className="container">
        <div className="ts-head">
          <span className="section-label">{eyebrow}</span>
          <h2 className="ts-title">
            {title}
            <sup className="ts-count">{team.length}</sup>
          </h2>
        </div>

        <ul className="ts-grid">
          {team.map((m) => (
            <li className="ts-card" key={m.name} data-cursor-style="small">
              <div className="ts-photo">
                {m.photo === false ? (
                  <span className="ts-initials" aria-hidden="true">{initials(m.name)}</span>
                ) : (
                  <img
                    src={`/images/team/${m.slug}.webp`}
                    alt={m.name}
                    width="800"
                    height="1000"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <div className="ts-meta">
                <span className="ts-name">{m.name}</span>
                <span className="ts-role">{m.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
