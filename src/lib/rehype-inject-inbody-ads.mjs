import { AD_CLIENT, INBODY_SLOT_1, INBODY_SLOT_2 } from './ad-config.mjs';

// A section needs at least this many words between two candidate ad
// anchors, or we fall back to a single ad. 150 is a conservative floor
// (roughly one to two short paragraphs) so normal, reasonably-paced
// sections don't over-trigger the fallback.
const MIN_WORDS_BETWEEN_ADS = 150;

function countWords(nodes) {
  let words = 0;
  const walk = (node) => {
    if (node.type === 'text') {
      words += node.value.trim().split(/\s+/).filter(Boolean).length;
    }
    if (node.children) node.children.forEach(walk);
  };
  nodes.forEach(walk);
  return words;
}

function buildAdNode(slotId) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['not-prose', 'my-10'] },
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: { className: ['card'] },
        children: [
          {
            type: 'element',
            tagName: 'p',
            properties: {
              className: [
                'mb-3', 'text-center', 'text-xs', 'font-medium',
                'uppercase', 'tracking-wide', 'text-claude-muted',
              ],
            },
            children: [{ type: 'text', value: 'Advertisement' }],
          },
          {
            type: 'element',
            tagName: 'ins',
            properties: {
              className: ['adsbygoogle'],
              style: 'display:block',
              'data-ad-client': AD_CLIENT,
              'data-ad-slot': slotId,
              'data-ad-format': 'auto',
              'data-full-width-responsive': 'true',
            },
            children: [],
          },
        ],
      },
    ],
  };
}

/**
 * Auto-inserts up to two in-article ad units at build time, anchored to
 * H2 headings so post authors never have to place ads manually. Fewer
 * than 3 H2s (no safe interior heading) yields zero ads; anchors land
 * near the 1/3 and 2/3 marks of the interior headings and collapse to a
 * single ad if the two candidates are too close together (in heading
 * position or actual word count).
 */
export function rehypeInjectInbodyAds() {
  return (tree, file) => {
    const filePath = String(file?.history?.[0] ?? file?.path ?? '').replace(/\\/g, '/');
    if (filePath && !filePath.includes('/content/posts/')) return;

    const headingIndices = [];
    tree.children.forEach((node, index) => {
      if (node.type === 'element' && node.tagName === 'h2') headingIndices.push(index);
    });

    const interior = headingIndices.slice(1, -1);
    if (interior.length === 0) return;

    let anchors;
    if (interior.length === 1) {
      anchors = [interior[0]];
    } else {
      let pos1 = Math.floor(interior.length / 3);
      let pos2 = Math.floor((interior.length * 2) / 3);
      if (pos2 <= pos1) pos2 = pos1 + 1;
      if (pos2 > interior.length - 1) pos2 = interior.length - 1;

      if (pos2 === pos1) {
        anchors = [interior[Math.floor((interior.length - 1) / 2)]];
      } else {
        const h1 = interior[pos1];
        const h2 = interior[pos2];
        const words = countWords(tree.children.slice(h1 + 1, h2 + 1));
        anchors = words < MIN_WORDS_BETWEEN_ADS ? [h1] : [h1, h2];
      }
    }

    const slots = [INBODY_SLOT_1, INBODY_SLOT_2];
    anchors
      .map((headingIndex, i) => ({ headingIndex, slot: slots[i] }))
      .sort((a, b) => b.headingIndex - a.headingIndex)
      .forEach(({ headingIndex, slot }) => {
        tree.children.splice(headingIndex + 1, 0, buildAdNode(slot));
      });
  };
}
