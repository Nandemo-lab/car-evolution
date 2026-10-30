import { trackEvent } from './analytics.js'

const statusLabels = { changed: '変更あり', unchanged: '変更なし', conditional: '仕様による', unverified: '未確認' }

export function faceliftChangeMatrixHtml(items = []) {
  if (!items.length) return ''
  return `<section class="facelift-change-matrix" aria-labelledby="facelift-change-title"><p class="comparison-eyebrow">CHANGE MAP</p><h2 id="facelift-change-title">何が変わった？</h2><p class="facelift-tool-intro">公式発表で確認できた範囲だけを分類しています。「未確認」は変更なしという意味ではありません。</p><div class="facelift-change-list">${items.map(item => `<article><div><h3>${item.label}</h3><span class="change-status change-status--${item.status}">${statusLabels[item.status]}</span></div><p>${item.text}</p></article>`).join('')}</div></section>`
}

export function faceliftDetailCompareHtml(config) {
  if (!config?.parts?.length || config.images?.length !== 2) return ''
  return `<section class="facelift-detail-tool" aria-labelledby="facelift-detail-title"><p class="comparison-eyebrow">TAP TO INSPECT</p><h2 id="facelift-detail-title">部位を拡大して比べる</h2><p class="facelift-tool-intro">車種ごとに確認した位置を拡大します。画像は加工せず、表示範囲だけを切り替えます。</p><div class="facelift-part-buttons" role="group" aria-label="拡大する部位">${config.parts.map((part, index) => `<button type="button" data-facelift-part="${index}" data-part-id="${part.id}">${part.label}</button>`).join('')}</div><dialog class="facelift-detail-dialog" aria-labelledby="facelift-dialog-title"><div class="facelift-dialog-head"><div><small>前期・後期の部位比較</small><h3 id="facelift-dialog-title"></h3></div><button type="button" class="facelift-dialog-close" aria-label="拡大比較を閉じる"><span aria-hidden="true">×</span></button></div><div class="facelift-detail-grid"></div><div class="facelift-detail-point"><b>判別ポイント</b><p></p></div><p class="facelift-detail-note">制作画像は判別の補助です。実車はグレード、オプション、交換部品でも見え方が変わります。</p></dialog></section>`
}

const cropViewBox = (image, focus) => {
  const width = image.width || 1
  const height = image.height || 1
  const side = height * (focus.size / 100)
  const centerX = width * (focus.x / 100)
  const centerY = height * (focus.y / 100)
  return `${centerX - side / 2} ${centerY - side / 2} ${side} ${side}`
}

export function bindFaceliftDetailTools(root, config, context = {}) {
  if (!config?.parts?.length) return
  const dialog = root.querySelector('.facelift-detail-dialog')
  if (!dialog) return
  const title = dialog.querySelector('#facelift-dialog-title')
  const grid = dialog.querySelector('.facelift-detail-grid')
  const point = dialog.querySelector('.facelift-detail-point p')
  const close = dialog.querySelector('.facelift-dialog-close')
  let opener = null
  const closeDialog = () => dialog.open && dialog.close()
  close.addEventListener('click', closeDialog)
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog() })
  dialog.addEventListener('close', () => opener?.focus())
  root.querySelectorAll('[data-facelift-part]').forEach(button => button.addEventListener('click', () => {
    const part = config.parts[Number(button.dataset.faceliftPart)]
    if (!part) return
    opener = button
    title.textContent = part.label
    point.textContent = part.point
    grid.innerHTML = config.images.map((image, imageIndex) => {
      const focus = part.focus[imageIndex]
      return `<figure><div class="facelift-detail-viewport"><svg viewBox="${cropViewBox(image, focus)}" role="img" aria-label="${image.alt}の${part.label}" preserveAspectRatio="xMidYMid slice"><image href="${image.src}" width="${image.width}" height="${image.height}" /></svg></div><figcaption><b>${image.label}</b><span>${part.notes[imageIndex]}</span></figcaption></figure>`
    }).join('')
    if (typeof dialog.showModal === 'function') dialog.showModal()
    else dialog.setAttribute('open', '')
    trackEvent('open_facelift_detail_compare', { vehicle: context.vehicle, comparison: context.comparison, part: part.id })
  }))
}
