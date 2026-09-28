---
title: "How to Install ECC in Claude Code (2026 Step-by-Step Guide)"
description: "Learn how to install ECC in Claude Code in under 10 minutes, verify it works, add rules safely, then use it to build a simple budget tracker."
date: 2026-09-28
tags: ["claude-code", "ecc", "ai-agents", "how-to"]
cover: "/images/posts/how-to-install-ecc-in-claude-code.jpg"
draft: false
---

**To install ECC in Claude Code, run `npx ecc-universal@2.2.2 setup` in your terminal, choose "Global user" and "Standard" hooks, then open a new Claude Code session and confirm `ecc@ecc` appears in `/plugin list`.** That's it: one command, two choices, one check. The rest of this guide covers the prerequisites, the alternative in-app install, the one optional extra (rules), and a simple budget-tracker project that shows why ECC is worth having.

ECC turns Claude Code from a single helpful assistant into a disciplined workflow that plans first, tests, reviews its own work and remembers where you left off ([GitHub](https://github.com/affaan-m/ECC)).

## What is ECC in Claude Code?

**ECC is a free, MIT-licensed "agent harness" that plugs into Claude Code and gives it a repeatable engineering process: plan → test → implement → review → verify → remember → improve** ([GitHub](https://github.com/affaan-m/ECC)).

![Seven stepping stones with simple icons crossing a calm stream toward a small finished workshop](/images/posts/how-to-install-ecc-in-claude-code-workflow.jpg)

It started life as *Everything Claude Code*, a collection built from creator Affaan Mustafa's daily Claude Code habits, and took off after his shorthand guide spread on X in early 2026 ([DataCamp](https://www.datacamp.com/tutorial/everything-claude-code)). Today the repo sits at roughly **268,000 GitHub stars** ([GitHub](https://github.com/affaan-m/ECC)).

What you get in one install ([GitHub](https://github.com/affaan-m/ECC)):

| Component | Count | What it does for you |
|---|---|---|
| Agents | 68 | Specialists for planning, review, build repair, security |
| Skills | 292 | Reusable workflows (TDD, research, docs, frontend and more) |
| Commands | 94 | Slash shortcuts like `/ecc:plan` |
| Hooks and memory | Runtime | Session summaries, learning, context controls |
| AgentShield | Included | Scans prompts, hooks, MCP config and secrets |

You won't use most of this on day one, and you don't need to. Skills load only when a task needs them ([GitHub](https://github.com/affaan-m/ECC)).

## What you need before installing ECC

**You need Claude Code 2.1 or newer, Node.js 18 or newer, and Git, all reachable from your terminal** ([GitHub](https://github.com/affaan-m/ECC)).

1. **A paid Claude plan.** Claude Code requires a Pro, Max, Team, Enterprise or Console account; the free plan doesn't include it ([Claude Code docs](https://code.claude.com/docs/en/setup)).
2. **Claude Code itself.** On macOS, Linux or WSL run `curl -fsSL https://claude.ai/install.sh | bash`; in Windows PowerShell run `irm https://claude.ai/install.ps1 | iex` ([Claude Code docs](https://code.claude.com/docs/en/setup)).
3. **Node.js 18+ and Git** from their official sites.

Check all three at once:

```bash
node --version
git --version
claude --version
```

If any command says "not found," fix that tool first. ECC's own Windows walkthrough says the same ([GitHub](https://github.com/affaan-m/ECC)).

## How to install ECC in Claude Code: two ways

**Pick exactly one method. Installing ECC twice into Claude Code duplicates skills, commands and hooks** ([GitHub](https://github.com/affaan-m/ECC)).

### Option 1 (recommended): the guided setup

Run this in your terminal (PowerShell on Windows):

```bash
npx ecc-universal@2.2.2 setup
```

When the wizard asks:

- **Scope:** choose **Global user** so ECC works in every project.
- **Hooks:** choose **Standard**.
- Confirm.

That's the setup ECC recommends for a typical personal machine ([GitHub](https://github.com/affaan-m/ECC)). The wizard checks what's already installed before changing anything, and you can rerun the same command later to update ECC or change these choices.

### Option 2: install from inside Claude Code

Prefer to stay in Claude? Start `claude` and type:

```
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc
```

Both options install the same `ecc@ecc` plugin ([GitHub](https://github.com/affaan-m/ECC)).

> **Safety note:** Only install from the official channels: the `affaan-m/ECC` repo, the `ecc-universal` npm package, the `ecc@ecc` plugin slug, or ecc.tools. The project warns that unofficial mirrors may contain malware ([GitHub](https://github.com/affaan-m/ECC)).

## How to check that ECC installed correctly

**Open a fresh Claude Code session and run `/plugin list`. If `ecc@ecc` shows as enabled, you're done** ([GitHub](https://github.com/affaan-m/ECC)).

Then type `/ecc:` and pause. Claude's slash menu lists every ECC command. Plugin commands always carry the `ecc:` prefix ([GitHub](https://github.com/affaan-m/ECC)).

## Should you add ECC rules? (Optional)

**Rules are the one piece the plugin can't install for you, and you should add only the packs you'll actually use** ([GitHub](https://github.com/affaan-m/ECC)).

Rules are always-on standards (coding style, testing, security) that Claude reads in every session. Because they're always loaded, each extra pack costs context. Start with the common pack plus one language:

```bash
git clone https://github.com/affaan-m/ECC.git
cd ECC
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/   # swap for python, golang, etc.
```

Don't run `./install.sh --profile full` after installing the plugin. That's the "stacking" mistake ([GitHub](https://github.com/affaan-m/ECC)). Not a coder yet? Skip rules entirely for now.

## A simple use case: build your own budget tracker

**Almost everyone wants to know where their money goes, so a personal budget tracker is the perfect first ECC project: small, useful, and it shows off every stage of the workflow.**

Most ECC tutorials demo login systems ([DataCamp](https://www.datacamp.com/tutorial/everything-claude-code)). This one you'll actually open next month.

### Step 1: Start a project folder

```bash
mkdir budget-tracker
cd budget-tracker
claude
```

### Step 2: Plan before anything gets built

```
/ecc:plan "A simple web page where I log expenses with a date, amount and category (rent, food, transport, fun). Show this month's total per category and how much of my monthly budget is left. Save data locally. No login."
```

ECC's planner agent writes a blueprint first ([GitHub](https://github.com/affaan-m/ECC)). **Read it and edit it.** Want a warning when you pass 80% of your budget? Add it now. Changing a plan costs nothing; changing code costs time.

### Step 3: Build it test-first

```
Use the tdd-workflow skill to build this plan.
```

The TDD workflow writes a failing test first, then code until the test passes, then tidies up ([GitHub](https://github.com/affaan-m/ECC)). For a budget app that means "does $50 + $30 in Food show $80?" is checked automatically, not by eyeballing.

### Step 4: Get a second opinion

Type `/ecc:` and pick the **code-review** command. It runs a reviewer with a fresh context, so the same "mind" that wrote the code isn't grading it ([GitHub](https://github.com/affaan-m/ECC)). Ask Claude to fix anything it flags.

### Step 5: Pick up tomorrow where you left off

End with the **save-session** command and next time start with **resume-session** ([GitHub](https://github.com/affaan-m/ECC)). Claude comes back knowing what's built and what's next, with no re-explaining.

**The takeaway:** the same five moves (plan, test, review, save, resume) work for a habit tracker, a recipe organizer, a small business invoice tool or a real work project.

## How to update, repair or uninstall ECC

**Rerun the setup command to update, and use `doctor`, `repair` and `uninstall` when something looks off** ([GitHub](https://github.com/affaan-m/ECC)):

```bash
npx ecc-universal@2.2.2 doctor
npx ecc-universal@2.2.2 repair
npx ecc-universal@2.2.2 uninstall --dry-run
```

If you accidentally stacked installs and see duplicates, remove the Claude Code plugin first, run the ECC uninstall, delete extra rule folders, then reinstall once using a single method ([GitHub](https://github.com/affaan-m/ECC)).

## Frequently asked questions

### Is ECC free?
Yes. The open-source project is MIT-licensed and the maintainer says it will stay free. A paid "ECC Pro" GitHub App exists for private repos, but you don't need it to use ECC in Claude Code ([GitHub](https://github.com/affaan-m/ECC)).

### Is ECC the same as "Everything Claude Code"?
Yes. ECC grew out of Everything Claude Code ([DataCamp](https://www.datacamp.com/tutorial/everything-claude-code)). Older posts may show a long marketplace name; today the plugin is `ecc@ecc`, the repo is `affaan-m/ECC`, and the npm package is `ecc-universal` ([GitHub](https://github.com/affaan-m/ECC)).

### Does ECC work on Windows?
Yes, with some limits. The core installer runs on Windows, macOS and Linux, but a few optional features such as continuous learning and memory-vault writes have open native-Windows issues. WSL follows the Linux path ([GitHub](https://github.com/affaan-m/ECC)).

### Will ECC slow Claude down or eat my context?
Skills load only when needed, but rules are always loaded and the plugin advertises its catalog to the model ([GitHub](https://github.com/affaan-m/ECC)). Keep rules to one or two packs, and use `/ecc:context-budget` to check context pressure.

### Should I use the guided setup or the `/plugin` commands?
Either works and both install the same plugin. The guided setup is recommended because it checks existing installs and handles updates and scope changes ([GitHub](https://github.com/affaan-m/ECC)).

### Does ECC work with Cursor, Codex or other tools?
It works best with Claude Code. Codex has a supported native plugin; Cursor, OpenCode, Gemini, Zed and others get more limited adapters ([GitHub](https://github.com/affaan-m/ECC)).

## Next step

Install ECC with the one-line setup, confirm `ecc@ecc` in `/plugin list`, and spend twenty minutes on the budget tracker. Once plan → test → review → save feels natural, explore the rest of the catalog one skill at a time.
