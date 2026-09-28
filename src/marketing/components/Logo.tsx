/**
 * Icône Paysapro AI : un document dont le coin replié devient une feuille,
 * et un point « signal » (technologie). Fonctionne en couleur, en noir/blanc,
 * sur fond clair ou sombre (variant) et en favicon (public/favicon.svg).
 */
type Variant = 'color' | 'light' | 'mono';

export function LogoMark({ className = 'h-9 w-9', variant = 'color' }: { className?: string; variant?: Variant }) {
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

export function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={tone === 'light' ? 'light' : 'color'} />
      <span className={`font-display text-[1.15rem] font-extrabold tracking-tight ${tone === 'light' ? 'text-white' : 'text-ink'}`}>
        Paysapro<span className={tone === 'light' ? 'text-leaf' : 'text-brand'}> AI</span>
      </span>
    </span>
  );
}
