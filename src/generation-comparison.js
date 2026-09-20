import './comparison-page.css'
import './land-cruiser-300-vs-250.css'
import './click-glow.js'
import { trackEvent } from './analytics.js'

import { bindComparisonTools } from './comparison-tools.js'
import { generationComparisonHtml } from './generation-comparison-html.js'

export function renderGenerationComparison(data) {
  const root = document.querySelector(data.root)
  if (!root.dataset.prerendered) root.innerHTML = generationComparisonHtml(data)

  bindComparisonTools(root, data)

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
