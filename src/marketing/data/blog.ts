/**
 * Blog — articles pratiques pour les paysagistes et les artisans du bâtiment (référencement naturel).
 * Publier un article : renseigner `publishedAt` et `body`. Il apparaît alors automatiquement
 * (un `publishedAt` futur programme la parution : l'article reste « À paraître » jusqu'au build de ce jour-là)
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
    excerpt: 'Les éléments indispensables d’un devis paysagiste clair : métrés, prestations, main-d’œuvre, TVA, acompte et conditions, avec un exemple chiffré.',
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
    excerpt: 'Méthode simple pour mesurer une terrasse en m², y compris les formes irrégulières (L, cercle, triangle), et en déduire les matériaux à commander.',
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
    excerpt: 'Mètres linéaires, poteaux, panneaux, portail, terrassement et pose : la méthode pour chiffrer une clôture sans oublier de poste sur le devis.',
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
    excerpt: 'Services à la personne et jardinage : à quoi sert l’attestation fiscale annuelle, ce qu’elle contient et comment la préparer sans y passer vos soirées.',
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
      { label: 'Comparatif 2026 des logiciels de devis pour paysagistes', to: '/comparatif-logiciel-devis-paysagiste' },
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
    excerpt: 'Catalogue de prestations, modèles, photos rangées : organiser sa préparation commerciale pour chiffrer plus vite sans perdre en précision.',
    keywords: ['application paysagiste', 'logiciel gestion paysagiste'],
    publishedAt: '2026-10-30',
    readingMinutes: 6,
    links: [
      { label: 'Comment faire un devis paysagiste ?', to: '/blog/comment-faire-un-devis-paysagiste' },
      { label: 'L’application de chantier du paysagiste', to: '/application-paysagiste' },
      { label: 'Calculateurs gratuits : surface, volume, clôture', to: '/outils' },
    ],
    summary: [
      'Le temps perdu sur un devis vient surtout des ressaisies : prix recherchés, mesures recopiées, textes réécrits.',
      'Un catalogue de prestations à jour et quelques modèles de devis suppriment l’essentiel de ce travail répétitif.',
      'Prendre photos et mesures de façon méthodique sur place, puis envoyer le devis rapidement, raccourcit tout le cycle de vente.',
    ],
    body: [
      {
        paragraphs: [
          'Beaucoup de paysagistes font leurs devis le soir, après la journée de chantier. Une heure par devis, parfois plus, multipliée par le nombre de visites de la semaine : la préparation commerciale finit par prendre une soirée sur deux.',
          'Pourtant, en regardant de près où passe ce temps, on retrouve presque toujours les mêmes causes. Bonne nouvelle : elles se corrigent avec un peu d’organisation, une fois pour toutes.',
        ],
      },
      {
        heading: 'Où passe vraiment le temps d’un devis ?',
        paragraphs: ['Rarement dans le calcul lui-même. Le temps se perd plutôt :'],
        list: [
          'à chercher un prix dans un ancien devis ou un tarif fournisseur ;',
          'à recopier les mesures notées sur un carnet ou au dos d’une enveloppe ;',
          'à réécrire les mêmes désignations et les mêmes conditions à chaque fois ;',
          'à retrouver les photos du chantier au milieu de celles du téléphone ;',
          'à remettre en page le document pour qu’il soit présentable.',
        ],
      },
      {
        heading: '1. Construire son catalogue de prestations',
        paragraphs: [
          'C’est le levier le plus efficace. Listez les prestations que vous chiffrez le plus souvent : tonte, taille de haie, engazonnement, pose de clôture, dallage, plantation, évacuation des déchets verts. Pour chacune, fixez une désignation claire, une unité (m², mètre linéaire, m³, heure, unité, forfait) et votre prix de vente.',
          'Ajoutez votre coût interne : fournitures et temps passé. Vous verrez ainsi votre marge ligne par ligne, et vous saurez immédiatement si une remise demandée par un client reste raisonnable.',
          'Un catalogue n’a pas besoin d’être parfait le premier jour. Commencez par une vingtaine de lignes, puis complétez-le au fil des devis : chaque nouvelle prestation chiffrée une fois n’aura plus à l’être.',
        ],
      },
      {
        heading: '2. Préparer des modèles pour les chantiers types',
        paragraphs: [
          'Une création de pelouse, une terrasse, une clôture ou un contrat d’entretien se ressemblent d’un client à l’autre. Enregistrez pour chacun un modèle avec les lignes habituelles : préparation du sol, fournitures, pose, évacuation. Il ne reste alors qu’à ajuster les quantités et à retirer ce qui ne s’applique pas.',
          'Faites de même pour les textes : description des travaux, conditions de paiement, durée de validité, mention sur les quantités estimées. Rédigés une fois avec soin, ils seront repris sur chaque devis.',
        ],
      },
      {
        heading: '3. Prendre les bonnes informations sur place',
        paragraphs: [
          'Un devis rapide se prépare pendant la visite. Suivez toujours le même ordre : vue d’ensemble du jardin, puis chaque zone de travaux, puis les contraintes (accès, pente, portail, réseaux visibles). Mesurez chaque surface et chaque linéaire, et notez-les directement à côté de la photo correspondante.',
          'Pour les formes compliquées, découpez-les en rectangles, triangles et cercles. Un calculateur de surface ou de volume sur le téléphone évite les erreurs de calcul mental au milieu du jardin.',
        ],
      },
      {
        heading: '4. Chiffrer pendant que le projet est frais',
        paragraphs: [
          'Plus le devis attend, plus il prend de temps : il faut se remémorer le terrain, retrouver les notes, revoir les photos. Quand c’est possible, préparez au moins une première version le jour même, voire dans la voiture après le rendez-vous.',
          'C’est aussi un argument commercial : un client qui reçoit son devis le lendemain de la visite a un projet encore précis en tête, et il compare souvent moins.',
        ],
      },
      {
        heading: '5. Envoyer et relancer sans y passer la journée',
        paragraphs: [
          'Un devis envoyé en PDF par e-mail se perd facilement. Un lien que le client ouvre sur son téléphone, avec la possibilité d’accepter et de signer directement, raccourcit le délai de réponse. Savoir quand le devis a été consulté permet aussi de relancer au bon moment plutôt qu’au hasard.',
        ],
      },
      {
        heading: 'Ce qu’il ne faut pas sacrifier',
        paragraphs: [
          'Aller plus vite ne doit pas rendre le devis moins précis. Gardez le détail poste par poste, signalez clairement les quantités estimées et vérifiez les mentions obligatoires. Le temps gagné sur la ressaisie est justement celui qui permet de soigner ces points.',
          'Paysapro AI est construit autour de cette organisation : catalogue avec prix de vente et coût, modèles de devis, photos et mesures prises sur le chantier qui alimentent directement les lignes du devis, puis envoi d’un lien que le client signe en ligne.',
        ],
      },
    ],
  },
  {
    slug: 'organiser-ses-chantiers',
    title: 'Comment organiser ses chantiers ?',
    excerpt: 'Centraliser les informations de chaque chantier pour moins d’oublis, moins d’allers-retours et des clients mieux informés.',
    keywords: ['logiciel chantier paysagiste'],
    publishedAt: '2026-10-30',
    readingMinutes: 6,
    links: [
      { label: 'Le logiciel de gestion pour paysagistes', to: '/logiciel-gestion-paysagiste' },
      { label: 'Facture d’acompte : comment la faire ?', to: '/blog/facture-acompte-travaux' },
      { label: 'Comment ça marche', to: '/comment-ca-marche' },
    ],
    summary: [
      'Un chantier bien organisé tient dans un seul dossier : devis signé, photos, notes, matériel, paiements.',
      'La préparation se fait avant le premier jour : commande des fournitures, accès, déchets, planning de l’équipe.',
      'Des photos avant, pendant et après, et des statuts à jour, évitent les malentendus et facilitent la facturation.',
    ],
    body: [
      {
        paragraphs: [
          'Une fois le devis signé, le vrai travail commence. Et c’est souvent là que les petits oublis coûtent cher : une fourniture manquante qui impose un aller-retour, un accès mal anticipé, une précision du client notée quelque part mais introuvable le jour J.',
          'Organiser ses chantiers ne demande pas un outil compliqué. Il s’agit surtout de réunir les bonnes informations au même endroit et de suivre toujours la même méthode.',
        ],
      },
      {
        heading: '1. Un seul dossier par chantier',
        paragraphs: ['Pour chaque chantier, rassemblez au même endroit :'],
        list: [
          'les coordonnées du client et l’adresse exacte du chantier ;',
          'le devis signé, qui fait référence sur ce qui a été vendu ;',
          'les photos prises lors de la visite et les mesures relevées ;',
          'les notes internes : code du portail, contraintes d’accès, souhaits particuliers du client ;',
          'les paiements attendus et reçus : acompte, situations, solde.',
        ],
      },
      {
        paragraphs: [
          'Quand ces informations sont dispersées entre un carnet, des SMS, la galerie du téléphone et un tableur, chaque question du client ou de l’équipe devient une recherche. Centralisées, elles se retrouvent en quelques secondes, y compris par un collègue.',
        ],
      },
      {
        heading: '2. Préparer avant le premier jour',
        paragraphs: ['Quelques jours avant le démarrage, reprenez le devis ligne par ligne et vérifiez :'],
        list: [
          'les fournitures à commander et leurs délais de livraison ;',
          'le matériel à prévoir ou à louer, et son accès au chantier ;',
          'l’évacuation des déchets verts et des gravats prévue au devis ;',
          'la date confirmée avec le client et les personnes mobilisées ;',
          'l’encaissement de l’acompte si vos conditions le prévoient.',
        ],
      },
      {
        paragraphs: [
          'Une liste de vérification propre à chaque type de chantier (engazonnement, terrasse, clôture, plantation) évite de repartir de zéro et réduit les oublis.',
        ],
      },
      {
        heading: '3. Planifier sans surcharger',
        paragraphs: [
          'Classez vos chantiers en trois groupes : à planifier, à venir et en cours. Cette vue simple suffit pour voir où en est la semaine et repérer les chantiers signés qui attendent encore une date.',
          'Gardez une marge pour les aléas : météo, retard de livraison, travaux plus longs que prévu. Un planning rempli à 100 % se décale au premier imprévu, et c’est souvent le client suivant qui en fait les frais.',
        ],
      },
      {
        heading: '4. Documenter le chantier en photos',
        paragraphs: [
          'Photographiez l’état initial avant de commencer, puis les étapes clés et le résultat final. Ces photos protègent l’entreprise en cas de contestation, montrent au client le travail réalisé, et alimentent votre communication : une galerie avant-après vaut mieux qu’un long discours.',
          'Prenez l’habitude de les classer dans le dossier du chantier au moment où vous les prenez. Triées plus tard, elles finissent rarement au bon endroit.',
        ],
      },
      {
        heading: '5. Tenir le client informé',
        paragraphs: [
          'Un client qui sait où en est son chantier pose moins de questions et fait davantage confiance. Prévenez-le de la date de démarrage, signalez rapidement tout imprévu qui modifie le devis, et faites valider par écrit les travaux supplémentaires avant de les réaliser.',
        ],
      },
      {
        heading: '6. Clôturer proprement',
        paragraphs: [
          'Le chantier n’est vraiment terminé qu’une fois la facture de solde émise et payée. Faites le tour du chantier avec le client, prenez les photos finales, notez les éventuelles réserves, puis facturez rapidement : plus la facture tarde, plus le paiement tarde aussi.',
          'Dans Paysapro AI, chaque chantier rassemble le client, le devis signé, les photos avant et après, les notes internes visibles uniquement par votre équipe, la liste de suivi des travaux et les paiements reçus, avec un planning qui distingue les chantiers à planifier, à venir, en cours et terminés.',
        ],
      },
    ],
  },
  {
    slug: 'presenter-un-devis-professionnel',
    title: 'Comment présenter un devis professionnel ?',
    excerpt: 'Mise en page, photos, conditions : ce qui rassure un client au moment de signer, et les erreurs qui font hésiter.',
    keywords: ['devis paysagiste logiciel'],
    publishedAt: '2026-10-30',
    readingMinutes: 6,
    links: [
      { label: 'Exemple de devis paysagiste commenté', to: '/modele-devis-paysagiste' },
      { label: 'Les mentions obligatoires d’un devis de travaux', to: '/blog/mentions-obligatoires-devis-travaux' },
      { label: 'Le logiciel de devis paysagiste', to: '/logiciel-devis-paysagiste' },
    ],
    summary: [
      'Le client juge le sérieux de l’entreprise sur la présentation du devis autant que sur son prix.',
      'Un devis rassurant est clair, détaillé poste par poste, illustré par des photos du chantier et lisible sur téléphone.',
      'Des conditions explicites (acompte, validité, délais, quantités estimées) et une signature simple facilitent la décision.',
    ],
    body: [
      {
        paragraphs: [
          'Face à deux devis de montant proche, un client choisit souvent celui qui lui inspire le plus confiance. Et cette confiance se construit en grande partie sur la présentation : un document clair donne l’image d’une entreprise organisée, un document brouillon fait craindre un chantier qui le sera aussi.',
          'Voici les éléments qui font la différence au moment de signer.',
        ],
      },
      {
        heading: '1. Une identité visible dès le premier coup d’œil',
        paragraphs: [
          'En haut du devis : votre logo, le nom de l’entreprise, vos coordonnées complètes et votre numéro SIRET. Utilisez toujours la même couleur et la même mise en page, sur le devis comme sur les factures. Cette cohérence paraît anodine, elle signale pourtant une entreprise installée.',
        ],
      },
      {
        heading: '2. Rappeler le projet du client',
        paragraphs: [
          'Avant le détail des prix, résumez le projet en quelques lignes : ce que le client souhaite, l’adresse du chantier et la nature des travaux. Le client vérifie ainsi que vous avez bien compris sa demande, et le devis se lit comme une réponse à son projet plutôt que comme une liste de prix.',
        ],
      },
      {
        heading: '3. Des photos du chantier',
        paragraphs: [
          'Quelques photos prises lors de la visite, idéalement annotées (zone de la future terrasse, clôture à remplacer), rendent le devis concret. Le client retrouve son jardin, comprend où chaque prestation s’applique, et le document se distingue nettement de ceux des concurrents.',
          'Choisissez deux à quatre photos parlantes plutôt que toute la galerie : le devis doit rester lisible.',
        ],
      },
      {
        heading: '4. Un détail compréhensible',
        paragraphs: ['Chaque ligne doit pouvoir être comprise sans explication orale :'],
        list: [
          'une désignation claire, sans abréviations internes ;',
          'une quantité et une unité cohérentes avec les mesures du chantier ;',
          'un prix unitaire et un total par ligne ;',
          'des regroupements par zone ou par étape quand le chantier est important ;',
          'les quantités estimées signalées comme telles, à confirmer avant travaux.',
        ],
      },
      {
        paragraphs: [
          'Évitez à l’inverse le forfait global sans détail : il oblige le client à vous faire confiance aveuglément, et rend toute discussion sur le prix plus difficile.',
        ],
      },
      {
        heading: '5. Des conditions claires',
        paragraphs: [
          'Le bas du devis compte autant que le haut. Indiquez sans ambiguïté le total HT, la TVA et le total TTC, le montant de l’acompte et le moment où il est dû, la durée de validité du devis, la période prévue pour les travaux et les conditions de paiement du solde. Ajoutez les mentions obligatoires propres à votre activité.',
          'Un client qui comprend exactement ce qu’il paie et quand hésite beaucoup moins à signer.',
        ],
      },
      {
        heading: '6. Lisible sur téléphone',
        paragraphs: [
          'La plupart des clients ouvrent leur devis sur leur smartphone. Un PDF minuscule qu’il faut zoomer dans tous les sens nuit à la lecture. Vérifiez votre devis sur un écran de téléphone : les totaux, les conditions et le bouton ou l’emplacement de signature doivent se trouver facilement.',
        ],
      },
      {
        heading: '7. Faciliter la signature',
        paragraphs: [
          'Imprimer, signer, scanner, renvoyer : chaque étape est une occasion de remettre la décision à plus tard. Proposer au client d’accepter et de signer en ligne, directement depuis le devis, supprime ces frictions.',
          'Paysapro AI applique ces principes à chaque devis : logo et couleur de l’entreprise, photos du chantier, détail des prestations issues de votre catalogue, totaux et conditions, PDF prêt à envoyer, et page en ligne où le client consulte le devis sur son téléphone, l’accepte et le signe.',
        ],
      },
    ],
  },
  {
    slug: 'comment-chiffrer-creation-pelouse',
    title: 'Comment chiffrer la création d’une pelouse ?',
    excerpt: 'Préparation du sol, apport de terre, semis ou gazon en rouleau, arrosage : les postes à prévoir pour un devis de pelouse juste et complet.',
    keywords: ['devis création pelouse', 'devis paysagiste'],
    publishedAt: '2026-11-03',
    readingMinutes: 6,
    links: [
      { label: 'Calculateur de surface gratuit', to: '/outils/calcul-surface' },
      { label: 'Combien de terre végétale commander ?', to: '/blog/calculer-terre-vegetale' },
      { label: 'Comment faire un devis paysagiste ?', to: '/blog/comment-faire-un-devis-paysagiste' },
    ],
    summary: [
      'Un devis de pelouse se construit à partir de la surface réelle, mesurée zone par zone, et de l’état du sol en place.',
      'Les postes oubliés coûtent le plus cher : désherbage, évacuation, apport de terre, nivellement, premier arrosage et première tonte.',
      'Précisez le choix entre semis et gazon en rouleau, la période de réalisation et ce qui reste à la charge du client après les travaux.',
    ],
    body: [
      {
        paragraphs: [
          'La création d’une pelouse paraît simple à chiffrer : une surface, un prix au mètre carré. En pratique, c’est l’un des devis où les écarts entre le prévu et le réalisé sont les plus fréquents, parce que le résultat dépend surtout de ce qui se passe sous la future pelouse.',
          'Voici les postes à passer en revue pour un devis qui tient la route, sans mauvaise surprise ni pour vous ni pour le client.',
        ],
      },
      {
        heading: '1. Mesurer la vraie surface',
        paragraphs: [
          'Mesurez zone par zone et découpez les formes irrégulières en rectangles, triangles et cercles. Déduisez les massifs, les allées et les terrasses qui resteront en place. Notez aussi les bordures : leur longueur sert à chiffrer les finitions.',
          'Une erreur de quelques mètres carrés se répercute sur toutes les lignes du devis : terre, semences ou rouleaux, main-d’œuvre. C’est la mesure qu’il faut vérifier deux fois.',
        ],
      },
      {
        heading: '2. Évaluer le sol en place',
        paragraphs: ['Avant de chiffrer, regardez et notez :'],
        list: [
          'la végétation existante : ancienne pelouse, mauvaises herbes, souches, racines ;',
          'la nature du sol : terre lourde et compacte, sol caillouteux, remblai de construction ;',
          'la pente et l’écoulement de l’eau après une pluie ;',
          'l’accès au terrain pour le matériel et la livraison.',
        ],
      },
      {
        paragraphs: [
          'Ces observations déterminent la préparation nécessaire. Un remblai de chantier ou une terre très compacte demandent bien plus de travail qu’un ancien potager. Photographiez-les : elles justifieront les postes de préparation auprès du client.',
        ],
      },
      {
        heading: '3. Détailler la préparation du sol',
        paragraphs: ['C’est le cœur du devis. Prévoyez une ligne pour chaque étape réellement nécessaire :'],
        list: [
          'débroussaillage ou décapage de l’ancienne végétation ;',
          'évacuation des déchets verts et des cailloux ;',
          'travail du sol : bêchage, rotobêchage ou décompactage ;',
          'apport de terre végétale ou d’amendement, en m³ ;',
          'nivellement et ratissage fin ;',
          'roulage avant semis ou avant pose.',
        ],
      },
      {
        heading: '4. Semis ou gazon en rouleau',
        paragraphs: [
          'Les deux solutions ne se chiffrent pas de la même façon. Le semis demande moins de fournitures mais un délai avant d’obtenir une pelouse utilisable, et sa réussite dépend de la saison et de l’arrosage. Le gazon en rouleau donne un résultat immédiat, avec un coût de fournitures plus élevé et une pose à organiser dès la livraison.',
          'Si le client hésite, proposez les deux options sur le même devis, en lignes séparées. Il compare clairement, et vous évitez un second rendez-vous.',
        ],
      },
      {
        heading: '5. Ne pas oublier l’après-chantier',
        paragraphs: [
          'Indiquez qui assure l’arrosage les premières semaines, si la première tonte est comprise, et ce qui se passe en cas de levée irrégulière. Ces points évitent la plupart des litiges sur une création de pelouse : le client sait ce qui relève de votre travail et ce qui relève de l’entretien.',
        ],
      },
      {
        heading: '6. Préciser les conditions',
        paragraphs: [
          'Mentionnez la période prévue pour les travaux, car la météo conditionne la réussite d’un semis. Signalez comme estimées les quantités qui dépendent de ce que vous découvrirez au décapage, notamment l’apport de terre. Ajoutez les mentions habituelles : validité du devis, acompte, conditions de paiement.',
          'Dans Paysapro AI, les surfaces mesurées sur le chantier alimentent directement les lignes du devis, avec vos prix pour chaque poste, et vous pouvez enregistrer une création de pelouse comme modèle pour ne plus repartir de zéro.',
        ],
      },
    ],
  },
  {
    slug: 'relancer-un-devis-sans-reponse',
    title: 'Comment relancer un devis sans réponse ?',
    excerpt: 'Quand relancer, par quel moyen et avec quels mots : une méthode simple pour obtenir une réponse sans paraître insistant.',
    keywords: ['relance devis', 'suivi devis artisan'],
    publishedAt: '2026-11-10',
    readingMinutes: 5,
    links: [
      { label: 'Comment présenter un devis professionnel ?', to: '/blog/presenter-un-devis-professionnel' },
      { label: 'Comment gagner du temps sur ses devis ?', to: '/blog/gagner-du-temps-sur-ses-devis' },
      { label: 'Le logiciel de devis paysagiste', to: '/logiciel-devis-paysagiste' },
    ],
    summary: [
      'Un devis sans réponse n’est pas un refus : le client a souvent simplement remis sa décision à plus tard.',
      'Relancez quelques jours après l’envoi, puis avant la fin de validité du devis, avec un message court qui apporte quelque chose.',
      'Savoir si le devis a été ouvert permet de relancer au bon moment et avec le bon ton.',
    ],
    body: [
      {
        paragraphs: [
          'Vous avez visité le chantier, préparé un devis soigné, l’avez envoyé… et plus rien. C’est une situation que tous les artisans connaissent. Beaucoup n’osent pas relancer, de peur de paraître insistants. Pourtant, une relance bien faite est perçue comme du sérieux, et elle transforme une part non négligeable des devis restés en suspens.',
        ],
      },
      {
        heading: 'Pourquoi un client ne répond pas',
        paragraphs: ['Le silence a rarement une seule cause :'],
        list: [
          'le client n’a pas encore ouvert ou pas encore lu le devis ;',
          'il attend d’autres devis pour comparer ;',
          'il doit en parler à son conjoint ou attendre un financement ;',
          'une ligne ou un montant l’a fait hésiter, et il n’ose pas poser la question ;',
          'le projet est simplement reporté.',
        ],
      },
      {
        paragraphs: ['Une bonne relance aide à lever le doute sur chacune de ces situations, sans mettre le client mal à l’aise.'],
      },
      {
        heading: 'Quand relancer',
        paragraphs: [
          'Une première relance quelques jours après l’envoi laisse au client le temps de lire, sans que le projet sorte de sa tête. Une seconde, une semaine ou deux plus tard, peut s’appuyer sur une information utile : un créneau qui se libère dans votre planning, une précision technique, la date de fin de validité du devis.',
          'Au-delà, mieux vaut une dernière prise de nouvelles avant l’expiration du devis, puis classer le dossier. Un client qui revient plus tard appréciera d’avoir été suivi sans être harcelé.',
        ],
      },
      {
        heading: 'Par quel moyen',
        paragraphs: [
          'Le téléphone reste le plus efficace pour un devis important : il permet d’entendre les hésitations et d’y répondre tout de suite. Un SMS ou un e-mail court convient pour une première relance ou pour un client difficile à joindre. Dans tous les cas, joignez ou rappelez le lien vers le devis : le client ne doit pas avoir à le chercher.',
        ],
      },
      {
        heading: 'Que dire',
        paragraphs: ['Restez bref, aimable, et apportez quelque chose. Par exemple :'],
        list: [
          '« Bonjour, je reviens vers vous au sujet du devis pour votre terrasse. Avez-vous pu le consulter ? Je reste disponible si une ligne mérite une explication. »',
          '« Bonjour, j’ai un créneau qui se libère début du mois prochain pour votre clôture. Souhaitez-vous que je vous le réserve ? »',
          '« Bonjour, votre devis arrive à la fin de sa validité. Si le projet est reporté, je peux tout à fait l’actualiser plus tard. »',
        ],
      },
      {
        paragraphs: [
          'Évitez la pression commerciale ou les remises proposées d’emblée. Si le prix pose problème, le client le dira ; vous pourrez alors proposer une variante, par exemple en retirant une option, plutôt que de baisser vos tarifs.',
        ],
      },
      {
        heading: 'Relancer au bon moment grâce au suivi',
        paragraphs: [
          'Savoir si le devis a été ouvert change tout. Un devis jamais consulté appelle une relance du type « l’avez-vous bien reçu ? ». Un devis ouvert plusieurs fois montre un client intéressé, qui a peut-être une question.',
          'Avec Paysapro AI, le client consulte le devis en ligne et vous voyez son statut évoluer : envoyé, vu, accepté, signé. Vous êtes prévenu quand il l’ouvre, et un devis qui arrive à expiration vous est signalé : vous relancez au bon moment, avec le lien vers le devis à portée de main.',
        ],
      },
    ],
  },
  {
    slug: 'calculer-taux-horaire-paysagiste',
    title: 'Comment calculer son taux horaire de paysagiste ?',
    excerpt: 'Charges, heures réellement facturables, marge : la méthode pour fixer un taux horaire qui couvre vos coûts et fait vivre l’entreprise.',
    keywords: ['taux horaire paysagiste', 'prix main d’oeuvre paysagiste'],
    publishedAt: '2026-11-17',
    readingMinutes: 6,
    links: [
      { label: 'Comment faire un devis paysagiste ?', to: '/blog/comment-faire-un-devis-paysagiste' },
      { label: 'Contrat d’entretien de jardin : que prévoir ?', to: '/blog/contrat-entretien-jardin' },
      { label: 'Fonctionnalités : catalogue, coûts et marges', to: '/fonctionnalites' },
    ],
    summary: [
      'Le taux horaire se calcule à partir de vos coûts réels, pas du prix pratiqué par le voisin.',
      'Les heures facturables sont bien moins nombreuses que les heures travaillées : déplacements, devis, administratif et intempéries ne se facturent pas directement.',
      'Taux horaire = (charges annuelles + rémunération visée + marge) ÷ heures facturables dans l’année.',
    ],
    body: [
      {
        paragraphs: [
          'Beaucoup de paysagistes fixent leur taux horaire en regardant ce que pratiquent les autres. C’est un repère utile, mais insuffisant : deux entreprises n’ont ni les mêmes charges, ni le même matériel, ni le même nombre d’heures réellement facturées. Un taux mal calculé se voit rarement sur un chantier, mais toujours en fin d’année.',
          'La méthode ci-dessous vous permet de calculer votre propre taux, puis de le comparer au marché en connaissance de cause.',
        ],
      },
      {
        heading: '1. Additionner les charges de l’année',
        paragraphs: ['Listez tout ce que l’entreprise paie sur une année, hors fournitures refacturées sur les chantiers :'],
        list: [
          'véhicules : crédit ou location, carburant, assurance, entretien ;',
          'matériel : achat amorti sur sa durée d’utilisation, entretien, réparations, consommables ;',
          'local, stockage, énergie ;',
          'assurances professionnelles, comptable, banque, téléphone, logiciels ;',
          'cotisations et charges sociales ;',
          'salaires chargés des salariés, le cas échéant.',
        ],
      },
      {
        heading: '2. Fixer la rémunération visée',
        paragraphs: [
          'Ajoutez ce que vous souhaitez vous verser sur l’année. C’est souvent la ligne que l’on oublie, ou que l’on considère comme « ce qui reste ». En l’intégrant au calcul, votre taux horaire devient le prix qui permet réellement de vous payer.',
        ],
      },
      {
        heading: '3. Compter les heures vraiment facturables',
        paragraphs: [
          'Partez des heures travaillées dans l’année, puis retirez tout ce qui ne se facture pas directement : déplacements entre chantiers, visites et préparation des devis, administratif, chargement du matériel, entretien des machines, jours d’intempéries, congés.',
          'Le résultat est souvent nettement inférieur à ce que l’on imagine. Si vous ne savez pas l’estimer, notez pendant quelques semaines vos heures facturées et vos heures non facturées : la proportion obtenue sera bien plus juste qu’une estimation.',
        ],
      },
      {
        heading: '4. Calculer le taux',
        paragraphs: [
          'Taux horaire de revient = (charges annuelles + rémunération visée) ÷ heures facturables. C’est le prix en dessous duquel chaque heure vendue vous fait perdre de l’argent.',
          'Ajoutez ensuite une marge pour les imprévus, les investissements et les périodes creuses. Le taux obtenu est votre taux horaire de vente.',
        ],
      },
      {
        heading: '5. Comparer, puis ajuster',
        paragraphs: [
          'Comparez maintenant ce taux aux prix pratiqués dans votre secteur. S’il est nettement plus élevé, cherchez où agir : réduire les déplacements en regroupant les chantiers par secteur, augmenter la part d’heures facturées, revoir un poste de charge important. S’il est plus bas, vous avez peut-être une marge de manœuvre que vous n’exploitez pas.',
          'Recalculez votre taux au moins une fois par an, et à chaque changement important : embauche, nouveau véhicule, nouvel équipement.',
        ],
      },
      {
        heading: '6. Main-d’œuvre à l’heure ou au forfait',
        paragraphs: [
          'Le taux horaire sert aussi à construire vos prix au forfait ou au mètre carré : temps estimé pour la prestation multiplié par le taux, plus les fournitures. Le client voit un prix par prestation, et vous savez qu’il couvre vos heures.',
          'Dans Paysapro AI, chaque prestation de votre catalogue a un prix de vente et un coût interne, et la main-d’œuvre se chiffre à l’heure ou à la journée. La marge de chaque devis s’affiche en euros et en pourcentage, visible uniquement par vous.',
        ],
      },
    ],
  },
  {
    slug: 'contrat-entretien-jardin',
    title: 'Contrat d’entretien de jardin : que prévoir ?',
    excerpt: 'Prestations, fréquence, période, révision du prix, résiliation : les points à écrire noir sur blanc pour un contrat d’entretien clair et rentable.',
    keywords: ['contrat entretien jardin', 'devis entretien jardin'],
    publishedAt: '2026-11-24',
    readingMinutes: 6,
    links: [
      { label: 'Attestation fiscale SAP pour le jardinage', to: '/blog/attestation-fiscale-sap-jardinage' },
      { label: 'Logiciel paysagiste et services à la personne', to: '/logiciel-paysagiste-services-a-la-personne' },
      { label: 'Comment calculer son taux horaire ?', to: '/blog/calculer-taux-horaire-paysagiste' },
    ],
    summary: [
      'Un contrat d’entretien régulier sécurise le chiffre d’affaires, à condition que son contenu soit précis.',
      'Il détaille les prestations, leur fréquence et la période, ce qui est inclus et ce qui sera facturé en plus.',
      'Il prévoit les modalités de paiement, la révision du prix, la durée et les conditions de résiliation.',
    ],
    body: [
      {
        paragraphs: [
          'Les contrats d’entretien sont précieux pour un paysagiste : ils remplissent le planning de façon régulière et lissent le chiffre d’affaires sur l’année. Mais un contrat flou devient vite une source de tension : le client attend plus que prévu, ou le temps passé dépasse largement ce qui a été chiffré.',
          'Voici les points à préciser pour un contrat clair, à la fois pour le client et pour vous.',
        ],
      },
      {
        heading: '1. Décrire chaque prestation',
        paragraphs: ['Listez précisément ce qui est compris, par exemple :'],
        list: [
          'tonte de la pelouse, avec ou sans ramassage de l’herbe ;',
          'taille des haies, en précisant lesquelles, leur hauteur et le nombre de passages par an ;',
          'désherbage des massifs et des allées ;',
          'ramassage des feuilles ;',
          'taille des arbustes et des rosiers ;',
          'évacuation des déchets verts.',
        ],
      },
      {
        paragraphs: [
          'Plus la description est précise, moins il y a de discussions. « Entretien du jardin » ne suffit pas : le client et vous n’imaginez probablement pas la même chose.',
        ],
      },
      {
        heading: '2. Fixer la fréquence et la période',
        paragraphs: [
          'Indiquez le nombre de passages et leur rythme selon les saisons : la tonte est fréquente au printemps, rare en hiver. Précisez si les dates sont fixées à l’avance ou adaptées à la météo, et comment le client est prévenu de votre passage.',
        ],
      },
      {
        heading: '3. Dire ce qui n’est pas compris',
        paragraphs: [
          'Ce qui sort du contrat doit être écrit aussi clairement que ce qui y entre : abattage, élagage en hauteur, remplacement de végétaux, traitement d’une maladie, réparation de l’arrosage. Ces travaux feront l’objet d’un devis séparé. Le client sait à quoi s’attendre, et vous évitez les « petits services » non facturés qui s’accumulent.',
        ],
      },
      {
        heading: '4. Prix et paiement',
        paragraphs: [
          'Le prix peut être calculé par passage, au mois ou à l’année. Un forfait mensuel lissé sur l’année est apprécié des clients et régularise votre trésorerie, même si les passages sont plus nombreux en été. Précisez le mode et la date de paiement.',
          'Prévoyez une clause de révision du prix, par exemple une actualisation annuelle à la date anniversaire du contrat, communiquée à l’avance au client.',
        ],
      },
      {
        heading: '5. Durée et résiliation',
        paragraphs: [
          'Indiquez la date de début, la durée du contrat, son éventuelle reconduction et le délai de préavis pour y mettre fin, de part et d’autre. Avec un particulier, des conditions de résiliation simples et équilibrées inspirent confiance et facilitent la signature.',
        ],
      },
      {
        heading: '6. Services à la personne',
        paragraphs: [
          'Si votre entreprise est déclarée en services à la personne, les petits travaux de jardinage chez les particuliers peuvent ouvrir droit à un avantage fiscal pour vos clients. Le contrat et les factures doivent alors distinguer les prestations concernées, et vous devez remettre à chaque client une attestation fiscale annuelle. Vérifiez les conditions et plafonds en vigueur avec votre comptable.',
          'Paysapro AI gère ce mode : vos prestations sont marquées éligibles ou non, les devis affichent les informations SAP, et l’attestation fiscale annuelle de chaque client est générée en PDF à partir des paiements enregistrés.',
        ],
      },
    ],
  },
  {
    slug: 'devis-taille-de-haie',
    title: 'Comment faire un devis de taille de haie ?',
    excerpt: 'Longueur, hauteur, épaisseur, accès et évacuation : comment mesurer une haie et détailler son devis pour chiffrer juste.',
    keywords: ['devis taille de haie', 'prix taille haie'],
    publishedAt: '2026-12-01',
    readingMinutes: 5,
    links: [
      { label: 'Calculateur de surface gratuit', to: '/outils/calcul-surface' },
      { label: 'Contrat d’entretien de jardin : que prévoir ?', to: '/blog/contrat-entretien-jardin' },
      { label: 'Comment calculer son taux horaire ?', to: '/blog/calculer-taux-horaire-paysagiste' },
    ],
    summary: [
      'Une haie se chiffre au mètre linéaire, mais sa hauteur, son épaisseur et les faces à tailler changent tout.',
      'L’accès, le matériel nécessaire et l’évacuation des déchets verts sont des postes à part entière.',
      'Des photos et des mesures précises évitent les contestations, surtout pour une haie haute ou négligée.',
    ],
    body: [
      {
        paragraphs: [
          'La taille de haie fait partie des prestations les plus demandées, et des plus souvent sous-estimées. Deux haies de même longueur peuvent demander un temps de travail très différent selon leur hauteur, leur épaisseur, l’essence et la date de la dernière taille.',
        ],
      },
      {
        heading: '1. Mesurer la haie',
        paragraphs: ['Relevez sur place :'],
        list: [
          'la longueur en mètres linéaires, haie par haie ;',
          'la hauteur actuelle et la hauteur souhaitée après taille ;',
          'l’épaisseur, et le nombre de faces à tailler : un côté, deux côtés, le dessus ;',
          'l’essence : certaines se taillent vite, d’autres demandent plus de soin ou produisent plus de volume.',
        ],
      },
      {
        heading: '2. Observer l’état et l’accès',
        paragraphs: [
          'Une haie entretenue chaque année se taille bien plus vite qu’une haie laissée plusieurs saisons sans entretien, où il faut parfois réduire fortement la hauteur ou l’épaisseur. Regardez aussi ce qu’il y a autour : massifs à protéger, clôture, terrasse, voisinage, voie publique.',
          'L’accès conditionne le matériel : une haie haute peut nécessiter un escabeau, un échafaudage ou une nacelle ; une haie en limite de propriété peut demander l’accord du voisin pour tailler l’autre face. Notez-le dans le devis.',
        ],
      },
      {
        heading: '3. Détailler le devis',
        paragraphs: ['Plutôt qu’un forfait global, détaillez :'],
        list: [
          'la taille, au mètre linéaire, en distinguant les haies de hauteurs différentes ;',
          'la réduction de hauteur ou d’épaisseur, si elle est nécessaire ;',
          'la location ou l’utilisation de matériel spécifique ;',
          'le ramassage et l’évacuation des déchets verts, ou leur broyage sur place ;',
          'le déplacement, si votre tarif le prévoit.',
        ],
      },
      {
        paragraphs: [
          'Le volume de déchets verts est souvent sous-estimé. Il dépend de la longueur, mais aussi de l’épaisseur retirée. Précisez le mode de gestion prévu : évacuation, broyage, paillage sur place.',
        ],
      },
      {
        heading: '4. Choisir la bonne période',
        paragraphs: [
          'La période de taille dépend des essences et de la réglementation locale. Évitez de programmer une taille importante pendant la période de nidification des oiseaux, et renseignez-vous sur les règles applicables dans votre secteur. Indiquez la période prévue sur le devis.',
        ],
      },
      {
        heading: '5. Proposer un entretien régulier',
        paragraphs: [
          'Une haie taillée chaque année revient moins cher au client qu’une haie reprise tous les trois ans. C’est l’occasion de proposer un passage annuel ou un contrat d’entretien : vous fidélisez le client et lissez votre planning.',
          'Dans Paysapro AI, les longueurs relevées sur le chantier alimentent directement les lignes au mètre linéaire, et vous pouvez joindre au devis les photos de la haie avant travaux.',
        ],
      },
    ],
  },
  {
    slug: 'travaux-supplementaires-avenant',
    title: 'Travaux supplémentaires : comment les faire accepter ?',
    excerpt: 'Une souche imprévue, une demande du client en cours de chantier : comment chiffrer et faire valider un supplément avant de le réaliser.',
    keywords: ['travaux supplémentaires devis', 'avenant devis travaux'],
    publishedAt: '2026-12-08',
    readingMinutes: 5,
    links: [
      { label: 'Comment organiser ses chantiers ?', to: '/blog/organiser-ses-chantiers' },
      { label: 'Mentions obligatoires d’un devis de travaux', to: '/blog/mentions-obligatoires-devis-travaux' },
      { label: 'Facture d’acompte : comment la faire ?', to: '/blog/facture-acompte-travaux' },
    ],
    summary: [
      'Un travail non prévu au devis signé doit être chiffré et accepté par écrit avant d’être réalisé.',
      'Le plus simple est un devis complémentaire, court et précis, signé par le client.',
      'Signaler les quantités estimées dès le devis initial réduit fortement les discussions en cours de chantier.',
    ],
    body: [
      {
        paragraphs: [
          'Sur un chantier d’aménagement extérieur, les imprévus sont fréquents : une souche plus grosse que prévu, un sous-sol rocheux, une canalisation à contourner. Et le client a souvent de nouvelles idées une fois les travaux commencés : « tant que vous êtes là, pourriez-vous aussi… ».',
          'Réaliser ces travaux sans accord écrit, c’est prendre le risque de ne pas être payé, ou de devoir négocier en fin de chantier, au pire moment.',
        ],
      },
      {
        heading: 'La règle : écrire avant de faire',
        paragraphs: [
          'Le devis signé fixe ce qui a été convenu. Tout ce qui s’y ajoute doit faire l’objet d’un accord du client sur le contenu et le prix, avant la réalisation. Un accord oral, même de bonne foi, se discute facilement quelques semaines plus tard.',
        ],
      },
      {
        heading: 'Le devis complémentaire',
        paragraphs: [
          'La solution la plus claire est un devis complémentaire, qui fait référence au devis initial. Il reprend la même présentation et détaille uniquement les travaux ajoutés : désignation, quantité, prix, et l’impact éventuel sur le délai. Le client le signe comme le premier.',
          'Si un travail prévu est retiré, indiquez-le aussi, avec le montant correspondant en moins : le client voit que vous jouez la transparence dans les deux sens.',
        ],
      },
      {
        heading: 'Expliquer pourquoi',
        paragraphs: [
          'Un supplément est mieux accepté quand le client comprend sa cause. Montrez-lui le problème sur place, ou envoyez une photo avec quelques mots d’explication : « En décaissant pour la terrasse, nous avons trouvé une ancienne dalle béton à casser et évacuer. » Proposez si possible plusieurs options, par exemple contourner l’obstacle plutôt que le supprimer.',
        ],
      },
      {
        heading: 'Anticiper dès le devis initial',
        paragraphs: ['La meilleure façon de limiter les discussions est de les prévoir :'],
        list: [
          'signaler les quantités estimées, « à confirmer après décapage » par exemple ;',
          'écrire ce qui n’est pas compris dans le prix ;',
          'prévoir dans vos conditions que tout travail supplémentaire fera l’objet d’un devis complémentaire ;',
          'photographier l’état initial du terrain.',
        ],
      },
      {
        heading: 'Facturer proprement',
        paragraphs: [
          'Une fois le supplément accepté, intégrez-le à la facture de solde en faisant apparaître le devis initial, le devis complémentaire et les acomptes déjà versés. Le client retrouve chaque montant et comprend le total.',
          'Avec Paysapro AI, le devis complémentaire se prépare en quelques minutes depuis le chantier, avec les photos du problème, et le client le signe en ligne depuis son téléphone : l’accord est obtenu avant de reprendre les travaux.',
        ],
      },
    ],
  },
  {
    slug: 'calculer-terre-vegetale',
    title: 'Combien de terre végétale commander ?',
    excerpt: 'Surface, épaisseur, tassement et livraison : la méthode pour calculer le volume de terre végétale et éviter le camion de trop… ou de moins.',
    keywords: ['calcul terre végétale', 'volume terre végétale m3'],
    publishedAt: '2026-12-15',
    readingMinutes: 5,
    links: [
      { label: 'Calculateur de volume gratuit', to: '/outils/calcul-volume' },
      { label: 'Comment chiffrer la création d’une pelouse ?', to: '/blog/comment-chiffrer-creation-pelouse' },
      { label: 'Comment calculer la surface d’une terrasse ?', to: '/blog/calculer-surface-terrasse' },
    ],
    summary: [
      'Volume (m³) = surface (m²) × épaisseur (m) : 48 m² sur 10 cm représentent 4,8 m³.',
      'Prévoyez une marge pour le tassement de la terre après mise en place, selon le matériau et vos habitudes.',
      'Le poids dépend de la densité et de l’humidité : demandez la valeur à votre fournisseur avant de commander ou de charger.',
    ],
    body: [
      {
        paragraphs: [
          'Commander trop peu de terre végétale, c’est une seconde livraison et une demi-journée perdue. Commander trop, c’est un surplus à stocker ou à évacuer, payé par vous ou par le client. Le calcul est simple, à condition de ne pas oublier quelques paramètres.',
        ],
      },
      {
        heading: '1. Mesurer la surface',
        paragraphs: [
          'Mesurez chaque zone à recouvrir et découpez les formes complexes en formes simples. Additionnez les surfaces, en déduisant les parties qui ne recevront pas de terre : allées, terrasses, massifs existants.',
        ],
      },
      {
        heading: '2. Choisir l’épaisseur',
        paragraphs: [
          'L’épaisseur dépend du projet et du sol en place : un simple regarnissage demande peu de terre, une création de pelouse ou de massif sur un sol pauvre ou un remblai en demande beaucoup plus. Mesurez-la en plusieurs points si le terrain n’est pas plan : les creux consomment plus de terre qu’on ne l’imagine.',
        ],
      },
      {
        heading: '3. Calculer le volume',
        paragraphs: [
          'Volume (m³) = surface (m²) × épaisseur (m). Attention à l’unité : 10 cm s’écrivent 0,10 m. Pour 48 m² sur 10 cm, il faut 48 × 0,10 = 4,8 m³. Pour 48 m² sur 20 cm, 9,6 m³.',
        ],
      },
      {
        heading: '4. Prévoir le tassement',
        paragraphs: [
          'Une terre livrée est foisonnée : elle contient de l’air et se tasse une fois mise en place, arrosée et roulée. Ajoutez une marge selon le matériau, l’humidité et vos habitudes de chantier. Notez après chaque chantier la quantité réellement utilisée : vous affinerez votre marge au fil du temps.',
        ],
      },
      {
        heading: '5. Du volume au poids',
        paragraphs: [
          'Les fournisseurs vendent au m³ ou à la tonne. Le poids dépend de la densité, qui varie selon la composition de la terre et son humidité : une terre mouillée pèse nettement plus lourd. Demandez la densité réelle à votre fournisseur, surtout si vous transportez la terre vous-même : la charge utile du véhicule est vite atteinte.',
        ],
      },
      {
        heading: '6. Organiser la livraison',
        paragraphs: [
          'Vérifiez l’accès du camion, l’endroit où la terre sera déposée et la protection du sol à cet endroit. Un dépôt mal placé peut ajouter des heures de brouette. Pensez aussi à la météo : une terre détrempée se travaille mal.',
          'Le calculateur de volume gratuit du site fait ce calcul en quelques secondes, avec une estimation du poids. Dans Paysapro AI, la surface mesurée sur le chantier et l’épaisseur prévue donnent directement la quantité de la ligne « apport de terre végétale » du devis.',
        ],
      },
    ],
  },
  {
    slug: 'photos-de-chantier-paysagiste',
    title: 'Photos de chantier : comment bien les utiliser ?',
    excerpt: 'Avant, pendant, après : quelles photos prendre, comment les ranger et à quoi elles servent, du devis à la communication.',
    keywords: ['photos chantier paysagiste', 'application paysagiste'],
    publishedAt: '2026-12-22',
    readingMinutes: 5,
    links: [
      { label: 'Comment organiser ses chantiers ?', to: '/blog/organiser-ses-chantiers' },
      { label: 'Comment présenter un devis professionnel ?', to: '/blog/presenter-un-devis-professionnel' },
      { label: 'L’application de chantier du paysagiste', to: '/application-paysagiste' },
    ],
    summary: [
      'Les photos servent à chiffrer, à convaincre le client, à se protéger en cas de litige et à montrer son savoir-faire.',
      'Prenez-les toujours dans le même ordre : vue d’ensemble, zones de travaux, contraintes, puis les mêmes angles après travaux.',
      'Rangées dans le dossier du chantier au moment de la prise, elles restent utilisables ; perdues dans la galerie du téléphone, elles ne servent plus.',
    ],
    body: [
      {
        paragraphs: [
          'Tous les paysagistes prennent des photos de chantier. Mais elles finissent souvent mélangées aux photos personnelles, difficiles à retrouver au moment où elles seraient utiles. Bien prises et bien rangées, elles deviennent pourtant un outil de travail à part entière.',
        ],
      },
      {
        heading: 'À quoi servent les photos',
        list: [
          'chiffrer au calme, après la visite, sans oublier un détail du terrain ;',
          'illustrer le devis : le client retrouve son jardin et comprend où chaque prestation s’applique ;',
          'garder une trace de l’état initial, utile en cas de contestation ;',
          'informer le client de l’avancement, surtout s’il est absent pendant les travaux ;',
          'montrer vos réalisations : une galerie avant-après est votre meilleure vitrine.',
        ],
      },
      {
        heading: 'Lors de la visite',
        paragraphs: ['Suivez toujours le même ordre :'],
        list: [
          'une ou deux vues d’ensemble du jardin, depuis la maison et depuis le fond du terrain ;',
          'chaque zone de travaux, de face et en biais ;',
          'les contraintes : accès, portail, pente, réseaux visibles, arbres à protéger ;',
          'les détails qui influencent le prix : souches, état d’une clôture, nature du sol.',
        ],
      },
      {
        heading: 'Pendant et après les travaux',
        paragraphs: [
          'Photographiez les étapes clés, notamment ce qui sera caché une fois le chantier terminé : fondations, drainage, géotextile, réseaux. À la fin, reprenez les mêmes angles qu’à la visite : la comparaison avant-après est bien plus parlante quand le point de vue est identique.',
        ],
      },
      {
        heading: 'Quelques règles de prise de vue',
        list: [
          'photographiez en plein jour, le soleil dans le dos si possible ;',
          'tenez le téléphone à l’horizontale pour les vues d’ensemble ;',
          'placez un repère dans l’image, un mètre déplié ou un outil, pour donner l’échelle ;',
          'évitez de photographier les voisins, les plaques d’immatriculation ou les personnes sans leur accord.',
        ],
      },
      {
        heading: 'Ranger au bon endroit',
        paragraphs: [
          'Le vrai problème n’est pas la prise de vue, mais le rangement. Classez chaque photo dans le dossier du chantier au moment où vous la prenez, avec une étiquette : avant, pendant, après. Triées plus tard, elles finissent rarement au bon endroit.',
          'Avant de publier une réalisation sur votre site ou vos réseaux, demandez l’accord du client, et évitez tout ce qui permettrait de localiser sa maison.',
          'Dans Paysapro AI, les photos sont prises ou importées directement dans le chantier, étiquetées avant ou après, et vous choisissez celles qui apparaissent dans le devis. Un curseur avant-après permet de montrer le résultat au client en un geste.',
        ],
      },
    ],
  },
];

/** Title de la page : « Titre | Paysapro AI », sans la marque si l'ensemble dépasse 60 caractères (sinon Google le tronque). */
export function articleSeoTitle(a: Pick<BlogArticle, 'title'>): string {
  const full = `${a.title} | Paysapro AI`;
  return full.length <= 60 ? full : a.title;
}

/** Articles en ligne : rédigés et dont la date de parution est atteinte (date du build, heure de Paris). */
export function publishedArticles(today: string = import.meta.env.VITE_BUILD_DATE) {
  return BLOG_ARTICLES.filter((a) => a.publishedAt && a.publishedAt <= today && a.body?.length).sort((a, b) => b.publishedAt!.localeCompare(a.publishedAt!));
}
