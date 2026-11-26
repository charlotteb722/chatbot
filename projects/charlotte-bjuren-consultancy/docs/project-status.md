# Project status

**Updated:** 26 November 2026
**Stage:** Ready for deployment to a temporary Netlify address. Waiting for Charlotte to connect Netlify.

## Done

- Gate 1 approved (prices, Astro + Netlify + Netlify Forms + Cal.com link, Design A Strathearn, three demos)
- Full site: Home, Websites and pricing, AI and automation, Portfolio (index and three project pages), About, FAQs, Contact (form and booking), Privacy notice (draft), Business terms (draft), Accessibility, 404, thank-you page
- Three demonstration sites: Ardvane Joinery, Clearpath Career Coaching, Larchfield Bakehouse, all built from the same components with their own themes
- SEO: unique titles and descriptions, canonical URLs, Open Graph image, sitemap, robots.txt, ProfessionalService and FAQPage structured data, demos excluded from search
- Security headers and content security policy in `netlify.toml`
- Automated tests passing: 17 pages at phone and desktop widths, no overflow, no console errors, axe accessibility scan clean, internal links, mobile menu, form validation, demo forms send nothing, no cookies set

## Not yet verified

- **Real form delivery.** Only possible once the site is deployed on Netlify. Must be tested before launch.
- **Netlify and Cal.com terms.** Commercial use and free-tier limits to be rechecked on their pricing pages when the accounts are opened.
- **Demo business names.** Not yet checked against real businesses.
- Safari and Firefox not tested (Chromium only in this environment).
- Existing websites still not reviewed (network blocked here).

## Added for deployment

- Delivery times, About story and Crieff, Perthshire, Scotland location added
- Preview/live safeguard: preview builds are hidden from search engines; live builds fail while drafts remain
- Demo sharing: copy-link box on each portfolio project page, social preview image per demo, contact link in each demo banner
- Headshot shows automatically once a photo path is set in settings.yaml
- Reuse guide: `docs/reusing-templates.md`

## Waiting for Charlotte

Supply or confirm everything `npm run check:drafts` lists: business email, booking link, headshot, address decision, privacy and terms details. Plus a free Netlify account (steps in the checklist).

## Known limitation

Netlify Forms filters spam on the server but does not enforce required fields there. Browsers enforce them, so an incomplete enquiry can only come from someone deliberately bypassing the form. Accepted for release 1 to avoid custom server code.

## Next

Charlotte reviews the preview, sends changes and missing details in one batch. Then: deploy to a Netlify preview address, test real form delivery, run the checklist, and ask for approval to switch the domain.
