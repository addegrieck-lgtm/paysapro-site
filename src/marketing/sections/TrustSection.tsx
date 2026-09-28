import { TRUST } from '../data/content';
import { Reveal } from '../components/Reveal';
import { IconTile } from '../components/FeatureCard';
import { Container, Section, SectionHeading } from '../components/ui';
import { MICRO_COPY } from '../config/marketing';

export function TrustSection() {
  return (
    <Section labelledBy="confiance-title" className="bg-white">
      <Container>
        <SectionHeading id="confiance-title" eyebrow={MICRO_COPY.pros} title="Conçu pour les professionnels." />
        <ul className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST.map((t, i) => (
            <Reveal as="li" key={t.title} delay={(i % 3) * 70} className="flex gap-4">
              <IconTile icon={t.icon} />
              <div>
                <h3 className="text-[1.05rem] font-bold text-ink">{t.title}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
