// Avant le build : copie les articles publiés ou programmés depuis le back-office (table Supabase blog_posts,
// migration 0010 de l'application) dans src/marketing/data/blog.generated.json, lu par le site.
// Lecture avec la clé PUBLIQUE : la base n'expose que les articles au statut « publié » (RLS).
// Si la base est injoignable, vide ou pas encore créée, le fichier versionné est conservé tel quel :
// le site ne perd jamais ses articles à cause d'un incident réseau.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'src/marketing/data/blog.generated.json');
const env = { ...loadEnv('production', root, 'VITE_'), ...process.env };
const url = (env.VITE_SUPABASE_URL || '').trim().replace(/\/+$/, '');
const key = (env.VITE_SUPABASE_PUBLISHABLE_KEY || '').trim();

const keep = (why) => {
  console.warn(`⚠  Blog : ${why} — articles du fichier versionné conservés.`);
  process.exit(0);
};

if (!url || !key) keep('Supabase non configuré');

const columns = 'slug,title,excerpt,keywords,published_at,display_updated_at,reading_minutes,summary,links,body';
let rows;
try {
  const res = await fetch(`${url}/rest/v1/blog_posts?select=${columns}&status=eq.published&order=published_at.desc,slug.asc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) keep(`réponse ${res.status} de la base (migration 0010 appliquée ?)`);
  rows = await res.json();
} catch (e) {
  keep(`base injoignable (${e instanceof Error ? e.message : e})`);
}
if (!Array.isArray(rows) || rows.length === 0) keep('aucun article dans la base (importez-les depuis le back-office)');

/** Ligne de la base → format lu par le site (src/marketing/data/blog.ts). Champs vides omis. */
export function toArticle(r) {
  const a = { slug: r.slug, title: r.title, excerpt: r.excerpt ?? '', keywords: r.keywords ?? [] };
  if (r.published_at) a.publishedAt = r.published_at;
  if (r.display_updated_at) a.updatedAt = r.display_updated_at;
  if (r.reading_minutes) a.readingMinutes = r.reading_minutes;
  if (r.summary?.length) a.summary = r.summary;
  if (r.links?.length) a.links = r.links;
  if (r.body?.length) a.body = r.body;
  return a;
}

const articles = rows.map(toArticle);
const before = readFileSync(out, 'utf8');
const after = JSON.stringify(articles, null, 2) + '\n';
writeFileSync(out, after);
console.log(`✓ Blog : ${articles.length} article(s) lus dans la base${before === after ? ' (inchangés)' : ''}.`);
