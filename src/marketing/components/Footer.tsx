import { Link } from 'react-router';
import { Play } from 'lucide-react';
import { FOOTER_NAV } from '../data/navigation';
import { CONTACT, SITE } from '../config/marketing';
import { AppCta } from './AppLink';
import { Logo } from './Logo';
import { useSiteBrand } from './useSiteBrand';
import { NewsletterForm } from './NewsletterForm';
import { BetaBadge, Container } from './ui';

export function Footer() {
  const brand = useSiteBrand();
  return (
    <footer className="bg-forest text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Link to="/" className="inline-block rounded-lg">
              <Logo tone="light" brand={brand} />
            </Link>
            <p className="mt-4 text-white/70">{brand === 'batipro' ? 'Devis, chantiers et factures pour les artisans du BTP.' : SITE.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BetaBadge tone="light" />
              <span className="text-sm text-white/60">15 jours d’essai, sans carte bancaire</span>
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
            <p className="mt-1 text-sm text-white/65">Les nouvelles fonctionnalités, directement dans votre boîte mail.</p>
          </div>
          <NewsletterForm tone="light" />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p>© {new Date().getFullYear()} Paysapro AI. Tous droits réservés.</p>
            {/* Badge demandé par l'annuaire FranceSaaS en échange de la fiche gratuite : garder ce lien tel quel. */}
            <a href="https://francesaas.fr/saas/paysapro-ai" target="_blank" rel="noopener" title="Profil du SaaS Paysapro AI sur FranceSaaS.fr" className="inline-block shrink-0">
              <img src="https://francesaas.fr/badge-francesaas.svg" alt="Badge FranceSaaS" width="200" height="44" loading="lazy" style={{ height: 'auto' }} />
            </a>
          </div>
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
            <span>{brand === 'batipro' ? 'Conçu pour les artisans du bâtiment.' : 'Conçu pour les professionnels du paysage.'}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
