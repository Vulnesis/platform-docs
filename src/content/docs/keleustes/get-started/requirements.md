---
title: Requirements
description: Operating systems and architectures Keleustes is built for, the Linux runtime libraries it needs, network ports, and what a node needs.
order: 2
sources: [keleustes/.github/workflows/release.yml, keleustes/docs/install.md, keleustes/install.sh, keleustes/crates/kls-core/src/lib.rs, keleustes/crates/kls-app/src/main.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

## Platforms

Each release carries one binary per platform. The release workflow builds them natively.

| Release asset | Platform | Minimum |
|---|---|---|
| `keleustes-linux-amd64` | Linux x86_64 | glibc 2.35 (built on Ubuntu 22.04) |
| `keleustes-linux-arm64` | Linux aarch64 | glibc 2.35 |
| `keleustes-darwin-arm64` | macOS, Apple silicon | macOS 11 |
| `keleustes-darwin-amd64` | macOS, Intel | macOS 11 |
| `keleustes-windows-amd64.exe` | Windows x86_64 | Runs on arm64 Windows under emulation |

There is no musl build and no native Windows arm64 build. On another platform, [build from source](/keleustes/get-started/install/#from-source).

## Linux runtime libraries

The Linux binary links the system GTK 3, which the tray menu uses. It loads X11 or Wayland, OpenGL and libayatana-appindicator at run time.

| Distribution | Command |
|---|---|
| Debian, Ubuntu | `sudo apt-get install libgtk-3-0 libayatana-appindicator3-1` |
| Fedora | `sudo dnf install gtk3 libayatana-appindicator-gtk3` |
| Arch | `sudo pacman -S gtk3 libayatana-appindicator` |
| openSUSE | `sudo zypper install gtk3 libayatana-appindicator3-1` |

Without appindicator the window runs with no tray icon, and closing the window then quits the app. `keleustes --headless` needs GTK 3 installed but no display.

## Display

The window opens at 1200 by 780 and does not shrink below 760 by 480.

On Wayland an app cannot un-minimise itself. When a tray action or a `keleustes open` link asks for the window, Keleustes highlights it in the taskbar and you restore it from there.

## Network

| Port | Direction | Purpose |
|---|---|---|
| TCP 7443 (the `node.listen_addr` setting, default `0.0.0.0:7443`) | Nodes to Keleustes | Join, then gRPC over mutual TLS 1.3 |

Nodes dial Keleustes, so the machine that runs Keleustes must be reachable from every node on that port. Keleustes does not dial the nodes. Change the address with:

```sh
keleustes config node.listen_addr 0.0.0.0:7443
keleustes config node.advertise_addrs 10.0.0.5:7443
```

`node.advertise_addrs` is the comma separated list of addresses a join token tells a node to dial. When it is empty and Keleustes listens on every interface, the token lists each non-loopback interface address, then loopback.

Keleustes refuses to start when the node port is taken, and says so before any window opens.

## Nodes

A node is a host with [belai](/software-factory/belai/install-and-sign-in/) installed. It joins with `/connect <token>` inside belai or `belai connect <token>` from a shell, then takes work with `belai rc`.

## Database

SQLite needs nothing: Keleustes creates `keleustes.db` in the data directory. To use Postgres, pass a `postgres://` URL with `--database-url` or `KELEUSTES_DATABASE_URL`. Only `sqlite:` and `postgres:` URLs are accepted.

## Optional tools

| Tool | Needed for |
|---|---|
| `gh`, `glab`, `tea` | Reaching GitHub, GitLab, and Gitea, Forgejo or Codeberg from the machine that runs Keleustes. A node's own CLI can be used instead. See [Repositories and forges](/keleustes/using/repos-and-forges/). |
| `git` | Git operations Keleustes runs on its own machine for a forge connection |
| `cosign` | Checking the release provenance at install |
| `openssl` 3 or newer | Checking the release signature at install, once releases are signed |

## Account

None. Keleustes has no Vulnesis sign-in and needs no licence key.
