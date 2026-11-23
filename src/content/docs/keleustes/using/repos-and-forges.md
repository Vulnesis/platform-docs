---
title: Repositories and forges
description: Manage orgs, repositories and pull requests, and connect Keleustes to GitHub, GitLab, Gitea or Forgejo through each forge's own CLI.
order: 7
sources: [keleustes/crates/kls-ui/src/screens/repos.rs, keleustes/crates/kls-ui/src/screens/gh_signin.rs, keleustes/crates/kls-app/src/forge_cmd.rs, keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-github/src/lib.rs, keleustes/crates/kls-github/src/select.rs, keleustes/crates/kls-github/src/login.rs, keleustes/crates/kls-github/src/forge/kind.rs, keleustes/docs/forges.md]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Repositories** is the first screen in the **Code** group. It lists the orgs and repositories Keleustes knows, holds each repository's defaults and open pull requests, and shows how Keleustes reaches each forge.

## How Keleustes reaches a forge

Keleustes holds no forge token. Every call runs the forge's own CLI, and the CLI keeps the credential in its own store.

| Forge | CLI |
|---|---|
| GitHub, GitHub Enterprise | `gh` |
| GitLab | `glab` |
| Gitea, Forgejo, Codeberg | `tea` |

The CLI runs on your machine when it is signed in to the connection's host. Otherwise Keleustes runs it on a connected belai node that reports a login for that host. With neither, the route reads `unavailable` with the reason. A detected route is trusted for 60 seconds. There are no webhooks: a poller reads each enabled connection on a timer, inside a rate budget.

## Status tiles

| Tile | Shows |
|---|---|
| **GitHub route** | The github.com route (`via local gh`, `via node <name>` or `unavailable`), when it was checked, and the signed-in login. It offers **Sign in** when `gh` is signed out, **Install gh** when it is missing, and a **Grant scopes** button when the token lacks scopes. |
| **Rate budget** | Calls left of the limit, the reset time, the poller's calls this hour against its share, and a backoff notice when the forge asks for one. |
| **Polling** | Time since the last poll, what changed, and the share of answers served from the ETag cache. |

The header has **Refresh orgs**, **Poll** (one poll now) and **Recheck** (detect the github.com route again).

## Forges

The **Forges** card has one row per connection other than github.com: a state dot, the name, the login, a **Token expires** chip when the forge reports an expiry, the route, and the call budget. **Sign in** appears on a signed-out row. The row menu has **Recheck**, **Sign in again**, **Disable** or **Enable**, and **Remove**.

**Connect forge** opens a dialog with six choices: GitHub, GitHub Enterprise, GitLab, Gitea, Forgejo and Codeberg. Enter the **Host** (fixed for GitHub and Codeberg). **Check** reports the installed CLI version and which sign-in methods it offers for that host. **Continue** adds the connection and opens its sign-in.

## Sign in

The sign-in dialog shows only the methods the CLI offers for the host.

| Tab | What happens |
|---|---|
| **Browser** (`gh`) or **Device** | Press **Start**. Keleustes copies the **One-time code** to the clipboard and opens the forge's device page. The dialog waits for your approval. |
| **Browser** (other CLIs) | The CLI opens its own browser flow with a countdown. **Open again** reopens the page. |
| **Token** | Numbered steps: **New token** opens the forge's token page, you paste the token, then press **Sign in**. Where the page cannot be pre-filled, the dialog lists the scopes to tick with **Copy list**. |

A pasted token goes straight to the CLI: on standard input for `gh` and `glab`, in an environment variable for `tea`. Keleustes does not keep it. If the CLI is not installed, the dialog shows install commands and **Check again**.

For a machine without a window, sign in from a terminal:

```sh
keleustes github login
keleustes github login --with-token < token.txt
keleustes github login --refresh
keleustes github status
keleustes forge connect --kind gitlab --host gitlab.example.com
keleustes forge login --kind gitlab --host gitlab.example.com --with-token < token.txt
keleustes forge list
keleustes forge status
```

`forge login` also takes `--device` or `--web`. `forge status` exits 0 when every listed connection is signed in. See the [CLI reference](/keleustes/reference/cli/).

## The repository table

The **Orgs** chips filter by org. Each chip's menu has a **Managed** checkbox, **Refresh**, and **Disable** or **Enable**. A switched-off org starts no new work and its data stays. Below, filter by `owner/name` or tick **Managed**.

| Column | Shows |
|---|---|
| **Repository** | Visibility, host chip for repositories off github.com, name, an archive mark |
| **Open PRs** | Open pull requests in the mirror |
| **Autonomy** | The repository's autonomy level |
| **Mirroring** | `pulls`, `issues`, `labels`, or `off` |
| **Managed** | `yes` or `no` |
| **Synced** | Time since the last sync |
| **Signals** | Watched, board mode, TEA releases, repo scout signals |
| **Findings** | Security alerts and risk signals in the last 90 days |
| **SLSA** | `signed`, `unsigned`, `none`, or `-` when not scouted |

Tick rows to get the bulk actions: **Manage**, **Unmanage**, **Mirror pulls**, **Mirror issues**, **Keep labels** (each **On** or **Off**), **Sync labels**, **Stop watching**, **Attach** (adds the repositories to a workflow's scope and publishes it) and **Clear**.

## Repository detail

Click a row to open the detail panel.

| Control | Values |
|---|---|
| **Autonomy** | **Observe only**, **Suggest**, **Draft PR**, **Pull request**, **Merge** |
| **Board** | `off`, `mirror`, `all` |
| **Merge** | `squash`, `merge`, `rebase` |
| **Token cap** | Monthly token cap, a whole number or empty for none |
| **Protect branches** | Never push to the default branch or to a pull request base |
| **TEA releases** | Publish releases to TEA |
| **Watched** | Marks the repository as watched |

**Save defaults** writes these and **Discard** drops your edits. The **Mirroring** checkboxes (**Managed**, **Mirror pulls**, **Mirror issues**, **Keep labels**) apply at once. **Draft AGENTS.md** asks a host to draft the file for your review. The panel also lists the workflows whose scope includes the repository.

Each open pull request (merge request on GitLab) is a card with chips for mergeability, checks and review, and these actions: **Ready** or **Draft**, **Update**, **Request** (uses the reviewers field above the cards), **Merge** (with the repository's merge method, off for drafts and conflicts) and, on a conflict, **Resolve**, which opens [Conflicts](/keleustes/using/conflicts-and-delivery/).
