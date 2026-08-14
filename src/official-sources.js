const checkedAt = '2026年8月14日'

// Fallback sources for vehicles whose data module does not yet list
// generation-specific references. Vehicle modules may override these with
// their own `references` object when they need a more detailed breakdown.
export const officialSources = {
  ALPHARD: { checkedAt, items: [{ generations: '全世代', label: 'トヨタ認定中古車 アルファード車両情報', url: 'https://toyota.jp/ucar/catalog/brand-TOYOTA/car-ALPHARD/' }] },
  VELLFIRE: { checkedAt, items: [{ generations: '全世代', label: 'トヨタ認定中古車 ヴェルファイア車両情報', url: 'https://toyota.jp/ucar/catalog/brand-TOYOTA/car-VELLFIRE/' }] },
  ESQUIRE: { checkedAt, items: [{ generations: '80系', label: 'トヨタ認定中古車 エスクァイア車両情報', url: 'https://toyota.jp/ucar/catalog/brand-TOYOTA/car-ESQUIRE/' }] },
  SERENA: { checkedAt, items: [{ generations: '現行モデル', label: '日産 セレナ公式サイト', url: 'https://www3.nissan.co.jp/vehicles/new/serena.html' }] },
  FREED: { checkedAt, items: [{ generations: '現行モデル', label: 'Honda フリード公式サイト', url: 'https://www.honda.co.jp/FREED/' }] },
  SIENTA: { checkedAt, items: [{ generations: '現行モデル', label: 'トヨタ シエンタ公式サイト', url: 'https://toyota.jp/sienta/' }] },
  'DELICA D:5': { checkedAt, items: [{ generations: '全世代', label: '三菱 デリカD:5公式サイト', url: 'https://www.mitsubishi-motors.co.jp/lineup/delica_d5/' }] },
  SOLIO: { checkedAt, items: [{ generations: '現行モデル', label: 'スズキ ソリオ公式サイト', url: 'https://www.suzuki.co.jp/car/solio/' }] },
  'N-BOX': { checkedAt, items: [{ generations: '現行モデル', label: 'Honda N-BOX公式サイト', url: 'https://www.honda.co.jp/Nbox/' }] },
  SPACIA: { checkedAt, items: [{ generations: '現行モデル', label: 'スズキ スペーシア公式サイト', url: 'https://www.suzuki.co.jp/car/spacia/' }] },
}
