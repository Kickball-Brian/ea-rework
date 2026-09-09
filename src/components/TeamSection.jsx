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

function MemberCard({ m, clone }) {
  return (
    <li className="ts-member" data-cursor-style="open" aria-hidden={clone || undefined}>
      <div className="ts-member-img">
        {m.photo === false ? (
          <span className="ts-member-initials" aria-hidden="true">{initials(m.name)}</span>
        ) : (
          <img
            src={`/images/team/${m.slug}.webp`}
            alt={clone ? '' : m.name}
            width="800"
            height="1000"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="ts-member-info">
        <span className="ts-member-name">{m.name}</span>
        <span className="ts-member-role">{m.title}</span>
      </div>
    </li>
  )
}

export default function TeamSection({
  words = ['Meet', 'the', 'Team'],
  leadLabel,
  lead = 'The people who run Email Agency day to day — across marketing, media, sales, technology, compliance, and medical verification. Founders stay hands-on in the work, and a bench of specialists plugs in per engagement so every account has the right people on it.',
  team = TEAM,
}) {
  const leadParas = String(lead).split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
  const rootRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Intro slides in from the left (reference: fadeInLeft, ease-out-cubic)
      const introEase = 'power3.out'
      gsap.from('.ts-title', {
        autoAlpha: 0, x: -44, duration: 0.8, ease: introEase,
        scrollTrigger: { trigger: '.ts-intro', start: 'top 82%' },
      })
      gsap.from('.ts-lead-label, .ts-lead', {
        autoAlpha: 0, x: -44, duration: 0.8, delay: 0.18, stagger: 0.08, ease: introEase,
        scrollTrigger: { trigger: '.ts-intro', start: 'top 82%' },
      })
    }, rootRef)

    // Infinite horizontal marquee — translate the track by exactly one list
    // width (+ gap) and loop; the second <ul> makes the wrap seamless.
    let marquee
    const track = trackRef.current
    const startMarquee = () => {
      if (reduce || !track) return
      marquee?.kill()
      gsap.set(track, { x: 0 })
      const list = track.querySelector('.ts-list')
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0
      const dist = list.getBoundingClientRect().width + gap
      if (!dist) return
      marquee = gsap.to(track, { x: -dist, duration: dist / 70, ease: 'none', repeat: -1 })
    }

    const raf = requestAnimationFrame(startMarquee)
    const onResize = () => startMarquee()
    window.addEventListener('resize', onResize)

    const slow = () => marquee && gsap.to(marquee, { timeScale: 0.12, duration: 0.4, overwrite: true })
    const normal = () => marquee && gsap.to(marquee, { timeScale: 1, duration: 0.4, overwrite: true })
    track?.addEventListener('pointerenter', slow)
    track?.addEventListener('pointerleave', normal)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      track?.removeEventListener('pointerenter', slow)
      track?.removeEventListener('pointerleave', normal)
      marquee?.kill()
      ctx.revert()
    }
  }, [team])

  return (
    <section
      className="section ts"
      ref={rootRef}
      style={{ '--content-color': 'var(--crimson-bright)' }}
      aria-labelledby="ts-title"
    >
      <div className="container">
        <div className="ts-intro">
          <span className="ts-title" id="ts-title">
            <span className="ts-title-lines">
              <span>{words[0]}</span>
              <span className="ts-title-alt">{words[1]}</span>
              <span>{words[2]}</span>
            </span>
          </span>
          {leadLabel && <span className="ts-lead-label">{leadLabel}</span>}
          {leadParas.map((para, i) => (
            <p className="ts-lead" key={i}>{para}</p>
          ))}
        </div>
      </div>

      <div className="ts-marquee">
        <div className="ts-marquee-track" ref={trackRef}>
          <ul className="ts-list">
            {team.map((m) => <MemberCard key={m.name} m={m} />)}
          </ul>
          <ul className="ts-list" aria-hidden="true">
            {team.map((m) => <MemberCard key={`${m.name}-clone`} m={m} clone />)}
          </ul>
        </div>
      </div>
    </section>
  )
}
