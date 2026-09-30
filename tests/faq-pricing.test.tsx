import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SIGNUP, renderAt, renderPage } from './utils';
import { BETA_PLAN, FUTURE_PLANS, formatPlanPrice, visiblePlans } from '../src/marketing/config/pricing';

describe('FAQ', () => {
  it('ouvre une réponse et envoie faq_opened', async () => {
    const user = userEvent.setup();
    const { track } = await renderPage('/faq');
    const q = screen.getByRole('button', { name: /L’IA crée-t-elle automatiquement un devis exact/ });
    expect(q).toHaveAttribute('aria-expanded', 'false');
    await user.click(q);
    expect(q).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: /L’IA crée-t-elle/ })).toHaveTextContent(/Une photo ne permet pas de déterminer avec certitude/);
    expect(track).toHaveBeenCalledWith('faq_opened', { question: 'ia-photo' });
    await user.click(q);
    expect(q).toHaveAttribute('aria-expanded', 'false');
  });

  it('contient les 10 questions', async () => {
    await renderPage('/faq');
    expect(within(screen.getByRole('main')).getAllByRole('button', { expanded: false })).toHaveLength(10);
  });
});

describe('Tarifs', () => {
  it('bêta : un seul plan à 0 €, CTA « Rejoindre la bêta » vers l’inscription', async () => {
    await renderPage('/tarifs');
    const plan = screen.getByRole('article', { name: 'Bêta' });
    expect(within(plan).getByText('0 €')).toBeInTheDocument();
    for (const f of ['Clients', 'Chantiers', 'Signature', 'Accès mobile']) expect(within(plan).getByText(f)).toBeInTheDocument();
    expect(within(plan).getByRole('link', { name: /Rejoindre la bêta/ })).toHaveAttribute('href', SIGNUP);
    expect(screen.getByText(/informés avant toute évolution payante/)).toBeInTheDocument();
  });

  it('les plans futurs sont prêts mais non affichés pendant la bêta', () => {
    expect(visiblePlans()).toEqual([BETA_PLAN]);
    expect(visiblePlans('plans').map((p) => p.id)).toEqual(['starter', 'pro', 'business']);
    for (const p of FUTURE_PLANS) {
      expect(p.stripePriceId).toBeFalsy(); // aucun paiement configuré
      expect(formatPlanPrice(p).amount).toBe('Bientôt'); // aucun prix inventé
    }
  });

  it('aucun lien de paiement sur le site', () => {
    const { container } = renderAt('/');
    expect(container.innerHTML).not.toMatch(/stripe\.com|checkout/i);
  });
});
