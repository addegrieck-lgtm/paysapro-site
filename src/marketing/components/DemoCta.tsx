import { CalendarCheck } from 'lucide-react';
import { MARKETING_CONFIG } from '../config/marketing';
import { useAnalytics } from '../analytics/AnalyticsProvider';
import { ButtonLink } from './ui';

/** « Demander une démonstration » — affiché uniquement si VITE_ENABLE_DEMO_CTA=true. */
export function DemoCta({ location, variant = 'secondary' }: { location: string; variant?: 'secondary' | 'outline-light' }) {
  const { trackEvent } = useAnalytics();
  if (!MARKETING_CONFIG.showDemo) return null;
  return (
    <ButtonLink to="/contact?sujet=demo" variant={variant} size="lg" onClick={() => trackEvent('demo_clicked', { location })}>
      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
      Demander une démonstration
    </ButtonLink>
  );
}
