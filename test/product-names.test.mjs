// The signed-in product at www.vulnes.is/resolve/ is the Resolve Platform.
// "The console", "the Vulnesis console" and "the Resolve console" are not
// used in prose. Routes and API names keep the word (`/resolve/console`,
// `console-routes`, a `console` field), so code spans, fenced code and link
// targets are not checked.
//
// Skipped: the SAST rule pages (generated from the CLI's rule prose, where
// "the console" is a browser's or a debugger's) and the Platform IaC kind
// pages, whose field descriptions come from the config-schemas release that
// releases.json pins. The kind pages' own prose comes from kind-notes.mjs and
// kind-reference.mjs, which are checked here.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const DIRS = ['src/content/docs', 'src/segments', 'src/pages', 'src/layouts', 'src/lib'];
const GENERATORS = ['migration/generators/kind-notes.mjs', 'migration/generators/kind-reference.mjs', 'scripts/gen-reference.mjs'];
const SKIP = [/^src\/content\/docs\/sast\/rules\//, /^src\/content\/docs\/platform-iac\/kinds\//];
const BANNED = /\b[Tt]he console\b(?!\.\w|\()|\b(?:Vulnesis|Vulnetix|Resolve) [Cc]onsole\b|\bconsole (?:session|pages?|only|edit|tab)\b|\bconsole-only\b/;

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

// Prose only: drop fenced code, inline code and link targets.
export const prose = (text) => text
  .replace(/^```[\s\S]*?^```/gm, '')
  .replace(/`[^`\n]*`/g, '')
  .replace(/\]\([^)]*\)/g, ']');

// Names retired when the assistant became Strix and its hosted machines became
// Keleustes Sandboxes: "Pix", "Pix Sandbox", "Pix Registry", "Pix [bot]" and
// "PixCommander". Identifiers keep the old spelling (`pix_sandbox`, `pix-smart`,
// `/v1/pix-call`, `PIX_*`, `ghcr.io/vulnesis/pix-sandbox`, the `pix:` YAML key,
// `vulnetix pix`), and they are written as code, which prose() drops.
const RETIRED = /\bPix(?:Commander)?\b/;

const hitsIn = (rel, text, banned = BANNED) => prose(text).split('\n').flatMap((line) =>
  banned.test(line) ? [`${rel}: ${line.trim().slice(0, 120)}`] : []);

test('pages call the signed-in product the Resolve Platform, not the console', () => {
  const hits = [];
  for (const dir of DIRS) {
    for (const file of walk(join(ROOT, dir))) {
      const rel = relative(ROOT, file);
      if (!/\.(md|mdx|astro|ts|json)$/.test(rel) || SKIP.some((r) => r.test(rel))) continue;
      hits.push(...hitsIn(rel, readFileSync(file, 'utf8')));
    }
  }
  for (const rel of GENERATORS) hits.push(...hitsIn(rel, readFileSync(join(ROOT, rel), 'utf8')));
  assert.deepEqual(hits, [], `write "the Resolve Platform":\n${hits.join('\n')}`);
});

test('pages say Strix, Keleustes Sandbox and Registry, not the retired Pix names', () => {
  const hits = [];
  for (const file of walk(join(ROOT, 'src/content/docs'))) {
    const rel = relative(ROOT, file);
    if (!/\.(md|mdx)$/.test(rel) || SKIP.some((r) => r.test(rel))) continue;
    hits.push(...hitsIn(rel, readFileSync(file, 'utf8'), RETIRED));
  }
  for (const file of walk(join(ROOT, 'src/segments'))) hits.push(...hitsIn(relative(ROOT, file), readFileSync(file, 'utf8'), RETIRED));
  for (const rel of GENERATORS) hits.push(...hitsIn(rel, readFileSync(join(ROOT, rel), 'utf8'), RETIRED));
  assert.deepEqual(hits, [], `write "Strix", "Keleustes Sandbox", "Registry" or "StrixCommander":\n${hits.join('\n')}`);
});

test('the retired-name guard allows identifiers written as code, and catches prose', () => {
  for (const s of ['Ask Pix on a call.', 'A Pix Sandbox is online all month.', 'PixCommander picks the model.', 'Publish to the Pix Registry.', 'Commits are made by Pix [bot].']) {
    assert.ok(RETIRED.test(prose(s)), s);
  }
  for (const s of ['The `pix.size` key and `PixLaunchConfig`.', 'Routes under `/v1/pix-call` and `/v1/admin/pix-sandboxes`.', 'The image is `ghcr.io/vulnesis/pix-sandbox`.', 'Set `PIX_SANDBOX_ID`, or run `vulnetix pix`.', 'See [the plugin](https://github.com/Vulnesis/pix-ai-coding-assistant).', 'Strix runs pix-smart and pix-fast.']) {
    assert.ok(!RETIRED.test(prose(s)), s);
  }
});

test('the guard allows routes, code and API names, and catches prose', () => {
  assert.ok(BANNED.test('Open Integrations in the console.'));
  assert.ok(BANNED.test('Pages in the Vulnesis console'));
  assert.ok(BANNED.test('Every route needs a signed-in console session.'));
  assert.ok(BANNED.test('Other console pages link here.'));
  assert.ok(!BANNED.test(prose('See [Console pages](/software-factory/reference/console-routes/).')));
  assert.ok(!BANNED.test(prose('The `console` field and `/resolve/console` route.')));
  assert.ok(!BANNED.test('the console.log call'));
});
