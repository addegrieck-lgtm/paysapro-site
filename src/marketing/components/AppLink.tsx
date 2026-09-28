import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { APP_LINKS } from '../config/marketing';
import { useAnalytics } from '../analytics/AnalyticsProvider';
import type { MarketingEvent } from '../analytics/events';
import { ButtonLink } from './ui';

type Target = 'signup' | 'login';

/**
 * Tous les CTA vers l'application passent par ce composant :
 * URL issue de VITE_APP_URL (jamais codée en dur) + événement analytics.
 */
export function AppCta({
  target = 'signup',
  event = 'signup_clicked',
  location,
  children = 'Essayer gratuitement',
  variant = 'primary',
  size = 'lg',
  className = '',
  arrow = true,
}: {
  target?: Target;
  event?: MarketingEvent;
  location: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'light' | 'outline-light' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
  arrow?: boolean;
}) {
  const { trackEvent } = useAnalytics();
  const href = target === 'login' ? APP_LINKS.login : APP_LINKS.signup;
  return (
    <ButtonLink
      to={href}
      variant={variant}
      size={size}
      className={`group ${className}`}
      onClick={() => {
        trackEvent(event, { location });
        if (event !== 'signup_clicked' && target === 'signup') trackEvent('signup_clicked', { location });
      }}
    >
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </ButtonLink>
  );
}
