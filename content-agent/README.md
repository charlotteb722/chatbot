# AI Content Marketing Agent

A weekly content pack for UK small businesses: three posts, a carousel and an optional blog. Everything is fact-checked and drafted for your review. Nothing is ever published by the agent.

## Weekly routine

1. Open a Claude Code session on this repo and branch (`claude/ai-content-marketing-agent-7wthqm` until it's merged).
2. `/content-pack ideas` writes five ideas to `packs/<week>/01-ideas.md`.
3. Add `APPROVED: <n>` to that file (plus `INSTAGRAM: <n>` etc. for a different topic on one platform).
4. `/content-pack research` writes `02-research-brief.md`. Check the facts, edit, then add `APPROVED`.
5. `/content-pack draft` (or `/content-pack draft blog`) writes `03-content-pack.md` and, if asked, `04-blog.md`.
6. Copy into Canva and post yourself. Fill in your columns in `packs/log.csv`.

Settings you can edit: `brand.md` (tone, CTAs, lengths) and `sources.md` (trusted and avoided sources). The specification is in `JOB.md`, the build plan in `PLAN.md`.

To redo a past week, add `week=2026-W47` to any command.
