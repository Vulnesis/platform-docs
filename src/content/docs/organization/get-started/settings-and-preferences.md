---
title: Navigation, settings and preferences
nav: Settings and preferences
description: The product switcher, each product's menu and settings, the account menu with Preferences and Admin, and where each old menu entry went.
order: 1.7
sources: [website/src/shared/console-nav.ts, website/src/shared/products.ts, website/src/layouts/components/AppSidebar.vue, website/src/layouts/components/AppAccountMenu.vue, website/src/pages/resolve/settings.vue, website/src/pages/resolve/preferences.vue]
checked: [website@c8b7d332]
updated: 24 Nov 2026
---

The sidebar shows one product's menu at a time. A switcher at the top of the sidebar picks the product, and organisation and personal pages are in the account menu at the top right. No page moved or changed address; only where its link lives changed.

## The product switcher

| Product | What its menu holds | Home |
|---|---|---|
| Community | the free public pages: Lookup, Exploit Database, KEV Watch, Bug Bounty, TEA Explorer and the Registry | Lookup |
| Resolve | Findings, Inventory, Threat Intel and Reports | [Waiting for you](/organization/get-started/waiting-for-you/) |
| Software Factory | Cockpit, Checkpoints, Board and Event stream, then Work, Knowledge and Delivery | Waiting for you (`/resolve/factory-home`) |
| Guardian | Search, Alert rules, Triggers, Scheduled sends and Workflows | Waiting for you (`/resolve/guardian/home`) |

A product your organisation has not bought opens a page that explains it and links to where it is bought. A page that is in two menus, such as Lookup, keeps the menu you were last in. On a phone, the menu button opens the same sidebar as a drawer.

## Each product's settings

The last link in a product's menu is its settings.

| Settings | Pages |
|---|---|
| Resolve settings (`/resolve/settings`) | Policies: Quality Gate, Remediation Policy, Risk Prioritization, SSVC Decisions, Suppression Policies, Release Jails. Protection: Package Firewall, Malware Curation, AI Firewall, Sensor Provisioning, API Specs. Connections: Integrations, Messaging, Private Registries, Secrets Vault. Then logs and quota, and the subscription. |
| Software Factory settings (`/resolve/factory-settings`) | Factory settings, Keleustes Sandboxes, Budgets and usage, Trust and provenance, Audit ledger, Secrets Vault |
| Guardian settings (`/resolve/guardian/settings`) | Sources and ingest tokens, today's ingest against the pack, the audit log, the subscription |

Every settings page links to the subscription on **Billing and quota**. Only an owner changes it; anyone else is told so.

## The account menu

| Entry | Who sees it | What it opens |
|---|---|---|
| Your name, plan and today's API usage | everyone signed in | |
| Profile, Members, Billing and quota, Logs | everyone signed in | the organisation's pages |
| Preferences (`/resolve/preferences`) | everyone signed in | your theme, which role [Waiting for you](/organization/get-started/waiting-for-you/) opens on, and links to your notifications, API keys and sign-in |
| Light and Dark | everyone signed in | the theme for Resolve Platform pages in this browser |
| Admin | Vulnesis administrators only | the Admin menu, which replaces the sidebar until **Back to Resolve** |
| Sign out | everyone signed in | |

On a phone the account menu opens as a sheet from the bottom of the screen.

## Where each old menu entry went

| Old menu | Now |
|---|---|
| Overview › Dashboard, Tech Stack Graph, Contributors, Threat Model, Scanner results, Lookup, Exploit Database | Resolve › Reports › Dashboard; Resolve › Inventory › Tech Stack Graph and Contributors; Resolve › Threat Intel › Threat Model, Lookup and Exploit Database; Resolve › Findings › Scanner results |
| Inventory, Findings, Reports | the same groups, under Resolve |
| Threat Intel › Guardian | the Guardian product |
| Threat Intel (the other pages) | Resolve › Threat Intel |
| Software Factory › Cockpit, Event stream, Board, Checkpoints | Software Factory (the top of its menu) |
| Software Factory › Workflows, Templates, Runs and sessions, Repositories, Workforce | Software Factory › Work |
| Software Factory › Agent memory, Configuration › Library | Software Factory › Knowledge |
| Software Factory › Settings, Budgets and usage, Trust and provenance, Audit ledger; Configuration › Keleustes Sandboxes | Software Factory settings |
| Configuration (every other page) | Resolve settings |
| Account › Profile, Members, Logs, Billing & quota | the account menu |
| Admin | the account menu › Admin |
