import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { publishedArticles } from '../data/blog';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading } from '../components/ui';
import { MARKETING_CONFIG } from '../config/marketing';

/** Derniers articles : maillage interne vers le blog (affiché seulement s'il y a des articles publiés). */
export function BlogTeaserSection() {
  const articles = MARKETING_CONFIG.showBlog ? publishedArticles().slice(0, 3) : [];
  if (articles.length === 0) return null;
  return (
    <Section labelledBy="conseils-title">
      <Container>
        <SectionHeading id="conseils-title" eyebrow="Conseils" title="Chiffrer juste, ça s’apprend." intro="Des méthodes concrètes pour vos devis de paysagiste." />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 80}>
              <Link
                to={`/blog/${a.slug}`}
                className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-card motion-reduce:hover:translate-y-0"
              >
                <h3 className="text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{a.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Lire l’article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
