import { Info } from 'lucide-react';
import { CatalogMockup } from '../components/mockups/CatalogMockup';
import { Reveal } from '../components/Reveal';
import { Container, Eyebrow, Section } from '../components/ui';
import { MICRO_COPY } from '../config/marketing';

export function CatalogSection() {
  return (
    <Section labelledBy="catalog-title">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <Reveal className="order-2 lg:order-1">
          <CatalogMockup className="mx-auto max-w-md" />
          <p className="mx-auto mt-4 flex max-w-md items-start gap-2 text-sm text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            Les tarifs présentés sont fictifs et peuvent être entièrement personnalisés.
          </p>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <Eyebrow>{MICRO_COPY.prices}</Eyebrow>
          <h2 id="catalog-title" className="mt-4 font-display text-[2.1rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
            Vos prix. Votre métier. Votre façon de travailler.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Chaque entreprise travaille différemment. Paysapro AI vous permet de construire votre propre catalogue de prestations et de tarifs.
          </p>
          <ul className="mt-8 grid gap-3 text-ink sm:grid-cols-2">
            {['Prix au m², au ml, à l’unité ou à l’heure', 'Coûts matériaux et main-d’œuvre', 'Marge maîtrisée ligne par ligne', 'Réutilisé sur chaque devis'].map((t) => (
              <li key={t} className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-[0.95rem] font-medium ring-1 ring-line">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
