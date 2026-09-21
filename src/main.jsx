import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import posthog from 'posthog-js'
import './index.css'
import App from './App.jsx'

// Only in production builds — dev/preview traffic shouldn't pollute
// PostHog's numbers for the actual site.
if (import.meta.env.PROD) {
  posthog.init('phc_rLQtz832Cuy4qeo3aKNzhCQkXoxtFFciQ2F9VCB8ofqa', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-05-30',
  })
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.defaults({ duration: 0 })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
