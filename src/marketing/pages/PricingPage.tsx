import { FAQ as FAQ_DATA } from '../data/faq';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { BetaBadge, Container } from '../components/ui';
import { BetaSection } from '../sections/MiscSections';
import { FinalCTA } from '../sections/FinalCTA';

export default function PricingPage() {
  usePageMeta('/tarifs');
  return (
    <>
      <PageHeader
        eyebrow="Tarifs"
        title="Des prix simples, sans engagement."
        intro="Essayez gratuitement pendant 15 jours, avec toutes les fonctionnalités et sans carte bancaire. Ensuite, choisissez l’offre qui vous convient."
      >
        <span className="mx-auto">
          <BetaBadge>Essai gratuit 15 jours</BetaBadge>
        </span>
      </PageHeader>
      <Container className="pb-20">
        {/* Titre pour la structure (H1 → H2 → H3 des offres), invisible à l'écran */}
        <h2 className="sr-only">Nos offres</h2>
        <Pricing location="pricing_page" full />
      </Container>
      <BetaSection />
      <Container className="max-w-3xl pb-24">
        <h2 className="mb-8 text-center font-display text-3xl font-extrabold text-ink">Questions sur les tarifs</h2>
        <FAQ items={FAQ_DATA.filter((f) => f.pricing)} />
      </Container>
      <FinalCTA title="Essayez Paysapro AI gratuitement pendant 15 jours." />
    </>
  );
}
