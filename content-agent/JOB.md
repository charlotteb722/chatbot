# JOB: AI Content Marketing Agent

**Owner:** Charlotte · **Status:** v2 specification: automated weekly run (22 Nov 2026), awaiting build approval · **Previous:** v1 manual, three-command workflow (kept as fallback)

## Purpose
Every Monday, without me starting anything, produce a finished, fact-checked marketing content package for my AI consultancy, aimed at UK small business owners, sole traders and entrepreneurs. Subjects: practical AI tools, AI marketing and content creation, automation and productivity, websites and digital business support, and real examples of businesses saving time with AI.

The content must support the consultancy by showing practical expertise and encouraging genuine enquiries, not by hard selling.

Personal business project only. Completely separate from my employment. No employer systems, data or accounts.

**Success:** every Monday I receive a finished content package without opening Claude Code or starting anything manually.

## Core requirement: automatic weekly run
- **When:** every Monday at 08:00 UK time, following BST automatically (the schedule is set in `Europe/London`).
- **Where:** in the cloud, so my computer can be off.
- **How:** one scheduled run carries out every stage in order, with **no human approval between stages**:
  1. Research current AI and automation developments relevant to UK small businesses (past 14 days, plus evergreen angles)
  2. Score candidate topics and select the strongest one without asking me, avoiding anything covered in the previous four weeks
  3. Verify sources and facts automatically
  4. Draft LinkedIn, Facebook and Instagram posts, an 8-slide carousel, image briefs and a blog article
  5. Apply my `charlotte-style` skill and `brand.md`
  6. Run all quality and consistency checks, and fix any failures
  7. Save the complete publication-ready package
  8. Notify me by email that it's ready for review
- **My only approval point:** reviewing the finished package before I publish anything myself.

## Automatic quality gates (they replace the manual approvals)
- **Topic selection:** each candidate is scored on UK relevance, practical value, verifiability, freshness, fit with my consultancy and repetition. The scores and two runner-up topics are included in the pack.
- **Verification gate:** a fact counts only if the agent opened and read the source page itself. Primary sources come first, and there must be at least 5 verified facts. A feature is only recommended to an audience (for example free Gmail or Workspace) if its UK availability for that audience is confirmed. Anything unverified is excluded. If too little survives, the agent moves to the next topic, with at most 2 switches.
- **No pack rather than a weak pack:** if no topic passes, I get a "No pack this week" notification with the reasons.
- **Quality gate:** fact IDs, British English, punctuation rules, avoid-list phrases, word counts, carousel structure, no prices unless relevant and verified, approved CTAs only, no invented experiences or customer stories, and hedged availability wording. These checks must pass before the pack is saved.
- **Status on every pack:** Ready, Ready with notes (for example, live-account checks I need to do), or No pack.

## Weekly package
Saved to `content-agent/packs/YYYY-Www/` on the `content-packs` branch:
- `00-run-log.md`: what happened, sources opened, topic scores, check results, status
- `01-ideas.md`: candidate topics and scores
- `02-research-brief.md`: verified facts, assumptions, exclusions
- `03-content-pack.md` and `04-blog.md`: drafts with fact IDs (the research record)
- `05-publication-copy.md`: clean copy, ready to post
- `06-canva-instructions.md`: Canva sizes, slide layout, image briefs, alt text, live-account checks, posting checklist

## Notifications and failures
- An email when the run finishes: the topic, status, where to find the pack, and anything needing my attention.
- A watchdog at 10:00 every Monday checks that the week's pack exists, and emails me if it doesn't (for example, a crashed run or a usage limit).
- Every run is logged in `00-run-log.md` and `content-agent/packs/runs.csv`.

## Calls to action
Use one only where it fits naturally, and never more than one per post. Approved wording is listed in `brand.md`, including my own closing lines.

## Research rules
- **Prioritise:** official documentation and primary sources, including OpenAI, Anthropic, Microsoft Learn, Google, gov.uk, ICO, ONS, and established UK business organisations.
- **Avoid:** unverified social media claims, promotional articles without evidence, and outdated information. Anything about AI products older than 12 months is rechecked.
- **Search results:** search snippets are never evidence.
- **Facts:** every fact has an ID, link, publisher, date and accessed date. Drafts use only verified facts.

## Brand voice
British English. Professional, friendly and practical. Uses my `charlotte-style` skill and `brand.md`. No hype, no invented figures, experiences, clients or results.

## Hard limits
- Drafts only. The agent never publishes, posts or schedules social content, and never emails anyone but me through the built-in run notification.
- No connectors (Gmail, Drive, Canva, social) in scheduled runs. Web access is limited to the allowlisted research sites through the read-only reader.
- No paid service and no credentials stored without my explicit approval.
- No merge into `main` without my approval.
- Single agent. No sub-agents.

## Manual fallback
The v1 commands stay available: `/content-pack ideas`, `research` and `draft`, with approval gates, plus `/content-pack auto` to run the whole automated pipeline on demand (for example, a re-run with a different topic).

## Success measures (first 30 days)
- A pack arrives every Monday without me doing anything
- Three posts and one carousel a week that I'm happy to publish
- My weekly effort (review, Canva, posting) under 2 hours
- Light edits, not rewrites
- Tracked in `log.csv`: review minutes, edit level, what was published, enquiries
