import type { IconText } from '../data/content';
import { Reveal } from './Reveal';

/**
 * Workflow numéroté : horizontal sur grand écran (ligne de progression animée),
 * vertical sur mobile.
 */
export function Workflow({ steps, tone = 'light' }: { steps: IconText[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  return (
    <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-5">
      {/* ligne de liaison (desktop) */}
      <svg className="pointer-events-none absolute top-[2.35rem] right-[10%] left-[10%] hidden h-2 lg:block" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 2">
        <line x1="0" y1="1" x2="100" y2="1" stroke={dark ? 'rgb(143 207 159 / .5)' : 'rgb(47 125 85 / .45)'} strokeWidth="2" vectorEffect="non-scaling-stroke" className="flow-line" />
      </svg>
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 90} className="relative">
          {/* ligne de liaison (mobile) */}
          {i < steps.length - 1 && (
            <span className={`absolute top-16 bottom-[-1rem] left-[2.35rem] w-px lg:hidden ${dark ? 'bg-white/15' : 'bg-brand/25'}`} aria-hidden="true" />
          )}
          <div className="flex gap-4 lg:flex-col lg:items-center lg:text-center">
            <div
              className={`relative z-10 flex h-[4.7rem] w-[4.7rem] shrink-0 flex-col items-center justify-center rounded-3xl ${
                dark ? 'bg-forest-2 text-leaf ring-1 ring-white/10' : 'bg-white text-brand shadow-card ring-1 ring-line'
              }`}
            >
              <s.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
              <span className={`mt-1 text-[0.7rem] font-bold tabular-nums ${dark ? 'text-white/60' : 'text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="pt-1 lg:pt-3">
              <h3 className={`text-[1.05rem] font-bold ${dark ? 'text-white' : 'text-ink'}`}>{s.title}</h3>
              <p className={`mt-1.5 text-[0.95rem] leading-relaxed ${dark ? 'text-white/70' : 'text-muted'}`}>{s.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
