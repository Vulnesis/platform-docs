// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { callouts, pendingLinks } from './src/plugins/docs-markdown.mjs';
import { homeRedirects } from './src/lib/home-redirects.mjs';

export default defineConfig({
  // Keep in sync with public/CNAME and terraform/dns.tf.
  site: 'https://docs.vulnes.is',
  base: '/',
  trailingSlash: 'always',
  markdown: {
    processor: satteri({ hastPlugins: [callouts, pendingLinks] }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, wrap: false },
  },
  vite: { plugins: [tailwindcss()] },
  // A Content-Security-Policy <meta> on every page (GitHub Pages cannot send
  // headers), with the sha256 of each inline script and style. scripts/sri.mjs
  // adds the hash of the import map it writes after the build. Everything the
  // site loads is its own except the Geist font, from jsDelivr at a pinned
  // version (src/styles/docs.css; sri.mjs --check verifies its digest).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' https://cdn.jsdelivr.net",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
      // Pagefind compiles its search index reader from WebAssembly.
      scriptDirective: { resources: ["'self'", "'wasm-unsafe-eval'"] },
      // Shiki colours code with style="…" attributes, which hashes cannot cover.
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
  // Pages that moved when the planned Platform IaC pages became real. Static
  // meta-refresh pages, so a link to the old address still lands.
  redirects: {
    '/platform-iac/planned/cel': '/platform-iac/reference/cel/',
    '/platform-iac/planned/kind-catalogue': '/platform-iac/kinds/catalogue/',
    '/platform-iac/planned/terraform': '/platform-iac/terraform/',
    '/platform-iac/planned/vex-sources': '/platform-iac/guides/vex-sources/',
    '/vex/suppression/vex-sources-planned': '/platform-iac/guides/vex-sources/',
    // Pix became Strix, and Pix Sandboxes became Keleustes Sandboxes, the
    // hosted side of Keleustes. Every old address keeps landing.
    '/pix': '/strix/',
    '/pix/get-started/overview': '/strix/',
    '/pix/agents/overview': '/strix/agents/overview/',
    '/pix/agents/pr-security-reviewer': '/strix/agents/pr-security-reviewer/',
    '/pix/calls/voice-calls': '/strix/calls/voice-calls/',
    '/pix/get-started/install': '/strix/get-started/install/',
    '/pix/get-started/quickstart': '/strix/get-started/quickstart/',
    '/pix/get-started/troubleshooting': '/strix/get-started/troubleshooting/',
    '/pix/hooks/change-guard': '/strix/hooks/change-guard/',
    '/pix/hooks/dependency-guard': '/strix/hooks/dependency-guard/',
    '/pix/hooks/overview': '/strix/hooks/overview/',
    '/pix/hooks/policy-file': '/strix/hooks/policy-file/',
    '/pix/hooks/session-context': '/strix/hooks/session-context/',
    '/pix/reference/commands': '/strix/reference/commands/',
    '/pix/reference/repository-files': '/strix/reference/repository-files/',
    '/pix/skills/attestations': '/strix/skills/attestations/',
    '/pix/skills/defence': '/strix/skills/defence/',
    '/pix/skills/dependencies': '/strix/skills/dependencies/',
    '/pix/skills/overview': '/strix/skills/overview/',
    '/pix/skills/scanners': '/strix/skills/scanners/',
    '/pix/skills/vulnerabilities': '/strix/skills/vulnerabilities/',
    '/pix/sandboxes/overview': '/keleustes/sandboxes/overview/',
    '/pix/sandboxes/launch-configurations': '/keleustes/sandboxes/launch-configurations/',
    '/pix/sandboxes/egress': '/keleustes/sandboxes/egress/',
    '/software-factory/workforce/pix-sandboxes': '/keleustes/sandboxes/managing-sandboxes/',
    '/software-factory/pix/calling-pix': '/software-factory/strix/calling-strix/',
    '/software-factory/pix/pix-buttons': '/software-factory/strix/strix-buttons/',
    '/software-factory/pix/voice-tools': '/software-factory/strix/voice-tools/',
    '/software-factory/pix/call-history': '/software-factory/strix/call-history/',
    '/software-factory/pix/stopping-work': '/software-factory/strix/stopping-work/',
    // Each segment home's own path, to the segment root that serves it.
    ...homeRedirects(),
  },
});
