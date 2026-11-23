---
title: Run headless
description: Run keleustes --headless as a service with no window, use the NixOS module, and point Keleustes at Postgres.
order: 5
sources: [keleustes/crates/kls-app/src/main.rs, keleustes/nix/module.nix, keleustes/flake.nix, keleustes/docs/install.md, keleustes/crates/kls-store/src/lib.rs, keleustes/crates/kls-core/src/vault.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

`keleustes --headless` serves nodes without opening a window. It runs the node port, the workflow scheduler and executor, the forge poller and the audit ledger, the same as the app. You drive it with the [CLI](/keleustes/reference/cli/) on the same data directory.

```sh
keleustes --headless
keleustes --headless --data /var/lib/keleustes
```

It logs to standard error and runs until it receives Ctrl-C or the node server stops. There is no tray, no desktop notification and no `keleustes://` hand-off in this mode.

On Linux the binary still needs GTK 3 installed, but no display.

## Operate it from a shell

Run commands as the same user, with the same `--data`:

```sh
keleustes --data /var/lib/keleustes token new --label build-box
keleustes --data /var/lib/keleustes nodes list
keleustes --data /var/lib/keleustes sessions list --open
```

Set the listen address and the addresses tokens advertise before you start it, or at any time:

```sh
keleustes --data /var/lib/keleustes config node.listen_addr 0.0.0.0:7443
keleustes --data /var/lib/keleustes config node.advertise_addrs factory.example.internal:7443
```

## Logging

Log filtering reads `RUST_LOG`. The default is `info,sqlx=warn`.

```sh
RUST_LOG=debug keleustes --headless
```

## The vault key on a server

Keleustes keeps the vault master key in the OS keyring. A service user usually has no keyring, so the key falls back to a `vault.key` file, mode 0600, in the data directory. To choose the file outright, set:

```sh
KELEUSTES_VAULT_BACKEND=file
```

Back that file up with the database. Without it the sealed provider keys cannot be read.

## Postgres

By default Keleustes uses `keleustes.db` (SQLite) in the data directory. To use Postgres:

```sh
keleustes --headless --database-url postgres://keleustes@localhost/keleustes
```

Or set `KELEUSTES_DATABASE_URL`, which keeps a password out of the process list. Keleustes applies its migrations when it opens the database. Every CLI command needs the same URL, or it opens the SQLite file instead. The certificate authority and artifacts stay in the data directory either way.

## NixOS module

The flake's `nixosModules.default` runs `keleustes --headless` as `keleustes.service`.

```nix
{
  inputs.keleustes.url = "github:Vulnesis/keleustes";

  outputs = { nixpkgs, keleustes, ... }: {
    nixosConfigurations.factory = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        keleustes.nixosModules.default
        {
          services.keleustes = {
            enable = true;
            listenAddress = "0.0.0.0:7443";
            advertiseAddrs = [ "factory.example.internal:7443" ];
            openFirewall = true;
          };
        }
      ];
    };
  };
}
```

| Option | Default | Meaning |
|---|---|---|
| `enable` | `false` | Run the service |
| `package` | The flake's package | The Keleustes package |
| `user`, `group` | `keleustes` | Created when left at the default |
| `dataDir` | `/var/lib/keleustes` | Database, `ca/`, `artifacts/` and `vault.key`. Created with mode 0700. |
| `listenAddress` | `0.0.0.0:7443` | The `node.listen_addr` setting |
| `advertiseAddrs` | `[]` | The `node.advertise_addrs` setting |
| `databaseUrl` | `null` | Postgres instead of SQLite |
| `environmentFile` | `null` | A systemd `EnvironmentFile`, for example for `KELEUSTES_DATABASE_URL` with a password, or `RUST_LOG` |
| `settings` | `{}` | More `keleustes config KEY VALUE` settings |
| `openFirewall` | `false` | Open the listen port |
| `extraArgs` | `[]` | Appended to `keleustes --headless` |

The module writes its settings with `keleustes config` before each start, so a value you change by hand is overwritten at the next restart. The unit restarts on failure and runs with systemd hardening: the data directory is the only writable path.

Create a join token on that host as the service user:

```sh
sudo -u keleustes keleustes --data /var/lib/keleustes token new --label build-box
```

## Other init systems

The repository ships no systemd unit, launchd plist or Windows service outside the NixOS module. Write your own around `keleustes --headless --data DIR`, run it as a dedicated user, and keep the data directory private to that user.
