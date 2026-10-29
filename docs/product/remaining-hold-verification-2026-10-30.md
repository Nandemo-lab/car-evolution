# CarVista 残存HOLD考証記録（2026-10-30）

## 判定基準

- `VERIFIED`: 公開記述・数値・画像の対象仕様を、メーカー一次資料の該当記載または公式画像で直接確認。
- `CORRECTED`: 一次資料との不一致を修正し、修正後の根拠を記録。
- `HOLD`: メーカー／車種群の資料が存在しても、公開中の年式・グレード・駆動・画像と1対1で結び付く証拠が不足。
- 自動テストは欠損・参照・重複の再発防止に使い、自動車考証の証明には使わない。

## 公開車両画像

全160画像を `vehicle-image-verification-registry.tsv` に登録した。前回独立照合済みのSERENA C28 TOPカード1件をVERIFIEDとして維持し、今回の残存159件はすべてHOLDとした。

- VERIFIED: 1
- CORRECTED: 0
- HOLD: 159
- 今回新たに確認した異車種画像・重大な構造異常: 0

159件はファイル存在、公開ページ、alt、キャプション、異車種間の同一ハッシュを確認済み。ただしAI制作画像をメーカー公式写真そのものとは扱わず、同一年式・同一グレード・同一駆動・同一外装の1対1照合が完了するまでVERIFIEDへ昇格しない。

既知の重点HOLD:

- `/images/cars/prius/gen3-2009-zvw30.png`: 灯火・フォグ・グレード条件が未確定。前後期比較用途では使用禁止を継続。
- `/images/cars/harrier/gen2-2003-mcu35w.png`: ファイル名は4WD型式だが、比較ページの数値代表は2WD。画像から駆動方式を断定しない。
- SERENA C26後期: 公開禁止を維持。公開HTMLに対象Assetがないことを回帰テストで確認。

## 比較ページと寸法

42比較ページを `comparison-spec-verification-registry.tsv` に登録。今回の残存監査対象は、前回修正済みのCOROLLA CROSSを除く41ページ。

ページ判定:

- VERIFIED: 3（ALPHARD 20/30、CX-5 KF/KM、RAV4 50/60）
- CORRECTED: 1（COROLLA CROSS 2023/2025。ZVG13・2WDへ修正済み）
- HOLD: 38

寸法セル336件:

- VERIFIED: 28
- CORRECTED: 0
- HOLD: 308

直接根拠:

- ALPHARD 20: https://toyota.jp/ucar/catalog/brand-TOYOTA/car-ALPHARD/200805/10047783/
- ALPHARD 30: https://toyota.jp/ucar/catalog/brand-TOYOTA/car-ALPHARD/201801/10113530/
- CX-5 KF: https://www.mazda.co.jp/content/dam/mazda/official/mazda-co-jp/cars/cx-5_kf/common/pdf/cx-5_specification_202510.pdf
- CX-5 KM: https://www.mazda.co.jp/content/dam/mazda/official/mazda-co-jp/cars/cx-5/common/pdf/cx-5_specification_202605.pdf
- RAV4 50: https://toyota.jp/ucar/catalog/brand-TOYOTA/car-RAV4/201904/10120929/
- RAV4 60: https://toyota.jp/pages/contents/rav4/003_p_001/pdf/rav4_spec_202609.pdf
- ROOX BB: https://history.nissan.co.jp/ARCHIVES/PDF/ROOX/BA2/20250919/roox_specsheet.pdf

ニュースリリースの到達確認だけでは寸法VERIFIEDにしない。308セルは左右それぞれの年式・グレード・駆動に対応する公式主要諸元表の該当セルが揃うまでHOLD。

## 限定HOLD

### SPACIA

- 公式: https://www.suzuki.co.jp/release/a/2015/0519/
- 確認: 2015年5月は「一部改良」。S-エネチャージ搭載車の型式はMK42S。
- 修正: 「後期」「マイルドハイブリッド系」という一般化をやめ、「2015年5月の一部改良後は、S-エネチャージ搭載のMK42Sへ移行」とした。

### ROOX

- 公式諸元: https://history.nissan.co.jp/ARCHIVES/PDF/ROOX/BA2/20250919/roox_specsheet.pdf
- 確認: 2WD NA=BB1A、2WDターボ=BB2A、4WD NA=BB5A、4WDターボ=BB6A。
- 公開記述は一致。公式諸元リンクを追加。
- 旧B4系側の未照合寸法はHOLDを維持。

### ESQUIRE

- 発売: https://global.toyota/jp/newsroom/toyota/21796684.html
- 2017年改良: https://global.toyota/jp/newsroom/toyota/21823080.html
- 販売期間: https://toyota.jp/ucar/catalog/brand-TOYOTA/car-ESQUIRE/
- 確認: 2014年10月から2021年12月。公開本文は「2014年から2021年」で矛盾なし。公式資料3件をページ出典へ追加。

## 再発防止

- 公開車両画像160件を、使用ページ、メーカー、状態、一次資料起点とともに台帳管理。
- 比較42ページを、ページ状態と8寸法セルのVERIFIED/HOLD件数で台帳管理。
- build時テストで、公開画像の台帳未登録、比較ページの台帳未登録、状態値の欠落、件数のずれを失敗させる。
- TOP異車種画像の同一ハッシュ検知とSERENA C26 HOLD Asset非参照テストを維持。
- 新規車種・比較追加時は、公式根拠を台帳へ登録しなければテストを通過できない。

