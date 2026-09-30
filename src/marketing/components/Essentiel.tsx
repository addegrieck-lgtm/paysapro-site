import { Lightbulb } from 'lucide-react';

/**
 * Encadré « L'essentiel » : quelques phrases qui répondent directement à la question de la page.
 * Utile aux lecteurs pressés, et facile à citer pour les moteurs de recherche et les assistants IA.
 */
export function Essentiel({ items }: { items: string[] }) {
  return (
    <aside aria-labelledby="essentiel-title" className="rounded-3xl bg-mint p-6 sm:p-8">
      <h2 id="essentiel-title" className="flex items-center gap-2 font-sans text-sm font-bold tracking-[0.14em] text-forest uppercase">
        <Lightbulb className="h-4 w-4" aria-hidden="true" /> L’essentiel
      </h2>
      <ul className="mt-4 space-y-2.5 text-[1.02rem] leading-relaxed text-forest">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
