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

## SEO & crawlability

The site is set up to be indexed by search engines and discoverable by AI/LLM crawlers out of the box:

- **`public/robots.txt`** — allows all crawlers, with explicit entries for AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, etc.), and points to the sitemap.
- **`sitemap-index.xml`** — auto-generated at build time via `@astrojs/sitemap`, listing every public page. No maintenance needed; it regenerates on every build.
- **`llms.txt`** (`/llms.txt`) — a build-time-generated plain-text index of all posts and products, in the emerging `llms.txt` convention some AI crawlers/agents use to discover site content. Regenerates automatically from the content collections on every build — no manual upkeep.
- **Canonical URLs + Open Graph/Twitter meta tags** — set on every page via `BaseLayout.astro`, using the `site` value in `astro.config.mjs`.

If the production domain ever changes, update `site` in `astro.config.mjs` — everything above (sitemap, canonical URLs, `llms.txt`, OG tags) derives from that one value.

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

Publishing a blog post
Draft it in Claude — write and refine the post text, generate any cover image via the Canva MCP, and export the image.
Save two files locally, in your egusto project folder:
The post itself → content/posts/your-post-slug.md, with frontmatter:

---
title: ["Your Title"]
description: "One-sentence summary for the card + SEO."
date: 2026-09-22
tags: ["tag-one", "tag-two"]
cover: "/images/posts/your-post-slug.jpg"
draft: false
---
The Canva-exported image → public/images/posts/your-post-slug.jpg (filename must match the cover path).
Push to GitHub. Either:
Locally: git add -A && git commit -m "Add post: your title" && git push, or
Directly on github.com: navigate into content/posts/, "Add file" → upload, same for the image in public/images/posts/, then commit straight to main.
Cloudflare auto-builds and deploys — usually live within about a minute. No dashboard visit needed.
The filename (minus .md) becomes the URL: content/posts/my-post.md → egusto.asseneka.workers.dev/posts/my-post.

Publishing a Claude Skill in the store
Save the finished skill file → public/skills/skill-name.md (this is the actual file visitors download).
Add a matching entry → content/products/skill-name.md:

---
title: "Skill Name"
description: "What it does."
price: "Free"                     # or "$19"
downloadUrl: "/skills/skill-name.md"   # free skills: direct download
# buyLink: "https://gumroad.com/l/..." # paid skills: use this instead
featured: false
---
Push the same way as a post. The store card automatically shows "Download" (if downloadUrl is set) or "Buy — {price}" (if buyLink is set).
A few practical notes
Drafts: set draft: true on a post if you want to preview it locally (npm run dev) before it goes live — it's excluded from the production build automatically.
Preview before pushing: run npm run build && npm run preview locally to sanity-check a post renders correctly before it's public.
Nothing else needs touching — no code changes, no Cloudflare dashboard visits, for routine posts/products. You'd only come back to code if you want a new page type, layout change, or schema field.