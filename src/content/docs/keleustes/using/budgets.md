---
title: Budgets
description: Limit model spend with budgets, route work to models with rules, and read usage and the value estimate for agent work.
order: 8
sources: [keleustes/crates/kls-ui/src/screens/budgets.rs, keleustes/crates/kls-core/src/vault.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

**Budgets** is the first screen in the Govern group. It has four tabs: **Budgets**, **Value**, **Routing** and **Usage**. The **Vault** button in the header opens the [Vault](/keleustes/using/vault-and-trust/), where provider keys live.

## Budgets tab

Each budget is a tile with its name, period, spend against the limit, a meter and a note line. The note names the scope, the providers, the alert thresholds and the action at the limit. The tile edge turns gold at the first alert threshold and red at 100%.

With no budget, the tab shows **No budgets** and model work is never limited. When several budgets cover the same work, the tightest one wins. With more than one budget, a **Nesting** panel groups them by tier: Factory, Provider and model, Workflow, Agent and repository, Node.

**New budget** opens the form. A tile's **More** menu has **Edit** and **Delete**.

| Field | Values |
|---|---|
| **Name** | Free text |
| **Scope** | all, org, provider, model, agent, repo, workflow or node. "org" is the whole factory and every provider. |
| Subject | Shown for every scope except all and org. A provider, a `provider/model`, an agent, a workflow id, a node id, or a repository as `owner/name` or `owner/*`. |
| **Providers** | `all`, or a comma-separated list |
| **Period** | day, week, month or total |
| **Token limit**, **USD limit** | Either or both. Empty means none. |
| **Alert at %** | Comma-separated percentages. A new budget starts with 80 and 100. |
| **At limit** | alert only, downgrade to fast, escalate human, pause run or hard stop |

If you leave **At limit** empty, the budget takes the `budget.on_exceed` setting, which defaults to `pause_run`. Read or change it from the CLI:

```sh
keleustes config budget.on_exceed
keleustes config budget.on_exceed hard_stop
```

A stopping action holds new model work. "alert only" does not.

The lower half of the tab repeats the value estimate and lists **Routing rules** in order, ending with **Everything else** and the default model. Click a rule to edit it.

## Routing tab

**Default models** has two fields, **Default model** and **Fast model**, each written as `provider/model` with its own **Save** button.

**Rules** lists routing rules with **Priority**, **When**, **Use** and **On**. The first matching enabled rule wins, then the agent's own model, then the default. **New rule** opens the form. Double-click a row, or use its menu, to edit or delete.

| Field | Matches or sets |
|---|---|
| **Priority** | A number. A new rule starts 10 above the highest. |
| **Repository** | `owner/name` or `owner/*` |
| **Agent** | An agent name |
| **Card label** | A board card label |
| **Kind** | `code_smart`, `code_fast`, `planner_reviewer` or `images` |
| **Provider** | The provider to use |
| **Model** | The model. Empty uses the provider default. |
| **Enabled** | Turns the rule on or off |

A rule with no match fields reads "Always".

## Value tab

Pick a range of 7, 30 or 90 days. The panel estimates what the range's agent work would have cost a team, against what it cost.

| Tile | Shows |
|---|---|
| **By hand** | The human-equivalent value, with hours and people per month |
| **Factory cost** | Model use plus people |
| **Return** | Value divided by cost, with a conservative value below it |
| **Agent hours** | Hours agents worked, with engineer hours below |

Under the tiles, one line per role shows hours, multiplier, rate and value. A role without its own rate is marked "default rate". **Rates** opens [Settings](/keleustes/using/settings/) at the estimate rates. With no agent work in the range, the panel reads **No agent work yet**.

**Performance by agent** is a table.

| Column | Shows |
|---|---|
| **Agent** | The agent name |
| **Done** | Items finished. Hover for open items. |
| **Per day** | Throughput |
| **Success** | Success rate. Hover for the ok and failed counts. |
| **Cost/item** | Cost per item in dollars |
| **Cycle** | Median cycle time in minutes |
| **Tokens** | Tokens used |
| **Value** | Estimated value in dollars |

A figure that cannot be computed shows a dash.

## Usage tab

Pick 7, 30 or 90 days. Three figures lead the tab: **Tokens**, **Cost** (estimated) and **Hosts**.

| Section | Shows |
|---|---|
| **Provider**, **Model**, **Agent**, **Repository** | Token totals, top 10 each |
| **Tool calls** | Calls per tool, with the session count on hover |
| **GitHub calls · this hour** | Calls per caller: you, the poller or a workflow, with cached responses on hover |
| **Hosts · 7d** | Per node: usage percentage, tokens, cost and tokens by provider |
| **Recent** | The latest usage rows: **When**, **Source**, **Model**, **Agent**, **Repository**, **Tokens**, **Cost** |

## Errors

If the vault cannot be read, a red chip starting with "Vault:" shows the error above the tabs. The reload icon in the header reads the data again.
