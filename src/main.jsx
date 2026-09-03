import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import './index.css'
import App from './App.jsx'

// TODO(go-live): initialise analytics (PostHog / GA4) with the Email Agency
// project key before cutting over to production.

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.defaults({ duration: 0 })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
