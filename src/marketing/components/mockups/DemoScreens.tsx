import { BadgeCheck, Camera, Check, Eye, Images, PenLine, Send, Sparkles, TriangleAlert, Zap } from 'lucide-react';
import { AppBar, StatusBar } from './PhoneFrame';
import { GardenPhoto } from './GardenPhoto';
import { SAMPLE_LINES, SAMPLE_PROJECT, formatMoney, formatNumber, quoteTotals } from '../../data/sample';

/* Écrans de l'application utilisés par la démo interactive et la section « Photo → devis ». */

export function CaptureScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0f1512]">
      <StatusBar dark />
      <div className="flex items-center justify-between px-4 pb-2 text-[10.5px] font-semibold text-white/80">
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3" /> Auto
        </span>
        <span className="rounded-full bg-white/10 px-2 py-0.5">Jardin Martin</span>
      </div>
      <div className="relative mx-0 flex-1">
        <GardenPhoto className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="border-[0.5px] border-white/20" />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-6 pt-4 pb-6">
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg ring-2 ring-white/70">
          <GardenPhoto className="h-full w-full" title="Dernière photo" />
        </span>
        <span className="flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-white/80">
          <span className="h-12 w-12 rounded-full bg-white" />
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
          <Images className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export function InfoScreen() {
  const { lawn, terrace } = SAMPLE_PROJECT.dims;
  return (
    <>
      <StatusBar />
      <AppBar title="Dimensions" subtitle="Jardin Martin · Gazon" />
      <div className="flex-1 space-y-2.5 px-3 pt-3 text-[11px]">
        <div className="grid grid-cols-2 gap-2">
          <Field label="Longueur" value={`${formatNumber(lawn.l)} m`} />
          <Field label="Largeur" value={`${formatNumber(lawn.w)} m`} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-mint px-3 py-2.5 text-forest">
          <span className="font-semibold">Surface calculée</span>
          <span className="text-[14px] font-extrabold tabular-nums">{lawn.l * lawn.w} m²</span>
        </div>
        <Field label="Type de sol" value="Terre compactée" />
        <Field label="Accès chantier" value="Portail 1,20 m · brouette" />
        <div className="rounded-xl bg-white p-2.5 ring-1 ring-line">
          <div className="text-[9.5px] font-bold tracking-wider text-muted uppercase">Autres zones</div>
          <div className="mt-1 flex justify-between">
            <span>Terrasse</span>
            <span className="font-semibold tabular-nums">
              {terrace.l} × {terrace.w} = {terrace.l * terrace.w} m²
            </span>
          </div>
          <div className="flex justify-between">
            <span>Clôture</span>
            <span className="font-semibold tabular-nums">{SAMPLE_PROJECT.dims.fence} ml</span>
          </div>
        </div>
      </div>
      <div className="mx-3 mb-4 rounded-xl bg-brand py-2.5 text-center text-[11.5px] font-bold text-white">Continuer</div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white px-3 py-2 ring-1 ring-line">
      <div className="text-[9.5px] font-semibold text-muted">{label}</div>
      <div className="font-bold text-ink tabular-nums">{value}</div>
    </div>
  );
}

export function EstimateScreen() {
  const t = quoteTotals();
  return (
    <>
      <StatusBar />
      <AppBar title="Estimation" subtitle="5 prestations · depuis votre catalogue" />
      <div className="mx-3 mt-2.5 flex items-start gap-1.5 rounded-lg bg-amber-soft px-2.5 py-1.5 text-[9.5px] leading-snug font-medium text-amber">
        <Sparkles className="mt-px h-3 w-3 shrink-0" /> Suggestions de l’assistant : vérifiez les quantités avant de valider.
      </div>
      <ul className="flex-1 space-y-1.5 px-3 pt-2.5 text-[10.5px]">
        {SAMPLE_LINES.map((l) => (
          <li key={l.label} className="flex items-center justify-between gap-2 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-line">
            <span className="min-w-0">
              <span className="block truncate font-semibold text-ink">{l.label}</span>
              <span className="block text-[9.5px] text-muted tabular-nums">
                {formatNumber(l.qty)} {l.unit} × {formatMoney(l.price)}
              </span>
            </span>
            <span className="flex items-center gap-1">
              {l.estimated ? <TriangleAlert className="h-3 w-3 text-amber" /> : <Check className="h-3 w-3 text-brand" />}
              <span className="font-bold tabular-nums">{formatMoney(l.qty * l.price)}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mx-3 mb-4 flex items-center justify-between rounded-xl bg-forest px-3 py-2.5 text-white">
        <span className="text-[10.5px] font-semibold">Total HT</span>
        <span className="text-[14px] font-extrabold tabular-nums">{formatMoney(t.ht)}</span>
      </div>
    </>
  );
}

export function QuoteScreen() {
  const t = quoteTotals();
  return (
    <>
      <StatusBar />
      <AppBar title={`Devis ${SAMPLE_PROJECT.number}`} subtitle="Aperçu avant envoi" />
      <div className="flex-1 overflow-hidden bg-sand/60 px-3 pt-3">
        <div className="rounded-lg bg-white p-3 text-[9.5px] shadow-card">
          <div className="flex justify-between border-b border-line pb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-sand text-[7px] font-bold text-muted">LOGO</span>
            <span className="text-right leading-tight">
              <span className="block font-bold text-brand uppercase">Devis</span>
              <span className="text-muted">{SAMPLE_PROJECT.date}</span>
            </span>
          </div>
          <div className="mt-2 font-bold text-ink">{SAMPLE_PROJECT.client}</div>
          <div className="text-muted">{SAMPLE_PROJECT.title}</div>
          <ul className="mt-2 space-y-1 border-t border-line pt-2">
            {SAMPLE_LINES.map((l) => (
              <li key={l.label} className="flex justify-between">
                <span className="truncate">{l.label}</span>
                <span className="tabular-nums">{formatMoney(l.qty * l.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 space-y-0.5 border-t border-line pt-2">
            <div className="flex justify-between text-muted">
              <span>TVA 20 %</span>
              <span className="tabular-nums">{formatMoney(t.vat)}</span>
            </div>
            <div className="flex justify-between rounded bg-forest px-1.5 py-1 font-bold text-white">
              <span>Total TTC</span>
              <span className="tabular-nums">{formatMoney(t.ttc)}</span>
            </div>
          </div>
          <div className="mt-2 h-6 rounded border border-dashed border-line" />
        </div>
      </div>
      <div className="flex gap-2 bg-cream px-3 pt-3 pb-4">
        <span className="flex-1 rounded-xl bg-white py-2.5 text-center text-[11px] font-bold text-ink ring-1 ring-line">PDF</span>
        <span className="flex flex-[2] items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-[11px] font-bold text-white">
          <Send className="h-3.5 w-3.5" /> Envoyer au client
        </span>
      </div>
    </>
  );
}

export function SignScreen() {
  return (
    <>
      <StatusBar />
      <AppBar title="Signature" subtitle={`${SAMPLE_PROJECT.client} · ${SAMPLE_PROJECT.number}`} />
      <div className="flex-1 space-y-2.5 px-3 pt-3 text-[11px]">
        <StatusTimeline step={3} />
        <div className="rounded-xl bg-white p-3 ring-1 ring-line">
          <div className="text-[9.5px] font-semibold text-muted">Signature du client</div>
          <svg viewBox="0 0 200 70" className="mt-1 h-16 w-full" aria-hidden="true">
            <path d="M8 50 C24 10 38 60 52 34 S74 14 82 42 S104 58 116 28 S140 18 150 40 S176 52 192 20" fill="none" stroke="#17211c" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="border-t border-line pt-1.5 text-[9.5px] text-muted">Bon pour accord · signé le 28/09/2026 à 18:42</div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-mint px-3 py-2.5 font-semibold text-forest">
          <BadgeCheck className="h-4 w-4" /> Devis accepté — chantier à planifier
        </div>
      </div>
      <div className="mx-3 mb-4 rounded-xl bg-ink py-2.5 text-center text-[11.5px] font-bold text-white">Planifier le chantier</div>
    </>
  );
}

const STATUS = [
  { label: 'Envoyé', icon: Send },
  { label: 'Consulté', icon: Eye },
  { label: 'Signé', icon: PenLine },
];

/** Envoyé → Consulté → Signé. step = nombre d'étapes atteintes (0 à 3). */
export function StatusTimeline({ step, size = 'sm' }: { step: number; size?: 'sm' | 'md' }) {
  const big = size === 'md';
  return (
    <ol className={`flex items-center ${big ? 'gap-2' : 'gap-1'}`} aria-label="Suivi du devis">
      {STATUS.map(({ label, icon: Icon }, i) => {
        const done = i < step;
        return (
          <li key={label} className="flex flex-1 items-center gap-1" aria-current={i === step - 1 ? 'step' : undefined}>
            <span
              className={`flex flex-1 items-center justify-center gap-1 rounded-full font-bold transition-colors duration-500 ${
                big ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-[9.5px]'
              } ${done ? 'bg-brand text-white' : 'bg-white text-muted ring-1 ring-line'}`}
            >
              <Icon className={big ? 'h-4 w-4' : 'h-3 w-3'} aria-hidden="true" /> {label}
              <span className="sr-only">{done ? ' (fait)' : ' (à venir)'}</span>
            </span>
            {i < STATUS.length - 1 && <span className={`h-0.5 w-2 shrink-0 rounded ${i < step - 1 ? 'bg-brand' : 'bg-line'}`} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

export function CameraBadge() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white">
      <Camera className="h-3.5 w-3.5" />
    </span>
  );
}
