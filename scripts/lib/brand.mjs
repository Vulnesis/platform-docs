// Surface rebrand for generated pages.
//
// The generators read the cli, config-schemas and malscan-engine sources, which
// are shared by both brands and default to Vulnetix ("generated docs follow the
// code"). The committed pages are the Vulnesis surface of that output, so every
// generator passes its page text through vulnesisSurface() before writing. That
// keeps the "Fail if a generated page is stale" check meaningful: a regenerated
// page equals the committed one unless the source really changed.
//
// These are the surface rules of Vulnesis/ops scripts/rebrand.py that apply to
// documentation:
//   org paths     github.com/Vulnetix/x, ghcr.io/vulnetix/x -> Vulnesis
//   domains       <host>.vulnetix.com, vulnetix.com        -> one label under vulnes.is
//   env vars      VULNETIX_FOO                             -> VULNESIS_FOO
//   display text  the standalone word "Vulnetix"           -> "Vulnesis"
// Lowercase identifiers and data values (vulnetix-kev, "vulnetix", X-Vulnetix-*)
// stay as they are, and so does the Platform IaC API group `vulnetix.com/v1`: it
// is the apiVersion the engine accepts, data rather than a hostname.

const HOST = /\b((?:[a-z0-9-]+\.)*)vulnetix\.com\b/gi;

// The API group is a bare `vulnetix.com/v<N>`, never part of a URL.
const isApiGroup = (sub, offset, text) =>
  !sub && /^\/v\d/.test(text.slice(offset + 'vulnetix.com'.length)) && text.slice(Math.max(0, offset - 2), offset) !== '//';

export function vulnesisSurface(text) {
  return text
    .replace(/github\.com\/Vulnetix\//g, 'github.com/Vulnesis/')
    .replace(/ghcr\.io\/vulnetix\//g, 'ghcr.io/vulnesis/')
    .replace(HOST, (m, sub, offset, whole) => {
      if (isApiGroup(sub, offset, whole)) return m;
      return sub ? `${sub.slice(0, -1).replace(/\./g, '-')}.vulnes.is` : 'vulnes.is';
    })
    .replace(/\bVULNETIX_/g, 'VULNESIS_')
    .replace(/(?<![\w-])Vulnetix(?![\w-])/g, 'Vulnesis');
}
