/**
 * Configuration centrale du site marketing.
 * Toutes les valeurs d'environnement sont PUBLIQUES (préfixe VITE_) : aucune clé secrète ici.
 */

const env = import.meta.env;

function clean(value: string | undefined): string {
  return (value ?? '').trim();
}

function joinUrl(base: string, path: string): string {
  if (!path) return base;
  if (path.startsWith('#') || path.startsWith('?')) return base.replace(/\/?$/, '/') + path;
  return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
}

const appUrl = clean(env.VITE_APP_URL);

if (!appUrl && env.DEV && env.MODE !== 'test') {
  console.warn('[Paysapro] VITE_APP_URL est vide : les CTA renvoient vers /contact. Copiez .env.example en .env.local.');
}

/** Interrupteurs d'affichage : activer / désactiver rapidement des parties du site. */
export const MARKETING_CONFIG = {
  betaMode: true,
  showPricing: true,
  showTestimonials: false,
  showDemo: clean(env.VITE_ENABLE_DEMO_CTA) === 'true',
  showBlog: true,
  showAmbassador: false,
} as const;

export const SITE = {
  name: 'Paysapro AI',
  tagline: 'L’assistant intelligent des professionnels du paysage.',
  url: clean(env.VITE_SITE_URL).replace(/\/+$/, ''),
} as const;

/** Liens vers l'application SaaS (séparée du site). Sans VITE_APP_URL : repli vers /contact. */
export const APP_LINKS = {
  configured: Boolean(appUrl),
  home: appUrl || '/contact',
  signup: appUrl ? joinUrl(appUrl, clean(env.VITE_APP_SIGNUP_PATH)) : '/contact',
  login: appUrl ? joinUrl(appUrl, clean(env.VITE_APP_LOGIN_PATH)) : '/contact',
} as const;

/** Coordonnées publiques : affichées uniquement si elles sont renseignées. Ne jamais en inventer. */
export const CONTACT = {
  email: clean(env.VITE_CONTACT_EMAIL),
  phone: clean(env.VITE_CONTACT_PHONE),
  /** Ajouter ici les réseaux sociaux lorsqu'ils existent réellement. */
  socials: [{ label: 'YouTube', url: 'https://www.youtube.com/@PAYSAPRO-AI' }] as { label: string; url: string }[],
};

export const DEMO_VIDEO_URL = clean(env.VITE_DEMO_VIDEO_URL);

export const LEAD_ENDPOINT = clean(env.VITE_LEAD_ENDPOINT);

/** Supabase : URL du projet + clé PUBLIQUE (publishable/anon). Jamais la clé secrète. */
export const SUPABASE = {
  url: clean(env.VITE_SUPABASE_URL).replace(/\/+$/, ''),
  publishableKey: clean(env.VITE_SUPABASE_PUBLISHABLE_KEY),
};

export type AnalyticsProviderName = 'none' | 'console' | 'plausible';

export const ANALYTICS = {
  provider: (clean(env.VITE_ANALYTICS_PROVIDER) || 'none') as AnalyticsProviderName,
  plausibleDomain: clean(env.VITE_PLAUSIBLE_DOMAIN),
  plausibleScriptUrl: clean(env.VITE_PLAUSIBLE_SCRIPT_URL) || 'https://plausible.io/js/script.js',
};

/** Micro-copies rassurantes réutilisées dans le site. */
export const MICRO_COPY = {
  field: 'Pensé pour le terrain.',
  prices: 'Vos prix, vos règles.',
  control: 'Vous gardez le contrôle.',
  mobile: 'Accessible depuis votre smartphone.',
  pros: 'Conçu pour les professionnels du paysage.',
} as const;
