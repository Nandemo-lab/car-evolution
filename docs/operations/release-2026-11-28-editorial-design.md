# CarVista 編集デザイン刷新の復旧記録

- 変更対象のGitHub PR #3 コミット: `f7111d96317706fdf2420c9ca50fd0892701579c`（画面コードの最終変更は `cd99b85a9a626f00e946004bdcb52dcdfd1a9171`、次のコミットは画像指示書の根拠追記のみ）。
- Cloudflare本番バージョン: `bb0b1bba-051f-4adb-8aa4-afff545347ce`。直前に照合済みの111 URL版: `1c281910-4b50-4f2a-b7f4-c2487d46306b`（コミット `40fa78329883af45340fe02e355805e8b495c0fd`）。
- 既存画像357枚、公開URL 111件。ローカルの103テスト合格、45スマホ画面（375/390/430px）のCI合格、隔離Cloudflareプレビュー592照合項目の失敗0。新規URLなし。広告案件の新規掲載なし。
- 障害時は `wrangler deployments list --name carvista-static` で現行版と正常版を照合し、`wrangler rollback 1c281910-4b50-4f2a-b7f4-c2487d46306b --name carvista-static --message "Restore verified 111 URL release"`。画面刷新のみが戻り、既存111 URLと357画像は維持される。復旧時間は本番障害を起こす切り戻し試験を行っていないため未実測。
- 再ビルドは上記GitHubコミットを取得し、`npm ci && npm run build:cloudflare`、`node scripts/verify-cloudflare-preview.mjs --origin https://carvista-static-preview.nandemomail24.workers.dev --dist dist-cloudflare-preview` で隔離照合してから `wrangler deploy --config wrangler.jsonc`。旧Vercelには依存しない。既存画像はコミットに含まれ、公開検証時に357件を個別照合する。
- Vercelへの商用トラフィック迂回を消す変更は未実施。Cloudflare Workersの失敗時フェイルオープン設定とDNS / ルートを管理画面で確定し、失敗時もCloudflare側のエラーまたは正常静的版で止める設定案を別途承認に回す。影響は障害時の可用性と旧環境への迂回経路、費用は既存Free枠内の設定変更で追加契約なしの想定。切り戻しは設定値の事前記録から原状復帰。実際の設定値と無料枠条件は変更前に再照合する。
