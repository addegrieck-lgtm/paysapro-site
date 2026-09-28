import { LEGAL_DOCS, type LegalDocId } from '../data/legal';
import { usePageMeta } from '../components/usePageMeta';
import { Container } from '../components/ui';

export default function LegalPage({ doc }: { doc: LegalDocId }) {
  const d = LEGAL_DOCS[doc];
  usePageMeta(d.path);
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{d.title}</h1>
      <p className="mt-3 text-sm text-muted">Dernière mise à jour : {d.updated}</p>
      <div className="mt-10 space-y-10">
        {d.sections.map((s) => (
          <section key={s.heading} aria-label={s.heading}>
            <h2 className="font-display text-xl font-extrabold text-ink">{s.heading}</h2>
            <div className="mt-3 space-y-2 leading-relaxed text-muted">{s.body}</div>
          </section>
        ))}
      </div>
    </Container>
  );
}
