# PAJERO・SUBARU 3車種 公開品質記録（2026-11-07）

## 採用方式

- TOP：現行国内仕様を固定し、公式画像を外観根拠としてCarVistaの黒スタジオ条件で制作。
- 歴代：公式根拠で型式・発売期間・見分け方を掲載。1対1の公式外観照合が完了していない旧世代は、架空画像で埋めず「公式画像未掲載」の情報カードとする。
- PAJERO 2026年モデル：2026年12月17日発売予定。発売済み・初度登録可能とは扱わず、YEAR FINDERから除外。

## TOP画像ゲート

| 車種・代表仕様 | Automotive Accuracy | 構図一致 | 390px視認性 | 判定 |
|---|---:|---:|---:|---|
| PAJERO 2026 SUPER EXCEED | 96 | 95 | 92 | PASS |
| FORESTER Premium S:HEV EX | 96 | 96 | 94 | PASS |
| CROSSTREK Limited AWD | 95 | 95 | 93 | PASS |
| LEVORG GT-H EX | 95 | 97 | 94 | PASS |

根拠と対象部位は `vehicle-image-verification-registry.tsv` に登録。横並び比較は `outputs/new-cars-2026/visual-qa/top-comparison-6.webp` に保存した。左右反転・車体変形は行っていない。WebPは800×600、各約43–59KB。

## 歴代画像

- 採用：4車種の現行代表画像4点。
- 非採用：PAJERO旧4世代、FORESTER旧5世代、国内XV旧2世代、LEVORG初代。型式・販売期間は掲載するが、画像は一次資料との1対1照合が未完了のため掲載しない。
- 画像非掲載でも全世代の主要情報は初期HTMLに保持し、世代選択後の型式・期間・見分け方を表示する。

## 公式根拠

- MITSUBISHI PAJERO: https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2026/20261029_1.html
- SUBARU FORESTER: https://www.subaru.co.jp/news/2025_04_17_164724/
- SUBARU CROSSTREK: https://www.subaru.co.jp/news/2022_12_01_135725/
- SUBARU LEVORG: https://www.subaru.co.jp/press/news/2020_10_15_9094/

## 公開範囲

- `/cars/pajero.html`
- `/cars/forester.html`
- `/cars/crosstrek.html`
- `/cars/levorg.html`
- TOP、車名・かな・英字・型式検索、YEAR FINDER、静的一覧、sitemap、canonical、OGP、JSON-LDへ連携。
- 比較ページは同条件画像が揃わないため追加しない。
