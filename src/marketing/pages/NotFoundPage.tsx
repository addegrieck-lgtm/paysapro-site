import { Shovel } from 'lucide-react';
import { usePageMeta } from '../components/usePageMeta';
import { ButtonLink, Container } from '../components/ui';

export default function NotFoundPage() {
  usePageMeta('/404', {
    title: 'Page introuvable | Paysapro AI',
    description: 'Cette page n’existe pas ou a été déplacée.',
    noindex: true,
  });
  return (
    <Container className="flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-mint text-forest">
        <Shovel className="h-10 w-10" aria-hidden="true" strokeWidth={1.6} />
      </span>
      <p className="mt-8 font-display text-sm font-bold tracking-[0.2em] text-brand uppercase">Erreur 404</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight font-extrabold text-ink sm:text-5xl">Cette page s’est perdue sur le chantier.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">Elle a peut-être été déplacée, ou l’adresse contient une petite erreur de métré.</p>
      <div className="mt-9">
        <ButtonLink to="/" size="lg">
          Retour à l’accueil
        </ButtonLink>
      </div>
    </Container>
  );
}
