---
title: Waiting for you
nav: Waiting for you
description: The page you land on after signing in. Each role's three onboarding steps, how they are counted, and what the page shows once you are onboarded.
order: 1.6
sources: [vdb-site/api/internal/onboarding/catalogue.go, vdb-site/api/internal/onboarding/ledger.go, vdb-site/api/internal/handler/onboarding.go, vdb-site/api/internal/handler/onboarding_signals.go, vdb-site/docs/onboarding-api.md, website/src/pages/resolve/home.vue, website/src/shared/onboarding.ts]
checked: [vdb-site@afc01dc, website@c8b7d332]
updated: 24 Nov 2026
---

After you sign in, the Resolve Platform opens **Waiting for you** (`/resolve/home`). It replaces the Dashboard as the landing page, because the Dashboard reads every repository and scan before it can draw. The Dashboard is still under **Resolve › Reports › Dashboard**.

The page has two modes. While your organisation is setting up, it shows the onboarding steps for three roles. Once every role is done, it shows what needs a person and your top 10 risks.

## The three roles

Each role has three steps. Anyone in the organisation can do any step, and a step done by one person counts for everyone.

| Role | Step | Done when |
|---|---|---|
| Developers | Install the CLI, sign in and scan a repository | a scan report has arrived from the CLI |
| | Connect a source code forge | the GitHub App is installed, or a GitLab, Gitea, Forgejo or GitHub Enterprise Server connection is live |
| | Configure Package Firewall for one registry | Package Firewall has an ecosystem policy or a mirror |
| Security analysts | Connect an integration | any integration other than the Vulnetix CLI: a forge, messaging, Slack, Discord, Google Chat, AWS, Wiz, a registry login, a scan registry or a threat intelligence connector |
| | Create a sensor profile and bring a sensor online | a Sensor Provisioning profile exists and a runtime sensor has reported in at least once |
| | Set the Risk Prioritization strategy | your organisation has its own strategy, not the system default |
| Security management | Set the company domain and invite a member | the company domain is set on the account profile, and the organisation has two or more people |
| | Set a Quality Gate and adopt a Remediation Policy | the Quality Gate differs from its defaults, and a Remediation Policy is adopted or written |
| | Configure one protection | any change or logged activity in AI Firewall, Package Firewall or Sensor Provisioning |

Some actions finish steps for two roles. Configuring Package Firewall finishes the developer step and the management protection step. A sensor profile counts towards the analyst sensor step and the management protection step.

The role the page opens on is the first one with work left. To open on a role of your choosing, set **Home page role** under **Account menu › Preferences**. Each role card shows how many of its steps are done, and **Other roles** says what the others still have to do.

## How onboarding is counted

Vulnesis checks every step against the records that already hold the answer each time the page loads (at most once a minute per organisation), and keeps a ledger of when each step was first done.

- **Onboarded** means every step has been done at least once. It stays true: a step that later stops being true does not undo onboarding.
- **Regressed** (shown as "Open again") is a step that was done and is no longer true, for example a Package Firewall registry that was removed. It goes to the top of the page with a link to fix it.
- **Could not check** is a step whose check failed or timed out. It is never counted as not done, and it is checked again on the next visit.

## Once you are onboarded

The page shows, in this order:

1. Any onboarding step that regressed.
2. A notice when no scan report has arrived in the last 24 hours, with the time of the last one.
3. The top 10 open findings by your [Risk Prioritization](/vulnerability-management/prioritisation/risk-strategies/) strategy: the same list as **Resolve › Findings › What to fix first**, first page only. Choose **Reachable** or **Exploitable** to narrow it. A finding leaves the list when it is resolved.

The side panels summarise each role's onboarding, link to [Platform IaC](/platform-iac/) so a hand change is put back at the next apply, and link to the Dashboard.

## Software Factory and Guardian

The Software Factory and Guardian have their own Waiting for you pages, opened from the product switcher at the top of the sidebar.

| Product | Page | Setup steps | Once set up |
|---|---|---|---|
| Software Factory | `/resolve/factory-home` | a model provider key granted to the Keleustes Sandbox, one factory setting changed from its default, any agent activity | checkpoints waiting on a person, a notice after 3 days with no agent activity, and a prompt to add to the Library or create a template when they are empty |
| Guardian | `/resolve/guardian/home` | connect a log source, first events arrive | an erroring alert rule, a source silent for 6 hours, and how many alert rules, triggers, scheduled sends and workflows you run |

Without a Keleustes Sandbox (and below Pro), the Software Factory page explains the product and links to **Keleustes Sandboxes**, where one is bought. Without the Guardian add-on, the Guardian page shows its offer.

## API

The page reads `GET /api/site/v1/onboarding/resolve` (and `/factory`, `/guardian`), and saves the home page role with `PUT /api/site/v1/me/preferences`. Any member may read them. See the [HTTP API](/organization/reference/http-api/).
