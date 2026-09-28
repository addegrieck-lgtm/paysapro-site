// Génère les images PNG du site à partir de SVG : npm run images
// (icônes, logo pour les données structurées, image OpenGraph 1200×630).
// Utilise sharp (dépendance de développement). Les PNG générés sont versionnés dans public/.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const icon = readFileSync(join(pub, 'favicon.svg'));

const ICONS = [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['logo-512.png', 512],
];

for (const [name, size] of ICONS) {
  await sharp(icon, { density: 72 * (size / 48) * 1.2 })
    .resize(size, size)
    .png()
    .toFile(join(pub, name));
  console.log(`✓ ${name}`);
}

// Image OpenGraph : titre + mini-flux produit. Texte en polices système (sans-serif).
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="0.85" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#2F7D55" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#12372A" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#12372A"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(80 78) scale(1.5)">
    <rect width="48" height="48" rx="13" fill="#ffffff"/>
    <path d="M15 11.5h12.5l6.5 6.5v18a2.5 2.5 0 0 1-2.5 2.5h-16.5a2.5 2.5 0 0 1-2.5-2.5v-22a2.5 2.5 0 0 1 2.5-2.5Z" fill="#12372A"/>
    <path d="M17.5 33.5c0-8 5.6-13.4 14.6-13.8-.5 9-5.9 14.3-13.9 14.3" fill="#8FCF9F"/>
    <circle cx="34" cy="14" r="2.6" fill="#2F7D55"/>
  </g>
  <text x="170" y="126" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="38" font-weight="800" fill="#ffffff">Paysapro <tspan fill="#8FCF9F">AI</tspan></text>
  <text x="80" y="300" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="92" font-weight="800" fill="#ffffff" letter-spacing="-3">Du chantier au devis.</text>
  <text x="80" y="400" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="92" font-weight="800" fill="#8FCF9F" letter-spacing="-3">En quelques minutes.</text>
  <g font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" font-weight="700">
    ${(() => {
      let x = 80;
      return ['Chantier', 'Paysapro AI', 'Devis', 'Signature']
        .map((l, i) => {
          const w = l.length * 14.5 + 56;
          const out = `<rect x="${x}" y="470" width="${w}" height="58" rx="29" fill="${i === 3 ? '#8FCF9F' : '#ffffff'}" fill-opacity="${i === 3 ? 1 : 0.1}"/>
          <text x="${x + w / 2}" y="508" text-anchor="middle" fill="${i === 3 ? '#12372A' : '#ffffff'}">${l}</text>
          ${i < 3 ? `<text x="${x + w + 22}" y="509" text-anchor="middle" fill="#8FCF9F">→</text>` : ''}`;
          x += w + 44;
          return out;
        })
        .join('');
    })()}
  </g>
  <text x="80" y="585" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" fill="#ffffff" fill-opacity="0.6">Devis et gestion de chantiers pour paysagistes · Accès bêta gratuit</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(join(pub, 'og-image.png'));
console.log('✓ og-image.png');
