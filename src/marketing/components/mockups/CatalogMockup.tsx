import { Pencil, Plus } from 'lucide-react';
import { CATALOG, formatMoneyRound } from '../../data/sample';

/** Catalogue tarifaire (exemple) — tarifs fictifs, entièrement personnalisables. */
export function CatalogMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white text-ink shadow-float ring-1 ring-black/5 ${className}`}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <div className="text-[13px] font-bold">Mon catalogue</div>
          <div className="text-[10.5px] text-muted">{CATALOG.length} prestations · prix HT</div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[10.5px] font-semibold text-white">
          <Plus className="h-3 w-3" aria-hidden="true" /> Ajouter
        </span>
      </div>
      <ul className="divide-y divide-line">
        {CATALOG.map((item) => (
          <li key={item.label} className="flex items-center gap-3 px-4 py-2.5">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold">{item.label}</span>
              <span className="block truncate text-[10.5px] text-muted">{item.category}</span>
            </span>
            <span className="rounded-lg bg-mint-2 px-2 py-1 text-[12px] font-bold text-forest tabular-nums">
              {formatMoneyRound(item.price)}
              <span className="font-semibold text-muted">/{item.unit}</span>
            </span>
            <Pencil className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}
