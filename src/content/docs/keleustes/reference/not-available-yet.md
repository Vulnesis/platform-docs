---
title: Not available yet
description: What Keleustes does not ship or do today, such as installers, auto-update and signed checksums, with what to use instead.
order: 7
sources: [keleustes/README.md, keleustes/docs/install.md, keleustes/install.sh, keleustes/.github/workflows/release.yml, keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-app/src/desktop.rs, keleustes/nix/module.nix]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: planned
---

This page lists what is missing at `keleustes@e13fb9b`, release `v0.1.0-rc.1`. Nothing here exists in that build, whatever another page or an older note suggests.

## Releases and packaging

| Not available | Use instead |
|---|---|
| A stable release. The one release, `v0.1.0-rc.1`, is a pre-release. | Install it by tag: `--version v0.1.0-rc.1` |
| Auto-update, or any update check. There is no release channel to update from. | Upgrade with the method you installed with. See [Install](/keleustes/get-started/install/#upgrade). |
| Installers on a release: `.dmg`, `.msi`, NSIS, `.deb`, `.rpm`, pacman, AppImage | The bare release binary. From a checkout, `just package` and `just package-rpm` build installers locally. |
| A signed `checksums.txt`. `install.sh` pins no release key and no `checksums.txt.sig` is published. | The SHA-256 check against `checksums.txt`, and the SLSA provenance with `cosign` |
| The Homebrew formula and the Scoop manifest. Neither was in the tap or the bucket on 23 Nov 2026. | The shell installer, or the binary from the release page |
| A musl Linux build, a native Windows arm64 build | Build from source. The Windows x86_64 build runs on arm64 under emulation. |
| A macOS app bundle, notarisation, a cask | The formula installs a plain binary you start from a terminal |
| A `LICENSE` file in the repository | `Cargo.toml` declares Apache-2.0 |

## Desktop integration

| Not available | Use instead |
|---|---|
| `keleustes://` registered as a link handler by the release binaries | `keleustes open <url>`. On Linux, the Nix package or `just install-desktop` registers it. |
| An application menu entry from the shell installer or Homebrew | Start `keleustes` from a terminal, or install the desktop entry as above |
| Raising the window on Wayland | The taskbar highlight |
| Global keyboard shortcuts, or rebinding | The [shortcuts that exist](/keleustes/reference/keyboard-shortcuts/) |
| Start at login | Your OS's own autostart, or [headless](/keleustes/get-started/headless/) as a service |

## Running as a service

| Not available | Use instead |
|---|---|
| A systemd unit, launchd plist or Windows service in the release | The [NixOS module](/keleustes/get-started/headless/#nixos-module), or your own unit around `keleustes --headless` |
| A backup or restore command | Copy the [data directory](/keleustes/reference/data-directory/#back-up) |
| Desktop notifications in headless mode | The Events screen, or `keleustes sessions wait` |

## By design, not planned gaps

These are choices, listed here so you do not look for them.

| Keleustes does not | Why |
|---|---|
| Sign in to Vulnesis | It is a local app with no account |
| Offer a web console | The window and the CLI are the interfaces |
| Run sessions or sandboxes itself | Sessions run on belai nodes. Hosted machines are [Keleustes Sandboxes](/keleustes/sandboxes/overview/), a separate product. |
| Store a forge token | It drives `gh`, `glab` or `tea`, which keep their own sign-in |
| Dial out to nodes | Nodes dial Keleustes on the node port |
