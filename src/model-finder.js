import { escapeText } from './comparison-tools.js'
import { trackEvent } from './analytics.js'

const japaneseNames = {
  alphard: 'アルファード',
  vellfire: 'ヴェルファイア ベルファイア ヴェルファイヤ ベルファイヤ',
  noah: 'ノア',
  voxy: 'ヴォクシー ボクシー ヴォクシ',
  esquire: 'エスクァイア エスクワイア',
  prius: 'プリウス',
  harrier: 'ハリアー',
  sienta: 'シエンタ',
  serena: 'セレナ',
  stepwgn: 'ステップワゴン ステップワゴン',
  'n-box': 'エヌボックス エヌボクス NBOX',
  freed: 'フリード',
  'delica-d5': 'デリカ デリカD5',
  solio: 'ソリオ',
  spacia: 'スペーシア',
  tanto: 'タント',
  vezel: 'ヴェゼル ベゼル VEZEL',
  'corolla-cross': 'カローラクロス かろーらくろす COROLLACROSS',
  rav4: 'RAV4 ラブフォー ラヴフォー',
  'cx-5': 'CX5 シーエックスファイブ',
  roox: 'ルークス ROOX',
  'delica-mini': 'デリカミニ DELICAMINI',
  jimny: 'ジムニー シエラ ノマド JIMNY SIERRA NOMADE',
  aqua: 'アクア AQUA',
  yaris: 'ヤリス ヴィッツ ビッツ YARIS VITZ',
  raize: 'ライズ RAIZE',
  'n-one': 'エヌワン えぬわん NONE N ONE',
  'wagon-r-smile': 'ワゴンRスマイル ワゴンアールスマイル わごんあーるすまいる WAGONRSMILE',
}

const hiragana = value => value.replace(/[ァ-ヶ]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60))

export const normalizeModelQuery = value => hiragana(String(value).normalize('NFKC').toLowerCase())
  .replace(/[\s・･－ー―—ｰ_./\\-]/g, '')

function withinOneEdit(a, b) {
  if (a === b) return true
  if (Math.abs(a.length - b.length) > 1) return false
  let i = 0
  let j = 0
  let edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i += 1; j += 1; continue }
    if (++edits > 1) return false
    if (a.length > b.length) i += 1
    else if (b.length > a.length) j += 1
    else { i += 1; j += 1 }
  }
  return edits + Number(i < a.length || j < b.length) <= 1
}

function searchTokens(car, generation) {
  return [
    car.maker,
    car.vehicleName,
    ...(car.aliases || []),
    japaneseNames[car.slug],
    generation.title,
    generation.code,
    generation.era,
  ]
    .filter(Boolean)
    .flatMap(value => String(value).split(/[\s/／・,、]+/))
    .map(normalizeModelQuery)
    .filter(Boolean)
}

function tokenMatches(term, tokens) {
  if (tokens.some(token => token.includes(term))) return true
  // One edit is accepted only for names of four or more characters. This
  // catches small typing mistakes without making short model codes ambiguous.
  return term.length >= 4 && tokens.some(token => token.length >= 4 && withinOneEdit(term, token))
}

function guideBelongsToCar(guide, car) {
  const haystack = normalizeModelQuery([
    guide.href,
    guide.label,
    guide.title,
    guide.description,
  ].filter(Boolean).join(' '))
  const needles = [car.slug, car.vehicleName, ...(car.aliases || [])]
    .map(normalizeModelQuery)
    .filter(Boolean)
  return needles.some(needle => haystack.includes(needle))
}

export function findModels(cars, query) {
  const terms = query.normalize('NFKC').trim().split(/\s+/).map(normalizeModelQuery).filter(Boolean)
  if (!terms.length) return []
  return cars.flatMap(car => car.generations.filter(g => {
    const tokens = searchTokens(car, g)
    return terms.every(term => tokenMatches(term, tokens))
  }).map(g => ({car, generation:g})))
}

export function findModelDestinations(cars, query, limit = 8) {
  const matches = findModels(cars, query)
  const results = []
  const seen = new Set()
  for (const { car, generation } of matches) {
    const historyHref = car.href || `/cars/${car.slug}.html`
    if (!seen.has(historyHref)) {
      seen.add(historyHref)
      results.push({
        href: historyHref,
        label: `${car.vehicleName}の歴代・型式`,
        meta: `${generation.era} ${generation.title} ／ ${generation.code}`,
        kind: '歴代',
      })
    }
    for (const guide of (car.guides || []).filter(guide => guideBelongsToCar(guide, car))) {
      if (!guide.href?.startsWith('/') || seen.has(guide.href)) continue
      seen.add(guide.href)
      results.push({
        href: guide.href,
        label: guide.label || guide.title,
        meta: guide.description || `${car.vehicleName}の比較ガイド`,
        kind: '比較',
      })
    }
    if (results.length >= limit) break
  }
  return results.slice(0, limit)
}

export function classifyModelQuery(query) {
  const value = String(query).normalize('NFKC').trim()
  if (/^[A-Za-z0-9-]+$/.test(value) && /\d/.test(value)) return 'model_code'
  if (/[ぁ-んァ-ヶ一-龠]/.test(value)) return 'vehicle_name'
  return 'other'
}

export function bindModelFinder(cars) {
  const form = document.querySelector('#model-finder')
  if (!form) return
  const input = form.querySelector('input')
  const output = form.querySelector('[data-model-results]')
  let activeIndex = -1
  const resultLinks = () => [...output.querySelectorAll('a')]
  const setActive = index => {
    const links = resultLinks()
    if (!links.length) return
    activeIndex = (index + links.length) % links.length
    links.forEach((link, itemIndex) => {
      link.classList.toggle('is-active', itemIndex === activeIndex)
      link.setAttribute('aria-selected', String(itemIndex === activeIndex))
    })
    input.setAttribute('aria-activedescendant', links[activeIndex].id)
    links[activeIndex].scrollIntoView({ block: 'nearest' })
  }
  const render = (query, submitted = false) => {
    const destinations = findModelDestinations(cars, query)
    activeIndex = -1
    input.removeAttribute('aria-activedescendant')
    input.setAttribute('aria-expanded', String(Boolean(query)))
    if (!query) { output.replaceChildren(); input.setAttribute('aria-expanded', 'false'); return [] }
    output.innerHTML = destinations.length
      ? `<p>${destinations.length}件の候補。車名だけでも、歴代と比較ガイドへ進めます。</p><ul role="listbox" aria-label="検索候補">${destinations.map((item, index) => `<li><a id="model-result-${index}" role="option" aria-selected="false" href="${escapeText(item.href)}"><span class="model-result-kind">${escapeText(item.kind)}</span><strong>${escapeText(item.label)}</strong><span>${escapeText(item.meta)}</span></a></li>`).join('')}</ul>`
      : '<p class="model-results-empty"><strong>該当する車種が見つかりません。</strong><span>車名を短くするか、型式の一部で試してください。例：エヌボックス、VOXY、JF1</span></p>'
    output.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      trackEvent('open_model_finder_result', { destination: new URL(link.href).pathname })
    }))
    if (submitted) trackEvent('search_model_finder', { query_type: classifyModelQuery(query), result_count: destinations.length })
    return destinations
  }
  input.addEventListener('input', () => render(input.value.trim()))
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!resultLinks().length) return
      event.preventDefault()
      setActive(activeIndex + (event.key === 'ArrowDown' ? 1 : -1))
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      resultLinks()[activeIndex]?.click()
    } else if (event.key === 'Escape') {
      input.value = ''
      render('')
    }
  })
  form.addEventListener('submit', event => {
    event.preventDefault()
    const query = input.value.trim()
    if (!query) { output.textContent='車名または型式を入力してください。'; return }
    render(query, true)
  })
}
