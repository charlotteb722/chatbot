# Research brief: Your first automation. Save email attachments to OneDrive with Power Automate

Week 2026-W49 · Researched 22 November 2026 · Approved idea: 2 · Platform overrides: none

## How to approve

Check the verified facts below. Edit, delete or move anything you're not happy with. Then add this line on its own, with no spaces before it, and run `/content-pack draft blog` (or tell Claude):

    APPROVED

---

## Summary

Power Automate lets you build "when this happens, do that" automations between Microsoft apps. Microsoft says basic Power Automate is included at no cost for work or school accounts, and the free licence covers creating and running cloud flows with standard connectors. Office 365 Outlook and OneDrive for Business are both standard connectors, so a small business on Microsoft 365 can build a flow that saves email attachments, such as invoices and receipts, into a OneDrive folder automatically. Microsoft's documentation explains the two trigger settings that make this work and one common cause of failure. The UK hook: HMRC says self-employed people must keep records, including supporting documents such as invoices, for at least 5 years after the 31 January deadline. That makes tidy, automatic filing genuinely useful.

## Audience

UK sole traders and small businesses using Microsoft 365 with a **work account** (Outlook and OneDrive for Business), who receive invoices, receipts or orders by email. They have no technical background, so the steps must be plain and safe to test. The tax-record facts apply to **self-employed people**. Limited companies have different rules, which weren't researched.

## Verified facts

All pages were opened and read on 22 November 2026 with the agent's read-only page reader. All sources are primary.

| ID | Fact | Source | Published / updated | Accessed | Type |
|---|---|---|---|---|---|
| F1 | "Using basic Power Automate capabilities is included at no cost for work or school accounts in a Microsoft Entra tenant. The Power Automate Free license includes creating and running cloud flows (without sharing)... Connector usage is limited to standard connectors only." | [Microsoft Learn: Types of Power Automate licences](https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types) | updated 22 Sep 2026 | 22 Nov 2026 | primary |
| F2 | "Other licenses across Microsoft 365, Dynamics 365, and the Power Platform include a limited set of Power Automate capabilities." Premium features need a paid Power Automate licence (Premium, Process or pay-as-you-go). | same as F1 | 22 Sep 2026 | 22 Nov 2026 | primary |
| F3 | The Office 365 Outlook connector is listed as **Standard**, available in "All Power Automate regions". Its triggers include "When a new email arrives (V3)". | [Microsoft Learn: Office 365 Outlook connector](https://learn.microsoft.com/en-us/connectors/office365/) | not shown | 22 Nov 2026 | primary |
| F4 | The OneDrive for Business connector is listed as **Standard**, available in all Power Automate regions except China Cloud operated by 21Vianet. Its actions include "Create file". | [Microsoft Learn: OneDrive for Business connector](https://learn.microsoft.com/en-us/connectors/onedriveforbusiness/) | not shown | 22 Nov 2026 | primary |
| F5 | Trigger settings: "Only with Attachments": if Yes, "it will trigger on emails with attachments". "Include Attachments": if No, "it will not include the attachments content (it will be set to null)", which makes a Create File action fail. If Yes, the file created "will contain the attachment content". Both are under "Show Advanced Options". | [Microsoft Learn: Issues triggering emails with attachments](https://learn.microsoft.com/en-us/troubleshoot/power-platform/power-automate/flow-run-issues/issues-triggering-emails-with-attachments-from-shared-mailbox) | updated 31 Jan 2024 | 22 Nov 2026 | primary |
| F6 | Microsoft's caution: setting Include Attachments to Yes makes the connector wait for all attachments to download, and "When many emails with attachments arrive around the same time, the connector can timeout". The suggested alternative is the "Get Attachment (V2)" action. | [Microsoft Learn: Office 365 Outlook connector](https://learn.microsoft.com/en-us/connectors/office365/) | not shown | 22 Nov 2026 | primary |
| F7 | Templates are "a good way to get started". You can search all templates, then follow the steps and confirm your connections. You can also create a cloud flow "from scratch" if you can't find a template. To start: sign in to Power Automate and select **Templates** on the left. | [Microsoft Learn: Create a cloud flow from a template](https://learn.microsoft.com/en-us/power-automate/get-started-logic-template) | updated 5 Sep 2023 | 22 Nov 2026 | primary |
| F8 | Self-employed: "You must keep your records for at least 5 years after the 31 January submission deadline of the relevant tax year. HM Revenue and Customs (HMRC) may check your records". | [GOV.UK: Business records if you're self-employed: how long to keep your records](https://www.gov.uk/self-employed-records/how-long-to-keep-your-records) | not shown | 22 Nov 2026 | primary |
| F9 | Under Making Tax Digital for Income Tax: "You still need to keep original records or supporting documents (or copies of them) that you have used to prepare your tax return, such as bank statements and invoices." | [GOV.UK: Use Making Tax Digital for Income Tax: keep digital records](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/keep-digital-records) | updated 18 Nov 2026 | 22 Nov 2026 | primary |

## Assumptions and interpretation

- **A1.** A small business on Microsoft 365 with a work account can build this flow at no extra cost, because it uses only standard connectors (F1, F3, F4). Readers on personal Microsoft accounts aren't covered.
- **A2.** The flow is a filing helper, not a bookkeeping system. It saves copies into a folder. Keeping records correctly for HMRC is still the business owner's responsibility (F8, F9).
- **A3.** Because the trigger is "When a new email arrives" (F3), the flow will act on emails that arrive after it's switched on, not on old emails already in the inbox. Microsoft Q&A answers say the same, but they're community replies.
- **A4.** A sensible first version: trigger on "When a new email arrives (V3)" with Only with Attachments and Include Attachments set to Yes (F5), then "Create file" in a OneDrive folder such as "Invoices inbox" (F4). Test it by sending yourself an email with a PDF. The exact step-by-step screen wording isn't in an official Microsoft tutorial, so the blog should describe the steps in general terms and name the trigger, settings and action exactly as Microsoft's documentation does.
- **A5.** For busier inboxes, a filter (for example, only emails from a particular supplier) reduces clutter and the timeout risk in F6. This is practical advice.
- **A6.** The template gallery wasn't opened (its site isn't on the research allowlist), so the content shouldn't name a specific template. It can say "search the templates for 'save attachments'", which is advice.
- **A7.** No claims about time saved.

## Unverified or conflicting (do not use)

| Claim | Where seen | Why it's excluded |
|---|---|---|
| A template named "Save email attachments from Outlook.com to OneDrive for Business" | Template gallery, via search | Not opened (site not allowlisted). It's also for Outlook.com, not work accounts |
| "Power Automate only applies to new emails" | Microsoft Q&A community answers | Community, not official. Used only as interpretation A3, via the trigger name |
| Files saved as corrupted or 4-byte files, and fixing with "Get attachment content" | Microsoft Q&A | Community reports, not opened |
| Limited companies' record-keeping period | Not researched | Out of scope. The content refers to self-employed people only |
| Making Tax Digital thresholds and dates | GOV.UK news, via search | Not opened. Not needed for the message |

## Suggested practical takeaway

Create one folder in OneDrive called "Invoices inbox". In Power Automate, build a flow that starts with "When a new email arrives (V3)", set Only with Attachments and Include Attachments to Yes (F5), and add OneDrive's "Create file" to save each attachment into that folder (F4). Send yourself a test email with a PDF and check it arrives in the folder.

## Recheck before drafting

- [Microsoft Learn: Types of Power Automate licences](https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types): F1, F2
- [GOV.UK: Making Tax Digital, keep digital records](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/keep-digital-records): F9, updated 18 Nov 2026

## Things to check

1. **Technical depth:** the audience isn't technical. I'd suggest the blog gives a clear walkthrough naming Microsoft's exact settings, while the social posts stay simple ("one folder, one flow, one test email").
2. **Your own experience:** you work with Power Automate. A placeholder will be left for a genuine example of your own (no invented results).
3. **Tax wording:** the HMRC facts are for self-employed people. Should the content mention limited companies at all? My suggestion is a single line: "if you run a limited company, check the rules that apply to you".
4. **The template guide (F7)** dates from 2023. It's only used for the general "start from Templates" point, which Power Automate still offers. Before posting, check that the menu label is still "Templates" in your own account.
