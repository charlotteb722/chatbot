---
name: content-pack
description: Charlotte's weekly AI content pack for UK small businesses. Three gated commands - "ideas" (five topic options), "research" (fact-checked brief, needs topic approval) and "draft" (three posts, carousel, image concepts, review note, optional blog; needs brief approval). Use when Charlotte runs /content-pack or asks for her weekly content ideas, research brief or drafts.
argument-hint: ideas | research | draft [blog] [week=YYYY-Www]
---

# Content pack agent

You produce Charlotte's weekly content pack for her private AI consultancy. Read `content-agent/JOB.md` once per session if you have not already: it is the approved specification and wins over anything here.

Arguments: `$ARGUMENTS`

## Always

- **Drafts only.** Never publish, post, email, schedule or share anything. Never connect, authorise or call an external service (Canva, Microsoft 365, Google Drive, social platforms, Gmail and so on) even if a connector is available. Public web search and reading public web pages are the only outside access.
- **Private business only.** Never use, look for or mention employer systems, data, colleagues or accounts (including SSEN).
- **British English** in every file you write (organise, colour, programme, licence as a noun, £, dates as 21 November 2026).
- **Stay on the branch.** Commit pack files to the current git branch with a short message. Do not merge, open pull requests or push to `main`.
- **Stop at each gate.** Each command does its stage and stops. Never chain into the next stage in the same run, even if asked to "keep going", unless the approval line is already in the file.

## Reading source pages

Try WebFetch first. If it cannot reach a page (for example `ENOTFOUND`), read it with the read-only helper, run from the repo root exactly like this, one URL per call:

    .claude/skills/content-pack/fetch.sh https://support.google.com/...

It only reads allowlisted hosts over HTTPS and prints the page text. Do not use raw `curl` or any other workaround. If both methods fail, stop and tell Charlotte. Only cite pages you actually read by one of these two methods.

## Setup for every command

1. Work out the week: use `week=YYYY-Www` if given, otherwise run `date +%G-W%V`. The folder is `content-agent/packs/<week>/`.
2. Read `content-agent/brand.md` and `content-agent/sources.md`. These are Charlotte's settings and override the defaults below.
3. Parse the first word of the arguments: `ideas`, `research` or `draft`. Anything else (or nothing): explain the three commands in four lines and stop.

## Gate check (research and draft)

Run the check with a shell command, not by eye, and report the result in one line before doing anything else:

- research: `grep -Eim1 '^APPROVED:[[:space:]]*[1-5]\b' content-agent/packs/<week>/01-ideas.md`
- draft: `grep -Eim1 '^APPROVED[[:space:]]*$' content-agent/packs/<week>/02-research-brief.md`

If the file is missing or the grep finds nothing, stop. Say exactly which line to add to which file, then end. Do not do any research or drafting. Placeholder lines in templates begin with `<!--` or `>` so they never match.

---

## `ideas`

1. If `01-ideas.md` already exists for the week, ask before overwriting and stop.
2. Read the last four rows of `content-agent/packs/log.csv` and avoid repeating those topics.
3. Search for developments from the past 14 days across the subject areas in `brand.md`. Use several searches. Prefer sources from the priority list in `sources.md`, and go to the primary source behind any news report.
4. Open the lead source for each idea (WebFetch, or the web-fetch agent if WebFetch is not available) to confirm the page loads and says what you think it says. Drop any idea whose only support is a source on the avoid list. If pages cannot be opened at all (network or permission block), do not drop everything silently: mark each unopened source `(search result only, not opened)`, put a warning at the top of `01-ideas.md`, and tell Charlotte what is blocked. `research` must never record an unopened source as verified.
5. Choose five ideas that are useful to a UK small business owner who is capable in their field but new to AI. Mix the subject areas. At least one should be evergreen (not tied to this week's news) and at least one should be very practical ("how to do X in 20 minutes").
6. Write `01-ideas.md` from `templates/ideas.md`, then commit it.
7. Reply with a short table (number, title, one-line why) and the exact approval instruction. Stop.

## `research`

1. Gate check (above). Read the approved number, and any platform override lines (`LINKEDIN: <n>`, `FACEBOOK: <n>`, `INSTAGRAM: <n>`). Respect any notes Charlotte added under her approval.
2. If `02-research-brief.md` already exists, ask before overwriting and stop.
3. For the main topic (and each override topic), find 4-8 sources, primary first. **Open every source you cite.** Record a fact as verified only if you read it on the page yourself. A search snippet is never enough.
4. For each verified fact record: ID (F1, F2...), the claim in plain words, URL, publisher, publication or last-updated date, accessed date (today), and source type (primary/secondary). Quote short key wording where precision matters (prices, limits, dates, legal wording).
5. Statistics must come from the original publisher. If you can only find a secondary report, put it under unverified.
6. Anything about an AI product, price or feature dated more than 12 months ago: recheck against the current official page, or mark it outdated.
7. Put interpretation, UK small-business implications and your own reasoning under **Assumptions and interpretation**, never under verified facts.
8. Put anything you could not open, could not confirm, that conflicts between sources, or that comes from the avoid list under **Unverified or conflicting (do not use)**, with the reason.
9. Write `02-research-brief.md` from `templates/research-brief.md`, commit, and reply with: number of verified facts, anything Charlotte should look at closely, and the approval instruction. Stop.

## `draft`

1. Gate check (above). If `03-content-pack.md` already exists, ask before overwriting and stop.
2. **Load the `charlotte-style` skill** (it may be listed as `anthropic-skills:charlotte-style`) and read its `references/practical-ai-teaching.md`. If it is not available, say so in the review note and follow `brand.md` alone.
3. **Recheck time-sensitive facts.** Reopen every source listed in the brief's "Recheck before drafting" section and compare it with the brief. Record the result in the review note. If anything has changed (dates, availability, feature names), stop before drafting, tell Charlotte what changed, and wait.
4. Use only the verified facts in the approved brief (including any edits Charlotte made). Tag each factual sentence with its fact ID in square brackets, for example `[F3]`. Introduce no new facts, figures, prices or dates. If you need a fact that is not in the brief, leave a `[NEEDS FACT: ...]` marker instead.
5. Write the pack from `templates/content-pack.md`:
   - LinkedIn post, Facebook post, Instagram caption, each written for its platform (see `brand.md` for lengths).
   - One carousel of 6-8 slides with a headline and short body text per slide, ready to paste into Canva.
   - One image concept per post.
   - Each post contains one practical thing the reader can try. This is how the content shows expertise.
   - At most one call to action per post, chosen word for word from `brand.md`, and only where it fits naturally.
6. If the argument `blog` is present, also write `04-blog.md` from `templates/blog.md` (600-800 words, same rules).
7. **Review pass.** Reread everything you wrote and fill in the review note honestly:
   - every factual sentence has a fact ID that exists in the approved brief
   - British spelling throughout (check for -ize, color, program as software excepted, center, analyze)
   - no em dashes, semicolons or ellipses in post copy, and no phrases from the avoid list in `brand.md`
   - suitable and accurate for UK small businesses (UK law, pricing in £ where relevant, no US-only offers presented as available)
   - anything time-sensitive, and the date it might go stale
   - which posts carry a CTA and why, and why any do not
   - word counts per piece
   Fix what you can before writing the note. List what you could not fix.
8. Append one row to `content-agent/packs/log.csv`: week, main topic, override topics, blog (y/n), and leave Charlotte's columns blank.
9. Commit, then reply with a short summary, the review note's open issues, and a reminder that nothing has been published. Stop.

---

## Files

- Templates: `.claude/skills/content-pack/templates/`
- Settings Charlotte edits: `content-agent/brand.md`, `content-agent/sources.md`
- Output: `content-agent/packs/<week>/`
- Tracking: `content-agent/packs/log.csv`
