# 5車種制作・公開記録（2026-10-29）

## 範囲と統合

作業は codex/five-model-launch の隔離worktreeで実施。元作業ディレクトリの無関係な変更を含めない。
開始時は対象5車種のページ・Master Assetなし。公開直前のfetchで先行commit 73b81cc（VEZEL歴代と2024/2026比較）を検出し、fast-forwardで取り込んだ。
既存 /cars/vezel.html と /vezel-2024-vs-2026.html のURL・title・画像を維持。歴代には年表・例外・出典とRU/RV比較への導線を追記。新規公開は5比較ページ。

## 需要・優先順位

GSC実測：検索タイプWeb、2026-09-30〜2026-10-27、サイト全体50クリック／1,469表示／CTR3.4%／平均11.5位。
5車種の英語・日本語表記を正規表現で絞ると開示クエリは0件。匿名化分は確認できず、市場需要ゼロを意味しない。外部検索ボリューム数値は取得していない。

|優先|車種|推定する検索目的|実測との区別|
|---|---|---|---|
|1|VEZEL|2026年10月23日改良、RU/RVと同世代改良の区別|市場検索量は未計測。直近公式改良と検索結果に基づく仮説|
|2|RAV4|50/60系、HEV/PHEV、幅の違い|GSC対象クエリ未確認|
|3|CX-5|KF/KM、国内発売済みか、全長・後席・駆動方式|GSC対象クエリ未確認|
|4|DELICA MINI|2023/2025型式、4WD、DELIMARU装備条件|GSC対象クエリ未確認|
|5|ROOX|旧型2023改良と2025世代交代、B4/BB型式|GSC対象クエリ未確認|

検索結果の競合例（内容の根拠には使用しない）：
- VEZEL https://vzl-car.com/rekidai/
- RAV4 https://rv4-car.com/vs-kyugata/ 、https://factory.kinto-jp.com/magazine/k20260522-1/
- CX-5 https://www.beowner.jp/articles/comparison/cx5-third-generation-vs-kf/
- ROOX https://carscale.jp/guide/roox-history/
- DELICA MINI https://www.kobe-car.co.jp/info/news/1528/
競合から文章や画像を転用しない。代表仕様の固定、駐車場・荷物・装備確認の順序、型式の落とし穴で独自の判断材料を作る。

## 最大10候補の採否

|候補|判定|理由|
|---|---|---|
|VEZEL歴代|既存へ統合|先行公開を維持し、年表と型式の入口を拡充|
|VEZEL RU/RV比較|公開候補PASS|発売時Z・ハイブリッド・FF同士。既存2024/2026比較と目的を分離|
|RAV4歴代|HOLD|国内未導入世代との区分と全歴代画像の監査が未完。比較内容だけを複製しない|
|RAV4 50/60比較|公開候補PASS|HYBRID G/HEV Z・E-Four。AdventureやPHEVを代表諸元と混ぜない|
|CX-5歴代|HOLD|KEを含む歴代画像セット不足。独立ページの需要を実測していない|
|CX-5 KF/KM比較|公開候補PASS|2.5L・4WD。KFは2025年仕様、KMは2026年国内L|
|ROOX歴代|HOLD|DAYZ ROOXを含む呼称区分と旧世代画像の裏付けが不足|
|ROOX B4/BB比較|公開候補PASS|2023改良後と2025年型、ハイウェイスターGターボ・2WD|
|DELICA MINI歴代|HOLD|2世代の年表が新旧比較と重なる。独立した価値・需要の根拠不足|
|DELICA MINI B3/BA比較|公開候補PASS|T Premium系ターボ4WD。DELIMARU装備差を明示|

## 新規URL

- https://carvista.jp/vezel-ru-vs-rv.html
- https://carvista.jp/rav4-50-vs-60.html
- https://carvista.jp/cx-5-kf-vs-km.html
- https://carvista.jp/roox-b4-vs-bb.html
- https://carvista.jp/delica-mini-b3-vs-ba.html

## Asset考証

新規比較用10点を採用。仕様、一次資料、ハッシュ、表示補正は five-model-assets-2026-10-29.json に記録。
制作指示とは別の確認工程で公式画像・年式別グレード資料と突合。ランプ、グリル、バンパー、窓、ホイール、ルーフ、樹脂部を目視確認。
CX-5旧型の誤った赤いグリル縁と、デリカミニ新型の欠けたドア下黒色パネルを検出・修正。ルークスは縮小時の四角い余白を検出し、スタジオ背景ごと再構成。
白紙ナンバー、左前3/4、暗いスタジオ、同じ組の照明・床を照合。縦横比を保つ表示補正で実車長に対応する車体占有率と接地線を合わせた。画像だけから寸法を測れると主張しない。
生成画像は実車写真ではないことをページで明示。公式写真そのものは公開リポジトリに追加しない。
別途制作した2021年TOP用画像は先行公開との統合で不採用。旧版・修正前・未採用画像は公開しない。

## 検証

- Production build成功。Windowsチェックアウトの既存広告タグのCRLFをローカルでLFへ正規化しただけで、タグ内容・広告設定は変更していない。
- node tests：21件PASS。新規5ページの初期HTML・メタ・モデルアンカー・内部リンク・画像・型式検索を追加検査。
- サイトマップ：統合後80 URL。SERENA C26後期HOLD画像は参照しない検査PASS。
- コンテンツ監査：本文量・H1・画像・出典・近似重複を検査（これは審査合格や検索順位を保証する指標ではない）。
- 実Chrome：新規5ページを1440px／375px／390px、画像読込、詳細開閉、表内スクロール、ページ横overflow 0、Console Error/Warning 0。
- 統合したVEZEL、相互リンクを追加したHARRIER／N-BOX／DELICA D:5も3幅で確認。
- 画像カードの説明は開閉式で、写真を連続して見比べられる構成。既存ページは従来の表示を維持。
- 初期HTMLの本文・公式出典・canonical・OGP・JSON-LD・sitemapをbuildで生成。

## 測定基準

公開日を2026-10-29とし、公開途中の日を除いた2026-10-30から計測する。GSCの日付はGSCレポート表示基準で扱い、公開時刻JSTとは区別する。
- 7日：2026-10-30〜11-05。確定データが11-05まで揃ってから取得（目安11-08）。
- 28日：2026-10-30〜11-26。確定データが11-26まで揃ってから取得（目安11-29）。
- URL別クリック、表示、CTR、平均順位、開示クエリ、index状態、最終クロール日を保存。
- 新規ページの公開前は未存在なので増減率を算出しない。初週を最初の基準とし、以後は同じ日数・曜日構成で比較。
- 各ページ100表示未満などの小標本ではCTRだけでtitleを変更せず、観測継続。100表示も統計的有意差の保証ではない。
- VEZELの歴代・RU/RV・2024/2026が同一クエリで重なる場合も、検索意図と遷移先を確認してから判断し、自動統合・削除はしない。
- 月3万円は目標であり今回の公開による達成見込みを断定しない。実収益/RPM未取得。登録受付はindex完了、index完了は流入保証ではない。

## 公開・通知

公開commit、Vercel本番反映日時、各URLのSearch Console状態とIndexNow応答は、実行後の追記に記載する。
AdSense再申請・ASP申請・課金・既存URL削除/noindex・SERENA HOLD解除は実施しない。

## 公式根拠

### VEZEL
- [Honda 初代発売（2013年12月20日）](https://global.honda/jp/news/2013/4131219-vezel.html)
- [Honda 初代の主要諸元・開発資料](https://www.honda.co.jp/factbook/auto/VEZEL/201312/VEZEL_1312.pdf)
- [Honda 2018年2月改良](https://global.honda/jp/news/2018/4180215-vezel.html)
- [Honda 2代目発売（2021年4月23日）](https://global.honda/jp/news/2021/4210422-vezel.html)
- [Honda 2021年型の主要諸元・開発資料](https://www.honda.co.jp/factbook/auto/VEZEL/202104/202104_VEZEL.pdf)
- [Honda 2024年4月改良](https://global.honda/jp/news/2024/4240425-vezel.html)
- [Honda RS追加（2025年10月）](https://global.honda/jp/news/2025/4251023-vezel.html)
- [Honda 最新改良（2026年10月23日）](https://global.honda/jp/news/2026/4261022-vezel.html)

### RAV4
- [Toyota 2019年RAV4発売](https://global.toyota/jp/newsroom/toyota/27546080.html)
- [Toyota 2019年HYBRID Gの諸元](https://toyota.jp/ucar/catalog/brand-TOYOTA/car-RAV4/201904/10120929/)
- [Toyota 2025年新型HEV発売](https://global.toyota/jp/newsroom/toyota/43738655.html)
- [Toyota 現行諸元（2026年9月版）](https://toyota.jp/pages/contents/rav4/003_p_001/pdf/rav4_spec_202609.pdf)
- [Toyota PHEV・GR SPORT発売発表](https://toyotagazooracing.com/jp/pressrelease/2026/0219-01/)

### CX-5
- [Mazda 2021年CX-5大幅改良](https://newsroom.mazda.com/ja/publicity/release/2021/202111/211108a.html)
- [Mazda KFグレード・装備](https://www.mazda.co.jp/cars/passenger/cx-5_kf/grade/)
- [Mazda KF主要諸元（2025年10月）](https://www.mazda.co.jp/content/dam/mazda/official/mazda-co-jp/cars/cx-5_kf/common/pdf/cx-5_specification_202510.pdf)
- [Mazda 3代目国内発売（2026年5月21日）](https://newsroom.mazda.com/ja/publicity/release/2026/202605/260521a.html)
- [Mazda KMグレード比較](https://www.mazda.co.jp/cars/passenger/cx-5/grade/)
- [Mazda KM主要諸元（2026年5月）](https://www.mazda.co.jp/content/dam/mazda/official/mazda-co-jp/cars/cx-5/common/pdf/cx-5_specification_202605.pdf)

### ROOX
- [日産 2023年ルークス改良](https://global.nissannews.com/ja-JP/releases/230417-01-j)
- [日産 旧型カタログ・掲載仕様](https://www3.nissan.co.jp/vehicles/old/roox_ba1_2304.html)
- [日産 旧型主要諸元（2024年9月）](https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/roox/2409/pdf/roox_specsheet.pdf)
- [日産 新型ルークス発表](https://global.nissannews.com/ja-JP/releases/250919-01-j)
- [日産 新型の装備・機能](https://global.nissannews.com/ja-JP/releases/250822-01-j)
- [日産 発売時期の公式FAQ](https://faq2.nissan.co.jp/faq/show/78825?category_id=63&site_domain=default)
- [日産 新型主要諸元（2026年5月）](https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/roox/2605/pdf/roox_2605_specsheet_01.pdf)

### DELICA MINI
- [三菱 初代デリカミニ発売発表](https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2023/20230406_2.html)
- [三菱 2023年T Premium 4WD仕様](https://www.mitsubishi-motors.co.jp/lineup/autosalon/tas2023/pdf/delicamini.pdf)
- [三菱 B38Aベース車寸法（カスタム資料の注記参照）](https://www.mitsubishi-motors.co.jp/carlife/autosalon/tas2025/assets/pdf/axcr/delicamini_axcr2024_supportcar.pdf)
- [三菱 2025年Premium Limited](https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2025/20250403_1.html)
- [三菱 2代目発売発表](https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2025/20250918_3.html)
- [三菱 T Premium DELIMARU Package装備](https://www.mitsubishi-motors.co.jp/lineup/delica_mini/grade/t_premium_delimaru.html)
- [三菱 2代目主要諸元](https://www.mitsubishi-motors.co.jp/lineup/delica_mini/spec/pdf/delica_mini_spec.pdf)
