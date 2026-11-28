# CarVista Cloudflare 本番運用と切り戻し

2026-11-28、OWNERが承認した本番移行とカーネクスト掲載を実行した。既存の公式Wrangler OAuthに `workers_routes:write` があり、追加のAPIトークンやDNS書き込みは不要だった。別途承認待ちだったSingle Redirect書き込みジョブはキャンセルし、ワークフローも削除した。

## 現在の経路

| 入力 | Cloudflareの設定 | 結果 |
| --- | --- | --- |
| `https://carvista.jp/*` | `carvista-static` のRoute、Workers Static Assets | 既存URLを静的配信 |
| `http://carvista.jp/*` | `carvista-canonical-redirect` のRoute | 同じパス・クエリでHTTPSへ308 |
| `www.carvista.jp/*` | 同じ転送WorkerのRoute | 同じパス・クエリでapexのHTTPSへ308 |

`wrangler.jsonc` と `wrangler.redirect.jsonc` が経路の設定元。Cloudflare側のapex A `216.198.79.1` とwww CNAME `4f4894ec549112de.vercel-dns-017.com` は**変更していない**。両方ともCloudflareプロキシ経由でRouteが先に適用される。NS、DNSSEC、SSL Full、証明書、メール設定も変更なし。旧Vercelデプロイとドメイン設定を保持する。

CloudflareゾーンはFree Website。静的アセットのリクエストにはWorkerコードを実行しない。転送WorkerへのHTTP/wwwアクセスはWorkersの動的リクエスト枠を使う。新たな有料プラン契約や請求設定の変更は行っていない。**アカウント全体の請求設定・無制限の将来トラフィック費用は未確認**であり、月次請求のゼロ円を断定しない。Workers Freeの上限到達時は転送が失敗し得るため、実利用量を監視する。

## 実行と確認

1. `npm run build:cloudflare` で109サイトマップURLと既存357画像を含むビルドを生成。
2. `wrangler deploy --config wrangler.redirect.jsonc`、続いて `wrangler deploy --config wrangler.jsonc` を実行。
3. `node scripts/verify-cloudflare-preview.mjs --origin https://carvista.jp --dist dist --production true` により109 URL、357画像のバイト一致、canonical、JSON-LD、GSC meta、GA4コード、ads.txt、robots、サイトマップ、旧URLの308、404、公開ページのnoindex不在を照合。588項目で失敗0。
4. HTTPとwwwの308をパス・クエリ付きで検証。ブラウザでNOAHの売却導線にPR表記と正規広告素材が表示されることを確認。実広告はクリックしない。

サイトへの実イベント到達やSearch Console側の取得・インデックス登録は、配信コードの確認とは別の観測項目。URL登録申請は新規URLを確定して正規UIから行う。

## 即時切り戻し

権限と接続を維持した作業端末で、まず `carvista-static` から `https://carvista.jp/*` Routeを、転送Workerから `www.carvista.jp/*` と `http://carvista.jp/*` Routeを外す。`wrangler.jsonc` / `wrangler.redirect.jsonc` の `routes` を空配列にした一時設定で各Workerを再デプロイし、3経路が消えたことを管理画面・HTTP応答で確認する。**Workerを削除したりDNS値を変更したりする必要はない。** 元から残したapex Aとwww CNAMEが旧Vercelへ到達する。転送の動作と旧Vercelの代表URL、画像、SSL、GA4を検証する。切り戻し時のA8広告は旧Vercelの公開バージョンに含まれない。

Route設定変更が権限・API障害で失敗した場合は、Cloudflare管理画面のWorkers & Pages → 対象Worker → Settings → Domains & Routesから同じ3経路を解除する。事前に確認したDNS旧値は保持し、必要な場合だけ別途承認されたDNS操作として復旧する。

## 公開後の確認（2026-11-28）

- 本番ブラウザCI Run 46129526592で375/390/430pxの9画面を検証。画像欠落、横はみ出し、Console Errorは0。カーネクスト対象6ページへの表示と対象外ページでの非表示を確認した。広告の実クリックはしない。
- Search Consoleの `carvista.jp` プロパティで `/sitemap.xml` 成功・109 URLを確認。公開時の新規URLはなく個別の登録申請なし。2026-10-30〜11-26の183クリック／6,305表示は移行前の検索実績を含むため、移行効果ではない。
- GA4配信コードは本番にあるが、Google Analytics画面が内部エラー／対象プロパティの権限エラーとなり、イベント受信・広告ページ別PVを未確認。A8の成果と混同しない。
- Cloudflareのアカウント請求設定、旧読み取りSecretとトークンの失効は未確認。無料ゾーンでの配信と、アカウント全体の請求額は別の確認項目。
- `carvista-zone-read` 環境の旧読み取りSecretとCloudflare旧トークンの失効。秘密値は再利用しない。
