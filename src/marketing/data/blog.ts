/**
 * Blog — structure prête, articles à rédiger.
 * Pour publier : renseigner `body` (paragraphes) et `publishedAt`, passer MARKETING_CONFIG.showBlog
 * à true, puis ajouter l'URL (/blog/slug) avec son title/description dans config/pages.json
 * (sitemap et HTML SEO générés automatiquement au build).
 */
export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  /** mots-clés métier visés (sans bourrage) */
  keywords: string[];
  publishedAt?: string;
  body?: { heading?: string; paragraphs: string[] }[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'comment-faire-un-devis-paysagiste',
    title: 'Comment faire un devis paysagiste ?',
    excerpt: 'Les éléments indispensables d’un devis clair : métrés, prestations, main-d’œuvre, TVA et conditions.',
    keywords: ['devis paysagiste', 'logiciel devis paysagiste'],
  },
  {
    slug: 'calculer-surface-terrasse',
    title: 'Comment calculer la surface d’une terrasse ?',
    excerpt: 'Méthode simple pour mesurer une terrasse, y compris les formes irrégulières, et en déduire les matériaux.',
    keywords: ['surface terrasse', 'devis aménagement extérieur'],
  },
  {
    slug: 'calculer-prix-cloture',
    title: 'Comment calculer le prix d’une clôture ?',
    excerpt: 'Mètres linéaires, poteaux, portail, pose : les postes à ne pas oublier.',
    keywords: ['prix clôture', 'devis jardin'],
  },
  {
    slug: 'gagner-du-temps-sur-ses-devis',
    title: 'Comment gagner du temps sur ses devis ?',
    excerpt: 'Catalogue de prestations, modèles, photos rangées : organiser sa préparation commerciale.',
    keywords: ['application paysagiste', 'logiciel gestion paysagiste'],
  },
  {
    slug: 'organiser-ses-chantiers',
    title: 'Comment organiser ses chantiers ?',
    excerpt: 'Centraliser les informations de chaque chantier pour moins d’oublis et moins d’allers-retours.',
    keywords: ['logiciel chantier paysagiste'],
  },
  {
    slug: 'presenter-un-devis-professionnel',
    title: 'Comment présenter un devis professionnel ?',
    excerpt: 'Mise en page, photos, conditions : ce qui rassure un client au moment de signer.',
    keywords: ['devis paysagiste logiciel'],
  },
];

export function publishedArticles() {
  return BLOG_ARTICLES.filter((a) => a.publishedAt && a.body?.length);
}
