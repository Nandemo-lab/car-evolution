export function comparisonNextLinks(data) {
  const isTantoEntry = data.vehicle === 'TANTO' && data.intent === 'la600s-pre-post'
  const isNoahComparison = data.vehicle === 'NOAH' && ['70-vs-80', '80-vs-90'].includes(data.intent)
  if (data.vehicle !== 'VOXY' && !isTantoEntry && !isNoahComparison) return ''
  const links = (data.links || []).filter(link => /^\/[a-z0-9/-]+\.html$/.test(link.href)).slice(0, 3)
  if (!links.length) return ''
  const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  return `<nav class="comparison-next-links" aria-label="${escape(data.vehicle)}の次の比較"><span>探している世代が違う場合</span>${links.map(link => `<a href="${escape(link.href)}">${escape(link.title)} →</a>`).join('')}</nav>`
}
