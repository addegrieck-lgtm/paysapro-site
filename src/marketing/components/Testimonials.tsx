import { useState } from 'react';
import { ChevronDown, Quote, Star } from 'lucide-react';
import { TESTIMONIALS, TESTIMONIALS_NOTE, type Testimonial } from '../data/testimonials';

/**
 * Témoignages : uniquement des témoignages réels. Liste vide → placeholder explicite,
 * jamais de faux clients. Les premiers avis sont visibles, les autres s'affichent d'un geste.
 */
export function Testimonials({ items = TESTIMONIALS, initial = 6 }: { items?: Testimonial[]; initial?: number }) {
  const [all, setAll] = useState(false);
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-line bg-white/60 p-8 text-center">
        <Quote className="mx-auto h-7 w-7 text-brand" aria-hidden="true" />
        <p className="mt-3 font-semibold text-ink">Témoignages de professionnels bientôt disponibles.</p>
        <p className="mt-1 text-sm text-muted">Nous publierons uniquement des retours réels d’utilisateurs, avec leur accord.</p>
      </div>
    );
  }
  const shown = all ? items : items.slice(0, initial);
  return (
    <div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => (
          <li key={t.name}>
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
          </li>
        ))}
      </ul>
      {!all && items.length > initial && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setAll(true)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-forest ring-1 ring-line hover:ring-brand"
          >
            Voir les {items.length - initial} autres avis <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">{TESTIMONIALS_NOTE}</p>
    </div>
  );
}
