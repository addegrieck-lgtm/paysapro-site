/**
 * Blog — articles pratiques pour les paysagistes et les artisans du bâtiment (référencement naturel).
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
    slug: 'factur-x-artisan',
    title: 'Factur-X : la facture électronique expliquée aux artisans',
    excerpt: 'PDF lisible et données structurées dans un seul fichier : ce qu’est Factur-X, ce qu’il contient et comment s’y préparer avant septembre 2027.',
    keywords: ['Factur-X', 'Factur-X artisan', 'format facture électronique', 'facture électronique EN 16931'],
    publishedAt: '2026-10-22',
    readingMinutes: 5,
    summary: [
      'Factur-X est un format de facture électronique : un PDF lisible (PDF/A-3) qui contient un fichier XML avec les données de la facture.',
      'C’est l’un des trois formats de base acceptés par la réforme française, avec UBL et CII.',
      'Le profil EN 16931 couvre toutes les données de la norme européenne : c’est le plus sûr pour une facture entre professionnels.',
      'Le format ne suffit pas : à partir de septembre 2027, les TPE transmettront leurs factures entre professionnels via une plateforme agréée.',
    ],
    links: [
      { label: 'Facture électronique Factur-X avec Paysapro AI', to: '/logiciel-facture-electronique' },
      { label: 'Facture électronique : ce qui change en 2026-2027', to: '/blog/facturation-electronique-artisans' },
      { label: 'Mentions obligatoires d’une facture d’artisan', to: '/blog/mentions-obligatoires-facture-artisan' },
    ],
    body: [
      {
        paragraphs: [
          'Avec la réforme de la facturation électronique, un mot revient souvent : Factur-X. Pour un artisan, la bonne nouvelle est que ce format ressemble beaucoup à ce que vous connaissez déjà. Voici ce qu’il faut en retenir, sans jargon.',
        ],
      },
      {
        heading: 'Un PDF… avec les données dedans',
        paragraphs: [
          'Une facture Factur-X est un fichier PDF que tout le monde peut ouvrir et imprimer. La différence est invisible : le PDF respecte la norme d’archivage PDF/A-3 et contient, en pièce jointe interne, un fichier XML qui décrit la facture ligne par ligne.',
          'Le PDF est fait pour les humains, le XML pour les logiciels. Le logiciel comptable de votre client professionnel lit directement le montant, la TVA, l’échéance et vos coordonnées bancaires, sans ressaisie ni erreur de lecture.',
        ],
      },
      {
        heading: 'Les profils : pourquoi choisir EN 16931',
        paragraphs: [
          'Factur-X existe en plusieurs niveaux de détail, appelés profils : MINIMUM, BASIC WL, BASIC, EN 16931 et EXTENDED. Les plus légers ne décrivent pas les lignes de la facture et ne suffisent pas à remplacer la facture papier.',
          'Le profil EN 16931 reprend l’ensemble des informations de la norme européenne de facturation électronique : c’est le choix le plus sûr pour une facture d’artisan entre professionnels.',
        ],
      },
      {
        heading: 'Ce qu’une facture Factur-X contient',
        list: [
          'Le numéro, la date et le type du document : facture, facture d’acompte ou avoir.',
          'Le vendeur et le client : nom, SIREN, numéro de TVA intracommunautaire, adresse.',
          'Chaque ligne : désignation, quantité, unité, prix unitaire et taux de TVA.',
          'Le récapitulatif de TVA par taux, ou le motif d’exonération (franchise en base, autoliquidation).',
          'Les totaux, les acomptes déjà réglés, le net à payer, l’échéance et l’IBAN.',
          'Pour un avoir, la référence de la facture annulée.',
        ],
      },
      {
        heading: 'Format et plateforme : deux choses différentes',
        paragraphs: [
          'Avoir des factures au bon format ne suffit pas pour la réforme. À partir du 1er septembre 2027, les TPE et micro-entreprises devront émettre leurs factures entre professionnels via une plateforme agréée par l’administration, qui les transmet au client et déclare les données au fisc. Depuis le 1er septembre 2026, toutes les entreprises doivent déjà pouvoir en recevoir.',
          'Pour les clients particuliers, la facture reste un PDF envoyé comme aujourd’hui ; ses données font l’objet d’un e-reporting. Les dates ci-dessus sont celles annoncées à ce jour : vérifiez-les auprès de l’administration fiscale ou de votre expert-comptable.',
        ],
      },
      {
        heading: 'Comment s’y préparer',
        list: [
          'Vérifiez que votre logiciel de facturation produit du Factur-X (ou de l’UBL / du CII), au profil EN 16931.',
          'Renseignez votre SIRET et, pour chaque client professionnel, son SIREN : il sert à adresser la facture sur les plateformes.',
          'Choisissez une plateforme agréée pour recevoir les factures de vos fournisseurs, si ce n’est pas déjà fait.',
          'Gardez une numérotation continue et corrigez les erreurs par un avoir, jamais en modifiant une facture émise.',
        ],
      },
      {
        heading: 'Factur-X dans Paysapro AI',
        paragraphs: [
          'Dans Paysapro AI, le bouton PDF de chaque facture produit directement un fichier Factur-X au profil EN 16931, contrôlé avec un outil de validation de référence du format. Le raccordement à une plateforme agréée est en préparation pour l’échéance de septembre 2027.',
        ],
      },
    ],
  },
  {
    slug: 'facture-acompte-travaux',
    title: 'Facture d’acompte travaux : mode d’emploi',
    excerpt: 'Quand émettre une facture d’acompte, ce qu’elle contient, comment gérer la TVA et comment la déduire de la facture de solde.',
    keywords: ['facture d’acompte travaux', 'facture acompte artisan', 'facture de solde acompte déduit'],
    publishedAt: '2026-10-22',
    readingMinutes: 5,
    summary: [
      'La facture d’acompte se fait sur la base du devis signé, pour le pourcentage demandé à la commande.',
      'Pour des travaux (prestations de services), la TVA est due à l’encaissement : l’acompte reçu porte sa part de TVA.',
      'La facture de solde reprend tout le devis et déduit les acomptes déjà facturés : le client ne paie que le reste.',
      'Chaque facture d’acompte a son propre numéro, dans la même séquence continue que vos autres factures.',
    ],
    links: [
      { label: 'Devis et factures pour artisans', to: '/logiciel-facturation-artisan' },
      { label: 'Mentions obligatoires d’une facture', to: '/blog/mentions-obligatoires-facture-artisan' },
      { label: 'Numérotation des factures et avoirs', to: '/blog/numerotation-factures-avoir' },
    ],
    body: [
      {
        paragraphs: [
          'Demander un acompte à la signature est courant dans le bâtiment : il couvre l’achat des matériaux et engage le client. Encore faut-il le facturer correctement, puis le déduire à la fin du chantier.',
        ],
      },
      {
        heading: 'Quand faire une facture d’acompte ?',
        paragraphs: [
          'Dès que vous demandez ou encaissez un acompte sur un devis accepté. La facture d’acompte reprend la référence du devis, le pourcentage ou le montant demandé, et la TVA correspondante.',
          'Pour une prestation de services comme des travaux, la TVA est exigible à l’encaissement, sauf si vous avez opté pour la TVA sur les débits : l’acompte encaissé entraîne donc le paiement de la TVA sur ce montant.',
        ],
      },
      {
        heading: 'Que contient-elle ?',
        list: [
          'Les mentions habituelles d’une facture : numéro, date, vos coordonnées, celles du client.',
          'La référence du devis concerné et le pourcentage facturé.',
          'Le montant hors taxes, la TVA par taux et le total TTC de l’acompte.',
          'Si le devis mélange plusieurs taux (10 % et 5,5 % par exemple), l’acompte est réparti au prorata de chaque taux.',
        ],
      },
      {
        heading: 'La facture de solde',
        paragraphs: [
          'À la fin des travaux, la facture de solde reprend l’ensemble des prestations du devis, avec le total HT, la TVA et le total TTC. Elle déduit ensuite les acomptes déjà facturés, en rappelant leur numéro : le « net à payer » correspond à ce qu’il reste à régler.',
        ],
      },
      {
        heading: 'Avec Paysapro AI',
        paragraphs: [
          'Sur un devis signé, le bouton « Facture d’acompte » demande simplement le pourcentage : la facture est créée, ventilée par taux de TVA, numérotée et prête en PDF. À la fin du chantier, « Facture de solde » reprend tout le devis et déduit automatiquement les acomptes.',
        ],
      },
    ],
  },
  {
    slug: 'mentions-obligatoires-facture-artisan',
    title: 'Mentions obligatoires d’une facture d’artisan',
    excerpt: 'La liste des informations à faire figurer sur une facture de travaux, y compris les nouvelles mentions liées à la facture électronique.',
    keywords: ['mentions obligatoires facture', 'facture artisan obligatoire', 'nouvelles mentions facture 2026'],
    publishedAt: '2026-10-22',
    readingMinutes: 5,
    summary: [
      'Une facture porte un numéro unique dans une séquence continue, une date, l’identité complète du vendeur et du client.',
      'Elle détaille les prestations, les prix unitaires hors taxes, la TVA par taux et les totaux.',
      'Elle indique la date d’échéance, les pénalités de retard et, entre professionnels, l’indemnité forfaitaire de 40 €.',
      'Avec la réforme de la facture électronique, de nouvelles mentions s’ajoutent : SIREN du client, catégorie de l’opération, adresse de livraison si elle diffère, option pour la TVA sur les débits.',
    ],
    links: [
      { label: 'Devis et factures pour artisans', to: '/logiciel-facturation-artisan' },
      { label: 'Facture électronique : ce qui change en 2026-2027', to: '/blog/facturation-electronique-artisans' },
      { label: 'Mentions obligatoires d’un devis de travaux', to: '/blog/mentions-obligatoires-devis-travaux' },
    ],
    body: [
      {
        paragraphs: [
          'Une mention manquante ou inexacte peut coûter cher : l’administration peut appliquer une amende de 15 € par mention, plafonnée au quart du montant de la facture. Voici la liste à vérifier. Faites valider votre modèle par votre expert-comptable.',
        ],
      },
      {
        heading: 'Le document',
        list: [
          'Le mot « Facture » (ou « Avoir »).',
          'Un numéro unique, dans une séquence chronologique et continue.',
          'La date d’émission et la date de réalisation des travaux.',
        ],
      },
      {
        heading: 'Votre entreprise',
        list: [
          'Nom ou raison sociale, forme juridique et capital pour une société, adresse.',
          'SIREN ou SIRET, immatriculation au répertoire des métiers ou au RCS.',
          'Numéro de TVA intracommunautaire, ou la mention de franchise de TVA.',
          'Dans le bâtiment : l’assurance décennale (assureur, coordonnées, couverture géographique).',
        ],
      },
      {
        heading: 'Le client',
        list: [
          'Nom et adresse de facturation.',
          'Pour un client professionnel : son numéro de TVA intracommunautaire s’il en a un, et son SIREN.',
          'L’adresse du chantier si elle diffère.',
        ],
      },
      {
        heading: 'Les montants',
        list: [
          'Pour chaque prestation : désignation, quantité, prix unitaire hors taxes.',
          'Les réductions éventuelles.',
          'Le taux de TVA de chaque ligne, le montant de TVA par taux, le total HT et le total TTC.',
          'Les acomptes déjà facturés, déduits sur la facture de solde.',
          'Selon les cas : TVA non applicable (article 293 B du CGI), autoliquidation, ou certification du client pour le taux réduit.',
        ],
      },
      {
        heading: 'Le paiement',
        list: [
          'La date d’échéance du paiement.',
          'Le taux des pénalités de retard.',
          'Entre professionnels : l’indemnité forfaitaire de 40 € pour frais de recouvrement.',
          'Les conditions d’escompte, ou la mention « pas d’escompte pour paiement anticipé ».',
        ],
      },
      {
        heading: 'Les nouvelles mentions de la réforme',
        paragraphs: [
          'Avec la généralisation de la facture électronique, quatre mentions s’ajoutent : le SIREN du client, la catégorie de l’opération (livraison de biens, prestation de services ou les deux), l’adresse de livraison si elle diffère de celle du client, et l’option pour le paiement de la TVA d’après les débits si vous l’avez choisie.',
        ],
      },
      {
        heading: 'Avec Paysapro AI',
        paragraphs: [
          'Les factures reprennent automatiquement ces mentions à partir de votre fiche entreprise, du client et du devis signé : numérotation continue, TVA par taux, décennale, échéance, pénalités, SIREN du client professionnel et catégorie de l’opération.',
        ],
      },
    ],
  },
  {
    slug: 'numerotation-factures-avoir',
    title: 'Numérotation des factures et avoirs : les règles',
    excerpt: 'Séquence continue, pas de trou, pas de suppression : comment numéroter ses factures et corriger une erreur avec un avoir.',
    keywords: ['numérotation factures', 'avoir facture erreur', 'annuler une facture artisan'],
    publishedAt: '2026-10-22',
    readingMinutes: 4,
    summary: [
      'Les factures sont numérotées dans une séquence chronologique et continue, sans trou ni doublon.',
      'Plusieurs séries sont possibles (par exemple une par année : F2026-0001), à condition que chacune reste continue.',
      'Une facture émise ne se modifie pas et ne se supprime pas.',
      'Pour corriger une erreur, on émet un avoir qui annule la facture, puis une nouvelle facture.',
    ],
    links: [
      { label: 'Devis et factures pour artisans', to: '/logiciel-facturation-artisan' },
      { label: 'Mentions obligatoires d’une facture', to: '/blog/mentions-obligatoires-facture-artisan' },
      { label: 'Facture d’acompte : mode d’emploi', to: '/blog/facture-acompte-travaux' },
    ],
    body: [
      {
        paragraphs: [
          'La numérotation est la colonne vertébrale de votre facturation. En cas de contrôle, un trou dans la séquence ou une facture supprimée attire immédiatement l’attention.',
        ],
      },
      {
        heading: 'Une séquence continue',
        paragraphs: [
          'Chaque facture reçoit un numéro unique, attribué dans l’ordre chronologique. Vous pouvez utiliser des séries distinctes, par exemple en préfixant par l’année (F2026-0001, puis F2027-0001 au 1er janvier), mais chaque série doit rester continue.',
        ],
      },
      {
        heading: 'Pourquoi une facture ne se supprime pas',
        paragraphs: [
          'Une facture émise est une pièce comptable : elle doit être conservée dix ans. La supprimer ou la modifier après l’avoir envoyée casserait la séquence et l’historique.',
        ],
      },
      {
        heading: 'Corriger avec un avoir',
        list: [
          'L’avoir est une facture « négative » qui reprend la facture d’origine et l’annule, en totalité ou en partie.',
          'Il porte son propre numéro dans la séquence et fait référence à la facture annulée.',
          'Vous émettez ensuite une nouvelle facture, corrigée.',
        ],
      },
      {
        heading: 'Avec Paysapro AI',
        paragraphs: [
          'Le numéro est attribué automatiquement au moment de l’émission, dans une séquence continue propre à votre entreprise, même si plusieurs personnes facturent en même temps. Une facture émise ne peut plus être modifiée ni supprimée : le bouton « Annuler cette facture par un avoir » crée l’avoir en un clic.',
        ],
      },
    ],
  },
  {
    slug: 'tva-travaux-renovation-taux-reduit',
    title: 'TVA travaux : 20 %, 10 % ou 5,5 % sur un devis ?',
    excerpt: 'Quel taux appliquer sur un devis de rénovation, comment combiner 10 % et 5,5 %, et ce qui remplace les attestations 1300-SD depuis 2025.',
    keywords: ['tva travaux rénovation', 'tva 10 % travaux', 'tva 5,5 % rénovation énergétique', 'attestation tva travaux'],
    publishedAt: '2026-10-21',
    readingMinutes: 6,
    summary: [
      'Les travaux dans un logement achevé depuis plus de deux ans relèvent en général du taux de 10 %, et les travaux d’amélioration énergétique du taux de 5,5 %.',
      'La construction neuve, les agrandissements importants et les locaux professionnels restent au taux normal de 20 %.',
      'Un même devis peut mélanger les taux : chaque ligne porte le sien, avec un récapitulatif de TVA par taux.',
      'Depuis le 16 février 2025, les attestations 1300-SD et 1301-SD sont supprimées : le client certifie les conditions par une mention portée sur le devis ou la facture.',
    ],
    links: [
      { label: 'Paysapro AI pour les artisans du BTP', to: '/logiciel-devis-batiment' },
      { label: 'Mentions obligatoires d’un devis de travaux', to: '/blog/mentions-obligatoires-devis-travaux' },
      { label: 'Tarifs', to: '/tarifs' },
    ],
    body: [
      {
        paragraphs: [
          'Appliquer le bon taux de TVA est l’une des questions les plus fréquentes sur un devis de travaux. Une erreur coûte cher : en cas de contrôle, l’entreprise peut devoir payer elle-même le complément de TVA. Voici les règles générales à connaître, à confirmer avec votre comptable pour les cas particuliers.',
        ],
      },
      {
        heading: 'Le taux normal de 20 %',
        paragraphs: [
          'Le taux de 20 % s’applique par défaut : construction neuve, travaux qui aboutissent à la production d’un immeuble neuf, agrandissements qui augmentent la surface de plancher de plus de 10 %, travaux dans des locaux professionnels, et logements achevés depuis moins de deux ans.',
          'Certains équipements fournis sans pose, ou des équipements dits « de confort » selon leur nature, peuvent aussi rester à 20 % même dans un logement ancien.',
        ],
      },
      {
        heading: 'Le taux intermédiaire de 10 %',
        paragraphs: [
          'Les travaux d’amélioration, de transformation, d’aménagement et d’entretien portant sur des locaux à usage d’habitation achevés depuis plus de deux ans relèvent du taux de 10 %, à condition qu’ils ne produisent pas un immeuble neuf et n’augmentent pas la surface de plancher de plus de 10 %.',
          'C’est le cas typique d’une rénovation de salle de bains, d’une remise en peinture, d’un remplacement de tableau électrique ou d’une réfection de toiture chez un particulier.',
        ],
      },
      {
        heading: 'Le taux réduit de 5,5 %',
        paragraphs: [
          'Le taux de 5,5 % vise les travaux d’amélioration de la qualité énergétique dans les mêmes logements de plus de deux ans : isolation thermique, certains équipements de chauffage ou de production d’eau chaude performants, ainsi que les travaux induits qui leur sont indissociablement liés. Les critères techniques des matériaux et équipements doivent être respectés.',
        ],
      },
      {
        heading: 'Plusieurs taux dans le même devis',
        paragraphs: [
          'Une rénovation mélange souvent les taux : l’isolation des combles à 5,5 %, le reste des travaux à 10 %. Le devis doit alors indiquer le taux de chaque ligne et un récapitulatif de la TVA par taux, pour que le total TTC soit exact et vérifiable.',
        ],
      },
      {
        heading: 'Fin des attestations 1300-SD et 1301-SD',
        list: [
          'Depuis le 16 février 2025 (loi de finances pour 2025), le client n’a plus à remplir les formulaires d’attestation 1300-SD ou 1301-SD.',
          'Il certifie désormais, par une mention portée sur le devis, la facture ou le contrat, que le logement est achevé depuis plus de deux ans, qu’il est affecté à l’habitation et que les travaux ne produisent pas un immeuble neuf.',
          'L’entreprise reste responsable de la nature des travaux et des critères techniques des équipements.',
          'Le client conserve le devis et les factures jusqu’au 31 décembre de la cinquième année suivant les travaux ; l’entreprise les garde avec sa comptabilité.',
        ],
      },
      {
        heading: 'Dans Paysapro AI',
        paragraphs: [
          'En mode « Artisan du BTP », vous choisissez le type de chantier : neuf ou local professionnel, rénovation d’un logement de plus de deux ans, ou rénovation énergétique. Chaque ligne peut avoir son propre taux, le devis affiche un récapitulatif par taux et ajoute la mention de certification du client, validée par sa signature.',
        ],
      },
    ],
  },
  {
    slug: 'mentions-obligatoires-devis-travaux',
    title: 'Mentions obligatoires d’un devis de travaux en 2026',
    excerpt: 'La liste des informations à faire figurer sur un devis du bâtiment : entreprise, assurance, client, prestations, prix, délais et conditions.',
    keywords: ['mentions obligatoires devis', 'devis travaux mentions', 'devis artisan obligatoire', 'modèle devis bâtiment'],
    publishedAt: '2026-10-21',
    readingMinutes: 5,
    summary: [
      'Un devis de travaux identifie l’entreprise (nom, adresse, SIRET, immatriculation, n° de TVA) et le client.',
      'Il décrit précisément les travaux avec quantités, prix unitaires, totaux HT, TVA et TTC.',
      'Dans le bâtiment, l’assurance décennale doit être mentionnée : assureur, coordonnées et couverture géographique.',
      'Il précise la date, la durée de validité, les délais, les conditions de paiement et, pour un particulier démarché, le droit de rétractation.',
    ],
    links: [
      { label: 'TVA des travaux : 20 %, 10 % ou 5,5 %', to: '/blog/tva-travaux-renovation-taux-reduit' },
      { label: 'L’assurance décennale sur le devis', to: '/blog/assurance-decennale-devis' },
      { label: 'Paysapro AI pour les artisans du BTP', to: '/logiciel-devis-batiment' },
    ],
    body: [
      {
        paragraphs: [
          'Un devis signé engage les deux parties : c’est un contrat. Plus il est complet, moins il laisse de place aux litiges. Voici les informations qu’on attend d’un devis de travaux du bâtiment. Les règles exactes dépendent de votre statut et de votre clientèle : faites valider votre modèle par votre conseiller.',
        ],
      },
      {
        heading: 'L’entreprise',
        list: [
          'Nom ou raison sociale, forme juridique et adresse.',
          'Numéro SIRET et immatriculation (répertoire des métiers ou RCS).',
          'Numéro de TVA intracommunautaire, ou la mention de franchise de TVA pour une micro-entreprise.',
          'Assurance décennale (et responsabilité civile professionnelle) : nom et coordonnées de l’assureur, couverture géographique.',
          'Qualifications éventuelles (RGE, Qualibat…), utiles notamment pour les aides à la rénovation.',
        ],
      },
      {
        heading: 'Le client et le chantier',
        list: [
          'Nom et adresse du client.',
          'Adresse du chantier si elle est différente.',
          'Date du devis et numéro.',
        ],
      },
      {
        heading: 'Les travaux et les prix',
        list: [
          'Le détail des prestations, avec quantités, unités et prix unitaires hors taxes.',
          'Les fournitures et la main-d’œuvre, et les éventuels frais de déplacement.',
          'Le total hors taxes, le taux et le montant de la TVA, le total TTC.',
          'Le caractère gratuit ou payant du devis.',
        ],
      },
      {
        heading: 'Délais et conditions',
        list: [
          'La durée de validité de l’offre.',
          'La date de début et la durée estimée des travaux.',
          'Les conditions de paiement : acompte, échéances, solde.',
          'Pour un particulier, en cas de contrat conclu hors établissement : les informations sur le droit de rétractation de 14 jours.',
          'Pour un particulier : les coordonnées du médiateur de la consommation.',
        ],
      },
      {
        heading: 'Les mentions selon le chantier',
        paragraphs: [
          'Selon les cas, d’autres mentions s’ajoutent : la certification du client pour la TVA à taux réduit, l’autoliquidation de la TVA en sous-traitance, ou la retenue de garantie dans un marché avec un professionnel.',
        ],
      },
      {
        heading: 'Avec Paysapro AI',
        paragraphs: [
          'Vous renseignez une fois l’identité de l’entreprise, l’assurance décennale et vos qualifications : elles apparaissent automatiquement sur chaque devis, avec les dates, la TVA par taux et vos conditions. Le client signe en ligne, et le devis signé reste attaché au chantier.',
        ],
      },
    ],
  },
  {
    slug: 'assurance-decennale-devis',
    title: 'Assurance décennale : que mettre sur le devis ?',
    excerpt: 'Ce qu’un artisan du bâtiment doit indiquer sur ses devis et factures au sujet de son assurance décennale, et pourquoi c’est important.',
    keywords: ['assurance décennale devis', 'mention décennale devis', 'garantie décennale artisan'],
    publishedAt: '2026-10-21',
    readingMinutes: 4,
    summary: [
      'Les entreprises du bâtiment soumises à l’assurance décennale doivent la mentionner sur leurs devis et factures.',
      'Il faut indiquer le nom et les coordonnées de l’assureur, et la couverture géographique du contrat.',
      'Ajouter le numéro de contrat rassure le client et facilite ses vérifications.',
      'Vérifiez que les activités assurées correspondent bien aux travaux du devis.',
    ],
    links: [
      { label: 'Factur-X expliqué aux artisans', to: '/blog/factur-x-artisan' },
      { label: 'Facture électronique Factur-X avec Paysapro AI', to: '/logiciel-facture-electronique' },
      { label: 'Mentions obligatoires d’un devis de travaux', to: '/blog/mentions-obligatoires-devis-travaux' },
    ],
    body: [
      {
        paragraphs: [
          'La garantie décennale couvre pendant dix ans les dommages qui compromettent la solidité d’un ouvrage ou le rendent impropre à sa destination. Pour les entreprises concernées, l’assurance est obligatoire, et elle doit apparaître sur les documents remis au client.',
        ],
      },
      {
        heading: 'Les informations à faire figurer',
        list: [
          'Le nom de l’assureur (ou du garant).',
          'Ses coordonnées.',
          'La couverture géographique du contrat ou de la garantie.',
          'De préférence, le numéro de contrat.',
        ],
      },
      {
        heading: 'Pourquoi c’est important',
        paragraphs: [
          'Pour le client, c’est une garantie de sérieux et une protection en cas de sinistre. Pour l’entreprise, l’absence de ces mentions expose à des sanctions et fragilise sa position en cas de litige.',
          'Pensez aussi à vérifier que les activités déclarées à votre assureur couvrent bien les travaux proposés : une décennale « plâtrerie » ne couvre pas forcément des travaux de charpente.',
        ],
      },
      {
        heading: 'Une attestation à jour',
        paragraphs: [
          'Le client peut demander l’attestation d’assurance de l’année en cours. Gardez-la à portée de main, par exemple en PDF sur votre téléphone, pour l’envoyer avec le devis.',
        ],
      },
      {
        heading: 'Avec Paysapro AI',
        paragraphs: [
          'Dans « Mon entreprise », vous renseignez l’assureur, ses coordonnées, le numéro de contrat et la couverture géographique. Ces informations sont reprises automatiquement dans les mentions de chaque devis et de son PDF.',
        ],
      },
    ],
  },
  {
    slug: 'facturation-electronique-artisans',
    title: 'Facture électronique : ce qui change en 2026-2027',
    excerpt: 'Réception dès septembre 2026, émission en septembre 2027 pour les TPE : le calendrier de la réforme et comment s’y préparer.',
    keywords: ['facturation électronique artisan', 'facture électronique 2026', 'facture électronique 2027 TPE'],
    publishedAt: '2026-10-21',
    updatedAt: '2026-10-22',
    readingMinutes: 4,
    summary: [
      'Depuis le 1er septembre 2026, toutes les entreprises, artisans compris, doivent pouvoir recevoir des factures électroniques.',
      'Les TPE et micro-entreprises devront les émettre à partir du 1er septembre 2027, avec la transmission de données à l’administration (e-reporting).',
      'Les factures passent par une plateforme agréée ; un simple PDF envoyé par e-mail ne suffira plus entre professionnels.',
      'Le devis n’est pas concerné : il reste un document libre, que vous pouvez continuer à établir et faire signer comme aujourd’hui.',
    ],
    links: [
      { label: 'Mentions obligatoires d’un devis de travaux', to: '/blog/mentions-obligatoires-devis-travaux' },
      { label: 'Paysapro AI pour les artisans du BTP', to: '/logiciel-devis-batiment' },
    ],
    body: [
      {
        paragraphs: [
          'La généralisation de la facturation électronique entre entreprises est en cours en France. Beaucoup d’artisans pensent devoir tout changer dès 2026 : en réalité, le calendrier est progressif. Les dates ci-dessous sont celles annoncées à ce jour ; vérifiez-les auprès de l’administration fiscale ou de votre expert-comptable.',
        ],
      },
      {
        heading: 'Le calendrier',
        list: [
          '1er septembre 2026 : toutes les entreprises doivent être en mesure de recevoir des factures électroniques, y compris les micro-entreprises en franchise de TVA.',
          '1er septembre 2026 : les grandes entreprises et les ETI doivent les émettre.',
          '1er septembre 2027 : les PME, TPE et micro-entreprises doivent à leur tour émettre leurs factures au format électronique et transmettre leurs données (e-reporting).',
        ],
      },
      {
        heading: 'Ce que ça change concrètement',
        paragraphs: [
          'Les factures entre professionnels transiteront par une plateforme de dématérialisation agréée, dans un format structuré. Pour recevoir les factures de vos fournisseurs, il faut dès maintenant avoir choisi une plateforme, souvent proposée par votre banque, votre logiciel de comptabilité ou votre expert-comptable.',
          'Les ventes aux particuliers ne sont pas des factures électroniques au sens de la réforme, mais leurs données font l’objet d’un e-reporting.',
        ],
      },
      {
        heading: 'Et les devis ?',
        paragraphs: [
          'Le devis n’entre pas dans la réforme : vous pouvez continuer à l’établir, l’envoyer et le faire signer en ligne. C’est la facture émise après les travaux qui devra suivre le nouveau circuit.',
        ],
      },
      {
        heading: 'Où se situe Paysapro AI',
        paragraphs: [
          'Paysapro AI établit vos factures d’acompte, de solde et vos avoirs directement depuis le devis signé, avec une numérotation continue et les mentions obligatoires. Chaque facture est déjà produite au format électronique Factur-X (profil EN 16931). Le raccordement à une plateforme agréée est en préparation pour l’échéance de septembre 2027 : vos factures, clients et chantiers sont déjà au bon endroit.',
        ],
      },
    ],
  },
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
    title: 'Attestation fiscale SAP jardinage : le guide',
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
          'Le meilleur test reste de refaire un devis récent avec le logiciel : combien de temps faut-il, le résultat est-il présentable, le client comprend-il le document ? Une version d’essai gratuite permet de le faire sans risque.',
          'Paysapro AI est conçu autour de ces critères pour les paysagistes : mesures et unités du métier, usage sur téléphone, catalogue de prix, devis signé en ligne, factures d’acompte et de solde, et mode services à la personne. Il ne tient pas votre comptabilité. Il s’essaie gratuitement pendant 15 jours.',
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
