import { describe, expect, it } from 'vitest';
import { BLOG_ARTICLES, publishedArticles } from '../src/marketing/data/blog';

describe('blog : publication programmée', () => {
  it('un article daté du futur n’est pas publié avant sa date', () => {
    const slugs = (d: string) => publishedArticles(d).map((a) => a.slug);
    expect(slugs('2026-11-02')).not.toContain('comment-chiffrer-creation-pelouse');
    expect(slugs('2026-11-03')).toContain('comment-chiffrer-creation-pelouse');
    expect(slugs('2026-11-03')).not.toContain('relancer-un-devis-sans-reponse');
  });

  it('les plus récents d’abord', () => {
    const dates = publishedArticles('2027-01-01').map((a) => a.publishedAt!);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('slugs uniques et liens internes vers des articles existants', () => {
    const slugs = BLOG_ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const a of BLOG_ARTICLES) {
      for (const l of a.links ?? []) {
        if (l.to.startsWith('/blog/')) expect(slugs, `${a.slug} → ${l.to}`).toContain(l.to.slice(6));
      }
    }
  });
});
