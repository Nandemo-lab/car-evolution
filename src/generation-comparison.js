import './comparison-page.css'
import './land-cruiser-300-vs-250.css'
import './click-glow.js'
import './facelift-detail-tools.css'
import './facelift-detail-crop.css'
import './comparison-visual-first.css'
import { trackEvent } from './analytics.js'

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
  root.querySelectorAll('.lc-table-wrap').forEach(table => {
    const dismissHint = () => table.classList.remove('has-scroll-hint')
    if (table.scrollWidth <= table.clientWidth + 1) dismissHint()
    table.addEventListener('scroll', dismissHint, { once: true, passive: true })
    table.addEventListener('pointerdown', dismissHint, { once: true, passive: true })
  })
  trackEvent('view_generation_comparison', { vehicle: data.vehicle, comparison: data.intent })

  root.querySelectorAll('.related-links a').forEach(link => {
    link.addEventListener('click', () => trackEvent('open_related_generation_comparison', {
      comparison: data.intent,
      destination: new URL(link.href).pathname,
    }))
  })

  const copy = async (button, label) => {
    try { await navigator.clipboard.writeText(location.href); button.textContent = label }
    catch { button.textContent = 'アドレスバーからURLをコピーしてください' }
  }
  document.querySelector('.share-button').addEventListener('click', async (event) => {
    const button = event.currentTarget
    trackEvent('share_generation_comparison', { vehicle: data.vehicle, intent: data.intent })
    if (!navigator.share) return copy(button, 'URLをコピーしました')
    try { await navigator.share({ title: document.title, text: data.shareText, url: location.href }) }
    catch (error) { if (error.name !== 'AbortError') button.textContent = 'URLをコピーして共有してください' }
  })
  document.querySelector('.copy-button').addEventListener('click', (event) => copy(event.currentTarget, 'コピーしました'))
}
