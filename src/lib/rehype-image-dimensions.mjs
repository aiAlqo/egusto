import { visit } from 'unist-util-visit';
import { imageSize } from 'image-size';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function rehypeImageDimensions() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      const src = node.properties?.src;
      if (typeof src !== 'string' || !src.startsWith('/')) return;
      if (node.properties.width || node.properties.height) return;

      try {
        const filePath = path.join(process.cwd(), 'public', src);
        const { width, height } = imageSize(readFileSync(filePath));
        node.properties.width = width;
        node.properties.height = height;
      } catch {
        // Leave dimensions unset if the file can't be read/decoded.
      }
    });
  };
}
