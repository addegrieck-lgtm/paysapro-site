import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

/** Cadre de smartphone générique (pas une reproduction de marque). Le contenu est un vrai composant React. */
export function PhoneFrame({
  children,
  className = 'w-[260px]',
  label,
}: {
  children: ReactNode;
  className?: string;
  /** description accessible du contenu de l'écran */
  label?: string;
}) {
  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label}
      className={`relative shrink-0 rounded-[2.6rem] bg-[#0f1512] p-[9px] shadow-float ring-1 ring-black/40 ${className}`}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-cream">
        <div className="absolute top-2 left-1/2 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#0f1512]" aria-hidden="true" />
        <div className="flex h-full flex-col" aria-hidden={label ? 'true' : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex h-10 shrink-0 items-end justify-between px-6 pb-1 text-[11px] font-semibold ${dark ? 'text-white' : 'text-ink'}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1" aria-hidden="true">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className={`w-[3px] rounded-sm ${dark ? 'bg-white' : 'bg-ink'}`} style={{ height: h }} />
          ))}
        </span>
        <span className={`ml-1 h-[10px] w-[20px] rounded-[3px] border ${dark ? 'border-white/70' : 'border-ink/60'} p-[1.5px]`}>
          <span className={`block h-full w-3/4 rounded-[1px] ${dark ? 'bg-white' : 'bg-ink'}`} />
        </span>
      </span>
    </div>
  );
}

export function AppBar({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-line/70 bg-cream px-3 pb-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-line">
        <ChevronLeft className="h-4 w-4 text-ink" />
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate text-[12.5px] font-bold text-ink">{title}</div>
        {subtitle && <div className="truncate text-[10.5px] text-muted">{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

/** Onglets bas de l'application (repère visuel). */
export function TabBar({ active = 0 }: { active?: number }) {
  const tabs = ['Accueil', 'Chantiers', 'Devis', 'Clients'];
  return (
    <div className="mt-auto flex shrink-0 justify-around border-t border-line bg-white px-2 pt-2 pb-4 text-[9.5px] font-semibold">
      {tabs.map((t, i) => (
        <span key={t} className={`flex flex-col items-center gap-1 ${i === active ? 'text-brand' : 'text-muted'}`}>
          <span className={`h-1.5 w-5 rounded-full ${i === active ? 'bg-brand' : 'bg-line'}`} />
          {t}
        </span>
      ))}
    </div>
  );
}
