import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router';
import { AnalyticsProvider } from './marketing/analytics/AnalyticsProvider';
import { trackPageview } from './marketing/analytics/siteStats';
import { MarketingRoutes } from './marketing/routes';

export function App() {
  return (
    // basename = base Vite ('/' sur Vercel, '/paysapro-site/' sur GitHub Pages)
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnalyticsProvider>
        <Pageviews />
        <MarketingRoutes />
      </AnalyticsProvider>
    </BrowserRouter>
  );
}

/** Page vue à chaque changement d'adresse (mesure d'audience du back-office, voir siteStats). */
function Pageviews() {
  const { pathname } = useLocation();
  useEffect(() => trackPageview(pathname), [pathname]);
  return null;
}
