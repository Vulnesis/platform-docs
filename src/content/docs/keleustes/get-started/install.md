---
title: Install, upgrade and uninstall
nav: Install
description: Install Keleustes with the shell installer, Homebrew, Scoop, Nix or cargo, verify the download, upgrade it and remove it.
order: 3
sources: [keleustes/docs/install.md, keleustes/install.sh, keleustes/README.md, keleustes/flake.nix, keleustes/nix/module.nix, keleustes/justfile, keleustes/.github/workflows/release.yml]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Every method installs the same release binary, apart from Nix and cargo, which build from source. Check [Requirements](/keleustes/get-started/requirements/) first: on Linux the window needs GTK 3.

> [!CAREFUL] The only release today is a pre-release
> As of 23 Nov 2026 the one published release is `v0.1.0-rc.1`, marked as a pre-release. The installer's default, `latest`, follows GitHub's latest release, which skips pre-releases. Pass `--version v0.1.0-rc.1` until a stable release exists. The Homebrew tap and the Scoop bucket did not carry Keleustes on that date; the release workflow is what publishes them.

## Shell installer (Linux, macOS)

```sh
curl -fsSL https://raw.githubusercontent.com/Vulnesis/keleustes/main/install.sh | sh
```

Options go after `sh -s --`:

```sh
curl -fsSL https://raw.githubusercontent.com/Vulnesis/keleustes/main/install.sh | sh -s -- --version v0.1.0-rc.1
curl -fsSL https://raw.githubusercontent.com/Vulnesis/keleustes/main/install.sh | sh -s -- --install-dir ~/.local/bin
curl -fsSL https://raw.githubusercontent.com/Vulnesis/keleustes/main/install.sh | sh -s -- --require-provenance
```

| Option | Environment variable | Default |
|---|---|---|
| `--install-dir DIR` | `INSTALL_DIR` | `/usr/local/bin`, then `~/.local/bin` when that is not writable |
| `--version vX.Y.Z` | `VERSION` | `latest`, resolved to one tag so the binary and its checksum come from the same release |
| `--require-provenance` | `KELEUSTES_REQUIRE_PROVENANCE=1` | Off |
| `--require-signature` | `KELEUSTES_REQUIRE_SIGNATURE=1` | Off |
| `--insecure-skip-verify` | `KELEUSTES_INSECURE_SKIP_VERIFY=1` | Off. Skips every check below. |
| | `KELEUSTES_DOWNLOAD_BASE=URL` | Fetch the assets from a mirror or a `file://` directory |
| `--help` | | Prints the options |

After installing, the script runs `keleustes --version`, says on Linux whether GTK 3 and libayatana-appindicator are present, and says when the install directory is not on `PATH`.

## What the installer verifies

1. **Size.** The download matches the server's `Content-Length`.
2. **Signature.** Not set up yet. `install.sh` has no release key pinned (`RELEASE_PUBLIC_KEY` is empty) and releases carry no `checksums.txt.sig`, so nothing is checked at this step. `--require-signature` therefore refuses to install today. Once a key is pinned, a missing or bad signature stops the install. That check needs `openssl` with Ed25519 (OpenSSL 3 or newer; the LibreSSL in macOS cannot do it). Without one it is skipped with a warning, unless you pass `--require-signature`.
3. **Checksum.** The binary's SHA-256 matches `checksums.txt`. A mismatch stops the install. So does a missing SHA-256 tool, a missing `checksums.txt`, or no entry for the asset.
4. **Provenance.** With `cosign` on `PATH`, the release's SLSA v1 provenance (`provenance.sigstore.json`) must name this exact binary. A bundle that does not verify stops the install. Without `cosign` this step is skipped, unless you pass `--require-provenance`.

### Verify by hand

```sh
v=v0.1.0-rc.1; a=keleustes-linux-amd64
base=https://github.com/Vulnesis/keleustes/releases/download/$v
curl -fsSLO $base/$a -O $base/checksums.txt -O $base/provenance.sigstore.json
sha256sum --ignore-missing -c checksums.txt
cosign verify-blob-attestation --bundle provenance.sigstore.json --new-bundle-format \
  --type slsaprovenance1 \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  --certificate-identity-regexp '^https://github\.com/(Vulnetix|Vulnesis)/cli/\.github/workflows/slsa-provenance\.yml@' \
  --certificate-github-workflow-repository Vulnesis/keleustes \
  $a
```

## Homebrew (macOS, Linux)

```sh
brew install vulnetix/tap/keleustes
brew upgrade vulnetix/tap/keleustes
```

It is a formula, not a cask. It installs the release binary as `bin/keleustes`, which you start from a terminal.

## Scoop (Windows)

```powershell
scoop bucket add vulnetix https://github.com/Vulnesis/scoop-bucket
scoop install keleustes
scoop update keleustes
```

Scoop adds a Start menu shortcut named Keleustes.

## Nix

```sh
nix run github:Vulnesis/keleustes                  # try it
nix profile install github:Vulnesis/keleustes      # install
nix develop github:Vulnesis/keleustes              # toolchain for building
```

The flake exposes `packages.<system>.keleustes` (also `default`), `overlays.default`, which adds `pkgs.keleustes`, and `nixosModules.default`. The package builds from source and installs the desktop entry and icons on Linux. The NixOS module is on [Run headless](/keleustes/get-started/headless/#nixos-module).

## From source

```sh
cargo install --locked --git https://github.com/Vulnesis/keleustes kls-app
```

You need `protoc` 3.15 or newer. On Linux you also need `pkg-config` and the development packages for GTK 3 and D-Bus, `libgtk-3-dev libdbus-1-dev` on Debian and Ubuntu.

## Linux menu entry and links

Only the Nix package installs the application menu entry and the `keleustes://` link handler. From a checkout of the repository, this builds the binary and installs both into your home directory:

```sh
just install-desktop
```

## Upgrade

| Method | Command |
|---|---|
| Shell installer | Run the installer again |
| Homebrew | `brew upgrade vulnetix/tap/keleustes` |
| Scoop | `scoop update keleustes` |
| cargo | Run the `cargo install` command again |

Keleustes does not check for updates or update itself.

## Uninstall

| Method | Command |
|---|---|
| Shell installer | `rm "$(command -v keleustes)"` |
| Homebrew | `brew uninstall keleustes` |
| Scoop | `scoop uninstall keleustes` |
| Nix | `nix profile remove keleustes` |

Your data stays in the [data directory](/keleustes/reference/data-directory/) until you delete it.

## Not shipped yet

Releases carry bare binaries only. There is no `.dmg`, `.msi`, `.deb`, `.rpm` or AppImage on a release, and no auto-update. The repository can build those installers locally with `just package` and `just package-rpm`. The full list is on [Not available yet](/keleustes/reference/not-available-yet/).
