# Run log: 2026-W49-auto-test

- **Run type:** manual auto (full end-to-end run requested by Charlotte, no approvals between stages). No test scenario.
- **Started:** 22 November 2026 13:38 UK (container clock)
- **Status:** READY WITH NOTES
- **Topic:** Got an AI-written data request? What the ICO says small businesses must do
- **Finished:** 22 November 2026 13:42 UK (container clock)

## Timeline

| Time (UK) | Stage | What happened |
|---|---|---|
| 13:38 | A0 Set up | On `claude/content-packs`. Created a new folder (no earlier packs touched). Topics to avoid: Gemini in Gmail, Businesses in ChatGPT, Copilot Chat, Power Automate attachments. |
| 13:38 | A1 Ideas | 2 new searches (ICO and GOV.UK, Anthropic), plus leads verified earlier today. 5 candidates, all lead sources opened. |
| 13:39 | A2 Select | Idea 1 selected automatically (23/25). Runners-up: 3 (22) and 2 (21). |
| 13:39 | A3 Research | 3 ICO pages opened, 15 verified primary facts. |
| 13:39 | A3 Gate | PASS. 15 facts, all primary. UK applicability: UK GDPR guidance from the UK regulator. No product features recommended. |
| 13:40 | A4 Draft | ICO page rechecked and unchanged. LinkedIn, Facebook, Instagram, an 8-slide carousel, 3 image concepts and a blog (15 facts and a how-to angle, so the blog was included). |
| 13:41 | A5 Package | Built `05-publication-copy.md` and wrote `06-canva-instructions.md`. |
| 13:41 | A6 Quality | `checks.py` 29/29 on round 1. |
| 13:42 | A7 Save | Commit and push to `claude/content-packs` (result in the final summary). |

Times come from the container clock. Real elapsed time was longer.

## Verification gate

| Topic tried | Verified facts | Primary | UK availability | Result |
|---|---|---|---|---|
| 1. AI-written SARs | 15 | 15 | UK law and regulator. Not applicable to product features | PASS |

## Sources opened

| URL | Method | Result |
|---|---|---|
| https://ico.org.uk/.../2026/11/subject-access-requests-generated-by-artificial-intelligence/ | fetch.sh | OK (opened twice: research and recheck) |
| https://ico.org.uk/.../how-do-we-recognise-a-subject-access-request-sar/ | fetch.sh | OK |
| https://ico.org.uk/.../subject-access-request-advice/ | fetch.sh | OK |
| https://ico.org.uk/global/contact-us/contact-us-sme/ | fetch.sh | OK (navigation only, not used) |
| https://ico.org.uk/.../2026/05/five-steps-to-protect-your-organisation-from-ai-powered-cyber-threats/ | fetch.sh | OK (idea 2 lead) |
| https://www.gov.uk/government/collections/cyber-security-guidance-for-business | fetch.sh | OK (idea 2 lead) |
| Ideas 3-5 leads | fetch.sh | Opened earlier on 22 November 2026, as recorded in 01-ideas.md |

## Quality gate

Round 1: 29/29 PASS.

## Notes for Charlotte

- **Why READY WITH NOTES:** please check your own website's privacy page and decide on a not-legal-advice line for the social posts.
- **charlotte-style:** loaded earlier in this session.
- **Nothing published, no connectors, `main` untouched.**
