terraform {
  required_version = ">= 1.5"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }

    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket                      = "vulnesis-terraform-state"
    key                         = "platform-docs-site/terraform.tfstate"
    region                      = "auto"
    endpoints                   = { s3 = "https://e302589106b4c4287aebe65763eb4f80.r2.cloudflarestorage.com" }
    use_path_style              = true
    use_lockfile                = true
    skip_credentials_validation = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_s3_checksum            = true
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "github" {
  # The repository lives in the Vulnesis org, not the authenticating user's
  # account; pin the owner so repository names resolve there.
  owner = "Vulnesis"
  token = var.github_token
}