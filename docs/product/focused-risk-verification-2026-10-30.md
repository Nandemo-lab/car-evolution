# CarVista 未確認情報のリスク低減・重点考証（2026-10-30）

## 判定基準

- `VERIFIED`: 同時期・同じ車種／世代・対象グレード系統を明示したメーカー一次資料の画像または諸元表と、公開Asset／数値を個別照合できた。
- `CORRECTED`: 一次資料との不一致を確認し、公開値を訂正した。
- `HOLD`: 車種・改良時期の資料はあるが、同じグレード・駆動・パワートレインまで1対1に固定できない、または公式画像が不足する。未確認部分を推測で埋めない。
- 公式URLが開けるだけでは証拠とせず、下表の「該当箇所」を再調査防止キーとする。

## 重点画像20件

| Asset | 結果 | 一次資料の該当箇所／理由 |
|---|---|---|
| `n-box/gen1-2011.png` | VERIFIED | Honda 2011-11-30製品画像、標準N-BOX G・Lパッケージ系のグリル／灯火／バンパー |
| `n-box/jf1-2015-post-facelift-v1.png` | VERIFIED | Honda 2015-02-05資料の掲載車「N-BOX G・Lパッケージ」 |
| `n-box/jf3-custom-pre-facelift-v1.png` | VERIFIED | Honda 2017-08-31発売資料、N-BOX Customの前面外装 |
| `n-box/jf3-custom-post-facelift-v1.png` | VERIFIED | Honda 2020-12-24改良資料、「Customのグリル／中央ナンバー」説明と掲載画像 |
| `voxy/80-zs-pre-facelift-v1.png` | VERIFIED | Toyota 2014-01-20資料、掲載車「ZS（7人乗り・2WD）」 |
| `voxy/80-zs-post-facelift-v1.png` | VERIFIED | Toyota 2017-07-03資料、ZSの薄型2眼LED／ハの字テーマ／エアロバンパー |
| `solio/gen3-2015.png` | VERIFIED | Suzuki 2015-08-26プレス画像「ソリオ HYBRID MZ」 |
| `solio/ma36s-2018-post-update-v1.png` | VERIFIED | Suzuki 2018-07-02「上質な印象のソリオ」ロアグリルメッキ／15インチアルミ変更 |
| `alphard/30-pre-facelift-v1.png` | HOLD | 2015年S Cパッケージ公式画像は確認。Assetの細部を同一オプション条件まで固定できない |
| `alphard/30-post-facelift-v1.png` | HOLD | 2018年改良資料の代表画像がExecutive Lounge。Assetのエアログレードを1対1照合できない |
| `serena/c27-highwaystar-pre-facelift-v1.png` | HOLD | 2016年Highway Star画像は確認したが、Assetの駆動・パワートレイン条件が未固定 |
| `serena/c27-highwaystar-post-facelift-v1.png` | HOLD | 2019年公式代表はe-POWER Highway Star V。Assetはパワートレインを確定できない |
| `stepwgn/rp3-spada-pre-facelift-v1.png` | HOLD | 2015年SPADAの外観は一致するが、RP3・FFの掲載画像との1対1証拠が不足 |
| `stepwgn/rp3-spada-post-facelift-v1.png` | HOLD | 2017年代表画像にハイブリッド仕様が含まれ、RP3ガソリンとの完全一致を未確認 |
| `tanto/gen3-2013-la600s.png` | HOLD | 2013年公式X SA画像と標準顔は整合。AssetのX系・NA・2WDの装備条件を画像だけで固定不可 |
| `tanto/la600s-2015-post-facelift-v1.png` | HOLD | 2015-12資料は標準車の大幅な前面変更を示さず、通常仕様は外観だけで改良前後を確定不能 |
| `prius/zvw30-pre-facelift-comparison-v1.png` | HOLD | 2009年S・2WDの型式条件は確認。非Touringの灯火／ホイールを公式画像で完全照合できない |
| `prius/zvw30-post-facelift-comparison-v1.png` | HOLD | 2011年資料の掲載車Sはオプション装着車。Assetの非Touring標準装備条件まで固定不可 |
| `vellfire/30-z-a-edition-pre-facelift-v1.png` | HOLD | 2015年Z Aエディション・AGH30W・2WDの車両情報は確認。公式画像との細部照合が未完了 |
| `vellfire/30-z-a-edition-post-facelift-v1.png` | HOLD | 2018年公式代表画像はZG。Z Aエディションとしての前面・ホイール1対1証拠が不足 |

結果: **VERIFIED 8 / HOLD 12 / CORRECTED 0**。HOLD画像に異車種混入や重大な構造破綻は今回の横並び目視では確認されなかったが、これは仕様一致の証明ではない。

## 重点比較10ページ（寸法80セル）

| URL | 結果 | 照合状況 |
|---|---|---|
| `/n-box-jf1-zenki-kouki.html` | CORRECTED / 8セル確認 | Honda 2011年・2015年の年式別主要諸元。前期全高を1,770mmへ訂正、後期1,780mmを確認 |
| `/n-box-jf1-vs-jf3.html` | HOLD | 両世代の公式諸元は取得できたが、ページ左右の装備条件を同一基準へ固定する確認が未完了 |
| `/tanto-la600s-zenki-kouki.html` | HOLD | 発売・改良資料は確認。2015年12月の同一X・NA・2WD諸元表の直接セル証拠が不足 |
| `/solio-ma36s-zenki-kouki.html` | HOLD | HYBRID MZ・2WDとホイールベースは確認。4寸法×前後の直接諸元セル保存が未完了 |
| `/prius-30-zenki-kouki.html` | HOLD | S・2WDの改良境界と型式は確認。前後それぞれの公式諸元表セルを保存できていない |
| `/prius-30-vs-50.html` | HOLD | 世代別寸法資料は存在するが、掲載代表グレード・2WD条件の左右固定が未完了 |
| `/serena-c25-vs-c26.html` | HOLD | 日産公式改良資料は確認。掲載代表仕様に一致する旧カタログ諸元セルが不足 |
| `/serena-c26-vs-c27.html` | HOLD | C27発売資料は確認。C26側を含む同一グレード／駆動条件の直接照合が未完了 |
| `/stepwgn-rk-vs-rp.html` | HOLD | RP発売資料は確認。RK側を含む掲載グレードの寸法セル証拠が不足 |
| `/vellfire-20-vs-30.html` | HOLD | 両世代の代表型式は確認済み。左右8セルを同じグレード系統・2WDで直接保存する作業が未完了 |

結果: **確認済み8セル / HOLD 72セル**。確認できたセルだけを台帳へ反映し、周辺資料からの推定値はVERIFIEDへ移していない。

## 実際に修正した誤情報

- `/n-box-jf1-zenki-kouki.html`: 標準N-BOX G・Lパッケージ系FFの全高を「前期1,780 / 後期1,780mm」から「前期1,770 / 後期1,780mm」へ訂正。
- 根拠: Honda初期型主要諸元のG・LパッケージFF（1,770mm、ナビ装着用スペシャルパッケージは1,780mm）と、2015年2月改良後主要諸元（1,780mm）。
- 前後10mmをボディ形状の改良差として誤解させないよう、装備条件による差であることを本文に明記。

## HOLD理由の分類

1. `EXACT_GRADE_IMAGE_MISSING`: 公式画像はあるがAssetと同一グレード／オプションの画像がない。
2. `POWERTRAIN_OR_DRIVE_UNFIXED`: 外観は一致するがパワートレイン／駆動を画像から確定できない。
3. `ARCHIVED_SPEC_CELL_MISSING`: 旧年式の公式諸元表で対象セルを直接取得できない。
4. `NO_VISIBLE_PERIOD_DELTA`: 公式上、標準車の外観差が小さく写真だけで改良前後を確定できない。

同じURLと同じ不足理由での再調査は、新しい一次資料が見つかるまで行わない。

## 一次資料

- Honda N-BOX初期主要諸元: https://www.honda.co.jp/auto-archive/nbox/2012/webcatalog/spec/
- Honda N-BOX 2015年主要諸元: https://www.honda.co.jp/auto-archive/nbox/2015-10/webcatalog/performance/spec/
- Honda N-BOX 2015年改良: https://global.honda/jp/news/2015/4150205-n-box.html
- Honda N-BOX 2017年発売: https://global.honda/jp/news/2017/4170831-n-box.html
- Honda N-BOX 2020年改良: https://global.honda/jp/news/2020/4201224-n-box.html
- Toyota VOXY 2014年発売: https://global.toyota/jp/newsroom/toyota/21775271.html
- Toyota VOXY 2017年改良: https://global.toyota/jp/newsroom/toyota/21823080.html
- Suzuki SOLIO 2015年発売: https://www.suzuki.co.jp/release/a/2015/0826/
- Suzuki SOLIO 2018年仕様変更: https://www.suzuki.co.jp/release/a/2018/0702/
- Nissan SERENA 2019年改良: https://global.nissannews.com/ja-JP/releases/190801-02-j
- Honda STEP WGN 2017年改良: https://global.honda/jp/news/2017/4170928a-stepwgn.html
- Daihatsu TANTO 2015年12月改良: https://www.daihatsu.com/jp/news/2015/20151214-02.html
- Toyota PRIUS 2011年改良: https://global.toyota/jp/detail/1495280/
- Toyota ALPHARD/VELLFIRE 2017年改良: https://global.toyota/jp/newsroom/toyota/20433735.html

