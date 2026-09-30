import { useId, useState, type ReactNode } from 'react';
import type { ToolId } from '../../data/tools';

/* Calculateurs gratuits. Saisie avec virgule ou point ; résultats arrondis pour l'affichage. */

const fmt = (n: number, digits = 2) =>
  Number.isFinite(n) ? new Intl.NumberFormat('fr-FR', { maximumFractionDigits: digits }).format(n).replace(/[\u202f\u00a0]/g, ' ') : '—';

/** « 2,5 » ou « 2.5 » → 2.5 ; valeur vide ou invalide → 0. */
export function parseNumber(value: string): number {
  const n = Number(value.trim().replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/* ─── calculs purs (testés) ─── */
export type Shape = 'rectangle' | 'l' | 'triangle' | 'cercle';

export function computeSurface(shape: Shape, a: number, b: number, c = 0, d = 0): number {
  switch (shape) {
    case 'rectangle':
      return a * b;
    case 'l':
      return a * b + c * d;
    case 'triangle':
      return (a * b) / 2;
    case 'cercle':
      return Math.PI * a * a;
  }
}

export function computeVolume(surface: number, thicknessCm: number, density = 0) {
  const volume = surface * (thicknessCm / 100);
  return { volume, tonnes: volume * density };
}

export function computeFence(length: number, spacing: number, openings = 0) {
  const net = Math.max(0, length - openings);
  if (!net || !spacing) return { net, panels: 0, posts: 0 };
  // tolérance d'arrondi : 20 ÷ 2,5 doit donner 8 et non 9
  const panels = Math.ceil(net / spacing - 1e-9);
  return { net, panels, posts: panels + 1 };
}

/* ─── interface ─── */
const inputCls =
  'mt-1.5 block min-h-12 w-full rounded-2xl bg-white px-4 py-3 text-ink tabular-nums ring-1 ring-line outline-none transition focus:ring-2 focus:ring-brand';

function Field({ label, unit, value, onChange }: { label: string; unit: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label} <span className="font-normal text-muted">({unit})</span>
      </label>
      <input id={id} inputMode="decimal" autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </div>
  );
}

function Result({ items, note }: { items: { label: string; value: string; strong?: boolean }[]; note?: ReactNode }) {
  return (
    <div className="rounded-3xl bg-forest p-6 text-white" role="status" aria-live="polite">
      <dl className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <div key={i.label} className={i.strong ? 'sm:col-span-2' : ''}>
            <dt className="text-sm text-white/70">{i.label}</dt>
            <dd className={`font-display font-extrabold tabular-nums ${i.strong ? 'text-5xl text-leaf' : 'text-2xl'}`}>{i.value}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-4 text-sm text-white/65">{note}</p>}
    </div>
  );
}

const SHAPES: { id: Shape; label: string }[] = [
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'l', label: 'Forme en L' },
  { id: 'triangle', label: 'Triangle' },
  { id: 'cercle', label: 'Cercle' },
];

function SurfaceCalculator() {
  const [shape, setShape] = useState<Shape>('rectangle');
  const [a, setA] = useState('4');
  const [b, setB] = useState('3');
  const [c, setC] = useState('2');
  const [d, setD] = useState('2');
  const [waste, setWaste] = useState('10');
  const surface = computeSurface(shape, parseNumber(a), parseNumber(b), parseNumber(c), parseNumber(d));
  const toOrder = surface * (1 + parseNumber(waste) / 100);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Forme</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {SHAPES.map((s) => (
              <label
                key={s.id}
                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-2xl px-3 text-sm font-semibold ring-1 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${
                  shape === s.id ? 'bg-forest text-white ring-forest' : 'bg-white text-ink ring-line hover:ring-ink/30'
                }`}
              >
                <input type="radio" name="forme" value={s.id} checked={shape === s.id} onChange={() => setShape(s.id)} className="sr-only" />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-4">
          {shape === 'rectangle' && (
            <>
              <Field label="Longueur" unit="m" value={a} onChange={setA} />
              <Field label="Largeur" unit="m" value={b} onChange={setB} />
            </>
          )}
          {shape === 'l' && (
            <>
              <Field label="Longueur 1" unit="m" value={a} onChange={setA} />
              <Field label="Largeur 1" unit="m" value={b} onChange={setB} />
              <Field label="Longueur 2" unit="m" value={c} onChange={setC} />
              <Field label="Largeur 2" unit="m" value={d} onChange={setD} />
            </>
          )}
          {shape === 'triangle' && (
            <>
              <Field label="Base" unit="m" value={a} onChange={setA} />
              <Field label="Hauteur" unit="m" value={b} onChange={setB} />
            </>
          )}
          {shape === 'cercle' && <Field label="Rayon" unit="m" value={a} onChange={setA} />}
          <Field label="Marge de chutes" unit="%" value={waste} onChange={setWaste} />
        </div>
      </div>
      <Result
        items={[
          { label: 'Surface', value: `${fmt(surface)} m²`, strong: true },
          { label: 'À commander (chutes incluses)', value: `${fmt(toOrder)} m²` },
        ]}
        note="Résultat indicatif : vérifiez vos mesures sur le terrain."
      />
    </div>
  );
}

function VolumeCalculator() {
  const [surface, setSurface] = useState('48');
  const [thickness, setThickness] = useState('10');
  const [density, setDensity] = useState('1,5');
  const { volume, tonnes } = computeVolume(parseNumber(surface), parseNumber(thickness), parseNumber(density));
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid grid-cols-2 gap-4 self-start">
        <Field label="Surface" unit="m²" value={surface} onChange={setSurface} />
        <Field label="Épaisseur" unit="cm" value={thickness} onChange={setThickness} />
        <div className="col-span-2">
          <Field label="Densité du matériau" unit="t/m³" value={density} onChange={setDensity} />
          <p className="mt-1.5 text-sm text-muted">Valeur indicative, à remplacer par celle de votre fournisseur.</p>
        </div>
      </div>
      <Result
        items={[
          { label: 'Volume', value: `${fmt(volume)} m³`, strong: true },
          { label: 'Poids estimé', value: `${fmt(tonnes)} t` },
        ]}
        note="Le poids réel dépend du matériau et de son humidité."
      />
    </div>
  );
}

function FenceCalculator() {
  const [length, setLength] = useState('22');
  const [spacing, setSpacing] = useState('2,5');
  const [openings, setOpenings] = useState('0');
  const r = computeFence(parseNumber(length), parseNumber(spacing), parseNumber(openings));
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid grid-cols-2 gap-4 self-start">
        <Field label="Longueur totale" unit="m" value={length} onChange={setLength} />
        <Field label="Entraxe des poteaux" unit="m" value={spacing} onChange={setSpacing} />
        <div className="col-span-2">
          <Field label="Largeur des ouvertures (portail, portillon)" unit="m" value={openings} onChange={setOpenings} />
        </div>
      </div>
      <Result
        items={[
          { label: 'Poteaux', value: fmt(r.posts, 0), strong: true },
          { label: 'Panneaux (intervalles)', value: fmt(r.panels, 0) },
          { label: 'Linéaire de clôture', value: `${fmt(r.net)} ml` },
        ]}
        note="Hors poteaux d’angle ou de portail spécifiques à votre système."
      />
    </div>
  );
}

export function Calculator({ id }: { id: ToolId }) {
  if (id === 'surface') return <SurfaceCalculator />;
  if (id === 'volume') return <VolumeCalculator />;
  return <FenceCalculator />;
}
