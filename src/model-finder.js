import { escapeText } from './comparison-tools.js'
const japaneseNames = {alphard:'アルファード',vellfire:'ヴェルファイア',noah:'ノア',voxy:'ヴォクシー',esquire:'エスクァイア',prius:'プリウス',harrier:'ハリアー',sienta:'シエンタ',serena:'セレナ',stepwgn:'ステップワゴン','n-box':'エヌボックス',freed:'フリード','delica-d5':'デリカ',solio:'ソリオ',spacia:'スペーシア',tanto:'タント'}

export const normalizeModelQuery = value => String(value).normalize('NFKC').toLowerCase().replace(/[\s・－ー-]/g, '')

export function findModels(cars, query) {
  const terms = query.normalize('NFKC').trim().split(/\s+/).map(normalizeModelQuery).filter(Boolean)
  if (!terms.length) return []
  return cars.flatMap(car => car.generations.filter(g => {
    const text = normalizeModelQuery([car.maker, car.vehicleName, japaneseNames[car.slug], g.title, g.code, g.era].join(' '))
    return terms.every(term => text.includes(term))
  }).map(g => ({car, generation:g})))
}

export function bindModelFinder(cars) {
  const form = document.querySelector('#model-finder')
  if (!form) return
  const output = form.querySelector('[data-model-results]')
  form.addEventListener('submit', event => {
    event.preventDefault()
    const query = form.querySelector('input').value.trim()
    if (!query) { output.textContent='車名または型式を入力してください。'; return }
    const found = findModels(cars, query)
    output.innerHTML = found.length ? `<p>${found.length}件の候補。掲載している代表型式との照合結果です。</p><ul>${found.map(({car,generation:g})=>`<li><a href="/cars/${escapeText(car.slug)}.html"><strong>${escapeText(car.vehicleName)} ${escapeText(g.era)}・${escapeText(g.title)}</strong><span>${escapeText(g.period)} ／ ${escapeText(g.code)}</span></a></li>`).join('')}</ul>` : '<p>掲載データに一致する候補がありません。型式の一部（例：JF1）または車名で再検索してください。未掲載の型式もあるため、該当なしは車両の不存在を意味しません。</p>'
  })
}
