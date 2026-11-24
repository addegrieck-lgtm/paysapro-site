/**
 * Vidéos YouTube de Paysapro AI, intégrées sur le site (lecteur chargé au clic, sans cookie avant lecture)
 * et décrites en données structurées VideoObject sur les pages listées dans `pages`.
 * Titre et description : les mêmes que sur YouTube.
 */
export interface SiteVideo {
  /** identifiant YouTube (youtu.be/<id>) */
  id: string;
  title: string;
  description: string;
  /** date et heure de mise en ligne sur YouTube (ISO 8601, avec fuseau) */
  uploadDate: string;
  /** pages du site qui affichent la vidéo */
  pages: string[];
}

export const DEVIS_VIDEO: SiteVideo = {
  id: 'OeGorr5l0mg',
  title: 'Comment faire un devis paysagiste sur son téléphone (en 5 min)',
  description:
    'Comment faire un devis paysagiste directement sur son téléphone, sur un vrai chantier : photos du jardin, mesures, prestations, puis devis envoyé et signé par le client en ligne.',
  uploadDate: '2026-11-24T18:00:00+01:00',
  pages: ['/logiciel-devis-paysagiste', '/comment-ca-marche', '/blog/comment-faire-un-devis-paysagiste'],
};

export const VIDEOS: SiteVideo[] = [DEVIS_VIDEO];

/** Vidéo à afficher sur une page (articles du blog : choisie ici, pas dans le back-office). */
export const videoForPath = (path: string) => VIDEOS.find((v) => v.pages.includes(path));

export const youtubeThumbnail = (v: Pick<SiteVideo, 'id'>) => `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
export const youtubeWatchUrl = (v: Pick<SiteVideo, 'id'>) => `https://www.youtube.com/watch?v=${v.id}`;
export const youtubeEmbedUrl = (v: Pick<SiteVideo, 'id'>) => `https://www.youtube-nocookie.com/embed/${v.id}`;

/** Données structurées schema.org : aident Google à afficher la vidéo dans ses résultats. */
export function videoObject(v: SiteVideo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description,
    thumbnailUrl: [youtubeThumbnail(v)],
    uploadDate: v.uploadDate,
    embedUrl: youtubeEmbedUrl(v),
    url: youtubeWatchUrl(v),
    inLanguage: 'fr-FR',
  };
}
