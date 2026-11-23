---
title: Strix
description: Strix is Vulnesis for coding agents, with hooks and skills in your own agent, five subagents, and voice calls with Strix, the Vulnesis assistant.
order: 1
sources: [pix-ai-coding-assistant/README.md, pix-ai-coding-assistant/.claude-plugin/marketplace.json, pix-ai-coding-assistant/vulnetix/hooks/hooks.json, cli/cmd/agent.go, cli/cmd/skills.go, vdb-site/api/internal/handler/belai_items_validate_launch.go, website/sandbox-worker/src/egress.ts, website/src/worker/call/routes.ts]
checked: [pix-ai-coding-assistant@7aebf02, cli@4c8c3b7, vdb-site@1a06d67, website@ad775f3]
updated: 04 Nov 2026
---

<img src="/img/strix.svg" width="96" alt="Strix, the Vulnesis assistant owl" class="mascot">

Strix is for developers who write code with an AI coding agent and want that agent to stop at a malicious dependency or a committed credential, and to run Vulnesis procedures that need the working tree. Use Strix when the agent must act on your repository. Use the [MCP server](/mcp-server/) when it only needs to look something up.

Strix is the name for the Vulnesis pieces that work alongside a coding agent. Some run inside the agent you already use. Some are services Vulnesis runs for you. The hosted machines are [Keleustes Sandboxes](/keleustes/sandboxes/overview/), documented with Keleustes.

| Part | Where it runs | What it does | Start with |
|---|---|---|---|
| Hooks | Your coding agent, through `vulnetix agent hook` | Checks a dependency before it is installed, a commit or push for credentials, and tells the agent what the last scan found | [Hooks](/strix/hooks/overview/) |
| Skills | Your coding agent's skills directory | 18 procedures that need your working tree: pick a dependency, trace a CVE into this repository, apply and verify a fix, scan, publish VEX | [Skills](/strix/skills/overview/) |
| Subagents | Claude Code, from the plugin | 5 multi-step workflows with their own context: bulk triage, upgrades, PR review, compliance bundles, incident response | [Subagents](/strix/agents/overview/) |
| Keleustes Sandboxes | A container Vulnesis runs per purchase | A Belai host that is always online, with your repositories cloned, a hostname egress policy and a launch configuration | [Keleustes Sandboxes](/keleustes/sandboxes/overview/) |
| Strix calls | The Resolve Platform's `/call` page | Talk to Strix, the factory's coordinator: ask how work is going, start or stop sessions, with a read-back before anything starts | [Voice calls](/strix/calls/voice-calls/) |

Looking a vulnerability up is not a Strix skill. That is the [MCP server](/mcp-server/) (`https://mcp.vulnes.is/mcp`) and the CLI's own `vulnetix vdb` subcommands. Every Strix skill exists because it needs the repository, needs you, or needs a sequence of steps.

## Install in one minute

```bash
vulnetix agent install      # hooks for Claude Code and Codex
vulnetix skills install     # the 18 skills, for every agent it can reach
```

No CLI yet: `brew install Vulnesis/tap/vulnetix`, or `curl -fsSL https://cli.vulnes.is/install.sh | sh`. See [Install](/strix/get-started/install/) for each agent, the Claude Code marketplace, and how to check it is working.

No credential is needed. The CLI falls back to the shared Community tier: reads work, the rate limit is shared with every other anonymous caller, and scans store no snapshot. `vulnetix auth login` gives you your own quota.

## How the parts connect

- The hooks and skills call the [Vulnesis CLI](/cli/) on your machine. The CLI is the only surface that reads your working tree, edits a manifest or runs without a credential. Dependency names and versions are sent to Vulnesis; source code is not.
- A skill uses the MCP tools (`vulnetix_*`) when the agent has them, and the CLI otherwise. This rule is written once in [`skills/_lib/contract.md`](https://github.com/Vulnesis/pix-ai-coding-assistant/blob/main/skills/_lib/contract.md).
- State a skill or hook writes lives in `.vulnetix/` in the repository. See [Repository files](/strix/reference/repository-files/).
- A Keleustes Sandbox runs [Belai](/software-factory/belai/install-and-sign-in/), the agent harness the Software Factory dispatches to. Its machine settings and installed items come from a [launch configuration](/keleustes/sandboxes/launch-configurations/); its outbound traffic goes through the [egress policy](/keleustes/sandboxes/egress/).
- A Strix call drives the same factory by voice. The factory's own docs cover [what you can ask on a call](/software-factory/strix/calling-strix/) and [every voice tool](/software-factory/strix/voice-tools/).

## Find the page for your task

| I want to | Read |
|---|---|
| Wire hooks and skills into my agent step by step | [Quickstart](/strix/get-started/quickstart/) |
| Stop my agent installing a known-malicious package | [Dependency guard](/strix/hooks/dependency-guard/) |
| Make the guard warn instead of block, or switch it off | [Policy file](/strix/hooks/policy-file/) |
| Catch a credential before `git commit` | [Change guard](/strix/hooks/change-guard/) |
| Ask "does CVE-2021-44228 affect us?" | [Vulnerability skills](/strix/skills/vulnerabilities/) |
| Review a pull request with every scanner at once | [`pr-security-reviewer`](/strix/agents/pr-security-reviewer/) |
| Give every sandbox the same agents, packs and allowed hosts | [Launch configurations](/keleustes/sandboxes/launch-configurations/) |
| Let a sandbox reach `*.pythonhosted.org` and nothing else new | [Egress policy](/keleustes/sandboxes/egress/) |
| Check on the factory from my phone | [Voice calls](/strix/calls/voice-calls/) |
| Fix a hook that says nothing | [Troubleshooting](/strix/get-started/troubleshooting/) |
| Look up a flag of `vulnetix agent` or `vulnetix skills` | [CLI commands](/strix/reference/commands/) |

## Platform IaC

Sandbox launch settings and egress are kinds: [`SandboxLaunchProfile`](/platform-iac/kinds/sandbox-launch-profile/) and [`SandboxEgressPolicy`](/platform-iac/kinds/sandbox-egress-policy/). The sandbox itself is bought in the Resolve Platform. `.vulnetix/agent.yaml`, the repository's hook policy read by `vulnetix agent hook` on every call ([Policy file](/strix/hooks/policy-file/)), is not an `apiVersion: vulnetix.com/v1` document, so `vulnetix config validate` does not check it. Launch configurations are versioned JSON documents in your library, saved through the API.
