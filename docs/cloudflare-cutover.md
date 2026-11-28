# CarVista Cloudflare 隔離配信・本番切替手順

状態（2026-11-28）：`carvista.jp` はVercelで本番配信中。既存Cloudflareアカウントに公式Wrangler OAuthで認証し、**Workers Static Assets**（Workerスクリプトなし）の別名隔離環境 `https://carvista-static-preview.nandemomail24.workers.dev/` へ実配信済み。109 URL・既存357画像のバイト一致を含む588検査は失敗0。ブラウザでプレビューのGA4タグが読み込まれないことを確認した。本番DNS/ドメインは未変更。Pagesではなく既存 `wrangler.preview.jsonc` / `wrangler.jsonc` のStatic Assets構成を採用する。古いDNSの記録は現行設定の根拠にしない。

## 隔離実配信（既存アカウントにログイン後、DNSは変更しない）

1. `npm ci && npm run build:cloudflare && node scripts/prepare-cloudflare-preview.mjs`。`dist-cloudflare-preview/` の `_headers` に全URLの `X-Robots-Tag: noindex, nofollow` があることを確認する。
2. 既存Cloudflareアカウントの公式Wrangler OAuth権限を `npx wrangler whoami` で確認し、`npx wrangler deploy --config wrangler.preview.jsonc` で `carvista-static-preview` の隔離URLに配信する。トークン値を表示・Gitに保存しない。
3. `node scripts/verify-cloudflare-preview.mjs --origin https://<隔離URL>.workers.dev --dist dist-cloudflare-preview` を実行する。サイトマップ109 URL以上、既存357画像（ICO/SVG含む）の**バイト一致**、canonical、JSON-LD、GSC認証、GA4配信、ads.txt、robots、旧URLの308、404、全ページnoindexの結果をJSONに保存する。失敗が1件でもあれば切替しない。
4. 375・390・430pxの実画面を既存の `Mobile visual gate` と照合する。画像比較、横スクロール、Console Error、リンクを確認する。隔離URLのCI実画面検証は未完了の場合は本番切替を保留する。GA4は `carvista.jp` と `www.carvista.jp` のみ送信し、プレビューのクリック/PVを本番KPIに混ぜない。計測IDの**配信確認**と実イベントの**受信確認**を分ける。
5. 空の忍者AdMax枠は本PRで初期状態を停止した。旧Vercel本番との差分として広告枠4件を想定するが、既存収益を確認するまでは公開判断に含める。A8のカーネクストは11月28日に提携完了、ガリバーとソコカラは審査中。広告素材と掲載規則の確認および本番公開承認までリンク設定は無効とする。

## 2026-11-28 現行構成の確認と移行判定

- Vercelのドメイン設定では `carvista.jp` は設定正常・認証済み、`www.carvista.jp` はapexへ308転送。既存プロジェクトと旧本番を残す。Vercelから見える外部NSは `mario.ns.cloudflare.com` / `amanda.ns.cloudflare.com`、プロキシのA応答は `104.21.73.11` / `172.67.136.235`。レジストラ関連メールはお名前.com。これは**DNSゾーンの全レコードの控えではない**。
- 既にCloudflare NSを利用しているため、同じゾーンのCustom DomainだけでWeb向き先を変えられる可能性がある。NS変更の要否は現行ゾーン設定を確認して決める。推測でレジストラやMXを変更しない。
- Cloudflareのダッシュボードはこの作業環境で未ログイン。MX、メール認証TXT/SPF/DKIM/DMARC、GSC所有権TXT、CAA、DS/DNSSEC、SSLモード、ページルールと現在のWeb向けA/AAAA/CNAMEの全件は未取得。メール配送に影響がないと現時点では証明できないため、**本番移行はNO-GO**。ダッシュボードで現行ゾーンを読み取り、切替前の設定と復旧値を保存してから別途DNS・本番公開承認を得る。
- 静的プレビューは実配信済みで、切替作業そのものに着手できる状態。料金プランのFree確認は2026-11-05のアクティベーションメールの時点。現時点の課金設定・超過時挙動は管理画面で最終確認する。

## 本番切替前にOWNER承認を取得

1. レジストラとCloudflareの現時点のゾーン設定を保存する。A/AAAA/CNAME、NS、MX、SPF/DKIM/DMARC、その他TXT（GSC/メール認証）、CAA、DS/DNSSEC、TTL、プロキシ状態、リダイレクトを照合。2026-11-05の控えは参考値であり現行値とは扱わない。
2. 旧Vercelのドメイン設定、最終READY本番デプロイ、証明書状態を記録し、プロジェクトを残す。Cloudflare Custom Domain と `www`→apex の308転送を用意し、SSL発行・DNSSEC/メール影響を事前確認する。
3. OWNERがDNS変更と本番切替を承認してから Web向け DNS のみ切り替える。NSを変更する場合、メール/認証/CAA/DSを移行前にすべて再現する。メール関連レコードを削除・変更しない。
4. 本番で全URLと画像、SSL、旧URLの308、`www`・HTTPの正規化、canonical、sitemap、robots、JSON-LD、GSC認証、GA4リアルタイム、ads.txt、404、スマホ画面とエラーを再確認する。新規URLがあればGSCの正規の登録申請を行い、申請と登録完了を区別する。

## 即時ロールバック

1. 切替前のDNS/NS控えに従いWebの向き先を旧Vercelへ戻し、CloudflareのCustom Domainを外す。旧Vercel本番とドメインを削除・停止しない。DNSSECを変更した場合はDSの整合性を回復する。メールレコードは維持する。
2. DNS伝播後、旧Vercelで代表URLと画像、HTTPS、canonical、GA4、メール配送関連レコードを確認する。SSL/DNSSECの不一致が残れば復旧完了としない。
3. 切替・復旧時刻を記録し、GSCのサイトマップと検索実績を28日間監視する。
