---
title: "How Claude Skills Work: Anthropic's Fix for AI's Memory Problem"
description: "Claude Skills let Anthropic's Claude reuse instructions, templates, and scripts across conversations via progressive disclosure. Here's how SKILL.md files work, how they differ from MCP, and why teams use them."
date: 2026-09-22
tags: ["claude-skills", "anthropic-ai", "ai-agent-tools"]
draft: false
---

**Claude Skills are reusable folders of instructions — built around a file called SKILL.md — that let Anthropic's Claude apply the same formatting, brand rules, or workflow every time, instead of relearning them in every new chat.** Anthropic shipped Skills in October 2025, and the design behind them, called progressive disclosure, is why they're worth understanding even if you never build one yourself.

## The problem: a brilliant assistant with amnesia

Imagine hiring a genius assistant who's excellent at writing, math, design, and spreadsheets — but has no long-term memory. Every morning you re-explain your report format, your brand colors, and exactly how you like your slides laid out. They nail it every time... and forget it all by the next session.

That's roughly how AI chatbots worked for years. Every conversation started from zero. Getting consistent, professional output meant re-teaching the AI your preferences over and over, chat after chat.

## What is a Claude Skill?

A Skill is a folder. Inside it sits `SKILL.md` — a recipe card that tells Claude exactly how to do one job: format a quarterly report the way your finance team likes it, build slide decks matching your brand, or turn a messy spreadsheet into clean, formula-driven Excel output.

The folder can also hold example templates, reference documents, and even scripts — small pieces of code that handle the exact, fiddly parts of a task the same way every time. That last part matters a lot.

The clever part isn't that Claude can read instructions — any AI can do that. It's *when* it reads them.

## Progressive disclosure: loading only what's needed

AI models have a limited context window — a cap on how much text they can attend to at once. Stuff every possible instruction for every possible task into every conversation, and you'd blow past that limit before Claude even starts working.

Claude Skills solve this with **progressive disclosure**: don't hand over the whole manual, just the page that's needed. It runs in three stages:

1. **At all times** — Claude sees only a short name and description for each available Skill, compiled as lightweight metadata that costs roughly 100 tokens total across all installed Skills. That's enough to know a Skill might be relevant, without loading its contents.
2. **The moment a task matches a Skill** — Claude reads the full `SKILL.md` body, typically a few thousand tokens, loaded only now.
3. **Deeper resources** — a large reference document, a template, a script — load only if that specific task actually needs them. A PDF-forms Skill might carry an entire guide to advanced form fields that never gets touched unless someone asks for exactly that.

So a request to summarize an email never touches a 40-page brand-guidelines Skill. Claude opens only the relevant folder — like flipping to one recipe instead of reading the whole cookbook. Anthropic's own developer guidance for authoring Skills frames `SKILL.md` the same way: an overview that points to detailed material only as needed, similar to a table of contents in an onboarding guide.

## Why Skills make output consistent instead of random

Normal AI text generation has some randomness built in — part of why it feels creative, and part of why two people asking for "the same thing" can get different formatting or tone back.

Skills counter that in two ways. First, instructions are locked in and reused every time, rather than reconstructed from scratch. Second — and this is the sharper edge — Skills can bundle actual **scripts**, not just written guidance. A script is real code: it runs identically every single time, with no creative interpretation. Instead of asking Claude to "calculate this the way we usually do it" and hoping it remembers correctly, a Skill can run a script that calculates it the same way, guaranteed. Instructions handle judgment calls; code handles the parts that shouldn't involve any judgment at all.

## Claude Skills vs. MCP: what's the difference?

Skills are often confused with the Model Context Protocol (MCP), Anthropic's other major release. They solve different problems, and most serious workflows end up using both.

- **MCP is connectivity.** It's a standardized way to plug Claude into external systems — databases, APIs, GitHub, Google Search Console — often described as a USB-C port for AI.
- **Skills are methodology.** They teach Claude *how* to use those connections (or its own tools) correctly for a specific, repeatable task.

Put plainly: MCP gives Claude access to new things; Skills teach Claude how to do things better. A Skill can bundle a script for deterministic, local operations on data Claude already has, but it can't reach a live database or a remote API on its own — that's MCP's job. For a one-off, self-contained task with no external data needs, a Skill alone is enough.

## What this looks like in the real world

This isn't just theory. Rakuten reported using Skills to compress a day of finance and accounting workflow into about an hour, because Claude applied the company's own spreadsheet procedures automatically instead of being walked through them each time. Box, the file-storage company, uses Skills to let Claude pull files straight from company storage and turn them into PowerPoints, Excel sheets, and Word documents that already follow that company's formatting standards — no manual reformatting afterward.

That's the real unlock: turning one person's know-how into something an AI applies automatically, at scale, for anyone on the team — not because the model got smarter overnight, but because someone wrote the recipe card once.

## The bigger idea

Skills are a small architectural choice with a big consequence: they turn AI from a brilliant-but-forgetful assistant into something closer to a trained specialist with an actual playbook. The model's raw intelligence hasn't changed. What changed is that expertise can now be *packaged*, saved, and reused instead of evaporating at the end of every conversation.

It's a good reminder that some of the biggest leaps in AI aren't about making the model bigger. Sometimes they're about giving a smart system a better way to remember what it already knows how to do.

## FAQ

**What are Claude Skills?**
Claude Skills are folders of reusable instructions — anchored by a `SKILL.md` file — that Anthropic's Claude loads automatically when a task matches, so it can repeat a specific workflow (formatting, branding, calculations) consistently across conversations.

**How does progressive disclosure work in Claude Skills?**
Claude only ever sees a short name and description for each Skill until one becomes relevant. At that point it loads the full `SKILL.md` body, and only opens deeper reference files or scripts if the task specifically calls for them — keeping the context window mostly empty until it's actually needed.

**Are Claude Skills the same as MCP?**
No. MCP connects Claude to external tools and data sources. Skills teach Claude how to carry out a specific task well, whether or not external tools are involved. Anthropic and third-party integrators design many Skills and MCP connectors to work together.

**Do Skills slow Claude down or use up context?**
Not meaningfully. Because of progressive disclosure, unused Skills cost only a small amount of metadata — on the order of 100 tokens combined at startup — regardless of how many are installed.

**Can I build my own Claude Skill?**
Yes. A Skill can be as simple as a single `SKILL.md` file with YAML frontmatter (name and description) plus instructions in Markdown. More advanced Skills add scripts, templates, and reference files for larger tasks.

## Sources

- [Agent Skills — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Claude Agent Skills: A First Principles Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/)
- [How Anthropic's 'Skills' make Claude faster, cheaper, and more consistent for business workflows — VentureBeat](https://venturebeat.com/ai/how-anthropics-skills-make-claude-faster-cheaper-and-more-consistent-for)
- [Skills — Claude by Anthropic (official product page)](https://claude.com/skills)
- [What to know about Claude Skills (and why it's a big deal) — TechTalks](https://bdtechtalks.substack.com/p/what-to-know-about-claude-skills)
- [Skill authoring best practices — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Claude Skills vs MCP: When to Use Each](https://medium.com/@codecraftsphere/when-to-use-claude-skills-vs-mcps-8dad04d02800)
- [What are skills? — Claude Help Center](https://support.claude.com/en/articles/12512176-what-are-skills)
