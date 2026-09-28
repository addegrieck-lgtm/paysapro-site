import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Calculator, Camera, ChevronLeft, ChevronRight, FileText, PenLine, Ruler } from 'lucide-react';
import { PhoneFrame } from '../components/mockups/PhoneFrame';
import { CaptureScreen, EstimateScreen, InfoScreen, QuoteScreen, SignScreen } from '../components/mockups/DemoScreens';
import { Container, Section, SectionHeading } from '../components/ui';

const STEPS = [
  { id: 'photo', label: 'Photo chantier', icon: Camera, text: 'Vous photographiez le jardin depuis l’application : la photo est rangée dans le chantier.', Screen: CaptureScreen },
  { id: 'infos', label: 'Informations', icon: Ruler, text: 'Vous saisissez les dimensions : surfaces et linéaires sont calculés.', Screen: InfoScreen },
  { id: 'estimation', label: 'Estimation', icon: Calculator, text: 'Vos prestations et vos prix s’appliquent. Les suggestions sont à valider.', Screen: EstimateScreen },
  { id: 'devis', label: 'Devis', icon: FileText, text: 'Le devis est prêt : vérifiez l’aperçu, puis envoyez-le.', Screen: QuoteScreen },
  { id: 'signature', label: 'Signature', icon: PenLine, text: 'Le client signe, le statut passe à « signé ». Vous planifiez le chantier.', Screen: SignScreen },
];

/** Démonstration interactive : onglets cliquables (flèches clavier), swipe sur mobile. */
export function DemoSection() {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const startX = useRef<number | null>(null);
  const step = STEPS[index]!;

  const go = (i: number, focus = false) => {
    const next = (i + STEPS.length) % STEPS.length;
    setIndex(next);
    if (focus) tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView?.({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      go(index + 1, true);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      go(index - 1, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(STEPS.length - 1, true);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <Section id="demo" labelledBy="demo-title" className="overflow-hidden bg-white">
      <Container>
        <SectionHeading id="demo-title" eyebrow="Démonstration" title="Voyez Paysapro AI en action." intro="Cliquez sur les étapes : l’écran de l’application change à chaque étape." />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="min-w-0">
            <div
              role="tablist"
              aria-label="Étapes de la démonstration"
              aria-orientation="vertical"
              onKeyDown={onKey}
              className="snap-row -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            >
              {STEPS.map((s, i) => {
                const selected = i === index;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`demo-tab-${s.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="demo-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => go(i)}
                    className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition duration-300 lg:w-full lg:px-5 lg:py-4 ${
                      selected ? 'bg-forest text-white shadow-card' : 'bg-cream text-ink hover:bg-sand'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        selected ? 'bg-white/10 text-leaf' : 'bg-white text-brand ring-1 ring-line'
                      }`}
                    >
                      <s.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className={`block text-xs font-semibold ${selected ? 'text-white/60' : 'text-muted'}`}>Étape {i + 1}</span>
                      <span className="block font-semibold whitespace-nowrap">{s.label}</span>
                      <span className={`mt-1 hidden text-sm leading-snug lg:block ${selected ? 'text-white/75' : 'text-muted'}`}>{s.text}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 min-h-12 text-center text-muted lg:hidden" aria-live="polite">
              {step.text}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div
              id="demo-panel"
              role="tabpanel"
              aria-labelledby={`demo-tab-${step.id}`}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              className="touch-pan-y select-none"
            >
              <PhoneFrame className="w-[258px] sm:w-[280px]" label={`Écran de l’application : ${step.label}`}>
                <div key={step.id} className="animate-fade-up flex h-full flex-col [animation-duration:.45s]">
                  <step.Screen />
                </div>
              </PhoneFrame>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button type="button" onClick={() => go(index - 1)} aria-label="Étape précédente" className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-line hover:ring-ink/30">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex gap-1.5" aria-hidden="true">
                {STEPS.map((s, i) => (
                  <span key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-brand' : 'w-1.5 bg-line'}`} />
                ))}
              </div>
              <button type="button" onClick={() => go(index + 1)} aria-label="Étape suivante" className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-line hover:ring-ink/30">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
