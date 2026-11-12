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
import { TOOLS, TOOLS_FAQ } from './marketing/data/tools';
import { HELP_FAQ } from './marketing/data/help';
import { articleSeoTitle, publishedArticles } from './marketing/data/blog';
import { MARKETING_CONFIG } from './marketing/config/marketing';
import { FUTURE_PLANS, YEARLY_DISCOUNT_PERCENT } from './marketing/config/pricing';

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
    // Sans limite de taille par bloc : par défaut, React place le contenu d'une page de plus de ~12 Ko APRÈS le
    // pied de page, dans un bloc caché remis en place par JavaScript. Les robots qui n'exécutent pas JavaScript
    // (Bing en partie, robots des assistants IA) voyaient alors le menu et le pied de page avant le contenu.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
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
  /** AAAA-MM-JJ : date réelle de dernière modification (sitemap). Absente si inconnue : jamais la date du build. */
  lastmod?: string;
  /** article de blog : og:type « article » et dates de parution / modification */
  article?: { published: string; modified: string };
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

/** Offres payantes affichées sur /tarifs : source unique des prix du JSON-LD. */
export const PAID_PLANS = FUTURE_PLANS.filter((p): p is typeof p & { price: number } => typeof p.price === 'number' && p.price > 0);
const PAID_PRICES = PAID_PLANS.map((p) => p.price);

/** Fiche logiciel : uniquement sur l'accueil. Aucune note ni avis inventés. */
const softwareApplication = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${siteUrl}/#software`,
  name: 'Paysapro AI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Logiciel de devis pour paysagistes et artisans du bâtiment',
  operatingSystem: 'Web, iOS, Android',
  inLanguage: 'fr-FR',
  description: 'Logiciel de devis et de gestion de chantiers pour paysagistes et artisans du BTP : photos du chantier, métrés, catalogue tarifaire, devis professionnels et signature client.',
  url: `${siteUrl}/`,
  image: `${siteUrl}/og-image.png`,
  featureList: FEATURES.map((f) => f.title),
  audience: { '@type': 'BusinessAudience', audienceType: 'Paysagistes, entreprises d’aménagement extérieur et artisans du bâtiment' },
  publisher: { '@id': `${siteUrl}/#organization` },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: String(Math.min(...PAID_PRICES)),
    highPrice: String(Math.max(...PAID_PRICES)),
    offerCount: PAID_PLANS.length,
    description: `Essai gratuit de 15 jours sans carte bancaire, puis offres ${PAID_PLANS.map((p) => p.name).join(', ').replace(/, ([^,]+)$/, ' et $1')} (prix HT par mois)`,
  },
});

/**
 * Offres détaillées pour /tarifs : mêmes prix que la page, lus dans config/pricing.ts (jamais tapés ici).
 * Même @id que la fiche logiciel de l'accueil : Google relie les deux.
 */
const pricingOffers = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${siteUrl}/#software`,
  name: 'Paysapro AI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  url: `${siteUrl}/`,
  offers: PAID_PLANS.map((p) => ({
    '@type': 'Offer',
    name: `Paysapro AI ${p.name}`,
    // Pas de priceSpecification : Google la refuse pour un SoftwareApplication. « HT par mois » va dans la description.
    description: `${p.price} € HT par mois, sans engagement, après 15 jours d’essai gratuit. ${p.description}`,
    url: `${siteUrl}/tarifs`,
    price: String(p.price),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  })),
});

/** Toutes les pages à pré-rendre. Celles marquées noindex sont exclues du sitemap. */
export function seoPages(): SeoPage[] {
  const landingFaq = new Map(LANDINGS.map((l) => [l.path, l.faq]));
  const toolPaths = new Map(TOOLS.map((t) => [t.path, t]));

  const articles = MARKETING_CONFIG.showBlog ? publishedArticles() : [];
  const lastArticleDate = articles.map((a) => a.updatedAt ?? a.publishedAt!).sort().at(-1);

  const list: SeoPage[] = Object.entries(pages as Record<string, { title: string; description: string; priority: string; noindex?: boolean; updated?: string }>).map(
    ([path, { updated, ...meta }]) => ({
      path,
      ...meta,
      lastmod: path === '/blog' ? [updated, lastArticleDate].filter(Boolean).sort().at(-1) : updated,
      jsonLd: (siteUrl) => {
        const out: object[] = [];
        const label = meta.title.split(/ [—|:] | : /)[0]!;
        if (path === '/') out.push(softwareApplication(siteUrl));
        else if (path.startsWith('/outils/')) out.push(crumbs(siteUrl, [['Accueil', '/'], ['Outils', '/outils'], [toolPaths.get(path)?.name ?? label, path]]));
        else out.push(crumbs(siteUrl, [['Accueil', '/'], [label, path]]));

        if (path === '/tarifs') out.push(pricingOffers(siteUrl));
        if (path === '/faq') out.push(faqPage(FAQ));
        if (path === '/aide') out.push(faqPage(HELP_FAQ));
        if (path === '/outils') out.push(faqPage(TOOLS_FAQ));
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

  for (const t of TOOLS) {
    list.push({
      path: t.path.replace('/outils/', '/integrer/'),
      title: `${t.name} | Paysapro AI`,
      description: t.short,
      priority: '0.1',
      noindex: true,
      jsonLd: () => [],
    });
  }

  {
    for (const a of articles) {
      const path = `/blog/${a.slug}`;
      list.push({
        path,
        title: articleSeoTitle(a),
        description: a.excerpt,
        priority: '0.7',
        lastmod: a.updatedAt ?? a.publishedAt,
        article: { published: a.publishedAt!, modified: a.updatedAt ?? a.publishedAt! },
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

/**
 * Présentation de référence de Paysapro AI : même formulation dans llms.txt, llms-full.txt et les fiches externes
 * (docs/PLAN-LIENS.md). À mettre à jour ici quand le produit ou les tarifs changent.
 */
export const REFERENCE =
  'Paysapro AI est un logiciel en ligne (SaaS) de devis, de facturation et de suivi de chantier pour les paysagistes, les jardiniers et les entreprises d’aménagement extérieur, conçu pour le marché français et utilisable sur smartphone, tablette et ordinateur. Il sert à photographier le chantier, mesurer, chiffrer avec son propre catalogue de prix, générer un devis professionnel en PDF, le faire signer en ligne par le client, puis facturer et suivre le chantier. Un mode bâtiment existe pour les artisans du BTP et un mode services à la personne génère l’attestation fiscale annuelle en PDF. Essai gratuit de 15 jours sans carte bancaire, puis offres Starter (19 €), Pro (39 €) et Business (69 €) HT par mois, sans engagement.';

/**
 * llms-full.txt : le contenu de référence du site en un seul fichier texte, pour les assistants IA.
 * Construit depuis les mêmes données que les pages (fonctionnalités, tarifs, FAQ, « L’essentiel » de chaque page) :
 * rien n’y figure qui ne soit pas affiché sur le site.
 */
export function llmsFull(siteUrl: string): string {
  const url = (path: string) => siteUrl + (path === '/' ? '/' : path);
  const meta = pages as Record<string, { title: string; noindex?: boolean }>;
  const name = (path: string) => meta[path]?.title.replace(/ \| Paysapro AI$/, '') ?? path;
  const yearly = (price: number) => String(Math.round(price * 12 * (100 - YEARLY_DISCOUNT_PERCENT)) / 100).replace('.', ',');
  const out: string[] = [
    '# Paysapro AI',
    '',
    `> ${REFERENCE}`,
    '',
    `Site officiel : ${url('/')} — Application : https://app.paysapro-ai.fr — Langue : français.`,
    '',
    '## À qui s’adresse Paysapro AI',
    '',
    'Paysagistes indépendants, jardiniers, entreprises de création de jardins, d’entretien d’espaces verts et d’aménagement extérieur (terrasses, clôtures, plantations, engazonnement), seuls ou en petite équipe (1 à 10 utilisateurs). Un mode bâtiment couvre aussi les artisans du BTP.',
    '',
    '## Fonctionnalités',
    '',
    ...FEATURES.map((f) => `- **${f.title}** : ${f.description}`),
    '',
    '## Tarifs',
    '',
    'Essai gratuit de 15 jours avec toutes les fonctionnalités, sans carte bancaire. Prix hors taxes, sans engagement.',
    '',
    ...FUTURE_PLANS.filter((p) => p.price !== null).map(
      (p) => `- **${p.name}** : ${p.price} € HT par mois, ou ${yearly(p.price!)} € HT par an (−${YEARLY_DISCOUNT_PERCENT} %). ${p.description} Inclus : ${p.features.join(' ; ')}.`,
    ),
    '',
    `Détail : ${url('/tarifs')}`,
    '',
    '## Ce que Paysapro AI ne fait pas',
    '',
    '- L’assistant IA suggère des prestations ; il ne produit pas un devis exact à partir d’une photo. Le professionnel valide toujours les quantités, les prix et le devis final.',
    '- Paysapro AI établit devis, factures d’acompte et de solde et avoirs (format Factur-X) ; il ne tient pas la comptabilité. Le raccordement à une plateforme agréée de facturation électronique est en préparation.',
    '- Il ne gère pas l’avance immédiate de crédit d’impôt des services à la personne.',
    '- Il ne fait ni pointage des heures, ni géolocalisation des équipes, ni campagnes d’e-mails.',
    '',
    '## Questions fréquentes',
    '',
    ...FAQ.flatMap((f) => [`### ${f.question}`, '', f.answer, '']),
    '## L’essentiel, page par page',
    '',
    ...LANDINGS.filter((l) => !meta[l.path]?.noindex).flatMap((l) => [`### ${name(l.path)}`, '', url(l.path), '', ...l.summary.map((x) => `- ${x}`), '']),
    '## Outils de calcul gratuits',
    '',
    ...TOOLS.map((t) => `- [${t.name}](${url(t.path)}) : ${t.short}`),
    '',
  ];
  const articles = MARKETING_CONFIG.showBlog ? publishedArticles() : [];
  if (articles.length) {
    out.push('## Guides pratiques', '');
    for (const a of articles) {
      out.push(`### ${a.title}`, '', `${url(`/blog/${a.slug}`)} — publié le ${a.publishedAt}${a.updatedAt ? `, mis à jour le ${a.updatedAt}` : ''}`, '', ...(a.summary?.length ? a.summary.map((x) => `- ${x}`) : [a.excerpt]), '');
    }
  }
  return out.join('\n');
}
