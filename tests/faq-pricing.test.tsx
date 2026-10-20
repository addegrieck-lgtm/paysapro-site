import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SIGNUP, renderAt, renderPage } from './utils';
import { BETA_PLAN, FUTURE_PLANS, formatPlanPrice, formatYearlyPrice, visiblePlans, yearlyPrice, YEARLY_DISCOUNT_PERCENT } from '../src/marketing/config/pricing';

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
  it('essai gratuit de 15 jours, puis trois offres avec leurs prix et un CTA vers l’inscription', async () => {
    expect(visiblePlans().map((p) => p.id)).toEqual(['starter', 'pro', 'business']);
    expect(FUTURE_PLANS.map((p) => formatPlanPrice(p).amount)).toEqual(['19 €', '39 €', '69 €']);
    for (const p of FUTURE_PLANS) expect(p.stripePriceId).toBeFalsy(); // aucun paiement sur le site

    await renderPage('/tarifs');
    const pro = screen.getByRole('article', { name: 'Pro' });
    expect(within(pro).getByText('39 €')).toBeInTheDocument();
    expect(within(pro).getByText(/351 € HT \/ an \(−25 %\), soit 29,25 € HT \/ mois/)).toBeInTheDocument();
    expect(within(pro).getByRole('link', { name: /Essayer 15 jours gratuits/ })).toHaveAttribute('href', SIGNUP);
    expect(screen.getAllByText(/15 jours d’essai gratuit/).length).toBeGreaterThan(0);
  });

  it('paiement à l’année : 25 % de réduction sur 12 mois', () => {
    expect(YEARLY_DISCOUNT_PERCENT).toBe(25);
    expect(FUTURE_PLANS.map(yearlyPrice)).toEqual([171, 351, 621]);
    expect(formatYearlyPrice(BETA_PLAN)).toBeNull();
  });

  it('aucun lien de paiement sur le site', () => {
    const { container } = renderAt('/');
    expect(container.innerHTML).not.toMatch(/stripe\.com|checkout/i);
  });
});
