import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { createAdapter } from './adapters';
import { hasConsent } from './consent';
import { trackSiteEvent } from './siteStats';
import type { AnalyticsAdapter, EventProps, MarketingEvent } from './events';

interface AnalyticsContextValue {
  trackEvent: (event: MarketingEvent, props?: EventProps) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue>({ trackEvent: () => {} });

export function AnalyticsProvider({ children, adapter }: { children: ReactNode; adapter?: AnalyticsAdapter }) {
  const active = useMemo(() => adapter ?? createAdapter(), [adapter]);
  const allowed = !active.requiresConsent || hasConsent();

  useEffect(() => {
    if (allowed) active.init?.();
  }, [active, allowed]);

  const trackEvent = useCallback(
    (event: MarketingEvent, props?: EventProps) => {
      // Mesure maison (back-office) : sans cookie, indépendante de l'outil configuré.
      try {
        trackSiteEvent(event, typeof props?.location === 'string' ? props.location : undefined);
      } catch {
        /* jamais bloquant */
      }
      if (!allowed) return;
      try {
        active.track(event, props);
      } catch {
        /* la mesure d'audience ne doit jamais casser le site */
      }
    },
    [active, allowed],
  );

  const value = useMemo(() => ({ trackEvent }), [trackEvent]);
  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
