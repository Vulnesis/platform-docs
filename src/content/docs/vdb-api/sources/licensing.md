---
title: "Licensing appendix"
nav: "Licensing"
description: "Redistribution terms for each intelligence source aggregated by the Vulnesis Vulnerability Database, grouped by licence type."
order: 20
sources: [vdb-site/website/content/licensing/_index.md]
checked: [vdb-site@9a1f96b]
updated: 24 Nov 2026
---
The Vulnesis Vulnerability Database aggregates data from 150+ upstream sources. Each record is served with its origin tagged, and the upstream source's licence terms apply to that record's content. This appendix groups sources by their redistribution terms.

Vulnesis does not assert a proprietary licence over community/open vulnerability data. Our model is pass-through: upstream content is served as-is, tagged with its source. Vulnesis-authored enrichment fields (proprietary analysis, malware linkage, safe harbour scoring) are clearly distinguished and covered by commercial terms only.

## Public domain and US government works

US government publications are not subject to copyright under 17 U.S.C. § 105. Redistribution is unrestricted.

- [NIST NVD](/vdb-api/sources/vulnerability-intelligence/)
- [NIST NVD Recent](/vdb-api/sources/vulnerability-intelligence/)
- [CISA KEV](/vdb-api/sources/vulnerability-intelligence/)
- [CISA ADP Vulnrichment](/vdb-api/sources/vulnerability-intelligence/)
- [CERT-US](/vdb-api/sources/government-cyber-defence/)

## CC-BY 4.0 and CC-BY-SA

Creative Commons Attribution licences. Redistribution permitted with attribution to the original source.

- [MITRE CVE](/vdb-api/sources/vulnerability-intelligence/) (CC0 for CVE IDs; CC-BY for descriptions)
- [GHSA](/vdb-api/sources/vulnerability-intelligence/)
- [GHSA (OSV)](/vdb-api/sources/vulnerability-intelligence/)
- [EUVD](/vdb-api/sources/vulnerability-intelligence/)
- [ENISA EU KEV](/vdb-api/sources/vulnerability-intelligence/)
- [Open Cloud Vulnerability DB](/vdb-api/sources/vulnerability-intelligence/) (CC-BY 4.0)
- [circl](/vdb-api/sources/vulnerability-intelligence/) (CC-BY 4.0)
- [CERT-UA](/vdb-api/sources/government-cyber-defence/) (CC-BY 4.0)
- [CERT-EU](/vdb-api/sources/government-cyber-defence/) (CC-BY 4.0)
- [ENISA CSIRT](/vdb-api/sources/government-cyber-defence/) (CC-BY 4.0)
- [ACSC Alert](/vdb-api/sources/government-cyber-defence/) (CC-BY 4.0, © Commonwealth of Australia)
- [deps.dev Packages](/vdb-api/sources/ecosystem-patch-intelligence/) (CC-BY 4.0)
- [Python PSF Advisory Database](/vdb-api/sources/ecosystem-patch-intelligence/) (CC-BY 4.0)
- [Go Advisory (OSV)](/vdb-api/sources/ecosystem-patch-intelligence/)
- [RustSec Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [PyPI Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Haskell Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [OCaml Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [RConsortium Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Global Security Database](/vdb-api/sources/ecosystem-patch-intelligence/)

## CC0 and open data

Public domain dedication or equivalent open data terms. No restrictions on redistribution.

- [OSS-Fuzz Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [OpenSSF Malicious Packages](/vdb-api/sources/supply-chain-protection/)
- [VulnCheck Community](/vdb-api/sources/vulnerability-intelligence/)

## CC-BY-NC-SA and non-commercial

Creative Commons Attribution-NonCommercial-ShareAlike. Redistribution permitted for non-commercial purposes only; derivatives must use the same licence.

- [VARIoT](/vdb-api/sources/vulnerability-intelligence/) (CC-BY-NC-SA-4.0, EU-funded IoT project; commercial redistribution prohibited)

## Apache 2.0, MIT and other open source licences

Standard open source licences. Redistribution permitted under licence terms.

- [SigmaHQ](/vdb-api/sources/exploit-intelligence/) (DRL / MIT)
- [ProjectDiscovery Nuclei](/vdb-api/sources/exploit-intelligence/) (MIT)
- [Rapid7 Metasploit Framework](/vdb-api/sources/exploit-intelligence/) (BSD)
- [Emerging Threats ET Open](/vdb-api/sources/exploit-intelligence/) (BSD for SIDs 2000000–2099999; GPL for SIDs 2100000–2103999)
- [Chainguard Security Data](/vdb-api/sources/supply-chain-protection/)
- [Wolfi Security Data](/vdb-api/sources/supply-chain-protection/)
- [in-toto](/vdb-api/sources/supply-chain-protection/) (Apache 2.0)
- [Docker Hardened Images](/vdb-api/sources/supply-chain-protection/) (Apache 2.0)
- [Gemnasium Advisory (GitLab)](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Google Open Source Intelligence](/vdb-api/sources/vulnerability-intelligence/) (Apache 2.0, the osv.dev platform)
- [Bitnami Advisory](/vdb-api/sources/ecosystem-patch-intelligence/) (Apache 2.0)
- [Zero Science Lab](/vdb-api/sources/exploit-intelligence/) (GPLv3)
- [OpenSSF Scorecard](/vdb-api/sources/ecosystem-patch-intelligence/) (CDLA Permissive 2.0)

## Vendor terms: redistribution generally permitted

Vendor-published advisories where redistribution is permitted or implied through public RSS/CSAF feeds. Attribution required.

- [Red Hat Security Errata](/vdb-api/sources/vendor-product-security/)
- [Cisco CVRF](/vdb-api/sources/vendor-product-security/)
- [ABB CSAF](/vdb-api/sources/vendor-product-security/)
- [SUSE CSAF](/vdb-api/sources/vendor-product-security/)
- [Open-Xchange CSAF](/vdb-api/sources/vendor-product-security/)
- [Schneider Electric (SEVD-)](/vdb-api/sources/vendor-product-security/)
- [Microsoft MSRC](/vdb-api/sources/vendor-product-security/)
- [Chromium Security](/vdb-api/sources/vendor-product-security/)
- [Mozilla Security](/vdb-api/sources/vendor-product-security/)
- [Tailscale Security Bulletin](/vdb-api/sources/vendor-product-security/)
- [ISC Advisory](/vdb-api/sources/vendor-product-security/)
- [Binarly Advisory](/vdb-api/sources/vendor-product-security/)
- [CERT BUND CSAF](/vdb-api/sources/government-cyber-defence/)
- [CERT-CC](/vdb-api/sources/government-cyber-defence/): Carnegie Mellon; non-commercial redistribution free; commercial use requires permission
- [CERT-FR](/vdb-api/sources/government-cyber-defence/)
- [CERT-AT](/vdb-api/sources/government-cyber-defence/)
- [CERT-LV](/vdb-api/sources/government-cyber-defence/)
- [CERT-CA](/vdb-api/sources/government-cyber-defence/) (Open Government Licence, Canada)
- [NCSC-FI](/vdb-api/sources/government-cyber-defence/)
- [Canonical/Ubuntu Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Debian Security Advisories](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Alpine SecDB](/vdb-api/sources/ecosystem-patch-intelligence/)
- [AlmaLinux Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [RockyLinux Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Oracle Linux](/vdb-api/sources/ecosystem-patch-intelligence/)
- [AWS Amazon Linux 1 (EOL)](/vdb-api/sources/ecosystem-patch-intelligence/)
- [AWS Amazon Linux 2](/vdb-api/sources/ecosystem-patch-intelligence/)
- [AWS Amazon Linux 2023](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Azure Linux (3.0)](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Photon Security Advisories](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Arch Linux Issue Tracker](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Gentoo Bugzilla Security](/vdb-api/sources/ecosystem-patch-intelligence/)

## Vendor terms: redistribution restrictions apply

Sources with explicit redistribution limitations. Data may be available for informational use but redistribution requires review.

- [NCSC-NL CSAF](/vdb-api/sources/government-cyber-defence/): "No rights derivable (informational use)"
- [NCSC-NL Nieuwsberichten](/vdb-api/sources/threat-observation/): "No rights derivable" applies to news articles as well
- [CERT-JP Advisory](/vdb-api/sources/government-cyber-defence/): Notification required for redistribution
- [CERT-BE](/vdb-api/sources/government-cyber-defence/): Redistribution of copyrighted material requires prior written permission from Centre for Cybersecurity Belgium
- [CNVD Advisory (China)](/vdb-api/sources/vulnerability-intelligence/): Proprietary; bulk export prohibited
- [FSTEC BDU (Russia)](/vdb-api/sources/vulnerability-intelligence/): Government restricted
- [Siemens CSAF](/vdb-api/sources/vendor-product-security/): Subject to Siemens website terms; explicit commercial redistribution not permitted without authorisation
- [SAP NetWeaver](/vdb-api/sources/vendor-product-security/): Customer-only access terms
- [D-Link Firmware](/vdb-api/sources/vendor-product-security/): Vendor terms apply
- [OpenBSD](/vdb-api/sources/vendor-product-security/): BSD licence; advisory text terms vary
- [ExploitDB](/vdb-api/sources/exploit-intelligence/): OffSec; website terms explicitly prohibit reproducing, duplicating, or reselling any portion without written permission
- [AttackerKB](/vdb-api/sources/exploit-intelligence/): Rapid7 proprietary; redistribution rights reserved by Rapid7
- [HackerOne Hacktivity](/vdb-api/sources/exploit-intelligence/): Authenticated API subject to HackerOne ToS (non-sublicensable, non-transferable); see also Implicit / No Stated Licence for the unauthenticated public GraphQL data we use
- [Shadowserver](/vdb-api/sources/threat-observation/): Data redistribution and resale prohibited per Shadowserver terms

## Commercial or membership required

Sources requiring paid subscription, membership, or commercial licence agreement. Data availability may vary by tier.

- [VulnCheck NVD++](/vdb-api/sources/vulnerability-intelligence/)
- [VulnCheck KEV](/vdb-api/sources/vulnerability-intelligence/)
- [VulnCheck XDB](/vdb-api/sources/vulnerability-intelligence/)
- [Snyk](/vdb-api/sources/vulnerability-intelligence/)
- [Veracode SourceClear](/vdb-api/sources/vulnerability-intelligence/)
- [Wiz Vulnerability Database](/vdb-api/sources/vulnerability-intelligence/)
- [Shodan Sightings](/vdb-api/sources/threat-observation/)
- [GreyNoise](/vdb-api/sources/threat-observation/)
- [Vulners](/vdb-api/sources/exploit-intelligence/)
- [0day.today](/vdb-api/sources/exploit-intelligence/)
- [Cyber Threat Alliance](/vdb-api/sources/threat-observation/): Membership-based; restricted to members
- [Spamhaus](/vdb-api/sources/supply-chain-protection/)
- [CrowdSec](/vdb-api/sources/supply-chain-protection/)
- [Tenable Security Advisories](/vdb-api/sources/vendor-product-security/)
- [WPScan](/vdb-api/sources/exploit-intelligence/): Vulnerability database; non-commercial API free (25 req/day); commercial use requires paid licence
- [AusCERT](/vdb-api/sources/government-cyber-defence/): Membership-based; advisory access restricted to members

## Third-party scores, attributed

Publicly available scoring systems surfaced with attribution. Redistribution confirmation pending from respective owners.

- [Coalition ESS](/vdb-api/sources/vulnerability-intelligence/): Exploit Scoring System by Coalition Inc. Redistribution confirmation pending.
- EPSS, Exploit Prediction Scoring System by FIRST.org. Redistribution confirmation pending.

## Implicit or no stated licence

Sources published via RSS feeds or public web pages without explicit redistribution terms. Our position is that publishing an advisory feed constitutes an implicit licence to consume and aggregate for the purpose it was published.

- [SICK PSIRT Advisory](/vdb-api/sources/vendor-product-security/)
- [Nozomi Networks PSIRT](/vdb-api/sources/vendor-product-security/)
- [Defiant Wordfence](/vdb-api/sources/vendor-product-security/)
- [Patchstack](/vdb-api/sources/vendor-product-security/)
- [Source Incite](/vdb-api/sources/vendor-product-security/)
- [WLB](/vdb-api/sources/vendor-product-security/)
- [Wiz Cloud Advisories](/vdb-api/sources/vendor-product-security/)
- [CXSecurity Exploit](/vdb-api/sources/exploit-intelligence/)
- [Packet Storm Security](/vdb-api/sources/exploit-intelligence/)
- [Vulnerability Lab](/vdb-api/sources/exploit-intelligence/)
- [Knownsec Seebug](/vdb-api/sources/exploit-intelligence/)
- [Bugcrowd CrowdStream](/vdb-api/sources/exploit-intelligence/): IP assigned to Bugcrowd by researchers per Standard Disclosure Terms (irrevocable, exclusive, sublicensable); CrowdStream is an opt-in public activity feed served via unauthenticated JSON endpoint; disclosed reports are published with programme owner consent under Coordinated Disclosure policy; robots.txt unrestricted; no explicit API redistribution licence stated
- [HackerOne Hacktivity (public disclosures)](/vdb-api/sources/exploit-intelligence/): IP owned by the reporter (Finder) per HackerOne Finder Terms; publicly disclosed via unauthenticated GraphQL endpoint with no stated redistribution licence; robots.txt unrestricted
- [Google Project Zero](/vdb-api/sources/exploit-intelligence/)
- [ProtectAI Huntr](/vdb-api/sources/exploit-intelligence/)
- [Trend Micro Zero Day Initiative](/vdb-api/sources/exploit-intelligence/)
- [GitHub PoC Repos/Gists](/vdb-api/sources/exploit-intelligence/)
- [Bluesky Mentions](/vdb-api/sources/threat-observation/): public AT Protocol firehose; commercial aggregation may require Bluesky PBC agreement
- [Fediverse Mentions](/vdb-api/sources/threat-observation/): ActivityPub protocol permits federation; redistribution terms vary by instance
- [X.com Mentions](/vdb-api/sources/threat-observation/)
- [References Enrichment](/vdb-api/sources/threat-observation/)
- [Anchore ADP](/vdb-api/sources/vulnerability-intelligence/)
- [CleanStart Advisory](/vdb-api/sources/supply-chain-protection/)
- [opensourcemalware.com](/vdb-api/sources/supply-chain-protection/)
- [Drupal Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [Mageia Advisory](/vdb-api/sources/ecosystem-patch-intelligence/)
- [End-of-Life](/vdb-api/sources/ecosystem-patch-intelligence/)
- [bpkg](/vdb-api/sources/ecosystem-patch-intelligence/)
- [SANS ISC](/vdb-api/sources/government-cyber-defence/)
- [TALOS](/vdb-api/sources/government-cyber-defence/)
- [CERT-SE](/vdb-api/sources/government-cyber-defence/)
- [CSIRT-ITA](/vdb-api/sources/government-cyber-defence/)
- [CERT-PT](/vdb-api/sources/government-cyber-defence/)
- [CERT-IL](/vdb-api/sources/government-cyber-defence/)
- [CERT-TW](/vdb-api/sources/government-cyber-defence/)
- [Android Security Bulletins](/vdb-api/sources/ecosystem-patch-intelligence/): Google/AOSP content licence; bulletin text terms not explicitly stated
- [Linux Kernel CVE](/vdb-api/sources/ecosystem-patch-intelligence/): Linux CNA; no explicit data redistribution licence stated

<p><em>OSV ecosystem package-level advisories (npm, Maven, NuGet, crates.io, Hex, Packagist, Pub, RubyGems, SwiftURL, R CRAN/Bioconductor, curl, git, GitHub Actions, and others) follow the terms of their upstream advisory database, typically GHSA (CC-BY 4.0) or Google OSV (Apache 2.0).</em></p>

*This appendix reflects our current understanding of upstream licence terms as of April 2026. Source licences may change. For the latest terms, refer to each source directly. Sources with redistribution restrictions are being reviewed by legal counsel.*
