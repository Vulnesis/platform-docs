---
title: Workforce and library
description: Build agents and crews, control live workers on your nodes, and keep versioned prompts, skills and hooks in the Library.
order: 3
sources: [keleustes/crates/kls-ui/src/screens/workforce.rs, keleustes/crates/kls-ui/src/screens/workforce/controls.rs, keleustes/crates/kls-ui/src/screens/workforce/files.rs, keleustes/crates/kls-ui/src/screens/workforce/offers.rs, keleustes/crates/kls-ui/src/screens/workforce/spec.rs, keleustes/crates/kls-ui/src/screens/library.rs, keleustes/crates/kls-ui/src/screens/library_search.rs, keleustes/crates/kls-core/src/vault.rs, keleustes/crates/kls-core/src/attachments.rs, keleustes/crates/kls-engine/src/catalogue.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Workforce** sits in the Factory group and holds your agents, your crews and the workers on each node. **Library** sits in the System group and stores the versioned items agents use.

## Workforce header

| Control | What it does |
|---|---|
| **Agents**, **Crews**, **Workers** | Tabs, each with a count |
| **Filter** | Narrows agents and crews by name and description |
| **Wall** | Shows one large tile per agent and crew with its live worker count |
| **New agent** | Opens the agent builder (Agents tab) |
| **Continue draft** | Reopens an unsaved builder. Keleustes autosaves the builder while you edit. |
| **New crew** | Opens the crew panel (Crews tab) |

A **Needs you** strip counts **Held**, **Claims lapsed**, **Blocked** and **Questions**. Each count opens [Checkpoints](/keleustes/using/board-and-checkpoints/).

## Agents

State chips filter the grid: all agents, **Working**, **Idle**, **Inactive** and **Not in library**. A card shows the agent's model, or "routed" when [routing rules](/keleustes/using/budgets/) choose it, where it is live, and its crews.

A card's **More** menu has **Edit**, **Duplicate**, **Back up to library** and **Delete**.

An **In the library** panel lists stored agent profiles with **Install** or **Update**.

## Agent builder

The builder opens beside the grid as **Agent builder** for a new agent, or as "Edit" plus the agent name.

| Part | What you set |
|---|---|
| **Brief** and **Draft from brief** | A node drafts the profile from one line. Nothing is saved until you save. The button reads **Redraft from brief** after the first draft. |
| Draft offers | Take or drop each field the draft changes. **Take all** accepts every offer and **Undo** reverts the last take. |
| **From builtin** | Starts from a built-in belai profile |
| **Name**, **Display name**, **Description** | Identity. The name accepts a-z, 0-9 and `- _ : .` |
| **Provider**, **Model**, **System prompt**, **Tools** | A provider and model, or "routed", then the prompt and a comma-separated tool list |
| **Behaviour**, **Protections** | Mode, autonomy and effort, then **Guardrails** and **Ask permission** |
| **Handoffs** | Worker mode only: the lists and labels it claims from, and where a card goes on success or failure |
| **Workspace**, **Budget and memory** | Isolation and publishing, then per-item cost, passes and wall time, and memory |
| **Agent files** | Text files the agent carries, at most 32 files of 256 KiB each. Save the agent first, then **Attach** a local file. |
| **Install on** | The nodes to install on. With none picked, the nodes that already hold it. |

An error in the builder's checks, such as "Name required", blocks saving.

**Save agent** saves the profile, backs it up to the library and installs it on its nodes. The notice names the version and any node that refused.

## Crews

A crew card shows the process, the member count, the lead and whether members are working. Open one to edit it in the crew panel.

| Field | Values |
|---|---|
| **Name**, **Description** | Free text |
| **Process** | sequential, parallel or hierarchical |
| **Members** | An agent, a role, an optional `provider/model` and a replica count per member. **Add** appends a member. |

**Save crew** stores a new version. **Delete** asks for confirmation.

## Workers

The Workers tab has one row per node: **Status**, **Node**, **Workers**, **Agents**, **Providers**. Controls below the table act on live workers. A control appears only when the node accepts it.

| Control | Effect |
|---|---|
| **Pause** / **Resume** | Pauses or resumes one worker |
| **Back up** | Keeps the node's copy of the profile in the library |
| **Log** | Shows the last 40 lines of the worker's session |
| **Stop** | Stops the worker |
| **Pause all** / **Resume all** | Acts on every worker in a crew run |
| **Scope** | Edits a crew run's directories and the replicas per member |
| **Start** | Starts a worker from an agent in a directory on a node |
| **One-off worker** | Starts a worker from a prompt with no saved profile, where the node supports it |

Every control is recorded in the [audit ledger](/keleustes/using/audit-and-memory/).

## Library items

The **Items** tab lists every item with **Name**, **Type**, **Version**, **Saved**, **Origin** and **Pinned**. Pills filter by kind. The kinds are prompt, skill, command, process, hook, mcp, repo, budget, provider and rewrite.

**New item** opens the editor: **Kind**, **Name**, **Description**, the body and an optional note. **Save** writes a new version every time. Open an older version from **Versions** and save it to restore it. **Delete** removes all versions after a confirmation.

The header has a path field for a `.md` file or a folder. **Import file** reads it into the library. **Export** writes the open item's latest version there, and **Export all** writes every item as `<folder>/<kind>/<name>.md`.

With an item open you can pick a host and press **Install**.

> [!CAREFUL] Hooks and MCP servers run code
> For a hook or an MCP server the button changes to **Install (runs code)** and needs a second click. A hook that carries files then lists each file with its size and hash, and only **Confirm files** sends it.

## Discover

The **Discover** tab searches public sources without credentials. Nothing you fetch is executed or installed from here. Importing stores the item, and hooks and MCP servers are stored only.

Search by text and item type, then narrow with **Filters**: **Ecosystem**, **Source**, **Licence**, **Trust** and **Hide flagged**. Select a result to preview its **Source**, the **Converted** item and a **Diff**. **Import** opens a review dialog with the name, the licence and any flags before it saves.

**Sources** turns sources on or off and adds a repository as `owner/repo@ref`. **Imported** lists what you imported and its update state.

When the kill switch is on, the tab shows **Factory stopped**. Search then uses the local index only, and import and refresh are off.
