import './comparison-page.css'
import './click-glow.js'
import voxy from './cars/voxy.js'
import { trackEvent } from './analytics.js'

const guides = [
  { generation: voxy.generations[1], note: 'ヘッドライトとグリルが上下に分かれた表情。' },
  { generation: voxy.generations[2], note: '縦方向の存在感が強いフロントマスク。' },
  { generation: voxy.generations[3], note: '横一文字の発光ラインが特徴。' },
]

const guideImages = [
  '/images/cars/voxy/top-70-standard-v3.jpg',
  '/images/cars/voxy/top-80-standard-v3.jpg',
  '/images/cars/voxy/top-90-standard-v3.jpg',
]

document.querySelector('#comparison-page').innerHTML = `
  <header class="comparison-hero">
    <a class="comparison-home" href="/">CARVISTA</a>
    <p class="comparison-eyebrow">IDENTIFICATION GUIDE</p>
    <h1>VOXY 70・80・90系の見分け方</h1>
    <p class="comparison-intro">フロントマスクを並べると、世代ごとの違いがひと目でわかります。年式の目安とあわせて確認してください。</p>
    <div class="comparison-actions"><button class="share-button" type="button">共有する</button><button class="copy-button" type="button">URLをコピー</button></div>
  </header>
  <section class="comparison-grid" aria-label="VOXY世代の比較">
    ${guides.map(({ generation, note }, index) => `
      <a class="comparison-card comparison-card--voxy comparison-card--voxy-${index + 1}" href="/cars/voxy.html">
        <img src="${guideImages[index] || generation.image}" alt="VOXY ${generation.title}" loading="lazy" decoding="async" />
        <span class="comparison-card-copy"><span class="comparison-card-name">${generation.title}</span><span class="comparison-card-meta">${generation.period}</span><span class="comparison-card-note">${note}</span></span>
      </a>`).join('')}
  </section>
  <section class="comparison-guide-note" aria-label="掲載基準"><p>掲載画像は、各世代の代表的な仕様を同一条件で比較しやすいようCarVistaが制作したビジュアル表現です。比較のため、車名エンブレムとナンバープレートは省略しています。前期・後期やグレードによる細部の違いは、各ページの世代情報もあわせて確認してください。</p></section>
  <section class="comparison-focus" aria-label="年式と型式の目安">
    <p class="comparison-eyebrow">TIMELINE</p><h2>年式と型式で、最後に照合する</h2>
    <p class="comparison-focus-intro">外観で世代の候補を絞ったら、販売年と型式表記を照合します。登録時期・中古車の初度登録年だけで断定せず、写真と車両情報を一緒に確認してください。</p>
    <div class="comparison-next-grid">
      <div><strong>70系｜2007年〜2014年</strong><span>ZRR70G / ZRR75G。ライトとグリルが分かれた顔が入口です。</span></div>
      <div><strong>80系｜2014年〜2021年</strong><span>ZRR80G / ZRR85G / ZWR80G。縦方向に大きく見えるフロントを確認します。</span></div>
      <div><strong>90系｜2022年〜現在</strong><span>MZRA90W / ZWR90W ほか。横一文字に見える発光ラインが目印です。</span></div>
    </div>
  </section>
  <section class="comparison-focus" aria-label="中古車での確認順">
    <p class="comparison-eyebrow">USED CAR CHECK</p><h2>中古車写真では、この順で見る</h2>
    <p class="comparison-focus-intro">①ライトとグリルのつながり方で70・80・90系を判定。②初度登録年と型式を照合。③前期・後期やグレード差は、個別の車両写真と販売店の車両情報で確認します。</p>
  </section>
  <a class="comparison-more" href="/cars/voxy.html">VOXYの歴代モデル一覧を見る</a>`

document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
  <section class="comparison-reading" aria-label="VOXY世代の見分け方">
    <p class="comparison-eyebrow">IDENTIFICATION NOTES</p><h2>フロントマスクで見る、3世代の違い</h2>
    <article><h3>70系は、ライトとグリルが分かれた表情</h3><p>70系は、ライトとグリルがそれぞれ独立して見える構成が目印です。箱型ミニバンの実用感を残しつつ、フロント中央に視線が集まるつくりになっています。中古車の写真で見分けるときは、グリルの輪郭と丸型フォグランプの位置を確認すると判断しやすくなります。</p></article>
    <article><h3>80系は、縦方向の存在感が強い</h3><p>80系では、ライトからグリルへ続く縦方向の表現がより強くなりました。フロントマスク全体に高さが生まれ、70系よりも表情が前に出て見えます。年式やグレードで細部は変わるため、まずはライト周辺とグリルの面積のバランスを見るのがおすすめです。</p></article>
    <article><h3>90系は、横一線の光で新しい世代とわかる</h3><p>90系は、横に広がるライトの印象が最もわかりやすい特徴です。グリルとライトを一体に見せることで、より低くワイドなフロントマスクになっています。世代の入口としてこの見分け方を使い、詳しい変化はVOXYの歴代ページで追うと、デザインの流れを自然に理解できます。</p></article>
  </section>`)

document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
  <section class="comparison-next" aria-label="関連ページ">
    <p class="comparison-eyebrow">CONTINUE EXPLORING</p><h2>次に確認する</h2>
    <div class="comparison-next-grid">
      <a href="/cars/voxy.html"><strong>VOXY 歴代モデル一覧</strong><span>60系から90系まで、世代の流れを見る。</span><b>VIEW →</b></a>
      <a href="/compare-voxy-noah.html"><strong>VOXY・NOAHの違い</strong><span>同世代の兄弟車を同じ視点で比べる。</span><b>COMPARE →</b></a>
    </div>
  </section>`)

async function copyUrl(button, message) {
  await navigator.clipboard.writeText(location.href)
  button.textContent = message
}

document.querySelector('.share-button').addEventListener('click', async (event) => {
  trackEvent('share_identification_guide', { vehicle: 'VOXY', method: navigator.share ? 'native' : 'copy' })
  if (navigator.share) return navigator.share({ title: document.title, text: 'VOXY 70・80・90系の見分け方', url: location.href })
  await copyUrl(event.currentTarget, 'URLをコピーしました')
})

document.querySelector('.copy-button').addEventListener('click', (event) => {
  trackEvent('copy_identification_guide_url', { vehicle: 'VOXY' })
  return copyUrl(event.currentTarget, 'コピーしました')
})
