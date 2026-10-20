import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { LogoMark } from '../Logo';
import { formatMoney, formatNumber } from '../../data/sample';
import { BTP_SAMPLES, btpTotals, type BtpSampleId } from '../../data/sampleBtp';

const rate = (n: number) => `${String(n).replace('.', ',')} %`;

/** Devis du bâtiment construit en composants : lots, TVA par taux, mentions décennale et signature. */
export function BtpQuoteMockup({ sample = 'renovation', className = '' }: { sample?: BtpSampleId; className?: string }) {
  const s = BTP_SAMPLES[sample];
  const t = btpTotals(s);
  const multiVat = t.vat.length > 1;

  return (
    <div className={`overflow-hidden rounded-2xl bg-white text-ink shadow-float ring-1 ring-black/5 ${className}`}>
      <div className="flex items-start justify-between gap-3 border-b border-line p-5 sm:p-7">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand text-[9px] font-bold text-muted ring-1 ring-line">LOGO</span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[13px] font-bold">Votre entreprise</div>
            <div className="truncate text-[10px] text-muted">{s.trade} · RM 000 000 000</div>
            <div className="truncate text-[10px] font-semibold text-ink/70">Qualification RGE</div>
          </div>
        </div>
        <div className="text-right leading-tight">
          <div className="text-[9px] font-bold tracking-[0.2em] text-brand uppercase">Devis</div>
          <div className="text-[12px] font-bold whitespace-nowrap tabular-nums">{s.number}</div>
          <div className="text-[9.5px] text-muted">Début prévu : 16/11/2026</div>
        </div>
      </div>

      <div className="space-y-3 p-5 sm:p-7">
        <div className="grid grid-cols-2 gap-2 text-[10.5px]">
          <div className="rounded-lg bg-cream px-2.5 py-2">
            <div className="text-[8.5px] font-bold tracking-wider text-muted uppercase">Client</div>
            <div className="font-semibold">{s.client}</div>
            <div className="text-muted">{s.city}</div>
          </div>
          <div className="rounded-lg bg-cream px-2.5 py-2">
            <div className="text-[8.5px] font-bold tracking-wider text-muted uppercase">Chantier</div>
            <div className="font-semibold">{s.title}</div>
            <div className="truncate text-muted">{s.context}</div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-ink/70 pb-1 text-[8.5px] font-bold tracking-wider text-muted uppercase">
            <span>Prestation</span>
            <span className="text-right">Qté</span>
            <span className="w-16 text-right">Total HT</span>
          </div>
          {s.lots.map((lot) => (
            <div key={lot.name}>
              <div className="pt-2 text-[9px] font-bold tracking-wider text-brand uppercase">{lot.name}</div>
              <ul className="divide-y divide-line">
                {lot.lines.map((l) => (
                  <li key={l.label} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-3 py-1.5 text-[10.5px]">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{l.label}</span>
                      {multiVat && <span className="block text-[9px] text-muted">TVA {rate(l.vat)}</span>}
                    </span>
                    <span className="text-right whitespace-nowrap text-muted tabular-nums">
                      {formatNumber(l.qty)} {l.unit}
                    </span>
                    <span className="w-16 text-right font-semibold tabular-nums">{formatMoney(l.qty * l.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ml-auto w-full max-w-[16rem] space-y-1 text-[10.5px]">
          <div className="flex justify-between">
            <span className="text-muted">Total HT</span>
            <span className="font-semibold tabular-nums">{formatMoney(t.ht)}</span>
          </div>
          {t.vat.map((v) => (
            <div key={v.rate} className="flex justify-between gap-2">
              <span className="text-muted">{multiVat ? `TVA ${rate(v.rate)} sur ${formatMoney(v.base)}` : `TVA ${rate(v.rate)}`}</span>
              <span className="font-semibold tabular-nums">{formatMoney(v.amount)}</span>
            </div>
          ))}
          <div className="flex items-baseline justify-between rounded-lg bg-forest px-2.5 py-1.5 text-white">
            <span className="font-semibold">Total TTC</span>
            <span className="text-[13px] font-bold tabular-nums">{formatMoney(t.ttc)}</span>
          </div>
        </div>

        <p className="flex items-start gap-1.5 rounded-lg bg-cream px-2.5 py-2 text-[9.5px] leading-snug text-muted">
          <ShieldCheck className="mt-px h-3 w-3 shrink-0 text-forest" aria-hidden="true" />
          Assurance décennale : assureur, n° de contrat, couverture France métropolitaine.
          {t.vat.some((v) => v.rate < 20) && ' TVA réduite : attestation du client à conserver.'}
        </p>

        <div className="flex items-end justify-between gap-3 border-t border-line pt-2.5">
          <div className="text-[9.5px] text-muted">
            <div className="font-semibold text-ink">Bon pour accord</div>
            Signé en ligne par le client
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[9.5px] font-bold text-forest">
            <BadgeCheck className="h-3 w-3" /> Signé
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 bg-cream py-1.5 text-[9px] text-muted">
        <LogoMark className="h-3 w-3" /> Préparé avec Paysapro AI · exemple, tarifs fictifs
      </div>
    </div>
  );
}
