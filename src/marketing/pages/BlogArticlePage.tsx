import { Link, useParams } from 'react-router';
import { ArrowRight, ChevronRight, Clock } from 'lucide-react';
import { publishedArticles, type BlogArticle } from '../data/blog';
import { usePageMeta } from '../components/usePageMeta';
import { AppCta } from '../components/AppLink';
import { Container } from '../components/ui';
import { MARKETING_CONFIG } from '../config/marketing';
import NotFoundPage from './NotFoundPage';

const dateFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = MARKETING_CONFIG.showBlog ? publishedArticles().find((a) => a.slug === slug) : undefined;
  if (!article) return <NotFoundPage />;
  return <Article key={article.slug} article={article} />;
}

function Article({ article }: { article: BlogArticle }) {
  usePageMeta(`/blog/${article.slug}`, { title: `${article.title} | Paysapro AI`, description: article.excerpt });
  const others = publishedArticles().filter((a) => a.slug !== article.slug);

  return (
    <article>
      <Container className="max-w-3xl py-10 sm:py-16">
        <nav aria-label="Fil d’Ariane" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-ink">
                Accueil
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link to="/blog" className="hover:text-ink">
                Blog
              </Link>
            </li>
            <li aria-current="page" className="flex items-center gap-1.5 text-ink">
              <ChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              {article.title}
            </li>
          </ol>
        </nav>

        <h1 className="mt-6 font-display text-4xl leading-[1.08] font-extrabold tracking-[-0.03em] text-ink sm:text-5xl">{article.title}</h1>
        <p className="mt-4 text-xl leading-relaxed text-muted">{article.excerpt}</p>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          {article.publishedAt && (
            <span>
              Publié le <time dateTime={article.publishedAt}>{dateFmt.format(new Date(article.publishedAt))}</time>
            </span>
          )}
          {article.updatedAt && (
            <span>
              Mis à jour le <time dateTime={article.updatedAt}>{dateFmt.format(new Date(article.updatedAt))}</time>
            </span>
          )}
          {article.readingMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readingMinutes} min de lecture
            </span>
          )}
        </p>

        <div className="mt-10 space-y-8 text-[1.08rem] leading-[1.75] text-ink">
          {article.body?.map((block, i) => (
            <section key={i} className="space-y-4">
              {block.heading && <h2 className="pt-2 font-display text-2xl font-extrabold sm:text-[1.7rem]">{block.heading}</h2>}
              {block.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
              {block.list && (
                <ul className="list-disc space-y-2 pl-6 marker:text-brand">
                  {block.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="mt-14 rounded-3xl bg-forest p-8 text-center text-white">
          <p className="font-display text-2xl font-extrabold">Du chantier au devis, en quelques minutes.</p>
          <p className="mx-auto mt-2 max-w-md text-white/75">Paysapro AI est le logiciel de devis pensé pour les paysagistes. Accès bêta gratuit.</p>
          <div className="mt-6 flex justify-center">
            <AppCta location={`blog_${article.slug}`} variant="light">
              Essayer Paysapro AI
            </AppCta>
          </div>
        </aside>

        {others.length > 0 && (
          <nav aria-label="Autres articles" className="mt-14">
            <h2 className="font-display text-xl font-extrabold text-ink">À lire aussi</h2>
            <ul className="mt-4 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
              {[...(article.links ?? []), ...others.map((a) => ({ label: a.title, to: `/blog/${a.slug}` }))].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group flex items-center justify-between gap-4 p-5 hover:bg-cream/60">
                    <span className="font-semibold text-ink">{l.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </article>
  );
}
