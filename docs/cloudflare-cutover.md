# CarVista Cloudflare Pages 移行・復旧手順

状態: Cloudflareへの隔離実配信とDNS変更は未実施。旧Vercel本番を維持する。

## 隔離配信の確認

1. 既存CloudflareアカウントでPagesの新規プロジェクトを作成し、`npm ci && npm run build:cloudflare` の `dist/` をプレビューへ配信する。独自ドメインをまだ割り当てない。
2. 現行本番の `sitemap.xml` の公開URLとプレビューの対応パスを突き合わせる。109件をHTTP 200で照合し、404・意図しないリダイレクトを解消する。
3. 既存画像は作成・削除・差し替えせず、現行本番の画像URL一覧とプレビューの同一パスを一件ずつHTTP 200、Content-Type、画像サイズで比較する。画像の差異があれば切替を中止する。
4. `canonical` は既存の `https://carvista.jp/` を維持する。`robots.txt`、`sitemap.xml`、`ads.txt`、Search Console所有権ファイル、JSON-LD、GA4の計測IDを照合する。広告クリックのGA4イベントは許可済み案件の実リンクがない限り成果とは扱わない。
5. 375、390、430pxの実画面で画像比較、横スクロール、表、余白、Console Errorを確認する。モバイル未確認なら移行しない。

## DNS変更直前の記録と承認

1. Cloudflareの現在のDNSレコードをエクスポートし、`A`、`AAAA`、`CNAME`、`MX`、`TXT`（SPF・DKIM・DMARC・所有権確認）、`CAA`、`DS`/DNSSEC、プロキシ設定、TTLを保存する。
2. Vercelの現在のドメイン設定・最終READYデプロイID・SSL証明書状態を保存する。メールの送受信はMXだけでなくSPF/DKIM/DMARCも確認する。
3. OWNERの本番公開・DNS変更承認後に限りPagesのカスタムドメイン設定と必要なWeb向けDNSレコードのみ変更する。メール向けレコードやDNSSECを無断で変更しない。
4. `http`→`https`、`www`の正規化、全109URL、主要画像、canonical、サイトマップ、GA4リアルタイムを本番で確認する。新規URLがある場合はSearch Consoleの登録申請を行う。

## ロールバック

1. 旧Vercelプロジェクトと最後の正常な本番デプロイを削除・停止しない。
2. 切替前に保存したWeb向けDNS設定へ戻し、Cloudflare Pagesのカスタムドメインの接続先を外す。メール関連レコードは維持する。
3. DNS伝播後、旧Vercelで代表URL、画像、HTTPS、canonical、GA4と問い合わせ先を検証する。SSLやDNSSECに不一致があればそのまま運用再開しない。
4. Search Consoleのサイトマップ・カバレッジを監視し、原因と切替時間を記録する。
