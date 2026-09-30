import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { matchRoutes } from 'react-router';
import { PAGES, renderAt, renderPage } from './utils';
import { ROUTE_PATHS } from '../src/marketing/routes';
import pages from '../src/marketing/config/pages.json';

describe('routes', () => {
  it.each(PAGES)('%s affiche sa page avec un seul h1', async (path, title) => {
    const { h1 } = await renderPage(path);
    expect(h1).toHaveTextContent(title);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    // chaque page a un CTA vers l'application ou le contact
    expect(screen.getAllByRole('link', { name: /essayer|rejoindre|commencer|tester|créer mon compte/i }).length).toBeGreaterThan(0);
  });

  it('affiche la page 404 personnalisée pour une URL inconnue', async () => {
    renderAt('/cette-page-nexiste-pas');
    expect(await screen.findByRole('heading', { level: 1, name: /perdue sur le chantier/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Retour à l’accueil' })).toHaveAttribute('href', '/');
  });

  it('un article de blog non publié renvoie la 404', async () => {
    renderAt('/blog/organiser-ses-chantiers');
    expect(await screen.findByRole('heading', { level: 1, name: /perdue sur le chantier/ })).toBeInTheDocument();
  });

  it('chaque page SEO (pages.json) correspond à une route', () => {
    const routes = ROUTE_PATHS.map((path) => ({ path }));
    for (const path of Object.keys(pages)) {
      expect(matchRoutes(routes, path), path).not.toBeNull();
    }
  });
});
