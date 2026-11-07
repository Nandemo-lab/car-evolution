# 検索需要上位5ページ改善 — 2026-11-07

## 根拠

2026年11月2日にGoogle公式画面から保存した28日実測を使用した。GSC Wizardは契約終了により `payment_required` のため再契約していない。

- SOLIO歴代：112表示、1クリック、CTR 0.89%
- N-BOX JF1前後期：71表示、2クリック、CTR 2.82%
- NOAH歴代：246表示、13クリック
- VOXY歴代：118表示、7クリック
- タントLA600S前後期：52表示、6クリック、CTR 11.54%

## 変更前baseline

| URL | title | descriptionの要点 | canonical | H1 |
|---|---|---|---|---|
| `/cars/solio.html` | `SOLIO 歴代モデル一覧 — CarVista` | 全4世代・デザインの進化 | 自己参照 | `SOLIO` |
| `/n-box-jf1-zenki-kouki.html` | `N-BOX JF1前期・後期の違い｜2015年2月の見分け方` | 改良境界・グリル・バンパー | 自己参照 | `N-BOX JF1/JF2 前期・後期の違い` |
| `/cars/noah.html` | `ノア歴代の顔を比較｜60系・70系・80系・90系の見分け方` | 4世代・型式・標準／エアロ区別 | 自己参照 | `NOAH` |
| `/cars/voxy.html` | `ヴォクシー歴代の顔を比較｜60系・70系・80系・90系の見分け方` | 4世代・型式・ライト／グリル | 自己参照 | `VOXY` |
| `/tanto-la600s-zenki-kouki.html` | `標準タントLA600S前期・後期の違い｜2015年12月改良を比較` | 内装・商品構成・SAII判別注意 | 自己参照 | `標準タント LA600S 前期・後期の違い` |

## 採用した変更

- SOLIO：title・descriptionをMA15S／MA36S／MA37Sの検索意図へ最小修正。選択世代画像の直後に3つの見分け方とMA15S／MA36S前後期への導線を追加。
- N-BOX JF1：ヘッドライトは公式資料で灯体単独の変更を確認できないことを明示し、グリル・バンパーと合わせて画像直下に3項目を表示。
- NOAH：60／70／80／90系の短い見分け方と、80系前後期・VOXY比較への導線を選択世代画像の直後へ追加。
- VOXY：60／70／80／90系の短い見分け方と、80系前後期・NOAH比較への導線を選択世代画像の直後へ追加。
- タントLA600S：高CTRを保護し、title・description・H1・画像・関連導線を変更しない。

## 変更しないもの

広告枠、画像Asset、世代選択、比較スライダー、横並び／単独表示、canonical、OGP、JSON-LD、SERENA C26 HOLDは変更しない。

## 28日後の判定

SOLIOとN-BOXは表示・クリック・CTR・平均順位、NOAHとVOXYはOrganic landing sessions・`open_quick_comparison`・広告表示、タントはCTR・回遊・広告表示・CLSを同じ28日窓で比較する。母数が小さい場合は再変更せず観測を継続する。
