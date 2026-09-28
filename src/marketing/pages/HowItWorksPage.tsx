import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { HOW_STEPS, type HowScreen } from '../data/content';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { AppCta } from '../components/AppLink';
import { Reveal } from '../components/Reveal';
import { Container } from '../components/ui';
import { VideoPlaceholder } from '../components/VideoPlaceholder';
import { PhoneFrame } from '../components/mockups/PhoneFrame';
import { CaptureScreen, EstimateScreen, InfoScreen, QuoteScreen, SignScreen } from '../components/mockups/DemoScreens';
import { ClientQuoteMockup } from '../components/mockups/ClientQuoteMockup';
import { PhotoAnalysisMockup } from '../components/mockups/PhotoAnalysisMockup';
import { FinalCTA } from '../sections/FinalCTA';
import { MICRO_COPY } from '../config/marketing';

const SCREENS: Record<HowScreen, () => ReactNode> = {
  capture: () => <CaptureScreen />,
  analysis: () => <PhotoAnalysisMockup scan={false} />,
  info: () => <InfoScreen />,
  estimate: () => <EstimateScreen />,
  quote: () => <QuoteScreen />,
  client: () => <ClientQuoteMockup />,
  sign: () => <SignScreen />,
};

export default function HowItWorksPage() {
  usePageMeta('/comment-ca-marche');
  return (
    <>
      <PageHeader
        eyebrow="Comment ça marche"
        title="Six étapes. Du jardin à la signature."
        intro="Paysapro AI suit l’ordre dans lequel vous travaillez déjà. Vous gardez la main à chaque étape."
      >
        <AppCta location="how_header">Tester Paysapro AI</AppCta>
      </PageHeader>

      <Container className="max-w-5xl">
        <VideoPlaceholder />
      </Container>

      <ol className="py-16 sm:py-24">
        {HOW_STEPS.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={s.title} className="py-10 sm:py-14">
              <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal className={flip ? 'lg:order-2' : ''}>
                  <span className="font-display text-7xl font-extrabold text-mint sm:text-8xl" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="-mt-4 font-display text-3xl font-extrabold text-ink sm:text-4xl">
                    <span className="sr-only">Étape {i + 1} : </span>
                    {s.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{s.text}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-ink">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={100} className={`flex justify-center ${flip ? 'lg:order-1' : ''}`}>
                  <PhoneFrame className="w-[250px] sm:w-[272px]" label={`Écran : ${s.title}`}>
                    {SCREENS[s.screen]()}
                  </PhoneFrame>
                </Reveal>
              </Container>
            </li>
          );
        })}
      </ol>

      <Container className="pb-20 text-center">
        <p className="font-display text-2xl font-bold text-ink">{MICRO_COPY.control}</p>
        <div className="mt-6 flex justify-center">
          <AppCta location="how_bottom">Essayer gratuitement</AppCta>
        </div>
      </Container>
      <FinalCTA />
    </>
  );
}
