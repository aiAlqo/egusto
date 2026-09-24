import { imageSize } from 'image-size';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export function getImageDimensions(publicPath: string): { width: number; height: number } | null {
  try {
    const filePath = path.join(process.cwd(), 'public', publicPath);
    const { width, height } = imageSize(readFileSync(filePath));
    return { width, height };
  } catch {
    return null;
  }
}

const RESPONSIVE_WIDTHS = [640, 960];

interface ResponsiveImage {
  width: number;
  height: number;
  srcset?: string;
}

/**
 * Looks for sibling `<name>-640w.jpg`/`<name>-960w.jpg` variants next to a cover
 * image and builds a srcset from whichever exist. Falls back to plain dimensions
 * (no srcset) for images without pre-generated variants, e.g. SVGs.
 */
export function getResponsiveImage(publicPath: string): ResponsiveImage | null {
  const dims = getImageDimensions(publicPath);
  if (!dims) return null;

  const ext = path.extname(publicPath);
  const base = publicPath.slice(0, -ext.length);
  if (ext.toLowerCase() === '.svg') return dims;

  const entries: string[] = [];
  for (const w of RESPONSIVE_WIDTHS) {
    const variantPath = `${base}-${w}w${ext}`;
    if (existsSync(path.join(process.cwd(), 'public', variantPath))) {
      entries.push(`${variantPath} ${w}w`);
    }
  }
  if (entries.length === 0) return dims;

  entries.push(`${publicPath} ${dims.width}w`);
  return { ...dims, srcset: entries.join(', ') };
}
