# Your first automation: save email attachments to OneDrive with Power Automate

Week 2026-W49 · Drafted 22 November 2026 · From approved brief `02-research-brief.md`

Fact IDs in [square brackets] are for review only. Delete them before publishing. Nothing here has been published.

**SEO title (under 60 characters):** Save Email Attachments to OneDrive with Power Automate

**Meta description (under 155 characters):** A beginner's guide for UK small businesses: build a free Power Automate flow that saves invoice and receipt attachments to OneDrive.

**Suggested Blogger URL (custom permalink):** `power-automate-save-email-attachments-onedrive`

**Suggested labels:** Power Automate, Microsoft 365, Automation, Small business admin

---

If you run a small business, your inbox probably doubles as a filing cabinet. Invoices, receipts and order confirmations arrive as attachments, and finding the right one later means scrolling and searching.

This guide shows you how to build a simple automation that saves attachments from new emails into a OneDrive folder for you. You don't need any technical experience. I build Power Automate flows and work with Microsoft 365 regularly, and this is one of the first automations I suggest to people who are new to it.

[YOUR EXAMPLE: add one genuine example of a flow you've built or recommended, without client names or invented results, or delete this line]

## What is Power Automate?

Power Automate is Microsoft's tool for "when this happens, do that" automations. Each automation is called a flow. A flow starts with a **trigger** (the event that starts it, such as a new email arriving) followed by one or more **actions** (what you want to happen next, such as saving a file).

## What you need, and what it costs

You'll need a Microsoft 365 business account, the kind you sign in to with your work email, using Outlook and OneDrive for Business.

Microsoft says basic Power Automate is included at no cost for work or school accounts. The free licence lets you create and run cloud flows, but only with **standard connectors** [F1]. A connector is how Power Automate talks to an app. Both Office 365 Outlook and OneDrive for Business are listed as standard connectors [F3, F4], so this flow doesn't need anything extra.

Two restrictions are worth knowing:

- **You can't share flows on the free licence.** It covers creating and running flows "without sharing" [F1], so this flow is just for you.
- **Premium features cost extra.** Premium connectors and more advanced automation need a paid Power Automate licence or pay-as-you-go billing [F2]. Stick to the steps below and you won't need them. If Power Automate ever asks you to upgrade, stop and check before you agree.

## Before you start: think about confidential information

Invoices and receipts often contain personal data and financial details, such as names, addresses and bank information. Before you automate anything:

- **Keep the folder private.** Don't share your "Invoices inbox" folder with anyone who doesn't need it.
- **Only save what you need.** If you get lots of attachments that aren't business records, narrow the flow down later (see the tips at the end).
- **Clear out old files.** Don't keep records longer than you need to, and delete what you no longer need.

## Step by step: build the flow from scratch

**Step 1: create a folder in OneDrive.**
Open OneDrive with your work account and create a new folder called **Invoices inbox**. This is where your attachments will go.

**Step 2: open Power Automate and start a blank flow.**
Sign in to Power Automate with your work account [CHECK LINK: add the Power Automate sign-in address you use]. In the menu on the left, select **My flows**, then **Create from blank**. You'll see a box on the screen that says **Add a trigger** [F11].

**Step 3: choose the trigger.**
Select **Add a trigger**. In the search box, type "new email" and choose **When a new email arrives (V3)**, which belongs to Office 365 Outlook [F3, F11]. If you're asked to sign in, select **Sign in**. This connects Power Automate to your mailbox [F11].

**Step 4: change two important settings.**
In the trigger's settings, open **Show advanced options** and set:
- **Only with Attachments** to **Yes**, so the flow only runs for emails that have attachments [F5]
- **Include Attachments** to **Yes**. This one matters. If it's left on No, the attachment content is empty, and the step that saves the file will fail [F5].

**Step 5: add the action that saves the file.**
Select the plus sign (**+**) below the trigger, search for "create file" and choose **Create file** from OneDrive for Business [F4, F11]. Then fill in:
- **Folder path:** choose your **Invoices inbox** folder
- **File name:** select the lightning bolt and pick the attachment's name from the list [F11]
- **File content:** select the lightning bolt and pick the attachment's content [F11]

**Step 6: save the flow.**
Give your flow a clear name, such as "Save email attachments to Invoices inbox", and save it.

If you have Copilot in Power Automate, Microsoft says you can also describe the flow in plain English and let Copilot build a first draft [F11]. You'd still need to check the two settings in Step 4.

## How to test it

1. Send yourself an email from another address with a PDF attached.
2. Wait a few minutes, then check your **Invoices inbox** folder in OneDrive.
3. Open the file to check it isn't empty.
4. In Power Automate, open your flow and look at its run history. Microsoft says it shows when each run started, how long it took and its status [F12].

The flow acts on new emails as they arrive, so it won't go back and file attachments that are already in your inbox.

## If something goes wrong

- **The file is missing or empty:** go back to the trigger and check **Include Attachments** is set to **Yes** [F5].
- **The flow failed:** Microsoft emails repair tips to the flow's owner when a flow fails, with a description of what happened and a link to retry [F12]. The run history shows which step went wrong [F12].
- **It struggles when lots of emails arrive at once:** Microsoft notes that with Include Attachments on, the trigger can time out when many emails with attachments arrive around the same time, and suggests a different approach using the "Get Attachment (V2)" action [F6]. For most small businesses this won't come up. If it does, that's a good moment to ask for help.
- **Too many attachments you don't need:** consider narrowing the flow down, for example to emails from your regular suppliers, so the folder only holds records you actually want.

## Why this helps with record keeping

If you're self-employed, HMRC says you must keep your records for at least 5 years after the 31 January submission deadline for the relevant tax year [F8]. Under Making Tax Digital for Income Tax, you still need to keep supporting documents, such as bank statements and invoices, that you used to prepare your tax return [F9]. A tidy folder of saved attachments makes those documents easier to find.

This flow is a filing helper, not a bookkeeping system. Keeping complete and accurate records is still your responsibility.

**Limited companies have different rules.** GOV.UK says limited companies must keep records for 6 years from the end of the last company financial year they relate to, and that HMRC can fine a company £3,000, or a director can be disqualified, for not keeping accounting records [F10]. If you run a limited company, check the [GOV.UK guidance on company and accounting records](https://www.gov.uk/running-a-limited-company/company-and-accounting-records).

## Your next step

Set aside some time this week, build the flow and send yourself one test email. Once you've seen it work, you'll understand what "automation" means in practice, and you'll probably start spotting other repetitive jobs it could handle.

If you'd like help working out which automations would make the biggest difference in your business:

Discover how I can help your business at https://charlottebjuren.com/

---

## Sources

Checked on 22 November 2026. Microsoft's screens and licensing can change, so check the latest versions.

- [Microsoft Learn: Types of Power Automate licences](https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types)
- [Microsoft Learn: Create a cloud flow in Power Automate](https://learn.microsoft.com/en-us/power-automate/get-started-logic-flow)
- [Microsoft Learn: Office 365 Outlook connector](https://learn.microsoft.com/en-us/connectors/office365/)
- [Microsoft Learn: OneDrive for Business connector](https://learn.microsoft.com/en-us/connectors/onedriveforbusiness/)
- [Microsoft Learn: Issues triggering emails with attachments](https://learn.microsoft.com/en-us/troubleshoot/power-platform/power-automate/flow-run-issues/issues-triggering-emails-with-attachments-from-shared-mailbox)
- [Microsoft Learn: Troubleshoot a cloud flow](https://learn.microsoft.com/en-us/power-automate/fix-flow-failures)
- [GOV.UK: How long to keep your records (self-employed)](https://www.gov.uk/self-employed-records/how-long-to-keep-your-records)
- [GOV.UK: Making Tax Digital for Income Tax: keep digital records](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/keep-digital-records)
- [GOV.UK: Running a limited company: company and accounting records](https://www.gov.uk/running-a-limited-company/company-and-accounting-records)

---

**Blog review:** facts limited to the approved brief (F1-F12). Built from scratch, with no reliance on the Templates menu. Licensing limits and possible extra costs explained, with no prices. Personal data warning included. Test and troubleshooting sections included. No time-saving claims. CTA 2 used once. Placeholders: `[YOUR EXAMPLE]` and `[CHECK LINK]`.
