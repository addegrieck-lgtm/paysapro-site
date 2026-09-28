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
      <PageHeader eyebrow="Tarifs" title="Commencez gratuitement." intro="Pendant la phase bêta, Paysapro AI est accessible gratuitement. Aucune carte bancaire, aucun engagement.">
        <span className="mx-auto">
          <BetaBadge>Accès bêta gratuit</BetaBadge>
        </span>
      </PageHeader>
      <Container className="pb-20">
        <Pricing location="pricing_page" />
      </Container>
      <BetaSection />
      <Container className="max-w-3xl pb-24">
        <h2 className="mb-8 text-center font-display text-3xl font-extrabold text-ink">Questions sur les tarifs</h2>
        <FAQ items={FAQ_DATA.filter((f) => f.pricing)} />
      </Container>
      <FinalCTA title="Rejoignez la bêta dès aujourd’hui." />
    </>
  );
}
