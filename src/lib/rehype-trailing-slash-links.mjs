import { visit } from 'unist-util-visit';

/**
 * Appends a trailing slash to internal page links in Markdown (e.g.
 * `/store` -> `/store/`, `/posts/x#faq` -> `/posts/x/#faq`). Pages are
 * built as `/path/index.html`, so the host 307-redirects slashless URLs;
 * Search Console then reports every linked slashless URL as
 * "Page with redirect". Links to files (anything with an extension),
 * external URLs, and pure anchors are left alone.
 */
export function rehypeTrailingSlashLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return;

      const match = href.match(/^([^?#]*)(.*)$/);
      const [, path, suffix] = match;
      const lastSegment = path.split('/').pop();
      if (path.endsWith('/') || lastSegment.includes('.')) return;

      node.properties.href = `${path}/${suffix}`;
    });
  };
}
