import { useEffect } from 'react'

/**
 * @param {{ name: string, path: string }[]} [breadcrumbs] - trail from Home
 *   to this page, e.g. [{ name: 'Home', path: '/' }, { name: 'About Us',
 *   path: '/about-us' }]. Omit on pages that shouldn't carry a BreadcrumbList
 *   (the homepage, the 404 page).
 * @param {boolean} [noindex] - true on pages that shouldn't be indexed (the
 *   404 page — every broken/mistyped URL renders it, and without this it's a
 *   fully indexable page that canonicalizes to itself).
 */
export default function usePageMeta(title, description, breadcrumbs, noindex) {
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

    // robots — index.html ships a default "index, follow" tag; a noindexed
    // page (the 404) overrides it instead of getting a second, conflicting
    // tag. Every other page passes noindex as falsy, so navigating from the
    // 404 to a real page (same SPA, document never reloads) sets this back
    // to "index, follow" on that page's own next run, with no separate
    // cleanup needed.
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = noindex ? 'noindex, follow' : 'index, follow'

    // Canonical — skip it entirely on a noindexed page. A canonical link
    // asserts "this is the authoritative URL for this content," which
    // contradicts telling crawlers not to index it at all.
    let canonical = document.querySelector('link[rel="canonical"]')
    if (noindex) {
      canonical?.remove()
    } else {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = `https://emailagency.com${window.location.pathname}`
    }

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
  }, [title, description, breadcrumbs, noindex])
}
