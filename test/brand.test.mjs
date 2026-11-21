// The generators write pages as the Vulnesis surface of shared sources
// (scripts/lib/brand.mjs). These cases are the rules the committed pages follow.
import test from 'node:test';
import assert from 'node:assert/strict';
import { vulnesisSurface } from '../scripts/lib/brand.mjs';

test('display name and env vars move to Vulnesis', () => {
  assert.equal(vulnesisSurface('Publish to Vulnetix'), 'Publish to Vulnesis');
  assert.equal(vulnesisSurface('`VULNETIX_ORG_ID`'), '`VULNESIS_ORG_ID`');
});

test('org paths move to the Vulnesis org', () => {
  assert.equal(
    vulnesisSurface('https://github.com/Vulnetix/config-schemas/releases/latest/download/A.schema.json'),
    'https://github.com/Vulnesis/config-schemas/releases/latest/download/A.schema.json');
  assert.equal(vulnesisSurface('ghcr.io/vulnetix/pix-sandbox@sha256:ab'), 'ghcr.io/vulnesis/pix-sandbox@sha256:ab');
});

test('hosts land one label below vulnes.is', () => {
  assert.equal(vulnesisSurface('https://api.vdb.vulnetix.com/v1'), 'https://api-vdb.vulnes.is/v1');
  assert.equal(vulnesisSurface('https://vulnetix.com/feeds/x'), 'https://vulnes.is/feeds/x');
  assert.equal(vulnesisSurface('https://www.vulnetix.com/'), 'https://www.vulnes.is/');
});

test('identifiers, data values and the API group stay', () => {
  assert.equal(vulnesisSurface('https://vulnetix.com/v1/feeds'), 'https://vulnes.is/v1/feeds');
  for (const s of ['apiVersion: vulnetix.com/v1', '| `apiVersion` | `vulnetix.com/v1` |', 'vulnetix-kev', '"vulnetix"', 'X-Vulnetix-Org', 'VulnetixKev', 'vulnetix gha setup']) {
    assert.equal(vulnesisSurface(s), s);
  }
});
