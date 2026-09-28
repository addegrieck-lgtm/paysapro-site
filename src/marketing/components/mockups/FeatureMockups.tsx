import { Calculator, Check, MapPin, Pencil, Phone, Sparkles, X } from 'lucide-react';
import { GardenPhoto } from './GardenPhoto';
import { SAMPLE_PROJECT, formatNumber } from '../../data/sample';

/* Petits mockups (cartes) pour la page Fonctionnalités. Données fictives. */

const card = 'overflow-hidden rounded-2xl bg-white text-ink shadow-float ring-1 ring-black/5';

export function PhotosGridMockup() {
  const captions = ['Vue d’ensemble', 'Zone terrasse', 'Clôture existante', 'Accès portail'];
  return (
    <div className={`${card} p-4`}>
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-bold">Photos · Jardin Martin</div>
        <span className="rounded-full bg-mint px-2 py-0.5 text-[10.5px] font-bold text-forest">4 photos</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {captions.map((c, i) => (
          <figure key={c}>
            <GardenPhoto annotated={i === 1} className="aspect-[4/3] rounded-lg" title={c} />
            <figcaption className="mt-1 text-[10.5px] text-muted">{c}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function ClientsMockup() {
  const clients = [
    { n: 'M. et Mme Martin', c: 'Nantes', p: 2 },
    { n: 'Résidence Les Érables', c: 'Rezé', p: 1 },
    { n: 'M. Robert', c: 'Saint-Herblain', p: 1 },
    { n: 'Mme Dupuis', c: 'Orvault', p: 3 },
  ];
  return (
    <div className={card}>
      <div className="border-b border-line px-4 py-3 text-[13px] font-bold">Clients</div>
      <ul className="divide-y divide-line">
        {clients.map((c) => (
          <li key={c.n} className="flex items-center gap-3 px-4 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-[11px] font-bold text-forest">
              {c.n.replace(/^(M\.|Mme|M\. et Mme)\s/, '').charAt(0)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold">{c.n}</span>
              <span className="flex items-center gap-1 text-[10.5px] text-muted">
                <MapPin className="h-3 w-3" aria-hidden="true" /> {c.c}
              </span>
            </span>
            <span className="text-[10.5px] text-muted">
              {c.p} chantier{c.p > 1 ? 's' : ''}
            </span>
            <Phone className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectMockup() {
  const steps = [
    { l: 'Photos', done: true },
    { l: 'Dimensions', done: true },
    { l: 'Prestations', done: true },
    { l: 'Devis', done: true },
    { l: 'Signature', done: false },
  ];
  return (
    <div className={card}>
      <GardenPhoto className="aspect-[16/7]" />
      <div className="p-4">
        <div className="text-[14px] font-bold">{SAMPLE_PROJECT.title}</div>
        <div className="text-[11px] text-muted">
          {SAMPLE_PROJECT.client} · {SAMPLE_PROJECT.address}
        </div>
        <ol className="mt-3 flex flex-wrap gap-1.5">
          {steps.map((s) => (
            <li
              key={s.l}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                s.done ? 'bg-mint text-forest' : 'bg-cream text-muted ring-1 ring-line'
              }`}
            >
              {s.done && <Check className="h-3 w-3" aria-hidden="true" />} {s.l}
            </li>
          ))}
        </ol>
        <p className="mt-3 rounded-lg bg-cream p-2.5 text-[11px] text-muted">Note : prévoir la benne pour l’évacuation de la terre. Portail 1,20 m.</p>
      </div>
    </div>
  );
}

export function CalcMockup() {
  const { lawn, terrace, fence } = SAMPLE_PROJECT.dims;
  const rows = [
    { l: 'Gazon', f: `${lawn.l} m × ${lawn.w} m`, r: `${lawn.l * lawn.w} m²` },
    { l: 'Terrasse', f: `${terrace.l} m × ${terrace.w} m`, r: `${terrace.l * terrace.w} m²` },
    { l: 'Terre végétale (10 cm)', f: `${lawn.l * lawn.w} m² × 0,10 m`, r: `${formatNumber(lawn.l * lawn.w * 0.1)} m³` },
    { l: 'Clôture', f: '12 m + 10 m', r: `${fence} ml` },
  ];
  return (
    <div className={`${card} p-4`}>
      <div className="flex items-center gap-2 text-[13px] font-bold">
        <Calculator className="h-4 w-4 text-brand" aria-hidden="true" /> Métrés
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.l} className="flex items-center justify-between gap-3 rounded-xl bg-cream px-3 py-2.5 text-[11.5px]">
            <span className="min-w-0">
              <span className="block font-semibold">{r.l}</span>
              <span className="block text-muted tabular-nums">{r.f}</span>
            </span>
            <span className="text-[13px] font-extrabold text-forest tabular-nums">{r.r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AISuggestionMockup() {
  return (
    <div className={`${card} p-4`}>
      <div className="flex items-center gap-2 text-[12px] font-bold text-brand">
        <Sparkles className="h-4 w-4" aria-hidden="true" /> Suggestion de l’assistant
      </div>
      <p className="mt-2 text-[12.5px] leading-snug text-ink">
        Pour un engazonnement de <strong>48 m²</strong>, pensez à ajouter : préparation du terrain, terre végétale et évacuation des déchets verts.
      </p>
      <ul className="mt-3 space-y-1.5 text-[11.5px]">
        {['Préparation du terrain · 48 m²', 'Terre végétale · 4,8 m³', 'Évacuation déchets verts · forfait'].map((s) => (
          <li key={s} className="flex items-center justify-between rounded-lg bg-cream px-3 py-2">
            <span>{s}</span>
            <span className="text-[10px] font-semibold text-amber">à valider</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-semibold">
        <span className="flex items-center justify-center gap-1 rounded-lg bg-brand py-2 text-white">
          <Check className="h-3.5 w-3.5" aria-hidden="true" /> Ajouter
        </span>
        <span className="flex items-center justify-center gap-1 rounded-lg bg-white py-2 ring-1 ring-line">
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Modifier
        </span>
        <span className="flex items-center justify-center gap-1 rounded-lg bg-white py-2 text-muted ring-1 ring-line">
          <X className="h-3.5 w-3.5" aria-hidden="true" /> Ignorer
        </span>
      </div>
      <p className="mt-3 text-[10.5px] text-muted">L’assistant propose. Vous décidez des quantités, des prix et du devis final.</p>
    </div>
  );
}
