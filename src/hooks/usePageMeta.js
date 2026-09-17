import { useEffect } from 'react'

/**
 * @param {{ name: string, path: string }[]} [breadcrumbs] - trail from Home
 *   to this page, e.g. [{ name: 'Home', path: '/' }, { name: 'About Us',
 *   path: '/about-us' }]. Omit on pages that shouldn't carry a BreadcrumbList
 *   (the homepage, the 404 page).
 */
export default function usePageMeta(title, description, breadcrumbs) {
  useEffect(() => {
    document.title = title

    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description

    // Update OG tags too so social crawlers pick up page-level values
    const og = (prop, val) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', prop)
        document.head.appendChild(el)
      }
      el.content = val
    }
    og('og:title', title)
    og('og:description', description)
    og('og:url', window.location.href)

    // Canonical — update per-page so Google doesn't treat all pages as homepage duplicates
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://emailagency.com${window.location.pathname}`

    // Per-page BreadcrumbList — the SPA never reloads the document, so a
    // page that doesn't pass a trail has to actively remove any leftover
    // <script> from whichever page rendered right before it, rather than
    // just not adding one.
    let breadcrumbLd = document.getElementById('ld-breadcrumb')
    if (breadcrumbs?.length) {
      if (!breadcrumbLd) {
        breadcrumbLd = document.createElement('script')
        breadcrumbLd.type = 'application/ld+json'
        breadcrumbLd.id = 'ld-breadcrumb'
        document.head.appendChild(breadcrumbLd)
      }
      breadcrumbLd.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `https://emailagency.com${b.path}`,
        })),
      })
    } else if (breadcrumbLd) {
      breadcrumbLd.remove()
    }

    // GTM's own page-load trigger only ever sees the first URL in this SPA
    // (React Router navigation never reloads the page), so push a virtual
    // pageview on every route change instead. Every page calls this hook,
    // so it's the one guaranteed place this fires for all of them. No GTM
    // tags reference this event yet — that trigger/tag setup happens in the
    // container itself, this just makes sure the event is there to hook into.
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'virtualPageview',
      page_path: window.location.pathname,
      page_title: title,
      page_location: window.location.href,
    })
  }, [title, description, breadcrumbs])
}
