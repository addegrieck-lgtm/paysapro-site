import { describe, expect, it } from 'vitest';
import pages from '../src/marketing/config/pages.json';
import { publishedArticles } from '../src/marketing/data/blog';
import { MAX_AUTO_LINKS, linkArticleBody, productPageFor, segmentsText, type LinkedBlock, type Segment } from '../src/marketing/data/blogLinks';
import { PAID_PLANS, REFERENCE, seoPages } from '../src/entry-server';

const linksOf = (blocks: LinkedBlock[]) =>
  blocks.flatMap((b) => [...(b.paragraphs ?? []), ...(b.list ?? [])]).flatMap((s: Segment[]) => s.filter((x) => typeof x !== 'string'));

describe('liens dans le texte des articles', () => {
  const live = new Set(publishedArticles().map((a) => `/blog/${a.slug}`));

  it('chaque article publié a au moins un lien dans son texte, vers une page qui existe', () => {
    const indexed = new Set(Object.entries(pages as Record<string, { noindex?: boolean }>).filter(([, p]) => !p.noindex).map(([k]) => k));
    for (const a of publishedArticles()) {
      const links = linksOf(linkArticleBody(a, live));
      expect(links.length, a.slug).toBeGreaterThanOrEqual(1);
      for (const l of links) expect(indexed.has(l.to) || live.has(l.to), `${a.slug} → ${l.to}`).toBe(true);
    }
  });

  it('au plus 3 liens automatiques, une seule fois chaque destination, jamais vers l’article lui-même', () => {
    for (const a of publishedArticles()) {
      const targets = linksOf(linkArticleBody(a, live)).map((l) => l.to);
      expect(targets.length, a.slug).toBeLessThanOrEqual(MAX_AUTO_LINKS);
      expect(new Set(targets).size, a.slug).toBe(targets.length);
      expect(targets, a.slug).not.toContain(`/blog/${a.slug}`);
    }
  });

  it('le texte affiché est inchangé (seuls des liens sont ajoutés)', () => {
    for (const a of publishedArticles()) {
      linkArticleBody(a, live).forEach((b, i) => {
        expect(b.paragraphs?.map(segmentsText), a.slug).toEqual(a.body![i]!.paragraphs);
        expect(b.list?.map(segmentsText), a.slug).toEqual(a.body![i]!.list);
      });
    }
  });

  it('« Paysapro AI » mène à la page produit choisie pour l’article', () => {
    const a = { slug: 'x', links: [{ label: 'Blog', to: '/blog/y' }, { label: 'SAP', to: '/logiciel-paysagiste-services-a-la-personne' }], body: [{ paragraphs: ['Avec Paysapro AI, c’est simple.'] }] };
    expect(productPageFor(a)).toBe('/logiciel-paysagiste-services-a-la-personne');
    expect(linkArticleBody(a)[0]!.paragraphs![0]).toEqual(['Avec ', { text: 'Paysapro AI', to: '/logiciel-paysagiste-services-a-la-personne' }, ', c’est simple.']);
  });

  it('lien écrit dans le back-office : [texte](/chemin), retiré s’il vise une page absente', () => {
    const a = { slug: 'x', body: [{ paragraphs: ['Voir [nos tarifs](/tarifs) et [ceci](/page-absente).'] }] };
    expect(linkArticleBody(a)[0]!.paragraphs![0]).toEqual(['Voir ', { text: 'nos tarifs', to: '/tarifs' }, ' et ', 'ceci', '.']);
  });
});

describe('prix identiques partout (pricing.ts = source unique)', () => {
  const meta = pages as Record<string, { title: string; description: string }>;
  const min = Math.min(...PAID_PLANS.map((p) => p.price));

  it('title et description de /tarifs, présentation de référence (llms.txt)', () => {
    expect(meta['/tarifs']!.title).toContain(`dès ${min} €`);
    for (const p of PAID_PLANS) {
      expect(meta['/tarifs']!.description, p.name).toContain(`${p.name} ${p.price} €`);
      expect(REFERENCE, p.name).toContain(`${p.name} (${p.price} €)`);
    }
  });

  it('JSON-LD : offres de /tarifs et fourchette de l’accueil', () => {
    const ld = (path: string) => JSON.stringify(seoPages().find((p) => p.path === path)!.jsonLd('https://x'));
    for (const p of PAID_PLANS) expect(ld('/tarifs')).toContain(`"price":"${p.price}"`);
    expect(ld('/')).toContain(`"lowPrice":"${min}"`);
    expect(ld('/')).toContain(`"offerCount":${PAID_PLANS.length}`);
  });
});
