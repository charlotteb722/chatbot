# Instructions for Claude sessions

Read `docs/project-status.md` first.

## Ground rules

- Charlotte approves scope, design, prices, spending and publication. Ask before deploying, changing DNS, or signing up for anything.
- Keep it simple. Static Astro site, no database, auth, payments or extra environments unless Charlotte asks.
- British English, plain and warm. No em dashes, no AI marketing phrases, no hype.
- Never invent testimonials, results, statistics, qualifications, prices or guarantees. Use `[DRAFT: ...]` placeholders for anything unknown.
- Never mention, imply endorsement by, or use the logo of Charlotte's employer.
- This repository is public. No client personal data, contracts, credentials or confidential notes go in it, and none go into persistent AI memory.
- Demonstration sites must keep the DemoBanner, `noindex`, and `EnquiryForm mode="demo"`.
- Keep documentation short: README, project status, client brief, test and deploy checklist.

## Before handing work back

1. `npm run build`
2. `npm run preview` in the background, then `npm test` (must PASS)
3. `npm run check:drafts` (lists what Charlotte still needs to supply)
4. Look at real screenshots at 320px and 430px wide (pricing, tables, About, footer). Passing tests alone have missed layout problems before.

## Images

- Only use photos you can show are licensed. Record each one in `src/assets/photos/CREDITS.md`.
- Use the `Photo` component (responsive WebP). No colour blocks or empty boxes in place of photos.
- After changing a demo, regenerate mockups with `npm run mockups` (needs `npm run preview` running).

## Building a client site from these templates

Aim: a straightforward client site in a few hours.

1. Create a **new private repository** for the client. Never put client work in this public repo.
2. Copy this project's `package.json`, `astro.config.mjs`, `netlify.toml`, `src/components/`, `src/layouts/`, `src/styles/`, `src/lib/`, `scripts/`, `tests/`.
3. Pick the closest demo in `src/pages/demo/` (joiner, coach, cafe) as the starting homepage. Move it to `src/pages/index.astro`.
4. Add a theme block in `src/styles/themes.css` (copy an existing one). Check text colours reach 4.5:1 contrast.
5. Switch `DemoLayout` to a client layout: remove `DemoBanner`, remove `noindex`, set the real site URL in `astro.config.mjs`.
6. Change every `EnquiryForm` to `mode="live"` with a unique `formName`. Netlify picks it up on deploy.
7. Write the copy from the client's discovery answers only. Placeholders for anything missing.
8. Build, test, check drafts, then present to Charlotte.

Client discovery questions: business and offer; customers and objectives; branding and evidence; functionality and constraints (see `docs/client-brief.md` for the shape of a finished brief).
