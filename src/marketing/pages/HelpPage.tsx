import { BookOpen, LifeBuoy, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { IconTile } from '../components/FeatureCard';
import { Container } from '../components/ui';

const LINKS = [
  { icon: BookOpen, title: 'Questions fréquentes', text: 'Les réponses aux questions les plus courantes.', to: '/faq' },
  { icon: LifeBuoy, title: 'Comment ça marche', text: 'Le parcours complet, étape par étape.', to: '/comment-ca-marche' },
  { icon: MessageCircle, title: 'Nous contacter', text: 'Une question précise ? Écrivez-nous.', to: '/contact' },
];

export default function HelpPage() {
  usePageMeta('/aide');
  return (
    <>
      <PageHeader eyebrow="Aide" title="Comment pouvons-nous vous aider ?" intro="Le centre d’aide complet est en préparation. En attendant, voici les meilleurs points de départ." />
      <Container className="pb-24">
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
    </>
  );
}
