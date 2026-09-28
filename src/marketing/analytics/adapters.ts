import { ANALYTICS, type AnalyticsProviderName } from '../config/marketing';
import type { AnalyticsAdapter } from './events';

declare global {
  interface Window {
    plausible?: ((event: string, options?: { props?: Record<string, string | number | boolean> }) => void) & { q?: unknown[] };
  }
}

const noopAdapter: AnalyticsAdapter = { name: 'none', requiresConsent: false, track: () => {} };

const consoleAdapter: AnalyticsAdapter = {
  name: 'console',
  requiresConsent: false,
  track: (event, props) => console.info('[analytics]', event, props ?? {}),
};

/** Plausible (cloud ou auto-hébergé, gratuit en Community Edition) : sans cookie, pas de bandeau requis. */
function plausibleAdapter(domain: string, scriptUrl: string): AnalyticsAdapter {
  return {
    name: 'plausible',
    requiresConsent: false,
    init() {
      if (!domain || document.querySelector('script[data-plausible]')) return;
      window.plausible =
        window.plausible ||
        Object.assign(
          (...args: unknown[]) => {
            (window.plausible!.q = window.plausible!.q || []).push(args);
          },
          { q: [] as unknown[] },
        );
      const s = document.createElement('script');
      s.defer = true;
      s.src = scriptUrl;
      s.dataset.domain = domain;
      s.dataset.plausible = '';
      document.head.appendChild(s);
    },
    track: (event, props) => window.plausible?.(event, props ? { props } : undefined),
  };
}

export function createAdapter(name: AnalyticsProviderName = ANALYTICS.provider): AnalyticsAdapter {
  switch (name) {
    case 'console':
      return consoleAdapter;
    case 'plausible':
      return plausibleAdapter(ANALYTICS.plausibleDomain, ANALYTICS.plausibleScriptUrl);
    default:
      return noopAdapter;
  }
}
