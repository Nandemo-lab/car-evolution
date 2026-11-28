# CarVista Cloudflare 本番運用と切り戻し

2026-11-28、OWNERが承認した本番移行とカーネクスト掲載を実行した。既存の公式Wrangler OAuthに `workers_routes:write` があり、追加のAPIトークンやDNS書き込みは不要だった。別途承認待ちだったSingle Redirect書き込みジョブはキャンセルし、ワークフローも削除した。

## 現在の経路

| 入力 | Cloudflareの設定 | 結果 |
| --- | --- | --- |
| `https://carvista.jp/*` | `carvista-static` のRoute、Workers Static Assets | 既存URLを静的配信 |
| `http://carvista.jp/*` | `carvista-canonical-redirect` のRoute | 同じパス・クエリでHTTPSへ308 |
| `www.carvista.jp/*` | 同じ転送WorkerのRoute | 同じパス・クエリでapexのHTTPSへ308 |

`wrangler.jsonc` と `wrangler.redirect.jsonc` が経路の設定元。Cloudflare側のapex A `216.198.79.1` とwww CNAME `4f4894ec549112de.vercel-dns-017.com` は**変更していない**。両方ともCloudflareプロキシ経由でRouteが先に適用される。NS、DNSSEC、SSL Full、証明書、メール設定も変更なし。旧Vercelデプロイとドメイン設定を保持する。

通常の本番応答はWorkers Static AssetsのRouteで200/HIT、Vercelへのfetchをコード内で行わない。ただしWorkers Routeは既存Vercel DNSオリジンの**前段**にある。Cloudflare無料枠超過時のRouteごとのfail-open/fail-closed設定は未取得。fail-openなら旧Vercelへ迂回する可能性があるため、Vercel商用配信への依存が完全に消えたとは判定しない。設定の読み取りと必要な変更は別の本番運用判断とする。

CloudflareゾーンはFree Website。静的アセットのリクエストにはWorkerコードを実行しない。転送WorkerへのHTTP/wwwアクセスはWorkersの動的リクエスト枠を使う。新たな有料プラン契約や請求設定の変更は行っていない。**アカウント全体の請求設定・無制限の将来トラフィック費用は未確認**であり、月次請求のゼロ円を断定しない。Workers Freeの上限到達時は転送が失敗し得るため、実利用量を監視する。

## 実行と確認

1. `npm run build:cloudflare` で109サイトマップURLと既存357画像を含むビルドを生成。
2. `wrangler deploy --config wrangler.redirect.jsonc`、続いて `wrangler deploy --config wrangler.jsonc` を実行。
3. `node scripts/verify-cloudflare-preview.mjs --origin https://carvista.jp --dist dist --production true` により109 URL、357画像のバイト一致、canonical、JSON-LD、GSC meta、GA4コード、ads.txt、robots、サイトマップ、旧URLの308、404、公開ページのnoindex不在を照合。588項目で失敗0。
4. HTTPとwwwの308をパス・クエリ付きで検証。ブラウザでNOAHの売却導線にPR表記と正規広告素材が表示されることを確認。実広告はクリックしない。

サイトへの実イベント到達やSearch Console側の取得・インデックス登録は、配信コードの確認とは別の観測項目。URL登録申請は新規URLを確定して正規UIから行う。

## 旧記録：Vercelへの切り戻し（実行禁止）

旧VercelはDeployment Storage 10GB上限到達と古いデプロイの自動削除通知がある。以前のRoute解除でVercelオリジンへ到達させる手順は、商用トラフィックの安全な切り戻し先として使えない。**Route解除・DNS変更を障害時の第一手にしない。** 以下のCloudflare内復旧を使う。

## Cloudflare内の復旧手順（2026-11-28）

1. まず `wrangler deployments list --name carvista-static` で現行versionを再確認する。2026-11-28の現行は `1c281910-4b50-4f2a-b7f4-c2487d46306b`（111 URL、コミット `40fa78329883af45340fe02e355805e8b495c0fd`）、直前の検証済み本番は `a7fa7b5f-bbaa-4286-a6be-27fff5b46522`（110 URL）。前者は592項目の本番照合失敗0。戻し先は障害時にも公開QAで確認する。110 URL版へ戻す間は新規ノアURLが404になる。
2. 復旧コマンドは `wrangler rollback a7fa7b5f-bbaa-4286-a6be-27fff5b46522 --name carvista-static --message "Restore verified 110 URL release"`。この本番実行は障害発生時のみ。Cloudflareの旧versionへ100%を戻し、Routeはそのまま保持する。転送Workerも故障したときはそのWorkerのdeploymentを別途照合・rollbackする。
3. `/`、主要車種、広告6ページ、`/sitemap.xml`、画像の代表サンプル、www/HTTPの308、canonical、ads.txt、GA4、Console Errorを確認する。新規URLの一時的な404とHTML/アセットのバージョンずれを記録し、必要なら次項の再ビルドで修復する。
4. 旧versionは永続保管ではない。保持上限は直近100 versionまたは30日の制限があるため、GitHubの実装コミットと既存357画像のリポジトリを正本にする。スペーシア追加のコミット `ecfd05c`、最新PR head `081550a` は確認済み。ただしデプロイにコミットSHAは記録されておらず、**現行versionと特定SHAの1対1対応は未証明**。復旧時はGitHubで対象コミットをcheckoutし、lockfileで依存を再現して `npm run build:cloudflare` → `scripts/verify-cloudflare-preview.mjs` で照合 → 同じ `wrangler.jsonc` で再デプロイする。
5. 配信のVercel依存を断つ設定案：Cloudflare内のapex/www DNSのVercel向けA/CNAMEをCloudflareの制御下に置く安全なオリジンに変更し、3 Routeのfail modeを**fail closed**へ設定する。変更前に現在のDNS、Route fail mode、メール関連レコード、無料枠、戻し先を読み取りで記録する。DNSとRouteの重要変更は個別承認を得てから実施する。fail closedでは無料Worker枠を使い切ったHTTP/www転送は1027エラーになり得るため、静的アセットと転送Workerの利用を分けて監視する。

Cloudflareの公式資料ではStatic Assetsへの一致リクエストは無料・無制限、WorkerスクリプトはFreeで1日10万リクエスト、Routeのfail openはWorkerを迂回し、fail closedは1027を返す。公開済みの357画像と110 URLはGit管理のまま保全する。**ロールバックの本番所要時間は未測定**。CLIが正常版を列挙できるところまでは読み取りで確認したが、意図的な本番障害と切り戻しは行っていない。

- [Cloudflare Rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)：旧version、Route、保持制限
- [Cloudflare Workers Limits](https://developers.cloudflare.com/workers/platform/limits/)：Free上限とfail mode
- [Static Assets Billing and Limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)：静的リクエストとWorker実行の区別

## 公開後の確認（2026-11-28）

- 本番ブラウザCI Run 46129526592で375/390/430pxの9画面を検証。画像欠落、横はみ出し、Console Errorは0。カーネクスト対象6ページへの表示と対象外ページでの非表示を確認した。広告の実クリックはしない。
- Search Consoleの `carvista.jp` プロパティで `/sitemap.xml` 成功・109 URLを確認。公開時の新規URLはなく個別の登録申請なし。2026-10-30〜11-26の183クリック／6,305表示は移行前の検索実績を含むため、移行効果ではない。
- GA4配信コードは本番にあるが、Google Analytics画面が内部エラー／対象プロパティの権限エラーとなり、イベント受信・広告ページ別PVを未確認。A8の成果と混同しない。
- Cloudflareのアカウント請求設定、旧読み取りSecretとトークンの失効は未確認。無料ゾーンでの配信と、アカウント全体の請求額は別の確認項目。
- `carvista-zone-read` 環境の旧読み取りSecretとCloudflare旧トークンの失効。秘密値は再利用しない。
