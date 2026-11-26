# Reusing the demo templates for a paying client

A short guide for building a straightforward client website in a few hours. Claude can do steps 2 to 6 for you if you paste in the client's answers.

## 1. Before you start

- Run the four discovery questions with the client (business and offer, customers and goals, branding and evidence, pages and constraints).
- Collect their logo, photos, prices, contact details and any genuine reviews.
- Agree the package, price and delivery time in writing.

## 2. Make a separate, private project

Never put client work in this public repository. Create a new **private** GitHub repository for each client, then copy across these folders from this project: `src/components`, `src/layouts`, `src/styles`, `src/lib`, `scripts`, `tests`, plus `package.json`, `astro.config.mjs` and `netlify.toml`.

## 3. Pick the nearest template

| Client | Start from | Already has |
|---|---|---|
| Trades and home services | `src/pages/demo/joiner.astro` | Services, gallery, areas covered, quote form, tap-to-call |
| Coaches, consultants, therapists, tutors | `src/pages/demo/coach.astro` | Who it's for, programmes and prices, booking, testimonials space |
| Cafés, shops, accommodation, venues | `src/pages/demo/cafe.astro` | Menu or price list, opening hours, find us, group enquiry form |

Copy it to `src/pages/index.astro` in the client project.

## 4. Change the look

In `src/styles/themes.css`, copy the theme block closest to what the client wants and change the colours and fonts. Text colours must reach 4.5:1 contrast (Claude can check this).

## 5. Make it the client's real site

- Remove the `DemoBanner` from the layout.
- Change every `EnquiryForm` from `mode="demo"` to `mode="live"`.
- Replace every word with the client's own content. Leave `[DRAFT: ...]` where something is missing.
- Set the client's domain in `astro.config.mjs`.

## 6. Check it

`npm run build`, then `npm run preview` and `npm test`, then `npm run check:drafts`.

## 7. Publish in the client's name

Ask the client to create their own free Netlify account (or invite you to it), connect their repository, and follow the same steps as for your own site. They own the account, the domain and the code from day one.
