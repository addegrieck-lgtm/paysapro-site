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
  it('bêta : un seul plan à 0 €, CTA « Rejoindre la bêta » vers l’inscription', async () => {
    await renderPage('/tarifs');
    const plan = screen.getByRole('article', { name: 'Bêta' });
    expect(within(plan).getByText('0 €')).toBeInTheDocument();
    for (const f of ['Clients', 'Chantiers', 'Signature', 'Accès mobile']) expect(within(plan).getByText(f)).toBeInTheDocument();
    expect(within(plan).getByRole('link', { name: /Rejoindre la bêta/ })).toHaveAttribute('href', SIGNUP);
    expect(screen.getByText(/informés avant toute évolution payante/)).toBeInTheDocument();
  });

  it('pendant la bêta, l’offre active reste la bêta ; les offres futures sont annoncées avec leurs prix', async () => {
    expect(visiblePlans()).toEqual([BETA_PLAN]);
    expect(visiblePlans('plans').map((p) => p.id)).toEqual(['starter', 'pro', 'business']);
    expect(FUTURE_PLANS.map((p) => formatPlanPrice(p).amount)).toEqual(['19 €', '39 €', '69 €']);
    for (const p of FUTURE_PLANS) expect(p.stripePriceId).toBeFalsy(); // aucun paiement sur le site

    await renderPage('/tarifs');
    const pro = screen.getByRole('article', { name: 'Offre Pro' });
    expect(within(pro).getByText('39 €')).toBeInTheDocument();
    expect(within(pro).getByText(/351 € HT \/ an \(−25 %\)/)).toBeInTheDocument();
    expect(within(pro).getByText('soit 29,25 € HT / mois')).toBeInTheDocument();
    expect(within(pro).queryByRole('link')).toBeNull(); // information seulement
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
