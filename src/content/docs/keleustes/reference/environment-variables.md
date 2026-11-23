---
title: Environment variables
description: The environment variables Keleustes and its installer read, with their defaults.
order: 2
sources: [keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-core/src/vault.rs, keleustes/crates/kls-github/src/forge/kind.rs, keleustes/crates/kls-github/src/forge/push.rs, keleustes/crates/kls-app/src/desktop.rs, keleustes/install.sh, keleustes/nix/module.nix]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Keleustes keeps its settings in the database, not in the environment. You change them on the [Settings](/keleustes/using/settings/) screen or with `keleustes config KEY VALUE`. The variables below cover where the data is, which tools Keleustes runs, and the installer.

## The app and the CLI

| Variable | Default | Effect |
|---|---|---|
| `KELEUSTES_DATA` | The [platform data directory](/keleustes/reference/data-directory/) | Data directory. Same as `--data`. |
| `KELEUSTES_DATABASE_URL` | `<data>/keleustes.db` (SQLite) | Database URL, `sqlite:` or `postgres://`. Same as `--database-url`. |
| `KELEUSTES_VAULT_BACKEND` | OS keyring, with a file as fallback | Set to `file` to keep the vault master key in `<data>/vault.key` and skip the keyring |
| `RUST_LOG` | `info,sqlx=warn` | Log filter. Logs go to standard error. |

A flag wins over its variable.

```sh
KELEUSTES_DATA=/srv/keleustes keleustes nodes list
KELEUSTES_DATABASE_URL=postgres://keleustes@localhost/keleustes keleustes --headless
```

## Tools Keleustes runs

Keleustes finds these programs on `PATH` by their plain names. Each variable names another binary to run instead.

| Variable | Default | Program |
|---|---|---|
| `KELEUSTES_GH` | `gh` | The GitHub CLI |
| `KELEUSTES_GLAB` | `glab` | The GitLab CLI |
| `KELEUSTES_TEA` | `tea` | The Gitea CLI, also used for Forgejo and Codeberg |
| `KELEUSTES_GIT` | `git` | Git |

```sh
KELEUSTES_GH=/opt/gh/bin/gh keleustes github status
```

## Read from the desktop session

| Variable | Used for |
|---|---|
| `XDG_RUNTIME_DIR` | Where the single-instance socket goes when the data directory path is too long for a Unix socket. Falls back to the system temporary directory. |
| `WAYLAND_DISPLAY` | Detecting Wayland, where the app cannot raise its own window |

## The installer

`install.sh` reads these. Each has a matching flag, listed on [Install](/keleustes/get-started/install/#shell-installer-linux-macos).

| Variable | Default | Effect |
|---|---|---|
| `INSTALL_DIR` | `/usr/local/bin` | Where the binary goes |
| `VERSION` | `latest` | The release tag to install, for example `v0.1.0-rc.1` |
| `KELEUSTES_REQUIRE_PROVENANCE` | `0` | `1` fails unless `cosign` verifies the release provenance |
| `KELEUSTES_REQUIRE_SIGNATURE` | `0` | `1` fails unless `openssl` verifies the signature on `checksums.txt` |
| `KELEUSTES_INSECURE_SKIP_VERIFY` | `0` | `1` installs without any check |
| `KELEUSTES_DOWNLOAD_BASE` | Empty | A directory URL to fetch the assets from, such as a mirror or `file://` path. `VERSION` is then only a label. |
| `KELEUSTES_REPO` | `Vulnesis/keleustes` | The GitHub repository whose releases are used |

```sh
curl -fsSL https://raw.githubusercontent.com/Vulnesis/keleustes/main/install.sh | VERSION=v0.1.0-rc.1 INSTALL_DIR=~/.local/bin sh
```

## For tests and development only

`KELEUSTES_FORGE_HTTP_HOSTS` names forge hosts served over plain HTTP. Only the live test containers use it. `KELEUSTES_BIN`, `KLS_TEST_POSTGRES_URL` and the other `KLS_*` variables belong to the test suites and do nothing in the app.
