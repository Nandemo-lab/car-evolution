// Configure only destinations approved by the publisher and partner.
export const affiliateDestinations = {
  usedCarSearch: null,
  valuation: null,
}

const journeys = [
  {
    key: 'usedCarSearch',
    title: '中古車を探す前に',
    advice: '車種・型式・年式を控え、支払総額、修復歴、保証の範囲を同じ条件で見比べましょう。',
    linkText: '提携サービスで中古車を探す',
  },
  {
    key: 'valuation',
    title: '車を売る前に',
    advice: '型式・初度登録年・走行距離を確認し、査定額の有効期限と引き渡し条件を比べましょう。',
    linkText: '提携サービスで査定を依頼する',
  },
]

function approvedLink(destination, linkText, key) {
  if (!destination || !/^[a-z0-9_-]{1,40}$/.test(destination.partner ?? '')) return ''
  let url
  try { url = new URL(destination.url) } catch { return '' }
  if (url.protocol !== 'https:' || url.username || url.password) return ''
  const href = url.href.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
  return `<p class="comparison-referral">PR・広告。外部サービスへ移動します。入力した個人情報は提携先の方針に従って取り扱われます。</p><a href="${href}" target="_blank" rel="sponsored noopener noreferrer" data-referral="${key}" data-partner="${destination.partner}">${linkText} ↗</a>`
}

export function vehicleDecisionHtml(destinations = affiliateDestinations) {
  const content = journeys.map(({ key, title, advice, linkText }) =>
    `<details data-vehicle-intent="${key}"><summary>${title}</summary><p>${advice}</p>${approvedLink(destinations[key], linkText, key)}</details>`
  ).join('')
  return `<aside class="comparison-cta comparison-vehicle-decision" aria-labelledby="vehicle-decision-heading"><h2 id="vehicle-decision-heading">中古車購入・売却の準備</h2><div>${content}</div></aside>`
}