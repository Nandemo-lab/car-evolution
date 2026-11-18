// Mirror the same concise guide before JS loads; do not create a second visible UI.
export function staticQuickGuide(car) {
  const guide = car.quickGuide
  if (!guide?.items?.length) return ''
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const links = (guide.links || []).slice(0, 2).filter(item => /^\/[\w/-]+\.html$/.test(item.href))
  return `<section class="static-quick-guide"><h2>${esc(guide.title)}</h2><p>${esc(guide.intro)}</p><ul>${guide.items.slice(0, 3).map(item => `<li><strong>${esc(item.title)}</strong>：${esc(item.text)}</li>`).join('')}</ul>${links.length ? `<nav aria-label="${esc(car.vehicleName)}の次の比較">${links.map(item => `<a href="${esc(item.href)}">${esc(item.label)}</a>`).join(' ／ ')}</nav>` : ''}</section>`
}
