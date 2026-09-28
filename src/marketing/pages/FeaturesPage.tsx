import type { ReactNode } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { FEATURES, type FeatureMockup } from '../data/features';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { AppCta } from '../components/AppLink';
import { Reveal } from '../components/Reveal';
import { IconTile } from '../components/FeatureCard';
import { ButtonLink, Container } from '../components/ui';
import { PhoneFrame } from '../components/mockups/PhoneFrame';
import { QuoteMockup } from '../components/mockups/QuoteMockup';
import { CatalogMockup } from '../components/mockups/CatalogMockup';
import { DashboardMockup } from '../components/mockups/DashboardMockup';
import { ClientQuoteMockup } from '../components/mockups/ClientQuoteMockup';
import { PhotoAnalysisMockup } from '../components/mockups/PhotoAnalysisMockup';
import { AISuggestionMockup, CalcMockup, ClientsMockup, PhotosGridMockup, ProjectMockup } from '../components/mockups/FeatureMockups';
import { FinalCTA } from '../sections/FinalCTA';
import { useAnalytics } from '../analytics/AnalyticsProvider';
import { APP_LINKS } from '../config/marketing';

const MOCKUPS: Record<FeatureMockup, () => ReactNode> = {
  photos: () => <PhotosGridMockup />,
  clients: () => <ClientsMockup />,
  project: () => <ProjectMockup />,
  calc: () => <CalcMockup />,
  catalog: () => <CatalogMockup />,
  quote: () => <QuoteMockup />,
  signature: () => (
    <PhoneFrame className="mx-auto w-[250px]" label="Page de signature côté client">
      <ClientQuoteMockup />
    </PhoneFrame>
  ),
  dashboard: () => <DashboardMockup />,
  ai: () => <AISuggestionMockup />,
  mobile: () => (
    <PhoneFrame className="mx-auto w-[250px]" label="Paysapro AI sur smartphone">
      <PhotoAnalysisMockup scan={false} />
    </PhoneFrame>
  ),
};

export default function FeaturesPage() {
  usePageMeta('/fonctionnalites');
  const { trackEvent } = useAnalytics();
  return (
    <>
      <PageHeader
        eyebrow="Fonctionnalités"
        title="Tout ce qu’il faut, du chantier au devis signé."
        intro="Paysapro AI réunit les photos, les métrés, vos tarifs, vos devis et le suivi client dans un seul logiciel, pensé pour les paysagistes."
      >
        <AppCta location="features_header">Essayer gratuitement</AppCta>
      </PageHeader>

      {/* Sommaire */}
      <Container>
        <nav aria-label="Sommaire des fonctionnalités" className="snap-row -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {FEATURES.map((f) => (
            <a key={f.id} href={`#${f.id}`} className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line hover:ring-brand/40">
              <f.icon className="h-4 w-4 text-brand" aria-hidden="true" />
              {f.title}
            </a>
          ))}
        </nav>
      </Container>

      <div className="py-16 sm:py-24">
        {FEATURES.map((f, i) => {
          const Mock = MOCKUPS[f.mockup];
          const flip = i % 2 === 1;
          return (
            <section key={f.id} id={f.id} aria-labelledby={`${f.id}-title`} className={`py-12 sm:py-16 ${flip ? 'bg-white' : ''}`}>
              <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={flip ? 'lg:order-2' : ''}>
                  <IconTile icon={f.icon} size="lg" />
                  <h2 id={`${f.id}-title`} className="mt-5 font-display text-3xl leading-tight font-extrabold text-ink sm:text-4xl">
                    {f.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{f.description}</p>
                  <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-mint px-4 py-3 font-semibold text-forest">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.6} aria-hidden="true" />
                    {f.benefit}
                  </p>
                  <a
                    href={APP_LINKS.signup}
                    onClick={() => trackEvent('signup_clicked', { location: `feature_${f.id}` })}
                    className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-strong"
                  >
                    Essayer cette fonctionnalité
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </Reveal>
                <Reveal delay={100} className={`mx-auto w-full max-w-lg ${flip ? 'lg:order-1' : ''}`}>
                  {Mock()}
                </Reveal>
              </Container>
            </section>
          );
        })}
      </div>

      <Container className="pb-16 text-center">
        <ButtonLink to="/comment-ca-marche" variant="secondary" size="lg">
          Voir comment ça marche
        </ButtonLink>
      </Container>
      <FinalCTA />
    </>
  );
}
