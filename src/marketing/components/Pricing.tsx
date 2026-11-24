import { useState } from 'react';
import { ArrowRight, Check, CreditCard, Gift, LockKeyhole, Minus, RotateCcw, ShieldCheck, Users } from 'lucide-react';
import {
  ANNUAL_GIFT,
  INCLUDED_IN_ALL,
  PLAN_COMPARISON,
  PLAN_DETAILS,
  PRICING_CONFIG,
  YEARLY_DISCOUNT_PERCENT,
  formatEuros,
  formatPlanPrice,
  visiblePlans,
  yearlyPrice,
  type PricingPlan,
} from '../config/pricing';
import { AppCta } from './AppLink';
import { ButtonLink } from './ui';
import { useAnalytics } from '../analytics/AnalyticsProvider';

type Billing = 'year' | 'month';

/**
 * Grille tarifaire : Starter / Pro / Business, avec bascule Mensuel / Annuel.
 * `full` (page Tarifs) ajoute ce qui est inclus partout, le cadeau, le tableau comparatif et les garanties.
 * Aucun paiement ici : les CTA mènent à l'application.
 */
export function Pricing({ plans = visiblePlans(), location = 'pricing', full = false }: { plans?: PricingPlan[]; location?: string; full?: boolean }) {
  const [billing, setBilling] = useState<Billing>('year');
  if (plans.length === 1) return <SinglePlan plan={plans[0]!} location={location} />;
  return (
    <div>
      <BillingToggle value={billing} onChange={setBilling} />
      <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:items-stretch lg:gap-5">
        {plans.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} previous={plans[i - 1]} billing={billing} location={location} />
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted">{PRICING_CONFIG.betaNotice}</p>
      {full && (
        <>
          <GiftBlock />
          <IncludedInAll />
          <Comparison plans={plans} />
          <Guarantees />
        </>
      )}
    </div>
  );
}

function BillingToggle({ value, onChange }: { value: Billing; onChange: (v: Billing) => void }) {
  const option = (v: Billing, label: string, extra?: string) => (
    <button
      type="button"
      role="radio"
      aria-checked={value === v}
      onClick={() => onChange(v)}
      className={`flex min-h-12 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors sm:px-6 sm:text-base ${
        value === v ? 'bg-forest text-white shadow-sm' : 'text-forest hover:bg-white/60'
      }`}
    >
      {label}
      {extra && <span className={`rounded-full px-2 py-0.5 text-xs font-extrabold ${value === v ? 'bg-leaf text-forest' : 'bg-white text-forest'}`}>{extra}</span>}
    </button>
  );
  return (
    <div className="flex flex-col items-center gap-3">
      <div role="radiogroup" aria-label="Périodicité du paiement" className="inline-flex rounded-full bg-mint p-1.5">
        {option('month', 'Mensuel')}
        {option('year', 'Annuel', `−${YEARLY_DISCOUNT_PERCENT} %`)}
      </div>
      <p className={`flex items-center gap-1.5 text-sm font-semibold ${value === 'year' ? 'text-forest' : 'text-muted'}`}>
        <Gift className="h-4 w-4" aria-hidden="true" /> {ANNUAL_GIFT.name} offert avec l’annuel
      </p>
    </div>
  );
}

function PlanCard({ plan, previous, billing, location }: { plan: PricingPlan; previous?: PricingPlan; billing: Billing; location: string }) {
  const { trackEvent } = useAnalytics();
  const hl = plan.highlight;
  const details = PLAN_DETAILS[plan.id];
  const yearly = yearlyPrice(plan);
  const annual = billing === 'year' && yearly !== null && plan.price !== null;
  const shown = annual ? Math.round((yearly! / 12) * 100) / 100 : plan.price;
  const amount = shown === null ? formatPlanPrice(plan).amount : `${formatEuros(shown)} €`;
  const muted = hl ? 'text-white/70' : 'text-muted';
  const features = details?.plus ?? plan.features;

  return (
    <article
      aria-label={plan.name}
      className={`relative flex flex-col rounded-[2rem] p-7 sm:p-8 ${hl ? 'bg-forest text-white shadow-float lg:-my-3 lg:py-11' : 'bg-white text-ink ring-1 ring-line'}`}
    >
      {plan.badge && (
        <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-extrabold tracking-wide whitespace-nowrap uppercase ${hl ? 'bg-leaf text-forest' : 'bg-mint text-forest'}`}>
          {plan.badge}
        </span>
      )}
      <h3 className={`font-display text-2xl font-extrabold ${hl ? 'text-white' : 'text-ink'}`}>{plan.name}</h3>
      {details && <p className={`mt-1 ${muted}`}>{details.tagline}</p>}

      <div className="mt-6">
        <p className="flex items-baseline gap-2">
          <span className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{amount}</span>
          <span className={muted}>HT / mois</span>
        </p>
        <p className={`mt-1.5 min-h-[2.5rem] text-sm ${muted}`}>
          {annual ? (
            <>
              Soit {formatEuros(yearly!)} € HT facturés une fois par an
              <span className="block">
                au lieu de <s>{plan.price} €</s> en mensuel
              </span>
            </>
          ) : (
            <>
              Sans engagement, résiliable chaque mois
              {yearly !== null && <span className="block">ou {formatEuros(yearly)} € HT / an en annuel (−{YEARLY_DISCOUNT_PERCENT} %)</span>}
            </>
          )}
        </p>
        <p
          className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-opacity ${annual ? 'opacity-100' : 'opacity-0'} ${hl ? 'bg-white/10 text-leaf' : 'bg-mint text-forest'}`}
          aria-hidden={!annual}
        >
          <Gift className="h-3.5 w-3.5" aria-hidden="true" /> {ANNUAL_GIFT.name} offert
        </p>
      </div>

      <div className="mt-5">
        {plan.cta.target === 'signup' ? (
          <AppCta location={`${location}_${plan.id}`} event="pricing_cta_clicked" variant={hl ? 'light' : 'primary'} className="w-full">
            {plan.cta.label}
          </AppCta>
        ) : (
          <ButtonLink to="/contact" variant={hl ? 'light' : 'secondary'} size="lg" className="w-full" onClick={() => trackEvent('contact_clicked', { location: `${location}_${plan.id}` })}>
            {plan.cta.label}
          </ButtonLink>
        )}
      </div>

      <div className={`mt-7 border-t pt-6 ${hl ? 'border-white/15' : 'border-line'}`}>
        {details && (
          <p className={`mb-3 flex items-center gap-2 text-sm font-semibold ${hl ? 'text-white' : 'text-ink'}`}>
            <Users className="h-4 w-4" aria-hidden="true" /> {details.users} utilisateur{details.users > 1 ? 's' : ''}
          </p>
        )}
        {previous && <p className={`mb-3 text-sm font-bold ${hl ? 'text-leaf' : 'text-forest'}`}>Tout {previous.name}, plus :</p>}
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[0.97rem]">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${hl ? 'bg-leaf text-forest' : 'bg-mint text-forest'}`}>
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function GiftBlock() {
  return (
    <section aria-labelledby="cadeau-annuel" className="mt-16 overflow-hidden rounded-[2rem] bg-mint">
      <div className="grid items-center gap-6 p-7 sm:p-10 md:grid-cols-[auto_1fr]">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-forest text-leaf">
          <Gift className="h-10 w-10" aria-hidden="true" />
        </div>
        <div>
          <h2 id="cadeau-annuel" className="font-display text-2xl font-extrabold text-forest sm:text-3xl">
            {ANNUAL_GIFT.headline}
          </h2>
          <p className="mt-2 text-lg text-forest/80">Mesurez sur le chantier, l’application calcule surfaces et quantités. Starter, Pro ou Business : dès que vous payez à l’année.</p>
          <details className="mt-3 text-sm text-forest/75">
            <summary className="cursor-pointer font-semibold text-forest underline-offset-2 hover:underline">Conditions de l’offre</summary>
            <p className="mt-2 max-w-3xl leading-relaxed">{ANNUAL_GIFT.conditions}</p>
          </details>
        </div>
      </div>
    </section>
  );
}

function IncludedInAll() {
  return (
    <section aria-labelledby="inclus-partout" className="mt-20">
      <h2 id="inclus-partout" className="text-center font-display text-3xl font-extrabold text-ink sm:text-4xl">
        Inclus dans toutes les offres
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-lg text-muted">L’essentiel est là dès Starter, sans option payante.</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INCLUDED_IN_ALL.map((it) => (
          <li key={it.title} className="flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-line">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-bold text-ink">{it.title}</span>
              <span className="mt-1 block text-muted">{it.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cell({ value, highlight }: { value: boolean | string; highlight: boolean }) {
  if (typeof value === 'string') return <span className="font-bold text-ink">{value}</span>;
  return value ? (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${highlight ? 'bg-forest text-white' : 'bg-mint text-forest'}`}>
      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-label="Inclus" />
    </span>
  ) : (
    <Minus className="mx-auto h-4 w-4 text-line" aria-label="Non inclus" />
  );
}

function Comparison({ plans }: { plans: PricingPlan[] }) {
  return (
    <section aria-labelledby="comparatif" className="mt-20">
      <h2 id="comparatif" className="text-center font-display text-3xl font-extrabold text-ink sm:text-4xl">
        Comparer les offres
      </h2>
      <div className="mt-10 overflow-hidden rounded-3xl bg-white ring-1 ring-line">
        <table className="w-full table-fixed border-collapse text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[42%] p-3 text-sm font-semibold text-muted sm:w-auto sm:p-5">
                <span className="sr-only">Fonctionnalité</span>
              </th>
              {plans.map((p) => (
                <th key={p.id} scope="col" className={`px-1 py-3 text-center sm:p-5 ${p.highlight ? 'bg-mint/60' : ''}`}>
                  <span className="block font-display text-sm font-extrabold text-ink sm:text-lg">{p.name}</span>
                  <span className="block text-xs font-medium text-muted sm:text-sm">{p.price} €</span>
                </th>
              ))}
            </tr>
          </thead>
          {PLAN_COMPARISON.map((g) => (
            <tbody key={g.group}>
              <tr>
                <th colSpan={plans.length + 1} scope="colgroup" className="bg-cream px-3 pt-5 pb-2 text-xs font-bold tracking-[0.14em] text-brand uppercase sm:px-5">
                  {g.group}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label} className="border-t border-line/70">
                  <th scope="row" className="p-3 font-medium text-ink sm:p-4 sm:px-5">
                    {r.label}
                  </th>
                  {r.values.slice(0, plans.length).map((v, i) => (
                    <td key={plans[i]!.id} className={`px-1 py-3 text-center sm:p-4 sm:px-5 ${plans[i]!.highlight ? 'bg-mint/30' : ''}`}>
                      <Cell value={v} highlight={!!plans[i]!.highlight} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}

function Guarantees() {
  const items = [
    { icon: RotateCcw, title: '15 jours d’essai gratuit', text: 'Toutes les fonctionnalités, sans carte bancaire.' },
    { icon: ShieldCheck, title: 'Sans engagement', text: 'Résiliable à tout moment depuis l’application.' },
    { icon: CreditCard, title: 'Paiement sécurisé', text: 'Carte bancaire via Stripe, factures téléchargeables.' },
    { icon: LockKeyhole, title: 'Vos données restent à vous', text: 'Consultables et exportables, même sans abonnement.' },
  ];
  return (
    <section aria-label="Nos engagements" className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className="rounded-3xl bg-white p-6 ring-1 ring-line">
          <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
          <p className="mt-3 font-bold text-ink">{title}</p>
          <p className="mt-1 text-sm text-muted">{text}</p>
        </div>
      ))}
    </section>
  );
}

/** Ancienne offre unique (mode bêta) : une seule carte. */
function SinglePlan({ plan, location }: { plan: PricingPlan; location: string }) {
  const { amount, suffix } = formatPlanPrice(plan);
  return (
    <div className="mx-auto max-w-xl">
      <article aria-label={plan.name} className="rounded-[2rem] bg-forest p-8 text-white shadow-float">
        <h3 className="font-display text-2xl font-extrabold">{plan.name}</h3>
        <p className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-6xl font-extrabold">{amount}</span>
          {suffix && <span className="text-white/70">{suffix}</span>}
        </p>
        <p className="mt-2 text-white/75">{plan.description}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden="true" /> {f}
            </li>
          ))}
        </ul>
        <AppCta location={`${location}_${plan.id}`} event="pricing_cta_clicked" variant="light" className="mt-8 w-full">
          {plan.cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </AppCta>
      </article>
      <p className="mt-6 text-center text-sm leading-relaxed text-muted">{PRICING_CONFIG.betaNotice}</p>
    </div>
  );
}
