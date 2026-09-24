// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import { unified } from '@astrojs/markdown-remark';
import { rehypeImageDimensions } from './src/lib/rehype-image-dimensions.mjs';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://egusto.online',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],

  markdown: {
    processor: unified({ rehypePlugins: [rehypeImageDimensions] })
  }
});