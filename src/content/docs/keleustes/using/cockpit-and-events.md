---
title: Cockpit and events
description: The Cockpit overview with its two factory switches, and the Events stream with search, saved views and export.
order: 1
sources: [keleustes/crates/kls-ui/src/lib.rs, keleustes/crates/kls-ui/src/screens/cockpit.rs, keleustes/crates/kls-ui/src/events.rs, keleustes/crates/kls-core/src/needs.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Cockpit and Events are the first two screens in the **Factory** group. Cockpit is the screen Keleustes opens on. It summarises the fleet, the board and the work in progress. Events is the live stream of everything the factory records.

## Cockpit switches

Two switches sit in the Cockpit header. Each opens a confirm window with an optional reason field, **Turn on** and **Cancel**.

| Button | Confirm text | Turns off with |
|---|---|---|
| **Pause all** | "Holds triggers and new steps. Sessions unaffected." | **Resume** |
| **A2A: on** | "Stops agent relay. Local talk and memory continue." | **Lift blackout** |

While either is on, an amber chip under the header says so, with the time it started and the reason you gave. The header also shows **Live · N/min** (events in the last minute) or **Stream error**. Click it to open Events.

## Tiles

The **Range** pills (**24 h**, **7 d**, **30 d**) set the window for the first seven tiles. Click a tile to open the screen in the last column.

| Tile | Shows | Opens |
|---|---|---|
| **Tokens** | Tokens used, with the session count | Budgets |
| **Spend** | Dollars spent, with a by-hand estimate | Budgets |
| **Done** | Cards done, with runs ok and failed | Runs |
| **Draft PRs** | Draft pull requests, with the number conflicting | Checkpoints |
| **Free slots** | Free slots on online nodes | Fleet |
| **GitHub quota** | Percentage of the GitHub quota left | Repositories |
| **Cache hits** | Cache hit rate for GitHub reads this hour | Repositories |
| **Nodes online** | Online nodes out of joined nodes | Fleet |
| **Live sessions** | Live sessions, with open and asking counts | Sessions |
| **Needs you** | Items waiting on you, with the oldest wait | Checkpoints |
| **Approvals** | Pending approvals | Checkpoints |
| **In review** | Cards in review, with the number doing | Board |
| **Open cards** | Cards not done, split by triage, backlog and todo | Board |

A value the app has not read yet shows as an ellipsis. A value that does not exist shows as a dash.

## Panels

| Panel | Contents |
|---|---|
| **System One** | Decisions in 24 hours, how many were routed, how many went to a person, and the average confidence |
| **Token economy** | Tokens, spend, spend per done card and the by-hand value |
| **Gates and provenance** | Gates waiting, refusals in 24 hours, A2A messages withheld and audited entries |
| **Runs by hour** | A heatmap of runs started per weekday and hour over 7 days. Hover a cell for its count. |
| **Needs you** | Up to 30 waiting items with **Answer**, **Review** or **Open**. Kind chips filter Checkpoints. **Open checkpoints** shows the whole queue. |
| **Running now** | Open workflow runs with a glyph per step, live sessions and cards in doing. Each row opens its run, session or card. Empty reads **Idle**. |
| **Fleet** | One cell per joined node with its OS, capabilities and session count, or how long it has been offline. **Manage nodes** opens Fleet. |
| **Latest events** | The newest 8 events. Click one to open Events filtered to its kind. |
| **Fleet / Health** | Friction chips (failed runs, refusals, blocked cards, late heartbeats), the newest belai version with any nodes behind it, card counts per column, and a worker table. |

The worker table has the columns **Worker**, **Node**, **State**, **Beat** and **Tokens**. A live worker whose last heartbeat is more than 5 minutes old is marked late.

## Events

The header tabs pick the range: **Live**, **1 h**, **24 h** or **7 d**. In **Live**, **Pause** freezes the list and a **Show N new** link appears as events arrive. **Resume** returns to the live list. A strip above the table charts events per minute for the last 40 minutes. In a past range, **Back to live** returns to the stream.

### Search and filters

Type in **Search**. Tokens combine, and every token must match.

| Token | Matches |
|---|---|
| `run:`, `card:`, `repo:`, `node:`, `wf:`, `session:`, `budget:`, `agent:` | That field in the event payload |
| `kind:PREFIX` | Events whose kind starts with the prefix, such as `kind:budget.` |
| `origin:WHO` | Events caused by that actor |
| `key=value` | An exact payload fact |
| `needs` | Events that need a person: approval requests, session questions, blocked budgets, refusals and withheld A2A messages |
| Any other word | Text in the kind, subject or payload |

Facet chips under the search box narrow the table to one kind prefix (`run.`, `session.`, `card.` and so on), each with its count. **Origin** chips list who caused the rows shown.

| Control | Action |
|---|---|
| View name field and save icon | Saves the current search as a named view. Saved views appear in the **Views** menu. |
| Bin icon | Deletes the saved view that matches the current search |
| Link icon | Copies a `keleustes://events?id=...` link to this search |
| Download icon | Writes the rows shown to `exports/events-<timestamp>.jsonl` in the [data directory](/keleustes/reference/data-directory/) |

### Table and detail

The columns are **When**, **Kind**, **Subject**, **Detail**, **Facts** and **Origin**. Click a subject to open the screen that owns it. Click a fact or origin chip to add it to the search. **Load older** fetches earlier rows.

Click a row to open its detail window. It lists every payload fact, links to related events, shows the **Payload** as JSON with a copy button, and has a button named after the owning screen. **Start a workflow** creates a draft workflow whose trigger answers this event and opens it on [Workflows](/keleustes/using/workflows-and-templates/).

The footer reads "Kept 30 days; the audit ledger keeps the record". **Audit** opens the [Audit](/keleustes/using/audit-and-memory/) screen.
