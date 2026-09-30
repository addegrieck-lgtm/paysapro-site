import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import { AnalyticsProvider } from '../src/marketing/analytics/AnalyticsProvider';
import type { AnalyticsAdapter } from '../src/marketing/analytics/events';
import { MarketingRoutes } from '../src/marketing/routes';

export function renderAt(path: string) {
  const track = vi.fn();
  const adapter: AnalyticsAdapter = { name: 'test', requiresConsent: false, track };
  const utils = render(
    <MemoryRouter initialEntries={[path]}>
      <AnalyticsProvider adapter={adapter}>
        <MarketingRoutes />
      </AnalyticsProvider>
    </MemoryRouter>,
  );
  return { ...utils, track };
}

/** Attend le h1 de la page (les pages hors accueil sont chargées à la demande). */
export async function renderPage(path: string) {
  const r = renderAt(path);
  const h1 = await screen.findByRole('heading', { level: 1 }, { timeout: 4000 });
  return { ...r, h1 };
}

export const APP = 'https://app.example.test';
export const SIGNUP = `${APP}/inscription`;
export const LOGIN = `${APP}/connexion`;

export const PAGES: [path: string, h1: RegExp][] = [
  ['/', /Du chantier au devis/],
  ['/fonctionnalites', /Tout ce qu’il faut, du chantier au devis signé/],
  ['/comment-ca-marche', /Six étapes/],
  ['/tarifs', /Commencez gratuitement/],
  ['/faq', /Questions fréquentes/],
  ['/contact', /Une question \? Parlons-en/],
  ['/a-propos', /Un outil moderne/],
  ['/aide', /Comment pouvons-nous vous aider/],
  ['/logiciel-devis-paysagiste', /logiciel de devis pensé pour les paysagistes/],
  ['/logiciel-gestion-paysagiste', /Clients, chantiers, devis/],
  ['/application-paysagiste', /application de chantier du paysagiste/],
  ['/modele-devis-paysagiste', /Exemple de devis paysagiste/],
  ['/outils', /Calculateurs pour paysagistes/],
  ['/outils/calcul-surface', /Calculateur de surface/],
  ['/outils/calcul-volume', /Calculateur de volume/],
  ['/outils/calcul-cloture', /Calculateur de clôture/],
  ['/blog', /Conseils pour les paysagistes/],
  ['/blog/comment-faire-un-devis-paysagiste', /Comment faire un devis paysagiste/],
  ['/blog/calculer-surface-terrasse', /surface d’une terrasse/],
  ['/blog/calculer-prix-cloture', /prix d’une clôture/],
  ['/mentions-legales', /Mentions légales/],
  ['/confidentialite', /Politique de confidentialité/],
  ['/cgu', /Conditions générales d’utilisation/],
  ['/cookies', /Politique cookies/],
];
