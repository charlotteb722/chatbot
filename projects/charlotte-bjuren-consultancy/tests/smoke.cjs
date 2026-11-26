// Browser smoke and accessibility test. Usage: start `npm run preview`, then `node tests/smoke.cjs [baseUrl]`
const { chromium, devices } = require('playwright');
const fs = require('fs');
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = process.argv[2] || 'http://localhost:4321';
const SHOTS = process.env.SHOTS || '';
const pages = ['/', '/websites/', '/ai-and-automation/', '/portfolio/', '/portfolio/joiner/', '/portfolio/coach/', '/portfolio/cafe/',
  '/about/', '/faqs/', '/contact/', '/contact/thanks/', '/privacy/', '/terms/', '/accessibility/', '/demo/joiner/', '/demo/coach/', '/demo/cafe/'];
const problems = []; const ok = (c, m) => { if (!c) problems.push(m); };

(async () => {
  const browser = await chromium.launch();
  const links = new Set();
  const iphone = devices['iPhone 13'];
  const viewports = [320, 375, 390, 430].map((w) => ({ name: `phone-${w}`, phone: true, width: w, height: 800 })).concat([{ name: 'desktop', width: 1280, height: 800 }]);
  for (const vp of viewports) {
    const ctx = await browser.newContext(vp.phone
      ? { ...iphone, viewport: { width: vp.width, height: vp.height }, screen: { width: vp.width, height: vp.height } }
      : { viewport: { width: vp.width, height: vp.height } });
    for (const path of pages) {
      const page = await ctx.newPage(); const errs = [];
      page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      page.on('pageerror', (e) => errs.push(e.message));
      const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
      ok(res.status() === 200, `${path} status ${res.status()}`);
      ok(!errs.length, `${path} [${vp.name}] console errors: ${errs.join(' | ')}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      ok(overflow <= 0, `${path} [${vp.name}] horizontal overflow ${overflow}px`);
      // Anything sticking out of the screen, or clipped / scrolling inside its own box
      const clipped = await page.evaluate(() => {
        const W = document.documentElement.clientWidth; const out = [];
        const name = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '');
        for (const el of document.querySelectorAll('body *')) {
          if (el.closest('.visually-hidden, .sr-only-mobile, .honey, .skip-link, [hidden], caption, script, style')) continue;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue;
          if (r.right > W + 1 || r.left < -1) out.push(`${name(el)} extends past screen edge`);
          else if (['hidden', 'auto', 'scroll', 'clip'].includes(cs.overflowX) && el.scrollWidth > el.clientWidth + 1 && !el.closest('svg')) out.push(`${name(el)} content clipped by ${el.scrollWidth - el.clientWidth}px`);
        }
        return [...new Set(out)].slice(0, 4);
      });
      clipped.forEach((c) => problems.push(`${path} [${vp.name}] ${c}`));
      const h1 = await page.locator('h1').count(); ok(h1 === 1, `${path} has ${h1} h1 elements`);
      if (path.startsWith('/demo/')) ok(await page.locator('.demo-banner').isVisible(), `${path} demo banner not visible`);
      if (vp.name === 'desktop') {
        (await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')))).forEach((h) => links.add(h.split('#')[0].split('?')[0]));
        await page.addScriptTag({ content: axeSrc });
        const r = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations
          .map((v) => `${v.impact}: ${v.id} (${v.nodes.length}) ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(', ')}`));
        r.forEach((v) => problems.push(`${path} axe ${v}`));
      }
      if (SHOTS && (vp.name === 'phone-320' || vp.name === 'phone-430' || vp.name === 'desktop') && ['/', '/websites/', '/about/', '/contact/', '/demo/joiner/', '/demo/coach/', '/demo/cafe/'].includes(path)) {
        await page.screenshot({ path: `${SHOTS}/${vp.name}${path.replace(/\//g, '_') || '_home'}.png`, fullPage: true });
      }
      await page.close();
    }
    ok((await ctx.cookies()).length === 0, `cookies were set: ${JSON.stringify(await ctx.cookies())}`);
    await ctx.close();
  }
  // Internal links
  const ctx = await browser.newContext(); const req = ctx.request;
  for (const l of links) { const r = await req.get(BASE + l); ok(r.status() === 200, `broken link ${l} -> ${r.status()}`); }

  // Share box shows a full, working link
  const sh = await (await browser.newContext()).newPage();
  await sh.goto(BASE + '/portfolio/joiner/');
  ok((await sh.locator('.share-url').textContent()) === BASE + '/demo/joiner/', 'share link not shown in full');

  // Sticky header must not cover anchored sections
  const hp = await (await browser.newContext({ ...iphone })).newPage();
  for (const target of ['/contact/#enquiry', '/contact/#book', '/websites/#care', '/websites/#running-costs']) {
    await hp.goto('about:blank'); await hp.goto(BASE + target); await hp.waitForTimeout(1500);
    const id = target.split('#')[1];
    const gap = await hp.evaluate((id) => document.getElementById(id).getBoundingClientRect().top - document.querySelector('.site-header').getBoundingClientRect().bottom, id);
    ok(gap >= -1, `${target}: header covers the section by ${Math.round(-gap)}px`);
  }

  // Mobile menu
  const m = await (await browser.newContext({ viewport: { width: 375, height: 800 } })).newPage();
  await m.goto(BASE + '/'); const btn = m.locator('.nav-toggle');
  ok(await btn.isVisible(), 'mobile menu button not visible');
  ok(!(await m.locator('#site-nav').isVisible()), 'mobile nav visible before opening');
  await btn.click(); ok(await m.locator('#site-nav').isVisible(), 'mobile nav did not open');
  ok((await btn.getAttribute('aria-expanded')) === 'true', 'aria-expanded not true');
  await m.keyboard.press('Escape'); ok(!(await m.locator('#site-nav').isVisible()), 'Escape did not close menu');

  // Live enquiry form: validation and Netlify attributes
  const f = await (await browser.newContext()).newPage();
  await f.goto(BASE + '/contact/?type=Business%20Website#enquiry');
  ok((await f.locator('#enquiry-type').inputValue()) === 'Business Website', 'package preselect failed');
  const form = f.locator('form#enquiry-form');
  ok((await form.getAttribute('data-netlify')) === 'true', 'live form missing data-netlify');
  ok((await form.getAttribute('netlify-honeypot')) === 'bot-field', 'live form missing honeypot');
  ok((await f.locator('input[name=form-name]').getAttribute('value')) === 'enquiry', 'form-name hidden input missing');
  await f.click('form#enquiry-form button[type=submit]');
  ok(f.url().includes('/contact/'), 'empty form navigated away');
  ok(await f.locator('#enquiry-name-error').isVisible(), 'no error for missing name');
  ok((await f.evaluate(() => document.activeElement.id)) === 'enquiry-name', 'focus not moved to first invalid field');
  await f.fill('#enquiry-email', 'not-an-email'); await f.click('form#enquiry-form button[type=submit]');
  ok((await f.locator('#enquiry-email-error').textContent()).includes('format'), 'no email format error');

  // Demo forms send nothing
  for (const [path, id] of [['/demo/joiner/', 'joiner-quote'], ['/demo/coach/', 'coach-call'], ['/demo/cafe/', 'cafe-groups']]) {
    const d = await (await browser.newContext()).newPage(); await d.goto(BASE + path);
    ok((await d.locator(`form#${id}-form [name]`).count()) === 0, `${path} demo form has named fields`);
    ok((await d.locator(`form#${id}-form`).getAttribute('action')) === null, `${path} demo form has an action`);
    const sent = []; d.on('request', (r) => sent.push(r.url()));
    for (const inp of await d.locator(`form#${id}-form input, form#${id}-form textarea`).all()) {
      const t = await inp.getAttribute('type');
      await inp.fill(t === 'email' ? 'test@example.com' : t === 'date' ? '2027-01-15' : t === 'number' ? '6' : t === 'tel' ? '01632960000' : 'Test');
    }
    for (const s of await d.locator(`form#${id}-form select`).all()) await s.selectOption({ index: 1 });
    await d.click(`form#${id}-form button[type=submit]`); await d.waitForTimeout(300);
    ok(sent.length === 0, `${path} demo form made requests: ${sent.join(', ')}`);
    ok((await d.locator(`form#${id}-form .form-status`).textContent()).includes('demonstration'), `${path} demo message not shown`);
  }
  await browser.close();
  console.log(problems.length ? `FAIL: ${problems.length} problem(s)\n - ${problems.join('\n - ')}` : `PASS: ${pages.length} pages x ${viewports.length} viewports (320, 375, 390, 430, desktop), no clipping, ${links.size} internal links, menu, forms, cookies, axe`);
  process.exit(problems.length ? 1 : 0);
})();
