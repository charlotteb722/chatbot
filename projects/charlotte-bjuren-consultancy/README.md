# Charlotte Bjuren website

The website for Charlotte Bjuren | Website Development & Digital Consultancy, Crieff, Perthshire. Built with Astro as a plain static site. No database, logins or paid services.

Status: see `docs/project-status.md`.

## Updating content (no coding needed)

All the words that change often live in `src/data/`. Edit them on GitHub in the browser (open the file, click the pencil, save). The site rebuilds itself once it is connected to Netlify.

| To change | Edit |
|---|---|
| Email, phone, booking link, address, hours | `src/data/settings.yaml` |
| Website package prices and features | `src/data/packages.yaml` |
| Care plan prices | `src/data/care.yaml` |
| FAQs | `src/data/faqs.yaml` |
| Portfolio projects | `src/data/portfolio.yaml` |
| Testimonials (hidden until one is added) | `src/data/testimonials.yaml` |

Rules for YAML files: keep the indentation exactly as it is, and keep text inside double quotes. If a save breaks the build, Netlify keeps the previous version live and shows the error.

Longer page text is in `src/pages/` (one file per page). The AI coaching price sits in `src/pages/ai-and-automation.astro`.

## Photos and mockups

- Photos live in `src/assets/photos/` (licence record in `CREDITS.md` there). Use them with `<Photo src="file-name" alt="..." />`; Astro makes small WebP versions for phones automatically.
- To swap your headshot, replace `src/assets/photos/cb-charlotte.jpg`.
- Portfolio mockups are made from real screenshots: run `npm run preview`, then `npm run mockups`. Rerun it after changing a demo site.

## Placeholders

Anything starting `[DRAFT:` shows as yellow highlighted text. `npm run check:drafts` lists every one left. It must report none before launch.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install once |
| `npm run dev` | Local preview at http://localhost:4321 while editing |
| `npm run build` | Build the site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm test` | Browser tests (needs `npm run preview` running) |
| `npm run check:drafts` | List remaining placeholders |

## Structure

```
src/data/        editable content (YAML)
src/components/  reusable parts: header, hero, sections, pricing, CostList and ComparisonTable (stack into cards on phones), FAQs, forms, gallery
src/layouts/     MainLayout (this site), DemoLayout (demo and client sites), BaseLayout (shared)
src/styles/      global.css (components) and themes.css (one block of colours and fonts per site)
src/pages/       pages; demo/ holds the three demonstration websites
tests/smoke.cjs  browser, accessibility, link and form tests
docs/            brief, status, checklist, reference material from Gate 1
```

## Reusing for a client

See `CLAUDE.md`, section "Building a client site from these templates".
