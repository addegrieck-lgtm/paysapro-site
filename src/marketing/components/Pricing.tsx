import { Check } from 'lucide-react';
import { FUTURE_PLANS, PRICING_CONFIG, YEARLY_DISCOUNT_PERCENT, formatPlanPrice, formatYearlyPrice, visiblePlans, type PricingPlan } from '../config/pricing';
import { AppCta } from './AppLink';
import { ButtonLink } from './ui';
import { useAnalytics } from '../analytics/AnalyticsProvider';

/**
 * Grille tarifaire générique : 1 plan (bêta) ou plusieurs (Starter / Pro / Premium).
 * Aucun paiement ici : les CTA mènent à l'application (ou au contact).
 */
export function Pricing({ plans = visiblePlans(), location = 'pricing' }: { plans?: PricingPlan[]; location?: string }) {
  const single = plans.length === 1;
  return (
    <div>
      <div className={`grid gap-5 ${single ? 'mx-auto max-w-xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} location={location} />
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-muted">{PRICING_CONFIG.betaNotice}</p>
      {single && PRICING_CONFIG.mode === 'beta' && <FuturePlans />}
    </div>
  );
}

/** Offres prévues après la bêta : information seulement, aucun bouton de paiement. */
function FuturePlans() {
  return (
    <section className="mt-14" aria-labelledby="offres-apres-beta">
      <h3 id="offres-apres-beta" className="text-center font-display text-2xl font-extrabold tracking-tight text-ink">
        Après la bêta
      </h3>
      <p className="mx-auto mt-2 max-w-xl text-center text-muted">
        Paiement au mois, ou à l’année avec <strong className="text-forest">{YEARLY_DISCOUNT_PERCENT} % de réduction</strong>.
      </p>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {FUTURE_PLANS.map((plan) => {
          const { amount, suffix } = formatPlanPrice(plan);
          const yearly = formatYearlyPrice(plan);
          return (
            <article key={plan.id} aria-label={`Offre ${plan.name}`} className="flex flex-col rounded-3xl bg-white p-6 text-ink ring-1 ring-line">
              <h4 className="font-sans text-sm font-bold tracking-[0.16em] text-brand uppercase">{plan.name}</h4>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold tracking-tight">{amount}</span>
                {suffix && <span className="text-muted">{suffix}</span>}
              </p>
              {yearly && (
                <p className="mt-1 text-sm">
                  <span className="font-semibold text-forest">
                    ou {yearly.yearly} (−{YEARLY_DISCOUNT_PERCENT} %)
                  </span>
                  <span className="block text-muted">{yearly.monthlyEquivalent}</span>
                </p>
              )}
              <p className="mt-3 text-sm text-muted">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-[0.95rem]">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PlanCard({ plan, location }: { plan: PricingPlan; location: string }) {
  const { trackEvent } = useAnalytics();
  const { amount, suffix } = formatPlanPrice(plan);
  const hl = plan.highlight;
  return (
    <article
      className={`relative flex h-full flex-col rounded-[2rem] p-7 sm:p-9 ${
        hl ? 'bg-forest text-white shadow-float' : 'bg-white text-ink ring-1 ring-line'
      }`}
      aria-labelledby={`plan-${plan.id}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id={`plan-${plan.id}`} className={`font-sans text-sm font-bold tracking-[0.16em] uppercase ${hl ? 'text-leaf' : 'text-brand'}`}>
          {plan.name}
        </h3>
        {plan.badge && (
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${hl ? 'bg-white/10 text-white ring-1 ring-white/15' : 'bg-mint text-forest'}`}>
            {plan.badge}
          </span>
        )}
      </div>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="font-display text-6xl font-extrabold tracking-tight">{amount}</span>
        {suffix && <span className={hl ? 'text-white/70' : 'text-muted'}>{suffix}</span>}
      </p>
      <p className={`mt-2 ${hl ? 'text-white/75' : 'text-muted'}`}>{plan.description}</p>

      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[0.97rem]">
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${hl ? 'bg-leaf text-forest' : 'bg-mint text-forest'}`}>
              <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-1 sm:mt-auto sm:pt-8">
        {plan.cta.target === 'signup' ? (
          <AppCta location={`${location}_${plan.id}`} event="pricing_cta_clicked" variant={hl ? 'light' : 'primary'} className="w-full">
            {plan.cta.label}
          </AppCta>
        ) : (
          <ButtonLink
            to="/contact"
            variant={hl ? 'light' : 'secondary'}
            size="lg"
            className="w-full"
            onClick={() => trackEvent('contact_clicked', { location: `${location}_${plan.id}` })}
          >
            {plan.cta.label}
          </ButtonLink>
        )}
      </div>
    </article>
  );
}
