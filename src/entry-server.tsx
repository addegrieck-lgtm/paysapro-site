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
import { FEATURES } from './marketing/data/features';
import { LANDINGS } from './marketing/data/landings';
import { TOOLS } from './marketing/data/tools';
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
  /** page exclue de l'index Google et du sitemap */
  noindex?: boolean;
  /** données structurées propres à la page (schema.org) */
  jsonLd: (siteUrl: string) => object[];
}

type Crumb = [name: string, path: string];

const crumbs = (siteUrl: string, items: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl + path })),
});

const faqPage = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
});

/** Fiche logiciel : uniquement sur l'accueil. Aucune note ni avis inventés. */
const softwareApplication = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${siteUrl}/#software`,
  name: 'Paysapro AI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Logiciel de devis pour paysagistes',
  operatingSystem: 'Web, iOS, Android',
  inLanguage: 'fr-FR',
  description: 'Logiciel de devis et de gestion de chantiers pour paysagistes : photos du chantier, métrés, catalogue tarifaire, devis professionnels et signature client.',
  url: `${siteUrl}/`,
  image: `${siteUrl}/og-image.png`,
  featureList: FEATURES.map((f) => f.title),
  audience: { '@type': 'BusinessAudience', audienceType: 'Paysagistes et entreprises d’aménagement extérieur' },
  publisher: { '@id': `${siteUrl}/#organization` },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: 'Accès gratuit pendant la phase bêta' },
});

/** Toutes les pages à pré-rendre. Celles marquées noindex sont exclues du sitemap. */
export function seoPages(): SeoPage[] {
  const landingFaq = new Map(LANDINGS.map((l) => [l.path, l.faq]));
  const toolPaths = new Map(TOOLS.map((t) => [t.path, t]));

  const list: SeoPage[] = Object.entries(pages as Record<string, { title: string; description: string; priority: string; noindex?: boolean }>).map(
    ([path, meta]) => ({
      path,
      ...meta,
      jsonLd: (siteUrl) => {
        const out: object[] = [];
        const label = meta.title.split(/ [—|:] | : /)[0]!;
        if (path === '/') out.push(softwareApplication(siteUrl));
        else if (path.startsWith('/outils/')) out.push(crumbs(siteUrl, [['Accueil', '/'], ['Outils', '/outils'], [toolPaths.get(path)?.name ?? label, path]]));
        else out.push(crumbs(siteUrl, [['Accueil', '/'], [label, path]]));

        if (path === '/faq') out.push(faqPage(FAQ));
        const lf = landingFaq.get(path);
        if (lf) out.push(faqPage(lf));

        const tool = toolPaths.get(path);
        if (tool) {
          out.push({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: tool.h1,
            description: meta.description,
            url: siteUrl + path,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            inLanguage: 'fr-FR',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            publisher: { '@id': `${siteUrl}/#organization` },
          });
        }
        return out;
      },
    }),
  );

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
            dateModified: a.updatedAt ?? a.publishedAt,
            inLanguage: 'fr-FR',
            mainEntityOfPage: siteUrl + path,
            image: `${siteUrl}/og-image.png`,
            keywords: a.keywords.join(', '),
            author: { '@type': 'Organization', name: 'Paysapro AI', url: `${siteUrl}/` },
            publisher: { '@id': `${siteUrl}/#organization` },
          },
        ],
      });
    }
  }
  return list;
}
