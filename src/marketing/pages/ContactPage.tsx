import { Mail, Phone, Play, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { AppCta } from '../components/AppLink';
import { Container } from '../components/ui';
import { CONTACT } from '../config/marketing';
import { useAnalytics } from '../analytics/AnalyticsProvider';

export default function ContactPage() {
  usePageMeta('/contact');
  const [params] = useSearchParams();
  const topic = params.get('sujet') ?? undefined;
  const { trackEvent } = useAnalytics();

  return (
    <>
      <PageHeader eyebrow="Contact" title="Une question ? Parlons-en." intro="Une question sur Paysapro AI, un besoin particulier, un retour sur la bêta : écrivez-nous." />
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
            <p className="mt-2 text-white/75">L’accès bêta est gratuit et sans engagement. Vous pouvez commencer tout de suite depuis votre téléphone.</p>
            <div className="mt-5">
              <AppCta location="contact_aside" variant="light" size="md">
                Créer mon compte
              </AppCta>
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
