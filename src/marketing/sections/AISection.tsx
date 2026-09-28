import { Check } from 'lucide-react';
import { AI_CONTROLS } from '../data/content';
import { AISuggestionMockup } from '../components/mockups/FeatureMockups';
import { Reveal } from '../components/Reveal';
import { Container, Eyebrow, Section } from '../components/ui';
import { MICRO_COPY } from '../config/marketing';

/** L'IA est présentée comme un assistant, jamais comme infaillible. */
export function AISection() {
  return (
    <Section id="ia" labelledBy="ia-title" className="relative overflow-hidden bg-forest text-white">
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <Eyebrow tone="light">{MICRO_COPY.control}</Eyebrow>
          <h2 id="ia-title" className="mt-4 font-display text-[2.1rem] leading-[1.08] font-extrabold sm:text-5xl">
            L’IA vous aide. Vous gardez le contrôle.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75">
            Paysapro AI utilise l’intelligence artificielle comme assistant pour vous aider à structurer vos informations et accélérer votre préparation. Vous restez maître des
            quantités, prestations, tarifs et du devis final.
          </p>
          <h3 className="mt-9 font-sans text-sm font-bold tracking-[0.14em] text-leaf uppercase">Vous contrôlez toujours</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AI_CONTROLS.map((c) => (
              <li key={c} className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-4 py-3 font-semibold ring-1 ring-white/10">
                <Check className="h-4 w-4 shrink-0 text-leaf" strokeWidth={2.8} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/60">Une photo ne suffit pas à chiffrer un chantier avec certitude : les suggestions sont toujours à vérifier et à valider.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mx-auto max-w-md">
            <AISuggestionMockup />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
