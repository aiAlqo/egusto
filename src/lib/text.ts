export function extractSnippet(markdown: string, maxLength = 280): string {
  const firstParagraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block.length > 0 && !block.startsWith('#')) ?? '';

  const plainText = firstParagraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) return plainText;

  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}
