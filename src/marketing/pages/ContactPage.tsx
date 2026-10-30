import { Mail, Phone, Play, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { AppCta } from '../components/AppLink';
import { Container } from '../components/ui';
import { CONTACT } from '../config/marketing';
import { useAnalytics } from '../analytics/AnalyticsProvider';

/** Les demandes les plus fréquentes, avec la page qui y répond déjà. */
const SHORTCUTS = [
  {
    title: 'Vous découvrez Paysapro AI',
    text: 'Le parcours complet, de la visite du chantier au devis signé, est décrit étape par étape. L’espace de démonstration permet aussi de tout essayer avec des données fictives.',
    link: { label: 'Comment ça marche', to: '/comment-ca-marche' },
  },
  {
    title: 'Une question sur les tarifs',
    text: 'Les trois offres, l’essai gratuit de 15 jours sans carte bancaire et ce qui se passe à la fin de l’essai sont détaillés sur la page des tarifs.',
    link: { label: 'Voir les tarifs', to: '/tarifs' },
  },
  {
    title: 'Vous utilisez déjà l’application',
    text: 'Logo, catalogue, signature du client, équipe, attestation de services à la personne : les réponses pratiques sont regroupées dans le centre d’aide.',
    link: { label: 'Centre d’aide', to: '/aide' },
  },
  {
    title: 'Vos données personnelles',
    text: 'Ce que nous collectons, pourquoi, combien de temps nous le conservons et comment exercer vos droits d’accès, de rectification ou de suppression.',
    link: { label: 'Politique de confidentialité', to: '/confidentialite' },
  },
];

export default function ContactPage() {
  usePageMeta('/contact');
  const [params] = useSearchParams();
  const topic = params.get('sujet') ?? undefined;
  const { trackEvent } = useAnalytics();

  return (
    <>
      <PageHeader eyebrow="Contact" title="Une question ? Parlons-en." intro="Une question sur Paysapro AI, un besoin particulier, un retour sur l’outil : écrivez-nous." />
      <Container className="grid gap-8 pb-24 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10">
          <ContactForm topic={topic} />
        </div>
        <aside className="space-y-4">
          {(CONTACT.email || CONTACT.phone || CONTACT.socials.length > 0) && (
            <div className="rounded-[2rem] bg-white p-7 ring-1 ring-line">
              <h2 className="font-display text-lg font-extrabold text-ink">Nous joindre</h2>
              <ul className="mt-4 space-y-3">
                {CONTACT.email && (
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      onClick={() => trackEvent('contact_clicked', { location: 'contact_email' })}
                      className="flex items-center gap-3 font-semibold text-ink hover:text-brand"
                    >
                      <Mail className="h-5 w-5 text-brand" aria-hidden="true" /> {CONTACT.email}
                    </a>
                  </li>
                )}
                {CONTACT.phone && (
                  <li>
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                      onClick={() => trackEvent('contact_clicked', { location: 'contact_phone' })}
                      className="flex items-center gap-3 font-semibold text-ink hover:text-brand"
                    >
                      <Phone className="h-5 w-5 text-brand" aria-hidden="true" /> {CONTACT.phone}
                    </a>
                  </li>
                )}
                {CONTACT.socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-ink hover:text-brand">
                      <Play className="h-5 w-5 text-brand" aria-hidden="true" /> Notre chaîne {s.label}
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-[2rem] bg-forest p-7 text-white">
            <Sparkles className="h-6 w-6 text-leaf" aria-hidden="true" />
            <h2 className="mt-3 font-display text-lg font-extrabold">Le plus simple : essayer</h2>
            <p className="mt-2 text-white/75">L’essai est gratuit pendant 15 jours, sans carte bancaire ni engagement. Vous pouvez commencer tout de suite depuis votre téléphone.</p>
            <div className="mt-5">
              <AppCta location="contact_aside" variant="light" size="md">
                Créer mon compte
              </AppCta>
            </div>
          </div>
        </aside>
      </Container>

      <Container className="pb-24">
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Avant de nous écrire</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Votre réponse est peut-être déjà en ligne. Pour tout le reste, une démonstration, un besoin propre à votre entreprise, un problème dans l’application ou une idée
          d’amélioration, le formulaire ci-dessus est le bon chemin : précisez votre métier et la taille de votre équipe, nous répondrons plus précisément.
        </p>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {SHORTCUTS.map((s) => (
            <li key={s.link.to} className="rounded-3xl bg-white p-7 ring-1 ring-line">
              <h3 className="text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              <Link to={s.link.to} className="mt-4 inline-block font-semibold text-brand hover:underline">
                {s.link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
