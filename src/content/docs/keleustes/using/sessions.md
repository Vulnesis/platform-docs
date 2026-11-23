---
title: Sessions
description: The Sessions screen lists belai and harness sessions, shows transcripts, takes prompts and answers, and starts new sessions.
order: 4
sources: [keleustes/crates/kls-ui/src/screens/sessions.rs, keleustes/crates/kls-ui/src/screens/attach.rs, keleustes/crates/kls-ui/src/screens/harness_picker.rs, keleustes/crates/kls-ui/src/screens/harness_screen.rs, keleustes/crates/kls-ui/src/screens/harness_a2a.rs, keleustes/crates/kls-core/src/sessions/start.rs, keleustes/crates/kls-core/src/attachments.rs, keleustes/crates/kls-app/src/cli.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Sessions is in the **Factory** group. It lists the sessions your nodes run, shows a session's transcript, and lets you prompt, answer, control and start sessions. The navigation shows the number of live sessions beside it.

## Session list

| Control | Options |
|---|---|
| State pills | **Live**, **Waiting**, **Ended**, **All** |
| Source tabs | **All**, **Console**, **Runs**, **Workers**, **Host** |
| **By crew** | Groups the list by the crew each worker belongs to |
| **Filter sessions** | Text match on title, directory, repository, model, agent or id |
| Node menu | **All nodes** or one node |
| **Agent** menu | belai or a harness. It appears when sessions use more than one. |

**Console** sessions were started from Keleustes. **Host** sessions were started on the node itself or by another node.

Each row shows the title, the node, model, last update and token usage. The state reads `ended`, `waiting` (a question is open), `quiet` (no report from the node for 45 seconds) or the state the node reports.

## Session detail

The header shows the state, **Interrupt**, **Stop** (asks for **Confirm**), a copy-id button and close. Below the title, a row of facts covers node, directory, repository, branch, provider, model, mode, agent, commit and usage. Hover a fact for its name. Links to the session's card and run appear when it has them, and a **Factory** chip opens its run step, budgets, pull request checks, cards and todo list.

| Tab | Contents |
|---|---|
| **Transcript** | Entries by role. Tool calls collapse to one line. Click an entry to read it in full and copy it. |
| **Screen** | A read-only view of a harness session's terminal. Harness sessions only. |
| **A2A** | Messages to and from this session, with a box to send one as yourself |

A harness session carries a **harness rules** chip. The harness runs under its own permission rules, not belai's sandbox.

## Prompt, answer and control

The box at the bottom sends to an open session. Its placeholder reads "Queued until idle · /command · !shell".

| You type | Sent as |
|---|---|
| Plain text | A prompt |
| `/name args` | A session command. Matching commands appear as pills while you type. |
| `!cmd` | A shell line. The box reads **No shell** when the session does not take one. |

Press **Send** or <kbd>Ctrl</kbd>+<kbd>Enter</kbd>. Under a prompt, a path field and **Attach** add a PNG, JPEG or text file, up to 8 per prompt. Queued items show above the box as `queued`, `delivered`, `refused` or `failed`.

When the session asks something, a highlighted panel appears above the box. A plain question takes a typed answer and **Answer**. A structured ask shows one button per option the node listed, a questionnaire with **Answer** and **Decline**, or a relay draft with **Approve**, **Send edit** and **Drop**. **Host only** means the node does not take remote answers.

What else appears depends on what the session lists:

| Control | Action |
|---|---|
| **Control** menu | Sends a listed control with optional arguments |
| **Compact**, **Relay**, **Commit**, **Btw**, **Rename** | Opens a text field, then **Send** |
| **Undo** | Sends at once |
| **Rewind** | Picks a checkpoint to rewind to. Rewound entries stay in the transcript, muted. |
| **Switch** | Switches the session to the branch you type |
| **Sync on**, **Sync off** | Turns git sync on or off |
| **Teleport** | Moves the session to another online node |
| **Keys** row | Sends an allowed key to a harness session |

An ended belai session offers **Resume** and **Fork**. The first prompt defaults to "Continue." Fork continues from the transcript entry you picked. A session that ended with an approved plan also offers **Plan** and **Execute plan**. An ended harness session offers **Resume** when its node still supports it.

## Start a session

**New session** opens a dialog. It needs an online node that advertises remote control. Without one it reads **No rc nodes online**. Run `belai rc` on a joined host.

| Field | Purpose |
|---|---|
| **Node** | The node to start on |
| **Agent** (first row) | belai, or a harness detected on the node |
| **Directory** | The working directory. The menu lists the node's trusted directories. Any other path shows **Untrusted directory**, and the node may refuse it. |
| **Prompt** | The task |
| **Attach** | Files for the first prompt |
| **Provider**, **Model** | Default to `host default` |
| **Agent** (second row) | An agent profile, or `none (plain belai)` |
| **Crew** | A crew the node advertises. Picking one starts the crew. |
| **Mode** | `agent`, `plan`, `goal` or `auto` |

Picking a harness replaces the lower rows with its own **Mode**, **Model**, **Keys** and **Resume**. **Keys** is **Own login** or a vault key the key policy allows. With a vault key the dialog warns that the harness, its tools and that user can read it.

**Options** adds **Effort**, **Ask**, **Extra dirs**, **Workspace**, **Git sync**, **Plan first**, **Gates**, **Answers** and **MCP**. With an agent profile, **Claim cards** starts it as a worker. Workers and crews get **Stay**, **Clone** and, for a crew, **Fill**.

**Start** needs a node and a directory. The dialog then shows **Queued**, **Delivered** or **Starting**, and opens the session once the node reports it. A failed dispatch shows the error with **Retry**.

From a terminal:

```sh
keleustes sessions list --open
keleustes sessions dispatch --node NAME --cwd DIR --prompt "TEXT"
```

The other subcommands are on the [CLI reference](/keleustes/reference/cli/). Keleustes runs no sandboxes itself. For hosted ones, see [Keleustes Sandbox](/keleustes/sandboxes/overview/).
