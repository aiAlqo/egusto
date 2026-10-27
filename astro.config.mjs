// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import { unified } from '@astrojs/markdown-remark';
import { rehypeImageDimensions } from './src/lib/rehype-image-dimensions.mjs';
import { rehypeInjectInbodyAds } from './src/lib/rehype-inject-inbody-ads.mjs';
import { rehypeTrailingSlashLinks } from './src/lib/rehype-trailing-slash-links.mjs';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://egusto.online',
  // Pages are served as /path/ (canonical + sitemap); enforce it so dev
  // flags any slashless internal link instead of the host silently redirecting.
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],

  markdown: {
    processor: unified({ rehypePlugins: [rehypeImageDimensions, rehypeInjectInbodyAds, rehypeTrailingSlashLinks] })
  }
});