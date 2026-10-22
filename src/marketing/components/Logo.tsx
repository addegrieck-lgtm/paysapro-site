/**
 * Icône Paysapro AI : un document dont le coin replié devient une feuille,
 * et un point « signal » (technologie). Fonctionne en couleur, en noir/blanc,
 * sur fond clair ou sombre (variant) et en favicon (public/favicon.svg).
 *
 * Batipro (pages des artisans du BTP) : une maison au toit jaune sur fond anthracite,
 * la même que dans l'application.
 */
import type { SiteBrand } from './useSiteBrand';

type Variant = 'color' | 'light' | 'mono';

export function BatiproMark({ className = 'h-9 w-9', variant = 'color' }: { className?: string; variant?: Variant }) {
  const bg = variant === 'light' ? '#FFFFFF' : '#2B2F36';
  const walls = variant === 'light' ? '#2B2F36' : '#FFFFFF';
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="13" fill={bg} />
      <path d="M10 24 24 12l14 12" fill="none" stroke="#F5C400" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 23v13h18V23" fill="none" stroke={walls} strokeWidth="3" strokeLinejoin="round" />
      <rect x="21" y="28" width="6" height="8" rx="1" fill="#F5C400" />
    </svg>
  );
}

export function LogoMark({ className = 'h-9 w-9', variant = 'color', brand = 'paysapro' }: { className?: string; variant?: Variant; brand?: SiteBrand }) {
  if (brand === 'batipro') return <BatiproMark className={className} variant={variant} />;
  const bg = variant === 'color' ? '#12372A' : variant === 'light' ? '#FFFFFF' : 'currentColor';
  const doc = variant === 'light' ? '#12372A' : variant === 'mono' ? 'var(--logo-fg, #fff)' : '#FFFFFF';
  const leaf = variant === 'light' ? '#2F7D55' : variant === 'mono' ? 'var(--logo-fg, #fff)' : '#8FCF9F';
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="13" fill={bg} />
      {/* document */}
      <path d="M15 11.5h12.5l6.5 6.5v18a2.5 2.5 0 0 1-2.5 2.5h-16.5a2.5 2.5 0 0 1-2.5-2.5v-22a2.5 2.5 0 0 1 2.5-2.5Z" fill={doc} opacity={variant === 'mono' ? 0.18 : 1} />
      {/* feuille qui naît du document */}
      <path d="M17.5 33.5c0-8 5.6-13.4 14.6-13.8-.5 9-5.9 14.3-13.9 14.3" fill={leaf} />
      {variant !== 'mono' && <path d="M17.5 33.5 26.5 24.5" stroke={bg} strokeWidth="1.8" strokeLinecap="round" />}
      {/* signal */}
      <circle cx="34" cy="14" r="2.6" fill={leaf} />
    </svg>
  );
}

export function Logo({ tone = 'dark', className = '', brand = 'paysapro' }: { tone?: 'dark' | 'light'; className?: string; brand?: SiteBrand }) {
  if (brand === 'batipro') {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <BatiproMark variant={tone === 'light' ? 'light' : 'color'} />
        <span className="leading-none">
          <span className={`block font-display text-[1.15rem] font-extrabold tracking-tight ${tone === 'light' ? 'text-white' : 'text-ink'}`}>Batipro</span>
          <span className={`block text-[0.7rem] font-medium ${tone === 'light' ? 'text-white/60' : 'text-muted'}`}>par Paysapro AI</span>
        </span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={tone === 'light' ? 'light' : 'color'} />
      <span className={`font-display text-[1.15rem] font-extrabold tracking-tight ${tone === 'light' ? 'text-white' : 'text-ink'}`}>
        Paysapro<span className={tone === 'light' ? 'text-leaf' : 'text-brand'}> AI</span>
      </span>
    </span>
  );
}
