---
title: Settings
description: Change the theme, edit every settings section, stop or pause the factory, and export or import the settings as YAML.
order: 13
sources: [keleustes/crates/kls-ui/src/screens/settings.rs, keleustes/crates/kls-ui/src/screens/project_overrides.rs, keleustes/crates/kls-ui/src/screens/harness_picker.rs, keleustes/crates/kls-ui/src/theme.rs, keleustes/crates/kls-ui/src/lib.rs, keleustes/crates/kls-core/src/audit/config.rs, keleustes/crates/kls-app/src/main.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Settings** is the last screen in the System group. It shows the settings document as one card per section, with a section list beside the cards (a row of pills in a narrow window) and a save bar at the bottom.

## Editing and saving

The header shows the document revision as `rev N`. **Changes** opens [Audit](/keleustes/using/audit-and-memory/) filtered to setting changes. Every changed key is written to the audit ledger with its old and new value.

An edited field turns gold and gets an undo button. The section list shows the number of unsaved fields per section.

| Save bar | Meaning |
|---|---|
| **No unsaved changes** | Nothing to save. Hover for the revision and time. |
| "N unsaved changes" | The count of edited fields, plus a count of invalid ones |
| **Rebased** | The settings were saved elsewhere. Your edits sit on the new values. |
| **Export YAML** | Writes the document to the data folder and copies it |
| **Discard** | Drops every unsaved edit |
| **Save** | Saves the edits. Disabled while a field is invalid. |

A save names the revision it started from. If someone saved in between, Keleustes keeps your edits on top of the new values and asks you to review and save again.
Two icons can sit beside a label. Arrows mean the setting takes effect at the next start (**Listen address**). An hourglass means the value is saved and audited but nothing applies it yet: `belai.mode`, `belai.ask_permission`, `autonomy.plan_approval`, `audit.calls` and `systemone.override`.

## Theme

**Theme** in **Appearance** offers **System**, **Light** and **Dark**. It saves at once, without the save bar, as the `ui.theme` setting. System follows the desktop's preference. The **Dark** or **Light** button in the top bar switches between the two from any screen.

## Sections

| Section | Holds |
|---|---|
| **Appearance** | Theme |
| **Node listener** | Server name, listen address (default `0.0.0.0:7443`), advertised addresses, join token lifetime |
| **Autonomy** | Maximum autonomy, default agent mode, concurrent runs, attempt and wait limits, permission asks, plan approval |
| **Defaults** | The switch for default workflows, autonomy for a repository with no settings, paths that stop an approval |
| **Models** | Default model, fast model, model per agent |
| **Forge** | GitHub polling, quota shares, branch prefix, factory identities, pull request state, protected branches, minimum decision confidence |
| **Commit signing** | Signing mode and commit email |
| **Notifications** | Desktop notices, quiet hours, mute, and a chat channel. **Webhook** takes the address, **Seal** stores it in the vault, **Send test** posts once. |
| **Kanban binding** | Provider, board, sync direction, list mapping. Shows the last pass, **Sync now**, a sealed **Token** for Linear and Jira, and held fields with **Keep board** or **Take outside**. |
| **Schedules** | Timezone and what happens to missed runs |
| **Persistence** | Database location (read only), artifact retention, teleport bundle retention, model call logging |
| **Budgets** | Action at 100% of a budget and alert thresholds. **Budgets** opens [Budgets](/keleustes/using/budgets/). |
| **Crews** | Guardrails, tests when a worker ends, card lease, per-card cost and attempt limits |
| **System One** | Decision model, fallback, what to do below the confidence threshold, daily cap |
| **Hosts** | Where work runs, the fallback when that node is offline, maintenance window, schedule blackout |
| **GitHub quota** | What happens when the factory share runs out, calls and proactive writes per hour |
| **Vault** | Key test after saving, rotation grace, event stream retention |
| **Estimates** | Rates, multipliers and minutes used to price agent work |

## Control

**Control** applies at once, tells every node, and is recorded in the ledger. Type a **Reason** first if you want one recorded. A chip shows **Running**, **Paused** or **Stopped**.

| Button | Does |
|---|---|
| **Pause** | Nothing new starts. Running steps settle. Schedule fires are held. |
| **Stop all** | Cancels every open run and tells its sessions to stop. Nothing new starts. |
| **Resume** | Starts the factory again. Held schedule fires run per their catch-up policy. |
| **A2A blackout** | Agents stop sending and reading messages across nodes. **Lift blackout** ends it. |

Each one except **Lift blackout** asks for confirmation in a window.

## Project overrides

**Project overrides** lists each project directory a node reports, with its belai preferences. **Edit** opens a key and value grid. An empty value clears a key. **Send N** sends the changes to the node. A chip then reads **Waiting for the node**, **Applied**, **Not applied** or **Refused**. **Edit** is disabled when the node is offline or the host runs without `--web-project-settings`.

## Harness keys

**Harness keys** sets a key mode for **All harnesses**, for one harness, and for one vault key: **Own login**, **Hand-off** or **Always**. A key can also **Inherit**. **Save** stores the modes. Keys live in the [vault](/keleustes/using/vault-and-trust/).

## YAML export and import

**Export** writes `exports/settings-<timestamp>.yaml` in the [data directory](/keleustes/reference/data-directory/) and copies the text. The document has `kind: FactorySettings` and one mapping per section under `spec`. Read-only keys are left out.

To import, fill the editor with **Load current**, with a **File path** and **Read**, or by pasting. **Preview** lists each key that would change, with its current and imported value. **Import** applies it and is disabled while you have unsaved edits.

> [!CAREFUL] An import is a whole document
> A key the YAML leaves out resets to its default. The server name is the one exception.

An import also accepts a flat mapping of dotted keys.

## From the command line

```sh
keleustes config node.listen_addr
keleustes config node.listen_addr 0.0.0.0:7443
```

With one argument the command prints the stored value. With two it stores the value, and a running window reloads its settings.
