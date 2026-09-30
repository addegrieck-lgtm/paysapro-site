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
  /** AAAA-MM-JJ — à renseigner quand l'article est modifié */
  updatedAt?: string;
  readingMinutes?: number;
  /** « L’essentiel » : réponses directes en tête d’article */
  summary?: string[];
  /** liens internes affichés en fin d'article */
  links?: { label: string; to: string }[];
  body?: BlogBlock[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'comment-faire-un-devis-paysagiste',
    title: 'Comment faire un devis paysagiste ?',
    excerpt: 'Les éléments indispensables d’un devis clair : métrés, prestations, main-d’œuvre, TVA et conditions.',
    keywords: ['devis paysagiste', 'logiciel devis paysagiste'],
    publishedAt: '2026-09-30',
    updatedAt: '2026-10-01',
    readingMinutes: 6,
    links: [
      { label: 'Exemple de devis paysagiste commenté', to: '/modele-devis-paysagiste' },
      { label: 'Le logiciel de devis paysagiste', to: '/logiciel-devis-paysagiste' },
      { label: 'Calculateurs gratuits : surface, volume, clôture', to: '/outils' },
    ],
    summary: [
      "Un bon devis paysagiste part d’une visite avec photos et mesures précises.",
      "Il détaille chaque prestation avec une quantité, une unité et un prix, sans oublier préparation, évacuation et déplacements.",
      "Il indique les mentions de l’entreprise, les totaux HT, TVA et TTC, l’acompte, la validité, la gestion des déchets et la signature du client."
    ],
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
        heading: 'La gestion des déchets du chantier',
        paragraphs: ['Pour les travaux de jardinage et de maçonnerie paysagère, la réglementation issue de la loi AGEC demande que le devis précise :'],
        list: [
          'une estimation de la quantité de déchets générés par le chantier ;',
          'les modalités de gestion et d’enlèvement : tri, broyage sur place, évacuation ;',
          'le ou les points de collecte prévus, avec leur nom, leur adresse et le type d’installation ;',
          'une estimation des coûts associés.',
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
    links: [
      { label: 'Calculateur de surface gratuit', to: '/outils/calcul-surface' },
      { label: 'Calculateur de volume : terre, gravier, béton', to: '/outils/calcul-volume' },
    ],
    summary: [
      "Rectangle : longueur × largeur. Forme en L : somme de deux rectangles. Triangle : base × hauteur ÷ 2. Cercle : π × rayon².",
      "Ajoutez une marge de chutes, souvent de 5 à 10 %, pour la quantité à commander.",
      "Volume de fondation ou de lit de pose : surface × épaisseur en mètres."
    ],
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
    links: [
      { label: 'Calculateur de clôture : poteaux et panneaux', to: '/outils/calcul-cloture' },
      { label: 'Exemple de devis paysagiste commenté', to: '/modele-devis-paysagiste' },
    ],
    summary: [
      "Nombre de poteaux = longueur ÷ entraxe, arrondi à l’entier supérieur, plus un.",
      "Le prix total additionne fournitures, travaux annexes (dépose, terrassement, évacuation), main-d’œuvre et déplacements, puis la TVA.",
      "Partez de vos propres coûts et de votre taux horaire plutôt que d’un prix moyen."
    ],
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
    slug: 'attestation-fiscale-sap-jardinage',
    title: 'Attestation fiscale SAP jardinage : le guide du paysagiste',
    excerpt: 'Services à la personne et petits travaux de jardinage : à quoi sert l’attestation fiscale annuelle, ce qu’elle contient et comment la préparer sans y passer vos soirées.',
    keywords: ['attestation fiscale SAP', 'services à la personne jardinage', 'logiciel paysagiste SAP'],
    publishedAt: '2026-10-01',
    readingMinutes: 5,
    links: [
      { label: 'Le mode SAP de Paysapro AI : devis et attestation fiscale', to: '/logiciel-paysagiste-services-a-la-personne' },
      { label: 'Comment faire un devis paysagiste ?', to: '/blog/comment-faire-un-devis-paysagiste' },
    ],
    summary: [
      "L’attestation fiscale récapitule ce que le client a réellement payé dans l’année pour des services à la personne.",
      "Elle se remet au début de l’année suivante, à temps pour la déclaration de revenus du client.",
      "Seuls les petits travaux de jardinage couverts par votre déclaration SAP sont concernés, pas les travaux de création."
    ],
    body: [
      {
        paragraphs: [
          'Si votre entreprise est déclarée en services à la personne (SAP), vos clients particuliers peuvent bénéficier d’un avantage fiscal sur les petits travaux de jardinage que vous réalisez chez eux. En contrepartie, vous devez leur remettre chaque année une attestation fiscale. C’est souvent la corvée de janvier : voici comment l’aborder sereinement.',
        ],
      },
      {
        heading: 'À quoi sert l’attestation fiscale ?',
        paragraphs: [
          'L’attestation récapitule ce que le client a réellement payé dans l’année pour des prestations de services à la personne. Il s’en sert pour déclarer ses dépenses et obtenir son crédit d’impôt, qui correspond à la moitié des sommes versées, dans la limite d’un plafond annuel propre aux petits travaux de jardinage.',
          'Les taux et plafonds sont fixés par l’administration et peuvent évoluer : vérifiez les règles en vigueur sur le site officiel des services à la personne ou auprès de votre expert-comptable avant de les annoncer à vos clients.',
        ],
      },
      {
        heading: 'Quelles prestations sont concernées ?',
        paragraphs: [
          'En règle générale, il s’agit des travaux d’entretien courant des jardins de particuliers : tonte, taille de haies et d’arbustes, désherbage, débroussaillage, ramassage des feuilles. Les travaux de création et d’aménagement, comme une terrasse, une clôture ou la conception d’un jardin, n’en font pas partie.',
          'Ce qui compte, c’est le périmètre de votre propre déclaration SAP. En cas de doute sur une prestation, ne la présentez pas comme éligible sans l’avoir vérifié.',
        ],
      },
      {
        heading: 'Que contient l’attestation ?',
        paragraphs: ['Une attestation fiscale reprend habituellement :'],
        list: [
          'le nom, l’adresse et le numéro d’identification de votre entreprise, avec votre numéro de déclaration SAP ;',
          'le nom et l’adresse du client bénéficiaire ;',
          'la nature des prestations réalisées et les dates d’intervention ;',
          'le montant effectivement acquitté dans l’année ;',
          'les sommes réglées par un moyen de paiement préfinancé, comme le CESU, indiquées à part.',
        ],
      },
      {
        heading: 'Quand la remettre ?',
        paragraphs: [
          'L’attestation porte sur une année civile et se remet au début de l’année suivante, à temps pour la déclaration de revenus de vos clients : en pratique, avant la fin du mois de mars. Mieux vaut ne pas attendre leurs relances.',
        ],
      },
      {
        heading: 'Les erreurs qui coûtent du temps',
        list: [
          'Compter ce qui a été facturé au lieu de ce qui a été réellement encaissé dans l’année.',
          'Mélanger sur un même document des prestations SAP et des travaux d’aménagement.',
          'Oublier de noter les dates d’intervention au fil de l’année.',
          'Reconstituer les règlements en janvier à partir de relevés bancaires.',
        ],
      },
      {
        heading: 'Préparer l’attestation toute l’année, pas en janvier',
        paragraphs: [
          'La méthode la plus simple consiste à enregistrer les informations au moment où elles existent : marquer les prestations SAP dès le devis, noter les interventions, saisir chaque règlement avec sa date et son mode de paiement. En fin d’année, l’attestation n’est plus qu’une addition.',
          'C’est le principe du mode SAP de Paysapro AI : vous cochez vos prestations éligibles dans votre catalogue, le devis distingue les montants concernés, et l’application génère elle-même le PDF de l’attestation de chaque client à partir des règlements enregistrés. S’il manque une information, elle vous la signale au lieu de l’inventer.',
        ],
      },
    ],
  },
  {
    slug: 'choisir-logiciel-devis-paysagiste',
    title: 'Comment choisir un logiciel de devis paysagiste ?',
    excerpt: 'Les critères qui comptent vraiment pour un paysagiste : unités métier, usage sur le chantier, catalogue de prix, signature, SAP, prix et données.',
    keywords: ['logiciel devis paysagiste', 'choisir logiciel paysagiste', 'comparatif logiciel paysagiste'],
    publishedAt: '2026-10-01',
    readingMinutes: 6,
    summary: [
      'Choisissez un logiciel qui parle le langage du paysage : m², ml, m³, unités et heures.',
      'Vérifiez qu’il s’utilise vraiment sur le chantier, depuis un téléphone.',
      'Regardez le catalogue de prix, la présentation du devis, la signature en ligne et, si vous êtes concerné, le mode services à la personne.',
      'Testez-le sur un vrai devis avant de vous engager, et vérifiez ce qu’il ne fait pas.',
    ],
    links: [
      { label: 'Qu’est-ce que Paysapro AI ?', to: '/quest-ce-que-paysapro-ai' },
      { label: 'Le logiciel de devis paysagiste', to: '/logiciel-devis-paysagiste' },
      { label: 'Tarifs', to: '/tarifs' },
    ],
    body: [
      {
        paragraphs: [
          'Il existe de nombreux logiciels de devis. Certains sont généralistes, d’autres conçus pour le bâtiment, quelques-uns pour le paysage. Pour choisir, le plus simple est de partir de votre façon de travailler plutôt que de la liste des fonctionnalités.',
        ],
      },
      {
        heading: '1. Des unités et un vocabulaire de paysagiste',
        paragraphs: [
          'Un devis de paysage mélange des surfaces (gazon, terrasse), des linéaires (clôture, bordures), des volumes (terre végétale, gravier), des unités (végétaux) et des heures. Vérifiez que le logiciel gère naturellement ces unités et qu’il calcule les quantités à partir de vos mesures.',
        ],
      },
      {
        heading: '2. Un vrai usage sur le chantier',
        paragraphs: [
          'Si vous préparez vos devis le soir, c’est souvent parce que l’outil n’est pas utilisable sur place. Testez le logiciel sur votre téléphone, en extérieur : prise de photos, saisie des mesures, choix des prestations. Les boutons doivent être grands et la saisie courte.',
        ],
      },
      {
        heading: '3. Votre catalogue de prix',
        paragraphs: [
          'Vos prix sont votre métier. Le logiciel doit vous laisser créer vos prestations, avec leur unité, leur prix de vente et leur coût, puis les réutiliser sur chaque devis. Méfiez-vous des prix « moyens » imposés : ils ne tiennent compte ni de vos charges, ni de votre région.',
        ],
      },
      {
        heading: '4. Un devis présentable et une signature simple',
        list: [
          'Le devis reprend-il votre logo, vos mentions et vos conditions ?',
          'Peut-on y joindre les photos du chantier ?',
          'Le client peut-il le consulter et le signer en ligne ?',
          'Voyez-vous quand le devis a été envoyé, consulté et signé ?',
        ],
      },
      {
        heading: '5. Les besoins propres à votre activité',
        list: [
          'Services à la personne : mentions SAP sur le devis et attestation fiscale annuelle.',
          'Travail en équipe : plusieurs utilisateurs, avec des droits différents.',
          'Suivi : planning des chantiers, statistiques, marge par devis.',
          'Facturation et comptabilité : certains logiciels les intègrent, d’autres non ; vérifiez comment l’outil s’articule avec votre expert-comptable.',
        ],
      },
      {
        heading: '6. Le prix, l’engagement et vos données',
        paragraphs: [
          'Comparez le prix mensuel, le nombre d’utilisateurs inclus et la durée d’engagement. Vérifiez aussi où sont hébergées vos données, si vous pouvez les récupérer, et ce qui se passe si vous arrêtez l’abonnement.',
        ],
      },
      {
        heading: '7. Tester sur un vrai devis',
        paragraphs: [
          'Le meilleur test reste de refaire un devis récent avec le logiciel : combien de temps faut-il, le résultat est-il présentable, le client comprend-il le document ? Une version d’essai ou une bêta gratuite permet de le faire sans risque.',
          'Paysapro AI est conçu autour de ces critères pour les paysagistes : mesures et unités du métier, usage sur téléphone, catalogue de prix, devis signé en ligne et mode services à la personne. Il ne fait pas de facturation ni de comptabilité. Son accès est gratuit pendant la bêta.',
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
