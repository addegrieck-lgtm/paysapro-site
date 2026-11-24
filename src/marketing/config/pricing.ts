/**
 * Tarifs — SEUL fichier à modifier pour les offres affichées sur le site.
 *
 * Depuis le lancement : mode 'plans' → les trois offres payantes, chacune précédée d'un essai gratuit
 * de 15 jours sans carte bancaire. Les prix ci-dessous doivent rester identiques à ceux de
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
  description: 'Ancienne offre de la phase bêta (n’est plus affichée)',
  badge: 'Bêta',
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
  cta: { label: 'Essayer gratuitement', target: 'signup' },
};

/**
 * Cadeau de l'abonnement annuel : mêmes textes que dans l'application
 * (paysapro-ai : ANNUAL_GIFT dans src/features/plans/plans.ts).
 */
export const ANNUAL_GIFT = {
  name: 'Télémètre laser',
  headline: 'Télémètre laser offert avec tout abonnement annuel',
  conditions:
    'Offert pour tout abonnement annuel payé (Starter, Pro ou Business), un par entreprise, livré en France métropolitaine. Expédition 30 jours après le paiement, dans la limite des stocks disponibles ; le modèle peut varier, à valeur équivalente. Pas de cadeau si l’abonnement est remboursé avant l’envoi.',
} as const;

/** Réduction pour un paiement à l'année (en %). Même valeur que dans l'application. */
export const YEARLY_DISCOUNT_PERCENT = 25;

/** Prix annuel HT : 12 mois moins la réduction. 39 €/mois → 351 €/an. */
export function yearlyPrice(plan: PricingPlan): number | null {
  return plan.price === null ? null : Math.round(plan.price * 12 * (100 - YEARLY_DISCOUNT_PERCENT)) / 100;
}

export const formatEuros = (n: number) =>
  new Intl.NumberFormat('fr-FR', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n).replace(/[\u202f\u00a0]/g, ' ');

/** « 351 € HT / an, soit 29,25 € HT / mois » — null si le plan n'a pas de prix. */
export function formatYearlyPrice(plan: PricingPlan): { yearly: string; monthlyEquivalent: string } | null {
  const yearly = yearlyPrice(plan);
  if (yearly === null || yearly === 0) return null;
  return { yearly: `${formatEuros(yearly)} € HT / an`, monthlyEquivalent: `soit ${formatEuros(Math.round((yearly / 12) * 100) / 100)} € HT / mois` };
}

/** Offres payantes (après les 15 jours d’essai gratuit). */
export const FUTURE_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    period: 'mois',
    description: 'Pour le paysagiste ou l’artisan indépendant qui démarre.',
    features: ['Devis et PDF à vos couleurs', 'Clients et chantiers', 'Photos chantier', 'Catalogue tarifaire', 'Signature du devis', 'Lien client et signature en ligne', 'Mode SAP', '1 utilisateur'],
    cta: { label: 'Essayer 15 jours gratuits', target: 'signup' },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 39,
    period: 'mois',
    description: 'Pour les entreprises qui envoient des devis chaque semaine.',
    features: ['Tout Starter', 'Mesures et calculs', 'Modèles de devis', 'Planning et statistiques', '3 utilisateurs'],
    highlight: true,
    badge: 'Recommandé',
    cta: { label: 'Essayer 15 jours gratuits', target: 'signup' },
  },
  {
    id: 'business',
    name: 'Business',
    price: 69,
    period: 'mois',
    description: 'Pour les équipes et le suivi de la rentabilité.',
    features: ['Tout Pro', 'Marge et rentabilité des devis', '10 utilisateurs'],
    cta: { label: 'Essayer 15 jours gratuits', target: 'signup' },
  },
];

/** Accroche et nombre d'utilisateurs de chaque offre (page Tarifs). Mêmes droits que l'application (plans.ts). */
export const PLAN_DETAILS: Record<string, { tagline: string; users: number; plus: string[] }> = {
  starter: {
    tagline: 'Le paysagiste ou l’artisan indépendant',
    users: 1,
    plus: ['Devis et factures illimités', 'Lien client et signature en ligne', 'Photos de chantier', 'Catalogue de vos prix', 'Mode SAP et attestation fiscale', 'Assistant : prestations et description'],
  },
  pro: {
    tagline: 'L’entreprise qui chiffre chaque semaine',
    users: 3,
    plus: ['Mesures et calculs de quantités', 'Modèles de devis', 'Planning des chantiers', 'Statistiques', 'Travail en équipe (3 utilisateurs)'],
  },
  business: {
    tagline: 'L’équipe qui pilote sa rentabilité',
    users: 10,
    plus: ['Marge et rentabilité des devis', 'Jusqu’à 10 utilisateurs avec rôles', 'Idéal pour plusieurs équipes de chantier'],
  },
};

/** Inclus dans toutes les offres. */
export const INCLUDED_IN_ALL: { title: string; text: string }[] = [
  { title: 'Devis, factures et clients illimités', text: 'Aucun plafond, aucun supplément au nombre de documents.' },
  { title: 'Facture électronique Factur-X', text: 'Format EN 16931 de la réforme, acomptes, soldes et avoirs.' },
  { title: 'PDF à vos couleurs', text: 'Logo, mentions obligatoires, TVA par taux (20 / 10 / 5,5 %).' },
  { title: 'Application mobile', text: 'Sur le chantier, sur téléphone, tablette et ordinateur.' },
  { title: 'Paysagistes et artisans du BTP', text: 'Catalogue, modèles et calculs adaptés à votre métier.' },
  { title: 'Vos données vous appartiennent', text: 'Export à tout moment, consultables même sans abonnement.' },
];

/** Tableau comparatif : true = inclus, false = non inclus, texte = valeur. */
export const PLAN_COMPARISON: { group: string; rows: { label: string; values: [boolean | string, boolean | string, boolean | string] }[] }[] = [
  {
    group: 'Devis et factures',
    rows: [
      { label: 'Devis et factures illimités', values: [true, true, true] },
      { label: 'Facture électronique Factur-X', values: [true, true, true] },
      { label: 'Signature du devis', values: [true, true, true] },
      { label: 'Lien client et signature en ligne', values: [true, true, true] },
      { label: 'Mode SAP et attestation fiscale', values: [true, true, true] },
      { label: 'Modèles de devis', values: [false, true, true] },
    ],
  },
  {
    group: 'Chantier',
    rows: [
      { label: 'Clients, chantiers et photos', values: [true, true, true] },
      { label: 'Catalogue de vos prix', values: [true, true, true] },
      { label: 'Mesures et calculs de quantités', values: [false, true, true] },
      { label: 'Planning des chantiers', values: [false, true, true] },
    ],
  },
  {
    group: 'Pilotage',
    rows: [
      { label: 'Statistiques', values: [false, true, true] },
      { label: 'Marge et rentabilité des devis', values: [false, false, true] },
      { label: 'Utilisateurs', values: ['1', '3', '10'] },
    ],
  },
];

export const PRICING_CONFIG = {
  mode: 'plans' as 'beta' | 'plans',
  betaNotice:
    'Chaque offre commence par 15 jours d’essai gratuit avec toutes les fonctionnalités, sans carte bancaire. Prix hors taxes, sans engagement : résiliable à tout moment. Sans abonnement, vos données restent consultables et exportables.',
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
