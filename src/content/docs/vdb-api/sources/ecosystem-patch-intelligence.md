---
title: "Ecosystem and patch intelligence"
description: "OS distributions, language ecosystem advisories, and package-level fix tracking across 30+ ecosystems."
order: 8
sources: [vdb-site/website/content/sources/ecosystem-patch-intelligence.md]
checked: [vdb-site@9a1f96b]
updated: 24 Nov 2026
---
**The challenge:** Every OS, distribution, and language ecosystem publishes patches on different timelines with different identifiers. Tracking fix availability across your dependency tree means checking dozens of advisory feeds manually.

**What you get:** Patch availability across 30+ distributions and ecosystems, with version-specific fix tracking that maps directly to your dependency tree. Know exactly which version fixes what, everywhere you deploy.

## Distribution security advisories

|   | Source | Description |
|---|---|---|
| <img src="/images/vdb-sources/almalinux.png" width="24" height="24" alt=""> | AlmaLinux Advisory (direct) | AlmaLinux OS security advisories. RHEL-compatible enterprise Linux distribution patch intelligence. |
| <img src="/images/vdb-sources/almalinux-osv.png" width="24" height="24" alt=""> | AlmaLinux Advisory (OSV) | AlmaLinux advisories surfaced through the OSV schema. |
| <img src="/images/vdb-sources/rockylinux-osv.png" width="24" height="24" alt=""> | RockyLinux Advisory (OSV) | Rocky Linux security advisories. RHEL-compatible distribution patch data via OSV. |
| <img src="/images/vdb-sources/ubuntu.png" width="24" height="24" alt=""> | Canonical/Ubuntu Advisory (direct) | Ubuntu Security Notices (USN). Canonical's security advisories for Ubuntu LTS and interim releases. |
| <img src="/images/vdb-sources/ubuntu-osv.png" width="24" height="24" alt=""> | Canonical/Ubuntu Advisory (OSV) | Ubuntu advisories surfaced through the OSV schema with package-level granularity. |
| <img src="/images/vdb-sources/debian-osv.png" width="24" height="24" alt=""> | Debian Security Advisories (OSV) | Debian Security Advisories (DSA). Stable release vulnerability fixes and backported patches. |
| <img src="/images/vdb-sources/alpine-secdb.png" width="24" height="24" alt=""> | Alpine SecDB (OSV) | Alpine Linux security database. Minimal container-oriented distribution patch tracking. |
| <img src="/images/vdb-sources/alpine-osv.png" width="24" height="24" alt=""> | Alpine (OSV) | Alpine Linux package advisories via OSV with version-specific fix availability. |
| <img src="/images/vdb-sources/chainguard.png" width="24" height="24" alt=""> | Chainguard SecDB | Chainguard Images security database (packages.cgr.dev). APK secdb feed for the Chainguard distroless container catalog with per-package fix-version tracking. |
| <img src="/images/vdb-sources/wolfi.png" width="24" height="24" alt=""> | Wolfi SecDB | Wolfi OS security database (packages.wolfi.dev). APK secdb feed for the Wolfi container-native undistro with per-package fix-version tracking. |
| <img src="/images/vdb-sources/aws-al1.png" width="24" height="24" alt=""> | AWS Amazon Linux 1 (EOL) | Amazon Linux 1 security advisories. End-of-life distribution with historical patch data. |
| <img src="/images/vdb-sources/aws-al2.png" width="24" height="24" alt=""> | AWS Amazon Linux 2 | Amazon Linux 2 security advisories. AWS-optimised distribution patch intelligence. |
| <img src="/images/vdb-sources/aws-al2023.png" width="24" height="24" alt=""> | AWS Amazon Linux 2023 | Amazon Linux 2023 security advisories. Latest AWS distribution with deterministic updates. |
| <img src="/images/vdb-sources/azure-linux.png" width="24" height="24" alt=""> | Azure Linux (3.0) | Microsoft Azure Linux (formerly CBL-Mariner). Azure-optimised container host OS security data. |
| <img src="/images/vdb-sources/oracle-linux.png" width="24" height="24" alt=""> | Oracle Linux | Oracle Linux Security Advisories (ELSA). RHEL-compatible enterprise distribution patch data. |
| <img src="/images/vdb-sources/photon.png" width="24" height="24" alt=""> | Photon Security Advisories | VMware Photon OS security advisories. Container-optimised Linux distribution patch tracking. |
| <img src="/images/vdb-sources/archlinux.png" width="24" height="24" alt=""> | Arch Linux Issue Tracker | Arch Linux security tracker. Rolling-release distribution vulnerability and fix tracking. |
| <img src="/images/vdb-sources/gentoo.png" width="24" height="24" alt=""> | Gentoo Bugzilla Security | Gentoo Linux Security Advisories (GLSA). Source-based distribution vulnerability tracking. |
| <img src="/images/vdb-sources/mageia.png" width="24" height="24" alt=""> | Mageia Advisory | Mageia Linux security advisories. Community distribution patch intelligence. |
| <img src="/images/vdb-sources/android-osv.png" width="24" height="24" alt=""> | Android (OSV) | Android Security Bulletins. Monthly security patch level data for the Android ecosystem. |
| <img src="/images/vdb-sources/linux-kernel-osv.png" width="24" height="24" alt=""> | Linux Kernel (OSV) | Linux kernel security advisories. Kernel vulnerability data with affected version ranges. |

## Language and package ecosystem advisories

|   | Source | Description |
|---|---|---|
| <img src="/images/vdb-sources/bitnami.png" width="24" height="24" alt=""> | Bitnami Advisory (direct) | Bitnami (VMWare/Broadcom) application stack security advisories. Pre-packaged application vulnerability data. |
| <img src="/images/vdb-sources/bitnami-osv.png" width="24" height="24" alt=""> | Bitnami Advisory (OSV) | Bitnami advisories surfaced through the OSV schema. |
| <img src="/images/vdb-sources/drupal.png" width="24" height="24" alt=""> | Drupal Advisory (direct) | Drupal security advisories. CMS core, contributed modules, and theme vulnerability tracking. |
| <img src="/images/vdb-sources/drupal-osv.png" width="24" height="24" alt=""> | Drupal Advisory (OSV) | Drupal advisories surfaced through the OSV schema. |
| <img src="/images/vdb-sources/pypi.png" width="24" height="24" alt=""> | PyPI Advisory (direct) | Python Package Index security advisories. Python ecosystem vulnerability data. |
| <img src="/images/vdb-sources/pypi-osv.png" width="24" height="24" alt=""> | PyPI Advisory (OSV) | PyPI advisories surfaced through the OSV schema. |
| <img src="/images/vdb-sources/python-psf-osv.png" width="24" height="24" alt=""> | Python PSF Database (OSV) | Python Software Foundation Advisory Database. CPython interpreter and standard library security. |
| <img src="/images/vdb-sources/rustsec.png" width="24" height="24" alt=""> | RustSec Advisory (direct) | RustSec Advisory Database. Rust crate vulnerability data with cargo audit integration. |
| <img src="/images/vdb-sources/rustsec-osv.png" width="24" height="24" alt=""> | RustSec Advisory (OSV) | RustSec advisories surfaced through the OSV schema. |
| <img src="/images/vdb-sources/go-osv.png" width="24" height="24" alt=""> | Go Advisory (OSV) | Go vulnerability database. Go module advisories maintained by the Go security team. |
| <img src="/images/vdb-sources/haskell.png" width="24" height="24" alt=""> | Haskell Advisory (direct) | Haskell Security Advisory Database. Hackage package vulnerability tracking. |
| <img src="/images/vdb-sources/haskell-osv.png" width="24" height="24" alt=""> | Haskell Advisory (OSV) | Haskell advisories surfaced through the OSV schema. |
| <img src="/images/vdb-sources/ocaml.png" width="24" height="24" alt=""> | OCaml Advisory (direct) | OCaml Security Advisory Database. Opam package vulnerability data. |
| <img src="/images/vdb-sources/ocaml-osv.png" width="24" height="24" alt=""> | OCaml Advisory (OSV) | OCaml advisories surfaced through the OSV schema. |
| <img src="/images/vdb-sources/ossfuzz.png" width="24" height="24" alt=""> | OSS-Fuzz Advisory (direct) | Google OSS-Fuzz programme. Continuous fuzzing discoveries for critical open source projects. |
| <img src="/images/vdb-sources/ossfuzz-osv.png" width="24" height="24" alt=""> | OSS-Fuzz Advisory (OSV) | OSS-Fuzz advisories surfaced through the OSV schema. |
| <img src="/images/vdb-sources/gemnasium.png" width="24" height="24" alt=""> | Gemnasium Advisory (GitLab) | GitLab Advisory Database (formerly Gemnasium). Multi-ecosystem vulnerability data maintained by GitLab. |
| <img src="/images/vdb-sources/rconsortium-osv.png" width="24" height="24" alt=""> | RConsortium Advisory (OSV) | R Consortium Advisory Database. R language package vulnerability tracking. |
| <img src="/images/vdb-sources/gsd-osv.png" width="24" height="24" alt=""> | Global Security Database (OSV) | Global Security Database (GSD). Community-contributed vulnerability data for broad ecosystem coverage. |
| <img src="/images/vdb-sources/cratesio-osv.png" width="24" height="24" alt=""> | crates.io (OSV) | Rust crates.io ecosystem advisories via OSV. Complements RustSec with additional data. |
| <img src="/images/vdb-sources/curl-osv.png" width="24" height="24" alt=""> | Curl (OSV) | curl/libcurl security advisories. Version-specific vulnerability data for the HTTP client library. |
| <img src="/images/vdb-sources/git-osv.png" width="24" height="24" alt=""> | Git (including C/C++) (OSV) | Git project and C/C++ ecosystem advisories via OSV. |
| <img src="/images/vdb-sources/gha-osv.png" width="24" height="24" alt=""> | GitHub Actions (OSV) | GitHub Actions security advisories. Vulnerability data for Actions marketplace and runner components. |
| <img src="/images/vdb-sources/hex-osv.png" width="24" height="24" alt=""> | Hex (OSV) | Hex.pm Elixir/Erlang package advisories via OSV. BEAM ecosystem vulnerability data. |
| <img src="/images/vdb-sources/maven-osv.png" width="24" height="24" alt=""> | Maven (OSV) | Maven Central Java ecosystem advisories via OSV. Java/Kotlin dependency vulnerability data. |
| <img src="/images/vdb-sources/npm-osv.png" width="24" height="24" alt=""> | npm (OSV) | npm JavaScript ecosystem advisories via OSV. Node.js package vulnerability tracking. |
| <img src="/images/vdb-sources/nuget-osv.png" width="24" height="24" alt=""> | NuGet (OSV) | NuGet .NET ecosystem advisories via OSV. C#/F# package vulnerability data. |
| <img src="/images/vdb-sources/pypi.png" width="24" height="24" alt=""> | Packagist (OSV) | Packagist PHP ecosystem advisories via OSV. Composer package vulnerability tracking. |
| <img src="/images/vdb-sources/pub-osv.png" width="24" height="24" alt=""> | Pub (OSV) | Dart/Flutter Pub ecosystem advisories via OSV. |
| <img src="/images/vdb-sources/r-osv.png" width="24" height="24" alt=""> | R (CRAN and Bioconductor) (OSV) | R language packages from CRAN and Bioconductor registries via OSV. |
| <img src="/images/vdb-sources/root-osv.png" width="24" height="24" alt=""> | Root (OSV) | Root data analysis framework advisories via OSV. |
| <img src="/images/vdb-sources/rubygems-osv.png" width="24" height="24" alt=""> | RubyGems (OSV) | RubyGems ecosystem advisories via OSV. Ruby gem vulnerability data. |
| <img src="/images/vdb-sources/swifturl-osv.png" width="24" height="24" alt=""> | SwiftURL (OSV) | Swift package ecosystem advisories via OSV. |
| <img src="/images/vdb-sources/eol.png" width="24" height="24" alt=""> | End-of-Life | End-of-life tracking for software products. Identifies dependencies running past vendor support dates. |

## Package metadata and scoring

|   | Source | Description |
|---|---|---|
| <img src="/images/vdb-sources/depsdev.png" width="24" height="24" alt=""> | deps.dev Packages | Google deps.dev. Package dependency graphs, version metadata, and transitive dependency analysis. |
| <img src="/images/vdb-sources/openssf-scorecard.png" width="24" height="24" alt=""> | OpenSSF Scorecard | OpenSSF Security Scorecard. Automated security health metrics for open source projects (branch protection, CI/CD, dependency updates). |
| <img src="/images/vdb-sources/bpkg.png" width="24" height="24" alt=""> | bpkg | Bash package manager security data. Shell script package vulnerability tracking. |

See the [licensing appendix](/vdb-api/sources/licensing/) for redistribution terms applicable to each source.
