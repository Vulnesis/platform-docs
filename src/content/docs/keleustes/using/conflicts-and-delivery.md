---
title: Conflicts and delivery
description: Resolve a pull request's merge conflicts in a three-way editor, and read what the factory delivered and who it needed.
order: 11
sources: [keleustes/crates/kls-ui/src/screens/conflicts.rs, keleustes/crates/kls-ui/src/screens/delivery.rs, keleustes/crates/kls-github/src/conflicts.rs, keleustes/crates/kls-github/src/forge/kind.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Conflicts** and **Delivery** sit in the **Code** group, after [Repositories](/keleustes/using/repos-and-forges/). Conflicts is a three-way merge editor for one pull request. Delivery reports what was delivered in a period and the people it needed.

## Open a pull request in Conflicts

There are three ways to load one:

- Click a chip under **Conflicting**. The row shows **None** when no mirrored pull request conflicts.
- Pick from the **Open** list, which holds up to 100 other open pull requests.
- Type `owner/name` and the number in the header, then press **Load**.

**Resolve** on a pull request card in Repositories also lands here with the pull request loaded.

The header line shows the head and base branches, the merge base, the file count, and how many hunks are resolved.

## Resolve the files

The **Files** row has one chip per file. Press <kbd>J</kbd> and <kbd>K</kbd> for the next and previous file when no text field has focus. Three panes show the selected file:

| Pane | Content |
|---|---|
| **Ours** | The pull request's head branch, with its changes against the base |
| **Base** | The merge base |
| **Theirs** | The base branch, with its changes against the base |

A side that does not have the file reads **Absent**.

The hunk list sits beside the result. For each conflict choose **Take ours**, **Take theirs**, **Both**, **Base** or **Markers** (put the conflict markers back). The **All** row applies **Ours**, **Theirs** or **Both** to every hunk, and the **File** row takes one side's whole file.

You can type in the result panel at any time. It carries **Edited** once you have typed, and **Markers left** or **Resolved**. A file counts as resolved only when no conflict marker is left in its text.

| Case | Behaviour |
|---|---|
| Lockfile | Never merged by hand. Choose **Keep ours** or **Keep theirs**, then run the regenerate command the panel shows. |
| **Binary or >1 MB** | Cannot be resolved in the editor. The commit button stays off while such a file is in the set. |
| Fork head | Push is disabled, so the commit button stays off |

## Commit the resolution

Keleustes writes the **Commit message** from your choices until you edit it. The commit button turns on when every file is resolved.

| Forge | Button | Result |
|---|---|---|
| GitHub, GitHub Enterprise | **Commit signed resolution** | A merge commit on the head branch, made through the forge API, which signs it |
| Others | **Commit and push** | A merge commit pushed with the forge CLI. The forge does not sign it, and the screen shows **Unsigned push**. |

If the head branch moved while you worked, the commit writes nothing. Keleustes reloads the pull request, keeps the files whose three versions did not change, and shows how many it kept and reset.

**Resolve with belai:conflict-resolver** files a merge-conflict card for that agent instead. If one is already open for the pull request, Keleustes tells you its key.

**Resolutions** lists the last five commits for the pull request, each marked **Verified**, **Unverified**, **Signature unknown** or **Unsigned push**.

## Delivery filters and export

| Control | Does |
|---|---|
| Range chips | **Today**, **7d**, **30d** (default), **MTD**, **90d**. Ranges are UTC days. |
| **Search** | Matches title, repository, key and person |
| **All**, **Internal**, **External** | Scope, on the Contributors tab only |
| CSV path | Where **Export CSV** writes. It starts as `delivery.csv` in the [data directory](/keleustes/reference/data-directory/). |

**Export CSV** writes the current tab's rows. On the Lifecycle tab and on a single contributor or outcome it writes the outcomes rows.

## Delivery tabs

| Tab | Shows |
|---|---|
| **Outcomes** | Merged pull requests and closed issues of mirrored repositories. Tiles for **PRs merged**, **Median cycle**, **Agent share**, **Closed issues**, **Median 1st review**, **No person**, **By hand** and **Outcomes**, a chart of merged pull requests by people and by agents, and a table. Click a row to open that outcome. |
| **Decisions** | Counts for **Proceeded**, **By rule** and **Escalated**, decisions per day, a confidence histogram with its threshold, a breakdown **By model**, and **Asked a person** |
| **People** | People, actions, person time and median wait, **Hours per person**, and actions **By source**. Bots are left out and listed below. Click a person to open them. |
| **Contributors** | Internal and external contributors with outcomes, started, decided, reviews and signed-off commits. Click a row to open one contributor. |
| **Estimate** | The range priced as engineer hours and value per role, with model cost, factory cost and return. Rates come from the Estimates section of [Settings](/keleustes/using/settings/). **Role rules** lists how agent work is classed. |
| **Performance** | Items, success rate, cost per item, cycle and value, grouped by **Agent**, **Node**, **Model**, **Repo** or **Workflow** |
| **Lifecycle** | How many outcomes reached **Opened**, **Agent started**, **First review** and **Resolved**, with medians |

An opened outcome shows its cycle, agent time and model cost, its **Links** (card, pull request, issues, runs, sessions), a **Timeline**, **Cost by model** and **People**.

## Lifecycle panels

The Lifecycle tab has three more panels, each covering 30 days:

- **Board flow** lists each stage with **Open**, **In**, **Out** and **Oldest open**. **Unanswered deliveries** lists forge events that started no run, with suggested [templates](/keleustes/using/workflows-and-templates/).
- **Lifecycle ledger** has **Record**, which writes new stage entries and exits to the ledger, and **Link + roll up**, which links outcomes to cards, pull requests and sessions and fills agent time and cost.
- **Forge requests** lists worker requests waiting for an answer. Enter a pull request URL and press **Took over**, or press **Wait 1h** or **Failed**. Each answer is sent to the worker.
