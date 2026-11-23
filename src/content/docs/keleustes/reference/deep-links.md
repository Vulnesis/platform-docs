---
title: Deep links
description: The keleustes:// link format, the screen names and query keys it accepts, how old web console paths map, and how links reach the window.
order: 5
sources: [keleustes/crates/kls-app/src/desktop.rs, keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-ui/src/lib.rs, keleustes/packaging/keleustes.desktop, keleustes/justfile]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

A `keleustes://` link opens a screen in the running window and, when it names one, focuses an item there. Desktop notifications use these links, and you can open one yourself.

## Open a link

```sh
keleustes open keleustes://sessions/<session-id>
keleustes open keleustes://fleet
keleustes open
```

`keleustes open` hands the link to the window that runs on the same data directory, then exits. The window navigates and comes to the front. With no window running, the command starts the app and opens the link there. With no URL it brings the window forward and shows the Cockpit.

On Wayland the window cannot raise itself. Keleustes highlights it in the taskbar instead.

## Format

```text
keleustes://<screen>[/<id>][?<key>=<value>]
```

The screen name is not case sensitive. `keleustes://open/<screen>/…` is accepted as the same link, and an empty link opens the Cockpit.

| Screen | Name in a link | Other accepted names |
|---|---|---|
| Cockpit | `cockpit` | |
| Events | `events` | |
| Board | `board` | `card` |
| Checkpoints | `checkpoints` | `approvals`, `approval`, `needs` |
| Workforce | `workforce` | |
| Sessions | `sessions` | `session` |
| Workflows | `workflows` | `workflow` |
| Templates | `templates` | |
| Runs | `runs` | `run` |
| Repositories | `repositories` | `repos`, `repo` |
| Conflicts | `conflicts` | `conflict` |
| Delivery | `delivery` | |
| Budgets | `budgets` | |
| Vault | `vault` | |
| Trust | `trust` | |
| Audit | `audit` | |
| Memory | `memory` | |
| Library | `library` | |
| Fleet | `fleet` | |
| Settings | `settings` | |

## The item to focus

The rest of the path after the screen is the item, for example `keleustes://repos/acme/api`. A query key takes priority over the path. These keys are read, in this order: `id`, `card`, `session`, `run`, `repo`, `item`, `section`, `teleport`, `seq`, then `node`.

```text
keleustes://sessions/3f2a…
keleustes://board?card=K-1
keleustes://fleet?node=build-box
keleustes://conflicts/acme/api%2342
```

Values are percent-decoded. Encode `#` as `%23`, because everything after a bare `#` is dropped. A link Keleustes cannot parse is logged as unknown and ignored, and the window still comes forward.

## Old web console paths

Keleustes also accepts the paths the web console used, so links in old mail and issue comments still land somewhere. The host is ignored, and the `resolve/` prefix is optional.

```sh
keleustes open "https://www.vulnetix.com/resolve/belai-sessions?session=<id>"
keleustes open /resolve/factory-audit
```

| Path | Screen |
|---|---|
| `factory` | Cockpit |
| `factory-events` | Events |
| `factory-board`, `belai-kanban` | Board |
| `factory-checkpoints` | Checkpoints |
| `factory-workforce`, `factory-agent`, `belai-agents` | Workforce |
| `factory-session`, `belai-sessions` | Sessions |
| `factory-workflows` | Workflows |
| `factory-templates` | Templates |
| `factory-runs`, `factory-run` | Runs |
| `factory-repos` | Repositories |
| `factory-budgets` | Budgets |
| `vault` | Vault |
| `factory-trust` | Trust |
| `factory-audit`, `belai-audit` | Audit |
| `factory-memory` | Memory |
| `factory-conflicts` | Conflicts |
| `factory-delivery…` | Delivery |
| `belai-library` | Library |
| `belai-hosts`, `belai-fleet` | Fleet |
| `factory-settings` | Settings |

## Clicking a link outside the terminal

For the OS to hand a clicked `keleustes://` link to the app, the scheme has to be registered. On Linux the desktop entry `packaging/keleustes.desktop` does it, with `Exec=keleustes open %u`. The Nix package installs that entry. From a checkout, `just install-desktop` installs it and runs:

```sh
xdg-mime default keleustes.desktop x-scheme-handler/keleustes
```

The release binaries for macOS and Windows do not register the scheme. Use `keleustes open <url>` there.

## Links in notifications

| Notification | Opens |
|---|---|
| An approval or a gate waits | `keleustes://checkpoints/<key>` |
| A session asks a question | `keleustes://sessions/<session-id>` |
| A merge conflict on a pull request | `keleustes://conflicts/<subject>` |
| A run failed, or a workflow sent a notice | `keleustes://runs/<run-id>` |
| A session was lost or ended badly | `keleustes://sessions/<session-id>` |
| A budget alert | `keleustes://budgets` |
| A key rotation failed | `keleustes://vault` |
| A host asks for attention | `keleustes://fleet` |
