---
title: Vault and trust
description: Store provider keys and connector secrets sealed on your machine, and read the provenance, scanner and guardrail record for each repository.
order: 9
sources: [keleustes/crates/kls-ui/src/screens/vault.rs, keleustes/crates/kls-ui/src/screens/trust.rs, keleustes/crates/kls-vault/src/lib.rs, keleustes/crates/kls-core/src/vault.rs, keleustes/crates/kls-core/src/vault/lineage.rs, keleustes/crates/kls-core/src/vault/connectors.rs, keleustes/crates/kls-core/src/audit/trust.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Vault** and **Trust** sit in the **Govern** group. Vault holds the model provider keys and other secrets that Keleustes hands to nodes. Trust is a read-only report built from facts Keleustes already holds.

## How the vault seals a key

Each value is sealed with XChaCha20-Poly1305 under a 256-bit master key. The master key lives in the operating system keyring, under the service name `keleustes`. When no keyring is usable, Keleustes keeps the master key in a file with mode `0600` in the [data directory](/keleustes/reference/data-directory/) and shows a warning chip at the top of the screen.

A saved value is write-only. The screen shows a fixed mask, the label and a fingerprint, never the value. Keleustes does not call a model itself. It sends keys to a node in a grant attached to a dispatch or job, and each grant is recorded with provider names and key ids only.

## Header and tiles

| Button | Does |
|---|---|
| **Add key** | Opens the add form |
| **Provider** | Adds a provider |
| **Test all** | Sends one free request per key, in the background |
| **As code** | Writes every entry as YAML, without values, to `exports/vault-entries.yaml` in the data directory |
| **Run checks** | Confirms each key opens with the master key and matches its fingerprint |

Five tiles summarise the vault: **Expiring** (within 14 days, plus the expired count), **Keys**, **Accepted**, **Refused** (refused or unreachable at the last test) and **Verified**. The tabs are **Keys**, **Grants**, **MCP**, **Connectors** and **Activity**.

## Keys

Keys are grouped by provider. A provider header carries **Factory** or **Factory off** (whether factory work may use it), **No test** when the provider has no test address, **Add key**, and a menu with **Edit** and **Delete**. Removing a provider keeps its keys.

Each key row shows its environment variable, label and test state.

| Chip | Meaning |
|---|---|
| **Untested**, **Testing**, **Accepted**, **Refused**, **Unreachable**, **Not testable** | Result of the last test. A test only shows whether the provider accepts the key. |
| **Expiring**, **Expired** | An expired key is refused at grant time. Its value is kept so you can extend it. |
| **Verified**, **Check failed** | Result of the integrity check |
| A node count | The key is limited to those nodes |

Row actions: test again, run check, edit label, access (expiry, nodes, auto-rotate), lineage, **Rotate** and delete. Delete asks for confirmation.

### Add a key

The form has three kinds: **Provider key**, **Env var** (a token for a tool or MCP server) and **Kiro** (**Sign-in (JSON)** or **API key**). Fill **Provider**, **Env var**, **Label** and **Key**. **Expires** offers Never, 1, 7, 30, 90 or 365 days. Tick **Nodes** to limit which nodes receive the key. With none ticked, every node may.

**Test** is optional. **Save** never waits for a test and is never refused because of one. If a key already exists for the same provider and variable, the form warns that it replaces it.

### Rotate and roll back

**Rotate** takes a new value. The old value stays sealed for a grace period, 24 hours by default, set by `vault.rotation_grace_hours`. The lineage window lists each version with its fingerprint and one of **Live**, **In grace** or **Shredded**. **Roll back** restores the newest value still in its grace. In the **Access** window, **Auto-rotate** appears only for providers Keleustes can mint keys for.

## Other tabs

| Tab | Shows |
|---|---|
| **Grants** | **When**, **Providers**, **Purpose**, **State** (`live`, `expired`, `revoked`). **Revoke** ends a live grant. |
| **MCP** | Bindings from an env secret to an MCP server and key. Only names are shown. **Bind** adds one, **Unbind** removes it. |
| **Connectors** | Secrets Keleustes itself uses to reach a tool, such as Slack, Jira or a container registry. They are never granted to a node. **Replace** and **Revoke** act on a row. |
| **Activity** | **When**, **What**, **Provider**, **Result**, **By**, filtered by **All**, **Changes** or **Denied** |

## Trust

The header has a refresh button, **Evidence** (writes an evidence index to `exports/` in the data directory), **Audit** (opens [Audit](/keleustes/using/audit-and-memory/) filtered to gate verdicts) and a repository filter.

**Build provenance** shows one SLSA-style level for the fleet: the lowest level among managed repositories, or among all repositories when none is managed.

| Level | Meaning |
|---|---|
| L0 | No factory session or run has touched the repository |
| L1 | Factory work is recorded, but links or signatures are missing |
| L2 | Provenance links session to run to card, and every recorded commit is signed |
| L3 | Needs isolated builders. Keleustes has none. |

The rest of the screen:

| Section | Shows |
|---|---|
| **Scanner matrix** | Per repository, `clean`, `findings` or `not run` for each of `sca`, `sast`, `secrets`, `iac`, `containers`, `license`, `malscan`, `eol`, `cbom`, `aibom` and `scorecard` |
| Guardrail tiles | 30-day counts summed over nodes: **Hazards denied**, **Hazard asks**, **Egress denied**, **A2A withheld**, **Run caps**, **Faults**, **Gates run** |
| **Repositories** | **Level**, linked and total **Sessions** and **Runs**, **Signed** commits, and the **Reason** for the level |
| **Guardrails by node** | The same counters per node, with `online`, `offline` or `revoked` |
| Egress review | Hosts a node refused in the last 30 days. For a host marked **To review**, **Card** files a review card on the [Board](/keleustes/using/board-and-checkpoints/), and the eye button dismisses it until it is refused again. |
