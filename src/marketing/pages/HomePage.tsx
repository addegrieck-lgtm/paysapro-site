import { usePageMeta } from '../components/usePageMeta';
import { Hero } from '../components/Hero';
import { ProblemSection } from '../sections/ProblemSection';
import { SolutionSection } from '../sections/SolutionSection';
import { DemoSection } from '../sections/DemoSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import { PhotoToQuoteSection } from '../sections/PhotoToQuoteSection';
import { CatalogSection } from '../sections/CatalogSection';
import { QuoteSection } from '../sections/QuoteSection';
import { ClientSection } from '../sections/ClientSection';
import { MobileSection } from '../sections/MobileSection';
import { BeforeAfterSection } from '../sections/BeforeAfterSection';
import { AISection } from '../sections/AISection';
import { AudienceSection } from '../sections/AudienceSection';
import { TimeSection } from '../sections/TimeSection';
import { TrustSection } from '../sections/TrustSection';
import { AmbassadorSection, BetaSection, FAQSection, PricingSection, TestimonialsSection } from '../sections/MiscSections';
import { FinalCTA } from '../sections/FinalCTA';

/**
 * Accueil — ordre pensé pour comprendre en moins de 30 secondes :
 * quoi (hero) → problème → comment → démonstration → quoi précisément → confiance → prix → commencer.
 */
export function HomePage() {
  usePageMeta('/');
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <DemoSection />
      <FeaturesSection />
      <PhotoToQuoteSection />
      <CatalogSection />
      <QuoteSection />
      <ClientSection />
      <MobileSection />
      <BeforeAfterSection />
      <AISection />
      <AudienceSection />
      <TimeSection />
      <TrustSection />
      <TestimonialsSection />
      <PricingSection />
      <BetaSection />
      <AmbassadorSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
