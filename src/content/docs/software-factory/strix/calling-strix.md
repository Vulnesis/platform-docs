---
title: Calling Strix
description: Run the factory by voice with Strix, covering placing a call, what you can ask, how starting and stopping work is confirmed, and what it follows and remembers.
order: 1
sources: [website/.repo/pix-call.md, website/src/worker/call/tools.ts, website/src/shared/software-factory.ts, website/src/shared/pix-pocket.ts]
checked: [website@a31d470]
updated: 28 Oct 2026
---

Strix is the factory's coordinator, and you can call it. Ask how runs and sessions are going, start or stop a session on a Keleustes Sandbox or one of your own hosts, answer an agent's question, or check spend, all by voice.

![A call with Strix, with a read-back card on screen](/img/sf-call-live-dark.webp)

## Placing a call

The phone icon in the Resolve Platform header opens `/call`. It shows once you have somewhere to run sessions: a Keleustes Sandbox, or a host that has run `belai rc`. On a phone, or from the installed app's **Call Strix** shortcut, the call connects as the page opens where the browser lets audio play unasked (the installed app always does); elsewhere it waits for the green button. Tap the green button and talk.

`/call` is its own page. Moving into or out of it is always a full page load.

## What you can ask

| You ask | Strix uses |
|---|---|
| How's the factory doing? | `factory_stats` |
| What needs me? | `needs_attention`, `oldest_checkpoints` |
| What did I spend this month? | `factory_spend` |
| What did the factory save us? How many people would this take? | `delivery_value` |
| Is the review queue growing? | `queue_flow` |
| Where are agents getting stuck? | `friction` |
| How busy are my hosts? | `host_workload`, `list_hosts` |
| What's happening on payments-api? | `repo_activity` |
| What runs failed today? | `list_runs`, `run_facts` |
| How did my sessions go this week? | `sessions_aggregate`, `list_sessions`, `session_facts` |
| Start a session to fix the flaky test on payments-api | `find_repo`, `propose_session`, `start_session` |
| Tell it to use plan mode | `send_followup` |
| Stop that session | `propose_stop`, `stop_session` |

[Voice tools](/software-factory/strix/voice-tools/) lists every tool. Strix can also look things up with the read-only Vulnesis tools.

## Numbers only from your records

Every figure Strix says comes from a tool that read your factory's records. It does not add figures up itself. A figure the factory has not recorded is said as "not recorded yet", never zero. Estimates, such as what work would cost by hand, are called estimates and name the rate behind them. Long lists are spoken as three items "and four more", and the whole table appears on screen.

## Starting and stopping: the read-back

Reading is free. Anything that **starts** or **stops** work is two steps, enforced in code:

1. Strix proposes it and reads it back: "Just to confirm: a session on vulnesis/website, on main, on your Keleustes Sandbox, to fix the login redirect. Shall I start it?"
2. It acts only if your **very next** answer is a plain yes, within **2 minutes**.

"Yes, but on main" is not a yes: it changes the request, so Strix proposes again. A proposal is used once. Up to 5 sessions can go in one read-back, and one yes starts them all. The read-back also appears on screen as a card with **Start it** and **Change it** buttons, which count as your reply.

> [!WHY] Why a plain yes on the very next turn
> Speech recognition mishears, and a model can misread a conversation. Requiring an exact read-back and an immediate, unqualified yes means nothing starts or stops because of a guess.

Messages to a running agent are read back in conversation but not gated. You can answer an agent's question by voice: a permission as allow once or deny, never allow always, or a clarifying answer.

### Permission asks on sessions Strix starts

You are on the phone, not at the host, so a session started on a call runs with **permission asks off**: a tool call the rules would ask about is allowed instead of stalling. Guardrails still apply. If your organisation's `belai.ask_permission` is on, the read-back says so and asks whether to start with asks off. On a running session, Strix can turn asks off (with a read-back) or back on (no read-back needed).

## Naming a repository

Repository names come through speech recognition. Strix matches what you said against the repositories your hosts and sandboxes offer, allowing for spoken punctuation, spelled letters and words that sound alike, then confirms the match in the read-back.

## Following sessions

Strix follows the sessions it started while the call is open, and speaks up when one asks a question or finishes ("Good news, your session just finished. It says: ..."). The screen shows what it is waiting on. Hold music plays while Strix waits and is silent; you can turn it off.

## Memory

Ask Strix to remember something, such as "always use plan mode on the payments repository", and it keeps a note for future calls. The 15 most recent notes go into each call. Ask it to forget one and it reads the note back first. See [Call history and memory](/software-factory/strix/call-history/).

## Time and place

Strix uses your device's timezone, so "today" and "this month" start at your midnight. If your device's zone and your network location disagree, Strix does not assume where you are. Everything stored stays in UTC.

## How Strix runs

A call is handled by a Cloudflare Durable Object. Your speech is transcribed, **StrixCommander**, the coordinator, chooses the tools and the reply, and the reply is spoken back. StrixCommander runs on Workers AI models that Vulnesis ranks and tunes, each with a reasoning effort of `none`, `low` or `high`; if the first is unavailable, the next is used. Model ids are never shown on a call, in history, or in logs: the coordinator is always called StrixCommander. Whether a reply to a read-back is a yes is judged first by your organisation's SystemOne decision model, then by StrixCommander, then by fixed word rules.

## What Strix will not do

- Act without a plain yes to its read-back.
- Hold standing permissions: every start and stop is confirmed on its own.
- Make up figures.
- Keep audio. Call history keeps the words and the cards on screen.

## Related

- [Stopping work](/software-factory/strix/stopping-work/)
- [Strix buttons in the Resolve Platform](/software-factory/strix/strix-buttons/)
- [Strix, your personal assistant](https://www.vulnes.is/articles/pix-personal-assistant)
