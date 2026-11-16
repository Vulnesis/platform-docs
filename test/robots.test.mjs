// public/robots.txt: search engines, AI search, AI agents and AI training
// crawlers are all welcome. See README.md, "Search engines and AI crawlers".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const TEXT = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');

// RFC 9309 groups: consecutive User-agent lines, then their rules.
const groups = [];
let open = false;
for (const raw of TEXT.split('\n')) {
  const m = raw.replace(/#.*/, '').trim().match(/^([\w-]+)\s*:\s*(.*)$/);
  if (!m) continue;
  const key = m[1].toLowerCase();
  if (key === 'user-agent') {
    if (!open) groups.push({ agents: [], allow: [], disallow: [] });
    groups.at(-1).agents.push(m[2].toLowerCase());
    open = true;
  } else {
    open = false;
    if (key === 'allow') groups.at(-1)?.allow.push(m[2]);
    if (key === 'disallow') groups.at(-1)?.disallow.push(m[2]);
  }
}
const groupsFor = (agent) => groups.filter((g) => g.agents.includes(agent.toLowerCase()));

const NAMED = [
  'Googlebot', 'bingbot', 'DuckAssistBot', 'Applebot', 'Applebot-Extended',
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Google-CloudVertexBot',
  'meta-webindexer', 'meta-externalagent', 'meta-externalfetcher',
  'Amazonbot', 'Amzn-SearchBot', 'Amzn-User',
  'MistralAI-Index', 'MistralAI-User', 'MistralAI-Training',
  'ExaSearchBot', 'Kagibot', 'CCBot',
];

test('robots.txt names every search and AI crawler once, allowed everywhere', () => {
  for (const agent of [...NAMED, '*']) {
    const g = groupsFor(agent);
    assert.equal(g.length, 1, agent);
    assert.deepEqual(g[0].allow, ['/'], agent);
    assert.deepEqual(g[0].disallow, [], agent);
  }
});

test('robots.txt disallows nothing for anyone', () => {
  assert.deepEqual(groups.flatMap((g) => g.disallow), []);
});

test('robots.txt signals yes to search, AI input and AI training, and names the sitemap', () => {
  assert.match(TEXT, /^Content-Signal: search=yes, ai-input=yes, ai-train=yes$/m);
  assert.match(TEXT, /^Sitemap: https:\/\/docs\.vulnetix\.com\/sitemap-index\.xml$/m);
});
