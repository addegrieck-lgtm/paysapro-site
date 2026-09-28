import { SOLUTION_STEPS } from '../data/content';
import { Workflow } from '../components/Workflow';
import { AppCta } from '../components/AppLink';
import { Container, Section, SectionHeading } from '../components/ui';

export function SolutionSection() {
  return (
    <Section id="comment-ca-marche" labelledBy="solution-title">
      <Container>
        <SectionHeading
          id="solution-title"
          eyebrow="Comment ça marche"
          title="Un seul outil pour passer du chantier au devis."
          intro="Cinq étapes, dans l’ordre où vous travaillez déjà."
        />
        <div className="mt-16">
          <Workflow steps={SOLUTION_STEPS} />
        </div>
        <div className="mt-14 flex justify-center">
          <AppCta location="workflow" variant="primary">
            Tester Paysapro AI
          </AppCta>
        </div>
      </Container>
    </Section>
  );
}
