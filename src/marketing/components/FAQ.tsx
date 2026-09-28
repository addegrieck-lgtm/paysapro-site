import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import type { FaqItem } from '../data/faq';
import { useAnalytics } from '../analytics/AnalyticsProvider';

/** FAQ accordéon accessible (boutons aria-expanded / régions), grandes zones tactiles. */
export function FAQ({ items, headingLevel = 3 }: { items: FaqItem[]; headingLevel?: 2 | 3 }) {
  const [open, setOpen] = useState<string | null>(null);
  const { trackEvent } = useAnalytics();
  const uid = useId();
  const H = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${uid}-${item.id}-q`;
        const panelId = `${uid}-${item.id}-a`;
        return (
          <div key={item.id}>
            <H className="m-0 font-sans text-base tracking-normal">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpen(isOpen ? null : item.id);
                  if (!isOpen) trackEvent('faq_opened', { question: item.id });
                }}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink transition-colors hover:bg-cream/60 sm:px-7 sm:text-[1.05rem]"
              >
                <span>{item.question}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                    isOpen ? 'rotate-45 bg-brand text-white' : 'bg-mint text-forest'
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-6 text-[0.98rem] leading-relaxed text-muted sm:px-7"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
