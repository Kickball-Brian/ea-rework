import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import SiteFooter from './components/SiteFooter'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'

// Lazy per route: each page (plus whatever it alone pulls in — GSAP
// timelines, page-specific CSS) ships in its own chunk instead of one
// bundle everyone downloads just to see the homepage.
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'))
const PhoenixRisingFoundationPage = lazy(() => import('./pages/PhoenixRisingFoundationPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const LabPage = lazy(() => import('./pages/LabPage'))

gsap.registerPlugin(ScrollTrigger)

// Lenis singleton — lives for the duration of the app session
let lenisInstance = null

function initLenis() {
  if (lenisInstance) return lenisInstance
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  lenisInstance = lenis
  return lenis
}

function AppContent() {
  const location = useLocation()
  const lenisRef = useRef(null)

  useEffect(() => {
    lenisRef.current = initLenis()
  }, [])

  // Scroll restoration + ScrollTrigger.refresh() on route change. This used
  // to run off a fixed setTimeout(220) keyed on the new pathname, which
  // fired while the OLD page's exit animation (180ms) and GSAP-context
  // teardown could still be mid-flight — close enough that a slightly
  // slower device or a lazy chunk still loading would let
  // ScrollTrigger.refresh() run against a page that was still being torn
  // down. That's what a burst of GSAP "Invalid scope" warnings right
  // around refresh() traced back to, and, intermittently, it desynced
  // AnimatePresence's own exit tracking badly enough that the outgoing
  // page never got swapped for the incoming one (URL changed, DOM didn't).
  // Tying this to AnimatePresence's onExitComplete instead means it only
  // ever runs once the outgoing page is verifiably gone.
  const restoreScroll = () => {
    const { hash } = window.location
    const el = hash ? document.querySelector(hash) : null
    if (el) {
      if (lenisInstance) lenisInstance.scrollTo(el, { immediate: true, offset: -100 })
      else el.scrollIntoView()
    } else if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    ScrollTrigger.refresh()
  }

  // Initial page load only — there's no "exit" to complete the first time,
  // so onExitComplete below never fires for it. A double rAF waits for the
  // first paint of the mounted page before measuring anything.
  useEffect(() => {
    let raf2
    const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(restoreScroll) })
    // Pinned sections insert spacer elements that shift layout after
    // mount, so a hash target needs a second, corrective pass once those
    // have settled — not just the first scroll attempt.
    const t = window.location.hash ? setTimeout(restoreScroll, 800) : null
    return () => { cancelAnimationFrame(raf1); if (raf2) cancelAnimationFrame(raf2); if (t) clearTimeout(t) }
  }, [])

  const handleExitComplete = () => {
    requestAnimationFrame(() => {
      restoreScroll()
      if (window.location.hash) setTimeout(restoreScroll, 800)
    })
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      {/* Suspense wraps AnimatePresence, not the other way around — a lazy
          chunk that's still loading when the route changes has to suspend
          before Framer Motion starts animating the outgoing page, otherwise
          the exit/enter transition and the chunk load race each other and
          the old page can get stuck on screen mid-transition. */}
      <Suspense fallback={<div style={{ minHeight: '60vh' }} aria-hidden="true" />}>
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          <motion.main
            id="main-content"
            tabIndex={-1}
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<LabPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
              <Route path="/phoenix-rising-foundation" element={<PhoenixRisingFoundationPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsPage />} />
              <Route path="/lab" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </Suspense>
      <SiteFooter />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
