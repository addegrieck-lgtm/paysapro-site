import { ArrowRight, CalendarClock, Check, FileCheck2, FileCode2 } from 'lucide-react';
import { Link } from 'react-router';
import { Reveal } from '../components/Reveal';
import { Container, Eyebrow, Section } from '../components/ui';

// Calendrier officiel de la réforme (entre professionnels, en France).
const TIMELINE = [
  { date: '1er septembre 2026', text: 'Toutes les entreprises doivent pouvoir recevoir des factures électroniques.', past: true },
  { date: '1er septembre 2027', text: 'PME, TPE et micro-entreprises doivent les émettre et transmettre leurs données à l’administration.', past: false },
];

// Ce que fait l'application aujourd'hui : rien de plus que ce qui est développé et vérifié.
const POINTS = [
  'Chaque facture produite au format Factur-X, profil EN 16931',
  'PDF/A-3 contrôlé avec les outils de validation de référence',
  'Acomptes, soldes et avoirs, numérotation continue',
  'Mentions obligatoires, TVA par taux, franchise en base',
];

/** Accueil : la facture électronique obligatoire de 2027, et ce que Paysapro AI fait déjà. */
export function EInvoicingSection() {
  return (
    <Section labelledBy="facture-electronique-title" className="bg-mint-2">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <Eyebrow>Facture électronique</Eyebrow>
          <h2 id="facture-electronique-title" className="mt-4 font-display text-[2.1rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
            Prêt pour la facture électronique obligatoire de 2027.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Au 1er septembre 2027, les factures entre professionnels devront être électroniques, y compris pour les TPE et les micro-entreprises. Avec Paysapro AI, vos factures sont déjà au
            bon format : vous n’aurez pas à changer d’outil.
          </p>

          <ol className="mt-8 space-y-3">
            {TIMELINE.map((t) => (
              <li key={t.date} className={`flex gap-4 rounded-2xl p-4 ${t.past ? 'bg-white/60' : 'bg-white ring-2 ring-brand'}`}>
                <CalendarClock className={`mt-0.5 h-5 w-5 shrink-0 ${t.past ? 'text-muted' : 'text-brand'}`} aria-hidden="true" />
                <span>
                  <span className={`block font-bold ${t.past ? 'text-muted' : 'text-ink'}`}>{t.date}</span>
                  <span className="text-muted">{t.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-ink">{p}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            La transmission passera par une plateforme agréée par l’administration : le raccordement de Paysapro AI est en préparation pour l’échéance de septembre 2027.
          </p>

          <Link
            to="/logiciel-facture-electronique"
            className="mt-8 inline-flex items-center gap-2 font-bold text-brand underline-offset-4 hover:underline"
          >
            Tout savoir sur la facture électronique <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal className="flex justify-center">
          <InvoiceVisual />
        </Reveal>
      </Container>
    </Section>
  );
}

/** Facture illustrée : un PDF lisible, avec les données Factur-X jointes. */
function InvoiceVisual() {
  const lines = [
    ['Tonte et ramassage', '225,00 €'],
    ['Taille de haie, 40 ml', '240,00 €'],
    ['Évacuation des déchets verts', '150,00 €'],
  ];
  return (
    <figure className="w-full max-w-md" aria-label="Exemple de facture au format Factur-X">
      <div className="relative rounded-[1.75rem] bg-white p-6 shadow-float ring-1 ring-line sm:p-7">
        <span className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-xs font-bold text-white">
          <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" /> Factur-X · EN 16931
        </span>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">Facture</p>
            <p className="font-display text-xl font-extrabold text-ink">F2027-0042</p>
          </div>
          <div className="text-right text-xs text-muted">
            <p>Émise le 15/09/2027</p>
            <p>Échéance 15/10/2027</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-cream p-3 text-xs text-muted">
          <p className="font-semibold text-ink">Client : SCI Les Tilleuls</p>
          <p>SIREN 123 456 789</p>
        </div>
        <ul className="mt-4 divide-y divide-line text-sm">
          {lines.map(([label, amount]) => (
            <li key={label} className="flex justify-between gap-3 py-2">
              <span className="text-ink">{label}</span>
              <span className="tabular-nums text-ink">{amount}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-1 border-t border-line pt-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Total HT</dt>
            <dd className="tabular-nums">615,00 €</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">TVA 20 %</dt>
            <dd className="tabular-nums">123,00 €</dd>
          </div>
          <div className="flex justify-between font-bold text-ink">
            <dt>Total TTC</dt>
            <dd className="tabular-nums">738,00 €</dd>
          </div>
        </dl>
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-brand/40 bg-mint-2 p-3">
          <FileCode2 className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
          <div className="text-xs">
            <p className="font-bold text-ink">factur-x.xml joint au PDF</p>
            <p className="text-muted">Montants, TVA, SIREN, échéance : lisibles par les logiciels</p>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">Facture d’exemple : un PDF lisible par votre client, qui contient aussi les données structurées de la facture.</figcaption>
    </figure>
  );
}
