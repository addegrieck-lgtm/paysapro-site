import { Check, Download, FileText } from 'lucide-react';
import { formatMoney } from '../../data/sample';

const CHECKS = ['Client identifié', 'Entreprise complète', 'Numéro SAP renseigné', 'Prestations SAP', 'Interventions datées', 'Règlements enregistrés'];

const LINES = [
  { label: 'Tonte et entretien de pelouse', detail: '6 interventions', amount: 540 },
  { label: 'Taille de haies', detail: '2 interventions', amount: 460 },
  { label: 'Désherbage des massifs', detail: '3 interventions', amount: 240 },
];

/** Attestation fiscale annuelle SAP (exemple) : données et numéro fictifs. */
export function SapAttestationMockup({ className = '' }: { className?: string }) {
  const total = LINES.reduce((s, l) => s + l.amount, 0);
  return (
    <div className={`overflow-hidden rounded-2xl bg-white text-ink shadow-float ring-1 ring-black/5 ${className}`}>
      <div className="flex items-start justify-between gap-3 border-b border-line p-5">
        <div className="flex items-start gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand text-[9px] font-bold text-muted ring-1 ring-line">LOGO</span>
          <div className="leading-tight">
            <div className="text-[13px] font-bold">Votre entreprise</div>
            <div className="text-[10px] text-muted">Déclaration SAP n° SAP000000000</div>
          </div>
        </div>
        <div className="text-right leading-tight">
          <div className="text-[9px] font-bold tracking-[0.18em] text-brand uppercase">Attestation fiscale</div>
          <div className="text-[13px] font-bold">Année 2026</div>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="rounded-lg bg-cream px-3 py-2 text-[11px]">
          <div className="text-[8.5px] font-bold tracking-wider text-muted uppercase">Bénéficiaire</div>
          <div className="font-semibold">M. et Mme Martin</div>
          <div className="text-muted">12 allée des Tilleuls, 44000 Nantes</div>
        </div>

        <div>
          <div className="border-b border-ink/70 pb-1 text-[8.5px] font-bold tracking-wider text-muted uppercase">Prestations de services à la personne</div>
          <ul className="divide-y divide-line">
            {LINES.map((l) => (
              <li key={l.label} className="flex items-baseline justify-between gap-3 py-1.5 text-[11px]">
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{l.label}</span>
                  <span className="block text-[9.5px] text-muted">{l.detail}</span>
                </span>
                <span className="font-semibold tabular-nums">{formatMoney(l.amount)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-baseline justify-between rounded-lg bg-forest px-3 py-2 text-white">
          <span className="text-[11px] font-semibold">Montant acquitté en 2026</span>
          <span className="text-[14px] font-bold tabular-nums">{formatMoney(total)} TTC</span>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-muted">
          {CHECKS.map((c) => (
            <li key={c} className="flex items-center gap-1.5">
              <Check className="h-3 w-3 shrink-0 text-brand" strokeWidth={3} aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-[12px] font-bold text-white">
          <Download className="h-3.5 w-3.5" aria-hidden="true" /> Générer le PDF
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 bg-cream py-1.5 text-[9px] text-muted">
        <FileText className="h-3 w-3" aria-hidden="true" /> Exemple : entreprise, numéro et montants fictifs
      </div>
    </div>
  );
}
