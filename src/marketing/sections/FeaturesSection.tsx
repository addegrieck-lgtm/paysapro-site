import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { FEATURES } from '../data/features';
import { FeatureCard } from '../components/FeatureCard';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading, buttonClass } from '../components/ui';

export function FeaturesSection() {
  const items = FEATURES.filter((f) => f.home);
  return (
    <Section id="fonctionnalites" labelledBy="features-title">
      <Container>
        <SectionHeading id="features-title" eyebrow="Fonctionnalités" title="Tout ce qu’il faut pour gérer vos devis." intro="Du premier rendez-vous sur place jusqu’à la signature, sans jongler entre cinq outils." />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <Reveal as="li" key={f.id} delay={(i % 3) * 80}>
              <FeatureCard icon={f.icon} title={f.title} text={f.short} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Link to="/fonctionnalites" className={buttonClass('secondary', 'lg', 'group')}>
            Découvrir Paysapro AI
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
