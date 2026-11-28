import './comparison-page.css'
import './land-cruiser-300-vs-250.css'
import './click-glow.js'
import './facelift-detail-tools.css'
import './facelift-detail-crop.css'
import './comparison-visual-first.css'
import { trackEvent } from './analytics.js'
import { copySafely, shareSafely } from './safe-share.js'

import { bindComparisonTools } from './comparison-tools.js'
import { generationComparisonHtml } from './generation-comparison-html.js'
import { bindFaceliftDetailTools } from './facelift-detail-tools.js'
import { withFaceliftEnhancement } from './facelift-enhancements.js'

export function renderGenerationComparison(data) {
  data = withFaceliftEnhancement(data)
  const root = document.querySelector(data.root)
  if (!root.dataset.prerendered) root.innerHTML = generationComparisonHtml(data)

  bindComparisonTools(root, data)
  bindFaceliftDetailTools(root, data.detailCompare, { vehicle: data.vehicle, comparison: data.intent })
  bindComparisonViewToggle(root, data)
  root.querySelectorAll('.lc-table-wrap').forEach(table => {
    const dismissHint = () => table.classList.remove('has-scroll-hint')
    if (table.scrollWidth <= table.clientWidth + 1) dismissHint()
    table.addEventListener('scroll', dismissHint, { once: true, passive: true })
    table.addEventListener('pointerdown', dismissHint, { once: true, passive: true })
  })
  trackEvent('view_generation_comparison', { vehicle: data.vehicle, comparison: data.intent })

  root.querySelectorAll('.lc-related-card, .comparison-next-links a').forEach(link => {
    link.addEventListener('click', () => trackEvent('open_related_generation_comparison', {
      comparison: data.intent,
      destination: new URL(link.href).pathname,
    }))
  })

  document.querySelector('.share-button').addEventListener('click', async (event) => {
    trackEvent('share_generation_comparison', { vehicle: data.vehicle, intent: data.intent })
    return shareSafely(event.currentTarget, { title: document.title, text: data.shareText, url: location.href })
  })
  document.querySelector('.copy-button').addEventListener('click', (event) => {
    trackEvent('copy_generation_comparison_url', { vehicle: data.vehicle, intent: data.intent })
    return copySafely(event.currentTarget, location.href, 'コピーしました')
  })
}

export function bindComparisonViewToggle(root, data = {}) {
  const target = root.querySelector('[data-comparison-view-target]')
  const controls = [...root.querySelectorAll('[data-comparison-view]')]
  const hint = root.querySelector('.comparison-view-hint')
  if (!target || controls.length !== 2) return
  controls.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.comparisonView
    target.classList.toggle('is-single-view', mode === 'single')
    controls.forEach(control => control.setAttribute('aria-pressed', String(control === button)))
    if (hint) hint.textContent = mode === 'single' ? '横にスワイプして、1台ずつ大きく見られます' : '2台を同時に見比べます'
    if (mode === 'single') target.scrollTo({ left: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    trackEvent('change_comparison_image_view', { vehicle: data.vehicle, comparison: data.intent, mode })
  }))
}
