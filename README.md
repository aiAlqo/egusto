# egusto

A static, dark-themed blog + store built with [Astro](https://astro.build) and styled with Anthropic's Claude brand palette. Blog posts and Claude Skill downloads are plain Markdown files — publishing means pushing a file to GitHub, not touching code.

## Publish workflow

### Blog posts

1. Draft, clean, and refine the post in Claude. Generate any cover/inline images via the Canva MCP and export them.
2. Save the finished post as a `.md` file in `content/posts/`, and save its image(s) into `public/images/posts/`.
3. Push the complete post **and** its images to `main` in one commit — either `git push` locally or by uploading through the GitHub web UI.
4. Cloudflare Pages' GitHub integration detects the push, runs `npm run build`, and deploys the new `dist/` output. The post is live in roughly a minute — no code changes required.

Posts are meant to be pushed already finished, not edited iteratively on the live repo. If a post isn't ready yet, set `draft: true` in its frontmatter — it'll still render locally with `npm run dev`, but is excluded from the production build.

**Frontmatter schema** (`content/posts/*.md`):

```yaml
---
title: string
description: string
date: YYYY-MM-DD
tags: string[]
cover: string (optional, path into /images/posts/...)
draft: boolean
---
```

### Store / Claude Skills

The store's products are mostly downloadable Claude Skill `.md` files — free or paid.

1. Save the finished Skill `.md` file into `public/skills/`.
2. Add a matching entry in `content/products/` describing it:
   - **Free skill** → set `downloadUrl` to the file's path (e.g. `/skills/my-skill.md`). The store card shows a "Download" button that links straight to the file.
   - **Paid skill** → set `buyLink` to a Gumroad/Stripe Payment Link instead. The store card shows a "Buy — {price}" button that links out. No checkout logic lives in this site.
3. Push to `main`. Same auto-deploy as posts.

**Frontmatter schema** (`content/products/*.md`):

```yaml
---
title: string
description: string
price: string        # e.g. "Free" or "$19"
image: string (optional, path into /images/products/...)
downloadUrl: string (optional, path into /skills/...)
buyLink: string (optional, external URL)
featured: boolean
---
```

Set at least one of `downloadUrl` / `buyLink` per product.

## Local development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build locally
```

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, and select this repo.
3. Framework preset: **Astro** (auto-detected). Build command: `npm run build`. Output directory: `dist`.
4. Set the environment variable `NODE_VERSION` to `20` (or add an `.nvmrc`) in the Pages build settings to avoid Node version drift.
5. Production branch: `main`. Every push to `main` triggers a new build and deploy; pull requests get their own preview URLs automatically.

## Project structure

```text
egusto/
├── content/
│   ├── posts/          ← blog post .md files (frontmatter above)
│   └── products/        ← store product .md files (frontmatter above)
├── public/
│   ├── skills/           ← downloadable Claude Skill .md files
│   └── images/
│       ├── posts/        ← post cover/inline images
│       └── products/     ← product images
└── src/
    ├── content.config.ts ← Zod schemas + collection loaders
    ├── layouts/
    ├── components/
    └── pages/
        ├── index.astro    ← home (post list)
        ├── store.astro     ← store (product grid)
        ├── about.astro
        ├── 404.astro
        └── posts/[slug].astro  ← post detail template
```
