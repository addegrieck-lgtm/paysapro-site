import { Link } from 'react-router';
import { Play } from 'lucide-react';
import { FOOTER_NAV, LEGAL_NAV } from '../data/navigation';
import { CONTACT, SITE } from '../config/marketing';
import { AppCta } from './AppLink';
import { Logo } from './Logo';
import { useSiteBrand } from './useSiteBrand';
import { NewsletterForm } from './NewsletterForm';
import { Container } from './ui';

/** Pied de page compact : marque et essai, cinq colonnes courtes, newsletter, ligne légale. */
export function Footer() {
  const brand = useSiteBrand();
  return (
    <footer className="bg-forest text-white">
      <Container className="py-12 sm:py-14">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <Link to="/" className="inline-block rounded-lg">
              <Logo tone="light" brand={brand} />
            </Link>
            <p className="mt-3 text-white/70">{brand === 'batipro' ? 'Devis, chantiers et factures pour les artisans du BTP.' : SITE.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <AppCta location="footer" variant="light" size="md">
              Essayer gratuitement
            </AppCta>
            <span className="text-sm text-white/60">15 jours d’essai, sans carte bancaire</span>
          </div>
        </div>

        <nav aria-label="Pied de page" className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h2 className="font-sans text-xs font-bold tracking-[0.14em] text-leaf uppercase">{col.title}</h2>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="inline-block py-1 text-sm text-white/70 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="grid gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 className="font-display text-lg font-bold text-white">Recevoir les nouveautés</h2>
            <p className="text-sm text-white/65">Les nouvelles fonctionnalités, directement dans votre boîte mail.</p>
          </div>
          <NewsletterForm tone="light" />
        </div>

        <div className="mt-8 flex flex-col gap-3 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p>© {new Date().getFullYear()} Paysapro AI. Tous droits réservés.</p>
            {/* Badge demandé par l'annuaire FranceSaaS en échange de la fiche gratuite : garder ce lien tel quel. */}
            <a href="https://francesaas.fr/saas/paysapro-ai" target="_blank" rel="noopener" title="Profil du SaaS Paysapro AI sur FranceSaaS.fr" className="inline-block shrink-0">
              <img src="https://francesaas.fr/badge-francesaas.svg" alt="Badge FranceSaaS" width="200" height="44" loading="lazy" style={{ height: 'auto' }} />
            </a>
          </div>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {LEGAL_NAV.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-white">
                {l.label}
              </Link>
            ))}
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
          </p>
        </div>
      </Container>
    </footer>
  );
}
