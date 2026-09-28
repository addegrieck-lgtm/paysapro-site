import { BadgeCheck } from 'lucide-react';
import { LogoMark } from '../Logo';
import { DEPOSIT_RATE, SAMPLE_LINES, SAMPLE_PROJECT, VAT_RATE, formatMoney, formatNumber, quoteTotals } from '../../data/sample';

/**
 * Devis « papier » construit en composants : logo, coordonnées, client, chantier,
 * prestations, quantités, prix, TVA, total, conditions, acompte, signature.
 */
export function QuoteMockup({
  compact = false,
  signed = true,
  className = '',
  maxLines,
}: {
  compact?: boolean;
  signed?: boolean;
  className?: string;
  maxLines?: number;
}) {
  const lines = maxLines ? SAMPLE_LINES.slice(0, maxLines) : SAMPLE_LINES;
  const t = quoteTotals();
  const p = SAMPLE_PROJECT;
  const pad = compact ? 'p-4' : 'p-5 sm:p-7';
  const hidden = SAMPLE_LINES.length - lines.length;

  return (
    <div className={`overflow-hidden rounded-2xl bg-white text-ink shadow-float ring-1 ring-black/5 ${className}`}>
      {/* En-tête */}
      <div className={`flex items-start justify-between gap-3 border-b border-line ${pad}`}>
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand text-[9px] font-bold text-muted ring-1 ring-line">LOGO</span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[13px] font-bold">{p.company}</div>
            <div className="truncate text-[10px] text-muted">{p.companyLine}</div>
          </div>
        </div>
        <div className="text-right leading-tight">
          <div className="text-[9px] font-bold tracking-[0.2em] text-brand uppercase">Devis</div>
          <div className="text-[12px] font-bold whitespace-nowrap tabular-nums">{p.number}</div>
          <div className="text-[9.5px] text-muted">{p.date}</div>
        </div>
      </div>

      <div className={`space-y-3 ${pad}`}>
        <div className="grid grid-cols-2 gap-2 text-[10.5px]">
          <div className="rounded-lg bg-cream px-2.5 py-2">
            <div className="text-[8.5px] font-bold tracking-wider text-muted uppercase">Client</div>
            <div className="font-semibold">{p.client}</div>
            <div className="text-muted">{p.city}</div>
          </div>
          <div className="rounded-lg bg-cream px-2.5 py-2">
            <div className="text-[8.5px] font-bold tracking-wider text-muted uppercase">Chantier</div>
            <div className="font-semibold">{p.title}</div>
            <div className="truncate text-muted">{p.address}</div>
          </div>
        </div>

        {/* Prestations */}
        <div>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-ink/70 pb-1 text-[8.5px] font-bold tracking-wider text-muted uppercase">
            <span>Prestation</span>
            <span className="text-right">Qté</span>
            <span className="w-16 text-right">Total HT</span>
          </div>
          <ul className="divide-y divide-line">
            {lines.map((l) => (
              <li key={l.label} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-3 py-1.5 text-[10.5px]">
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{l.label}</span>
                  {!compact && <span className="block truncate text-[9.5px] text-muted">{l.detail}</span>}
                </span>
                <span className="text-right whitespace-nowrap text-muted tabular-nums">
                  {formatNumber(l.qty)} {l.unit}
                  {l.estimated && <span className="ml-1 rounded bg-amber-soft px-1 text-[8.5px] font-bold text-amber">est.</span>}
                </span>
                <span className="w-16 text-right font-semibold tabular-nums">{formatMoney(l.qty * l.price)}</span>
              </li>
            ))}
          </ul>
          {hidden > 0 && <div className="pt-1 text-[9.5px] text-muted">+ {hidden} {hidden > 1 ? 'autres prestations' : 'autre prestation'}</div>}
        </div>

        {/* Totaux */}
        <div className="ml-auto w-full max-w-[15rem] space-y-1 text-[10.5px]">
          <div className="flex justify-between">
            <span className="text-muted">Total HT</span>
            <span className="font-semibold tabular-nums">{formatMoney(t.ht)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">TVA {VAT_RATE * 100} %</span>
            <span className="font-semibold tabular-nums">{formatMoney(t.vat)}</span>
          </div>
          <div className="flex items-baseline justify-between rounded-lg bg-forest px-2.5 py-1.5 text-white">
            <span className="font-semibold">Total TTC</span>
            <span className="text-[13px] font-bold tabular-nums">{formatMoney(t.ttc)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Acompte {DEPOSIT_RATE * 100} % à la signature</span>
            <span className="font-semibold tabular-nums">{formatMoney(t.deposit)}</span>
          </div>
        </div>

        {!compact && (
          <p className="text-[9.5px] leading-snug text-muted">
            Conditions : devis valable {p.validity}. Quantités estimées confirmées par métré avant travaux. Solde à la fin du chantier.
          </p>
        )}

        {/* Signature */}
        <div className="flex items-end justify-between gap-3 border-t border-line pt-2.5">
          <div className="text-[9.5px] text-muted">
            <div className="font-semibold text-ink">Bon pour accord</div>
            {signed ? 'Signé par M. Martin' : 'En attente de signature'}
          </div>
          {signed ? (
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 120 40" className="h-8 w-24" aria-hidden="true">
                <path
                  d="M4 28 C14 6 22 34 30 20 S44 8 48 24 S62 32 70 16 S86 10 92 22 S104 30 116 12"
                  fill="none"
                  stroke="#17211c"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[9.5px] font-bold text-forest">
                <BadgeCheck className="h-3 w-3" /> Signé
              </span>
            </div>
          ) : (
            <div className="h-8 w-28 rounded-md border border-dashed border-line" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 bg-cream py-1.5 text-[9px] text-muted">
        <LogoMark className="h-3 w-3" /> Préparé avec Paysapro AI · exemple, tarifs fictifs
      </div>
    </div>
  );
}
