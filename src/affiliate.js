// Configure only destinations approved by the publisher and partner.
export const affiliateDestinations = {
  usedCarSearch: null,
  valuation: {
    partner: 'a8_s00000014380003',
    status: 'approved',
    // Flip only after OWNER approves production ad publication and the
    // exact listing URLs have been submitted to A8 after going live.
    enabled: false,
    creativeHtml: '<a href="https://px.a8.net/svt/ejp?a8mat=4BGVY4+36WOJ6+32YG+HYFLU" rel="nofollow">カーネクスト</a>\n<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4BGVY4+36WOJ6+32YG+HYFLU" alt="">',
  },
}

// These pages explain a generation change or model choice that commonly
// accompanies replacing an existing vehicle. Do not add a sale prompt to
// every visual comparison just because a partner has approved a creative.
const valuationPages = new Set([
  '/cars/noah.html', '/cars/voxy.html', '/cars/tanto.html',
  '/noah-80-vs-90.html', '/voxy-80-zenki-kouki.html',
  '/tanto-la600s-vs-la650s.html',
])

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
  if (destination?.status !== 'approved' || destination.enabled !== true ||
      !/^[a-z0-9_-]{1,40}$/.test(destination.partner ?? '')) return ''
  // A8 requires its supplied creative code, including the 1px impression tag,
  // to remain unmodified. Attach analytics to the surrounding container only.
  if (destination.partner.startsWith('a8_')) {
    const creative = destination.creativeHtml
    if (typeof creative !== 'string' || !/^\s*<a\s/i.test(creative) ||
        !/href=["']https:\/\//i.test(creative) || /<script|\son\w+\s*=|javascript:/i.test(creative)) return ''
    return `<p class="comparison-referral">PR・広告。外部サービスへ移動します。入力した個人情報は提携先の方針に従って取り扱われます。</p><div data-referral="${key}" data-partner="${destination.partner}">${creative}</div>`
  }
  let url
  try { url = new URL(destination.url) } catch { return '' }
  if (url.protocol !== 'https:' || url.username || url.password) return ''
  const href = url.href.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
  return `<p class="comparison-referral">PR・広告。外部サービスへ移動します。入力した個人情報は提携先の方針に従って取り扱われます。</p><a href="${href}" target="_blank" rel="sponsored noopener noreferrer" data-referral="${key}" data-partner="${destination.partner}">${linkText} ↗</a>`
}

export function vehicleDecisionHtml(destinations = affiliateDestinations, { pagePath } = {}) {
  const content = journeys.map(({ key, title, advice, linkText }) => {
    if (pagePath && key === 'valuation' && !valuationPages.has(pagePath)) return ''
    const link = approvedLink(destinations[key], linkText, key)
    return link ? `<details data-vehicle-intent="${key}"><summary>${title}</summary><p>${advice}</p>${link}</details>` : ''
  }).join('')
  if (!content) return ''
  return `<aside class="comparison-cta comparison-vehicle-decision" aria-labelledby="vehicle-decision-heading"><h2 id="vehicle-decision-heading">中古車購入・売却の準備</h2><div>${content}</div></aside>`
}
