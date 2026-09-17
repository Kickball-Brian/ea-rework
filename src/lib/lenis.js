import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Lenis singleton — lives for the duration of the app session. Pulled out
// of App.jsx (rather than exported from it) so it can be imported from
// page components too without tripping the react-refresh/only-export-
// components rule, which requires component files to only export
// components.
let lenisInstance = null

export function initLenis() {
  if (lenisInstance) return lenisInstance
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  lenisInstance = lenis
  return lenis
}

// Any programmatic scroll (e.g. LabPage's thumbnail-jump nav) needs to go
// through Lenis, not window.scrollTo/ScrollTrigger's own .scroll() — Lenis
// keeps its own idea of the current scroll target and re-asserts it every
// rAF tick, so a scroll position changed out from under it gets fought and
// dragged back rather than landing where it was told to go.
export function getLenis() {
  return lenisInstance
}
