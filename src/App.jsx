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

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const go = () => {
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
    // Pinned sections (GSAP ScrollTrigger) insert spacer elements that shift
    // layout after mount, so a hash target needs a second, corrective pass
    // once those have settled — not just the initial scroll.
    const t1 = setTimeout(go, 220)
    const t2 = hash ? setTimeout(go, 1000) : null
    return () => { clearTimeout(t1); if (t2) clearTimeout(t2) }
  }, [pathname, hash])
  return null
}

function AppContent() {
  const location = useLocation()
  const lenisRef = useRef(null)

  useEffect(() => {
    lenisRef.current = initLenis()
  }, [])

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
        <AnimatePresence mode="wait">
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
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}
