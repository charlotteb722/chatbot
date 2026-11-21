# Implementation plan: AI Content Marketing Agent v1

Status: awaiting approval. Nothing below has been built yet.

## What gets built (7 files, no code to maintain)

```
.claude/skills/content-pack/
  SKILL.md                    # the agent: commands, gates, rules for each stage
  templates/ideas.md          # layout for 01-ideas.md
  templates/research-brief.md # layout for 02-research-brief.md
  templates/content-pack.md   # layout for 03-content-pack.md
  templates/blog.md           # layout for 04-blog.md (optional)
content-agent/
  brand.md                    # audience, tone, CTAs, words to avoid (yours to edit)
  sources.md                  # trusted and avoided sources (yours to edit)
  README.md                   # the weekly routine in ten lines
  packs/log.csv               # weekly tracking, header row only
```

It's all plain Markdown. The skill is instructions to Claude, not a program, so there are no dependencies, no API keys and nothing to update.

## How each command works

**`/content-pack ideas`**
1. Works out the week folder (for example `packs/2026-W48/`) and creates it.
2. Reads `brand.md` and `sources.md`, and checks the last four weeks' topics in `log.csv` to avoid repeats.
3. Searches for developments from the past 14 days, preferring trusted sources.
4. Writes five ideas using the template, then stops and tells you how to approve.

**`/content-pack research`**
1. Gate: checks `01-ideas.md` for `APPROVED: <n>` and any platform override (`INSTAGRAM: 4`). If it's missing, it stops and says what to add.
2. Reads each source page directly and records the facts with IDs, links, publisher, publication date and date accessed.
3. Sorts everything into verified, assumptions, and do-not-use, and flags anything about AI products older than 12 months.
4. Stops for your fact check.

**`/content-pack draft` (or `draft blog`)**
1. Gate: checks `02-research-brief.md` for `APPROVED`.
2. Loads `charlotte-style`, then drafts the three posts, the carousel, image concepts and CTAs (only where they fit). It writes the blog too if you asked for it.
3. Review pass: checks that every claim has a fact ID, the spelling is British, the content suits the UK, nothing is time-sensitive, and the CTA use makes sense. Writes the review note at the bottom of the pack.
4. Adds a line to `log.csv`, leaving your review minutes and outcomes blank for you to fill in.

A note on the gates: they're enforced by the skill checking the file before it does anything. That's reliable in practice but it isn't a hard lock, so if you ever see a stage run without approval, treat it as a bug and tell me.

## Your weekly routine (about 2 hours)
1. Run `ideas` and pick a topic (10 minutes).
2. Run `research` and check the facts (30 minutes).
3. Run `draft` and edit (45 minutes).
4. Build in Canva and post manually (30 minutes). Fill in your line in `log.csv`.

You run it from Claude Code (the web app or the desktop app) on this repo. Packs are saved to the branch, and you copy them to OneDrive yourself if you want them there.

## Build sessions
**Session 1 (about 2 hours of my work, about 30 minutes of yours)**
- Write `SKILL.md`, the templates, `brand.md`, `sources.md`, the README and the log.
- Run `ideas` for real on this week. You approve a topic, then I run `research` for real and you check the brief.
- Done when: you'd be happy to approve that brief.

**Session 2**
- Run `draft` on the approved brief, plus the blog once to test it.
- You time your review. I fix whatever slowed you down (usually tone, length or the carousel structure).
- Done when: the pack needs light edits only.

## Decisions I've made (shout if you disagree)
- **Skill location:** the skill lives in the repo, so it only loads in sessions on this branch. Once it works, it's worth merging into `main` so every new session picks it up. I won't do that without asking.
- **Ideas look back 14 days.** That gives a better choice than 7 days while staying current.
- **The blog is 600-800 words.** That's long enough to show expertise and short enough to review in 15 minutes.
- **The CTA rule:** at most one per post, and the review note says why each was used or left out. Expect roughly two of the three posts to carry one.

## Not doing in v1
No Canva, OneDrive, Google Drive or social connections. No scheduling, no sub-agents, no paid tools.
