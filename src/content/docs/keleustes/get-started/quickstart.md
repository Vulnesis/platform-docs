---
title: Quickstart
description: Start Keleustes, create a join token, connect a belai host as a node, start a first session and find where the data is kept.
order: 4
sources: [keleustes/README.md, keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-app/src/cli.rs, keleustes/crates/kls-ui/src/fleet.rs, keleustes/crates/kls-ui/src/screens/sessions.rs, keleustes/crates/kls-node/src/token.rs, belai/docs/keleustes.md]
checked: [keleustes@e13fb9b, belai@86b34c9]
updated: 23 Nov 2026
status: available
---

You need Keleustes [installed](/keleustes/get-started/install/) on one machine and [belai](/software-factory/belai/install-and-sign-in/) installed on a host that will do the work. They can be the same machine.

## 1. Start the app

```sh
keleustes
```

The window opens on the Cockpit. Keleustes now listens for nodes on `0.0.0.0:7443`. The top bar shows how many nodes are online, and the navigation shows the port under the app name.

If the port is taken, Keleustes exits before the window opens and prints the command that changes it:

```sh
keleustes config node.listen_addr 0.0.0.0:7444
```

## 2. Create a join token

In the app, open **Fleet** and press **Add node**. Name the node, choose the expiry and press **Create token**. Keleustes shows a `/connect` command with the token in it. **Copy** copies that command. **Copy headless** copies the `belai connect <token>` form for a host with no terminal UI.

From a shell, beside the running app:

```sh
keleustes token new --label build-box
```

The token is printed on standard output. It starts with `kls1.`, works once, and expires after 15 minutes unless you pass `--ttl-minutes` or set `node.token_ttl_minutes`.

The token carries the addresses the host should dial. If the host cannot reach any of them, set the address yourself and create a new token:

```sh
keleustes config node.advertise_addrs 10.0.0.5:7443
```

## 3. Connect the host

On the host, inside the belai terminal UI:

```text
/connect kls1.…
```

Or from a shell:

```sh
belai connect kls1.…
```

The host joins and appears on the Fleet screen. Then let it take work for a project directory:

```sh
belai rc --dir ~/src/project
```

Check it from the Keleustes machine:

```sh
keleustes nodes list
```

Each line is the node id, name, hostname, belai version and `active` or `revoked`.

## 4. Start a session

In the app, open **Sessions**, press **New session**, pick the node and directory, write the prompt and press **Start**. The dialog needs an online node that runs `belai rc`. The [Sessions](/keleustes/using/sessions/) page covers the dialog and the transcript.

From a shell:

```sh
keleustes sessions dispatch --node build-box --cwd ~/src/project \
  --prompt "fix the flaky test" --wait 60
```

The first line printed is the dispatch id. Every session command accepts it in place of the session id. Follow the work and reply to it:

```sh
keleustes sessions list --open
keleustes sessions transcript <session-id> --follow
keleustes sessions prompt <session-id> "now add a regression test"
keleustes sessions command <session-id> stop
```

CLI commands work on the same data directory as the running app. The app picks up what they write within a couple of seconds.

## 5. Know where the data is

| OS | Data directory |
|---|---|
| Linux | `~/.local/share/keleustes` |
| macOS | `~/Library/Application Support/is.vulnes.keleustes` |
| Windows | `%APPDATA%\vulnes\keleustes\data` |

It holds `keleustes.db` (SQLite), `ca/` (the local certificate authority and the server key) and `artifacts/`. Use another directory with `--data DIR` or `KELEUSTES_DATA`. The vault master key is in the OS keyring, not in this directory, unless no keyring is usable. See [Data directory](/keleustes/reference/data-directory/).

## Closing the window

With a tray icon present, closing the window leaves Keleustes running and serving nodes. Use **Quit** in the tray menu to stop it. Start `keleustes` again, or run `keleustes open`, to bring the window back.

## Next

- [Fleet](/keleustes/using/fleet/): rename and revoke nodes.
- [Repositories and forges](/keleustes/using/repos-and-forges/): sign the forge CLI in.
- [Vault and trust](/keleustes/using/vault-and-trust/): store provider keys and grant them to nodes.
- [Run headless](/keleustes/get-started/headless/): serve nodes from a machine with no display.
