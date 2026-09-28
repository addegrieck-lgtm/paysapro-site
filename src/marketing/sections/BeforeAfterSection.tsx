import { ArrowRight } from 'lucide-react';
import { AFTER, BEFORE } from '../data/content';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading } from '../components/ui';

export function BeforeAfterSection() {
  return (
    <Section labelledBy="avant-apres-title">
      <Container>
        <SectionHeading id="avant-apres-title" eyebrow="Avant / Après" title="Six outils éparpillés. Ou un seul." />
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-sand/70 p-7 ring-1 ring-line sm:p-9">
              <h3 className="font-sans text-sm font-bold tracking-[0.16em] text-muted uppercase">Avant</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {BEFORE.map((b, i) => (
                  <Reveal as="li" key={b.title} delay={i * 70}>
                    <span className="flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-3.5 text-[0.97rem] text-muted ring-1 ring-line/80">
                      <b.icon className="h-5 w-5 shrink-0" aria-hidden="true" strokeWidth={1.7} />
                      <span className="line-through decoration-ink/25">{b.title}</span>
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="flex h-12 w-12 rotate-90 items-center justify-center rounded-full bg-brand text-white shadow-card lg:rotate-0">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>
          <Reveal delay={150}>
            <div className="h-full rounded-[2rem] bg-forest p-7 text-white shadow-float sm:p-9">
              <h3 className="font-sans text-sm font-bold tracking-[0.16em] text-leaf uppercase">Après · Paysapro AI</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {AFTER.map((a, i) => (
                  <Reveal as="li" key={a.title} delay={250 + i * 70}>
                    <span className="flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3.5 text-[0.97rem] font-semibold ring-1 ring-white/10">
                      <a.icon className="h-5 w-5 shrink-0 text-leaf" aria-hidden="true" strokeWidth={1.8} />
                      {a.title}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
