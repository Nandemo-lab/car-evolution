import { escapeText } from './comparison-tools.js'
import { trackEvent } from './analytics.js'

const yearNumber = value => {
  const match = String(value || '').match(/(?:19|20)\d{2}/)
  return match ? Number(match[0]) : null
}

export function generationYearBounds(generation) {
  const years = String(generation.yearRange || generation.period || '').match(/(?:19|20)\d{2}/g)?.map(Number) || []
  const start = yearNumber(generation.startYear) ?? years[0] ?? null
  const current = /現在|現行/.test(`${generation.yearRange || ''}${generation.period || ''}`)
  const end = current ? new Date().getFullYear() : (years.at(-1) ?? start)
  return { start, end }
}

export function findGenerationsByYear(car, year) {
  const target = Number(year)
  if (!Number.isInteger(target)) return []
  return (car.generations || []).filter(generation => {
    const { start, end } = generationYearBounds(generation)
    return start !== null && end !== null && target >= start && target <= end
  })
}

export function buildDealerQuestions(car, year, candidates) {
  const candidateNames = candidates.map(item => `${item.era} ${item.title}`).join('／') || '該当する世代'
  return `${car.vehicleName}（初度登録${year}年）の確認をお願いします。\n1. 車検証の型式と、車台番号の先頭部分を教えてください。\n2. 製造時期と、${candidateNames}のどれに該当するか確認できますか。\n3. グレード、2WD／4WD、パワートレインを教えてください。\n4. フロントまわりの交換・社外部品・修復歴があれば、その箇所を教えてください。`
}

export function bindYearFinder(cars) {
  const form = document.querySelector('[data-year-finder-form]')
  if (!form) return
  const carSelect = form.querySelector('[data-year-car]')
  const yearSelect = form.querySelector('[data-year-value]')
  const output = document.querySelector('[data-year-result]')
  const now = new Date().getFullYear()

  carSelect.insertAdjacentHTML('beforeend', cars
    .slice().sort((a, b) => a.vehicleName.localeCompare(b.vehicleName, 'ja'))
    .map(car => `<option value="${escapeText(car.slug)}">${escapeText(car.vehicleName)}</option>`).join(''))
  yearSelect.insertAdjacentHTML('beforeend', Array.from({ length: now - 1989 }, (_, index) => now - index)
    .map(year => `<option value="${year}">${year}年</option>`).join(''))

  form.addEventListener('submit', event => {
    event.preventDefault()
    const car = cars.find(item => item.slug === carSelect.value)
    const year = Number(yearSelect.value)
    if (!car || !year) {
      output.innerHTML = '<p>車種と初度登録年を両方選んでください。</p>'
      return
    }
    const candidates = findGenerationsByYear(car, year)
    const isBoundary = candidates.length > 1 || candidates.some(item => generationYearBounds(item).start === year)
    if (!candidates.length) {
      output.innerHTML = `<p><strong>${escapeText(car.vehicleName)}の${year}年に該当する掲載世代は見つかりませんでした。</strong><br>年の入力を確認するか、歴代ページで販売期間を確認してください。</p><div class="year-result-actions"><a href="${escapeText(car.href || `/cars/${car.slug}.html`)}">歴代・型式を見る</a></div>`
      trackEvent('use_vehicle_year_finder', { vehicle: car.slug, result_count: 0, boundary: false })
      return
    }
    const questionText = buildDealerQuestions(car, year, candidates)
    output.innerHTML = `
      <p class="year-result-alert">${isBoundary ? '境界年または併売期間の可能性があります。初度登録年だけで1台に断定せず、候補を並べています。' : '年式から候補を絞りました。ただし初度登録年月と製造時期は別なので、型式と車両情報で確定してください。'}</p>
      <ul class="year-candidate-list">${candidates.map(item => `<li class="year-candidate"><b>${escapeText(item.era)} ${escapeText(item.title)}</b><span>主な型式：${escapeText(item.code)}</span><span>掲載上の期間：${escapeText(item.period)}</span></li>`).join('')}</ul>
      <div class="year-result-actions"><a href="${escapeText(car.href || `/cars/${car.slug}.html`)}">画像と歴代を確認</a><button type="button" class="year-question-copy">販売店への質問をコピー</button></div>`
    output.querySelector('.year-question-copy').addEventListener('click', async event => {
      const button = event.currentTarget
      await navigator.clipboard.writeText(questionText)
      button.textContent = '質問をコピーしました'
      trackEvent('copy_dealer_questions', { vehicle: car.slug, candidate_count: candidates.length, boundary: isBoundary })
    })
    trackEvent('use_vehicle_year_finder', { vehicle: car.slug, result_count: candidates.length, boundary: isBoundary })
  })
}
