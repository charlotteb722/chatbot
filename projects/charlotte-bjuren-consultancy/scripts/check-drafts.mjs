// Lists every [DRAFT ...] placeholder left in the built site. Run after `npm run build`.
// Exits with an error if any remain, so it can block publishing.
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
if (!found.size) { console.log('No draft placeholders left. Ready to publish.'); process.exit(0); }
const all = new Set([...found.values()].flat());
console.log(`${all.size} different placeholders still to replace:\n`);
for (const d of all) console.log(`  ${d}`);
console.log('\nPages affected:');
for (const [page, hits] of found) console.log(`  ${page}  (${hits.length})`);
process.exit(1);
