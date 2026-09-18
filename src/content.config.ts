import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    image: z.string().optional(),
    downloadUrl: z.string().optional(),
    buyLink: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts, products };
