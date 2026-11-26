# Technical architecture and costs

Status: **recommendation for Approval Gate 1**. Service terms were checked by web search on 26 November 2026, mostly via search summaries. Charlotte should glance at the linked pricing pages before opening accounts, because free tiers change.

## Recommendation in one paragraph

Build the site with **Astro** as a static website, keep all editable content in plain Markdown and YAML files, host it on **Netlify's Free plan**, and handle the enquiry form with **Netlify Forms** (built in, so no extra service and no extra data processor). Use **Cal.com's free plan** for consultation booking. Source code lives in a private GitHub repository owned by Charlotte. Total new recurring cost: **£0**.

## Why this stack

| Need | Choice | Reason |
|---|---|---|
| Site framework | Astro (static output) | Fast, accessible HTML by default, content collections make prices, FAQs and portfolio items editable text files. No database, nothing to patch on a server. |
| Hosting | Netlify Free | Netlify states commercial projects are allowed on the Free plan. Supports custom apex domain with any registrar. Automatic HTTPS. One-click rollback to any previous deploy. |
| Forms | Netlify Forms | Captured server-side by Netlify, honeypot and spam filtering included, email notifications, submissions stored in the dashboard. Netlify's docs list form submissions as free and not consuming credits. |
| Booking | Cal.com Free | Free for individuals with unlimited event types (per Cal.com and third-party comparisons). Connects to Google or Outlook calendar. Calendly Free is the fallback (one event type only). |
| Editing content | GitHub web editor, or Decap CMS later | Edit a text file in the browser, save, site rebuilds. A friendlier editing screen can be added later if needed. |
| Fonts | Self-hosted via Fontsource | Avoids sending visitor IP addresses to Google Fonts. |
| Analytics | None at launch | No cookie banner needed. Google Search Console (free, no visitor tracking) for search performance. |

## Alternatives considered

| Option | Verdict | Notes |
|---|---|---|
| Cloudflare Pages + Web3Forms | Good fallback | Unlimited static bandwidth; commercial use reported as allowed (third-party sources, not confirmed in Cloudflare terms). Web3Forms free tier is 250 submissions a month, but adds another processor and their commercial-use terms were not found. Apex domain is easiest if DNS moves to Cloudflare, which is a bigger change. |
| GitHub Pages | Not recommended | GitHub's documentation says Pages is not intended or allowed as free hosting for an online business. Too much doubt for a commercial site. |
| Vercel Hobby | Not allowed | Hobby plan is for non-commercial personal use. |
| Stay on Lovable | Not recommended for the main site | Custom domain and ongoing editing would likely need a paid Lovable plan (current pricing not verified). Fine for keeping existing demos if Charlotte wants them. |
| WordPress | Not recommended | Needs paid hosting, plugin updates and security patching. More maintenance than the brief allows. |
| Wix / Squarespace | Not recommended | Monthly fees, lock-in. Conflicts with the "no unnecessary subscriptions" promise. |

## Known limitations and risks of the recommendation

- **Netlify credits:** the Free plan includes 300 credits a month. If a free project runs out, Netlify pauses it until the next cycle. A small static site should use a small fraction of this, but it is not unlimited. Mitigation: check usage monthly for the first three months; the site can move to Cloudflare Pages in about an hour if needed.
- **Data transfer:** Netlify and Cal.com are US-based processors. The privacy notice must name them and describe the transfer safeguards. Their data processing terms need checking during Phase 6.
- **Form email:** Netlify sends notification emails from its own address. They may land in spam the first time. Test and whitelist.
- **Booking embed:** a Cal.com inline embed sets cookies on its own domain. Using a plain link to the booking page instead keeps the site cookie-free. Recommendation: link, not embed.

## Repository structure

```
consultancy-site/            (public site, its own private repository)
  src/content/services/      one Markdown file per service
  src/content/portfolio/     one Markdown file per project
  src/content/faqs.yaml
  src/data/pricing.yaml      every price in one place
  src/data/site.yaml         contact details, hours, areas served
  src/components/            shared components
  src/pages/                 pages
  src/demos/                 three demonstration sites
  public/                    images, favicon, robots.txt
  docs/                      project documentation

client-toolkit/              (private, separate repository)
  templates/                 discovery, requirements, handover, maintenance
  starters/                  industry starter sites
  checklists/                SEO, accessibility, QA, deployment
  clients/                   NOT used: each client gets their own repository
```

**Important:** the repository this work is currently in (`charlotteb722/chatbot`) is **public** and contains an unrelated chatbot template. Recommendation: create two new private repositories, one for the consultancy site and one for the toolkit, and move this documentation there. Customer files must never go into a public repository.

## Costs

### Initial costs

| Item | Cost | Status |
|---|---|---|
| Astro, Fontsource, open-source tooling | £0 | Confirmed (open source) |
| Netlify Free account | £0 | Per Netlify's pricing and blog |
| Cal.com Free account | £0 | Per Cal.com |
| GitHub private repositories | £0 | GitHub Free includes private repositories |
| Images | £0 if Charlotte's own photos or Unsplash-licensed images | Check each image's licence |
| **Total** | **£0** | |

### Recurring costs

| Item | Cost | Notes |
|---|---|---|
| Hosting, forms, booking | £0 | Within free tiers |
| Domain renewal charlottebjuren.com | Already paid by Charlotte | Typically about £10 to £20 a year for a .com, depends on registrar (not verified) |
| ICO data protection fee | Typically £52 a year | Business cost rather than website cost; check whether it applies |
| Professional indemnity insurance | Not researched | Recommended |
| Business email on the domain | Optional, not included | A free forwarding service from the registrar, or keep using an existing address |

### Costs that would only arise if limits are exceeded

| Trigger | Likely cost |
|---|---|
| Netlify credits exhausted | Personal plan about $9 a month, or move to Cloudflare Pages at £0 |
| Need for Cal.com team features | About $15 a month (not needed for a sole trader) |

## Sources

- https://www.netlify.com/blog/introducing-netlify-free-plan.md
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans.md
- https://developers.cloudflare.com/pages/platform/limits
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://github.com/orgs/community/discussions/74742
- https://web3forms.com/pricing
- https://cal.com/blog/is-calendly-free
- https://temps.sh/blog/cloudflare-pages-free-tier-limits-2026
