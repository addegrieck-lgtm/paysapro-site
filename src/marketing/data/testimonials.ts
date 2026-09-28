/**
 * Témoignages RÉELS uniquement, avec l'accord écrit de la personne.
 * Ne jamais inventer de client. Tant que la liste est vide, la section affiche un placeholder
 * clairement identifié (et seulement si MARKETING_CONFIG.showTestimonials = true).
 */
export interface Testimonial {
  /** chemin sous public/images/testimonials/ (photo fournie par la personne) */
  photo?: string;
  name: string;
  company: string;
  activity: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [];
