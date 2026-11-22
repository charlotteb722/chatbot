# Implementation plan v2: automated weekly run

Status: **proposed, awaiting approval.** Nothing in this plan has been built yet. The v1 manual workflow (three commands with gates) is built, tested on 2026-W47, and stays as the fallback.

---

## 1. Scheduling options investigated

| Option | Runs with computer off | UK time incl. BST | Needs API key / paid service | Cost | Notes |
|---|---|---|---|---|---|
| **A. Claude Code scheduled task (cloud)**, recommended | Yes | Yes, schedule set as `CRON_TZ=Europe/London 0 8 * * 1` | No. Uses the existing Claude subscription | **£0 extra.** Uses plan usage allowance | Reuses everything already built: research environment, page reader, charlotte-style, repo. Built-in email notification. Fresh session each Monday. Can be created with **no connectors**. |
| B. GitHub Actions + Claude API | Yes | Not natively. Actions schedules run in UTC, so it needs two schedules (07:00 and 08:00 UTC) plus a "is it 08:00 in London?" check | **Yes:** Anthropic API key (pay as you go) stored as a GitHub secret. Email needs Gmail app-password secrets, or a GitHub issue that triggers GitHub's own email | About **£1–2 per run on Sonnet 5.5, £2.50–4 on Opus 5.5** (£5–17 a month). Actions minutes probably free for a private repo (to confirm) | charlotte-style isn't available outside Claude, so it would need copying into the repo. GitHub may delay scheduled runs under load. |
| C. Claude Managed Agents scheduled deployment | Yes | Cron schedules (time-zone support to confirm) | **Yes:** API account, billed per token plus session runtime | Similar to B, plus runtime | Anthropic hosts the agent. More set-up than A for the same result. |
| D. Power Automate cloud flow | Yes | Yes | Can't run Claude without the API | £0 for a reminder only | Could send a reminder, not do the work. |
| E. Local cron / Task Scheduler | **No**, the computer must be on | Yes | Depends | £0 | Fails the "computer off" requirement. |

**Decision proposed:** Option A. It's the only option that meets every requirement with no paid service and no stored credentials. B is the fallback if A proves unreliable, and it would need your approval because it costs money and stores an API key.

**Option A's limits:**
- **Plan usage:** a full run uses a meaningful share of your Claude plan's usage allowance. I can't see your plan or remaining allowance, and a run that hits a limit can stop partway. The watchdog catches this.
- **Timing:** start times can drift by a few minutes when servers are busy.
- **Email content:** the notification email carries the run summary, not the whole pack. The pack itself lives in the repo, which you can read in GitHub or the Claude app.

---

## 2. How the automatic workflow operates

```
MONDAY 08:00 UK  ─ scheduled task "Weekly content pack" fires (CRON_TZ=Europe/London)
│                  fresh cloud session · environment "chatbot (content research)" · no connectors
│
├─ 1. SET UP       check out claude/content-packs branch (create from agent branch if new)
│                  work out week (date +%G-W%V), create packs/<week>/, start 00-run-log.md
│                  read JOB.md, brand.md, sources.md, last 4 rows of log.csv
│
├─ 2. IDEAS        several web searches over the past 14 days, prefer priority sources
│                  shortlist 5 candidates → 01-ideas.md
│
├─ 3. SELECT       score each 1–5 on: UK relevance · practical value · verifiability
│                  (≥2 primary sources opened) · freshness · consultancy fit · not repeated
│                  pick highest; record scores and 2 runners-up
│
├─ 4. RESEARCH     open every source with fetch.sh (read-only) → 02-research-brief.md
│   └─ GATE        ≥5 verified primary facts? UK availability confirmed for each
│                  recommended feature/audience? → pass: continue
│                  fail: log reason, next-best topic (max 2 switches) → back to 4
│                  all fail: write NO PACK report → step 8
│
├─ 5. DRAFT        load charlotte-style + brand.md; recheck time-sensitive sources
│                  LinkedIn · Facebook · Instagram · 8-slide carousel · image briefs ·
│                  blog → 03-content-pack.md, 04-blog.md (with fact IDs)
│
├─ 6. CHECK        checks.py: fact IDs valid · British spelling · no em dashes/semicolons/
│   └─ GATE        ellipses · avoid list · word counts · 8 slides · approved CTAs ·
│                  hedged availability · no invented experience · copy matches records
│                  fail: fix and re-run (max 3 rounds), then mark READY WITH NOTES
│
├─ 7. PACKAGE      publication_copy.py → 05-publication-copy.md (IDs removed)
│                  06-canva-instructions.md · status: READY / READY WITH NOTES
│
├─ 8. SAVE         commit to claude/content-packs, push · append runs.csv and log.csv
│
└─ 9. NOTIFY       run ends with a summary: status, topic, what to check, file path
                   → built-in email notification to Charlotte's account email

MONDAY 10:00 UK  ─ watchdog task: is packs/<week>/00-run-log.md on claude/content-packs
                   with a final status? no → summary "Monday pack missing" → email
```

**What never happens in a scheduled run:**
- No posting, scheduling or publishing.
- No connectors (Gmail, Drive, Canva).
- No merge into `main`.
- No sites outside the allowlist.
- No raw `curl`.

---

## 3. What gets built

| File | Purpose |
|---|---|
| `.claude/skills/content-pack/SKILL.md` | Adds the `auto` command (the full pipeline above), topic scoring rules and the gate rules. Keeps `ideas`, `research` and `draft` unchanged as the fallback. |
| `.claude/skills/content-pack/checks.py` | The consistency checks from 2026-W47, generalised so they work for any week. They exit with a failure code if any check fails. |
| `.claude/skills/content-pack/publication_copy.py` | Already built. |
| `.claude/skills/content-pack/watchdog.md` | Instructions for the 10:00 check. |
| `.claude/settings.json` | Adds narrow allow rules for unattended runs: the two check scripts, git commit and push to `claude/content-packs`, and the page reader (already there). |
| `content-agent/packs/runs.csv` | One line per run: date, week, status, topic, minutes, topic switches, check failures. |
| `content-agent/brand.md` | Adds your two closing lines as approved CTAs. |
| Scheduled task: "Weekly content pack" | `CRON_TZ=Europe/London 0 8 * * 1`, a fresh session per run, email notifications on, no connectors |
| Scheduled task: "Content pack watchdog" | `CRON_TZ=Europe/London 0 10 * * 1`, email notifications on, no connectors |

---

## 4. Testing before the first real Monday

1. **Full test run.** Fire the weekly task manually, producing `packs/2026-W48-test/`. Check the pack quality, the run log, the email, the time taken, and that it ran without permission prompts.
2. **Unattended-run checks.** Confirm the fired session:
   - checks out the right branch
   - loads charlotte-style (if it can't, it uses `brand.md` alone and says so in the pack)
   - can use `fetch.sh`
   - can push
3. **Failure tests**, fired with a test instruction:
   - **Unverifiable topic:** the agent must switch topic and log why.
   - **All sources unreachable:** the agent must produce a "No pack" report and email.
   - **Watchdog:** run it for a week with no pack, and it must email an alert.
4. **Report back** to you with the results, the test pack, and any changes needed.
5. **Turn on the Monday schedule** once you approve the test results. The first real pack gets your full review, and I tune the topic scoring from your feedback.

---

## 5. Decisions on record

- **Option A,** £0 extra, no API key.
- **Start time:** exactly 08:00 UK, as requested. Allow up to about 40 minutes for the pack to arrive.
- **Where packs are saved:** a `claude/content-packs` branch. `main` stays untouched until you approve a merge.
- **Watchdog:** on, at 10:00.
- **No paid services or stored credentials** without your approval.

## 6. Not in this version
Auto-publishing, Canva automation, Google Drive or OneDrive copies, analytics. Each would need your approval, and most need connectors or credentials.
