import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { AUDIENCE, COMPANY_PROFILES } from '../data/audience';
import { Reveal } from '../components/Reveal';
import { IconTile } from '../components/FeatureCard';
import { Container, Section, SectionHeading, buttonClass } from '../components/ui';

export function AudienceSection() {
  return (
    <Section id="pour-qui" labelledBy="audience-title" className="bg-white">
      <Container>
        <SectionHeading id="audience-title" eyebrow="Pour qui ?" title="Pensé pour les professionnels du paysage." />
        <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2" aria-label="Profils d’entreprise">
          {COMPANY_PROFILES.map((p) => (
            <li key={p} className="rounded-full bg-cream px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line">
              {p}
            </li>
          ))}
        </ul>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {AUDIENCE.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 4) * 70}>
              <article className="h-full rounded-3xl bg-cream p-5 ring-1 ring-line/70 transition duration-300 hover:-translate-y-1 hover:bg-mint-2 sm:p-6 motion-reduce:hover:translate-y-0">
                <IconTile icon={a.icon} tone="white" />
                <h3 className="mt-4 text-base font-bold text-ink sm:text-lg">{a.title}</h3>
                <p className="mt-1.5 hidden text-[0.93rem] leading-relaxed text-muted sm:block">{a.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Link to="/fonctionnalites" className={buttonClass('primary', 'lg', 'group')}>
            Découvrir Paysapro AI
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
