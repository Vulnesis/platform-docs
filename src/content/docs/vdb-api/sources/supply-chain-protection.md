---
title: "Supply chain and malware detection"
description: "Malicious package identification, typosquatting detection, and supply chain threat intelligence feeds."
order: 5
sources: [vdb-site/website/content/sources/supply-chain-protection.md]
checked: [vdb-site@9a1f96b]
updated: 24 Nov 2026
---
**The challenge:** Malicious packages appear in registries faster than manual review can catch, and traditional vulnerability scanners don't look for them. Typosquatting, dependency confusion, and backdoored packages require a fundamentally different detection approach.

**What you get:** Automated detection of typosquatting, dependency confusion, backdoored packages, and known-malicious code across every major registry. Package-level intelligence that augments your existing SCA tooling.

|   | Source | Prefix | Description |
|---|---|---|---|
| <img src="/images/vdb-sources/openssf-malicious.png" width="24" height="24" alt=""> | OpenSSF Malicious Packages | `MAL-` | Open Source Security Foundation. Curated database of confirmed malicious packages across npm, PyPI, and other registries. |
| <img src="/images/vdb-sources/openssf-malicious-osv.png" width="24" height="24" alt=""> | OpenSSF Malicious Packages (OSV) | `MAL-` | OpenSSF malicious package data surfaced through the OSV schema for ecosystem-level correlation. |
| <img src="/images/vdb-sources/crowdsec.png" width="24" height="24" alt=""> | CrowdSec |  | Community-driven IP reputation and threat intelligence. Crowdsourced attacker behaviour data and blocklists. |
| <img src="/images/vdb-sources/osm.png" width="24" height="24" alt=""> | opensourcemalware.com | `OSM-` | Open source malware intelligence database. Catalogued malicious packages with analysis and indicators. |
| <img src="/images/vdb-sources/chainguard.png" width="24" height="24" alt=""> | Chainguard Security Data |  | Chainguard distroless container security data. Minimal container image vulnerability intelligence and SBOM data. |
| <img src="/images/vdb-sources/wolfi.png" width="24" height="24" alt=""> | Wolfi Security Data |  | Wolfi OS security advisories. Undistro Linux security data for container-native workloads. |
|  | Docker Hardened Images |  | Docker's open-sourced hardened container image catalogue. SBOM and VEX data for 1,000+ distroless images; automated CVE rebuilds within 7 days for critical issues. Apache 2.0. |
| <img src="/images/vdb-sources/in-toto.png" width="24" height="24" alt=""> | in-toto |  | in-toto supply chain integrity framework. Attestation and verification data for software supply chain security. |
| <img src="/images/vdb-sources/spamhaus.png" width="24" height="24" alt=""> | Spamhaus |  | Spamhaus threat intelligence. IP and domain reputation data for identifying malicious infrastructure. |
| <img src="/images/vdb-sources/cleanstart.png" width="24" height="24" alt=""> | CleanStart Advisory |  | CleanStart vulnerability advisories for supply chain and dependency security analysis. |

See the [licensing appendix](/vdb-api/sources/licensing/) for redistribution terms applicable to each source.
