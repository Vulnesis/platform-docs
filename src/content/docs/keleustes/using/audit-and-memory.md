---
title: Audit and memory
description: Read and verify the hash-chained audit ledger, export it signed, delete sessions, and manage the notes agents keep.
order: 10
sources: [keleustes/crates/kls-ui/src/screens/audit.rs, keleustes/crates/kls-ui/src/screens/memory.rs, keleustes/crates/kls-ui/src/screens/knowledge.rs, keleustes/crates/kls-core/src/board.rs, keleustes/crates/kls-core/src/audit/report.rs, keleustes/crates/kls-app/src/host_cmd.rs, keleustes/crates/kls-app/src/cli.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Audit** and **Memory** are the last two screens in the Govern group. Audit is the record of what the factory and its nodes did. Memory holds the shared notes that agents keep for each repository.

## Audit header

| Control | Effect |
|---|---|
| **Ledger**, **Sessions**, **Teleports**, **Decisions**, **Weekly** | Tabs |
| **Verify chain** | Recomputes every chain and shows the verdict in the status strip |
| Range picker | The export window: 30 d, 90 d, 400 d or All |
| **Export signed** | Opens a dialog with the file to write and the range. **Sign and save** writes the filtered entries as JSONL, oldest first, then the chain head and an Ed25519 signature. |

The status strip reads "Not verified yet", "Verifying…", "Intact" or "Broken" with the time of the last check, then the entry count, the head hash and the number of host streams. A broken chain names where it broke.

You can run the same check from a terminal. The command exits with 1 when a chain is broken.

```sh
keleustes host verify
```

## Ledger

| Filter | Matches |
|---|---|
| **Host** | Factory and hosts, Factory only or Hosts only |
| **Kind** | One entry kind, listed with its count |
| **Search** | Free text |
| **Node** | One node, with a button to clear it |
| **Session** | A session id |
| **Card, agent, repo, run, vuln** | Space-separated values. Every value must appear in the entry. |

**Shown** gives matching entries over total entries. The table holds the newest 5000 matching entries. **Older** pages back by sequence and **Newest** returns to the top. Use the export for everything.

| Column | Shows |
|---|---|
| **#** | The sequence number |
| **When** | Date and time |
| **Host** | "factory" or the node |
| **Kind** | The entry kind, coloured by family |
| **Actor** | Who or what acted, with the actor kind |
| **Detail** | A summary |
| **Hash ← prev** | The entry's hash and the hash before it, shortened |

Click a row to open its detail: both hashes, the subject and the payload. Buttons copy the entry's JSON and open the card, run, session, workflow or repository the entry names.

## Sessions

This tab deletes sessions. The filter takes plain words, or facts written as `repo:`, `pr:`, `agent:`, `model:`, `node:` or `vuln:` followed by a value.

The table has **State**, **Title**, **Node**, **Directory** and **Entries**. Tick rows, or use the select button to tick every row shown, then press the delete button. You can add a reason.

> [!CAREFUL] What a delete removes
> The transcript, the inbox and the raw host lines are removed. The audit entries stay, and the ledger keeps a tombstone. A host still running the session may report it again.

## Teleports

A teleport moves a session to another node. The table has **Status**, **Session**, **From → to**, **Size**, **Created** and **Expires / error**. The status is one of ready, delivered, failed or expired.

**Teleport** opens **Request teleport**. Pick a session, the node it is on and a different target node, then press **Request**. The CLI does the same and waits for the bundle:

```sh
keleustes sessions teleport SESSION --to NODE --wait 120
```

`--wait` is the seconds to wait for the upload and defaults to 120. When the bundle is ready, the command prints the `belai -teleport` command to run on the target.

## Decisions

The decision ledger lists approvals, System One decisions, overrides and kill switch use, newest first. **Export signed** writes every decision entry as JSONL with an Ed25519 signature. With none, the tab reads "No decisions yet".

## Weekly

The arrow buttons step a week back or forward. A chip says **Chain verified** or **Chain not verified** for that week. Figures sum the week's entries, decisions, refusals, runs, budget alerts, vault changes and settings changes. **By kind** and **Top actors** rank the entries. **Save report** writes the week as a Markdown file in the `reports` folder of the [data directory](/keleustes/reference/data-directory/) and shows the path.

## Memory

Scopes are on the left and notes are on the right, newest first. **All** shows every note. Scopes are grouped as **Repositories**, **Agents** and **Other**, and each row shows live notes over total notes.

| Header control | Effect |
|---|---|
| **Search** | Matches note text or tags |
| **Deleted** | Includes deleted notes, marked with a **Deleted** chip |
| **Clear scope** | Shown with a scope selected. Deletes every note in it after a confirmation. |
| **Knowledge** | Opens the cross-host knowledge search |

The **New note** panel sits above the notes. With **All** selected, type a scope as `org/repo` or `global`. Add the note text and optional comma-separated tags, then press **Add note**. A note holds at most 4000 characters and 20 tags. The counter turns red past either limit.

Each note shows its text, its tags, the host it came from and its author. A note you wrote here is marked "Keleustes". **Edit** changes the text and tags but not the scope. **Delete** asks for confirmation. Nodes drop a deleted note at their next pull.

Notes are untrusted text. Keleustes shows them as plain text only.

## Knowledge

The **Knowledge** window runs one search over the index of every online host. Type a query, pick **All**, **Profiles** or **Projects**, and press **Search**. A chip per node shows whether it answered. Each hit names its host and index above a plain-text snippet.

**Indexes** lists each index a host advertises with its document count. **Reindex** asks that host to ingest and classify again. With no index on any online host, the window reads "No host lists an index".
