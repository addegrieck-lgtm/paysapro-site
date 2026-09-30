/**
 * Tarifs — SEUL fichier à modifier pour passer de la bêta gratuite aux plans payants.
 *
 * Pendant la bêta : mode 'beta' → seule l'offre BÊTA est affichée, aucun paiement.
 * Après la bêta : passer mode à 'plans'. Les prix ci-dessous doivent rester identiques à ceux de
 * l'application (paysapro-ai : src/features/plans/plans.ts).
 * Aucun paiement n'est déclenché par le site marketing : le CTA mène à l'application,
 * qui gérera le checkout Stripe côté serveur (clé secrète jamais exposée ici).
 */

export type PlanCtaTarget = 'signup' | 'contact';

export interface PricingPlan {
  id: string;
  name: string;
  /** Prix en euros HT. null = « à venir » (non affiché comme un prix). */
  price: number | null;
  period: 'mois' | 'an' | null;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  cta: { label: string; target: PlanCtaTarget };
  /** Identifiant Stripe public (price_…). Ne jamais mettre de clé secrète. */
  stripePriceId?: string;
}

export const BETA_PLAN: PricingPlan = {
  id: 'beta',
  name: 'Bêta',
  price: 0,
  period: null,
  description: 'Accès gratuit pendant la phase bêta',
  badge: 'Accès bêta gratuit',
  highlight: true,
  features: [
    'Fonctionnalités Premium Max',
    'Clients',
    'Chantiers',
    'Photos',
    'Calculs',
    'Catalogue tarifaire',
    'Devis',
    'Signature',
    'Tableau de bord',
    'Mode SAP et attestation fiscale',
    'Accès mobile',
  ],
  cta: { label: 'Rejoindre la bêta', target: 'signup' },
};

/** Réduction pour un paiement à l'année (en %). Même valeur que dans l'application. */
export const YEARLY_DISCOUNT_PERCENT = 25;

/** Prix annuel HT : 12 mois moins la réduction. 39 €/mois → 351 €/an. */
export function yearlyPrice(plan: PricingPlan): number | null {
  return plan.price === null ? null : Math.round(plan.price * 12 * (100 - YEARLY_DISCOUNT_PERCENT)) / 100;
}

const euros = (n: number) =>
  new Intl.NumberFormat('fr-FR', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n).replace(/[\u202f\u00a0]/g, ' ');

/** « 351 € HT / an, soit 29,25 € HT / mois » — null si le plan n'a pas de prix. */
export function formatYearlyPrice(plan: PricingPlan): { yearly: string; monthlyEquivalent: string } | null {
  const yearly = yearlyPrice(plan);
  if (yearly === null || yearly === 0) return null;
  return { yearly: `${euros(yearly)} € HT / an`, monthlyEquivalent: `soit ${euros(Math.round((yearly / 12) * 100) / 100)} € HT / mois` };
}

/** Offres prévues après la bêta : affichées sous l'offre bêta, à titre d'information. */
export const FUTURE_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    period: 'mois',
    description: 'Pour le paysagiste indépendant qui démarre.',
    features: ['Devis et PDF à vos couleurs', 'Clients et chantiers', 'Photos chantier', 'Catalogue tarifaire', 'Signature du devis', '1 utilisateur'],
    cta: { label: 'Commencer', target: 'signup' },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 39,
    period: 'mois',
    description: 'Pour les entreprises qui envoient des devis chaque semaine.',
    features: ['Tout Starter', 'Mesures et calculs', 'Modèles de devis', 'Lien client et signature en ligne', 'Planning et statistiques', 'Mode SAP', '3 utilisateurs'],
    highlight: true,
    badge: 'Le plus choisi',
    cta: { label: 'Choisir Pro', target: 'signup' },
  },
  {
    id: 'business',
    name: 'Business',
    price: 69,
    period: 'mois',
    description: 'Pour les équipes et le suivi de la rentabilité.',
    features: ['Tout Pro', 'Marge et rentabilité des devis', '10 utilisateurs'],
    cta: { label: 'Choisir Business', target: 'signup' },
  },
];

export const PRICING_CONFIG = {
  mode: 'beta' as 'beta' | 'plans',
  betaNotice:
    'Les fonctionnalités et conditions tarifaires pourront évoluer après la période bêta. Les premiers utilisateurs seront informés avant toute évolution payante.',
};

export function visiblePlans(mode: 'beta' | 'plans' = PRICING_CONFIG.mode): PricingPlan[] {
  return mode === 'beta' ? [BETA_PLAN] : FUTURE_PLANS;
}

export function formatPlanPrice(plan: PricingPlan): { amount: string; suffix: string } {
  if (plan.price === null) return { amount: 'Bientôt', suffix: '' };
  const amount = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
    .format(plan.price)
    .replace(/[\u202f\u00a0]/g, ' ');
  return { amount, suffix: plan.period ? `HT / ${plan.period}` : '' };
}
