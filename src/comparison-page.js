import './comparison-page.css'
import './click-glow.js'
import voxy from './cars/voxy.js'
import noah from './cars/noah.js'
import serena from './cars/serena.js'
import stepwgn from './cars/stepwgn.js'
import esquire from './cars/esquire.js'
import alphard from './cars/alphard.js'
import vellfire from './cars/vellfire.js'
import freed from './cars/freed.js'
import sienta from './cars/sienta.js'
import nBox from './cars/n-box.js'
import spacia from './cars/spacia.js'
import { trackEvent } from './analytics.js'
import { affiliateDestinations } from './affiliate.js'

const pages = {
  'noah-serena-stepwgn': {
    eyebrow: 'SIDE BY SIDE',
    title: 'NOAH・SERENA・STEP WGNの違い',
    intro: '家族で使うMクラスミニバンの3台を、同じ視点で並べました。フロントマスクから、それぞれが目指すキャラクターを見比べます。',
    guideNote: 'ここでは、現行モデルの代表的な仕様を同一条件で比較しています。装備や価格ではなく、まずデザインがつくる印象に注目してください。',
    cars: [noah, serena, stepwgn],
    images: {
      NOAH: { standard: '/images/comparisons/noah-serena-stepwgn-noah-v1.png' },
      SERENA: { standard: '/images/comparisons/noah-serena-stepwgn-serena-v1.png' },
      STEPWGN: { standard: '/images/comparisons/noah-serena-stepwgn-stepwgn-v1.png' },
    },
    reading: [
      { heading: '同じクラスでも、まず顔つきの考え方が違う', text: 'NOAH、SERENA、STEP WGNは、いずれも家族で使うミニバンとして検討されやすい3台です。並べて見ると、似た背の高いボディでありながら、ライト、グリル、バンパーの組み立て方がそれぞれ異なることがわかります。' },
      { heading: 'NOAHは、端正で安定感のある表情', text: 'NOAHは横方向に整えた線と落ち着いた面構成で、端正で安定感のある印象をつくっています。強い主張よりも、家族で長く付き合いやすい穏やかな表情を選びたい人に向く方向です。' },
      { heading: 'SERENAは、存在感を前に出す表情', text: 'SERENAはグリルの横線とフロントの立体感によって、正面から見たときの存在感を強めています。ミニバンらしい堂々とした印象を求める人は、フロント全体の厚みと明暗のつき方に注目すると選びやすくなります。' },
      { heading: 'STEP WGNは、道具としての素直さを感じる表情', text: 'STEP WGNは、四角く整った輪郭とシンプルなフロントマスクで、すっきりとした印象をつくっています。装飾を重ねるより、見通しのよさや日常になじむ雰囲気を大切にしたい人に合う方向です。' },
    ],
    notes: {
      NOAH: '端正で安定感のある、水平基調の表情。',
      SERENA: '横線と立体感で、堂々とした存在感をつくる表情。',
      STEPWGN: '四角く整った輪郭を活かした、すっきりした表情。',
    },
    related: [
      { href: '/compare-voxy-noah.html', label: 'VOXYとNOAHの違い', description: '兄弟車のフロントマスクを、同じ条件で見る。' },
      { href: '/cars/voxy.html', label: 'VOXYの歴代・見分け方', description: '世代ごとの違いと型式を本体ページで確認する。' },
    ],
  },
  'voxy-noah': {
    eyebrow: 'SIDE BY SIDE',
    title: 'VOXY・NOAHの違い',
    intro: '共通する実用性の中で、2台のフロントマスクは異なる印象を目指しています。並べて見ると、その選び分けが見えてきます。',
    guideNote: 'ここでは、現行モデルの代表的な仕様を同じ視点・同じ条件で並べ、デザインがつくる印象に注目して比較します。',
    cars: [voxy, noah],
    images: {
      VOXY: { standard: '/images/cars/voxy/compare-standard-v1.png' },
      NOAH: { standard: '/images/cars/noah/compare-standard-v1.png' },
    },
    reading: [
      { heading: '共通の基本構成に、異なる顔つきを与えた2台', text: 'VOXYとNOAHは近い基本構成を共有する兄弟車です。そのため、まず注目したいのはフロントマスクのつくり方です。ライト、グリル、バンパーの線を同じ角度で見比べると、似ている部分と、見せたい印象を分ける部分が読み取りやすくなります。' },
      { heading: 'VOXYは、シャープさと動きのある表情', text: 'VOXYは、ライトの輪郭と前に出るフロントマスクによって、低く、引き締まった印象をつくっています。ミニバンとしての実用性を保ちながらも、停車中に少し動きを感じさせる表情を求める人に向く方向です。' },
      { heading: 'NOAHは、端正で安定感のある表情', text: 'NOAHは、横方向にまとまった線と落ち着いた面構成で、端正で安定感のある表情をつくっています。家族で使う場面を思い浮かべながら、強い主張よりも整った印象を選びたい人には、その違いが判断の手がかりになります。' },
    ],
    notes: {
      VOXY: 'シャープでダイナミック。前に出る表情。',
      NOAH: '端正で安定感のある、水平基調の表情。',
    },
    related: [
      { href: '/compare-noah-serena-stepwgn.html', label: 'NOAH・SERENA・STEP WGNの違い', description: 'Mクラスミニバン3台の個性を並べて見る。' },
      { href: '/cars/voxy.html', label: 'VOXYの歴代・見分け方', description: '世代ごとの違いと型式を本体ページで確認する。' },
    ],
  },
  'freed-sienta': {
    eyebrow: 'SIDE BY SIDE',
    title: 'FREED・SIENTAの違い',
    intro: '家族で使うコンパクトミニバンの2台を、同じ視点で並べました。取り回しのよさを保ちながら、顔つきの考え方がどう違うかを見比べます。',
    guideNote: 'ここでは、現行モデルの代表的な仕様を同じ条件で比較しています。装備や価格ではなく、まずフロントマスクがつくる印象に注目してください。',
    cars: [freed, sienta],
    images: {
      FREED: { standard: '/images/cars/freed/compare-standard-v2.png' },
      SIENTA: { standard: '/images/cars/sienta/compare-standard-v3.png' },
    },
    reading: [
      { heading: '近いサイズ感でも、表情のつくり方は異なる', text: 'FREEDとSIENTAは、どちらも日常で扱いやすいサイズの3列シートミニバンです。並べて見ると、ライトの置き方、グリルの存在感、バンパーの面の使い方に、それぞれの個性が表れています。' },
      { heading: 'FREEDは、見通しのよさを感じる端正な表情', text: 'FREEDは、水平に整えたライトとすっきりした面構成で、道具としての素直さを感じる表情です。家族の移動を気負わず支える雰囲気を重視したい人に向く方向です。' },
      { heading: 'SIENTAは、やわらかな造形で親しみをつくる', text: 'SIENTAは、丸みのある輪郭と灯火類の個性的な配置で、親しみやすさを強く打ち出します。ミニバンらしい実用性に、少し遊び心のあるデザインを求める人に合う方向です。' },
    ],
    notes: {
      FREED: '水平基調で、端正かつ見通しのよい表情。',
      SIENTA: '丸みのある輪郭で、親しみをつくる表情。',
    },
    related: [
      { href: '/compare-n-box-spacia.html', label: 'N-BOXとSPACIAの違い', description: '軽スーパーハイトワゴン2台の表情を比べる。' },
      { href: '/cars/freed.html', label: 'FREEDの歴代モデル', description: '世代ごとのデザインの変化を見る。' },
    ],
  },
  'n-box-spacia': {
    eyebrow: 'SIDE BY SIDE',
    title: 'N-BOX・SPACIAの違い',
    intro: '軽スーパーハイトワゴンを代表する2台を、同じ視点で並べました。背の高いボディに、どんな表情とキャラクターを与えているかを見比べます。',
    guideNote: 'ここでは、現行モデルの代表的な仕様を同じ条件で比較しています。グレードや装備の優劣ではなく、デザインがつくる印象に注目してください。',
    cars: [nBox, spacia],
    images: {
      'N-BOX': { standard: '/images/cars/n-box/compare-standard-v3.png' },
      SPACIA: { standard: '/images/cars/spacia/compare-standard-v1.png' },
    },
    reading: [
      { heading: '使いやすさの方向は近く、表情の方向は違う', text: 'N-BOXとSPACIAは、どちらも背の高い室内空間を特徴とする軽自動車です。フロントマスクを並べると、ライト、グリル、ボンネットの面のつながりに、異なる個性が見えてきます。' },
      { heading: 'N-BOXは、直線を抑えた落ち着きのある顔つき', text: 'N-BOXは、丸みを残した面と整った灯火類で、毎日に馴染む穏やかな表情をつくっています。過度な主張より、安心感や見慣れた印象を大切にしたい人に合う方向です。' },
      { heading: 'SPACIAは、軽やかさと視覚的な楽しさを打ち出す', text: 'SPACIAは、細かな造形の変化と明るい表情で、軽やかさをつくっています。実用性に加え、見た目の楽しさや個性を求める人に向く方向です。' },
    ],
    notes: {
      'N-BOX': '穏やかで、毎日に馴染む整った表情。',
      SPACIA: '軽やかさと親しみを打ち出す表情。',
    },
    related: [
      { href: '/compare-freed-sienta.html', label: 'FREEDとSIENTAの違い', description: 'コンパクトミニバン2台の表情を比べる。' },
      { href: '/cars/n-box.html', label: 'N-BOXの歴代モデル', description: '世代ごとのデザインの変化を見る。' },
    ],
  },
  'voxy-noah-esquire': {
    eyebrow: 'SIDE BY SIDE',
    title: 'VOXY・NOAH・ESQUIREを見比べる',
    intro: '現行VOXY・NOAHと、80系時代の上級兄弟車ESQUIREを並べ、フロントマスクの考え方の違いを見比べます。',
    guideNote: '現行VOXY・NOAHと生産を終えたESQUIREを比べるページです。年式や装備の優劣ではなく、兄弟車に与えられたフロントマスクの個性に注目してください。',
    timeline: [
      { title: '2014年〜2021年', text: 'ESQUIREは80系VOXY・NOAHと同時代の上級兄弟車。' },
      { title: '2022年〜現在', text: 'VOXY・NOAHは90系へフルモデルチェンジ。' },
      { title: 'このページの見方', text: '3台を同年式・装備の優劣として比べず、フロントマスクの個性として読む。' },
    ],
    cars: [voxy, noah, esquire],
    images: {
      VOXY: { standard: '/images/cars/voxy/compare-standard-v1.png' },
      NOAH: { standard: '/images/cars/noah/compare-standard-v1.png' },
      ESQUIRE: { standard: '/images/cars/esquire/compare-standard-v1.png' },
    },
    reading: [
      { heading: '共通の土台から、異なる表情へ', text: 'ESQUIREは80系VOXY・NOAHをベースにした上級兄弟車で、販売は2021年に終了しました。一方、ここで並べるVOXY・NOAHは2022年登場の90系です。世代はそろっていませんが、兄弟車それぞれのフロントマスクが目指した存在感を読み比べられます。グリルの形、ライトのつながり方、クロームの量に注目してください。' },
      { heading: 'VOXYは、動きのある表情を選びたい人へ', text: 'VOXYは、シャープなライトと前に出るフロントマスクが特徴です。ミニバンらしい実用性を保ちながらも、停車中に少し低く、速く見える表情をつくっています。歴代モデルを見るときは、ライトの輪郭とグリルの主張の変化を追うと、VOXYらしい方向性がわかります。' },
      { heading: 'NOAHとESQUIREは、落ち着きと上質感で分かれる', text: 'NOAHは水平基調のまとまりによって、端正で安心感のある表情をつくります。ESQUIREはクロームの使い方を強め、同じサイズのボディによりフォーマルな印象を与えます。購入前の比較では、ボディカラーやグレードだけでなく、普段どんな場面でこの顔つきを見るかを想像すると選びやすくなります。' },
    ],
    notes: {
      VOXY: 'シャープでダイナミック。フロント全体に強い張りを感じる表情。',
      NOAH: '横方向の落ち着きが中心。端正で安定感のある表情。',
      ESQUIRE: 'クロームの存在感が際立つ、より洗練された表情。',
    },
    related: [
      { href: '/cars/voxy.html', label: 'VOXYの歴代モデル', description: '80系から90系へのデザインの変化を見る。' },
      { href: '/cars/esquire.html', label: 'ESQUIREのモデル情報', description: '80系時代の上級兄弟車として確認する。' },
    ],
  },
  'alphard-vellfire': {
    eyebrow: 'SIDE BY SIDE',
    title: 'Alphard・Vellfireの違い',
    intro: '同じ世代の2台を並べると、フロントマスクが目指す個性の差が見えてきます。',
    guideNote: 'ここでは、CarVistaが各モデルの代表的な仕様として掲載している画像をもとに、デザイン上の印象を比較しています。',
    cars: [alphard, vellfire],
    images: {
      ALPHARD: { standard: '/images/cars/alphard/compare-standard-v3.png', detail: '/images/cars/alphard/compare-front-detail-v4.png' },
      VELLFIRE: { standard: '/images/cars/vellfire/compare-standard-v3.png', detail: '/images/cars/vellfire/compare-front-detail-v4.png' },
    },
    focus: [
      { name: 'Alphard', label: '整った面と大きなグリルの構成', image: '/images/cars/alphard/compare-front-detail-v4.png' },
      { name: 'Vellfire', label: '鋭いライトと重層的なグリルの構成', image: '/images/cars/vellfire/compare-front-detail-v4.png' },
    ],
    reading: [
      { heading: '共通の土台に、異なるキャラクターを与えた2台', text: 'AlphardとVellfireは、基本となるボディの存在感を共有しながら、フロントマスクで受ける印象を明確に分けています。CarVistaでは、同じ角度・同じ条件のビジュアルにそろえることで、サイズ感ではなく、ライト、グリル、バンパーの構成による違いを見やすくしています。' },
      { heading: 'Alphardは威厳、Vellfireは前に出る個性', text: 'Alphardは大きな面と整った線によって、落ち着きと威厳を感じさせる方向です。一方のVellfireは、より大胆な造形と鋭い要素で、強い個性を前に出します。どちらが上という比較ではなく、乗る人が求める見られ方に合わせて選ぶ2台だと考えると、その違いがつかみやすくなります。' },
    ],
    notes: {
      Alphard: '存在感と威厳を軸にした、落ち着きのあるフロントマスク。',
      Vellfire: 'より大胆でアグレッシブ。個性を前に出したフロントマスク。',
    },
  },
}

const slug = document.documentElement.dataset.comparison
const page = pages[slug]
if (!page) throw new Error(`Unknown comparison page: ${slug}`)

const cards = page.cars.flatMap((car) => {
  const generations = page.cars.length === 1 ? car.generations : [car.generations.at(-1)]
  return generations.map((generation) => `
    <a class="comparison-card" href="/cars/${car.vehicleName.toLowerCase().replaceAll(' ', '-')}.html">
      <img src="${page.images?.[car.vehicleName]?.standard || generation.image}" alt="${car.vehicleName} ${generation.title}" decoding="async" />
      <span class="comparison-card-copy">
        <span class="comparison-card-name">${car.vehicleName}</span>
        <span class="comparison-card-meta">${generation.title} · ${generation.period}</span>
        ${page.notes?.[car.vehicleName] ? `<span class="comparison-card-note">${page.notes[car.vehicleName]}</span>` : ''}
      </span>
    </a>`)
}).join('')

document.querySelector('#comparison-page').innerHTML = `
  <header class="comparison-hero">
    <a class="comparison-home" href="/">CARVISTA</a>
    <p class="comparison-eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p class="comparison-intro">${page.intro}</p>
    <div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div>
  </header>
  <section class="comparison-grid" aria-label="比較一覧">${cards}</section>
  ${page.guideNote ? `<section class="comparison-guide-note" aria-label="比較の基準"><p>${page.guideNote}</p></section>` : ''}
  <a class="comparison-more" href="/#all-cars">ほかの車種の進化を見る</a>`

if (page.reading) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-reading" aria-label="デザインの読み解き">
      <p class="comparison-eyebrow">DESIGN NOTES</p><h2>見比べるポイント</h2>
      ${page.reading.map((item) => `<article><h3>${item.heading}</h3><p>${item.text}</p></article>`).join('')}
    </section>`)
}

if (page.timeline) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-focus" aria-label="比較する年式の整理">
      <p class="comparison-eyebrow">TIMELINE</p><h2>比較する世代を先に整理する</h2>
      <div class="comparison-next-grid">${page.timeline.map((item) => `<div><strong>${item.title}</strong><span>${item.text}</span></div>`).join('')}</div>
    </section>`)
}

if (page.focus) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-focus" aria-label="フロントマスクの比較">
      <p class="comparison-eyebrow">FRONT MASK FOCUS</p><h2>顔つきを、同じ角度で読む</h2>
      <p class="comparison-focus-intro">フロントマスクの違いがもっとも読み取りやすい、正面寄りの共通アングルです。ライト、グリル、バンパーのつながりに注目して見比べてください。</p>
      <div class="comparison-focus-grid">${page.focus.map((item) => `<figure><img src="${item.image}" alt="${item.name}のフロントマスク" loading="lazy" decoding="async" /><figcaption><strong>${item.name}</strong><span>${item.label}</span></figcaption></figure>`).join('')}</div>
    </section>`)
}

if (page.related) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-next" aria-label="次に見比べる"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>次に見比べる</h2><div class="comparison-next-grid">${page.related.map((item) => `<a href="${item.href}" data-related-link><strong>${item.label}</strong><span>${item.description}</span><b>見る →</b></a>`).join('')}</div></section>`)
}

function renderUsedCarCta() {
  const destination = affiliateDestinations.usedCarSearch
  if (!destination?.url || !destination?.label) return

  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <aside class="comparison-cta" aria-label="中古車検索のご案内">
      <p>PR</p><h2>見比べて気になるモデルが見つかったら、中古車を探す</h2>
      <span>年式や条件を指定して、在庫を確認できます。外部の中古車検索サービスへ移動します。</span>
      <a href="${destination.url}" target="_blank" rel="sponsored noopener noreferrer" data-used-car-cta>${destination.label}<b aria-hidden="true">↗</b></a>
    </aside>`)

  document.querySelector('[data-used-car-cta]').addEventListener('click', () => {
    trackEvent('click_used_car_search', { comparison: slug, partner: destination.partner || 'unknown' })
  })
}

renderUsedCarCta()

async function copyUrl(button, message) {
  await navigator.clipboard.writeText(location.href)
  button.textContent = message
}

document.querySelector('.share-button').addEventListener('click', async (event) => {
  trackEvent('share_comparison', { comparison: slug, method: navigator.share ? 'native' : 'copy' })
  if (navigator.share) return navigator.share({ title: document.title, text: page.title, url: location.href })
  await copyUrl(event.currentTarget, 'URLをコピーしました')
})

document.querySelector('.copy-button').addEventListener('click', (event) => {
  trackEvent('copy_comparison_url', { comparison: slug })
  return copyUrl(event.currentTarget, 'コピーしました')
})

document.querySelectorAll('[data-related-link]').forEach((link) => {
  link.addEventListener('click', () => trackEvent('open_related_comparison', { comparison: slug, destination: link.getAttribute('href') }))
})

trackEvent('view_comparison', { comparison: slug })
