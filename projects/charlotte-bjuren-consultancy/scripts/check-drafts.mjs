// Lists every [DRAFT ...] placeholder left in the built site. Run after `npm run build`.
// In live mode (SITE_MODE=live or --strict) it exits with an error if any remain, which stops
// Netlify publishing and keeps the previous version online. In preview mode it only reports.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist';
const found = new Map();
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) {
      const hits = readFileSync(p, 'utf8').match(/\[DRAFT[^\]]*\]/g);
      if (hits) found.set(p.replace(/^dist/, ''), [...new Set(hits)]);
    }
  }
};
walk(root);
const strict = process.env.SITE_MODE === 'live' || process.argv.includes('--strict');
if (!found.size) { console.log('No draft placeholders left. Ready to publish.'); process.exit(0); }
const all = new Set([...found.values()].flat());
console.log(`${all.size} different placeholders still to replace:\n`);
for (const d of all) console.log(`  ${d}`);
console.log('\nPages affected:');
for (const [page, hits] of found) console.log(`  ${page}  (${hits.length})`);
if (strict) { console.log('\nLive build stopped: replace the placeholders above first.'); process.exit(1); }
console.log('\nPreview mode: placeholders allowed. The site is hidden from search engines.');
