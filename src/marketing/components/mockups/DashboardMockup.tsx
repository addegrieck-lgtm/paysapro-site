import { FileText, FolderKanban, PenLine, Plus, Search } from 'lucide-react';
import { LogoMark } from '../Logo';

const PROJECTS = [
  { name: 'Jardin Martin', type: 'Terrasse + gazon', status: 'Signé', tone: 'bg-mint text-forest' },
  { name: 'Résidence Les Érables', type: 'Entretien annuel', status: 'Envoyé', tone: 'bg-sky-soft text-sky' },
  { name: 'Maison Robert', type: 'Clôture 30 ml', status: 'Consulté', tone: 'bg-amber-soft text-amber' },
  { name: 'Cour Dupuis', type: 'Gravier + bordures', status: 'Brouillon', tone: 'bg-sand text-muted' },
];

/** Tableau de bord (exemple) : devis et chantiers en un coup d'œil. Chiffres fictifs. */
export function DashboardMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white text-ink shadow-float ring-1 ring-black/5 ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-cream px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e7c1b3]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ecd9a8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#b9d8c1]" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[10px] text-muted ring-1 ring-line">
          <LogoMark className="h-3 w-3" /> app.paysapro.ai
        </span>
      </div>
      <div className="grid grid-cols-[auto_1fr]">
        <aside className="hidden w-36 space-y-1 border-r border-line bg-cream/60 p-3 text-[11px] sm:block">
          {['Tableau de bord', 'Chantiers', 'Devis', 'Clients', 'Catalogue'].map((l, i) => (
            <div key={l} className={`rounded-md px-2 py-1.5 font-semibold ${i === 0 ? 'bg-white text-ink ring-1 ring-line' : 'text-muted'}`}>
              {l}
            </div>
          ))}
        </aside>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[13px] font-bold">Bonjour 👋</div>
            <div className="flex items-center gap-1.5">
              <span className="hidden items-center gap-1 rounded-md bg-cream px-2 py-1 text-[10px] text-muted ring-1 ring-line sm:flex">
                <Search className="h-3 w-3" /> Rechercher
              </span>
              <span className="flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[10px] font-semibold text-white">
                <Plus className="h-3 w-3" /> Chantier
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: FolderKanban, label: 'Chantiers actifs', value: '6' },
              { icon: FileText, label: 'Devis en attente', value: '3' },
              { icon: PenLine, label: 'Devis signés', value: '4' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl bg-cream p-2.5">
                <Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                <div className="mt-1 text-[16px] font-extrabold tabular-nums">{value}</div>
                <div className="text-[9.5px] leading-tight text-muted">{label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl ring-1 ring-line">
            <div className="border-b border-line px-3 py-2 text-[10.5px] font-bold">Derniers devis</div>
            <ul className="divide-y divide-line">
              {PROJECTS.map((p) => (
                <li key={p.name} className="flex items-center justify-between gap-2 px-3 py-2 text-[10.5px]">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{p.name}</span>
                    <span className="block truncate text-[9.5px] text-muted">{p.type}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold ${p.tone}`}>{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
