import { AppCta } from '../components/AppLink';
import { DemoCta } from '../components/DemoCta';
import { LogoMark } from '../components/Logo';
import { ButtonLink, Container } from '../components/ui';

export function FinalCTA({
  title = 'Passez moins de temps à préparer vos devis.',
  subtitle = 'Essayez Paysapro AI et découvrez une nouvelle façon de gérer vos chantiers.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="bg-grid-dark relative overflow-hidden rounded-[2rem] bg-forest px-5 py-20 text-center text-white sm:rounded-[2.5rem] sm:py-28">
        <Container className="relative">
          <LogoMark className="mx-auto h-14 w-14" variant="light" />
          <h2 id="final-cta-title" className="mx-auto mt-8 max-w-4xl font-display text-[2.4rem] leading-[1.02] font-extrabold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75 sm:text-xl">{subtitle}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <AppCta location="final_cta" variant="light">
              Commencer gratuitement
            </AppCta>
            <ButtonLink to="/comment-ca-marche" variant="outline-light" size="lg">
              Voir comment ça marche
            </ButtonLink>
            <DemoCta location="final_cta" variant="outline-light" />
          </div>
          <p className="mt-6 text-sm text-white/55">Accès bêta gratuit · Aucun engagement · Accessible sur mobile</p>
        </Container>
      </div>
    </section>
  );
}
