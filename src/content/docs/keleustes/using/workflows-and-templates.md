---
title: Workflows and templates
description: Draw a workflow as a graph of steps, dry run it, publish it and manage its schedules, or start from a built-in template.
order: 5
sources: [keleustes/crates/kls-ui/src/screens/workflows.rs, keleustes/crates/kls-ui/src/screens/templates.rs, keleustes/crates/kls-engine/src/graph.rs, keleustes/crates/kls-engine/src/templates.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Workflows** and **Templates** sit next to each other in the Factory group. A workflow is a graph of steps that starts on a trigger. A template is a built-in workflow you copy into a new draft.

## Workflow list

The list has a **Filter** box and these columns.

| Column | Shows |
|---|---|
| **Workflow** | The name |
| **State** | An on or off switch for a published workflow, or a "draft" chip |
| **Version** | The published version and any draft version |
| **Last run** | The status of the latest run |
| **Updated** | Time since the last change |

A "blocked" chip marks a workflow whose model step has no provider open to the factory. **New workflow** asks for a name and creates a draft with one manual trigger. **Template** opens the Templates screen. Click a row to open the builder.

## Builder

The builder has a step palette on the left, the canvas in the middle and an inspector on the right. In a narrow window the palette moves above the canvas and the inspector below it.

### Header

| Control | Effect |
|---|---|
| **Save** | Saves the draft. Enabled when you have unsaved changes. |
| **Dry run** | Walks the graph without dispatching anything. Type a repository in the field beside it to pretend the run is on that repository. |
| Note field, **Publish**, **Confirm** | **Publish** shows the warning and trigger counts. **Confirm** saves and publishes the version with your note. Publish is disabled while checks report problems. |
| **Discard** | Drops the draft of a published workflow |
| **Enabled** | Turns a published workflow on or off |
| **Run** | Starts a run of the published version and opens it in [Runs](/keleustes/using/runs/) |
| **Versions** | Lists versions. **Restore** copies an older version into the draft. |
| **Archive** | Archives the workflow after a second click. Archiving cancels its runs. |

Chips beside the name show the published and draft versions and "unsaved". "changed elsewhere" with a **Reload** button means the stored workflow changed under your edits.

### Palette

Click an item under **Add step** to place it on the canvas.

| Group | Items |
|---|---|
| **Triggers** | Manual start, Schedule, Card moved, Factory event, GitHub event, GitHub label |
| **Agents and jobs** | Dispatch worker, Dispatch crew, Start session, Vulnetix CLI scan, Provision a host, Run job |
| **Logic** | Condition, SystemOne decision, Wait |
| **People** | Approval, Gate |
| **Board** | Move or label card |
| **Outputs** | Store repo profile, Notify, Draft pull request, Comment on GitHub |

Items marked "(github)" do nothing until GitHub is connected. See [Repos and forges](/keleustes/using/repos-and-forges/).

### Canvas

| Action | Result |
|---|---|
| Drag from a port on a step's right edge to another step | Connects them |
| Drag the background, or scroll | Pans |
| Drag a step | Moves it |
| Click a step or the dot on a connection | Selects it and opens it in the inspector |
| <kbd>Delete</kbd> or <kbd>Backspace</kbd> | Removes the selection when no text box has focus |

A step with a problem has a red border. A connection from a gate's fail port back to an agent step is drawn as a loop.

### Inspector

With nothing selected, the inspector shows workflow **Settings**: token budgets, **Runs at once**, per-card limits and the repository scope. With a step selected it shows that step's fields. A schedule trigger takes a cron expression and an IANA time zone. An agent step takes a **Brief**, a **Mode**, a **Model** and where to run. **Approval after** inserts an approval between the step and the next one. **Remove** deletes the step.

Under the fields, **Checks** lists every problem and warning. Click one to select its step. A dry run result appears below with its token and GitHub call ranges. A manual gate waits in [Checkpoints](/keleustes/using/board-and-checkpoints/) for you to pass or fail it.

## Schedules

The **Schedules** tab lists the triggers of published workflows. Chips filter by kind: cron, kanban, event, webhook and label.

| Column | Shows |
|---|---|
| **On** | A checkbox that enables or disables the trigger |
| **Workflow** | The workflow. Click the row to open it in the builder. |
| **Kind** | The trigger kind |
| **When** | The schedule in words. A cron row has a pencil that edits the cron and time zone. |
| **Next**, **Last** | The next run time and the time since it last fired |

**New schedule** adds a cron trigger to a published workflow. Re-timing a schedule, adding one and **Delete trigger** each publish a new version of the workflow.

## Templates

The filter strip has **Category** pills (All, Delivery, Testing, Hygiene, Operations, Security), a **Search** box and a **Dismissed** checkbox. A **Suggested** row appears when unanswered GitHub events from the last 7 days point at templates.

Select a card to open the **Preview** panel.

| Part | Shows |
|---|---|
| Meta line | Category, trigger, output, tokens per run and required crews |
| **GitHub required** | Shown when the template's trigger and steps need GitHub |
| Graph and **Steps** | A read-only picture of the graph and a numbered step list |
| **Name** | The name for the new workflow |
| **Repos** | Optional, comma-separated, as `owner/name` or `owner/*` |
| **Run budget, tokens** | Optional. Empty keeps the template's default. |

**Use template** copies the template into a new draft workflow and opens it in the builder. The draft does nothing until you publish it. **Dismiss** hides a template from the catalogue. Tick **Dismissed** to see it again, then press **Restore**.
