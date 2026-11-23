---
title: Board and checkpoints
description: The kanban Board with its tabs, card drawer and bulk actions, and the Checkpoints queue of everything waiting on you.
order: 2
sources: [keleustes/crates/kls-ui/src/screens/board.rs, keleustes/crates/kls-ui/src/screens/board/bulk.rs, keleustes/crates/kls-ui/src/screens/board/claims.rs, keleustes/crates/kls-ui/src/screens/board/github.rs, keleustes/crates/kls-ui/src/screens/board/tabs.rs, keleustes/crates/kls-ui/src/screens/checkpoints.rs, keleustes/crates/kls-core/src/needs.rs, keleustes/crates/kls-core/src/board/cards.rs, keleustes/crates/kls-core/src/board.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Board and Checkpoints sit in the **Factory** group. Board is the kanban of cards that agents and people work from. Checkpoints is one queue of everything waiting on a person. The navigation shows the number of waiting items beside Checkpoints.

## Board tabs

| Tab | Shows |
|---|---|
| **Board** | Seven lanes: Triage, Backlog, Todo, Doing, Blocked, Review, Done |
| **Review** | Cards in review, with **Confirm** (to the backlog) and **Dismiss** |
| **Backlog** | Backlog cards with an inline priority you can drag, type or step with the arrows |
| **Done** | Done cards grouped by day, each with **Reopen** (back to review) |
| **Triage** | Blocked and held cards grouped by cause, with a suggested fix |
| **Intake** | Cards in the triage status |
| **Sync** | Fields where the board and GitHub disagree |

The **Triage** tab lists stuck cards. New cards waiting to be sorted are on **Intake**.

On the **Board** tab, drag a card by its three-dot handle to move it. Dropping a card on Blocked blocks it. Dragging a card out of Blocked sends it to the backlog first, which clears its claim and attempts.

The **Review** tab takes keys when no text field has focus: <kbd>J</kbd> and <kbd>K</kbd> move the cursor, <kbd>C</kbd> confirms and <kbd>X</kbd> dismisses.

On **Sync**, each row shows a field's **Base**, **Board** and **GitHub** values. **Keep board** or **Take GitHub** settles it.

## Filters, lenses and lanes

The filter bar has a text **Filter** (title, key or label), **Repository**, **Assignee**, **Label** and **Sort** (Updated, Created, Priority or Title, with a direction button).

| Lens | Keeps |
|---|---|
| **All** | Every card |
| **Needs me** | Held or blocked cards, and cards in review |
| **Unrouted** | Cards not done with no assignee, label or claim |
| **Stale** | Cards not done and untouched for 14 days |
| **P1** | Priority 2 or higher |
| **From a workflow** | Cards a workflow created |

The lanes menu groups the board into swimlanes: **No lanes**, **By repo**, **By workflow** or **By crew**.

## Bulk actions

Tick **Select**, then click cards. Holding the command key while clicking also selects. A bar appears with **Move**, **Priority**, **Release claims**, a workflow menu with **Send**, **Delete** and **Clear**. **Send** starts one run per card and skips cards without a repository.

## Card drawer

Click a card to open its drawer. **New card** in the header opens the same fields in a dialog. Only the title is required.

| Tab | Contents |
|---|---|
| **Card** | Title, body, **Status**, **Priority** (-2 to 3), **Labels**, **Assignee**, **Repo**, **Branch**, with **Save**, **Revert** and **Delete** |
| **GitHub** | The linked issue with **Sync now**, **Open** and **Unlink**, or **Open issue** to create one from the card |
| **Sessions** | Sessions for this card. Click one to open it. |
| **Run** | Workflow runs for this card |
| **Activity** | The card's change log |

**Delete** asks for a second click on **Confirm**. A **Ticket gaps** list under the body shows what the card is missing, or reads "Meets the ticket standard". If the card changes while you edit, a **Changed elsewhere** chip appears with **Reload**.

The **Card** tab also has these sections when they apply:

| Section | Controls |
|---|---|
| **Waiting on you** | **Approve** or **Reject** a held card. Reject needs a reason. |
| **Claim** | Who holds the card and until when, with **Release claim** |
| Blocked card | **Retry** (back to the backlog) and **Snooze 7d**. Other cards offer **Block**. |
| **Notes** | Add a note and read earlier ones |
| **Send to workflow** | Pick a published workflow and press **Run**. The card needs a repository. |
| **Assign** | Route the card to a crew or worker |
| **Send to a node** | Pick an online node and press **Start session**. The card moves to Doing if it was not started. |

**Send to a node** lists only nodes that advertise remote control. With none online it reads **No rc node**.

## Checkpoints

The queue sits beside an inspector for the selected item. Kind chips, **Search**, **Any repo** and **Anyone** filter it. The list shows 50 rows and **Show more** adds 50. A red warning icon marks an overdue item.

| Kind | Inspector actions |
|---|---|
| Approval | **Approve**, **Reject** |
| Gate, Deploy gate | **Pass**, **Fail** |
| Waiting for a node | **Retry**, **Give up** |
| Paused run | **Resume**, **Cancel** |
| Question | **Answer** opens the session |
| Review, Ready to merge, Draft | **Merge** (ready only), **Ready**, **Draft**, **Update branch**, **Request** reviewers |
| Waiting for your decision | **Approve**, **Reject** with a reason |
| Claim lapsed | **Release claim** |
| Blocked card | **Unblock** |
| Host step for you, belai update, Node offline | **Copy command** (host step only), **Open host** |
| GitHub quota | **Usage** |

Decidable items take an optional **Note** recorded with the decision. A budget approval's **Approve** runs the step past the budget, and **Reject** fails it. Every item also offers the links that apply: **Open run**, **Open pull**, **Open card**, **Open session**, **GitHub** and **Events**.

For a pull request the inspector shows author, checks, mergeability, review state, branch, size and merge method, plus a **Files** list. **Merge** uses the repository's merge method, which defaults to squash. A conflicting pull request offers **Resolve conflicts**, which files a merge-conflict card. Once that card exists, its **Conflict ledger** shows each attempt with **Retry** and **Open card**. See [Conflicts and delivery](/keleustes/using/conflicts-and-delivery/).

Tick rows to act on several at once. **Select all** ticks every row that can be decided or is a pull request. The header then offers **Approve (N)** and **Reject (N)**, and for pull requests **Update branch (N)**, **Draft (N)**, **Ready (N)** and **Request (N)** for 1 to 15 reviewers.
