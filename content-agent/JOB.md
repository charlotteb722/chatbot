# JOB: AI Content Marketing Agent

**Owner:** Charlotte · **Status:** Revised draft, awaiting approval · **Version:** v1 (on demand only)

## Purpose
Help me research, plan, create and improve marketing content for my AI consultancy, aimed at UK small business owners, sole traders and entrepreneurs. Subjects: practical AI tools, AI marketing and content creation, automation and productivity, websites and digital business support, and real examples of businesses saving time with AI.

Personal business project only. Completely separate from my employment. No employer systems, data or accounts.

## How it runs
One Claude Code skill, three commands, started by me. Each one writes files to a weekly folder (`packs/YYYY-Www/`) and stops.

| Command | Workflow steps | Needs | Writes |
|---|---|---|---|
| `/content-pack ideas` | 1 Research opportunities, 2 Recommend five ideas | nothing | `01-ideas.md`: five ideas, each with why it matters to a UK small business, the angle, which platform suits it, and 2-3 lead sources |
| `/content-pack research` | 4 Research the chosen topic | `APPROVED: <n>` in `01-ideas.md` (step 3) | `02-research-brief.md` |
| `/content-pack draft` | 5 Draft, 6 Carousel/images/CTAs, 7 Review, 8 Present | `APPROVED` in `02-research-brief.md` | `03-content-pack.md` (everything I copy from, in one file) |

The approval lines are enforced: the next command refuses to run without them. I can edit any file before approving, and the next stage uses my edits.

## Weekly output (`03-content-pack.md`)
- **Three posts:** one each for LinkedIn, Facebook and Instagram, written for each platform rather than copied across.
- **One carousel:** 6-8 slides, with the headline and body text for each slide, ready to paste into Canva. Works for Instagram and LinkedIn.
- **Image concepts:** one per post, described clearly enough to build in Canva.
- **Calls to action:** one per post, chosen from my approved CTA list.
- **Review note:** accuracy check, clarity, UK suitability, anything time-sensitive, and any claim missing a source.

## Research rules
- The brief has three sections: **Verified facts**, **Assumptions and interpretation**, and **Unverified or conflicting (do not use)**.
- Each verified fact gets an ID (F1, F2...), a link, the publisher, the publication date and the date accessed. It only counts as verified if the agent read the page itself, not just a search snippet.
- Prefer primary sources: vendor announcements, gov.uk, ICO, ONS, regulators. Statistics must come from the original source.
- Drafts may only use facts from the approved brief, tagged with their IDs. No new facts are added at drafting.

## Brand voice
British English. Professional, friendly and practical. No hype, no invented figures, no client names. Voice comes from my existing `charlotte-style` skill, plus a short `brand.md` in the repo (audience, CTAs, words to avoid) that I can edit myself.

## Hard limits
- Drafts only. Nothing is published, posted, emailed or scheduled by the agent.
- No new external services or connections without my permission. Canva, Microsoft 365 and ChatGPT stay manual in v1: I copy from the pack.
- £0 extra software. Runs inside my existing Claude plan with its built-in web search.
- Single agent. No sub-agents.

## Out of scope for v1
Canva automation, a blog article, scheduling, auto-publishing, analytics dashboards.

## Build plan
- **Session 1:** skill, `brand.md`, folder structure, `ideas` and `research`. Run a real week up to an approved brief.
- **Session 2:** `draft`, including the review note. Run a full week, time my review, and fix whatever annoyed me.
- **Monday scheduling:** only once three weeks in a row have run cleanly, and only for `ideas`.

## Success within 30 days
- Three posts and one carousel I'm happy to publish, every week.
- Total weekly effort (choosing, approving, reviewing, Canva) under 2 hours, out of my 5-8 business hours.
- Brand voice consistent enough that I'm making light edits, not rewrites.
- Tracked in `packs/log.csv`, one line per week: topic, review minutes, edit level (light/heavy), what got published, and any enquiries traced to it.
