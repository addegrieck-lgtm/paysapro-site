import { MapPin } from 'lucide-react';
import { PhoneFrame } from '../components/mockups/PhoneFrame';
import { CaptureScreen, SignScreen } from '../components/mockups/DemoScreens';
import { PhotoAnalysisMockup } from '../components/mockups/PhotoAnalysisMockup';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading } from '../components/ui';

const SCENES = [
  { place: 'Dans une allée', text: 'Vous photographiez l’accès et le portail.', Screen: CaptureScreen },
  { place: 'Devant un jardin', text: 'Vous relevez les zones et les dimensions.', Screen: () => <PhotoAnalysisMockup scan={false} /> },
  { place: 'Sur un chantier', text: 'Le client signe, vous planifiez la suite.', Screen: SignScreen },
];

export function MobileSection() {
  return (
    <Section labelledBy="mobile-title" className="overflow-hidden bg-white">
      <Container>
        <SectionHeading
          id="mobile-title"
          eyebrow="Accessible depuis votre smartphone"
          title="Votre bureau tient dans votre poche."
          intro="Parce qu’un paysagiste travaille rarement derrière un bureau."
        />
      </Container>
      <ul className="snap-row mt-14 flex gap-6 overflow-x-auto px-[calc(50vw-135px)] pb-4 md:justify-center md:overflow-visible md:px-6" aria-label="Paysapro AI sur le terrain">
        {SCENES.map((s, i) => (
          <Reveal as="li" key={s.place} delay={i * 100} className={`flex shrink-0 flex-col items-center ${i === 1 ? 'md:-translate-y-6' : ''}`}>
            <PhoneFrame className="w-[250px] lg:w-[270px]" label={`Paysapro AI utilisé ${s.place.toLowerCase()}`}>
              <s.Screen />
            </PhoneFrame>
            <div className="mt-5 max-w-[250px] text-center">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-sm font-bold text-forest">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {s.place}
              </p>
              <p className="mt-2 text-[0.95rem] text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
