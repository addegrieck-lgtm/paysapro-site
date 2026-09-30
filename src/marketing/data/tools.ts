/**
 * Outils de calcul gratuits (référencement + utilité réelle sur le chantier).
 * Title / description : src/marketing/config/pages.json. Calculs : components/tools/Calculators.tsx.
 */
export type ToolId = 'surface' | 'volume' | 'cloture';

export interface Tool {
  id: ToolId;
  path: string;
  name: string;
  short: string;
  h1: string;
  intro: string;
  /** explications sous le calculateur */
  method: { heading: string; paragraphs?: string[]; list?: string[] }[];
  related: { label: string; to: string }[];
}

export const TOOLS: Tool[] = [
  {
    id: 'surface',
    path: '/outils/calcul-surface',
    name: 'Calcul de surface',
    short: 'Terrasse, gazon, massif : surface en m² et quantité à commander avec les chutes.',
    h1: 'Calculateur de surface : terrasse, gazon, massif',
    intro: 'Calculez une surface en m² pour un rectangle, une forme en L, un triangle ou un cercle, puis la quantité de matériau à commander en tenant compte des chutes.',
    method: [
      {
        heading: 'Les formules utilisées',
        list: [
          'Rectangle : longueur × largeur.',
          'Forme en L : somme de deux rectangles.',
          'Triangle : base × hauteur ÷ 2.',
          'Cercle : π × rayon × rayon.',
        ],
      },
      {
        heading: 'Pourquoi ajouter une marge de chutes ?',
        paragraphs: [
          'Les découpes en bordure, autour d’un regard ou le long d’un mur génèrent des pertes. On commande donc un peu plus que la surface à couvrir, souvent de l’ordre de 5 à 10 %, davantage pour une pose en diagonale.',
        ],
      },
      {
        heading: 'Bien mesurer sur le terrain',
        paragraphs: [
          'Mesurez chaque côté deux fois. Pour vérifier qu’un rectangle est d’équerre, comparez ses deux diagonales : elles doivent être égales. Pour une forme complexe, découpez-la en formes simples et additionnez les surfaces.',
        ],
      },
    ],
    related: [
      { label: 'Comment calculer la surface d’une terrasse ?', to: '/blog/calculer-surface-terrasse' },
      { label: 'Calculer un volume de terre ou de gravier', to: '/outils/calcul-volume' },
    ],
  },
  {
    id: 'volume',
    path: '/outils/calcul-volume',
    name: 'Calcul de volume',
    short: 'Terre végétale, gravier, paillage, béton : volume en m³ et poids estimé.',
    h1: 'Calculateur de volume : terre végétale, gravier, paillage',
    intro: 'Calculez le volume à commander en m³ à partir d’une surface et d’une épaisseur, et estimez le poids correspondant pour organiser la livraison.',
    method: [
      {
        heading: 'La formule',
        paragraphs: ['Volume (m³) = surface (m²) × épaisseur (m). Une épaisseur de 10 cm correspond à 0,10 m : 48 m² sur 10 cm représentent 48 × 0,10 = 4,8 m³.'],
      },
      {
        heading: 'Du volume au poids',
        paragraphs: [
          'Le poids dépend de la densité du matériau, qui varie selon sa nature et son humidité. La valeur proposée est indicative et modifiable : demandez la densité réelle à votre fournisseur avant de commander ou de charger un véhicule.',
        ],
      },
      {
        heading: 'Penser au tassement et au foisonnement',
        paragraphs: [
          'Une terre fraîchement livrée se tasse après la mise en place, et une terre extraite occupe plus de volume qu’en place. Prévoyez une marge selon le matériau et vos habitudes de chantier.',
        ],
      },
    ],
    related: [
      { label: 'Calculer une surface', to: '/outils/calcul-surface' },
      { label: 'Comment faire un devis paysagiste ?', to: '/blog/comment-faire-un-devis-paysagiste' },
    ],
  },
  {
    id: 'cloture',
    path: '/outils/calcul-cloture',
    name: 'Calcul de clôture',
    short: 'Nombre de poteaux et de panneaux à partir du linéaire et de l’entraxe.',
    h1: 'Calculateur de clôture : poteaux et panneaux',
    intro: 'Indiquez la longueur à clôturer et l’entraxe entre poteaux : l’outil calcule le nombre d’intervalles, de panneaux et de poteaux à prévoir.',
    method: [
      {
        heading: 'La méthode de calcul',
        paragraphs: [
          'On retire d’abord la largeur des ouvertures (portail, portillon) de la longueur totale. On divise ensuite la longueur restante par l’entraxe et on arrondit à l’entier supérieur : c’est le nombre d’intervalles, donc de panneaux. Il faut un poteau de plus que d’intervalles.',
          'Exemple : 22 m avec un entraxe de 2,5 m donnent 22 ÷ 2,5 = 8,8, soit 9 panneaux et 10 poteaux.',
        ],
      },
      {
        heading: 'Ce que le calcul ne voit pas',
        list: [
          'les poteaux d’angle ou de portail spécifiques à votre système ;',
          'les recoupes de panneaux en bout de ligne ;',
          'la pose en redans sur un terrain en pente ;',
          'les jambes de force, platines et scellements.',
        ],
      },
    ],
    related: [
      { label: 'Comment calculer le prix d’une clôture ?', to: '/blog/calculer-prix-cloture' },
      { label: 'Exemple de devis paysagiste', to: '/modele-devis-paysagiste' },
    ],
  },
];

export function toolByPath(path: string) {
  return TOOLS.find((t) => t.path === path);
}
