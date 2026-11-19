---
title: Probe settings
description: The environment variables the pipeline stack sets on the vulnetix-security-reporter function, with defaults and ranges, and the summary lines it logs.
order: 51
nav: Probe settings
sources: [cloudscan/README.md, cloudscan/settings.go, vdb-site/api/internal/handler/assets/aws-pipeline.yaml]
checked: [cloudscan@67eeabb, vdb-site@1a06d67]
updated: 02 Nov 2026
---

The pipeline stack sets these on `vulnetix-security-reporter`. Vulnesis fills them from your choices in the Resolve Platform; editing them on the function by hand is overwritten by the next stack deploy. A numeric value outside its range, or not a number, is ignored and the default used.

| Variable | Default | Range | Meaning |
|---|---|---|---|
| `VULNESIS_TRAIL_NAME` | `vulnetix-management-events` | | The trail whose status proves logs are flowing |
| `VULNESIS_LOG_BUCKET` | required | | The bucket the trail writes to |
| `VULNESIS_ACCOUNT_ID` | required | | Scopes the CloudTrail S3 prefix |
| `VULNESIS_SECRET_NAME` | `vulnetix/vdb-credentials` | | The API key pair the probe reports with |
| `VULNESIS_ORG_ID` | optional | | When set, the secret must match it |
| `VULNESIS_ENDPOINT` | `https://api.vdb.vulnes.is` | | The VDB API: CRIT lookups and finding ingest |
| `VULNESIS_SITE_ENDPOINT` | `https://www.vulnes.is/api/site` | | The site API: the Wiz work list and verdicts. Must differ from `VULNESIS_ENDPOINT`. |
| `VULNESIS_STATE_PREFIX` | `vulnetix/state/` | | Where sweep state is kept in the bucket |
| `VULNESIS_SWEEP_LANES` | `4` | 1 to 16 | Continuation chains a sweep may run at once |
| `VULNESIS_SWEEP_EMIT` | `false` | | Gates reporting separately from analysis. Scheduled sweeps turn it on per invocation. |
| `VULNESIS_SWEEP_MAX_SECONDS` | `3600` | 300 to 86400 | Bound on a whole sweep |
| `VULNESIS_SWEEP_RESERVE_SECONDS` | `45` | 10 to 240 | Time held back per invocation to checkpoint and continue |
| `VULNESIS_CRIT_TTL_ACTIVE_HOURS` | `24` | 1 to 720 | CRIT answer lifetime for a resource type that produced a finding last sweep |
| `VULNESIS_CRIT_TTL_IDLE_HOURS` | `168` | 1 to 2160 | CRIT answer lifetime for a type that did not |
| `VULNESIS_CHUNK_TARGET_BYTES` | `6500000` | 262144 to 7800000 | Size at which a report chunk is closed |
| `VULNESIS_BACKFILL_DAYS` | `30` | 0 to 90 | CloudTrail history read to seed the attribution ledger |
| `VULNESIS_SSM_INVENTORY` | `false` | | Per-instance package inventory |
| `VULNESIS_WIZ_ENABLED` | `false` | | The Wiz verification pass |
| `VULNESIS_NATIVE_SOURCES` | empty | | The native sources turned on; empty reads none |
| `VULNESIS_WAF_ENABLED` | `false` | | The WAF pass |
| `VULNESIS_COMPUTE_ENABLED` | `false` | | The compute pass |
| `VULNESIS_COMPUTE_ARTIFACTS` | `false` | | Read inside images and Lambda code |
| `VULNESIS_EKS_POD_INVENTORY` | `false` | | List EKS pods |
| `VULNESIS_NETWORK_LOGS` | `false` | | Match Resolver and flow logs against indicators |

## Log lines

The function logs to `/aws/lambda/vulnetix-security-reporter` (14-day retention). Each run ends with a summary line: `access ok` when no check failed, `access degraded` otherwise. The connection's **Verify** reads these.

| Check | Call | Passes when |
|---|---|---|
| CloudTrail delivering | `cloudtrail:GetTrailStatus` | `IsLogging` is true |
| Log objects readable | `s3:ListObjectsV2`, then `s3:GetObject` under `AWSLogs/<your-account-id>/CloudTrail/` | The object comes back gzip-encoded |
| Security Hub readable | `securityhub:GetFindings`, one result | Not denied |
| Credentials present | `secretsmanager:GetSecretValue` on `vulnetix/vdb-credentials` | It parses as `{orgId, secret}` and matches the connected organisation |

A `warn` is not a failure: CloudTrail takes up to 15 minutes to write its first object, and listing an empty prefix already proves the read path works.
