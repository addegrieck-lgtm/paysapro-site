// Après `vite build` : génère un fichier HTML par page (title, description, canonical, OpenGraph
// corrects dès le premier octet, utile au SEO et aux aperçus de liens), plus robots.txt et sitemap.xml.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const env = { ...loadEnv('production', root, 'VITE_'), ...process.env };
const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');

if (!siteUrl) {
  console.warn('⚠  VITE_SITE_URL non défini : canonical/sitemap utiliseront des URL relatives. Voir .env.example.');
}

const pages = JSON.parse(readFileSync(join(root, 'src/marketing/config/pages.json'), 'utf8'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function render(path, { title, description }) {
  const url = `${siteUrl}${path === '/' ? '/' : path}`;
  return template
    .replace(/<title data-seo>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta data-seo name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<link data-seo rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${esc(url)}" />`)
    .replace(/<meta data-seo property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta data-seo property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta data-seo property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${esc(url)}" />`)
    .replaceAll('__SITE_URL__', siteUrl);
}

let count = 0;
for (const [path, meta] of Object.entries(pages)) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  writeFileSync(join(dist, file), render(path, meta));
  count++;
}

// 404 servie par Vercel pour les URL inconnues (en complément de la route React)
writeFileSync(
  join(dist, '404.html'),
  render('/404', { title: 'Page introuvable | Paysapro AI', description: 'Cette page n’existe pas ou a été déplacée.' }).replace(
    '<meta name="robots" content="index, follow" />',
    '<meta name="robots" content="noindex, follow" />',
  ),
);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(pages)
  .map(
    ([path, meta]) => `  <url>
    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${meta.priority ?? '0.5'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);

console.log(`✓ postbuild : ${count} pages HTML, 404.html, sitemap.xml, robots.txt (${siteUrl || 'URL relative'})`);
