# Test and deploy checklist

Tick each item. Do not mark anything as passed without actually checking it.

## Before deploying

- [ ] `npm run build` succeeds
- [ ] `npm test` passes (pages, phone and desktop layouts, accessibility scan, links, menu, forms, cookies)
- [ ] `npm run check:drafts` reports no placeholders
- [ ] Charlotte has approved all copy, prices and the privacy notice and terms
- [ ] Demo business names checked against Companies House and a web search
- [ ] Headshot and any photos have alt text and are licensed or owned

## First deploy (Netlify preview address, no domain change)

1. Charlotte creates a free Netlify account in her own name.
2. In Netlify: Add new project, import from GitHub, choose this repository.
3. Base directory: `projects/charlotte-bjuren-consultancy`. Build command and publish folder come from `netlify.toml`.
4. Deploy. Netlify gives an address like `something.netlify.app`.
5. In Netlify: Forms, enable form detection, then redeploy. Set email notifications for the `enquiry` form to Charlotte's inbox.

## Test on the preview address

- [ ] Send a real enquiry. It arrives by email within 5 minutes and appears under Forms
- [ ] Check the notification email is not in spam
- [ ] Submit with the hidden honeypot field filled (browser dev tools). It is not delivered
- [ ] Submit an empty form. Errors appear, nothing is sent
- [ ] Booking link opens Cal.com and a test booking arrives in the calendar
- [ ] Every page on a real phone (iPhone Safari and Android Chrome if possible)
- [ ] Keyboard only: tab through Home and Contact, focus always visible
- [ ] Response headers include HSTS and Content-Security-Policy
- [ ] No cookies in the browser after browsing the site
- [ ] Lighthouse mobile on Home, Websites, Contact: performance 90+, accessibility 95+, SEO 95+
- [ ] Social preview looks right (paste the URL into a LinkedIn post draft)

## Going live (needs Charlotte's explicit approval)

- [ ] Note the current DNS records for charlottebjuren.com (screenshot) so the change can be reversed
- [ ] Add the custom domain in Netlify and follow its DNS instructions at the registrar
- [ ] HTTPS certificate issued, `http://` redirects to `https://`, `www` redirects to the main address
- [ ] Repeat the real enquiry test on the live domain
- [ ] Submit the sitemap in Google Search Console
- [ ] Set up or update the Google Business Profile with the new website address

## Rollback

Netlify keeps every deploy. In Deploys, choose the previous one and click Publish deploy. To undo the domain switch, restore the DNS records from the screenshot.

## Monthly (first three months)

- [ ] Check Netlify usage stays well within the free plan
- [ ] Send a test enquiry
