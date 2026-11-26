// Makes a self-contained copy of the built site with relative links, for sharing a preview
// somewhere that is not the site's own domain. Forms are disabled in this copy.
// Usage: npm run build && node scripts/export-preview.mjs <outDir>
import { cpSync, readdirSync, readFileSync, writeFileSync, statSync, rmSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';

const out = process.argv[2];
if (!out) { console.error('Usage: node scripts/export-preview.mjs <outDir>'); process.exit(1); }
rmSync(out, { recursive: true, force: true });
cpSync('dist', out, { recursive: true });

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(out);

const disableForms = `<script>document.querySelectorAll('form[data-netlify]').forEach(f=>f.addEventListener('submit',e=>{if(e.defaultPrevented)return;e.preventDefault();const s=f.querySelector('.form-status');if(s){s.hidden=false;s.textContent='Preview copy: forms only send once the site is live on Netlify.';}}));</script>`;

for (const file of files) {
  if (!/\.(html|css)$/.test(file)) continue;
  const dir = dirname(relative(out, file));
  const rel = (target) => {
    let [, path, rest] = target.match(/^([^?#]*)(.*)$/);
    if (file.endsWith('.html') && (path.endsWith('/') || path === '')) path = path + 'index.html';
    let r = posix.relative(dir === '.' ? '' : dir.split('\\').join('/'), path.replace(/^\//, ''));
    return (r || 'index.html') + rest;
  };
  let s = readFileSync(file, 'utf8');
  s = s.replace(/(href|src|action)="(\/[^"\/][^"]*|\/)"/g, (_, a, v) => `${a}="${rel(v)}"`);
  s = s.replace(/url\((\/_astro\/[^)]+)\)/g, (_, v) => `url(${rel(v)})`);
  // srcset lists several image URLs with sizes, e.g. "/_astro/a.webp 420w, /_astro/b.webp 720w"
  s = s.replace(/srcset="([^"]*)"/g, (_, list) => `srcset="${list.split(',').map((part) => { const [u, ...d] = part.trim().split(/\s+/); return [u.startsWith('/') ? rel(u) : u, ...d].join(' '); }).join(', ')}"`);
  if (file.endsWith('.html')) s = s.replace('</body>', `${disableForms}</body>`);
  writeFileSync(file, s);
}
console.log(`Preview copy written to ${out}`);
