import { BookOpen, LifeBuoy, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { IconTile } from '../components/FeatureCard';
import { FAQ } from '../components/FAQ';
import { Container } from '../components/ui';
import { HELP_FAQ, HELP_STEPS } from '../data/help';

const LINKS = [
  { icon: BookOpen, title: 'Questions fréquentes', text: 'Les réponses aux questions les plus courantes.', to: '/faq' },
  { icon: LifeBuoy, title: 'Comment ça marche', text: 'Le parcours complet, étape par étape.', to: '/comment-ca-marche' },
  { icon: MessageCircle, title: 'Nous contacter', text: 'Une question précise ? Écrivez-nous.', to: '/contact' },
];

export default function HelpPage() {
  usePageMeta('/aide');
  return (
    <>
      <PageHeader eyebrow="Aide" title="Comment pouvons-nous vous aider ?" intro="Les premiers pas pour bien démarrer, les réponses aux questions pratiques et les meilleurs points de départ." />
      <Container className="pb-16">
        <ul className="grid gap-5 md:grid-cols-3">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="block h-full rounded-3xl bg-white p-7 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-card">
                <IconTile icon={l.icon} />
                <h2 className="mt-5 text-lg font-bold text-ink">{l.title}</h2>
                <p className="mt-2 text-muted">{l.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="max-w-3xl pb-16">
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Bien démarrer en cinq étapes</h2>
        <ol className="mt-6 space-y-5">
          {HELP_STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint font-bold text-forest" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-ink">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="max-w-3xl pb-24">
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Questions pratiques</h2>
        <p className="mt-2 text-muted">
          Une question sur l’offre ou les tarifs ? Consultez la{' '}
          <Link to="/faq" className="font-semibold text-brand hover:underline">
            FAQ
          </Link>
          . Vous ne trouvez pas votre réponse ?{' '}
          <Link to="/contact" className="font-semibold text-brand hover:underline">
            Écrivez-nous
          </Link>
          .
        </p>
        <div className="mt-6">
          <FAQ items={HELP_FAQ} />
        </div>
      </Container>
    </>
  );
}
