---
title: CLI reference
nav: CLI
description: Every keleustes command and subcommand with its purpose and an example, the global flags, the JSON contract and the exit codes.
order: 1
sources: [keleustes/crates/kls-app/src/main.rs, keleustes/crates/kls-app/src/cli.rs, keleustes/crates/kls-app/src/forge_cmd.rs, keleustes/crates/kls-app/src/host_cmd.rs, keleustes/docs/skills/keleustes-operator/SKILL.md]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

`keleustes` with no command opens the window. With a command it works on the data directory, beside a running app or a headless one, and exits. The running app picks up what a command wrote within a couple of seconds.

`keleustes contract` prints the machine-readable version of this page. When the two differ, the contract is right.

## Global flags

| Flag | Environment variable | Meaning |
|---|---|---|
| `--data DIR` | `KELEUSTES_DATA` | Data directory. Default: the [platform data directory](/keleustes/reference/data-directory/). |
| `--database-url URL` | `KELEUSTES_DATABASE_URL` | Use this database (`sqlite:` or `postgres://`) instead of `<data>/keleustes.db` |
| `--headless` | | Serve nodes without a window. No command. |
| `--json` | | Print one JSON envelope as the last line of standard output |
| `-V`, `--version` | | Print the version |
| `-h`, `--help` | | Print help. Works on every command. |

## Tokens, nodes and settings

| Command | Purpose |
|---|---|
| `token new [--label NAME] [--ttl-minutes N]` | Create a single-use join token and print it. Default expiry: `node.token_ttl_minutes`, else 15. |
| `nodes list` | List joined nodes: id, name, hostname, belai version, state |
| `nodes revoke ID [--reason TEXT]` | Revoke a node |
| `config KEY [VALUE]` | Print a setting, or set it |

```sh
keleustes token new --label build-box --ttl-minutes 30
keleustes nodes list
keleustes nodes revoke <node-id> --reason "decommissioned"
keleustes config node.listen_addr
keleustes config node.advertise_addrs 10.0.0.5:7443
```

## Sessions

Every command that takes a session accepts the dispatch id in its place.

| Command | Purpose |
|---|---|
| `sessions list [--node N] [--open] [--limit 50]` | Sessions, newest first |
| `sessions dispatch --node N --cwd DIR --prompt TEXT` | Start a session on a node. Prints the dispatch id first. |
| `sessions resume SESSION [--prompt TEXT] [--fork ENTRY] [--execute-plan]` | Continue an ended belai session in a new session, or fork it at an entry |
| `sessions worker --node N --cwd DIR --prompt TEXT` | Start a one-off worker made from a prompt |
| `sessions wait SESSION [--for ask] [--timeout 10m]` | Wait until a session needs you or ends |
| `sessions show SESSION` | State, open ask, what it accepts, and usage, as JSON |
| `sessions transcript SESSION [--follow] [--since IDX]` | Print the transcript |
| `sessions prompt SESSION TEXT [--attach FILE]` | Queue a prompt. Resumes an idle session. |
| `sessions answer SESSION ASK [DECISION] [--payload JSON] [--note TEXT]` | Answer the open ask |
| `sessions command SESSION NAME [ARGS]...` | Queue a session control such as `stop` or `interrupt` |
| `sessions teleport SESSION --to NODE [--wait 120]` | Move a session to another node. Then run `belai -teleport <id>` on the target. |
| `sessions harnesses NODE` | The third-party harnesses a node advertises |
| `sessions library --node N [--install KIND:NAME] [--backup KIND:NAME] [--overwrite]` | Install library items on a node, or back a node's items up |
| `sessions requests [--state S]` | Cross-host requests nodes made, newest first |
| `sessions approve REQUEST`, `sessions decline REQUEST` | Decide a cross-host request that waits for approval |
| `sessions harness-keys [--set JSON]` | Show the harness key-mode policy, or set it |
| `sessions a2a-blackout on\|off [--reason TEXT]` | Turn the A2A blackout on or off |
| `sessions a2a-send TO TEXT` | Send an A2A message as the owner |
| `sessions vault-key --provider P --env VAR [--label L]` | Store a vault key read from standard input. Prints its id. |

```sh
keleustes sessions dispatch --node build-box --cwd ~/src/project \
  --prompt "fix the flaky test" --label flaky --wait-for ask --timeout 10m
keleustes sessions wait <id> --for ask --timeout 10m
keleustes sessions transcript <id> --follow
keleustes sessions answer <id> <ask-id> <option-id>
keleustes sessions prompt <id> "now add a regression test"
keleustes sessions command <id> stop
keleustes sessions teleport <id> --to other-box
keleustes sessions library --node build-box --install skill:fmt
printf %s "$KEY" | keleustes sessions vault-key --provider anthropic --env ANTHROPIC_API_KEY
```

### Dispatch options

| Flag | Meaning |
|---|---|
| `--provider`, `--model`, `--agent`, `--mode` | Choose the provider, model, agent profile and mode |
| `--vault PROVIDER` | Attach vault keys for these providers |
| `--label TEXT` | A short label shown in the session's provenance |
| `--wait SECONDS` | Wait for the node to start or refuse it |
| `--wait-for started\|ask\|done\|ended` | Wait for that state |
| `--timeout DURATION` | One deadline over delivery, start and the turn (`500ms`, `30s`, `10m`, `1h`). Default 30m. It reports only and never stops the session. |
| `--harness ID`, `--key ID`, `--resume ID` | Run a third-party harness the node advertises, hand it a vault key, resume its native session |
| `--answers-file FILE` | Scripted answers for the questions the session asks |
| `--gate KEY=VALUE` | A harness gate: `finish_review=on`, `lint_loop=on`, `checkpoints=on`, `code_mode=off`, `commit_mode=off\|ask\|auto` |
| `--plan-first` | Run in plan mode and return the plan file |
| `--attach FILE` | Attach a PNG, JPEG or UTF-8 text file to the first prompt. Repeatable, at most 8. |

`sessions worker` also takes `--tools` (comma separated, default all), `--claim LIST[:LABEL,LABEL]`, `--to`, `--publish none|draft_pr|agent` and `--read-only`.

## Forges

| Command | Purpose |
|---|---|
| `forge list` | Every connection: id, kind, host, login, enabled |
| `forge connect --kind KIND [--host HOST] [--label L]` | Add a connection. Kinds: `github`, `ghes`, `gitlab`, `gitea`, `forgejo`, `codeberg`. |
| `forge login [--kind github] [--host HOST] --device\|--web\|--with-token [--refresh]` | Sign the forge's CLI in |
| `forge status [--host HOST]` | One line per connection. Exit 0 when every listed connection is signed in. |
| `github login [--with-token] [--refresh]` | Sign the local `gh` in to github.com |
| `github status` | The route to GitHub and whether the local `gh` is signed in |

```sh
keleustes forge connect --kind gitlab --host gitlab.example.com
keleustes forge login --kind gitlab --host gitlab.example.com --with-token < token.txt
keleustes forge status
keleustes github login
```

## Hosts and the kill switch

| Command | Purpose |
|---|---|
| `host inventory NODE` | The last inventory a node reported, as JSON |
| `host act NODE KIND [--param K=V] [--dry-run] [--if-match V] [--preview SHA] [--confirm NAME] [--wait 60]` | Request a host action and wait for it to settle |
| `host stop [--reason TEXT]` | Stop the factory (the kill switch) |
| `host resume` | Lift the kill switch |
| `host verify` | Verify the audit ledger. Exit 1 when a chain is broken. |

```sh
keleustes host inventory build-box
keleustes host stop --reason "bad deploy"
keleustes host resume
keleustes host verify
```

## Other commands

| Command | Purpose |
|---|---|
| `open [URL]` | Open a [`keleustes://` link](/keleustes/reference/deep-links/) in the running window, starting the app if none runs |
| `contract [--schema NAME] [--skill]` | Print the CLI contract, one JSON Schema (`envelope`, `handle`, `entry`, `session`, `finding`), or the operator skill for agents |
| `analyze-usage [--since 7d] [--ax-only] [--session ID] [--ask-after 15m] [--stuck-after 10m] [--append-findings FILE]` | List usage friction in sessions, dispatches and the audit ledger |

```sh
keleustes open keleustes://sessions/<session-id>
keleustes contract --schema envelope
keleustes analyze-usage --since 12h --json
```

## JSON output and exit codes

With `--json`, the last line of standard output is one envelope. `sessions dispatch` prints a handle line before it, and `sessions transcript` prints entry lines before it. Standard error is not part of the contract. A failure carries `code` and `error.remediation`, and `next[]` holds literal commands for the next step.

| Exit | Meaning |
|---|---|
| 0 | Ok. An open ask is ok. |
| 1 | Failed or internal error |
| 2 | Usage error |
| 3 | The node or the agent failed |
| 4 | Not found, or the wrong state |
| 5 | Timeout. The work goes on. |
| 6 | Refused by the kill switch or a maintenance window |
| 7 | Refused by policy: the A2A blackout, the node, or Keleustes policy |

Under the kill switch, prompts and every session command except `stop`, `interrupt` and `cancel` are refused with exit 6. Do not retry. Lift it with `keleustes host resume`.

`forge`, `github` and `host` keep their own exit codes: `host act` exits 2 when the action is refused.
