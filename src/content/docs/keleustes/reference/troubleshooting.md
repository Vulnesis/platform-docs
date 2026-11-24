---
title: Troubleshooting
description: Fixes for Keleustes start-up, install, node join, tray, window, vault and CLI problems, with the messages the app prints.
order: 6
sources: [keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-app/src/tray.rs, keleustes/crates/kls-app/src/desktop.rs, keleustes/crates/kls-node/src/server.rs, keleustes/crates/kls-node/src/token.rs, keleustes/crates/kls-vault/src/lib.rs, keleustes/crates/kls-store/src/lib.rs, keleustes/install.sh, keleustes/docs/install.md, keleustes/docs/skills/keleustes-operator/SKILL.md]
checked: [keleustes@e13fb9b]
updated: 24 Nov 2026
status: available
---

Keleustes logs to standard error. Start it from a terminal to read the log, and raise the detail with `RUST_LOG=debug keleustes`.

## Install

| Symptom | Cause and fix |
|---|---|
| The installer cannot find a release with the default `latest` | The only release is a pre-release, which GitHub's latest release skips. Pass `--version v0.1.0-rc.1`. |
| `--require-signature` refuses to install | Releases are not signed yet and `install.sh` pins no key. Drop the flag. The SHA-256 and provenance checks still run. |
| A warning that the signature check was skipped | Releases are unsigned today, so this warning does not appear. Once a release key is pinned, it means the `openssl` on `PATH` has no Ed25519 support (the LibreSSL in macOS does not). Install OpenSSL 3 or newer. |
| The provenance step did not run | `cosign` is not on `PATH`. Install it, or pass `--require-provenance` to make its absence an error. |
| `keleustes: command not found` after install | The install directory is not on `PATH`. The installer says so when it finishes. |
| The window does not open on Linux | GTK 3 is missing. Install the [runtime libraries](/keleustes/get-started/requirements/#linux-runtime-libraries). |

## Start-up

| Symptom | Cause and fix |
|---|---|
| `cannot listen for nodes on 0.0.0.0:7443` | Another process holds the port, often another Keleustes. Quit it, or run `keleustes config node.listen_addr HOST:PORT`. |
| `keleustes` exits at once and no new window appears | A window already runs on this data directory. The command handed over to it and brought it forward. |
| `no home directory to keep Keleustes data in; pass --data` | The user has no home directory. Pass `--data DIR`. |
| `unsupported database url (want sqlite: or postgres:)` | `--database-url` or `KELEUSTES_DATABASE_URL` uses another scheme |
| The CLI shows an empty fleet while the app shows nodes | The command used another data directory or database. Pass the same `--data` and `--database-url` as the app. |

## Window and tray

| Symptom | Cause and fix |
|---|---|
| Closing the window quits Keleustes | No system tray was found. On Linux install libayatana-appindicator. The log says `no system tray; closing the window quits`. |
| Closing the window does not quit | That is the behaviour with a tray. Use **Quit** in the tray menu. |
| On Wayland the window does not come to the front | An app cannot un-minimise itself on Wayland. Keleustes highlights the window in the taskbar. Restore it from there. |
| A `keleustes://` link does nothing when clicked | The scheme is not registered. See [Deep links](/keleustes/reference/deep-links/#clicking-a-link-outside-the-terminal). |
| No desktop notifications | Check **Mute notifications** in the tray menu and the notification settings on the [Settings](/keleustes/using/settings/) screen. Headless mode sends none. |

## Nodes

| Symptom | Cause and fix |
|---|---|
| `join token is unknown, used or expired` | A token works once and expires, after 15 minutes by default. Create a new one. |
| The host cannot reach Keleustes with a valid token | The token advertises addresses the host cannot dial. Set `keleustes config node.advertise_addrs HOST:PORT`, check that the port is open between the two machines, then create a new token. |
| A node shows as joined but offline | No belai process on the host holds the link. Run `belai connect status` on the host, then `belai rc`. |
| `sessions dispatch` reports an ambiguous node | Two nodes share a name. Use the node id from `keleustes nodes list`. |
| A revoked node cannot reconnect | Revocation is final for that certificate. Join the host again with a new token. |

## Sessions and the CLI

| Symptom | Cause and fix |
|---|---|
| Exit code 5 from `sessions dispatch` or `sessions wait` | The `--timeout` passed. Nothing was cancelled and the session goes on. Wait again, or stop it with `keleustes sessions command <id> stop`. |
| Exit code 6, `refused_paused` or `refused_stopped` | The kill switch is on. Retrying does not help. Lift it with `keleustes host resume` or **Resume** in the tray menu. |
| Exit code 7 | A policy refused the request: the A2A blackout, the node, or a Keleustes policy. The envelope's `error.remediation` says which. |
| An ended session will not take a prompt | Ended sessions are not reopened. Use `keleustes sessions resume <id>` or dispatch a new one. |

For any failure, run the command again with `--json` and read `code`, `error.remediation` and `next[]` in the last line.

## Vault

| Symptom | Cause and fix |
|---|---|
| A warning that the master key is in `vault.key` | No OS keyring was usable. The key is in the data directory with mode 0600. That is expected for a service user. |
| `the vault master key does not match this database's sealed secrets` | The keyring entry or `vault.key` was replaced, or the database came from another machine. Restore the original key. See [Data directory](/keleustes/reference/data-directory/#the-vault-master-key). |

## Forges

Run `keleustes forge status`. It prints one line per connection with the host, the login, the route and any missing scopes, and exits non-zero when a connection is not signed in. For github.com, `keleustes github login --refresh` adds the scopes the token lacks. See [Repositories and forges](/keleustes/using/repos-and-forges/).

## Audit ledger

```sh
keleustes host verify
```

It exits 1 when a chain in the audit ledger is broken.

## Report a problem

Open an issue at [github.com/Vulnesis/keleustes](https://github.com/Vulnesis/keleustes/issues). Include `keleustes --version`, the OS, and the log lines around the failure. `keleustes analyze-usage --json` lists refusals, lost sessions and unanswered asks from the last seven days.
