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

/** Note moyenne et nombre d'avis notés, calculés sur les avis publiés (null si aucun). */
export function testimonialsSummary(list: Testimonial[] = TESTIMONIALS): { average: number; count: number } | null {
  const rated = list.filter((t) => typeof t.rating === 'number');
  if (rated.length === 0) return null;
  const average = Math.round((rated.reduce((s, t) => s + t.rating!, 0) / rated.length) * 10) / 10;
  return { average, count: rated.length };
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Thomas M.',
    activity: 'Paysagiste indépendant',
    rating: 5,
    quote: 'Avant, je passais un temps fou à préparer mes devis. Avec Paysapro AI, tout est beaucoup plus simple et rapide. Je peux enfin me concentrer davantage sur mes chantiers !',
  },
  {
    name: 'Julien R.',
    activity: 'Entrepreneur paysagiste',
    rating: 5,
    quote: 'Un logiciel vraiment pratique pour gérer ses clients et ses devis. L’interface est intuitive et je retrouve enfin toutes mes informations au même endroit.',
  },
  {
    name: 'Maxime L.',
    activity: 'Jardinier professionnel',
    rating: 5,
    quote: 'J’apprécie particulièrement la simplicité de création des devis. Plus besoin de jongler entre plusieurs fichiers Excel. Un vrai gain de temps au quotidien.',
  },
  {
    name: 'Nicolas D.',
    activity: 'Entreprise d’espaces verts',
    rating: 5,
    quote: 'Paysapro AI est un outil très intéressant pour les petites entreprises. La gestion des clients, les tarifs et le suivi des chantiers sont particulièrement utiles.',
  },
  {
    name: 'Alexandre P.',
    activity: 'Paysagiste indépendant',
    rating: 5,
    quote: 'Je cherchais un outil simple, sans usine à gaz. Paysapro répond parfaitement à mes attentes. La prise en main est rapide et les devis sont professionnels.',
  },
  {
    name: 'Kevin B.',
    activity: 'Créateur d’espaces extérieurs',
    rating: 5,
    quote: 'Le catalogue de prestations est vraiment pratique. Je gagne du temps sur mes estimations et je peux mieux structurer mes propositions commerciales.',
  },
  {
    name: 'Mathieu G.',
    activity: 'Jardinier paysagiste',
    rating: 5,
    quote: 'Un logiciel pensé pour notre métier. J’aime le fait de pouvoir centraliser mes clients, mes photos et mes devis sans perdre de temps.',
  },
  {
    name: 'Anthony F.',
    activity: 'Artisan paysagiste',
    rating: 5,
    quote: 'Très bonne surprise ! L’assistant IA est un vrai plus pour préparer ses devis et organiser son activité. Un outil prometteur pour les indépendants.',
  },
  {
    name: 'Florian C.',
    activity: 'Petite entreprise paysagère',
    rating: 5,
    quote: 'Je cherchais une solution abordable pour professionnaliser mon activité. Paysapro AI propose beaucoup de fonctionnalités intéressantes dans une interface claire.',
  },
  {
    name: 'Lucas T.',
    activity: 'Paysagiste indépendant',
    rating: 5,
    quote: 'Simple, moderne et efficace. C’est exactement le type d’outil qui manquait pour gérer son activité sans passer ses soirées sur l’administratif.',
  },
];
