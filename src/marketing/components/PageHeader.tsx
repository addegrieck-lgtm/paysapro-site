import type { ReactNode } from 'react';
import { Container, Eyebrow } from './ui';

/** En-tête des pages intérieures : un seul h1 par page. */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow?: ReactNode; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden">
      <div className="bg-grid-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" aria-hidden="true" />
      <Container className="pt-12 pb-14 text-center sm:pt-20 sm:pb-20">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-[2.5rem] leading-[1.03] font-extrabold tracking-[-0.04em] text-ink sm:text-6xl">{title}</h1>
        {intro && <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>}
        {children && <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">{children}</div>}
      </Container>
    </header>
  );
}
