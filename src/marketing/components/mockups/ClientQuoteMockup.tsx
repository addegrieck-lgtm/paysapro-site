import { FileText, PenLine } from 'lucide-react';
import { StatusBar } from './PhoneFrame';
import { GardenPhoto } from './GardenPhoto';
import { SAMPLE_LINES, SAMPLE_PROJECT, formatMoney, quoteTotals } from '../../data/sample';

/** Ce que voit le client : son projet, résumé, prestations, photos, montant, conditions, bouton de signature. */
export function ClientQuoteMockup({ highlightSign = false }: { highlightSign?: boolean }) {
  const t = quoteTotals();
  return (
    <>
      <StatusBar dark />
      <div className="shrink-0 bg-forest px-4 pt-1 pb-4 text-white">
        <div className="text-[10px] font-semibold text-leaf">Votre entreprise · Devis {SAMPLE_PROJECT.number}</div>
        <div className="mt-0.5 font-display text-[16px] leading-tight font-extrabold">Votre projet paysager</div>
      </div>
      <div className="-mt-2 flex-1 space-y-2.5 overflow-hidden rounded-t-2xl bg-cream px-3 pt-3">
        <div className="rounded-xl bg-white p-2.5 ring-1 ring-line">
          <div className="text-[8.5px] font-bold tracking-wider text-muted uppercase">Projet</div>
          <div className="text-[12px] font-bold text-ink">{SAMPLE_PROJECT.title}</div>
          <p className="mt-0.5 text-[10px] leading-snug text-muted">Création d’une terrasse, engazonnement, nouvelle clôture et plantations.</p>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <GardenPhoto className="aspect-square rounded-lg" title="Photo du chantier" />
          <GardenPhoto annotated className="aspect-square rounded-lg" title="Photo du chantier annotée" />
          <div className="flex aspect-square items-center justify-center rounded-lg bg-mint text-[10px] font-bold text-forest">+3</div>
        </div>
        <div className="rounded-xl bg-white p-2.5 ring-1 ring-line">
          <div className="text-[8.5px] font-bold tracking-wider text-muted uppercase">Prestations</div>
          <ul className="mt-1 space-y-0.5 text-[10.5px]">
            {SAMPLE_LINES.slice(0, 3).map((l) => (
              <li key={l.label} className="flex justify-between gap-2">
                <span className="truncate text-ink">{l.label}</span>
                <span className="text-muted tabular-nums">{formatMoney(l.qty * l.price)}</span>
              </li>
            ))}
            <li className="text-[9.5px] text-muted">+ 2 prestations</li>
          </ul>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white p-2.5 ring-1 ring-line">
          <div>
            <div className="text-[8.5px] font-bold tracking-wider text-muted uppercase">Montant TTC</div>
            <div className="text-[15px] font-extrabold text-ink tabular-nums">{formatMoney(t.ttc)}</div>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-brand">
            <FileText className="h-3.5 w-3.5" /> Conditions
          </span>
        </div>
      </div>
      <div className="shrink-0 bg-cream px-3 pt-1 pb-4">
        <div
          className={`flex items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-[12px] font-bold text-white ${
            highlightSign ? 'animate-pulse-ring' : ''
          }`}
        >
          <PenLine className="h-3.5 w-3.5" /> Signer le devis
        </div>
      </div>
    </>
  );
}
