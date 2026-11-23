---
title: Data directory
description: Where Keleustes keeps its database, certificate authority, artifacts and vault key on each OS, and what to back up.
order: 3
sources: [keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-core/src/lib.rs, keleustes/crates/kls-core/src/vault.rs, keleustes/crates/kls-vault/src/lib.rs, keleustes/crates/kls-node/src/pki.rs, keleustes/crates/kls-core/src/artifacts.rs, keleustes/crates/kls-app/src/desktop.rs, keleustes/docs/install.md]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Keleustes keeps everything it owns in one directory. The app, `keleustes --headless` and every CLI command must use the same one to see the same fleet.

## Location

| OS | Default path |
|---|---|
| Linux | `~/.local/share/keleustes` |
| macOS | `~/Library/Application Support/is.vulnes.keleustes` |
| Windows | `%APPDATA%\vulnes\keleustes\data` |
| NixOS module | `/var/lib/keleustes` |

Choose another with `--data DIR` or `KELEUSTES_DATA`:

```sh
keleustes --data ~/factory-test
keleustes --data ~/factory-test token new --label laptop
```

Each data directory is its own Keleustes, with its own certificate authority and nodes. Two instances cannot listen on the same port, so give a second one another `node.listen_addr`.

## Contents

| Path | What it is |
|---|---|
| `keleustes.db` | The SQLite database: nodes, sessions, board, workflows, settings, audit ledger, sealed vault entries. Absent when you use `--database-url`. |
| `ca/ca.key.pem`, `ca/ca.crt.pem` | The local certificate authority that issues node certificates |
| `ca/server.key.pem`, `ca/server.crt.pem` | The server key and certificate. Join tokens pin this key. |
| `artifacts/` | Teleport bundles and evidence |
| `vault.key` | The vault master key, mode 0600. Present only when the OS keyring is not used. |
| `keleustes.sock` | Unix socket a running window listens on for `keleustes open`. Removed when the window closes. |
| `keleustes.port` | Windows only: the loopback port that does the same job |

When the data directory path is too long for a Unix socket, the socket goes in `XDG_RUNTIME_DIR` (or the temporary directory) as `keleustes-<hash>.sock`.

## The vault master key

Each vault value is sealed with XChaCha20-Poly1305 under a 256-bit master key. Keleustes stores that key in the OS keyring, under the service name `keleustes` and an account equal to the server id.

When no keyring is usable, Keleustes writes the key to `vault.key` in the data directory with mode 0600, and the Vault screen shows a warning that says so. Set `KELEUSTES_VAULT_BACKEND=file` to choose the file outright, which is what a headless service user normally needs.

The database holds only sealed values. If the keyring entry or the key file is replaced, Keleustes refuses to open the vault and reports that the master key does not match the sealed secrets.

## Postgres

With `--database-url postgres://…` or `KELEUSTES_DATABASE_URL`, the tables live in Postgres. The `ca/` and `artifacts/` directories, the socket and any `vault.key` stay in the data directory.

## Back up

Keleustes has no backup command. Quit the app, or stop the headless service, then copy:

1. The whole data directory.
2. The vault master key, if it is in the OS keyring and not in `vault.key`. A copy of the directory alone restores the fleet but not the sealed provider keys.
3. The Postgres database, if you use one.

```sh
tar -C ~/.local/share -czf keleustes-backup.tgz keleustes
```

Keep the backup private. `ca/ca.key.pem` can issue node certificates for your Keleustes.

You can also export the settings as YAML from the [Settings](/keleustes/using/settings/) screen. That file covers settings only.

## Reset

Quit Keleustes and delete the data directory, and the Postgres database if you use one. The next start creates a new certificate authority and server id, so every node has to join again with a new token.
