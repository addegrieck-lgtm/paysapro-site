import { ArrowRight, Calculator as CalcIcon, Fence, Layers, Ruler } from 'lucide-react';
import { Link } from 'react-router';
import { TOOLS, toolByPath, type ToolId } from '../data/tools';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { AppCta } from '../components/AppLink';
import { IconTile } from '../components/FeatureCard';
import { Calculator } from '../components/tools/Calculators';
import { Container } from '../components/ui';
import NotFoundPage from './NotFoundPage';

const ICONS: Record<ToolId, typeof Ruler> = { surface: Ruler, volume: Layers, cloture: Fence };

/** Sommaire des outils gratuits. */
export function ToolsIndexPage() {
  usePageMeta('/outils');
  return (
    <>
      <PageHeader
        eyebrow="Outils gratuits"
        title="Calculateurs pour paysagistes"
        intro="Des outils simples pour vos métrés : surfaces, volumes, clôtures. Gratuits, sans inscription, utilisables sur le chantier depuis votre téléphone."
      />
      <Container className="pb-24">
        <ul className="grid gap-5 md:grid-cols-3">
          {TOOLS.map((t) => (
            <li key={t.id}>
              <Link to={t.path} className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-card">
                <IconTile icon={ICONS[t.id]} />
                <h2 className="mt-5 text-xl font-bold text-ink">{t.name}</h2>
                <p className="mt-2 flex-1 text-muted">{t.short}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand">
                  Ouvrir l’outil
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col items-start gap-5 rounded-3xl bg-mint p-8 sm:flex-row sm:items-center">
          <CalcIcon className="h-10 w-10 shrink-0 text-forest" aria-hidden="true" />
          <div className="flex-1">
            <h2 className="font-display text-xl font-extrabold text-forest">Ces calculs, directement dans vos devis</h2>
            <p className="mt-1 text-forest/80">Dans Paysapro AI, les surfaces et quantités calculées sur le chantier alimentent les lignes du devis, avec vos tarifs.</p>
          </div>
          <AppCta location="tools_index" size="md">
            Essayer gratuitement
          </AppCta>
        </div>
      </Container>
    </>
  );
}

export default function ToolPage({ path }: { path: string }) {
  const tool = toolByPath(path);
  usePageMeta(path);
  if (!tool) return <NotFoundPage />;
  return (
    <>
      <PageHeader eyebrow="Outil gratuit" title={tool.h1} intro={tool.intro} />
      <Container className="max-w-5xl pb-16">
        <div className="rounded-[2rem] bg-cream p-5 ring-1 ring-line sm:p-8">
          <Calculator id={tool.id} />
        </div>
      </Container>

      <Container className="max-w-3xl space-y-10 pb-16">
        {tool.method.map((m) => (
          <section key={m.heading}>
            <h2 className="font-display text-2xl font-extrabold text-ink">{m.heading}</h2>
            <div className="mt-3 space-y-3 text-[1.05rem] leading-[1.75] text-muted">
              {m.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {m.list && (
                <ul className="list-disc space-y-1.5 pl-6 text-ink marker:text-brand">
                  {m.list.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        <aside className="rounded-3xl bg-forest p-8 text-center text-white">
          <p className="font-display text-2xl font-extrabold">Passez du métré au devis.</p>
          <p className="mx-auto mt-2 max-w-md text-white/75">Dans Paysapro AI, vos quantités alimentent directement le devis, avec vos prestations et vos prix. Accès bêta gratuit.</p>
          <div className="mt-6 flex justify-center">
            <AppCta location={`tool_${tool.id}`} variant="light">
              Essayer Paysapro AI
            </AppCta>
          </div>
        </aside>

        <nav aria-label="Voir aussi">
          <h2 className="font-display text-xl font-extrabold text-ink">Voir aussi</h2>
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
            {[...tool.related, { label: 'Tous les outils de calcul', to: '/outils' }].map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="group flex items-center justify-between gap-4 p-5 font-semibold text-ink hover:bg-cream/60">
                  {r.label}
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}
