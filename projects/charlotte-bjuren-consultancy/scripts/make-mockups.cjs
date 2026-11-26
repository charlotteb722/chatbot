// Builds laptop-and-phone mockup images of the demo sites from real screenshots.
// Run with the site served locally (npm run preview), then: node scripts/make-mockups.cjs
// Output: src/assets/mockups/mock-<name>.png
const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');
const BASE = process.env.BASE || 'http://localhost:4321';
const OUT = path.join(__dirname, '..', 'src', 'assets', 'mockups');
const TMP = fs.mkdtempSync(path.join(require('os').tmpdir(), 'mock-'));

const shots = [
  { name: 'joiner', desk: '/demo/joiner/', phone: '/demo/joiner/' },
  { name: 'coach', desk: '/demo/coach/', phone: '/demo/coach/' },
  { name: 'cafe', desk: '/demo/cafe/', phone: '/demo/cafe/' },
];

async function grab(browser, url, phone, file) {
  const ctx = await browser.newContext(phone ? { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } } : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(BASE + url, { waitUntil: 'networkidle' });
  // Hide the demo banner in the mockup only; the live demo always shows it.
  await p.addStyleTag({ content: '.demo-banner{display:none!important}' });
  await p.waitForTimeout(500);
  await p.screenshot({ path: file });
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  fs.mkdirSync(OUT, { recursive: true });
  for (const s of shots) {
    const d = path.join(TMP, `${s.name}-d.png`), m = path.join(TMP, `${s.name}-m.png`);
    await grab(browser, s.desk, false, d);
    await grab(browser, s.phone, true, m);
    const uri = (f) => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
    const html = `<html><body style="margin:0;background:transparent">
<div style="position:relative;width:1600px;height:1110px">
  <div style="position:absolute;left:40px;top:30px;width:1260px;height:800px;background:#16181a;border-radius:26px;padding:20px;box-sizing:border-box;box-shadow:0 30px 60px rgba(0,0,0,.25)">
    <div style="width:100%;height:100%;border-radius:8px;overflow:hidden;background:#fff">
      <img src="${uri(d)}" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block">
    </div>
  </div>
  <div style="position:absolute;left:0;top:830px;width:1340px;height:30px;border-radius:0 0 30px 30px;background:linear-gradient(#d8dadc,#a9adb1);box-shadow:0 18px 30px rgba(0,0,0,.18)"></div>
  <div style="position:absolute;left:590px;top:830px;width:160px;height:12px;border-radius:0 0 12px 12px;background:#8f9397"></div>
  <div style="position:absolute;left:1215px;top:300px;width:340px;height:720px;background:#111;border-radius:52px;padding:13px;box-sizing:border-box;box-shadow:0 30px 60px rgba(0,0,0,.3)">
    <div style="width:100%;height:100%;border-radius:40px;overflow:hidden;background:#fff;position:relative;padding-top:46px;box-sizing:border-box">
      <img src="${uri(m)}" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block">
      <div style="position:absolute;top:10px;left:50%;transform:translateX(-50%);width:96px;height:26px;background:#111;border-radius:20px"></div>
    </div>
  </div>
</div></body></html>`;
    const page = await browser.newPage({ viewport: { width: 1600, height: 1110 } });
    await page.setContent(html, { waitUntil: 'load' });
    await page.screenshot({ path: path.join(OUT, `mock-${s.name}.png`), omitBackground: true });
    await page.close();
    console.log('made', `mock-${s.name}.png`);
  }
  await browser.close();
})();
