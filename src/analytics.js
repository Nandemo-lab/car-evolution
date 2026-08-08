// Analytics stays dormant until VITE_GA_MEASUREMENT_ID is configured in the
// deployment environment. This lets the site ship event definitions before
// any visitor data is collected.
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

if (measurementId && !window.gtag) {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.append(script)
}

export function trackEvent(name, parameters = {}) {
  const payload = { page_path: window.location.pathname, ...parameters }
  window.dispatchEvent(new CustomEvent('carvista:analytics', { detail: { name, parameters: payload } }))
  if (typeof window.gtag === 'function') window.gtag('event', name, payload)
}
