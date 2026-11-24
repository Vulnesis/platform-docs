---
title: "Threat observation and research"
description: "Honeypot data, scanning infrastructure sightings, social media mentions, and active threat research feeds."
order: 7
sources: [vdb-site/website/content/sources/threat-observation.md]
checked: [vdb-site@9a1f96b]
updated: 24 Nov 2026
---
**The challenge:** Vulnerability scores tell you theoretical risk. They don't tell you whether someone is actively scanning for or exploiting a weakness right now. Traditional feeds miss the real-time signals that separate a scored vulnerability from an active threat.

**What you get:** Live exploitation signals from honeypots, global scanning infrastructure, and threat research communities: the difference between a score and a signal.

|   | Source | Description |
|---|---|---|
| <img src="/images/vdb-sources/shadowserver.png" width="24" height="24" alt=""> | Shadowserver | Shadowserver Foundation. Global honeypot network and internet scanning data. Real-time sightings of exploitation attempts and vulnerable hosts. |
| <img src="/images/vdb-sources/shodan.png" width="24" height="24" alt=""> | Shodan Sightings | Shodan internet-wide scanning data. Vulnerability sightings from exposed services and banners across the public internet. |
| <img src="/images/vdb-sources/greynoise.png" width="24" height="24" alt=""> | GreyNoise | GreyNoise internet background noise analysis. Distinguishes targeted exploitation from mass scanning to reduce false positives. |
| <img src="/images/vdb-sources/bluesky.png" width="24" height="24" alt=""> | Bluesky Mentions | Vulnerability mentions on the Bluesky social network. Early-warning signal from security researcher discussions and disclosure threads. |
| <img src="/images/vdb-sources/fediverse.png" width="24" height="24" alt=""> | Fediverse Mentions | Vulnerability discussions across Mastodon and the broader Fediverse. Community-driven intelligence from the decentralised security research community. |
| <img src="/images/vdb-sources/xcom.png" width="24" height="24" alt=""> | X.com Mentions | Vulnerability mentions on X (formerly Twitter). Security researcher discussions, vendor disclosures, and exploit announcements. |
| <img src="/images/vdb-sources/ncsc-nl-news.png" width="24" height="24" alt=""> | NCSC-NL Nieuwsberichten | Nationaal Cyber Security Centrum (Netherlands) news bulletins. Dutch-language cyber threat situational awareness reports. |
| <img src="/images/vdb-sources/references.png" width="24" height="24" alt=""> | References Enrichment | Automated reference URL crawling and classification. Enriches vulnerability records with categorised links to advisories, patches, and PoC code. |
| <img src="/images/vdb-sources/cta.png" width="24" height="24" alt=""> | Cyber Threat Alliance | Cyber Threat Alliance shared intelligence. Membership-based threat intelligence sharing between industry participants. |

See the [licensing appendix](/vdb-api/sources/licensing/) for redistribution terms applicable to each source.
