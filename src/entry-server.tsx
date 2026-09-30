/**
 * Entrée « serveur » utilisée UNIQUEMENT au build (scripts/postbuild.mjs) pour pré-rendre chaque page
 * en HTML statique : Google et les autres moteurs lisent le contenu sans exécuter JavaScript.
 */
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import { AnalyticsProvider } from './marketing/analytics/AnalyticsProvider';
import { MarketingRoutes } from './marketing/routes';
import pages from './marketing/config/pages.json';
import { FAQ } from './marketing/data/faq';
import { publishedArticles } from './marketing/data/blog';
import { MARKETING_CONFIG } from './marketing/config/marketing';

const noop = { name: 'none', requiresConsent: false, track: () => {} };

/** HTML de l'application pour un chemin donné (ex. « /tarifs »). Attend les pages chargées à la demande. */
export async function render(path: string): Promise<string> {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const { prelude } = await prerender(
    <StaticRouter location={base + path} basename={base || '/'}>
      <AnalyticsProvider adapter={noop}>
        <MarketingRoutes />
      </AnalyticsProvider>
    </StaticRouter>,
  );
  return await new Response(prelude).text();
}

export interface SeoPage {
  path: string;
  title: string;
  description: string;
  priority: string;
  /** données structurées propres à la page (schema.org) */
  jsonLd: (siteUrl: string) => object[];
}

const crumbs = (siteUrl: string, items: [name: string, path: string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl + path })),
});

/** Toutes les pages à pré-rendre et à déclarer dans le sitemap. */
export function seoPages(): SeoPage[] {
  const list: SeoPage[] = Object.entries(pages as Record<string, { title: string; description: string; priority: string }>).map(([path, meta]) => ({
    path,
    ...meta,
    jsonLd: (siteUrl) => {
      const out: object[] = [];
      if (path !== '/') out.push(crumbs(siteUrl, [['Accueil', '/'], [meta.title.split(/ [—|] /)[0]!, path]]));
      if (path === '/faq') {
        out.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
        });
      }
      return out;
    },
  }));

  if (MARKETING_CONFIG.showBlog) {
    for (const a of publishedArticles()) {
      const path = `/blog/${a.slug}`;
      list.push({
        path,
        title: `${a.title} | Paysapro AI`,
        description: a.excerpt,
        priority: '0.7',
        jsonLd: (siteUrl) => [
          crumbs(siteUrl, [['Accueil', '/'], ['Blog', '/blog'], [a.title, path]]),
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: a.title,
            description: a.excerpt,
            datePublished: a.publishedAt,
            dateModified: a.publishedAt,
            inLanguage: 'fr-FR',
            mainEntityOfPage: siteUrl + path,
            image: `${siteUrl}/og-image.png`,
            author: { '@type': 'Organization', name: 'Paysapro AI', url: `${siteUrl}/` },
            publisher: { '@id': `${siteUrl}/#organization` },
          },
        ],
      });
    }
  }
  return list;
}
