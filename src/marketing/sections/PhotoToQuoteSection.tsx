import { useEffect, useState } from 'react';
import { Calculator, Camera, FileText, Ruler } from 'lucide-react';
import { PhoneFrame } from '../components/mockups/PhoneFrame';
import { PhotoAnalysisMockup } from '../components/mockups/PhotoAnalysisMockup';
import { EstimateScreen, InfoScreen, QuoteScreen } from '../components/mockups/DemoScreens';
import { Reveal, usePrefersReducedMotion } from '../components/Reveal';
import { Container, Eyebrow, Section } from '../components/ui';
import { MICRO_COPY } from '../config/marketing';

const STAGES = [
  { label: 'Photo', icon: Camera, Screen: () => <PhotoAnalysisMockup scan={false} /> },
  { label: 'Informations', icon: Ruler, Screen: InfoScreen },
  { label: 'Estimation', icon: Calculator, Screen: EstimateScreen },
  { label: 'Devis', icon: FileText, Screen: QuoteScreen },
];

export function PhotoToQuoteSection() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % STAGES.length), 2800);
    return () => clearInterval(t);
  }, [reduced, paused]);

  const Stage = STAGES[i]!;

  return (
    <Section labelledBy="photo-title" className="relative overflow-hidden bg-forest text-white">
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow tone="light">{MICRO_COPY.field}</Eyebrow>
          <h2 id="photo-title" className="mt-4 font-display text-[2.1rem] leading-[1.08] font-extrabold sm:text-5xl">
            Commencez simplement par une photo.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75">
            Sur le terrain, vous n’avez pas besoin d’un logiciel compliqué. Commencez par votre chantier. Ajoutez vos photos, renseignez les informations utiles et construisez
            votre estimation directement depuis votre téléphone.
          </p>
          <ol className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Transformation">
            {STAGES.map((s, idx) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => {
                    setI(idx);
                    setPaused(true);
                  }}
                  aria-pressed={idx === i}
                  className={`flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold transition duration-500 ${
                    idx === i ? 'bg-white text-forest' : 'bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10'
                  }`}
                >
                  <s.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <div className="h-full rounded-full bg-leaf transition-all duration-700" style={{ width: `${((i + 1) / STAGES.length) * 100}%` }} />
          </div>
        </Reveal>

        <div className="flex justify-center">
          <PhoneFrame className="w-[258px] sm:w-[284px]" label={`Écran de l’application : ${Stage.label}`}>
            <div key={Stage.label} className="animate-fade-up flex h-full flex-col [animation-duration:.5s]">
              <Stage.Screen />
            </div>
          </PhoneFrame>
        </div>
      </Container>
    </Section>
  );
}
