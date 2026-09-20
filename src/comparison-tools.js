// Pure calculations shared by the initial HTML and the browser.
export const escapeText = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))

export function millimetres(value) {
  const match = String(value).match(/^\s*([\d,]+)\s*mm\s*$/)
  return match ? Number(match[1].replaceAll(',', '')) : null
}

export function dimensionDifferences(rows) {
  return rows.map(([label, left, right]) => {
    const a = millimetres(left), b = millimetres(right)
    return { label, left: a, right: b, difference: a === null || b === null ? null : b - a }
  })
}

export function comparisonToolsHtml(data) {
  const esc = escapeText
  const differences = dimensionDifferences(data.dimensions)
  const rows = differences.map((row) => `<tr><th scope="row">${esc(row.label)}</th><td>${row.difference === null ? '条件が異なるため単純計算しません' : row.difference === 0 ? '掲載代表値は同じ' : `${row.difference > 0 ? '+' : '−'}${Math.abs(row.difference).toLocaleString('ja-JP')} mm`}</td></tr>`).join('')
  const checks = [
    { title:'比較する仕様をそろえる', text:data.cars.map(car => `${car.name}：${car.text}`).join(' ／ ') },
    ...data.identification,
    ...(data.used || []),
    { title:'装備の現車確認', text:'記事は代表仕様の比較です。メーカーオプション、特別仕様車、部品交換の有無は販売店に確認し、掲載画像だけで装着を判断しません。' },
  ]
  return `<section class="lc-section comparison-tools" aria-labelledby="dimension-difference-title"><p class="comparison-eyebrow">COMPARE THE NUMBERS</p><h2 id="dimension-difference-title">サイズの差を、数字で確かめる</h2><p class="lc-lead">${esc(data.cars[0].name)}を基準に、${esc(data.cars[1].name)}の掲載寸法がどれだけ変わるかを計算しました。</p><div class="lc-table-wrap"><table class="lc-table"><thead><tr><th scope="col">比較項目</th><th scope="col">右の車 − 左の車</th></tr></thead><tbody>${rows}</tbody></table></div><p class="lc-note">上の代表諸元からの差分です。室内・荷室の広さや乗り心地を示す数値ではありません。全幅だけではミラーやドアを開く余地まで分からず、全高だけでは機械式駐車場への適合は判断できません。</p><details class="comparison-notebook"><summary>この2台の確認メモを作る</summary><p>中古車情報を見ながら、確認できた項目をチェックしてください。チェックは購入可否や車両の安全性を判定するものではありません。入力は送信・保存されず、ページを閉じると消えます。</p><div class="inspection-checks">${checks.map((item, i) => `<label><input type="checkbox" data-inspection-check value="${i}"><span><strong>${esc(item.title)}</strong><small>${esc(item.text)}</small></span></label>`).join('')}</div><label class="inspection-notes-label" for="inspection-notes">販売店へ確認したいこと</label><textarea id="inspection-notes" rows="4" placeholder="例：掲載グレードと現車の装備が一致するか、改良前後を車台番号で確認できるか"></textarea><button type="button" data-download-inspection>確認メモを保存（テキスト）</button><p role="status" data-inspection-status></p><noscript><p>メモのダウンロードにはJavaScriptが必要です。確認項目はこのまま読めます。</p></noscript></details></section>`
}

export function bindComparisonTools(root, data) {
  const button = root.querySelector('[data-download-inspection]')
  if (!button) return
  button.addEventListener('click', () => {
    const lines = [...root.querySelectorAll('[data-inspection-check]')].map(input => `${input.checked ? '確認済み' : '未確認'}：${input.closest('label').innerText.trim()}`)
    const memo = [`CarVista ${data.vehicle} 比較確認メモ`, location.href, '', ...lines, '', '販売店への質問', root.querySelector('#inspection-notes').value, '', 'このメモは確認状況の整理用です。車両の仕様・状態・適合は販売店へ照会してください。'].join('\n')
    const url = URL.createObjectURL(new Blob(['\uFEFF'+memo], {type:'text/plain;charset=utf-8'}))
    const link = document.createElement('a')
    link.href = url; link.download = `carvista-${data.intent}-checklist.txt`; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    root.querySelector('[data-inspection-status]').textContent = '確認メモをダウンロードしました。'
  })
}
