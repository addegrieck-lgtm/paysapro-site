import { BrowserRouter } from 'react-router';
import { AnalyticsProvider } from './marketing/analytics/AnalyticsProvider';
import { MarketingRoutes } from './marketing/routes';

export function App() {
  return (
    // basename = base Vite ('/' sur Vercel, '/paysapro-site/' sur GitHub Pages)
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnalyticsProvider>
        <MarketingRoutes />
      </AnalyticsProvider>
    </BrowserRouter>
  );
}
