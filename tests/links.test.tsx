import { describe, expect, it } from 'vitest';
import { matchRoutes } from 'react-router';
import { cleanup } from '@testing-library/react';
import { APP, PAGES, renderPage } from './utils';
import { ROUTE_PATHS } from '../src/marketing/routes';
import { publishedArticles } from '../src/marketing/data/blog';

const published = publishedArticles().map((a) => a.slug);

const routes = ROUTE_PATHS.map((path) => ({ path }));

describe('liens', () => {
  it('aucun lien interne cassé et aucune ancre manquante', async () => {
    const internal = new Set<string>();
    const idsByPage = new Map<string, Set<string>>();

    for (const [path] of PAGES) {
      const { container } = await renderPage(path);
      idsByPage.set(path, new Set([...container.ownerDocument.querySelectorAll('[id]')].map((e) => e.id)));
      for (const a of container.ownerDocument.querySelectorAll('a[href]')) {
        const href = a.getAttribute('href')!;
        expect(href, `lien vide sur ${path}`).not.toBe('');
        expect(href, `lien « # » sur ${path}`).not.toBe('#');
        if (href.startsWith('/')) internal.add(href);
        else if (href.startsWith('#')) internal.add(`${path}${href}`);
        else expect(href.startsWith(APP) || /^(mailto:|tel:|https:)/.test(href), `lien inattendu ${href} sur ${path}`).toBe(true);
      }
      cleanup();
    }

    for (const href of internal) {
      const url = new URL(href, 'https://x.test');
      // un lien vers un article doit viser un article réellement publié
      if (url.pathname.startsWith('/blog/')) expect(published, `article non publié : ${href}`).toContain(url.pathname.slice(6));
      expect(matchRoutes(routes, url.pathname), `route inconnue : ${href}`).not.toBeNull();
      if (url.hash) {
        const ids = idsByPage.get(url.pathname);
        expect(ids?.has(url.hash.slice(1)), `ancre introuvable : ${href}`).toBe(true);
      }
    }
    expect(internal.size).toBeGreaterThan(10);
  }, 30_000);
});
