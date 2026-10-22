import { ArrowRight } from 'lucide-react';
import { APP_LINKS } from '../config/marketing';
import { useAnalytics } from '../analytics/AnalyticsProvider';
import { BatiproMark, LogoMark } from './Logo';

/**
 * Les deux démos de l'application (données fictives, sans inscription), en grandes cartes cliquables.
 * Masqué si l'adresse de l'application n'est pas configurée.
 */
export function DemoChoice({ location, tone = 'dark', className = '' }: { location: string; tone?: 'dark' | 'light'; className?: string }) {
  const { trackEvent } = useAnalytics();
  if (!APP_LINKS.configured) return null;
  const demos = [
    { href: APP_LINKS.demoLandscaping, metier: 'paysage', title: 'Démo paysagiste', text: 'Paysapro : jardins, terrasses, clôtures, entretien.', mark: <LogoMark className="h-12 w-12 shrink-0" /> },
    { href: APP_LINKS.demoBuilding, metier: 'btp', title: 'Démo artisan du BTP', text: 'Batipro AI : rénovation, salle de bains, électricité, maçonnerie.', mark: <BatiproMark className="h-12 w-12 shrink-0" /> },
  ];
  const card =
    tone === 'light'
      ? 'border-white/15 bg-white/10 text-white hover:border-white/40 hover:bg-white/15'
      : 'border-line bg-white text-ink shadow-card hover:border-brand/40';
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {demos.map((d) => (
        <a
          key={d.metier}
          href={d.href}
          onClick={() => trackEvent('demo_clicked', { location, metier: d.metier })}
          className={`group flex items-center gap-3.5 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${card}`}
        >
          {d.mark}
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{d.title}</span>
            <span className={`block text-sm ${tone === 'light' ? 'text-white/70' : 'text-muted'}`}>{d.text}</span>
          </span>
          <ArrowRight className={`h-5 w-5 shrink-0 transition group-hover:translate-x-0.5 ${tone === 'light' ? 'text-white/70' : 'text-muted group-hover:text-brand'}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
