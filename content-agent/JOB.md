# JOB: Weekly AI Content Pack

**Owner:** Charlotte · **Status:** Draft, awaiting approval · **Version:** v1 (on demand only)

## Purpose
Produce one weekly content pack for my private AI consultancy, aimed at UK small business owners (practical AI, websites, digital business support). Saves 3+ hours a week and keeps every claim traceable to a source.

## How it runs
One Claude Code skill, three commands, run by me. Each stage writes files and stops. Nothing runs without me starting it.

| Stage | Command | Needs | Writes |
|---|---|---|---|
| 1 Topics | `/content-pack topics` | nothing | `01-topics.md`: three options, each with why it matters to a UK small business, 2-3 lead sources, and a suggested angle |
| 2 Brief | `/content-pack brief` | `APPROVED: <n>` in `01-topics.md` | `02-research-brief.md` |
| 3 Drafts | `/content-pack drafts` | `APPROVED` in `02-research-brief.md` | `03-blog.md`, `04-linkedin.md` (2 posts), `05-facebook.md` (2 posts), `06-graphics.md`, `07-qa-note.md` |

Output folder: `packs/YYYY-Www/` (for example `packs/2026-W48/`).

## The approval gates are enforced, not just polite
Stage 2 refuses to run unless I've typed `APPROVED: 2` (or similar) into the topics file. Stage 3 refuses unless I've typed `APPROVED` into the brief. I can edit the files before approving and the next stage uses my edits.

## Research brief rules (Stage 2)
- Three separate sections: **Verified facts**, **Assumptions and interpretation**, **Unverified or conflicting (do not use)**.
- Each verified fact gets an ID (F1, F2...), a source link, publisher, publication date and date accessed.
- A fact counts as verified only if the agent has read the source page itself, not just a search snippet.
- Prefer primary sources (vendor announcements, gov.uk, ICO, ONS, regulators). Statistics need the original source, not a blog quoting it.
- UK relevance stated explicitly: what changes for a small business owner, and what it costs.

## Drafting rules (Stage 3)
- British English, my voice (uses the existing `charlotte-style` skill).
- Every factual claim in a draft carries a fact ID from the approved brief. No new facts are introduced at drafting.
- No hype, no invented statistics, no client names, no employer information.
- QA note lists: any sentence with a claim but no fact ID, anything time-sensitive, word counts, and my estimated review time.

## Hard limits
- Drafts only. The agent never publishes, posts, emails or schedules anything.
- No employer systems, data or SSEN accounts. Public web sources only.
- £0 extra software. Runs inside my existing Claude Code plan using its built-in web search, so no separate API bill.
- Single agent. No sub-agents, no Canva automation in v1.

## Out of scope for v1
Canva design, Monday scheduling, auto-publishing, analytics dashboards.

## Build plan (two Saturdays)
- **Saturday 1:** skill file, folder structure, Stages 1 and 2. Run a real week end to end up to the approved brief.
- **Saturday 2:** Stage 3 and QA note. Run a full week, time my review, fix whatever annoyed me.
- **Go-live test:** three consecutive weeks where the pack is usable with review under 2 hours.
- **Then, and only then:** consider Monday-morning scheduling of Stage 1 only.

## Measuring it
A one-line entry per week in `packs/log.csv`: week, topic, review minutes, claims flagged by QA, published (y/n), enquiries or client conversations traced to it.
