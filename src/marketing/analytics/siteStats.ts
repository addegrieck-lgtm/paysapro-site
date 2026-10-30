import { SUPABASE } from '../config/marketing';

/**
 * Mesure d'audience maison, affichée dans le back-office de l'application (onglet Site).
 * Envoie chaque page vue et les clics importants dans la table Supabase `site_events` (insertion seule,
 * clé publique). Sans cookie ni identifiant durable : une visite = un identifiant aléatoire gardé le temps
 * de l'onglet (sessionStorage). Pas d'adresse IP, pas de donnée saisie dans les formulaires.
 * Désactivable sur un appareil avec ?stats=off (vos propres visites), réactivable avec ?stats=on.
 */
export type Medium = 'direct' | 'search' | 'ai' | 'social' | 'referral' | 'email' | 'campaign' | 'ads';

export interface Attribution {
  source: string;
  medium: Medium;
  campaign: string | null;
  referrerHost: string | null;
}

const VISIT_KEY = 'paysapro-visit';
const OFF_KEY = 'paysapro-stats-off';

const SEARCH: [RegExp, string][] = [
  [/(^|\.)google\./, 'Google'],
  [/(^|\.)bing\.com$/, 'Bing'],
  [/(^|\.)qwant\.com$/, 'Qwant'],
  [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo'],
  [/(^|\.)ecosia\.org$/, 'Ecosia'],
  [/(^|\.)yahoo\./, 'Yahoo'],
  [/(^|\.)lilo\.org$/, 'Lilo'],
  [/(^|\.)yandex\./, 'Yandex'],
];
const AI: [RegExp, string][] = [
  [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/, 'ChatGPT'],
  [/(^|\.)perplexity\.ai$/, 'Perplexity'],
  [/(^|\.)claude\.ai$/, 'Claude'],
  [/(^|\.)gemini\.google\.com$/, 'Gemini'],
  [/(^|\.)copilot\.microsoft\.com$/, 'Copilot'],
  [/(^|\.)(mistral\.ai|chat\.mistral\.ai)$/, 'Le Chat (Mistral)'],
];
const SOCIAL: [RegExp, string][] = [
  [/(^|\.)(facebook\.com|fb\.com|fb\.me|m\.facebook\.com|l\.facebook\.com)$/, 'Facebook'],
  [/(^|\.)instagram\.com$/, 'Instagram'],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, 'LinkedIn'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'YouTube'],
  [/(^|\.)(t\.co|twitter\.com|x\.com)$/, 'X (Twitter)'],
  [/(^|\.)(pinterest\.[a-z.]+|pin\.it)$/, 'Pinterest'],
  [/(^|\.)tiktok\.com$/, 'TikTok'],
  [/(^|\.)whatsapp\.com$/, 'WhatsApp'],
];
const EMAIL = /(^|\.)(mail\.google\.com|outlook\.(live|office)\.com|mail\.yahoo\.com|webmail\.|mail\.orange\.fr|laposte\.net)/;

function match(host: string, list: [RegExp, string][]): string | null {
  return list.find(([re]) => re.test(host))?.[1] ?? null;
}

/** D'où vient le visiteur : paramètres utm_* et gclid d'abord, puis le site d'origine (referrer). */
export function attribute(url: URL, referrer: string, ownHost: string): Attribution {
  const p = url.searchParams;
  const utmSource = p.get('utm_source')?.trim().slice(0, 80);
  const utmMedium = p.get('utm_medium')?.trim().toLowerCase() ?? '';
  const campaign = p.get('utm_campaign')?.trim().slice(0, 120) || null;
  let referrerHost: string | null = null;
  try {
    const h = referrer ? new URL(referrer).hostname.toLowerCase().replace(/^www\./, '') : '';
    if (h && h !== ownHost.replace(/^www\./, '')) referrerHost = h.slice(0, 120);
  } catch {
    /* referrer illisible */
  }

  if (p.has('gclid') || p.has('gbraid') || p.has('wbraid')) return { source: 'Google Ads', medium: 'ads', campaign, referrerHost };
  if (p.has('fbclid') && !utmSource) return { source: 'Facebook', medium: 'social', campaign, referrerHost };
  if (utmSource) {
    const medium: Medium = /cpc|ppc|paid|ads?$/.test(utmMedium) ? 'ads' : /mail|newsletter/.test(utmMedium) ? 'email' : /social/.test(utmMedium) ? 'social' : 'campaign';
    return { source: utmSource, medium, campaign, referrerHost };
  }
  if (!referrerHost) return { source: 'Accès direct', medium: 'direct', campaign, referrerHost };
  const search = match(referrerHost, SEARCH);
  if (search) return { source: search, medium: 'search', campaign, referrerHost };
  const ai = match(referrerHost, AI);
  if (ai) return { source: ai, medium: 'ai', campaign, referrerHost };
  const social = match(referrerHost, SOCIAL);
  if (social) return { source: social, medium: 'social', campaign, referrerHost };
  if (EMAIL.test(referrerHost)) return { source: 'E-mail', medium: 'email', campaign, referrerHost };
  if (/(^|\.)paysapro-ai\.fr$/.test(referrerHost)) return { source: 'Application Paysapro AI', medium: 'referral', campaign, referrerHost };
  return { source: referrerHost, medium: 'referral', campaign, referrerHost };
}

export function deviceOf(width: number): 'mobile' | 'tablet' | 'desktop' {
  return width < 640 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';
}

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|bingpreview/i;

function storage(kind: 'local' | 'session'): Storage | null {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function enabled(): boolean {
  if (typeof window === 'undefined' || !import.meta.env.PROD || !SUPABASE.url || !SUPABASE.publishableKey) return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.webdriver || BOT.test(nav.userAgent) || nav.doNotTrack === '1' || nav.globalPrivacyControl) return false;
  const stats = new URLSearchParams(window.location.search).get('stats');
  if (stats === 'off') storage('local')?.setItem(OFF_KEY, '1');
  if (stats === 'on') storage('local')?.removeItem(OFF_KEY);
  return storage('local')?.getItem(OFF_KEY) !== '1';
}

interface Visit extends Attribution {
  id: string;
}

let visit: Visit | null = null;

/** La visite en cours (créée à la première page de l'onglet, avec sa source). */
function currentVisit(): Visit {
  if (visit) return visit;
  const s = storage('session');
  try {
    const saved = s?.getItem(VISIT_KEY);
    if (saved) return (visit = JSON.parse(saved) as Visit);
  } catch {
    /* visite illisible : on en démarre une autre */
  }
  const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now().toString(16)}-0000-4000-8000-${Math.random().toString(16).slice(2, 14).padEnd(12, '0')}`;
  visit = { id, ...attribute(new URL(window.location.href), document.referrer, window.location.hostname) };
  try {
    s?.setItem(VISIT_KEY, JSON.stringify(visit));
  } catch {
    /* stockage indisponible : la visite vaut pour cette page */
  }
  return visit;
}

function send(kind: string, path: string, label?: string) {
  const v = currentVisit();
  const row = {
    session_id: v.id,
    kind,
    path: path.slice(0, 300) || '/',
    label: label?.slice(0, 80) ?? null,
    source: v.source,
    medium: v.medium,
    campaign: v.campaign,
    referrer_host: v.referrerHost,
    device: deviceOf(window.innerWidth),
    lang: (navigator.language || '').slice(0, 12) || null,
  };
  // keepalive : le clic « Essayer » quitte la page, la requête doit partir quand même.
  void fetch(`${SUPABASE.url}/rest/v1/site_events`, {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json', apikey: SUPABASE.publishableKey, Authorization: `Bearer ${SUPABASE.publishableKey}`, Prefer: 'return=minimal' },
    body: JSON.stringify(row),
  }).catch(() => undefined);
}

let lastPath = '';

/** Page vue (appelée à chaque changement de page ; ignore les doublons immédiats). */
export function trackPageview(path: string) {
  if (path === lastPath || !enabled()) return;
  lastPath = path;
  send('pageview', path);
}

/** Clic ou envoi de formulaire important ; `label` = emplacement (hero, tarifs…), jamais une donnée saisie. */
export function trackSiteEvent(kind: string, label?: string) {
  if (!enabled()) return;
  send(kind, window.location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '') || '/', label);
}
