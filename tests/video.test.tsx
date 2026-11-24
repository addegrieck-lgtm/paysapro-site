import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { seoPages } from '../src/entry-server';
import { DEVIS_VIDEO } from '../src/marketing/data/videos';
import { renderPage } from './utils';

describe('vidéo YouTube', () => {
  it('la page logiciel devis affiche la miniature, puis le lecteur sans cookie au clic', async () => {
    const user = userEvent.setup();
    await renderPage('/logiciel-devis-paysagiste');
    expect(document.querySelector('iframe')).toBeNull();
    await user.click(screen.getByRole('button', { name: `Lire la vidéo : ${DEVIS_VIDEO.title}` }));
    expect(document.querySelector('iframe')?.getAttribute('src')).toBe(`https://www.youtube-nocookie.com/embed/${DEVIS_VIDEO.id}?autoplay=1&rel=0`);
  });

  it('l’article « Comment faire un devis paysagiste » affiche la vidéo', async () => {
    await renderPage('/blog/comment-faire-un-devis-paysagiste');
    expect(screen.getByRole('button', { name: `Lire la vidéo : ${DEVIS_VIDEO.title}` })).toBeInTheDocument();
  });

  it('les pages qui affichent la vidéo la décrivent en VideoObject', () => {
    const pages = seoPages();
    for (const path of DEVIS_VIDEO.pages) {
      const page = pages.find((p) => p.path === path)!;
      const video = page.jsonLd('https://www.example.test').find((o) => (o as { '@type'?: string })['@type'] === 'VideoObject') as Record<string, unknown>;
      expect(video, path).toMatchObject({ name: DEVIS_VIDEO.title, uploadDate: DEVIS_VIDEO.uploadDate, embedUrl: `https://www.youtube-nocookie.com/embed/${DEVIS_VIDEO.id}` });
    }
  });
});
