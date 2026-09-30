// Après `vite build` (client) et `vite build --ssr` (dist-ssr) :
//  - pré-rend chaque page en HTML statique (le contenu est lisible sans JavaScript → SEO) ;
//  - écrit title / description / canonical / OpenGraph / données structurées propres à chaque page ;
//  - génère sitemap.xml, robots.txt et 404.html.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const env = { ...loadEnv('production', root, 'VITE_'), ...process.env };
const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
const googleVerification = (env.VITE_GOOGLE_SITE_VERIFICATION || '').trim();

if (!siteUrl) {
  console.warn('⚠  VITE_SITE_URL non défini : canonical/sitemap utiliseront des URL relatives. Voir .env.example.');
}

const { render, seoPages } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

async function page(path, { title, description, jsonLd }, { noindex = false } = {}) {
  const url = `${siteUrl}${path === '/' ? '/' : path}`;
  const appHtml = await render(path);
  const extraHead = [
    googleVerification ? `<meta name="google-site-verification" content="${esc(googleVerification)}" />` : '',
    ...(jsonLd?.(siteUrl) ?? []).map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ]
    .filter(Boolean)
    .join('\n    ');

  let html = template
    .replace(/<title data-seo>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta data-seo name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<link data-seo rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${esc(url)}" />`)
    .replace(/<meta data-seo property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta data-seo property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta data-seo property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${esc(url)}" />`)
    .replaceAll('__SITE_URL__', siteUrl)
    .replace('</head>', `${extraHead ? '  ' + extraHead + '\n  ' : ''}</head>`);
  if (noindex) html = html.replace('<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex, follow" />');
  if (!html.includes('<!--app-html-->')) throw new Error('Repère <!--app-html--> introuvable dans index.html');
  // fonction de remplacement : le HTML rendu peut contenir des « $ » (motifs spéciaux de replace)
  return html.replace('<!--app-html-->', () => appHtml);
}

const pages = seoPages();
for (const p of pages) {
  const file = join(dist, p.path === '/' ? 'index.html' : `${p.path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  const html = await page(p.path, p);
  if (!/<h1[\s>]/.test(html)) throw new Error(`Pré-rendu incomplet (pas de <h1>) : ${p.path}`);
  writeFileSync(file, html);
  // /blog : le dossier blog/ existe (articles) → fournir aussi blog/index.html pour les hébergeurs qui redirigent vers /blog/
  if (pages.some((o) => o.path.startsWith(p.path + '/')) && p.path !== '/') {
    mkdirSync(join(dist, p.path.slice(1)), { recursive: true });
    writeFileSync(join(dist, p.path.slice(1), 'index.html'), html);
  }
}

// 404 : servie par l'hébergeur pour les URL inconnues (GitHub Pages, Vercel)
writeFileSync(
  join(dist, '404.html'),
  await page('/404', { title: 'Page introuvable | Paysapro AI', description: 'Cette page n’existe pas ou a été déplacée.' }, { noindex: true }),
);

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path === '/' ? '/' : p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority ?? '0.5'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);

writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`✓ postbuild : ${pages.length} pages pré-rendues, 404.html, sitemap.xml, robots.txt (${siteUrl || 'URL relative'})`);
