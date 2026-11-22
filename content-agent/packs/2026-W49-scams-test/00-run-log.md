# Run log: 2026-W49-scams-test

- **Run type:** manual run. Topic chosen by Charlotte (idea 2 from 2026-W49-auto-test). The research gate, drafting and checks ran automatically, without pausing.
- **Started:** 22 November 2026 (after the 2026-W49-auto-test run)
- **Status:** READY WITH NOTES
- **Topic:** AI is making scam emails more convincing

## Timeline

| Stage | What happened |
|---|---|
| Set up | New folder on `claude/content-packs`. No earlier packs touched. No overlap with topics in log.csv. |
| Research | 3 pages opened (ICO five steps, GOV.UK phishing reporting, GOV.UK cyber hub), 16 verified primary facts. |
| Gate | PASS. 16 facts, all primary. The UK reporting routes are confirmed for England, Wales and Scotland. Northern Ireland isn't mentioned. The 92% insurance statistic is excluded (original publisher not opened). |
| Draft | GOV.UK cyber hub rechecked and unchanged. LinkedIn, Facebook, Instagram, an 8-slide carousel, 3 image concepts and a blog. |
| Quality | Round 1: 28/29. A false positive: "sized" was flagged as US spelling. checks.py was fixed with a small exclusion list for size, seize, prize and similar words. Round 2: 29/29. The fix was rechecked on the earlier packs (all still 29/29). |
| Save | Commit and push to `claude/content-packs`. |

## Notes for Charlotte

- **Why READY WITH NOTES:** recheck GOV.UK's "currently" wording for the free Cyber Advisor session before posting, and decide on the "two minutes" phrase.
- **Advice framing:** the "ring before you pay" tip is framed as your suggestion, not a quote from the ICO or GOV.UK.
- **Nothing published, no connectors, `main` untouched.**
