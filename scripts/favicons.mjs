// Génère le jeu complet de favicons à partir d'un SVG : node scripts/favicons.mjs <icone.svg> <dossierPng> <dossierIco>
// - favicon.ico (16, 32, 48 px) : demandé par défaut par les navigateurs et les moteurs de recherche
// - favicon-48.png, favicon-96.png : tailles utilisées par Google dans ses résultats
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const [svgPath = 'public/favicon.svg', pngDir = 'public', icoDir = 'public'] = process.argv.slice(2);
const svg = readFileSync(resolve(svgPath));
const png = (size) => sharp(svg, { density: 72 * (size / 48) * 2 }).resize(size, size).png().toBuffer();

mkdirSync(resolve(pngDir), { recursive: true });
for (const size of [48, 96]) {
  writeFileSync(join(resolve(pngDir), `favicon-${size}.png`), await png(size));
  console.log(`✓ favicon-${size}.png`);
}

// Fichier .ico contenant des images PNG (format accepté par tous les navigateurs actuels)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16);
  e[0] = sizes[i];
  e[1] = sizes[i];
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  return e;
});
writeFileSync(join(resolve(icoDir), 'favicon.ico'), Buffer.concat([header, ...entries, ...images]));
console.log('✓ favicon.ico');
