# CarVista Cloudflare 隔離配信・本番切替手順

状態（2026-11-28）：`carvista.jp` はVercelで本番配信中。既存Cloudflareアカウントに公式Wrangler OAuthで認証し、**Workers Static Assets**（Workerスクリプトなし）の別名隔離環境 `https://carvista-static-preview.nandemomail24.workers.dev/` へ実配信済み。109 URL・既存357画像のバイト一致を含む588検査は失敗0。ブラウザでプレビューのGA4タグが読み込まれないことを確認した。本番DNS/ドメインは未変更。Pagesではなく既存 `wrangler.preview.jsonc` / `wrangler.jsonc` のStatic Assets構成を採用する。Cloudflareの保護環境で読み取りジョブが成功し、以下の現行値を確認した。切替実行にはOWNERによる別途承認と必要な書き込み権限が要る。

## 隔離実配信（既存アカウントにログイン後、DNSは変更しない）

1. `npm ci && npm run build:cloudflare && node scripts/prepare-cloudflare-preview.mjs`。`dist-cloudflare-preview/` の `_headers` に全URLの `X-Robots-Tag: noindex, nofollow` があることを確認する。
2. 既存Cloudflareアカウントの公式Wrangler OAuth権限を `npx wrangler whoami` で確認し、`npx wrangler deploy --config wrangler.preview.jsonc` で `carvista-static-preview` の隔離URLに配信する。トークン値を表示・Gitに保存しない。
3. `node scripts/verify-cloudflare-preview.mjs --origin https://<隔離URL>.workers.dev --dist dist-cloudflare-preview` を実行する。サイトマップ109 URL以上、既存357画像（ICO/SVG含む）の**バイト一致**、canonical、JSON-LD、GSC認証、GA4配信、ads.txt、robots、旧URLの308、404、全ページnoindexの結果をJSONに保存する。失敗が1件でもあれば切替しない。
4. 375・390・430pxの実画面を既存の `Mobile visual gate` と照合する。画像比較、横スクロール、Console Error、リンクを確認する。隔離URLのCI実画面検証は未完了の場合は本番切替を保留する。GA4は `carvista.jp` と `www.carvista.jp` のみ送信し、プレビューのクリック/PVを本番KPIに混ぜない。計測IDの**配信確認**と実イベントの**受信確認**を分ける。
5. 空の忍者AdMax枠は本PRで初期状態を停止した。旧Vercel本番との差分として広告枠4件を想定するが、既存収益を確認するまでは公開判断に含める。A8のカーネクストは11月28日に提携完了、ガリバーとソコカラは審査中。広告素材と掲載規則の確認および本番公開承認までリンク設定は無効とする。

## 2026-11-28 現行構成の確認と移行判定

- Vercelのドメイン設定では `carvista.jp` は設定正常・認証済み、`www.carvista.jp` はapexへ308転送。既存プロジェクトと旧本番を残す。Vercelから見える外部NSは `mario.ns.cloudflare.com` / `amanda.ns.cloudflare.com`、プロキシのA応答は `104.21.73.11` / `172.67.136.235`。レジストラ関連メールはお名前.com。これは**DNSゾーンの全レコードの控えではない**。
- 既にCloudflare NSを利用しているため、同じゾーンのCustom DomainだけでWeb向き先を変えられる可能性がある。NS変更の要否は現行ゾーン設定を確認して決める。推測でレジストラやMXを変更しない。
- 2026-11-28、Google Public DNSの公開応答を読み取った。apex Aは `104.21.73.11` / `172.67.136.235`、AAAAは `2606:4700:3030::ac43:88eb` / `2606:4700:3035::6815:490b`、NSは `amanda.ns.cloudflare.com` / `mario.ns.cloudflare.com`。wwwも同じAで応答。公開MX、apex TXT、CAA、親ゾーンDSは応答なし、`_dmarc.carvista.jp` はNXDOMAIN。プロキシされたA応答からCloudflareゾーン内の元のA/CNAME値を逆算しない。公開DNSで「なし」はCloudflare管理画面に設定が存在しない証明ではない。
- CloudflareダッシュボードのログインPOSTはこの作業環境ではHTTP 403だったが、OWNER承認付きのGitHub保護環境から**CarVistaゾーン限定の公式API読み取りジョブ**が成功した（実行コミット `6eb5a0f`）。暗号化された結果だけを1日保持のartifactへ保存し、秘密値はログに出していない。ゾーンはactive、Free Website、NSは `amanda.ns.cloudflare.com` / `mario.ns.cloudflare.com`。ゾーンのDNSレコードは次の**2件のみ**：apex `A 216.198.79.1`、www `CNAME 4f4894ec549112de.vercel-dns-017.com`（両方proxied、TTL Auto）。AAAA、MX、TXT、SPF、DKIM、DMARC、GSC用DNS TXT、CAA、その他のサブドメインは登録されていない。GSC認証はHTML meta tagを維持する。DNSSECはdisabled。SSL/TLSはFull、Let's Encryptのuniversal certificateがactiveで `carvista.jp` と `*.carvista.jp` を含む。Always Use HTTPSはoff、Minimum TLSは1.0。既存のSingle Redirectエントリポイントは404で未作成。管理ルールセット4件はあるが、Page Rules等の全種類を列挙したものではない。既存wwwとHTTPの308はVercelの応答であり、切替時にCloudflare側へ引き継ぐ必要がある。
- 読み取り認証: CarVista単一ゾーンに限定した必要最小限のCustom TokenをOWNERが保護環境Secretへ登録し、承認付きジョブの実行に成功した。用途は現行DNS/SSL/リダイレクトと切り戻し値の確認だけ。DNS Write、全ゾーン、Account権限、Global API Keyは使用していない。結果確認後はGitHub環境Secretを削除し、Cloudflare API Tokensで当該トークンを失効する。秘密値は公開リポジトリ、チャット、CIログに保存しない。
- 安全な受け渡し: `.github/workflows/carvista-zone-read.yml` は**環境Secret** `CARVISTA_CF_READ_TOKEN` を使う専用の読み取りジョブ。環境名は `carvista-zone-read` とし、OWNERによるRequired reviewers、デプロイブランチ `preview/carvista-b5152ea` のみをGitHub側で設定する。トークンをGitHubのリポジトリSecretではなく、この保護された環境SecretへOWNER自身が入力する。CIの権限は contents:read、対象APIはGETのみ、DNS等の値はログ出力しない。結果は公開リポジトリ上に**RSA-OAEP-SHA256 + AES-256-GCMで暗号化された1日保持のartifact**だけを保存し、復号鍵はリポジトリ外の権限600の作業環境ファイルに保持する。利用後はGitHub環境SecretとCloudflareトークンを両方失効する。環境承認前にジョブがSecretを受け取れないことはGitHubの仕様。workflowと鍵の準備だけでは認証完了とは扱わない。
- 静的プレビューは実配信済みで、ゾーンの現行プランもFree WebsiteとAPIで確認した。Workers Static Assetsの静的リクエストは無料枠で配信可能。アカウント全体の請求設定と他の課金対象サービスはこのゾーン読み取りジョブの対象外で、別途確認する。今回の読み取りで有料契約や本番設定の変更はない。

## 承認後の最小切替差分（切替前に現行値を再確認）

1. 旧Vercelの本番とドメイン設定を保持し、静的Workerのapex Custom Domain `carvista.jp` を設定する。Cloudflareが管理するapexのWeb向けDNSは、旧 `A 216.198.79.1` からWorkerの向き先へ変更される。NSは変更しない。`www` のCNAME `4f4894ec549112de.vercel-dns-017.com` は維持する。
2. CloudflareのSingle Redirectを2件設定する。`www.carvista.jp` のすべてのパス・クエリを `https://carvista.jp` の同じパス・クエリへ308転送し、apexのHTTPをHTTPSの同じパス・クエリへ308転送する。現行のVercel由来の挙動と照合する。ゾーン全体のAlways Use HTTPS、SSLモード、DNSSEC、他のDNS値を変更しない。
3. 本番HTTPSの証明書・経路と、109 URL・357画像・canonical・サイトマップ・robots・JSON-LD・GSC HTML meta・GA4・ads.txt・404・スマホ表示を照合する。CarNext広告は独立した掲載開始承認がある場合だけ有効化し、実広告をテストクリックしない。

切替実行権限は読み取り専用トークンにはない。承認後、Worker Custom DomainおよびSingle Redirect編集に必要な**対象ゾーン限定の正規の書き込み手段**を確認してから実施し、権限不足なら操作を保留する。

## 本番切替前にOWNER承認を取得

1. 読み取りジョブで確認した2026-11-28の上記現行値を切替直前に再確認する。2026-11-05の控えは現行値とは扱わない。旧値を秘密情報のない作業記録に残す。
2. 旧Vercelのドメイン設定、最終READY本番デプロイ、証明書状態を記録し、プロジェクトを残す。Cloudflare Custom Domain と `www`→apex の308転送を用意し、SSL発行・DNSSEC/メール影響を事前確認する。
3. OWNERが本番切替と必要なDNS/転送変更を承認してからWeb向けapexだけを切り替える。NSは維持する。現状メール関連レコードは存在せず、メール配送を提供していることも確認されていない。`www` は既存CNAMEを残してCloudflare側の308転送を検証する。
4. 本番で全URLと画像、SSL、旧URLの308、`www`・HTTPの正規化、canonical、sitemap、robots、JSON-LD、GSC認証、GA4リアルタイム、ads.txt、404、スマホ画面とエラーを再確認する。新規URLがあればGSCの正規の登録申請を行い、申請と登録完了を区別する。

## 即時ロールバック

1. Cloudflareのapex Custom Domainを解除し、apex `A 216.198.79.1`（proxied、TTL Auto）を復元する。新設した2件のSingle Redirectを削除または無効化する。既存のwww `CNAME 4f4894ec549112de.vercel-dns-017.com` は変更しない。旧Vercel本番とドメイン設定を削除・停止しない。NS、DNSSEC、SSLモード、メールレコードを変更しない。
2. DNS伝播後、旧Vercelで代表URLと画像、HTTPS、canonical、GA4、メール配送関連レコードを確認する。SSL/DNSSECの不一致が残れば復旧完了としない。
3. 切替・復旧時刻を記録し、GSCのサイトマップと検索実績を28日間監視する。
