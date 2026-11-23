---
title: Runs
description: The Runs screen lists workflow runs with filters and shows each run as a graph and step timeline you can pause, cancel or retry.
order: 6
sources: [keleustes/crates/kls-ui/src/screens/runs.rs, keleustes/crates/kls-engine/src/ops.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Runs is in the **Factory** group. It lists every workflow run and shows the trace of the run you select: its graph, steps, decisions and approvals.

## Totals

Four tiles sit at the top. They count the runs currently loaded in the table.

| Tile | Counts |
|---|---|
| **Runs today** | Runs created in the last 24 hours |
| **Live** | Runs that are queued, running or waiting for approval |
| **Failed today** | Runs created in the last 24 hours that failed |
| **Tokens 7d** | Tokens used by runs created in the last 7 days |

A line under the table adds up the listed rows: runs, succeeded, failed and tokens.

When the factory is paused or a window holds new work, an amber **Held** chip appears above the tiles with the reason. Open runs are held and nothing new starts until the switch lifts. The switch is **Pause all** on the [Cockpit](/keleustes/using/cockpit-and-events/).

## Filters

| Control | Options |
|---|---|
| Status pills | **All**, **Active**, **Running**, **Waiting**, **Queued**, **Held**, **Paused**, **Done**, **Failed**, **Cancelled** |
| Workflow menu | **Any workflow** or one workflow |
| Trigger menu | **Any trigger**, `manual`, `cron`, `kanban`, `event`, `webhook`, `label` |
| **Search** | Run id, repository, card or reason |

**Active** covers held, queued, running, waiting for approval and paused. **Waiting** is waiting for approval. **Done** is succeeded.

## Runs table

| Column | Shows |
|---|---|
| **Run** | The short run id |
| **Workflow** | The workflow name |
| **State** | A status chip. A held run also shows why. Hover for the full reason. |
| **Trigger** | The trigger label. Hover for its kind. |
| **Card** | The card id, or a dash |
| **Started** | How long ago it started |
| **Length** | The duration so far or in total |
| **Tokens** | Tokens used |
| **Repo** | The repository, or a dash |
| **Model** | The models its sessions used |

Click a row to open its trace under the table. With no rows, the table reads **No runs**.

## Run trace

The trace header shows the short id and workflow name, the status, and the actions the run's state allows.

| Action | Offered when the run is | Effect |
|---|---|---|
| **Pause** | Queued, running or waiting for approval | Pauses the run |
| **Resume** | Paused | Resumes it |
| **Retry** | Failed or cancelled | Retries the run |
| **Cancel** | Held, queued, running, waiting for approval or paused | Asks **Yes, cancel** or **Keep running** |

Below the header, a row of facts shows the workflow and version (a link to [Workflows](/keleustes/using/workflows-and-templates/)), the trigger, the creation time, the repository, the card (a link to the [Board](/keleustes/using/board-and-checkpoints/)), tokens and duration. Hover a fact for its name. More facts appear when they exist: run budget used, decisions made, routing cards, handoffs, model cost and by-hand hours. Chips list the repositories, pull requests, agents, models and nodes the run touched.

The download icon writes the evidence pack as JSON to `exports/<short run id>.json` in the [data directory](/keleustes/reference/data-directory/). The write is audited.

Under the facts, the workflow graph shows the latest status of each node.

## Approvals

A run with a pending approval shows an **Approval** panel. Type an optional **Note**, then press **Approve** or **Reject** beside the approval. A due time appears when the approval has one. Decided approvals are listed under **Approvals** at the bottom of the trace with their state, who decided and the note.

The same approvals appear in the [Checkpoints](/keleustes/using/board-and-checkpoints/) queue.

## Steps

**Steps** is a timeline. Each step has a status ring that fills once the step finishes, its title, a status chip and its start time. The line under the title gives the step type, the route taken, the attempt number after the first, tokens and the node. A failed step shows its error in red.

| Control | Action |
|---|---|
| Step title | Opens or closes the step's details |
| Terminal icon | Opens the step's session on [Sessions](/keleustes/using/sessions/) |
| Retry icon | **Retry from here**. Offered on a failed, cancelled or succeeded step when the run itself failed or was cancelled. |

An open step shows its start time and duration in milliseconds, its dispatch id and node, and every field of its details.

A decision step also shows a decision card: the question, the outcome, the confidence against the threshold as a percentage and a meter, why the engine acted as it did, and the provider and model that answered. The confidence is uncalibrated.

Before a run has any steps, the timeline reads **No steps yet**. If the selected run no longer exists, the trace reads **Run gone**.
