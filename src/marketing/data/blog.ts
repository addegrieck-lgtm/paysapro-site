import articles from './blog.generated.json';

/**
 * Blog — articles pratiques pour les paysagistes et les artisans du bâtiment (référencement naturel).
 * Les articles s'écrivent dans le back-office de l'application (rubrique Articles). Un article publié apparaît
 * sur /blog, dans le sitemap et avec ses données structurées (pré-rendu au build) ; une date de parution future
 * le laisse « À paraître » jusqu'au build de ce jour-là (build quotidien, ou « Mettre en ligne » du back-office).
 * Règles : conseils concrets, pas de prix de marché inventés, pas de bourrage de mots-clés.
 */
export interface BlogBlock {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  /** mots-clés métier visés (sans bourrage) */
  keywords: string[];
  /** AAAA-MM-JJ */
  publishedAt?: string;
  /** AAAA-MM-JJ — à renseigner quand l'article est modifié */
  updatedAt?: string;
  readingMinutes?: number;
  /** « L’essentiel » : réponses directes en tête d’article */
  summary?: string[];
  /** liens internes affichés en fin d'article */
  links?: { label: string; to: string }[];
  body?: BlogBlock[];
}

// Articles publiés ou programmés : copiés depuis le back-office (table blog_posts) à chaque build par
// scripts/fetch-blog.mjs. Le fichier versionné sert de repli (et de base aux tests) si la base est injoignable.
export const BLOG_ARTICLES: BlogArticle[] = articles as BlogArticle[];

/** Title de la page : « Titre | Paysapro AI », sans la marque si l'ensemble dépasse 60 caractères (sinon Google le tronque). */
export function articleSeoTitle(a: Pick<BlogArticle, 'title'>): string {
  const full = `${a.title} | Paysapro AI`;
  return full.length <= 60 ? full : a.title;
}

/** Articles en ligne : rédigés et dont la date de parution est atteinte (date du build, heure de Paris). */
export function publishedArticles(today: string = import.meta.env.VITE_BUILD_DATE) {
  return BLOG_ARTICLES.filter((a) => a.publishedAt && a.publishedAt <= today && a.body?.length).sort((a, b) => b.publishedAt!.localeCompare(a.publishedAt!));
}
