---
title: Keleustes
nav: Overview
description: What the open source Keleustes desktop app is, who it is for, how it differs from Keleustes Sandboxes, and what it does not do.
order: 1
sources: [keleustes/README.md, keleustes/Cargo.toml, keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-ui/src/lib.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Keleustes is the desktop Software Factory. It is a native app, written in Rust, that acts as the server for a fleet of [belai](/software-factory/belai/install-and-sign-in/) hosts. You start sessions on those hosts, watch their transcripts, answer their questions, run workflows and review what was delivered, all from one window on your own machine.

The source is at [github.com/Vulnesis/keleustes](https://github.com/Vulnesis/keleustes). The workspace declares the Apache-2.0 licence in `Cargo.toml`.

## Who it is for

Keleustes suits you if you want to run coding agents on machines you control, without a web console or an account. Your laptop, a build box and a server in a rack can all join the same Keleustes as nodes. Nothing in the app signs in to Vulnesis.

## One binary, three ways to run it

| Form | Command | What it does |
|---|---|---|
| Window | `keleustes` | Opens the app and serves nodes on port 7443 |
| Headless | `keleustes --headless` | Serves nodes with no window. See [Run headless](/keleustes/get-started/headless/). |
| CLI | `keleustes <command>` | Works on the same data directory, beside a running app. See the [CLI reference](/keleustes/reference/cli/). |

Closing the window does not stop Keleustes when a system tray is present. It keeps serving nodes, and the tray menu has **Quit**. With no tray, closing the window quits.

## How nodes connect

A node is a host that runs belai and has joined your Keleustes.

1. You create a single-use join token in Keleustes.
2. On the host, belai joins with that token. The connection is TLS pinned to the server key the token carries. The host sends a certificate request and the local certificate authority in Keleustes issues it a client certificate.
3. Everything after that is gRPC over mutual TLS 1.3 on the node port, `0.0.0.0:7443` by default.

The [quickstart](/keleustes/get-started/quickstart/) walks through it.

## The screens

The navigation has 20 screens in four groups.

| Group | Screens |
|---|---|
| Factory | [Cockpit, Events](/keleustes/using/cockpit-and-events/), [Board, Checkpoints](/keleustes/using/board-and-checkpoints/), [Workforce](/keleustes/using/workforce-and-library/), [Sessions](/keleustes/using/sessions/), [Workflows, Templates](/keleustes/using/workflows-and-templates/), [Runs](/keleustes/using/runs/) |
| Code | [Repositories](/keleustes/using/repos-and-forges/), [Conflicts, Delivery](/keleustes/using/conflicts-and-delivery/) |
| Govern | [Budgets](/keleustes/using/budgets/), [Vault, Trust](/keleustes/using/vault-and-trust/), [Audit, Memory](/keleustes/using/audit-and-memory/) |
| System | [Library](/keleustes/using/workforce-and-library/), [Fleet](/keleustes/using/fleet/), [Settings](/keleustes/using/settings/) |

## Keleustes and Keleustes Sandboxes

The two share a name and do different jobs.

| | Keleustes | Keleustes Sandbox |
|---|---|---|
| What it is | An open source desktop app you install | A hosted machine Vulnesis runs for you |
| Where sessions run | On belai hosts you joined yourself | In the sandbox |
| Account | None | Your Vulnesis organisation |
| Documented at | These pages | [Keleustes Sandboxes](/keleustes/sandboxes/overview/) |

## What it does not do

- It has no web console. The window and the CLI are the only interfaces.
- It has no Vulnesis sign-in.
- It runs no sandboxes and no sessions itself. Sessions run on the nodes.
- It holds no forge token. It drives the forge's own CLI (`gh`, `glab` or `tea`), on your machine or on a node. See [Repositories and forges](/keleustes/using/repos-and-forges/).
- It does not update itself. See [Not available yet](/keleustes/reference/not-available-yet/).

## Where your data lives

Everything is in one data directory on your machine: a SQLite database, the certificate authority, and artifacts. You can point it at Postgres instead. Provider keys in the vault are sealed with a master key that Keleustes keeps in the OS keyring. Paths are on [Data directory](/keleustes/reference/data-directory/).
