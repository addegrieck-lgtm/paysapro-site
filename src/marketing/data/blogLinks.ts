/**
 * Liens internes DANS le texte des articles (pas seulement la liste « À lire aussi » en bas de page).
 *
 * Le corps des articles vient du back-office en texte brut : sans ce module, aucun lien ne part du contenu
 * vers les pages produit, et Google ne voit pas quelles pages comptent. Deux sources de liens :
 *  1. Écrits à la main dans le back-office : `[texte du lien](/chemin)` (chemin interne uniquement).
 *  2. Automatiques : première mention d'une expression métier → page qui en parle (AUTO_LINKS),
 *     et première mention de « Paysapro AI » → page produit choisie pour l'article (premier lien hors blog).
 * Au plus MAX_AUTO_LINKS liens automatiques par article, une seule fois chaque destination, jamais dans un titre.
 */
import pages from '../config/pages.json';
import type { BlogArticle, BlogBlock } from './blog';

export type Segment = string | { text: string; to: string };
export interface LinkedBlock {
  heading?: string;
  paragraphs?: Segment[][];
  list?: Segment[][];
}

export const MAX_AUTO_LINKS = 3;
const DEFAULT_PRODUCT_PAGE = '/logiciel-devis-paysagiste';

/** Expression métier → page qui la traite. À position égale dans le texte, la règle placée la première l'emporte. */
export const AUTO_LINKS: { pattern: RegExp; to: string }[] = [
  { pattern: /attestations? fiscales?/i, to: '/logiciel-paysagiste-services-a-la-personne' },
  { pattern: /Factur-X|facturation électronique|factures? électroniques?/i, to: '/logiciel-facture-electronique' },
  { pattern: /factures? d[’']acompte|factures? de solde|numérotation continue|\bun avoir\b/i, to: '/logiciel-facturation-artisan' },
  { pattern: /artisans? du BTP|(?:assurance|garantie) décennale/i, to: '/logiciel-devis-batiment' },
  { pattern: /taux réduits?(?: de TVA)?/i, to: '/blog/tva-travaux-renovation-taux-reduit' },
  { pattern: /terre végétale/i, to: '/outils/calcul-volume' },
  { pattern: /photos du chantier/i, to: '/application-paysagiste' },
];

const BRAND = /Paysapro AI/;
const MANUAL = /\[([^\]\n]+)\]\((\/[^)\s]*)\)/g;

const indexedPages = new Set(
  Object.entries(pages as Record<string, { noindex?: boolean }>)
    .filter(([, p]) => !p.noindex)
    .map(([path]) => path),
);

/** Pages « logiciel » : celles vers lesquelles le nom de la marque doit mener (pas un calculateur ni un modèle). */
const isProductPage = (to: string) => /^\/(logiciel-|application-|crm-|comparatif-|tarifs$|fonctionnalites$)/.test(to);

/** Page produit de l'article : premier lien éditorial vers une page logiciel, sinon « logiciel de devis paysagiste ». */
export function productPageFor(article: Pick<BlogArticle, 'links'>): string {
  return article.links?.find((l) => isProductPage(l.to) && indexedPages.has(l.to))?.to ?? DEFAULT_PRODUCT_PAGE;
}

/** Transforme le corps d'un article en blocs dont les paragraphes et listes contiennent des liens. */
export function linkArticleBody(article: Pick<BlogArticle, 'slug' | 'links' | 'body'>, liveBlogPaths: Set<string> = new Set()): LinkedBlock[] {
  const isLive = (to: string) => indexedPages.has(to) || liveBlogPaths.has(to);
  const self = `/blog/${article.slug}`;
  const brandTo = productPageFor(article);
  const used = new Set<string>([self]);
  // Une place est réservée au lien « Paysapro AI » → page produit : c'est le lien qui compte le plus.
  const text = (article.body ?? []).flatMap((b) => [...(b.paragraphs ?? []), ...(b.list ?? [])]).join('\n');
  const brandPending = () => BRAND.test(text) && !used.has(brandTo);
  let auto = 0;

  const autoLink = (chunk: string): Segment[] => {
    let best: { index: number; length: number; to: string; brand: boolean } | undefined;
    const genericRoom = auto < MAX_AUTO_LINKS - (brandPending() ? 1 : 0);
    const candidates = [...(genericRoom ? AUTO_LINKS.map((r) => ({ ...r, brand: false })) : []), ...(brandPending() ? [{ pattern: BRAND, to: brandTo, brand: true }] : [])];
    for (const r of candidates) {
      if (used.has(r.to) || !isLive(r.to)) continue;
      const m = r.pattern.exec(chunk);
      if (m && (!best || m.index < best.index)) best = { index: m.index, length: m[0].length, to: r.to, brand: r.brand };
    }
    if (!best) return [chunk];
    used.add(best.to);
    auto += 1;
    const out: Segment[] = [];
    if (best.index > 0) out.push(chunk.slice(0, best.index));
    out.push({ text: chunk.slice(best.index, best.index + best.length), to: best.to });
    const rest = chunk.slice(best.index + best.length);
    if (rest) out.push(...autoLink(rest));
    return out;
  };

  const link = (text: string): Segment[] => {
    const out: Segment[] = [];
    let last = 0;
    for (const m of text.matchAll(MANUAL)) {
      if (m.index > last) out.push(...autoLink(text.slice(last, m.index)));
      const [, label, to] = m;
      // Lien manuel vers une page absente ou non indexée : on garde le texte, sans lien cassé.
      if (isLive(to!) && to !== self) {
        out.push({ text: label!, to: to! });
        used.add(to!);
      } else out.push(label!);
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push(...autoLink(text.slice(last)));
    return out;
  };

  return (article.body ?? []).map((b: BlogBlock) => ({
    heading: b.heading,
    paragraphs: b.paragraphs?.map(link),
    list: b.list?.map(link),
  }));
}

/** Texte brut d'un paragraphe (clé React, tests). */
export const segmentsText = (s: Segment[]) => s.map((x) => (typeof x === 'string' ? x : x.text)).join('');
