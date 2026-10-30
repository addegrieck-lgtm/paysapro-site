import { describe, expect, it } from 'vitest';
import { attribute, deviceOf } from '../src/marketing/analytics/siteStats';

const OWN = 'www.paysapro-ai.fr';
const at = (url: string, referrer = '') => attribute(new URL(url, 'https://www.paysapro-ai.fr'), referrer, OWN);

describe('mesure d’audience : origine des visites', () => {
  it('accès direct sans referrer ni paramètre', () => {
    expect(at('/')).toEqual({ source: 'Accès direct', medium: 'direct', campaign: null, referrerHost: null });
  });

  it('moteurs de recherche, assistants IA et réseaux sociaux', () => {
    expect(at('/', 'https://www.google.fr/')).toMatchObject({ source: 'Google', medium: 'search', referrerHost: 'google.fr' });
    expect(at('/', 'https://www.bing.com/search?q=x')).toMatchObject({ source: 'Bing', medium: 'search' });
    expect(at('/', 'https://chatgpt.com/')).toMatchObject({ source: 'ChatGPT', medium: 'ai' });
    expect(at('/', 'https://www.perplexity.ai/')).toMatchObject({ source: 'Perplexity', medium: 'ai' });
    expect(at('/', 'https://l.facebook.com/l.php')).toMatchObject({ source: 'Facebook', medium: 'social' });
    expect(at('/', 'https://www.linkedin.com/feed/')).toMatchObject({ source: 'LinkedIn', medium: 'social' });
  });

  it('autre site : le domaine d’origine, sans www', () => {
    expect(at('/outils/calcul-surface', 'https://www.paysagistes.pro/magazine/article')).toEqual({
      source: 'paysagistes.pro',
      medium: 'referral',
      campaign: null,
      referrerHost: 'paysagistes.pro',
    });
    expect(at('/', 'https://app.paysapro-ai.fr/')).toMatchObject({ source: 'Application Paysapro AI', medium: 'referral' });
  });

  it('une navigation interne au site n’est pas une source', () => {
    expect(at('/tarifs', 'https://www.paysapro-ai.fr/')).toMatchObject({ source: 'Accès direct', referrerHost: null });
  });

  it('paramètres utm et clics publicitaires prioritaires sur le referrer', () => {
    expect(at('/?utm_source=newsletter&utm_medium=email&utm_campaign=octobre', 'https://www.google.fr/')).toEqual({
      source: 'newsletter',
      medium: 'email',
      campaign: 'octobre',
      referrerHost: 'google.fr',
    });
    expect(at('/?utm_source=salon-vert&utm_campaign=flyer')).toMatchObject({ source: 'salon-vert', medium: 'campaign', campaign: 'flyer' });
    expect(at('/?gclid=abc', 'https://www.google.com/')).toMatchObject({ source: 'Google Ads', medium: 'ads' });
    expect(at('/?fbclid=abc')).toMatchObject({ source: 'Facebook', medium: 'social' });
  });

  it('type d’appareil selon la largeur', () => {
    expect(deviceOf(390)).toBe('mobile');
    expect(deviceOf(800)).toBe('tablet');
    expect(deviceOf(1440)).toBe('desktop');
  });
});
