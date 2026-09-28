import { PROBLEMS } from '../data/content';
import { Reveal } from '../components/Reveal';
import { IconTile } from '../components/FeatureCard';
import { Container, Section, SectionHeading } from '../components/ui';

export function ProblemSection() {
  return (
    <Section labelledBy="probleme-title" className="bg-white">
      <Container>
        <SectionHeading id="probleme-title" eyebrow="Le constat" title="Les devis ne devraient pas vous faire perdre vos journées." />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PROBLEMS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 70}>
              <article className="h-full rounded-3xl bg-cream p-6 ring-1 ring-line/70">
                <IconTile icon={p.icon} tone="white" />
                <h3 className="mt-5 text-[1.05rem] font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="mx-auto mt-12 max-w-2xl text-center font-display text-xl font-bold text-ink sm:text-2xl">
            Paysapro AI rassemble tout dans <span className="text-brand">un seul outil pensé pour le terrain.</span>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
