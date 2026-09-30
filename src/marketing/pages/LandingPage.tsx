import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router';
import { landingByPath, type LandingVisual } from '../data/landings';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { AppCta } from '../components/AppLink';
import { FAQ } from '../components/FAQ';
import { Reveal } from '../components/Reveal';
import { ButtonLink, Container } from '../components/ui';
import { PhoneFrame } from '../components/mockups/PhoneFrame';
import { PhotoAnalysisMockup } from '../components/mockups/PhotoAnalysisMockup';
import { QuoteMockup } from '../components/mockups/QuoteMockup';
import { DashboardMockup } from '../components/mockups/DashboardMockup';
import { CatalogMockup } from '../components/mockups/CatalogMockup';
import { FinalCTA } from '../sections/FinalCTA';
import NotFoundPage from './NotFoundPage';

function Visual({ kind }: { kind: LandingVisual }) {
  if (kind === 'quote') return <QuoteMockup />;
  if (kind === 'dashboard') return <DashboardMockup />;
  if (kind === 'catalog') return <CatalogMockup />;
  return (
    <PhoneFrame className="mx-auto w-[260px]" label="Application Paysapro AI sur smartphone : photo du chantier et zones repérées">
      <PhotoAnalysisMockup scan={false} />
    </PhoneFrame>
  );
}

/** Page d'atterrissage SEO générique (contenu dans data/landings.ts). */
export default function LandingPage({ path }: { path: string }) {
  const landing = landingByPath(path);
  usePageMeta(path);
  if (!landing) return <NotFoundPage />;

  return (
    <>
      <PageHeader eyebrow={landing.eyebrow} title={landing.h1} intro={landing.intro}>
        <AppCta location={`landing_${path.slice(1)}`}>Essayer gratuitement</AppCta>
        <ButtonLink to="/comment-ca-marche" variant="secondary" size="lg">
          Voir comment ça marche
        </ButtonLink>
      </PageHeader>

      <Container className="grid gap-12 pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-12">
          {landing.sections.map((s) => (
            <Reveal as="section" key={s.heading}>
              <h2 className="font-display text-2xl leading-tight font-extrabold text-ink sm:text-3xl">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-[1.08rem] leading-[1.75] text-muted">
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.list && (
                  <ul className="space-y-2.5">
                    {s.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="mx-auto max-w-md">
            <Visual kind={landing.visual} />
            <p className="mt-4 text-center text-sm text-muted">Exemple : données et tarifs fictifs.</p>
          </div>
        </aside>
      </Container>

      <Container className="max-w-3xl pb-16">
        <h2 className="mb-8 text-center font-display text-3xl font-extrabold text-ink">Questions fréquentes</h2>
        <FAQ items={landing.faq.map((f, i) => ({ id: `q${i}`, question: f.question, answer: f.answer }))} />
      </Container>

      <Container className="max-w-3xl pb-24">
        <nav aria-label="Pour aller plus loin">
          <h2 className="font-display text-xl font-extrabold text-ink">Pour aller plus loin</h2>
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
            {landing.related.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="group flex items-center justify-between gap-4 p-5 font-semibold text-ink hover:bg-cream/60">
                  {r.label}
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <FinalCTA />
    </>
  );
}
