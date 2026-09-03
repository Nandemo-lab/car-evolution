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

const decisionGuides = {
  'freed-sienta': {
    answer: 'どちらも扱いやすい3列コンパクトミニバン。FREEDは直線的で見切りをつかみやすい道具感、SIENTAは丸みのある親しみやすさと2列・3列の選択肢が判断軸です。',
    points: [
      ['シート構成', 'FREEDは6人・7人乗りを中心に選択。SIENTAは5人乗りと7人乗りを用意。必要な列数から先に絞れます。'],
      ['パワートレイン', 'FREEDはガソリン／e:HEV、SIENTAはガソリン／ハイブリッド。名称は違っても、どちらも電動車を選べます。'],
      ['日常の扱いやすさ', '全幅はいずれも5ナンバー幅。駐車環境だけでなく、2列目の使い方と荷室を実車で確認するのが近道です。'],
    ],
    choices: [['FREEDが向く人', '四角い見切り、6人乗りの独立2列目、すっきりした内外装を重視する人。'], ['SIENTAが向く人', '5人乗りも含めて選びたい人、丸みのあるデザインと低い乗降口を重視する人。']],
    sources: [['Honda FREED 公式情報', 'https://www.honda.co.jp/FREED/'], ['トヨタ SIENTA 公式情報', 'https://toyota.jp/sienta/']],
  },
  'n-box-spacia': {
    answer: '軽規格の外寸は近くても、後席の工夫が違います。N-BOXは自然で落ち着いた操作感、SPACIAは後席のマルチユースフラップなど装備のアイデアで選び分けると明快です。',
    points: [
      ['後席', 'N-BOXは広い足元と左右独立スライド、SPACIAは座面先端のマルチユースフラップが特徴。後席に誰が乗るかで評価が変わります。'],
      ['走行系', '両車ともNA／ターボと2WD／4WDを設定。比較時は標準系とCustom系、同じ過給・駆動条件をそろえてください。'],
      ['見分け方', 'N-BOXは丸い灯火と水平基調、SPACIAはコンテナを思わせる四角いモチーフが入口です。'],
    ],
    choices: [['N-BOXが向く人', '穏やかな視界と素直な操作、生活になじむ標準車の表情を重視する人。'], ['SPACIAが向く人', '後席のサポート機能や遊び心のある道具感を重視する人。']],
    sources: [['Honda N-BOX 公式情報', 'https://www.honda.co.jp/Nbox/'], ['スズキ SPACIA 公式情報', 'https://www.suzuki.co.jp/car/spacia/']],
  },
  'noah-serena-stepwgn': {
    answer: '3台とも家族向けMクラスですが、選び方は顔だけではありません。NOAHは総合バランス、SERENAは運転支援とe-POWER、STEP WGNは水平視界と落ち着いた室内を軸に比べると違いが見えます。',
    points: [
      ['電動化', 'NOAHはハイブリッド、SERENAはe-POWER、STEP WGNはe:HEVを設定。仕組みと運転感覚が異なります。'],
      ['座席', 'いずれも7人乗り・8人乗りの設定がありますが、グレードで組み合わせが変わります。2列目を先に決めるのが実用的です。'],
      ['車幅と顔', '標準／エアロ系で寸法や表情が変わるため、比較画像の代表仕様と購入候補のグレードを混同しないでください。'],
    ],
    choices: [['NOAHが向く人', '家族用途のバランスと、ハイブリッドを含む選択肢の広さを重視。'], ['SERENAが向く人', 'e-POWERの走りや運転支援を優先。'], ['STEP WGNが向く人', '四角い見切りと水平基調の落ち着いた空間を優先。']],
    sources: [['トヨタ NOAH 公式情報', 'https://toyota.jp/noah/'], ['日産 SERENA 公式情報', 'https://www3.nissan.co.jp/vehicles/new/serena.html'], ['Honda STEP WGN 公式情報', 'https://www.honda.co.jp/STEPWGN/']],
  },
  'voxy-noah': {
    answer: '現行VOXYとNOAHは基本メカニズムや室内の骨格を共有する兄弟車です。大きな選び分けは、VOXYの精悍さとNOAHの堂々とした表情、そして選べるグレード構成です。',
    points: [
      ['基本性能', 'プラットフォーム、パワートレイン、主要な室内寸法は共通。顔つきだけで性能差があるように捉えないことが大切です。'],
      ['外観', 'VOXYは細い上部ランプと大きな下部開口、NOAHは横方向へ広がる大きなグリルが目印です。'],
      ['グレード', 'VOXYはエアロ系を中心に展開。NOAHは標準系とエアロ系があり、選択幅が異なります。'],
    ],
    choices: [['VOXYが向く人', '精悍で低く見える顔つきと、エアロ系の統一感を優先。'], ['NOAHが向く人', '落ち着いた標準系も含め、外観の選択幅を優先。']],
    sources: [['トヨタ VOXY 公式情報', 'https://toyota.jp/voxy/'], ['トヨタ NOAH 公式情報', 'https://toyota.jp/noah/']],
  },
  'alphard-vellfire': {
    answer: '40系の2台は車体の基本を共有しつつ、ALPHARDは品格、VELLFIREは運転する喜びとアグレッシブさを明確に分けています。単純な上下ではなく、外観とパワートレインの好みで選ぶ兄弟車です。',
    points: [
      ['キャラクター', 'ALPHARDは正統的な高級感、VELLFIREは力強い個性を公式に打ち出しています。'],
      ['エンジン', '代表的なガソリン車はALPHARDが2.5L、VELLFIREが2.4Lターボ。ハイブリッド系も設定されます。'],
      ['室内と車体', '基本パッケージは共通。外観の違いだけで室内の広さが大きく変わる車種関係ではありません。'],
    ],
    choices: [['ALPHARDが向く人', '落ち着いた品格と、同乗者中心の高級感を優先。'], ['VELLFIREが向く人', '力強い外観と、ターボを含む走りの個性を優先。']],
    sources: [['トヨタ ALPHARD 公式情報', 'https://toyota.jp/alphard/'], ['トヨタ VELLFIRE 公式情報', 'https://toyota.jp/vellfire/']],
  },
  'voxy-noah-esquire': {
    answer: 'ESQUIREは80系時代の上級兄弟車で、現行90系VOXY／NOAHとは世代が異なります。新車の兄弟比較ではなく、現行2台と中古ESQUIREをどう選ぶかを見るページです。',
    points: [
      ['世代', 'ESQUIREは2014年登場・2021年終了の80系。VOXY／NOAHの掲載車は2022年登場の90系です。'],
      ['選び方', '現行の安全・運転支援やパッケージを優先するなら90系、80系の上質な内外装を中古で選ぶならESQUIREが候補です。'],
      ['見分け方', 'ESQUIREは盾を思わせる縦長メッキグリル。90系VOXY／NOAHとはライトと開口部の構成が明確に違います。'],
    ],
    choices: [['VOXYが向く人', '現行装備と精悍なエアロ系デザインを優先。'], ['NOAHが向く人', '現行装備と、標準系を含む選択幅を優先。'], ['ESQUIREが向く人', '中古車前提で80系の上質な内外装を重視。']],
    sources: [['トヨタ NOAH／VOXY 2022年発売資料', 'https://global.toyota/jp/newsroom/toyota/36614622.html'], ['トヨタ ESQUIRE 2014年発売資料', 'https://global.toyota/jp/newsroom/toyota/21796684.html']],
  },
}

Object.assign(page, decisionGuides[slug] || {})

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

if (page.answer) {
  document.querySelector('.comparison-grid').insertAdjacentHTML('beforebegin', `<section class="comparison-answer" aria-label="3秒で分かる結論"><p class="comparison-eyebrow">3-SECOND ANSWER</p><h2>先に結論</h2><p>${page.answer}</p></section>`)
}

if (page.points) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-decision" aria-label="購入判断のポイント"><p class="comparison-eyebrow">DECISION GUIDE</p><h2>買う前に比べたいポイント</h2><div class="comparison-decision-grid">${page.points.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>`)
}

if (page.choices) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-decision" aria-label="どちらを選ぶ"><p class="comparison-eyebrow">WHICH ONE?</p><h2>どれが向く？</h2><div class="comparison-decision-grid">${page.choices.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>`)
}

if (page.sources) {
  document.querySelector('.comparison-more').insertAdjacentHTML('beforebegin', `
    <section class="comparison-sources" aria-label="公式根拠"><p class="comparison-eyebrow">FACT CHECK</p><h2>情報の確認</h2><p>${page.sources.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`).join('、')}を優先して、車種の位置づけ・装備・仕様を確認しています。</p><p class="comparison-byline">編集：CarVista編集部 · 確認日：2026年9月3日 · <a href="/editorial-policy.html">制作方針</a></p></section>`)
}

document.querySelector('.comparison-more').insertAdjacentHTML('afterend', `<footer class="comparison-trust"><nav><a href="/#all-cars">車種一覧</a><a href="/#comparison-links-title">比較ガイド</a><a href="/about.html">運営情報</a><a href="/editorial-policy.html">制作方針</a><a href="/privacy.html">プライバシー</a><a href="/contact.html">お問い合わせ</a></nav></footer>`)

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
    <section class="comparison-next" aria-label="次に見比べる"><p class="comparison-eyebrow">KEEP EXPLORING</p><h2>次に見比べる</h2><div class="comparison-next-grid">${page.related.map((item, index) => `<a class="comparison-next-card" href="${item.href}" data-related-link><img src="${item.image || page.images?.[page.cars[index % page.cars.length]?.vehicleName]?.standard || page.cars[index % page.cars.length]?.generations.at(-1)?.image}" alt="" loading="lazy" decoding="async" /><span><strong>${item.label}</strong><small>${item.description}</small><b>見る →</b></span></a>`).join('')}</div></section>`)
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
