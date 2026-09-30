import { useId, useState } from 'react';
import { Check, Code2, Copy } from 'lucide-react';
import type { Tool } from '../../data/tools';
import { SITE } from '../../config/marketing';

/** Code HTML à copier pour afficher le calculateur sur un autre site (avec un lien vers Paysapro AI). */
export function embedCode(tool: Tool, siteUrl = SITE.url): string {
  const slug = tool.path.replace('/outils/', '');
  return [
    `<iframe src="${siteUrl}/integrer/${slug}" title="${tool.name}" width="100%" height="620" style="border:0;max-width:760px" loading="lazy"></iframe>`,
    `<p><a href="${siteUrl}${tool.path}">${tool.name}</a> proposé par <a href="${siteUrl}/">Paysapro AI</a>, logiciel de devis pour paysagistes.</p>`,
  ].join('\n');
}

export function EmbedSnippet({ tool }: { tool: Tool }) {
  const id = useId();
  const [copied, setCopied] = useState(false);
  const code = embedCode(tool);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* presse-papiers indisponible : le texte reste sélectionnable à la main */
    }
  }

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
      <h2 id={`${id}-title`} className="flex items-center gap-2 font-display text-xl font-extrabold text-ink">
        <Code2 className="h-5 w-5 text-brand" aria-hidden="true" /> Intégrer ce calculateur sur votre site
      </h2>
      <p className="mt-2 text-muted">Gratuit et libre d’utilisation. Copiez ce code dans une page de votre site : le calculateur s’y affiche tel quel.</p>
      <label htmlFor={`${id}-code`} className="sr-only">
        Code d’intégration
      </label>
      <textarea
        id={`${id}-code`}
        readOnly
        rows={5}
        value={code}
        onFocus={(e) => e.currentTarget.select()}
        className="mt-4 block w-full resize-none rounded-2xl bg-cream p-4 font-mono text-[0.8rem] leading-relaxed text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-brand"
      />
      <button
        type="button"
        onClick={copy}
        className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-forest"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? 'Code copié' : 'Copier le code'}</span>
      </button>
    </section>
  );
}
