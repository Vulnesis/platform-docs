---
title: Fleet and host management
description: Join belai hosts with single-use tokens, read the node table, revoke a node, and manage one host from its eleven tabs.
order: 12
sources: [keleustes/crates/kls-ui/src/fleet.rs, keleustes/crates/kls-ui/src/screens/host.rs, keleustes/crates/kls-ui/src/lib.rs, keleustes/crates/kls-node/src/token.rs, keleustes/crates/kls-node/src/pki.rs, keleustes/crates/kls-node/src/lib.rs, keleustes/crates/kls-core/src/hosts.rs, keleustes/crates/kls-app/src/host_cmd.rs, keleustes/crates/kls-app/src/main.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Fleet** is in the System group. It lists the belai hosts (nodes) joined to this Keleustes, creates join tokens, and opens one node in a host view.

## Add a node

**Add node** opens a panel with two fields: **Name** (optional) and **Expires**, a slider from 5 to 1440 minutes that starts at 15. **Create token** shows the command `/connect <token>` to type in belai on the host.

| Control | Does |
|---|---|
| **Copy** | Copies `/connect <token>` |
| **Copy headless** | Copies `belai connect <token>` |
| **Done** | Closes the panel. The token is shown once. |

A token is single use. It carries the addresses to dial, a pin of the server key and a secret. Keleustes stores only the SHA-256 of the secret.

From the command line:

```sh
keleustes token new --label build-box
keleustes token new --label build-box --ttl-minutes 30
```

Without `--ttl-minutes` the command reads the `node.token_ttl_minutes` setting, else 15. The panel uses its own slider.

## The local CA

On first run Keleustes generates its own certificate authority in the `ca` folder of the [data directory](/keleustes/reference/data-directory/): `ca.key.pem`, `ca.crt.pem`, `server.key.pem` and `server.crt.pem`. The CA signs the server certificate and one client certificate for each node that joins. A joining node first pins the server key from its token, then trusts the CA certificate the join returns.

## The node table

| Column | Shows |
|---|---|
| **Status** | Online, Offline or Revoked. Hover a revoked node for the reason. |
| **Name** | The node name. Hover for its id. |
| **Host** | Hostname, operating system and architecture |
| **belai** | The belai version |
| **Last seen** | Time since the node was last seen, or "never" |
| **Capabilities** | Tags `rc`, `gh`, `terminal` and each provider, plus a count of harnesses the node can launch |

Each live row has three icon buttons: Open, Rename and Revoke. Clicking the row also opens the host view.

Revoke asks in a **Revoke node** window. The node's certificate stops at once, and it needs a new token to rejoin.

```sh
keleustes nodes list
keleustes nodes revoke ID
```

## The cross-host card

Above the table, the **Cross-host** card holds the policy for requests one node makes of another: the checkboxes **Requests**, **Share directories**, **Prompts** and **Auto-approve people**. Requests from agents always wait. Waiting requests and open host requests each get **Approve** and **Decline**.

| Part | Shows and does |
|---|---|
| **Plan limits** | Each node's provider plan windows with a used meter and reset time. Red means routing skips the node. |
| Workers | Live workers per node with **Pause** or **Resume** and **Stop**, and crew runs with **Stop run**, where the node accepts them |
| **Schedules** | Each host schedule with an enabled checkbox and Delete. Pick a node, profile and directory, type a cron (empty means `@daily`), then **Add**. |
| **Library** | Pick a node and an item, then **Install**. A hook or MCP server reads **Install (runs code)** and needs a second click. **Scan** lists what the host's harnesses hold, and **Import** brings a scanned item into the library. |

## The host view

**Fleet** at the top goes back to the table. The header shows the name, status, belai version and chips for the host gate (`off`, `read`, `config` or `provision`), the shell state and the `rc`, `gh` and `terminal` capabilities. Its buttons are **Refresh**, **Dispatch**, **Rename** and **Revoke**. Text in the reason field is recorded with each action in the audit ledger.

A button the host does not offer is hidden. A disabled button says why on hover: "Offline", "Host gate" with the current level, "Host shell off" or "Factory stopped".

| Tab | Holds |
|---|---|
| **Overview** | **Health**, **Products** and **Load** panels, **Plan limits**, and **Needs you** with **Copy command** and **Done** for hand-offs |
| **Products** | CLI, Package firewall, AI firewall and Sensor, each with **Probe** and, where offered, **Install**, **Upgrade**, **Sign in**, **Uninstall** and **Checks** |
| **Repos** | Repo, Path, Branch, State, Trusted, Agents and Scans columns, with **Trust**, **Untrust**, **Trust dir** and **Clone repo** |
| **Agents** | **Built-in agents** per repo set to `on`, `off` or `inherit`, with **Run**, and **Detections** |
| **Schedules** | Host schedules with **New**, an editable cron, **Run now** and Delete. Factory schedules are listed read only. |
| **Library** | **On the host**, **From the library** and **Last scan**, with **Backup**, **Update**, **Install** and **Import** |
| **Config** | A **Scope** of Global or one project. **Load** reads the values, then `edit` or `tighten` changes one. Gates and keys are read only. |
| **Sessions** | **Workers**, **Prune ended**, and the node's sessions, each linking to [Sessions](/keleustes/using/sessions/) |
| **Provision** | Plans of steps: **Baseline plan**, **Duplicate**, **Step**, **Preview on host**, **Run**, **Restart rc** and **History** |
| **Diagnostics** | **Preflight**, **Link**, **Disk**, **Tools** and **Log**. **Shell** appears only when the host offers it. |
| **Audit** | The last 200 host actions. **Open in Audit** opens [Audit](/keleustes/using/audit-and-memory/) filtered to the node. |

> [!CAREFUL] Provision and shell actions run in two steps
> **Preview** asks the host for a dry run. **Run** stays disabled until the preview is back and you type the host name.

A link of the form `keleustes://fleet/<node>/<tab>` opens a node on a tab. See [deep links](/keleustes/reference/deep-links/).

## Host commands

`NODE` is a node id or name. Output is JSON.

```sh
keleustes host inventory NODE
keleustes host act NODE preflight
keleustes host act NODE config_get --param scope=global
keleustes host stop --reason "maintenance"
keleustes host resume
keleustes host verify
```

`host act` also takes `--dry-run`, `--if-match`, `--preview`, `--confirm` and `--wait`. `host stop` and `host resume` set and lift the factory kill switch. `host verify` checks the audit ledger and exits 1 when a chain is broken. See the [CLI reference](/keleustes/reference/cli/).
