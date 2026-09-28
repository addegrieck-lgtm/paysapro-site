import { Link } from 'react-router';
import { Clock } from 'lucide-react';
import { BLOG_ARTICLES, publishedArticles } from '../data/blog';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { NewsletterForm } from '../components/NewsletterForm';
import { Container } from '../components/ui';
import { MARKETING_CONFIG } from '../config/marketing';

export default function BlogPage() {
  usePageMeta('/blog');
  const published = MARKETING_CONFIG.showBlog ? publishedArticles() : [];
  const upcoming = BLOG_ARTICLES.filter((a) => !published.includes(a));

  return (
    <>
      <PageHeader eyebrow="Blog" title="Conseils pour les paysagistes" intro="Devis, métrés, organisation des chantiers : des articles concrets arrivent bientôt." />
      <Container className="max-w-4xl pb-24">
        {published.length > 0 && (
          <ul className="mb-14 grid gap-5 sm:grid-cols-2">
            {published.map((a) => (
              <li key={a.slug}>
                <Link to={`/blog/${a.slug}`} className="block h-full rounded-3xl bg-white p-7 ring-1 ring-line hover:shadow-card">
                  <h2 className="text-xl font-bold text-ink">{a.title}</h2>
                  <p className="mt-2 text-muted">{a.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <h2 className="font-display text-2xl font-extrabold text-ink">À paraître</h2>
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
          {upcoming.map((a) => (
            <li key={a.slug} className="flex items-start justify-between gap-4 p-6">
              <div>
                <h3 className="font-semibold text-ink">{a.title}</h3>
                <p className="mt-1 text-sm text-muted">{a.excerpt}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-xs font-semibold text-muted">
                <Clock className="h-3 w-3" aria-hidden="true" /> Bientôt
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-12 rounded-3xl bg-mint p-8">
          <h2 className="font-display text-xl font-extrabold text-forest">Être prévenu des nouveaux articles</h2>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </>
  );
}
