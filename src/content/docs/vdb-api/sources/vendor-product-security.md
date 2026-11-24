---
title: "Vendor and product security"
description: "Security advisories from software and hardware vendors, PSIRTs, and industry security bulletins."
order: 4
sources: [vdb-site/website/content/sources/vendor-product-security.md]
checked: [vdb-site@9a1f96b]
updated: 24 Nov 2026
---
**The challenge:** Every vendor publishes security advisories differently: Siemens uses CSAF, Cisco uses CVRF, Microsoft uses their own schema, and most vendors publish free-text pages. Tracking them all means monitoring dozens of feeds with no unified format.

**What you get:** Consolidated vendor intelligence with structured affected-product data, linked to CVE records and patch availability. Query once, get the vendor's advisory and the vulnerability context together.

|   | Source | Prefix | Description |
|---|---|---|---|
| <img src="/images/vdb-sources/abb.png" width="24" height="24" alt=""> | ABB CSAF |  | ABB industrial automation PSIRT. CSAF-formatted advisories for SCADA, DCS, and industrial control systems. |
| <img src="/images/vdb-sources/sick-psirt.png" width="24" height="24" alt=""> | SICK PSIRT Advisory |  | SICK AG Product Security Incident Response Team. Sensor and industrial device security advisories. |
| <img src="/images/vdb-sources/nozomi.png" width="24" height="24" alt=""> | Nozomi Networks PSIRT |  | Nozomi Networks product security advisories for OT/IoT monitoring infrastructure. |
| <img src="/images/vdb-sources/cisco.png" width="24" height="24" alt=""> | Cisco CVRF |  | Cisco Systems security advisories in CVRF format. Network infrastructure, collaboration, and security products. |
| <img src="/images/vdb-sources/siemens.png" width="24" height="24" alt=""> | Siemens CSAF |  | Siemens ProductCERT. CSAF-formatted advisories for industrial automation and healthcare technology. |
| <img src="/images/vdb-sources/isc-advisory.png" width="24" height="24" alt=""> | ISC Advisory |  | Internet Systems Consortium. Security advisories for BIND, ISC DHCP, and Kea DHCP. |
| <img src="/images/vdb-sources/open-xchange.png" width="24" height="24" alt=""> | Open-Xchange CSAF |  | Open-Xchange security advisories for OX App Suite and related collaboration products. |
| <img src="/images/vdb-sources/redhat.png" width="24" height="24" alt=""> | Red Hat Security Errata | `RHSA-` | Red Hat security errata and advisories. RHEL, OpenShift, Ansible, and Red Hat product ecosystem. |
| <img src="/images/vdb-sources/tailscale.png" width="24" height="24" alt=""> | Tailscale Security Bulletin |  | Tailscale security bulletins for VPN and networking product vulnerabilities. |
| <img src="/images/vdb-sources/binarly.png" width="24" height="24" alt=""> | Binarly Advisory | `BRLY-` | Binarly firmware security advisories. UEFI, BIOS, and firmware vulnerability research. |
| <img src="/images/vdb-sources/schneider.png" width="24" height="24" alt=""> | Schneider Electric | `SEVD-` | Schneider Electric Vulnerability Database. Industrial automation and energy management advisories. |
| <img src="/images/vdb-sources/sap.png" width="24" height="24" alt=""> | SAP NetWeaver |  | SAP security advisories and patch notes for NetWeaver and enterprise application stack. |
| <img src="/images/vdb-sources/microsoft-msrc.png" width="24" height="24" alt=""> | Microsoft MSRC | `MSRC-` | Microsoft Security Response Center. Windows, Azure, Office, and Microsoft product security updates. |
| <img src="/images/vdb-sources/tenable.png" width="24" height="24" alt=""> | Tenable Security Advisories |  | Tenable product security advisories for Nessus, Tenable.io, and related scanning infrastructure. |
| <img src="/images/vdb-sources/dlink.png" width="24" height="24" alt=""> | D-Link Firmware |  | D-Link firmware security advisories for routers, switches, and network devices. |
| <img src="/images/vdb-sources/suse.png" width="24" height="24" alt=""> | SUSE CSAF |  | SUSE product security advisories in CSAF format. SLES, openSUSE, and Rancher ecosystem. |
| <img src="/images/vdb-sources/wordfence.png" width="24" height="24" alt=""> | Defiant Wordfence | `WORDFENCE-` | Wordfence WordPress vulnerability intelligence. Plugin, theme, and core vulnerability advisories. |
| <img src="/images/vdb-sources/ghsa.png" width="24" height="24" alt=""> | Chromium Security | `CHROMIUM-` | Chromium project security advisories. Chrome, Edge, and Chromium-based browser vulnerabilities. |
| <img src="/images/vdb-sources/mozilla.png" width="24" height="24" alt=""> | Mozilla Security | `MOZILLA-` | Mozilla Foundation security advisories. Firefox, Thunderbird, and NSS library vulnerabilities. |
| <img src="/images/vdb-sources/patchstack.png" width="24" height="24" alt=""> | Patchstack | `PATCHSTACK-` | Patchstack WordPress security intelligence. Comprehensive WordPress ecosystem vulnerability database. |
| <img src="/images/vdb-sources/source-incite.png" width="24" height="24" alt=""> | Source Incite | `SRC-` | Source Incite security research and vulnerability disclosures. |
| <img src="/images/vdb-sources/wlb.png" width="24" height="24" alt=""> | WLB |  | WLB security advisory feed. Cross-vendor vulnerability intelligence aggregation. |
| <img src="/images/vdb-sources/openbsd.png" width="24" height="24" alt=""> | OpenBSD |  | OpenBSD security advisories and errata patches for the OpenBSD operating system. |
| <img src="/images/vdb-sources/wiz-cloud.png" width="24" height="24" alt=""> | Wiz Cloud Advisories |  | Wiz cloud security advisories database. Cloud service provider vulnerability intelligence. |

See the [licensing appendix](/vdb-api/sources/licensing/) for redistribution terms applicable to each source.
