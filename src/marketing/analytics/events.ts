/** Événements de conversion suivis. Aucune donnée personnelle ne doit être envoyée en propriété. */
export type MarketingEvent =
  | 'hero_cta_clicked'
  | 'pricing_cta_clicked'
  | 'signup_clicked'
  | 'demo_clicked'
  | 'faq_opened'
  | 'contact_clicked'
  | 'app_login_clicked'
  | 'contact_submitted'
  | 'newsletter_submitted';

/** Propriétés autorisées : uniquement du contexte (emplacement, libellé…), jamais d'email/nom/téléphone. */
export type EventProps = Record<string, string | number | boolean>;

export interface AnalyticsAdapter {
  name: string;
  /** true si l'outil dépose des cookies / identifiants → consentement préalable requis. */
  requiresConsent: boolean;
  init?: () => void;
  track: (event: MarketingEvent, props?: EventProps) => void;
}
