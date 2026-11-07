# OneDrive development-data cleanup inventory — 2026-11-07

This is a read-only inventory. No file or folder was deleted. Sizes are locally hydrated logical sizes; OneDrive cloud-only placeholders can report zero bytes, so they are not counted as reclaimable capacity without a separate sync-status check.

## A — safe to remove after one-time owner approval

| Absolute path | Local size | Last modified | Why removable | Regenerate |
| --- | ---: | --- | --- | --- |
| `C:\Users\daich\OneDrive\ドキュメント\Car Evolution\dist` | 0.172 GiB (407 files) | 2026-10-29 | Vite build output. Source, Git history, images and configuration are outside this directory. The active Codex worktree has its own build output. | From the Car Evolution source directory: `npm ci`, then `npm run build` |

Approval batch A total: **0.172 GiB locally measured**.

## B — conditional; do not remove yet

| Absolute path | Local size | Last modified / state | Blocking condition |
| --- | ---: | --- | --- |
| `C:\Users\daich\OneDrive\ドキュメント\Car Evolution\.tmp-editorial-master\node_modules` | 0.352 GiB (8,531 files) | inner files updated 2026-11-04; OneDrive reparse point | The temporary tree has no package manifest or lockfile at its root, so its exact regeneration command and whether a recent process still uses it are not proven. Confirm it is abandoned before deletion. |
| `C:\Users\daich\OneDrive\ドキュメント\ChatGPT\WORLD → JAPAN WEB\artifacts\continuous-display-20261014\build` | under 1 MiB (5 files) | 2026-10-14 | Another project and an archived artifact. Reclaim is negligible; leave until its owner confirms it is disposable. |
| `C:\Users\daich\OneDrive\ドキュメント\監督録\kantoku-work\node_modules` | 0 bytes hydrated | cloud/reparse target unavailable locally | Another project; cloud size and sync state cannot be verified from this filesystem. |
| `C:\Users\daich\OneDrive\ドキュメント\監督録\postseason-phase-a\node_modules` | 0 bytes hydrated | cloud/reparse placeholder; no parent manifest found | Another project; regeneration and cloud size are unverified. |

Measured conditional total: **0.352 GiB plus cloud-only/placeholder content of unknown size**.

## C — protected; do not delete

- Every `.git` directory and pack file, including the approximately 688.5 MiB Car Evolution pack and 137 MiB WORLD → JAPAN WEB pack.
- Source code, `package.json`, lockfiles, Cloudflare configuration, environment files, databases, user data and backups.
- Original vehicle images, Master Assets, evidence images and audit records.
- Security/runtime state and data belonging to other projects.
- Delivery archives, videos and exported artifacts unless their project owner separately confirms that they are duplicate and recoverable.
- The active Codex worktree and its Cloudflare build/deploy files.

## Safety findings

- Candidate paths were resolved as absolute paths under `C:\Users\daich\OneDrive`.
- No recursive delete, move, trash or OneDrive recycle-bin operation was executed.
- OneDrive reparse points prevent a reliable proof of remote sync completion from filesystem metadata alone.
- The previously cited 1.82 GiB was not reproducible as safe-to-delete hydrated data: only 0.524 GiB was locally measurable across the two material candidates, and 0.352 GiB remains conditional. Large Git packs are protected rather than cleanup candidates.

## One-step approval request

If approved, delete only batch A (`C:\Users\daich\OneDrive\ドキュメント\Car Evolution\dist`) in the next operation. Do not empty the OneDrive recycle bin. Batch B requires separate proof and is not included in that approval.
