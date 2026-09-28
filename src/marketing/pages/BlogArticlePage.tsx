import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { publishedArticles } from '../data/blog';
import { usePageMeta } from '../components/usePageMeta';
import { AppCta } from '../components/AppLink';
import { Container } from '../components/ui';
import { MARKETING_CONFIG } from '../config/marketing';
import NotFoundPage from './NotFoundPage';

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = MARKETING_CONFIG.showBlog ? publishedArticles().find((a) => a.slug === slug) : undefined;
  if (!article) return <NotFoundPage />;
  return <Article article={article} />;
}

function Article({ article }: { article: NonNullable<ReturnType<typeof publishedArticles>[number]> }) {
  usePageMeta(`/blog/${article.slug}`, { title: `${article.title} | Paysapro AI`, description: article.excerpt });
  return (
    <article>
      <Container className="max-w-3xl py-12 sm:py-20">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Blog
        </Link>
        <h1 className="mt-6 font-display text-4xl leading-tight font-extrabold text-ink sm:text-5xl">{article.title}</h1>
        {article.publishedAt && (
          <p className="mt-3 text-sm text-muted">
            Publié le <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</time>
          </p>
        )}
        <div className="mt-10 space-y-8 text-lg leading-relaxed text-ink">
          {article.body?.map((block, i) => (
            <section key={i}>
              {block.heading && <h2 className="mb-3 font-display text-2xl font-extrabold">{block.heading}</h2>}
              {block.paragraphs.map((p, j) => (
                <p key={j} className="mb-4">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <div className="mt-14 rounded-3xl bg-mint p-8 text-center">
          <p className="font-display text-2xl font-extrabold text-forest">Préparez vos devis plus sereinement.</p>
          <div className="mt-5 flex justify-center">
            <AppCta location={`blog_${article.slug}`}>Essayer Paysapro AI</AppCta>
          </div>
        </div>
      </Container>
    </article>
  );
}
