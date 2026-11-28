// Analytics stays dormant until VITE_GA_MEASUREMENT_ID is configured in the
// deployment environment. This lets the site ship event definitions before
// any visitor data is collected.
const measurementId = import.meta.env?.VITE_GA_MEASUREMENT_ID
const browserWindow = typeof window === 'undefined' ? null : window
// Isolated Cloudflare previews retain the production build's measurement ID.
// Only the canonical site may send page views or events to the production GA4 property.
const analyticsEnabled = Boolean(measurementId && browserWindow &&
  ['carvista.jp', 'www.carvista.jp'].includes(browserWindow.location.hostname))

const sensitiveParameter = /^(query|search_term|input|note|notes|text|vin|chassis|email|phone)$/i

export function sanitizeAnalyticsParameters(parameters = {}) {
  return Object.fromEntries(Object.entries(parameters).flatMap(([key, value]) => {
    if (sensitiveParameter.test(key) || value == null) return []
    if (typeof value === 'string') return [[key, value.slice(0, 120)]]
    if (typeof value === 'number' || typeof value === 'boolean') return [[key, value]]
    return []
  }))
}

if (analyticsEnabled && !browserWindow.gtag) {
  browserWindow.dataLayer = browserWindow.dataLayer || []
  browserWindow.gtag = function gtag() { browserWindow.dataLayer.push(arguments) }
  browserWindow.gtag('js', new Date())
  browserWindow.gtag('config', measurementId, { send_page_view: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.append(script)
}

export function trackEvent(name, parameters = {}) {
  if (!browserWindow) return
  const payload = { page_path: browserWindow.location.pathname, ...sanitizeAnalyticsParameters(parameters) }
  browserWindow.dispatchEvent(new CustomEvent('carvista:analytics', { detail: { name, parameters: payload } }))
  if (analyticsEnabled && typeof browserWindow.gtag === 'function') browserWindow.gtag('event', name, payload)
}
