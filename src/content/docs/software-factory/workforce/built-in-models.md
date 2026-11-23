---
title: Built-in models, quota and windows
nav: Built-in models
description: Strix Smart and Strix Fast, the models your plan includes, how calls are routed behind each, your allowance and its windows, and which models each host can use.
order: 8
sources: [vdb-site/docs/pix-builtin-models.md, website/.repo/pix-builtin-routing.md, vdb-site/docs/belai-workers-ai.md, vdb-site/api/internal/handler/pix_builtin_quota.go, vdb-site/api/internal/handler/pix_builtin_window.go]
checked: [vdb-site@284f1d6, website@a31d470, belai@35506b9]
updated: 28 Oct 2026
---

Your plan includes two model **labels**:

| Label | For |
|---|---|
| Strix Smart (`pix-smart`) | Harder work: coding, planning, review, images |
| Strix Fast (`pix-fast`) | Quick work |

You only ever see the label. Behind each, Vulnesis ranks up to five Workers AI models. Every call is routed across them by recent performance: answers, refusals and speed. If the first is struggling, the call goes to the next. Model ids never appear in the Resolve Platform, sessions or errors.

## Allowance and windows

Each tenant has an allowance of built-in tokens a month. The window is the UTC calendar month: it starts at 00:00 UTC on the 1st and resets at 00:00 UTC on the 1st of the next month. Refused and failed calls do not count. When the allowance runs out, the factory does what `onAllowanceExhausted` says: fall back to your own keys, pause, or buy a top-up. See [Model routing](/software-factory/cost/model-routing/).

The factory's share of the allowance is `budget.factory_share` (75%), and `pix.reservePercent` (20%) is kept for your own sessions.

## Hosts

The Belai build in a Keleustes Sandbox carries a built-in provider that offers Strix Smart and Strix Fast, so its sessions can pick either like any provider. Strix Smart takes image input; Strix Fast does not.

## Related

- [Model routing](/software-factory/cost/model-routing/)
- [Usage and spend](/software-factory/cost/usage/)
