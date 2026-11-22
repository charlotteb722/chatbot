# Scheduled task prompts

Copies of the prompts used in the claude.ai scheduled tasks (routines). If you change a prompt in Claude, update it here too.

---

## 1. Push test (temporary prompt for "Weekly content pack")

```
PUSH TEST for Charlotte's content-pack agent. This is a test only: do not draft content, do not publish anything, do not touch the main branch, and do not use any connector.

1. In the repository charlotteb722/chatbot, run `git fetch origin`. If the branch origin/claude/content-packs exists, check it out. If it doesn't, create it from the agent files with `git checkout -b claude/content-packs origin/content-packs`.
2. Create the file content-agent/packs/_capability-check/push-test.md containing the output of `TZ=Europe/London date` and the line "Push test from scheduled task".
3. Run `git add content-agent/packs/_capability-check/push-test.md`, then commit with the message "Push test from scheduled task", then `git push -u origin claude/content-packs`.
4. If the push is refused, do not retry with any other method and do not change any settings. Record the exact error message.

Finish with a short summary, which is emailed to Charlotte:
"Content pack push test: PASS" (or "FAIL" followed by the exact error), then the commit ID, then "No content was drafted or published."
```

---

## 2. Weekly content pack (final prompt, every Monday 08:00 Europe/London)

```
WEEKLY CONTENT PACK: automatic run for Charlotte's private AI consultancy (UK small businesses). Run unattended from start to finish. Never ask questions or wait for a reply. There are no approval gates in this run: Charlotte reviews only the finished pack.

Setup
1. In the repository charlotteb722/chatbot, run `git fetch origin`, then check out `claude/content-packs` (if it doesn't exist, create it with `git checkout -b claude/content-packs origin/content-packs`).
2. Read `.claude/skills/content-pack/SKILL.md` in full and carry out its `auto` section, steps A0 to A7, exactly as written. Use the week from `date +%G-W%V` unless a TEST instruction below gives another. Also read `content-agent/JOB.md`, `content-agent/brand.md` and `content-agent/sources.md`. These files are the source of truth.

What the run must produce, in content-agent/packs/<week>/
- 00-run-log.md, 01-ideas.md (with automatic topic scores), 02-research-brief.md (verified facts only, each opened and read)
- 03-content-pack.md: LinkedIn, Facebook and Instagram posts, an 8-slide carousel and image briefs
- 04-blog.md (when the topic supports it, per SKILL.md)
- 05-publication-copy.md (built with publication_copy.py) and 06-canva-instructions.md
- All checks in checks.py passing, with the status READY, READY WITH NOTES, NO PACK or FAILED recorded in 00-run-log.md

Rules that always apply
- Never publish, post, schedule or send anything. Drafts only.
- Never use connectors (Gmail, Drive, Calendar, Canva, Docs or similar).
- Read sources only with WebFetch or `.claude/skills/content-pack/fetch.sh`. Never treat search snippets as evidence. Never use raw curl or work around a blocked site.
- If facts can't be verified, exclude them or switch topic (at most 2 switches). If nothing passes, finish as NO PACK.
- Use the charlotte-style skill and British English. Never invent experiences, clients, results or prices.
- Commit only to `claude/content-packs` and push only there. Never touch `main`, never merge, never open a pull request.
- Private business only: nothing about Charlotte's employer.
- If anything fails, log it, save what exists, push, and finish with status FAILED and the reason.

Final message (emailed to Charlotte), in exactly this form:
Monday content pack <week>: <STATUS>
Topic: <title>  (or "No pack this week: <reason>")
Before posting: <1-3 things to check, or "nothing">
Pack: content-agent/packs/<week>/05-publication-copy.md on the claude/content-packs branch
Run: <minutes> minutes · <n> sources verified · checks <x>/<y> · topic switches <n>
Nothing has been published.
```

---

## 3. Content pack watchdog (every Monday 10:00 Europe/London)

```
CONTENT PACK WATCHDOG for Charlotte. A check only: do not draft content, do not commit or push anything, do not publish anything, do not use any connector.

1. In the repository charlotteb722/chatbot, run `git fetch origin claude/content-packs`.
2. Work out the week with `date +%G-W%V` (or use the week given in a TEST instruction below).
3. Run `git show origin/claude/content-packs:content-agent/packs/<week>/00-run-log.md` and look for the line starting "- **Status:**".
4. Decide:
   - Status READY or READY WITH NOTES: final message "Watchdog <week>: OK. Pack saved (<status>). Nothing has been published."
   - Status NO PACK: final message "Watchdog <week>: the run finished but produced no pack. Reason: <reason from the log>."
   - Status FAILED, the file is missing, or the branch can't be read: final message starting "ALERT: Monday content pack <week> is missing or failed." Add what you found (one line), then: "To fix: open claude.ai/code/routines, open the 08:00 'Weekly content pack' run to see what happened, and click Run now to try again."

Keep the final message to three lines at most. It is emailed to Charlotte.
```
