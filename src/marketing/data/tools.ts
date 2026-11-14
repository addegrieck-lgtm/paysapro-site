/**
 * Outils de calcul gratuits (référencement + utilité réelle sur le chantier).
 * Title / description : src/marketing/config/pages.json. Calculs : components/tools/Calculators.tsx.
 */
export type ToolId = 'surface' | 'volume' | 'cloture' | 'marge';

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
    h1: 'Calcul de surface : terrasse, gazon, massif',
    intro: 'Calculez une surface en m² pour un rectangle, une forme en L, un triangle ou un cercle, puis la quantité de matériau à commander en tenant compte des chutes.',
    method: [
      {
        heading: 'Les formules du calcul de surface',
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
    h1: 'Calcul de volume : terre végétale, gravier, paillage',
    intro: 'Calculez le volume à commander en m³ à partir d’une surface et d’une épaisseur, et estimez le poids correspondant pour organiser la livraison.',
    method: [
      {
        heading: 'La formule du calcul de volume',
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
    short: 'Nombre de poteaux, de panneaux ou de rouleaux de grillage à partir du linéaire.',
    h1: 'Calcul de clôture : poteaux, panneaux et grillage',
    intro: 'Indiquez la longueur à clôturer et l’entraxe entre poteaux : l’outil calcule le nombre d’intervalles, de panneaux et de poteaux à prévoir. Pour une clôture en grillage, la méthode ci-dessous donne aussi les rouleaux et le prix.',
    method: [
      {
        heading: 'La méthode de calcul de clôture',
        paragraphs: [
          'On retire d’abord la largeur des ouvertures (portail, portillon) de la longueur totale. On divise ensuite la longueur restante par l’entraxe et on arrondit à l’entier supérieur : c’est le nombre d’intervalles, donc de panneaux. Il faut un poteau de plus que d’intervalles.',
          'Exemple : 22 m avec un entraxe de 2,5 m donnent 22 ÷ 2,5 = 8,8, soit 9 panneaux et 10 poteaux.',
        ],
      },
      {
        heading: 'Clôture en grillage : rouleaux, poteaux et prix',
        paragraphs: [
          'Le grillage soudé ou simple torsion se vend en rouleaux, le plus souvent de 25 m. Nombre de rouleaux = longueur à clôturer ÷ longueur d’un rouleau, arrondi à l’entier supérieur. Les poteaux se calculent comme ci-dessus, avec un entraxe de 2 à 2,5 m ; ajoutez une jambe de force à chaque angle et à chaque extrémité.',
          'Exemple : 60 m de grillage avec un entraxe de 2,5 m donnent 3 rouleaux de 25 m (60 ÷ 25 = 2,4) et 25 poteaux (60 ÷ 2,5 = 24 intervalles, plus un).',
          'Pour calculer le prix, additionnez : les fournitures (rouleaux, poteaux, jambes de force, fil de tension, tendeurs, ligatures), le scellement (béton par poteau), la main-d’œuvre (heures de pose × votre taux horaire), la préparation du terrain (débroussaillage, dépose de l’ancienne clôture, évacuation) et le déplacement. Divisez le total HT par la longueur pour obtenir votre prix au mètre linéaire posé, puis ajoutez la TVA.',
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
      { label: 'Calculer la marge et le prix de vente', to: '/outils/calcul-marge' },
    ],
  },
  {
    id: 'marge',
    path: '/outils/calcul-marge',
    name: 'Calcul de marge',
    short: 'Marge d’un chantier, taux de marge, taux de marque et prix de vente à partir du coût de revient.',
    h1: 'Calcul de marge : chantier, prestation, prix de vente',
    intro: 'Saisissez le coût de revient et le prix de vente d’une prestation ou d’un chantier : l’outil calcule la marge, le taux de marge, le taux de marque et le coefficient. Dans l’autre sens, il donne le prix de vente à pratiquer pour atteindre la marge que vous visez.',
    method: [
      {
        heading: 'Taux de marge ou taux de marque : la différence',
        paragraphs: [
          'La marge est la différence entre le prix de vente hors taxes et le coût de revient. Elle s’exprime de deux façons, que l’on confond souvent : le taux de marge la rapporte au coût, le taux de marque la rapporte au prix de vente.',
          'Exemple : un chantier vendu 2 000 € HT qui vous coûte 1 400 € dégage 600 € de marge. Le taux de marge est de 600 ÷ 1 400 = 42,9 % ; le taux de marque est de 600 ÷ 2 000 = 30 %. Les deux chiffres décrivent la même marge.',
        ],
      },
      {
        heading: 'Les formules du calcul de marge',
        list: [
          'Marge = prix de vente HT − coût de revient.',
          'Taux de marge = marge ÷ coût de revient × 100.',
          'Taux de marque = marge ÷ prix de vente HT × 100.',
          'Coefficient = prix de vente HT ÷ coût de revient.',
          'Prix de vente pour un taux de marque visé = coût de revient ÷ (1 − taux de marque).',
        ],
      },
      {
        heading: 'Ce que le coût de revient doit contenir',
        paragraphs: ['Une marge calculée sur un coût incomplet est toujours trop belle. Pour un chantier de paysage, le coût de revient additionne au minimum :'],
        list: [
          'les fournitures et les végétaux, pertes et chutes comprises ;',
          'la main-d’œuvre : heures prévues × coût horaire chargé, trajets compris ;',
          'la location de matériel et le carburant ;',
          'le déplacement et la livraison ;',
          'l’évacuation et le traitement des déchets.',
        ],
      },
      {
        heading: 'Ce que le calcul ne dit pas',
        paragraphs: [
          'La marge d’un chantier n’est pas votre bénéfice. Elle doit encore payer les frais généraux de l’entreprise : assurances, véhicule, outillage, comptabilité, téléphone, temps passé à faire les devis. Additionnez ces frais sur une année et comparez-les à la marge totale de vos chantiers : c’est ce qui indique si votre niveau de marge suffit.',
          'Une erreur fréquente : ajouter 30 % à un coût ne donne pas 30 % de marge sur le prix de vente. 1 400 € + 30 % = 1 820 €, soit un taux de marque de 23,1 %. Pour obtenir 30 % du prix de vente, il faut vendre 1 400 ÷ 0,70 = 2 000 €.',
        ],
      },
    ],
    related: [
      { label: 'Comment chiffrer la création d’une pelouse ?', to: '/blog/comment-chiffrer-creation-pelouse' },
      { label: 'Le logiciel de devis paysagiste Paysapro AI', to: '/logiciel-devis-paysagiste' },
    ],
  },
];

export function toolByPath(path: string) {
  return TOOLS.find((t) => t.path === path);
}

/** Page /outils : questions sur les calculateurs (balisées FAQPage). */
export const TOOLS_FAQ: { id: string; question: string; answer: string }[] = [
  {
    id: 'outils-gratuits',
    question: 'Les calculateurs sont-ils vraiment gratuits ?',
    answer: 'Oui. Ils sont gratuits, sans inscription et sans limite d’utilisation. Aucune donnée saisie n’est enregistrée : le calcul se fait dans votre navigateur.',
  },
  {
    id: 'outils-precision',
    question: 'Quelle confiance accorder aux résultats ?',
    answer:
      'Les formules sont exactes pour les formes simples (rectangle, triangle, cercle). Le résultat dépend surtout de la qualité des mesures prises sur le terrain : mesurez deux fois, découpez les formes complexes et ajoutez une marge de chutes adaptée à la pose.',
  },
  {
    id: 'outils-chutes',
    question: 'Pourquoi la quantité à commander est-elle supérieure à la surface ?',
    answer:
      'Les découpes en bordure, autour d’un regard ou le long d’un mur génèrent des pertes. Le calculateur de surface ajoute une marge de chutes que vous réglez vous-même ; elle est souvent de l’ordre de 5 à 10 %, davantage pour une pose en diagonale.',
  },
  {
    id: 'outils-integrer',
    question: 'Puis-je intégrer un calculateur sur mon site ?',
    answer:
      'Oui. Chaque calculateur propose un bloc « Intégrer ce calculateur sur votre site » : copiez le code fourni et collez-le dans votre page. Le calculateur s’affiche chez vous, avec un lien vers Paysapro AI.',
  },
  {
    id: 'outils-devis',
    question: 'Comment reporter le résultat dans un devis ?',
    answer:
      'Dans Paysapro AI, les mesures saisies sur le chantier calculent directement les quantités des lignes du devis, avec vos propres tarifs. Plus besoin de recopier les chiffres d’un outil à l’autre.',
  },
];
