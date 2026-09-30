import { Link } from 'react-router';
import { Play } from 'lucide-react';
import { FOOTER_NAV } from '../data/navigation';
import { CONTACT, SITE } from '../config/marketing';
import { AppCta } from './AppLink';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { BetaBadge, Container } from './ui';

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Link to="/" aria-label="Paysapro AI — accueil" className="inline-block rounded-lg">
              <Logo tone="light" />
            </Link>
            <p className="mt-4 text-white/70">{SITE.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BetaBadge tone="light" />
              <span className="text-sm text-white/60">Accès bêta gratuit</span>
            </div>
            <div className="mt-6">
              <AppCta location="footer" variant="light" size="md">
                Essayer Paysapro AI
              </AppCta>
            </div>
          </div>

          <nav aria-label="Pied de page" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h2 className="font-sans text-sm font-semibold tracking-normal text-white">{col.title}</h2>
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="inline-block py-1.5 text-[0.93rem] text-white/65 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 grid gap-6 rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Recevoir les nouveautés Paysapro AI</h2>
            <p className="mt-1 text-sm text-white/65">Les nouvelles fonctionnalités de la bêta, directement dans votre boîte mail.</p>
          </div>
          <NewsletterForm tone="light" />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Paysapro AI. Tous droits réservés.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            )}
            {CONTACT.socials.map((s) => (
              <a key={s.url} href={s.url} className="inline-flex items-center gap-1.5 hover:text-white" rel="noopener noreferrer" target="_blank">
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                {s.label}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            ))}
            <span>Conçu pour les professionnels du paysage.</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
