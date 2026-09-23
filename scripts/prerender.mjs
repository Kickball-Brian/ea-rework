// Build-time prerendering for a pure client-rendered SPA on a static Apache
// host (no Node runtime in production, so real SSR isn't an option there).
//
// This site's raw HTML for every route is just an empty <div id="root"> —
// all real content only exists after React (and its GSAP/ScrollTrigger/
// Lenis setup) runs client-side. That's invisible to anything that doesn't
// execute JavaScript: Screaming Frog by default, most other SEO tools,
// social/chat link-preview bots, most AI/LLM crawlers, and it costs Google's
// own crawler extra render-queue time per page even though it does execute
// JS. Confirmed directly: a Screaming Frog crawl with JS rendering off found
// exactly one page.
//
// The fix here deliberately isn't a framework-level SSR/SSG migration
// (vite-react-ssg, Next.js, etc.) — those require the app to be
// hydration-safe (no direct window/document access during a Node-based
// render pass), and this app leans heavily on browser-only APIs throughout
// its GSAP/ScrollTrigger/Lenis animation code. Restructuring all of that to
// be SSR-safe would be a large, regression-prone change for an
// already-fragile, heavily-tuned animation setup.
//
// Instead: run `vite preview` to serve the real build, drive an actual
// headless Chrome (Puppeteer) to each route, let the existing client-side
// app render completely unchanged (same code path a real visitor's browser
// runs), and save the resulting DOM as static HTML. On a real page load,
// the browser paints that static HTML immediately (crawlable, real content,
// no JS required to see it) and then the same JS bundle loads and does a
// normal full client-side render on top of it — no hydration, so no
// hydration-mismatch risk; this is the same "prerender then rehydrate via
// full CSR" pattern used since the CRA era, not React 18/19 hydrateRoot.
//
// Prerendered at a mobile viewport (375x812) to match Google's mobile-first
// indexing — Googlebot's primary crawl is Googlebot Smartphone, so the
// mobile-rendered DOM is what actually gets evaluated. Nothing in this
// site's CSS hides real content at mobile widths (verified this session
// while rebuilding the solutions carousel — panels/thumbnails resize, they
// don't disappear), so this doesn't risk losing desktop-only content.

import { spawn } from 'node:child_process'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { SOLUTIONS } from '../src/data/solutions.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distDir = join(root, 'dist')
const port = 4321
const baseUrl = `http://localhost:${port}`

// Every real route from App.jsx except / (special-cased below — it
// overwrites dist/index.html directly), /lab (a client-side redirect to /,
// nothing to crawl there), and the catch-all (no static file needed —
// Apache's ErrorDocument 404 already serves the SPA shell for anything
// unmatched, see public/.htaccess).
const routes = [
  '/',
  ...SOLUTIONS.map((s) => `/solutions/${s.slug}`),
  '/phoenix-rising-foundation',
  '/contact-us',
  '/privacy-policy',
  '/terms-conditions',
]

// Third-party tracking that would otherwise fire once per prerendered
// route on every single `npm run build` — this blocks the network
// requests rather than touching application source, so it stays a build-
// script-only concern and doesn't need every future tracking script to
// remember its own "am I being prerendered" check.
const BLOCKED_DOMAINS = ['googletagmanager.com', 'google-analytics.com', 'posthog.com']

// Blocking the network request (below) stops the actual fetch, but the
// inline GTM snippet and PostHog's own init() code still run and append a
// <script src="..."> element to <head> before the (aborted) request
// resolves — page.content() then freezes that dead tag into the static
// file. On a real page load, that frozen tag loads GTM/PostHog once on
// initial parse, and the *original* static inline snippet (part of the
// unmodified template) runs again and inserts a second one — GTM/PostHog
// loading twice, risking duplicate pageview/conversion events in real
// analytics. This strips those specific leftover tags out of the captured
// HTML before it's written to disk; the legitimate static snippets that
// create them (no `src`, so unmatched by this) are untouched and still run
// normally for a real visitor.
function stripTrackingArtifacts(html) {
  const pattern = new RegExp(
    `<script\\b[^>]*\\ssrc="[^"]*(?:${BLOCKED_DOMAINS.map((d) => d.replace(/\./g, '\\.')).join('|')})[^"]*"[^>]*><\\/script>`,
    'g'
  )
  return html.replace(pattern, '')
}

function outputPathFor(route) {
  if (route === '/') return join(distDir, 'index.html')
  return join(distDir, 'prerendered', `${route.replace(/^\/|\/$/g, '')}.html`)
}

function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url)
        if (res.ok) return resolve()
      } catch {
        // not up yet
      }
      if (Date.now() - start > timeoutMs) return reject(new Error(`${url} did not come up in time`))
      setTimeout(attempt, 300)
    }
    attempt()
  })
}

async function main() {
  console.log('[prerender] starting vite preview...')
  // Spawn vite's own bin directly (not `npx vite`) and `detached: true` so
  // this process is its own process-group leader. `npx` wraps the real vite
  // process in a child of its own — killing the npx wrapper doesn't kill
  // that grandchild, which survives as an orphan still holding its stdout/
  // stderr pipes open. This script's `data` listeners on those pipes then
  // keep Node's event loop alive waiting for EOF that never comes, so the
  // script "finishes" (last log line prints) but the process never exits —
  // which reads as a hang to whatever's running the build. Confirmed on the
  // InsuranceLogic sibling project (same script, before this fix): the full
  // prerender completed successfully in the Netlify build log, then the
  // build timed out ~18 minutes later with no further output. Spawning the
  // real binary directly avoids the wrapper-orphan issue entirely;
  // `detached` + killing the negative PID (the process group) in the
  // `finally` below is a second layer of defense in case vite itself ever
  // spawns its own child.
  const preview = spawn(process.execPath, [join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: 'pipe',
    detached: true,
  })
  preview.stdout.on('data', () => {})
  preview.stderr.on('data', () => {})

  try {
    await waitForServer(baseUrl)
    console.log('[prerender] preview server up')

    const browser = await puppeteer.launch({ headless: true })
    try {
      const page = await browser.newPage()
      await page.setViewport({ width: 375, height: 812, isMobile: true })
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        const url = req.url()
        if (BLOCKED_DOMAINS.some((d) => url.includes(d))) req.abort()
        else req.continue()
      })

      const capture = async (path) => {
        const url = `${baseUrl}${path}`
        // 'load' rather than 'networkidle0' — any future embed that keeps
        // a background connection open (video, iframe, analytics beacon)
        // would make networkidle0 hang until timeout (hit this exact issue
        // on the LawLogic project's YouTube-embedding page). 'load' fires
        // once the page's own synchronous resources are done. GSAP/
        // ScrollTrigger set their initial ("from") states as part of
        // mount, not on a later tick, so content is present immediately —
        // the wait below is just a buffer for React's render + effects to
        // settle before capturing.
        await page.goto(url, { waitUntil: 'load', timeout: 30000 })
        await new Promise((r) => setTimeout(r, 800))
        return stripTrackingArtifacts(await page.content())
      }

      for (const route of routes) {
        const html = await capture(route)
        const outPath = outputPathFor(route)
        await mkdir(dirname(outPath), { recursive: true })
        await writeFile(outPath, html)
        console.log(`[prerender] ${route} -> ${outPath.replace(root + '/', '')} (${(html.length / 1024).toFixed(0)}KB)`)
      }

      // dist/index.html is now the prerendered HOMEPAGE (route '/' above
      // overwrote it), not a neutral shell — so it can't double as the
      // ErrorDocument 404 target the way the bare Vite output could.
      // Pointing ErrorDocument there would serve a 404 status with the
      // *homepage's* content as the body, which is worse than not
      // prerendering at all: a non-JS crawler hitting a broken URL would
      // see mismatched content instead of an honest "not found". Capture
      // React Router's actual catch-all/NotFound state (any path with no
      // matching route renders it) and ship that as its own file instead.
      const notFoundHtml = await capture('/__prerender_404_check__')
      const notFoundPath = join(distDir, '404.html')
      await writeFile(notFoundPath, notFoundHtml)
      console.log(`[prerender] 404 -> dist/404.html (${(notFoundHtml.length / 1024).toFixed(0)}KB)`)
    } finally {
      await browser.close()
    }
  } finally {
    // Negative PID = kill the whole process group (POSIX), not just the
    // immediate child — see the spawn comment above for why that matters.
    try { process.kill(-preview.pid, 'SIGTERM') } catch { preview.kill() }
  }

  // Sanity check: every prerendered file should contain more than just the
  // empty SPA shell (a regression here — e.g. a route that errors client-
  // side — would otherwise silently ship an empty page as "prerendered").
  for (const outPath of [...routes.map(outputPathFor), join(distDir, '404.html')]) {
    const html = await readFile(outPath, 'utf-8')
    if (!html.includes('<h1')) {
      throw new Error(`[prerender] ${outPath.replace(root + '/', '')} has no <h1> in its captured HTML — likely failed to render. Output saved to ${outPath} for inspection.`)
    }
  }

  console.log(`[prerender] done — ${routes.length} routes + 404 prerendered`)
  // Explicit exit as a second safety net beyond the process-group kill
  // above — belt and suspenders against any other handle (a stray
  // keep-alive socket, a CI-container quirk in how Chrome's process tree
  // gets reaped) silently keeping the event loop alive after everything
  // this script actually cares about has already completed and been
  // written to disk.
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
