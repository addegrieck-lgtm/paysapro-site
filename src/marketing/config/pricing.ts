/**
 * Tarifs — SEUL fichier à modifier pour passer de la bêta gratuite aux plans payants.
 *
 * Pendant la bêta : mode 'beta' → seule l'offre BÊTA est affichée, aucun paiement.
 * Plus tard : renseigner price / stripePriceId des plans puis passer mode à 'plans'.
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
    'Accès mobile',
  ],
  cta: { label: 'Rejoindre la bêta', target: 'signup' },
};

/** Plans futurs : préparés, non affichés tant que mode === 'beta'. Prix à définir. */
export const FUTURE_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: null,
    period: 'mois',
    description: 'Pour le paysagiste indépendant qui démarre.',
    features: ['Clients et chantiers', 'Photos chantier', 'Calculs', 'Devis professionnels'],
    cta: { label: 'Commencer', target: 'signup' },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: null,
    period: 'mois',
    description: 'Pour les entreprises qui envoient des devis chaque semaine.',
    features: ['Tout Starter', 'Catalogue tarifaire', 'Signature client', 'Tableau de bord'],
    highlight: true,
    badge: 'Le plus choisi',
    cta: { label: 'Choisir Pro', target: 'signup' },
  },
  {
    id: 'premium',
    name: 'Premium',
    price: null,
    period: 'mois',
    description: 'Pour les équipes de 2 à 20 personnes.',
    features: ['Tout Pro', 'Assistant IA', 'Plusieurs utilisateurs', 'Accompagnement'],
    cta: { label: 'Nous contacter', target: 'contact' },
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
