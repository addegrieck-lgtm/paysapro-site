/**
 * Témoignages RÉELS uniquement, avec l'accord écrit de la personne.
 * Ne jamais inventer de client ni réécrire un avis : le texte est celui de la personne, mot pour mot.
 * Tant que la liste est vide, la section affiche un placeholder clairement identifié
 * (et seulement si MARKETING_CONFIG.showTestimonials = true).
 */
export interface Testimonial {
  /** chemin sous public/images/testimonials/ (photo fournie par la personne) */
  photo?: string;
  /** Prénom et initiale du nom */
  name: string;
  company?: string;
  activity: string;
  /** Note donnée par la personne, sur 5 */
  rating?: number;
  quote: string;
}

/** Comment les avis ont été recueillis (information due aux visiteurs, art. L111-7-2 du Code de la consommation). */
export const TESTIMONIALS_NOTE =
  'Avis recueillis auprès de professionnels rencontrés sur le terrain, après leur essai gratuit de 15 jours, et publiés avec leur accord.';

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Thomas M.',
    activity: 'Paysagiste indépendant',
    rating: 5,
    quote: 'Avant, je passais un temps fou à préparer mes devis. Avec Paysapro AI, tout est beaucoup plus simple et rapide. Je peux me concentrer davantage sur mes chantiers.',
  },
  {
    name: 'Julien R.',
    activity: 'Entrepreneur paysagiste',
    rating: 5,
    quote: 'Un logiciel vraiment pratique pour gérer ses clients et ses devis. L’interface est intuitive et je retrouve enfin toutes mes informations au même endroit.',
  },
];
