import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? '';

  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const products = await getCollection('products');

  const lines = [
    '# egusto',
    '',
    '> Notes on applied AI, tooling, and consulting — plus downloadable Claude Skills, built and used by the egusto team.',
    '',
    '## Posts',
    '',
    ...posts.map((post) => `- [${post.data.title}](${base}/posts/${post.id}): ${post.data.description}`),
    '',
    '## Store',
    '',
    `- [Store](${base}/store): Claude Skills — some free to download, some paid.`,
    ...products.map((product) => `  - ${product.data.title} (${product.data.price}): ${product.data.description}`),
    '',
    '## About',
    '',
    `- [About](${base}/about)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
