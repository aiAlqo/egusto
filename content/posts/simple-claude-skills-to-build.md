---
title: "How to Create Claude Skills: 3 Simple Custom Skills Anyone Can Build (With SKILL.md Examples)"
description: "Learn how to create Claude skills with three copy-ready SKILL.md examples — a writing-voice skill, a meeting-notes formatter and a weekly status report — plus install steps, benefits and fixes for skills that won't trigger."
date: 2026-09-23
tags: ["claude-skills", "agent-skills", "skill-md", "claude-code", "ai-workflow-automation", "prompt-engineering"]
cover: "/images/posts/simple-claude-skills-to-build-cover.jpg"
draft: false
---

**Claude skills are reusable instruction folders that teach Claude a procedure once, so you never have to paste it into chat again.** The three simple Claude skills most worth building first are a **writing-voice skill**, a **meeting-notes-to-actions formatter** and a **weekly Progress/Plans/Problems status report**. For creators, a **content-repurposing skill** is a strong swap-in. Each is a single `SKILL.md` file of plain Markdown. None needs code, and each takes well under an hour to write.

## Key takeaways

- **What a Claude skill is:** a folder with one `SKILL.md` file. Claude always sees its short description (roughly **100 tokens per skill**) and loads the full instructions only when a task matches ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)).
- **Why these three:** they share the traits Anthropic says make a skill worthwhile. You use them often, they have a fixed output format, and they hold personal knowledge Claude cannot guess, such as your voice, your team's decision format or your manager's preferred update shape ([Claude blog: Lessons from building Claude Code](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills)).
- **The benefit that holds up best is structural:** consistent output, no more re-prompting, and near-zero context cost while a skill sits unused.
- **Time-savings claims are anecdotal.** Individual creators report halving their writing time and cutting weekly formatting from an hour to five minutes, but there is **no independent study** yet comparing skills with plain prompting.
- **The honest limits:** a description that fails to trigger the skill, no automatic sync between the Claude app, Claude Code and the API, and supply-chain risk from third-party skills. Writing your own instruction-only skills avoids most of that risk.

## What are Claude skills and how do they work?

**A Claude skill is a folder containing a `SKILL.md` file that Claude opens only when the task calls for it.** The file holds instructions, and optional subfolders hold templates, references or scripts.

### Claude skill structure: the anatomy of a SKILL.md file

A skill is a directory with one required file, `SKILL.md`. The file opens with YAML frontmatter and continues with free-form Markdown instructions. Optional subfolders such as `scripts/`, `references/` and `assets/` can hold code, longer documentation and templates ([agentskills.io Specification](https://agentskills.io/specification)).

The frontmatter needs only two fields:

- **`name`** — up to 64 characters of lowercase letters, digits and hyphens. It must match the folder name.
- **`description`** — up to 1,024 characters. It should say what the skill does and when to use it ([agentskills.io Specification](https://agentskills.io/specification)).

Anthropic adds two rules. Names may not contain the reserved words "anthropic" or "claude", and neither field may contain XML tags ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)).

One conflict matters if you upload to the Claude app. The Help Center article on custom skills caps descriptions at **200 characters**, while the spec and platform docs allow 1,024 ([Claude Help Center: How to create custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)). Until that is settled, keep descriptions under 200 characters. Every sample below does.

### Claude Code skills vs Claude app skills: frontmatter differences

Claude Code is more permissive than the other surfaces. Every frontmatter field is optional there, and it adds its own fields such as `disable-model-invocation`, `argument-hint`, `context: fork` and `paths`.

The docs warn that uploading a skill with Claude Code-only fields to claude.ai "cause[s] hard errors" ([Claude Code Docs: Extend Claude with skills](https://code.claude.com/docs/en/skills)). The samples in this guide use only `name` and `description`. They work unchanged in the app, Claude Code, the API and the growing list of other agents that support the open Agent Skills standard.

### Progressive disclosure: why you can install dozens of skills

**Skills load in three tiers, so idle skills cost almost nothing.**

1. **Metadata:** at startup Claude reads only each skill's name and description, roughly 100 tokens per skill.
2. **Body:** when a request matches a description, Claude reads the full `SKILL.md` body. Anthropic recommends keeping it **under 5,000 tokens or 500 lines**.
3. **Bundled files:** reference files and scripts cost "zero until accessed", and a script contributes only its output, never its source ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)).

Anthropic compares this to "a well-organized manual that starts with a table of contents, then specific chapters, and finally a detailed appendix" ([Anthropic Engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)). Simon Willison puts the practical effect this way: each idle skill costs "only a few dozen extra tokens", whereas "GitHub's official MCP on its own consumes tens of thousands of tokens" ([Simon Willison](https://simonwillison.net/2025/Oct/16/claude-skills/)).

The consequence for a builder: the description is the only part Claude sees before deciding whether to use a skill. It is both the trigger and the only standing cost. The final section covers how to write it.

### How to install Claude skills in the app, Claude Code and the API

| Surface | Where the skill lives | How to install | Notes |
|---|---|---|---|
| Claude app (web, desktop, mobile) | Your account | Turn on Settings > Capabilities > "Code execution and file creation", then Customize > Skills > "+" > "Create skill" > "Upload a skill" and pick a ZIP whose root is the skill folder | Team/Enterprise owners must first enable Skills and code execution in Organization settings ([Help Center: Use skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude)) |
| Claude Code | `~/.claude/skills/<name>/SKILL.md` (personal) or `.claude/skills/<name>/SKILL.md` (project, committed to the repo) | Create the folder and save the file; changes are picked up without a restart. Call it with `/<name>` or let Claude invoke it | `/skills` lists skills; plugins can bundle them ([Claude Code Docs](https://code.claude.com/docs/en/skills)) |
| Claude API | Your workspace | `POST /v1/skills`, then attach via `container.skills` with the code-execution tool; up to **20 skills per request**, 30 MB upload limit | No network access or runtime package installs in the sandbox ([Skills API guide](https://platform.claude.com/docs/en/build-with-claude/skills-guide)) |
| Claude Agent SDK | Filesystem, same folders as Claude Code | Include `"user"` and `"project"` in `setting_sources`; include `"Skill"` in any explicit tool list | No programmatic registration ([Agent SDK skills](https://code.claude.com/docs/en/agent-sdk/skills)) |

**Which plans support Claude skills?** Anthropic's pages disagree. The Help Center lists skills on "Free, Pro, Max, Team, and Enterprise plans" with code execution required, while the platform docs list only paid plans for claude.ai ([Help Center](https://support.claude.com/en/articles/12512180-use-skills-in-claude); [Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)). Assume a paid plan if you plan to upload custom skills.

**Do Claude skills sync between the app and Claude Code?** Only one way. Skills uploaded to claude.ai sync down into signed-in Claude Code sessions about **every 10 minutes**, landing in `~/.claude/skills/synced/`. Nothing syncs in the other direction, and local edits to synced copies are overwritten at the next sync ([Claude Code Docs](https://code.claude.com/docs/en/skills)).

The practical workflow: draft and iterate a skill locally in Claude Code, where edits take effect instantly. Then upload the finished version to the app once so both surfaces share it.

### Claude skills vs Projects vs MCP vs CLAUDE.md

**Skills are the "how", not the "what" or the "where".** Anthropic sums up the division of labor in one line: "Projects say 'here's what you need to know.' Skills say 'here's how to do things'" ([Claude blog: Skills explained](https://claude.com/blog/skills-explained)). MCP supplies access to tools and data, and skills supply the method for using them: "MCP for access, Skills for methodology" (same source).

In Claude Code, the rule of thumb is to "create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat". If a section of `CLAUDE.md` "has grown into a procedure rather than a fact", it should become a skill, because a skill's body "loads only when it's used" ([Claude Code Docs](https://code.claude.com/docs/en/skills)). Custom slash commands have also been merged into skills, so any reusable Claude Code workflow now belongs in a `SKILL.md` (same source).

| Tool | Loads | Best for |
|---|---|---|
| Custom instructions / Project knowledge / `CLAUDE.md` | Every conversation in scope | Facts and conventions that are always relevant |
| MCP server | Tool schemas are always present | Reaching external systems |
| Subagent | On delegation, in its own context | Isolated, parallel execution |
| Skill | Description always; body only on match | Repeatable procedures, formats and personal know-how |

![Filing cabinets full of folders, with one folder lit up and open on a shelf, representing progressive disclosure — only the relevant skill loads instead of the entire library.](/images/posts/simple-claude-skills-to-build-body-1.jpg)

## Claude skill example 1: a writing-voice skill that makes Claude sound like you

**A writing-voice skill ends the "make it sound like me" loop by storing your tone, vocabulary and real samples in one file Claude applies automatically.**

### What the writing-voice skill does

A voice skill captures how you write: tone, sentence rhythm, the words you use and avoid, formatting habits and a few real samples. Claude then applies that voice whenever it drafts or edits something for you.

It is the personal skill practitioners mention most often. Daria Cupareanu built a "Voice DNA" skill of roughly 3,500 words that analyzes tone, rhythm, sentence patterns, vocabulary and stylistic conventions. She pairs it with separate Audience Profile and Business Profile skills and reports that the combination carries over to LinkedIn posts and email sequences ([Cupareanu, AI Blew My Mind](https://aiblewmymind.substack.com/p/claude-skills-ai-write-like-you)).

Anthropic's own `brand-guidelines` skill is the visual counterpart: a 73-line, Markdown-only file of color tokens and typography rules ([anthropics/skills](https://github.com/anthropics/skills)). A creator can combine both into a single brand kit.

### Sample SKILL.md: writing-in-my-voice

Save this as `writing-in-my-voice/SKILL.md`. Replace every bracketed placeholder with your own material; the samples matter more than the rules.

```markdown
---
name: writing-in-my-voice
description: Drafts and edits text in the user's personal writing voice. Use whenever the user asks to write, draft, rewrite or polish a post, email, newsletter, script or bio, even if voice isn't mentioned.
---

# Writing in my voice

Apply this voice to anything drafted or edited on my behalf. The voice
rules below override Claude's default style. Content accuracy and the
user's explicit instructions in the conversation override the voice.

## Who I am and who I write for
- I am [one line: e.g. "an indie developer who builds and teaches AI workflows"].
- My readers are [e.g. "working builders who want practical steps, not hype"].
- They should finish every piece knowing one thing they can do today.

## Voice in five traits
1. **Direct.** Lead with the point. No throat-clearing openers.
2. **Concrete.** Prefer a number, a tool name or an example over an adjective.
3. **Warm but not gushing.** Friendly, never salesy.
4. **Plain words.** Short Anglo-Saxon words beat long Latinate ones.
5. **Opinionated.** Take a position and give the reason in the same sentence.

## Rhythm and structure
- Mix sentence lengths: mostly 8-18 words, with an occasional 3-5 word punch.
- Paragraphs of 1-3 sentences for social; up to 5 for newsletters.
- One idea per paragraph. Open with the claim, then the evidence.
- Use "I" and "you". Avoid "we" unless it means me and the reader.

## Vocabulary
- Words I use: [e.g. ship, build, messy, worth it, here's the thing]
- Words I never use: delve, unlock, game-changer, leverage (as a verb),
  in today's fast-paced world, it's worth noting, elevate, seamless
- Contractions: always.

## Formatting habits
- No emojis in body text. [Or: at most one, at the end.]
- Headings in sentence case.
- Bullets only for real lists of 3+ parallel items.
- Hashtags: [none / max 2 at the very end].

## Gotchas (things Claude gets wrong about my voice)
- Do not end with a question like "What do you think?" unless I ask.
- Do not add a summary paragraph that repeats the post.
- Do not soften opinions with "might" or "perhaps".
- Keep my British/American spelling: [choose one].

## Workflow
1. Identify the format (LinkedIn post, email, newsletter, script, bio).
2. Draft in the voice above, matching the closest sample below.
3. Self-check against the Gotchas list and the "never use" words; fix any hits.
4. Return the draft only, with no preamble. If the request was an edit,
   list changes in one short line after the draft.

## Samples of my real writing
Match these more closely than the rules above when they conflict.

### Sample 1: LinkedIn post
[paste a real post you are proud of]

### Sample 2: Newsletter opening
[paste 150-300 words]

### Sample 3: Short email
[paste one]
```

If the samples outgrow the file, move them into `writing-in-my-voice/samples.md` and add a line such as "Read samples.md before drafting." Anthropic's guidance is to keep references one level deep and to give reference files over 100 lines a table of contents, because Claude may only preview nested files partially ([Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)).

### How to install the writing-voice skill

- **Claude Code:** create `~/.claude/skills/writing-in-my-voice/`, save the file there and ask for a LinkedIn post. The skill should fire on its own, and `/writing-in-my-voice` forces it.
- **Claude app:** zip the folder so the folder itself is at the root of the archive (`zip -r writing-in-my-voice.zip writing-in-my-voice/`), then upload it under Customize > Skills. The upload also syncs the skill into any Claude Code session where you are signed in.

### Benefits of a writing-voice skill

**1. It encodes knowledge Claude cannot have by default.** That is Anthropic's main test for whether a skill earns its place. The company warns that "a skill that restates what Claude would do by default adds context without adding value" ([Claude blog](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills)). Your banned-words list and your samples are exactly the non-default information that changes the output.

**2. It replaces the most common re-prompt in creative work.** Without it, every chat begins with "write this like me, not like an AI" plus a pasted example, and the instructions vanish when the conversation ends. Anthropic's framing is that prompts "don't persist across conversations" and that repeated workflows should become skills ([Skills explained](https://claude.com/blog/skills-explained)).

**3. It compounds with other skills.** Claude loads every skill whose description matches, so the voice skill applies inside a repurposing job, a newsletter draft or a launch email without being named. Anthropic notes that "skills can build on each other" without explicit cross-references ([Help Center](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)).

**4. It beats putting the same text in custom instructions.** A 3,000-word voice guide in custom instructions is paid for in every conversation, including your debugging sessions. As a skill it costs a description line until you write something.

**Reported payoff:** Cupareanu says her voice, audience and business skills "cut my writing time in half", that first drafts land "80% there", and that "the skills hold the standard even when your energy doesn't" ([Cupareanu](https://aiblewmymind.substack.com/p/claude-skills-ai-write-like-you)). Treat these as one author's self-reported experience, not a benchmark. The last quote still names the most durable benefit: the skill sets a quality floor that does not depend on how carefully you prompt at 11 p.m.

## Claude skill example 2: a meeting-notes formatter that turns transcripts into owned actions

**A meeting-notes skill converts any transcript into the same fixed structure — recap, decisions, owned action items and open questions — every time.**

### What the meeting-notes skill does

This skill takes a raw transcript or messy notes and returns a short recap, the decisions made, action items each with an owner and a due date, and the open questions. Sid Saladi's version produces exactly that set of sections ([Sid Saladi](https://sidsaladi.substack.com/p/ai-meeting-notes-skill-101-turn-any)).

A Japanese practitioner's build for non-engineers adds count caps: 3–5 decisions ranked High/Medium/Low, 5–10 action items with assignee and deadline, at most 3 "homework" items for the next session, and Slack-ready formatting ([note.com AI転職ラボ](https://note.com/ai_careerlab/n/ne37a4f79ebf6?hl=en)). That build lives in a `CLAUDE.md` rather than a `SKILL.md`, but the content carries over directly.

### Sample SKILL.md: formatting-meeting-notes

```markdown
---
name: formatting-meeting-notes
description: Turns meeting transcripts or rough notes into a recap, decisions, owned action items and open questions. Use whenever the user shares a transcript, call notes or minutes, or asks what was decided.
---

# Formatting meeting notes

Convert a transcript or rough notes into the exact structure below.
Accuracy beats completeness: never invent an owner, date or decision.

## Workflow
1. Skim the whole input once before writing anything.
2. Identify attendees from speaker labels or mentions.
3. Extract decisions: statements where the group agreed, chose or
   committed. Ideas that were only discussed are NOT decisions.
4. Extract action items: any "I'll", "can you", "let's have X do Y",
   or task with an implied owner.
5. Extract open questions: unresolved disagreements, "we need to find out",
   parked topics.
6. Write the recap last.
7. Run the checklist at the bottom, then output.

## Output template (always use this exact structure)

**[Meeting name or topic] | [Date if known, else "Date: not stated"]**
Attendees: [names, comma-separated]

**Recap**
[3-6 lines. What the meeting was for and where it landed.]

**Decisions** (3-5, most important first)
1. [Decision] (Priority: High/Medium/Low)

**Action items**
| # | Owner | Action | Due |
|---|-------|--------|-----|
| 1 | [Name] | [Verb-first task] | [Date or "TBD"] |

**Open questions**
- [Question] (raised by [name] if known)

**Next session: prep** (max 3)
- [Item]

## Rules
- Owner unclear: write "Owner: TBD" and add it to Open questions.
- Due date unclear: write "TBD". Never guess a date.
- Relative dates ("next Friday"): convert only if the meeting date is
  known; otherwise keep the phrase in quotes.
- Action items start with a verb ("Send", "Draft", "Decide").
- Keep names exactly as spelled in the transcript.
- If fewer than 3 decisions exist, list only the real ones.
- If the user asks for Slack format: drop the table, use
  "• @Owner: action (due)" lines, and keep the whole thing under 25 lines.

## Checklist before output
- [ ] Every action item has an owner or "TBD"
- [ ] No decision appears that was only discussed
- [ ] Recap is 6 lines or fewer
- [ ] Nothing in the output is absent from the input
```

### How to install the meeting-notes skill

Install it the same way as the voice skill: save the file in `~/.claude/skills/formatting-meeting-notes/` for Claude Code, or zip the folder and upload it in the app. In the app, paste or attach a transcript and say "notes from this call". The description's trigger words ("transcript", "call notes", "minutes", "what was decided") should activate the skill without you naming it.

### Benefits of a meeting-notes skill

**Meeting notes are the textbook case for Anthropic's template pattern.** When the output format is strict and the input varies wildly, a skill that says "ALWAYS use this exact template structure" gives far more predictable results than an ad hoc request ([Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)). MindStudio's SOP guide makes the same point from the other side: "if you don't specify output format, Claude Code will pick one—and it may not be what you wanted" ([MindStudio](https://www.mindstudio.ai/blog/skill-creator-workflow-claude-code-sop-to-skill)).

The concrete gains:

- **Every action has a named owner**, which is where follow-up usually breaks down.
- **Notes read the same across meetings**, so collaborators know where to look.
- **Fewer hallucinated commitments.** The "never invent" rules and the checklist target the biggest risk in AI summaries.
- **Slack-ready output** lets the notes go straight into a channel.
- **Consistency compounds.** Because every set of notes has the same Decisions and Action items headings, you can later ask Claude to scan a month of notes for open items and get clean results.

**Reported speed gains are striking but self-reported.** Saladi turned a 71-minute transcript into "9 decisions, 14 owned action items, and a 6-line recap — in about 40 seconds" ([Sid Saladi](https://sidsaladi.substack.com/p/ai-meeting-notes-skill-101-turn-any)). The note.com author reports minutes for a 90-minute meeting in 11 seconds and a drop in weekly formatting time from 60 minutes to about 5 — roughly 47 hours a year by the author's estimate — and says the whole build took 30 minutes ([note.com](https://note.com/ai_careerlab/n/ne37a4f79ebf6?hl=en)).

The generation speed is simply how fast Claude is. The skill's real contribution is that the output is usable without a second round of "now put it in a table with owners".

![A chaotic pile of scattered notes and papers pouring into a single organized folder, next to a neat, squared-off stack of documents — messy input turned into a fixed, repeatable output structure.](/images/posts/simple-claude-skills-to-build-body-2.jpg)

## Claude skill example 3: a weekly status report skill (Progress, Plans, Problems)

**A weekly status skill produces a 30–60-second Progress/Plans/Problems update in the same strict format every week.**

### What the weekly status skill does

This skill writes the weekly update your manager, clients, collaborators or community actually read. It is adapted from Anthropic's own `internal-comms` skill, whose 3P file defines the **Progress, Plans, Problems** format for executives.

That file says the update should be "something you can read in 30-60sec or less", sets out a workflow (clarify the team and time period, gather information or ask the user, draft, review), and insists "the format is always the same, very strict formatting" ([anthropics/skills internal-comms](https://github.com/anthropics/skills/tree/main/skills/internal-comms)). The original skill is only **32 lines** and delegates to example files, which shows how small a genuinely useful skill can be ([anthropics/skills](https://github.com/anthropics/skills)).

### Sample SKILL.md: writing-weekly-status

```markdown
---
name: writing-weekly-status
description: Writes a weekly Progress/Plans/Problems status update. Use whenever the user asks for a weekly update, status report, check-in, stakeholder update or a summary of what they did this week.
---

# Writing a weekly status update (3P)

Produce an update a busy reader can absorb in 30-60 seconds.
The format never changes week to week; readers rely on that.

## Workflow
1. Confirm the reporting window. Default: last Monday through today for
   Progress; the coming Monday-Friday for Plans.
2. Confirm the audience: [default: "my manager"; alternatives: client,
   collaborators, newsletter subscribers]. Adjust jargon, not structure.
3. Gather material from what the user pasted: notes, commits, task lists,
   calendar, chat. If there is none, ask ONE question:
   "What shipped, what's next, and what's blocking you?"
4. Draft using the template. Then cut until it fits the length limits.
5. Run the checklist and output the update only.

## Template (strict)

**Weekly update: [Name/Project] | Week of [date]**

**Progress**
- [Outcome, not activity. "Shipped X" beats "worked on X". Include a
  number or link when available.]
(3-5 bullets)

**Plans**
- [Concrete deliverable + target day]
(2-4 bullets)

**Problems**
- [Blocker or risk] → [what I need / from whom / by when]
(0-3 bullets. If none: "No blockers this week.")

## Rules
- Whole update under 150 words.
- Lead each bullet with the result, then the detail.
- Move anything that is not an outcome, plan or problem to a
  "Notes" line at the end, or cut it.
- Never mark something "done" unless the input says it is done.
- Problems must include an ask; a problem without an ask is a Plan.
- Keep last week's wording for ongoing items so progress is trackable.

## Checklist
- [ ] Under 150 words
- [ ] Every Progress bullet is an outcome
- [ ] Every Problem has an owner and an ask
- [ ] Dates are specific (day or date, not "soon")
```

**Tip for Claude Code users:** add `disable-model-invocation: true` so the report runs only when typed as `/writing-weekly-status`. That is the pattern Claude Code recommends for workflows you want to trigger deliberately ([Claude Code Docs](https://code.claude.com/docs/en/skills)). The field is Claude Code-only, though, and would make the file fail to upload to the app. Keep it out of the copy you zip.

### How to install and share the weekly status skill

Installation matches the first two skills. For a team:

- **Claude Code:** commit it to `.claude/skills/writing-weekly-status/` in a shared repo.
- **Team and Enterprise plans:** an owner can provision it org-wide under Organization settings > Plugins & skills, or a user can share it with specific colleagues, who get view-only access ([Help Center: Provision and manage skills](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization)).

### Benefits of a weekly status report skill

**The 3P skill turns a chore that expands to fill 30 minutes into a fixed-length artifact.** Its benefits come from constraint more than generation:

- **Forced prioritization.** The word cap and the "outcome, not activity" rule force the choices a good update needs.
- **Updates that ask for help.** Requiring every Problem to carry an ask turns the update from a diary into a request.
- **Scannable and trackable.** The format is identical each week, so stakeholders learn to scan it, and you can later ask Claude to compare four updates and spot items that keep slipping.
- **The right level of freedom.** Reports sit in Anthropic's "medium freedom" band, where a template with parameters beats both loose guidance and rigid scripts ([Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)).

**Evidence for time saved is again anecdotal.** One reviewer who tested around 100 skills says the stock `internal-comms` skill "saves me ~30 minutes a day on Slack alone" ([Suraj Khaitan, DEV](https://dev.to/suraj_khaitan_f893c243958/i-tried-100-claude-skills-these-are-the-best-1m4a)). At company scale, Rakuten reports that skills applied to management accounting cut a task from "a day" to "an hour" ([VentureBeat](https://venturebeat.com/technology/how-anthropics-skills-make-claude-faster-cheaper-and-more-consistent-for)). That is a vendor-curated launch testimonial about a far heavier workflow. It shows the upper range of what is claimed, not what a status-report skill will do for you.

### Swap-in for creators: a content-repurposing Claude skill

**If you publish more than you report, replace the 3P skill with a repurposing skill that turns one long piece into several platform-native ones.**

MindStudio's pattern keeps only the process in `SKILL.md` (extract the ideas, then write a LinkedIn post, an X thread and a newsletter section) and moves `brand-voice.md`, `platform-formats.md` and an `examples/` folder into separate files. It also requires Claude to "identify the central argument or main point (1 sentence)" and "3–5 supporting ideas" before writing anything ([MindStudio](https://www.mindstudio.ai/blog/automate-content-repurposing-claude-code-skills)). With the voice skill installed, you can drop the brand-voice file and let the two skills compose.

```markdown
---
name: repurposing-content
description: Repurposes one long piece (video transcript, podcast, article) into a LinkedIn post, X thread and newsletter section. Use whenever the user asks to repurpose, cut down or cross-post content.
---

# Repurposing content

## Step 1: Extract before writing (show this to the user first)
- Core argument: [1 sentence]
- Supporting ideas: [3-5 bullets, each with a quote or timestamp if available]
- Best hook: [the most surprising line or number in the source]

## Step 2: Write each format
Apply the user's voice skill if one is installed.

### LinkedIn post
- 120-220 words. First line is the hook and stands alone.
- One idea, one takeaway, line breaks between short paragraphs.
- End with the takeaway, not a question. No more than 2 hashtags.

### X thread
- 5-8 posts, each under 270 characters.
- Post 1 = hook + promise. Last post = takeaway + link placeholder [LINK].
- No "1/", thread emoji or "A thread:" openers.

### Newsletter section
- 200-350 words with one sub-heading.
- Opens with a personal angle, closes with one action for the reader.

## Step 3: Label and check
Label each output with a heading. Check that every claim appears in the
source; flag anything that needs verification with [CHECK].
```

**The benefit here is multiplication.** The costly creative work — having the idea and recording the video — happens once, and the skill handles the mechanical adaptation to each platform's conventions consistently. The vendor's claim that one 30-minute video becomes three pieces "without manual labor" is qualitative, so review every output before posting ([MindStudio](https://www.mindstudio.ai/blog/automate-content-repurposing-claude-code-skills)).

## Benefits of Claude skills: 5 reasons they beat pasted prompts

**The strongest case for Claude skills rests on how they are built, not on productivity statistics.**

1. **Teach once, apply everywhere.** A skill persists across conversations, so the instructions you would otherwise re-paste become permanent. One practitioner sums it up: "You teach once. Claude applies it every time" ([Ashu Kumar](https://theagenticstack.substack.com/p/claude-skills-are-live-stop-repeating)).
2. **Near-zero idle cost.** Thanks to progressive disclosure, you can install a dozen personal skills for roughly the standing cost of one short custom instruction. Custom instructions, `CLAUDE.md` content and MCP tool schemas, by contrast, are paid for in every conversation ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview); [Simon Willison](https://simonwillison.net/2025/Oct/16/claude-skills/)).
3. **Composability.** Claude loads whichever skills match the task, so the voice skill, the repurposing skill and a brand-kit skill can all apply to one request without you orchestrating them. Anthropic calls skills "composable, scalable, and portable" ([Anthropic Engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)).
4. **A portable, open format.** Anthropic published Agent Skills as an open standard on 18 December 2025 ([Anthropic Engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)). The agentskills.io showcase lists adopters including ChatGPT and Codex, GitHub Copilot, VS Code, Cursor, Gemini CLI, Goose and Kiro ([agentskills.io](https://agentskills.io)). A spec-only skill is a text asset you own, not a lock-in to one vendor — a meaningful difference from a custom GPT.
5. **Room to grow.** A skill that starts as Markdown can later bundle a script for work that should be deterministic. Anthropic's example: "sorting a list via token generation is far more expensive than simply running a sorting algorithm" ([Anthropic Engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)). A skill can also be shared through a repo, a plugin or org-wide provisioning.

Anthropic describes writing a skill as "like putting together an onboarding guide for a new hire" (same source). For a solo creator, that guide is written for the Claude you work with every day, and it outlasts any single conversation.

**Two caveats keep this honest.** The ~100-token and <5k-token figures are Anthropic's design targets, not measured averages. And the skeptics have a point: an early Hacker News commenter said they had "been able to build the equivalent of skills with a few markdown files", and another called it "just instructions with RAG" ([Hacker News](https://news.ycombinator.com/item?id=45619537)). They are right about the mechanism. What changes is the packaging: automatic, description-based loading across every Claude surface turns a folder of notes into something you never have to remember to paste.

## Limitations of Claude skills: triggering, sync, security and proof

### Why isn't my Claude skill triggering?

**Triggering is the most common failure, and the description is almost always the cause.** Claude decides whether to load a skill from its description alone ([Claude Code Docs](https://code.claude.com/docs/en/skills)).

In one practitioner's 650-trial test, default-style descriptions activated only about **50%** of the time — "essentially a coin flip" — while directive descriptions reached **94–100%**. The test covered one model (Opus 4.5), three skills and restricted tools, so treat it as a direction rather than a law ([Seleznov, Medium](https://medium.com/@ivan.seleznov1/why-claude-code-skills-dont-activate-and-how-to-fix-it-86f679409af1)). Anthropic publishes no official trigger-accuracy data; its building guide sets a target of triggering on **90% of relevant queries** ([Anthropic PDF guide](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)).

### Skills don't sync across surfaces

The platform docs say plainly that custom skills "do NOT sync across surfaces — upload separately to each platform". Skills uploaded to claude.ai are not available on the API, and vice versa ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)). The only exception is the one-way app-to-Claude Code sync described above.

The format is portable, but installing it everywhere is still manual, which contradicts vendor claims that "the same skill functions everywhere" ([Enterpret](https://www.enterpret.com/blog/claude-skills-vs-custom-gpts-for-product-managers)). Skills also need a code-execution sandbox: in the app that means turning on code execution, and API skills run without network access ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)).

### Are third-party Claude skills safe?

**Third-party skills are a real supply-chain risk.** Anthropic's guidance is to "treat Skills like installing software", to use only skills you wrote or got from trusted sources, and to audit scripts, dependencies and network calls ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)).

- An academic scan of **31,132** marketplace skills found **26.1%** contained at least one potentially dangerous pattern and **5.2%** were high-severity or likely malicious. Skills that bundle scripts were **2.12x** more likely to be vulnerable ([arXiv 2601.10338](https://arxiv.org/pdf/2601.10338)).
- Snyk separately reports prompt injection in 36% of skills in one community ecosystem, using a different method ([Snyk](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)).

The three skills in this guide avoid most of that risk because they are self-written and contain no scripts. Even so, read any downloaded skill in full before installing it, since Markdown alone can steer Claude to fetch URLs or leak data. Enterprise admins can turn on content scanning, which becomes the default for Enterprise orgs without a set preference on **2 October 2026** ([Help Center: Provision and manage skills](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization)).

### The evidence on time saved is thin

Every figure in this guide, from "half my writing time" to "a day to an hour", is either an individual's self-report or a vendor-curated customer quote. No independent or controlled study compares a skill with the same text pasted as a prompt or stored in a Project.

The benefits you can count on are consistency and fewer repeated prompts. Measure your own before-and-after if the numbers matter to you. Skills also need upkeep: once loaded, "every line in SKILL.md body is recurring token cost" for the rest of the session ([Claude Code Docs](https://code.claude.com/docs/en/skills)), and a voice skill goes stale if your style evolves and the file does not.

## How to write a Claude skill description that triggers reliably

**The description is a routing rule, not a summary.** Anthropic's rules are to write in the **third person** and to state both **what the skill does and when to use it**, using the words users actually type. Its contrast is "Analyze Excel spreadsheets, create pivot tables, generate charts. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files" against the useless "Helps with documents" ([Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)).

Anthropic's own `skill-creator` goes further. Because Claude tends to under-trigger, it recommends making descriptions a little **"pushy"**, as in "Make sure to use this skill whenever the user mentions dashboards… even if they don't explicitly ask" ([anthropics/skills: skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)). That is why each sample above says "Use whenever…" and lists concrete trigger nouns such as transcript, minutes, status report and cross-post.

Keep descriptions under 200 characters for app compatibility. Claude Code also truncates the combined description and `when_to_use` at **1,536 characters** in its listing ([Claude Code Docs](https://code.claude.com/docs/en/skills)).

### Claude skill best practices checklist

- **Name with specific gerunds** (`formatting-meeting-notes`), never `helper` or `utils` ([Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)).
- **Leave out what Claude already knows.** Put your effort into a **Gotchas** section, which Anthropic's Claude Code team calls "the highest-signal content in any skill" ([Claude blog](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills)).
- **Show rather than tell.** One tester's summary: "Examples > rules" ([Khaitan, DEV](https://dev.to/suraj_khaitan_f893c243958/i-tried-100-claude-skills-these-are-the-best-1m4a)).
- **Test before you call it done.** Use at least three realistic prompts, including one that should *not* trigger the skill. Check whether it fired, and rewrite the description if it did not. Anthropic recommends building such evaluations first and testing across Haiku, Sonnet and Opus ([Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)).
- **Use skill-creator for speed.** Ask Claude to "create a skill for X" with `skill-creator` enabled. It interviews you about edge cases, drafts the file, runs test prompts and can tune the description against about 20 should-trigger and should-not-trigger queries. Anthropic says this produces a working skill "often in 15–30 minutes" ([anthropics/skills: skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md); [Anthropic PDF guide](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)).
- **Validate before uploading.** The open standard's validator, `skills-ref validate ./my-skill`, catches naming and frontmatter errors ([agentskills.io Specification](https://agentskills.io/specification)).

## Frequently asked questions about Claude skills

### What is a Claude skill?

A Claude skill is a folder containing a `SKILL.md` file with YAML frontmatter (`name` and `description`) and Markdown instructions. Claude reads the short description all the time and loads the full instructions only when a request matches, so a skill teaches Claude a repeatable procedure without costing context in every conversation ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)).

### Do I need to know how to code to create a Claude skill?

No. The three skills in this guide are plain Markdown with no scripts. Code is optional and only useful later, for steps that must be deterministic ([Anthropic Engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)).

### How long does it take to build a Claude skill?

Each sample here takes well under an hour to adapt. Anthropic says the `skill-creator` skill produces a working skill "often in 15–30 minutes" ([Anthropic PDF guide](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)).

### What is the difference between Claude skills and Projects?

Projects hold knowledge Claude should always have in scope; skills hold procedures Claude loads only when needed. In Anthropic's words, "Projects say 'here's what you need to know.' Skills say 'here's how to do things'" ([Claude blog: Skills explained](https://claude.com/blog/skills-explained)).

### What is the difference between Claude skills and MCP?

MCP connects Claude to external tools and data; skills tell Claude how to use them. Anthropic's shorthand is "MCP for access, Skills for methodology" ([Claude blog: Skills explained](https://claude.com/blog/skills-explained)).

### Where do I put a skill in Claude Code?

Save it as `~/.claude/skills/<name>/SKILL.md` for personal use or `.claude/skills/<name>/SKILL.md` inside a project repo. Changes are picked up without a restart, and you can call the skill with `/<name>` ([Claude Code Docs](https://code.claude.com/docs/en/skills)).

### How do I upload a skill to the Claude app?

Turn on code execution, zip the skill folder so the folder sits at the root of the archive, then go to Customize > Skills > "+" > "Upload a skill" ([Help Center: Use skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude)).

### Why isn't my Claude skill being used?

Usually because the description is too vague. Write it in the third person, say what the skill does and when to use it, include the exact words you type, and make it slightly "pushy" ("Use whenever…") ([anthropics/skills: skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)).

### Can I use Claude skills in other AI tools?

Yes, the format is an open standard published on 18 December 2025, and agentskills.io lists adopters including ChatGPT and Codex, GitHub Copilot, VS Code, Cursor and Gemini CLI ([agentskills.io](https://agentskills.io)). You still have to install the skill separately in each tool.

### Are Claude skills safe to download?

Only from sources you trust. Anthropic says to "treat Skills like installing software", and one academic scan found 26.1% of marketplace skills contained a potentially dangerous pattern ([Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview); [arXiv 2601.10338](https://arxiv.org/pdf/2601.10338)). Writing your own avoids most of the risk.

![A small plant sprouting from the tallest of several uneven blocks, with a ladder leaning against it — skills compounding into steady growth over time.](/images/posts/simple-claude-skills-to-build-body-end.jpg)

## Conclusion: build the boring skills first

The Claude skills worth building first are not the clever ones but the boring ones: formats you already produce every week and preferences you are tired of restating. What makes a skill valuable is how much *non-default* knowledge it carries per line, so a 60-line meeting-notes skill with sharp "never invent an owner" rules will beat a 500-line generic writing guide.

For a builder-creator, the three skills also form a system. The voice skill sets how everything sounds, and the formatter, status report and repurposer set its shape, so each new skill inherits your voice for free.

The tooling is still ahead of the evidence. Triggering reliability, cross-surface installation and third-party trust are unsolved enough that the safest strategy is to:

- own your skills as plain, spec-compliant text;
- keep them free of scripts until you need determinism; and
- track your own before-and-after time on one workflow.

That leaves you with a portable skill library that works in Claude today and in the other agents adopting the standard — and with your first real measurement of whether the productivity claims apply to your own work.
