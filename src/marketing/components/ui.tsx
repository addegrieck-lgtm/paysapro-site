import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router';
import { Sparkles } from 'lucide-react';

/* ─────────── Boutons ─────────── */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light';
type ButtonSize = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none';
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white shadow-[0_8px_20px_-8px_rgb(47_125_85/0.7)] hover:bg-brand-strong hover:-translate-y-0.5',
  secondary: 'bg-white text-ink ring-1 ring-line hover:ring-ink/25 hover:-translate-y-0.5',
  ghost: 'text-ink hover:bg-ink/5',
  light: 'bg-white text-forest hover:bg-mint hover:-translate-y-0.5',
  'outline-light': 'text-white ring-1 ring-white/30 hover:bg-white/10 hover:-translate-y-0.5',
};
const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 text-[0.95rem]',
  lg: 'min-h-13 px-7 text-base',
};

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: ComponentPropsWithoutRef<'button'> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={buttonClass(variant, size, className)} {...rest} />;
}

/** Lien interne ou externe avec l'apparence d'un bouton. */
export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
}: {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const cls = buttonClass(variant, size, className);
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return (
      <a href={to} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

/* ─────────── Mise en page ─────────── */

export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[76rem] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  className = '',
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, tone = 'dark', className = '' }: { children: ReactNode; tone?: 'dark' | 'light'; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] ${
        tone === 'light' ? 'text-leaf' : 'text-brand'
      } ${className}`}
    >
      <span className={`h-px w-6 ${tone === 'light' ? 'bg-leaf/60' : 'bg-brand/50'}`} aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'dark',
  as: As = 'h2',
}: {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2';
}) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <As
        id={id}
        className={`mt-4 font-display text-[2.1rem] leading-[1.08] font-extrabold sm:text-5xl ${tone === 'light' ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </As>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed sm:text-xl ${tone === 'light' ? 'text-white/75' : 'text-muted'} ${center ? 'mx-auto max-w-2xl' : ''}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ─────────── Badges ─────────── */

export function BetaBadge({ tone = 'dark', children = 'Bêta' }: { tone?: 'dark' | 'light'; children?: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] ${
        tone === 'light' ? 'bg-white/10 text-leaf ring-1 ring-white/15' : 'bg-mint text-forest'
      }`}
    >
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      {children}
    </span>
  );
}

export function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}
