---
name: discovery-call-summary
description: Use this skill after a client discovery call to turn raw notes or a transcript into a structured account-plan summary — process inventory, pain points, and a prioritized next-steps list.
---

# Discovery Call Summary

## Objective

Turn messy discovery-call notes (typed notes, a transcript, or a voice-to-text dump) into a clean, structured summary that can go straight into a scope doc or account plan — without losing the specifics the client actually said.

## Expected input

- Raw notes or a transcript from a single discovery call.
- Optional: the client's name/company and the engagement type, if not obvious from the notes.

If the input is a transcript with multiple speakers, identify which speaker is the client vs. the consultant before summarizing — attribute quotes and pain points to the client only.

## What to produce

Output a single Markdown document with these sections, in this order:

1. **Summary** — 2-3 sentences on what the client is trying to solve, in plain language, no jargon.
2. **Current process** — a short bulleted inventory of how the client does this today (tools, people, manual steps). Only include what was actually mentioned; don't infer steps that weren't discussed.
3. **Pain points** — bulleted, each one tied to a specific thing the client said (paraphrase, don't invent). Rank roughly by how much friction/cost they implied it causes.
4. **Constraints** — anything mentioned that limits the solution: budget signals, timeline, existing tools that must be kept, compliance/data-sensitivity notes, stakeholders who need sign-off.
5. **Open questions** — things that came up but weren't resolved on the call and need following up before scoping.
6. **Suggested next steps** — 2-4 concrete next actions (e.g. "send a scoping doc covering X and Y," "loop in their data lead before proposing an integration").

## Formatting rules

- Use Markdown headers exactly as listed above, in that order, every time — this keeps output diffable across calls and easy to paste into a template.
- Keep bullets short (one line each where possible). This is a working document, not a transcript.
- Do not add sections beyond the six above.
- If a section has nothing to report (e.g. no constraints were mentioned), keep the header and write "None mentioned" rather than omitting it — makes it obvious it wasn't just forgotten.

## Edge cases

- **Multiple distinct problems raised on one call**: group pain points by problem area with a sub-heading under "Pain points" rather than forcing everything into one flat list.
- **Vague or contradictory notes**: flag the ambiguity directly in "Open questions" rather than guessing at what was meant.
- **No clear next steps discussed**: still propose 2-3 reasonable next steps based on what's unresolved, and note they're suggested rather than agreed with the client.
