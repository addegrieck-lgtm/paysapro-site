import { Check } from 'lucide-react';
import { QuoteMockup } from '../components/mockups/QuoteMockup';
import { Reveal } from '../components/Reveal';
import { Container, Eyebrow, Section } from '../components/ui';

const INCLUDED = ['Logo entreprise', 'Coordonnées', 'Client', 'Chantier', 'Prestations', 'Quantités', 'Prix', 'TVA', 'Total', 'Conditions', 'Acompte', 'Signature'];

export function QuoteSection() {
  return (
    <Section labelledBy="quote-title" className="bg-white">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <Eyebrow>Devis professionnel</Eyebrow>
          <h2 id="quote-title" className="mt-4 font-display text-[2.1rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
            Un devis qui donne confiance.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Toutes les informations attendues par votre client, présentées clairement. <strong className="font-semibold text-ink">Votre devis reste à votre image.</strong>
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
            {INCLUDED.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[0.97rem] text-ink">
                <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative mx-auto max-w-lg">
            <div className="absolute -inset-6 -z-0 rounded-[2.5rem] bg-mint/60 blur-2xl" aria-hidden="true" />
            <QuoteMockup className="relative" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
