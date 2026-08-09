# 初回収益化の導入方針

## 決定

中古車送客の初期ASPは **A8.net** を第一候補とする。CarVistaは比較ページから購入検討の次の行動へ進める設計なので、成果報酬型の中古車検索案件を1社だけ導入し、まずクリック率と承認率を計測する。

## 導入手順

1. CarVistaの運営者がA8.netのメディア会員登録を行う。
2. 管理画面で中古車検索案件を選び、CarVistaを掲載媒体として提携申請する。
3. 承認された広告URL・案件名・提携条件を確認する。
4. `src/affiliate.js` の `affiliateDestinations.usedCarSearch` に次の形で設定する。

```js
usedCarSearch: {
  partner: 'A8.net',
  label: '中古車を検索する',
  url: '承認済みの広告URL',
},
```

5. 比較ページ末尾にPR表記付きCTAが自動表示されることを確認して公開する。

## 計測

GA4で次の順に確認する。

1. `view_comparison`：比較ページの閲覧
2. `open_related_comparison`：比較ページ間の回遊
3. `click_used_car_search`：PR表記付き送客CTAのクリック

広告URLは承認前に設定しない。PR表記、リンク先、成果条件は案件ごとに確認する。
