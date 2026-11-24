import { useState } from 'react';
import { Pause, Play, Quote, Star } from 'lucide-react';
import { TESTIMONIALS, TESTIMONIALS_NOTE, type Testimonial } from '../data/testimonials';
import { usePrefersReducedMotion } from './Reveal';

/**
 * Témoignages : uniquement des témoignages réels. Liste vide → placeholder explicite, jamais de faux clients.
 * Bandeau qui défile en continu : pause au survol, au focus et avec le bouton (accessibilité).
 * Animations réduites sur l'appareil : liste fixe, à parcourir en glissant.
 */
export function Testimonials({ items = TESTIMONIALS }: { items?: Testimonial[] }) {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-line bg-white/60 p-8 text-center">
        <Quote className="mx-auto h-7 w-7 text-brand" aria-hidden="true" />
        <p className="mt-3 font-semibold text-ink">Témoignages de professionnels bientôt disponibles.</p>
        <p className="mt-1 text-sm text-muted">Nous publierons uniquement des retours réels d’utilisateurs, avec leur accord.</p>
      </div>
    );
  }

  const note = <p className="mx-auto mt-6 max-w-2xl px-4 text-center text-sm text-muted">{TESTIMONIALS_NOTE}</p>;

  if (reduced) {
    return (
      <div>
        <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6" aria-label="Avis de professionnels">
          {items.map((t) => (
            <li key={t.name} className="w-[18.5rem] shrink-0 snap-start sm:w-[23rem]">
              <Card t={t} />
            </li>
          ))}
        </ul>
        {note}
      </div>
    );
  }

  return (
    <div>
      <div className="marquee overflow-hidden" data-paused={paused}>
        <div className="marquee-track flex w-max gap-5">
          <ul className="flex gap-5" aria-label="Avis de professionnels">
            {items.map((t) => (
              <li key={t.name} className="w-[18.5rem] shrink-0 sm:w-[23rem]">
                <Card t={t} />
              </li>
            ))}
          </ul>
          {/* Seconde copie pour une boucle sans à-coup : ignorée par les lecteurs d'écran */}
          <ul className="flex gap-5" aria-hidden="true">
            {items.map((t) => (
              <li key={t.name} className="w-[18.5rem] shrink-0 sm:w-[23rem]">
                <Card t={t} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-forest ring-1 ring-line hover:ring-brand"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          {paused ? 'Reprendre le défilement' : 'Mettre en pause'}
        </button>
      </div>
      {note}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-line">
      {t.rating ? (
        <p className="flex gap-0.5 text-amber" role="img" aria-label={`Note : ${t.rating} sur 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < t.rating! ? 'fill-current' : 'opacity-25'}`} aria-hidden="true" />
          ))}
        </p>
      ) : (
        <Quote className="h-6 w-6 text-brand" aria-hidden="true" />
      )}
      <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">« {t.quote} »</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {t.photo ? (
          <img src={t.photo} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint font-bold text-forest" aria-hidden="true">
            {t.name.charAt(0)}
          </span>
        )}
        <span className="text-sm">
          <span className="block font-semibold text-ink">{t.name}</span>
          <span className="block text-muted">{[t.company, t.activity].filter(Boolean).join(' · ')}</span>
        </span>
      </figcaption>
    </figure>
  );
}
