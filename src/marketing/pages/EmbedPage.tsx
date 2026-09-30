import { useParams } from 'react-router';
import { TOOLS } from '../data/tools';
import { usePageMeta } from '../components/usePageMeta';
import { Calculator } from '../components/tools/Calculators';
import { LogoMark } from '../components/Logo';
import { SITE } from '../config/marketing';

/**
 * Version intégrable d'un calculateur (affichée dans une <iframe> sur d'autres sites).
 * Sans menu ni pied de page ; non indexée (la page officielle est /outils/…).
 */
export default function EmbedPage() {
  const { tool: slug } = useParams();
  const tool = TOOLS.find((t) => t.path === `/outils/${slug}`);
  usePageMeta(`/integrer/${slug}`, { title: `${tool?.name ?? 'Calculateur'} | Paysapro AI`, description: tool?.short, noindex: true });
  if (!tool) return <p className="p-6 text-muted">Calculateur introuvable.</p>;

  const url = `${SITE.url}${tool.path}`;
  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 font-display text-xl font-extrabold text-ink">{tool.name}</h1>
      <Calculator id={tool.id} />
      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
        <LogoMark className="h-5 w-5" />
        <span>
          Calculateur proposé par{' '}
          <a href={url} target="_blank" rel="noopener" className="font-semibold text-brand underline underline-offset-2">
            Paysapro AI
          </a>
          , logiciel de devis pour paysagistes
        </span>
      </p>
    </main>
  );
}
