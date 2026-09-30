/**
 * Blog — articles pratiques pour les paysagistes (référencement naturel).
 * Publier un article : renseigner `publishedAt` et `body`. Il apparaît alors automatiquement
 * sur /blog, dans le sitemap et avec ses données structurées (pré-rendu au build).
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
  readingMinutes?: number;
  body?: BlogBlock[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'comment-faire-un-devis-paysagiste',
    title: 'Comment faire un devis paysagiste ?',
    excerpt: 'Les éléments indispensables d’un devis clair : métrés, prestations, main-d’œuvre, TVA et conditions.',
    keywords: ['devis paysagiste', 'logiciel devis paysagiste'],
    publishedAt: '2026-09-30',
    readingMinutes: 5,
    body: [
      {
        paragraphs: [
          'Un devis de paysagiste n’est pas qu’un prix en bas d’une page. C’est le document qui décrit ce que vous allez faire, avec quoi, pour combien, et dans quelles conditions. Bien construit, il évite les malentendus avec le client et vous protège en cas de désaccord.',
          'Voici une méthode simple, dans l’ordre où se déroule un vrai rendez-vous de chantier.',
        ],
      },
      {
        heading: '1. Partir du terrain : photos et relevé',
        paragraphs: [
          'Tout commence sur place. Photographiez l’ensemble du jardin, puis chaque zone concernée : la future terrasse, la clôture à remplacer, les massifs à créer. Photographiez aussi les contraintes : largeur du portail, pente, accès pour une mini-pelle, réseaux visibles.',
          'Ces photos servent trois fois : pour chiffrer au calme, pour illustrer le devis, et pour garder une trace de l’état initial du terrain.',
        ],
      },
      {
        heading: '2. Mesurer : surfaces, linéaires, volumes',
        paragraphs: ['Un chiffrage juste repose sur des métrés justes. Selon les prestations, vous aurez besoin de :'],
        list: [
          'surfaces en m² : gazon, terrasse, paillage, désherbage ;',
          'linéaires en ml : clôture, bordures, haies à tailler ;',
          'volumes en m³ : terre végétale, gravier, déblais à évacuer ;',
          'quantités à l’unité : arbres, arbustes, poteaux, portail.',
        ],
      },
      {
        heading: '3. Détailler chaque prestation',
        paragraphs: [
          'Une ligne « Aménagement du jardin : forfait » ne rassure personne. Détaillez poste par poste, avec pour chacun une désignation claire, une quantité, une unité, un prix unitaire et un total.',
          'Pensez aux postes que l’on oublie facilement et qui pèsent sur la rentabilité du chantier : préparation du terrain, évacuation des déchets verts et des gravats, location de matériel, déplacements, protection des abords.',
        ],
      },
      {
        heading: '4. Les informations à faire figurer',
        paragraphs: ['Un devis professionnel comporte généralement :'],
        list: [
          'la date du devis et sa durée de validité ;',
          'le nom, l’adresse et le numéro SIRET de votre entreprise ;',
          'le nom et l’adresse du client, et l’adresse du chantier ;',
          'le détail de chaque prestation : quantité, unité, prix unitaire ;',
          'le coût de la main-d’œuvre et des éventuels déplacements ;',
          'le total HT, le taux et le montant de la TVA, le total TTC ;',
          'les conditions de paiement, dont l’acompte à la commande ;',
          'la date ou la période prévue pour les travaux ;',
          'un emplacement pour la signature du client, avec la mention « bon pour accord ».',
        ],
      },
      {
        paragraphs: [
          'Selon votre statut et vos activités, d’autres mentions peuvent être exigées (franchise de TVA, assurance professionnelle, conditions particulières). En cas de doute, faites valider votre modèle par votre expert-comptable ou votre chambre de métiers.',
        ],
      },
      {
        heading: '5. Signaler ce qui est estimé',
        paragraphs: [
          'Certaines quantités ne peuvent pas être connues avec certitude avant de commencer : nature du sous-sol, volume réel de déblais, longueur exacte d’une clôture en limite de propriété. Dites-le clairement sur le devis : « quantité estimée, à confirmer par métré avant travaux ». Le client l’accepte bien mieux avant qu’après.',
        ],
      },
      {
        heading: '6. Soigner la présentation et l’envoi',
        paragraphs: [
          'Un devis propre, lisible sur téléphone, avec votre logo et quelques photos du chantier, donne une image sérieuse de votre entreprise. Envoyez-le rapidement après la visite : plus le délai est court, plus le projet est encore frais dans l’esprit du client.',
          'C’est exactement le parcours que suit Paysapro AI : photos du chantier, dimensions, prestations issues de votre catalogue, devis professionnel, puis signature du client.',
        ],
      },
    ],
  },
  {
    slug: 'calculer-surface-terrasse',
    title: 'Comment calculer la surface d’une terrasse ?',
    excerpt: 'Méthode simple pour mesurer une terrasse, y compris les formes irrégulières, et en déduire les matériaux.',
    keywords: ['surface terrasse', 'devis aménagement extérieur'],
    publishedAt: '2026-09-30',
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          'La surface est la base du chiffrage d’une terrasse : elle détermine la quantité de dalles, de lames ou de béton, le volume de fondation et une bonne partie de la main-d’œuvre. Une erreur de quelques mètres carrés se retrouve directement dans votre marge.',
        ],
      },
      {
        heading: 'Terrasse rectangulaire',
        paragraphs: [
          'C’est le cas le plus simple : surface = longueur × largeur. Une terrasse de 4 m sur 3 m fait 4 × 3 = 12 m².',
          'Mesurez toujours deux fois, et vérifiez que les angles sont bien droits en comparant les deux diagonales : si elles sont égales, votre rectangle est d’équerre.',
        ],
      },
      {
        heading: 'Terrasse en L ou à décrochements',
        paragraphs: [
          'Découpez la forme en rectangles, calculez chaque surface, puis additionnez. Une terrasse en L composée d’un rectangle de 5 × 3 m et d’un rectangle de 2 × 2 m fait 15 + 4 = 19 m².',
          'Faites un croquis coté sur place, même rapide : il vous évitera de compter deux fois la zone commune aux deux rectangles.',
        ],
      },
      {
        heading: 'Triangle, cercle et formes courbes',
        list: [
          'Triangle : base × hauteur ÷ 2.',
          'Cercle : π × rayon × rayon (soit environ 3,14 × rayon²).',
          'Demi-cercle : la moitié de la surface du cercle.',
          'Forme libre : découpez-la en rectangles et triangles, en arrondissant légèrement au-dessus.',
        ],
      },
      {
        heading: 'Prévoir les chutes',
        paragraphs: [
          'La surface à couvrir n’est pas la surface à commander. Les découpes en bordure, autour d’un regard ou le long d’un mur génèrent des chutes. On ajoute donc une marge, souvent de l’ordre de 5 à 10 %, davantage pour une pose en diagonale ou un calepinage complexe.',
          'Pour 12 m² avec 10 % de marge, prévoyez 12 × 1,10 = 13,2 m² de matériau.',
        ],
      },
      {
        heading: 'De la surface au volume',
        paragraphs: [
          'Pour le lit de pose, la fondation ou une dalle béton, il faut un volume : surface × épaisseur, en mètres. Une couche de 10 cm sur 12 m² représente 12 × 0,10 = 1,2 m³.',
          'Pensez aussi au décaissement : le volume de terre à évacuer dépend de la même surface, multipliée par la profondeur creusée.',
        ],
      },
      {
        heading: 'Reporter les métrés dans le devis',
        paragraphs: [
          'Une fois la surface connue, chaque poste du devis en découle : préparation du terrain au m², fondation au m³, revêtement au m², bordures au mètre linéaire sur le périmètre.',
          'Dans Paysapro AI, vous saisissez longueur et largeur sur le chantier : les surfaces sont calculées et reprises dans les lignes du devis, avec vos propres tarifs.',
        ],
      },
    ],
  },
  {
    slug: 'calculer-prix-cloture',
    title: 'Comment calculer le prix d’une clôture ?',
    excerpt: 'Mètres linéaires, poteaux, portail, pose : les postes à ne pas oublier.',
    keywords: ['prix clôture', 'devis jardin'],
    publishedAt: '2026-09-30',
    readingMinutes: 4,
    body: [
      {
        paragraphs: [
          'Le prix d’une clôture ne se résume pas à un tarif au mètre. Deux chantiers de même longueur peuvent coûter très différemment selon le terrain, la hauteur, les angles et ce qu’il faut déposer avant de poser. Voici comment construire un chiffrage complet, poste par poste.',
        ],
      },
      {
        heading: '1. Mesurer le linéaire',
        paragraphs: [
          'Mesurez chaque tronçon séparément, d’angle à angle, puis additionnez : 12 m + 10 m = 22 ml. Notez à part la largeur du portail et du portillon, qui se déduisent du linéaire de panneaux.',
          'Relevez aussi la pente : sur un terrain incliné, la pose en redans (en escalier) demande plus de découpes et plus de temps.',
        ],
      },
      {
        heading: '2. Compter les poteaux',
        paragraphs: [
          'Le nombre de poteaux dépend de l’entraxe, c’est-à-dire de la distance entre deux poteaux, fixée par la largeur des panneaux. Divisez la longueur par l’entraxe, arrondissez à l’entier supérieur pour obtenir le nombre d’intervalles, puis ajoutez un poteau.',
          'Exemple : 22 m avec un entraxe de 2,5 m donnent 22 ÷ 2,5 = 8,8, soit 9 intervalles, donc 10 poteaux. Ajoutez les poteaux d’angle et ceux du portail si votre système en demande des spécifiques.',
        ],
      },
      {
        heading: '3. Lister les fournitures',
        list: [
          'panneaux, grillage ou lames, selon le linéaire et la hauteur ;',
          'poteaux, platines ou plots, et béton de scellement ;',
          'fixations, clips, jambes de force, fil de tension ;',
          'soubassements ou plaques, le cas échéant ;',
          'portail, portillon et leur quincaillerie.',
        ],
      },
      {
        heading: '4. Ne pas oublier les travaux annexes',
        list: [
          'dépose et évacuation de l’ancienne clôture ;',
          'débroussaillage ou arrachage d’une haie en limite ;',
          'terrassement et nivellement le long du tracé ;',
          'location de matériel (tarière, mini-pelle) ;',
          'évacuation des déblais et déchets.',
        ],
      },
      {
        heading: '5. Chiffrer la main-d’œuvre',
        paragraphs: [
          'Estimez le temps par étape : implantation, trous et scellements, pose des panneaux, finitions. Multipliez le nombre d’heures par votre taux horaire, en tenant compte du nombre de personnes sur le chantier.',
          'Votre taux horaire doit couvrir vos charges réelles : il est propre à votre entreprise, c’est pourquoi il vaut mieux partir de vos chiffres que d’un prix moyen trouvé ailleurs.',
        ],
      },
      {
        heading: '6. La formule complète',
        paragraphs: [
          'Prix de la clôture = fournitures + travaux annexes + main-d’œuvre + déplacements, le tout avec votre marge, puis la TVA applicable.',
          'Vous pouvez ensuite ramener ce total au mètre linéaire pour vos prochains chantiers similaires : c’est ainsi que se construit un catalogue de prix fiable, basé sur votre propre expérience.',
          'Dans Paysapro AI, vous enregistrez vos prestations au ml, à l’unité ou à l’heure dans votre catalogue, puis vous les réutilisez sur chaque devis.',
        ],
      },
    ],
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
