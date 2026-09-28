import { ArrowDown, ArrowRight, Plus } from 'lucide-react';
import { TIME_BEFORE } from '../data/content';
import { LogoMark } from '../components/Logo';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading } from '../components/ui';

/** Bénéfice temps — sans chiffre promis. */
export function TimeSection() {
  return (
    <Section labelledBy="temps-title">
      <Container>
        <SectionHeading
          id="temps-title"
          eyebrow="Votre temps"
          title="Moins d’administratif. Plus de temps sur vos chantiers."
          intro="Les étapes restent les mêmes. Elles se font simplement au même endroit, dans la continuité."
        />
        <Reveal>
          <div className="mx-auto mt-14 flex max-w-5xl flex-col items-center gap-6 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10 lg:flex-row lg:justify-between">
            <div className="w-full lg:w-auto">
              <p className="text-center text-sm font-bold tracking-[0.14em] text-muted uppercase lg:text-left">Avant</p>
              <ol className="mt-4 flex flex-wrap items-center justify-center gap-1.5 lg:justify-start">
                {TIME_BEFORE.map((t, i) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <span className="rounded-xl bg-cream px-3.5 py-2 text-[0.95rem] font-semibold text-muted ring-1 ring-line">{t}</span>
                    {i < TIME_BEFORE.length - 1 && <Plus className="h-3.5 w-3.5 text-muted/70" aria-label="puis" />}
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-center text-sm text-muted lg:text-left">Cinq moments, souvent cinq outils, et beaucoup de ressaisie.</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-forest" aria-hidden="true">
              <ArrowDown className="h-5 w-5 lg:hidden" />
              <ArrowRight className="hidden h-5 w-5 lg:block" />
            </span>
            <div className="text-center">
              <p className="text-sm font-bold tracking-[0.14em] text-brand uppercase">Après</p>
              <div className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-forest px-6 py-4 text-white shadow-float">
                <LogoMark className="h-9 w-9" variant="light" />
                <span className="font-display text-xl font-extrabold">Paysapro AI</span>
              </div>
              <p className="mt-3 text-sm text-muted">Une seule saisie, du chantier à la signature.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
