# terraform

DNS and Pages configuration for docs.vulnes.is.

- `dns.tf`: the unproxied CNAME `docs.vulnes.is` -> `vulnesis.github.io`.
- `pages.tf`: the repository's Pages settings (workflow build, custom domain). Imported on 2026-10-27, re-imported after the rename to platform-docs on 2026-11-01.

Retired docs hostnames (software-factory.vulnes.is and the old per-product docs sites) are proxied placeholder records plus 301 rules in `vdb-site/terraform/dns.tf`, the only owner of the zone's redirect ruleset. Do not add redirects here.

State is in R2, `vulnesis-terraform-state/platform-docs-site/terraform.tfstate` (moved from `software-factory-site/` on 2026-11-01, and from AWS S3 to R2 on 2026-11-25). `vx-tf` (Vulnesis/ops `tools/`, put on PATH by `just install` there) brings the state keys and runs the init.

```sh
# A token with DNS edit on the vulnes.is zone. The CLOUDFLARE_API_KEY in a
# normal shell can read the zone but not edit it; the token in
# vdb-manager/.dev.vars can.
export TF_VAR_cloudflare_api_token=...
# The github provider manages the Pages block, so it needs an org admin token.
export TF_VAR_github_token=$(gh auth token -u 0x73746F66)
vx-tf terraform plan
```

A plan should show no changes. If it proposes destroying the Pages block, stop: `prevent_destroy` is there because unbinding the domain takes the site down until the certificate is issued again.
