/**
 * Pages d'atterrissage SEO : une page par intention de recherche, avec un contenu propre
 * (pas de pages « satellites » dupliquées, pas de pages par ville).
 * Règles : n'annoncer que ce que l'application fait ; aucun chiffre de gain inventé ; l'IA assiste, elle ne décide pas.
 * Title / description : src/marketing/config/pages.json.
 */
export type LandingVisual = 'quote' | 'dashboard' | 'phone' | 'catalog' | 'sap';

export interface LandingSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Landing {
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  visual: LandingVisual;
  sections: LandingSection[];
  faq: { question: string; answer: string }[];
  /** liens internes « pour aller plus loin » */
  related: { label: string; to: string }[];
}

export const LANDINGS: Landing[] = [
  {
    path: '/logiciel-devis-paysagiste',
    eyebrow: 'Logiciel de devis paysagiste',
    h1: 'Le logiciel de devis pensé pour les paysagistes.',
    intro:
      'Paysapro AI transforme votre visite de chantier en devis professionnel : photos, métrés, prestations issues de votre catalogue, total TTC et signature du client. Le tout depuis votre téléphone.',
    visual: 'quote',
    sections: [
      {
        heading: 'Un logiciel de devis qui parle le langage du paysage',
        paragraphs: [
          'Un logiciel de devis généraliste vous laisse devant une page blanche. Un devis de paysagiste, lui, se construit à partir du terrain : des surfaces de gazon, des mètres linéaires de clôture, des volumes de terre végétale, des végétaux à l’unité et des heures de main-d’œuvre.',
          'Paysapro AI est construit autour de ces unités. Vous saisissez vos dimensions sur place, les quantités sont calculées, et chaque ligne du devis reprend la bonne unité : m², ml, m³, unité ou heure.',
        ],
      },
      {
        heading: 'Du rendez-vous client au devis envoyé',
        list: [
          'Créez le chantier et la fiche client en quelques champs.',
          'Photographiez le jardin et les zones à aménager : les photos restent rangées avec le chantier.',
          'Renseignez longueurs et largeurs : surfaces et linéaires sont calculés.',
          'Ajoutez vos prestations depuis votre catalogue de prix.',
          'Vérifiez l’aperçu, puis envoyez le devis à votre client.',
          'Le client consulte le devis en ligne et le signe.',
        ],
      },
      {
        heading: 'Vos prix, votre catalogue',
        paragraphs: [
          'Chaque entreprise a ses tarifs. Vous enregistrez une fois vos prestations — engazonnement, terrasse, clôture, plantation, taille, évacuation — avec leur unité, leur prix de vente et leur coût. Elles sont ensuite réutilisées sur chaque devis, ce qui garantit des prix cohérents d’un chantier à l’autre.',
        ],
      },
      {
        heading: 'Un devis complet et présentable',
        paragraphs: [
          'Le devis reprend automatiquement les informations de votre entreprise, celles du client et du chantier, le détail des prestations, les totaux HT, la TVA, le total TTC, l’acompte et vos conditions. Vous pouvez y joindre les photos du chantier.',
          'Les quantités qui restent à confirmer par un métré sont signalées comme estimées : votre client sait à quoi s’en tenir, et vous aussi.',
        ],
      },
      {
        heading: 'Une IA qui assiste, sans décider à votre place',
        paragraphs: [
          'L’assistant vous aide à structurer le chiffrage et à ne pas oublier de prestations, comme la préparation du terrain ou l’évacuation des déchets verts. Une photo ne suffit pas à chiffrer un chantier avec certitude : chaque suggestion est à valider, et vous restez maître des quantités, des prix et du devis final.',
        ],
      },
    ],
    faq: [
      {
        question: 'Paysapro AI remplace-t-il mon logiciel de facturation ?',
        answer:
          'Paysapro AI est centré sur la préparation du chantier et le devis : photos, métrés, catalogue de prix, devis et signature du client. Il ne remplace pas un logiciel de comptabilité.',
      },
      {
        question: 'Puis-je faire un devis directement chez le client ?',
        answer: 'Oui. L’application est conçue pour le téléphone : vous pouvez saisir les dimensions, choisir vos prestations et préparer le devis sur place.',
      },
      {
        question: 'Combien coûte le logiciel ?',
        answer: 'L’accès est gratuit pendant la phase bêta. Les utilisateurs seront informés avant toute évolution payante.',
      },
      {
        question: 'Mes tarifs sont-ils imposés par le logiciel ?',
        answer: 'Non. Vous créez votre propre catalogue de prestations, avec vos unités, vos prix et vos coûts.',
      },
    ],
    related: [
      { label: 'Voir un exemple de devis paysagiste commenté', to: '/modele-devis-paysagiste' },
      { label: 'Comment faire un devis paysagiste ?', to: '/blog/comment-faire-un-devis-paysagiste' },
      { label: 'Toutes les fonctionnalités', to: '/fonctionnalites' },
    ],
  },
  {
    path: '/logiciel-gestion-paysagiste',
    eyebrow: 'Logiciel de gestion pour paysagiste',
    h1: 'Clients, chantiers, devis : tout au même endroit.',
    intro:
      'Paysapro AI est un logiciel de gestion simple pour les entreprises du paysage : chaque chantier regroupe son client, ses photos, ses métrés, son devis et son suivi, accessibles depuis le téléphone comme depuis le bureau.',
    visual: 'dashboard',
    sections: [
      {
        heading: 'Fini les informations dispersées',
        paragraphs: [
          'Les photos dans la galerie du téléphone, les mesures dans un carnet, les prix dans un tableur, le devis dans un traitement de texte : c’est ainsi que naissent les oublis et les ressaisies.',
          'Dans Paysapro AI, un chantier est un dossier complet. Tout ce qui le concerne se retrouve au même endroit, que vous soyez seul ou que vous travailliez à plusieurs.',
        ],
      },
      {
        heading: 'Ce que vous gérez avec Paysapro AI',
        list: [
          'Les clients : coordonnées, adresse du chantier, historique des devis.',
          'Les chantiers : photos, dimensions, notes, prestations et avancement.',
          'Le catalogue : vos prestations, unités, prix de vente et coûts.',
          'Les devis : brouillon, envoyé, consulté, signé.',
          'Le tableau de bord : devis en attente, devis signés, chantiers actifs.',
        ],
      },
      {
        heading: 'Savoir où vous en êtes',
        paragraphs: [
          'Le tableau de bord montre en un coup d’œil les devis qui attendent une réponse et ceux qui viennent d’être signés. Vous savez qui relancer et quels chantiers planifier, sans fouiller dans vos e-mails.',
        ],
      },
      {
        heading: 'Pour les indépendants comme pour les équipes',
        paragraphs: [
          'Paysapro AI s’adresse d’abord aux paysagistes indépendants et aux petites entreprises : création de jardins, aménagement extérieur, entretien d’espaces verts, terrasses, clôtures, plantations. Les données sont enregistrées dans votre compte et accessibles depuis votre téléphone, votre tablette ou votre ordinateur.',
        ],
      },
    ],
    faq: [
      {
        question: 'Faut-il une formation pour utiliser le logiciel ?',
        answer: 'Non. Le parcours suit l’ordre d’un vrai chantier : client, photos, dimensions, prestations, devis, signature.',
      },
      {
        question: 'Puis-je retrouver tous les devis d’un client ?',
        answer: 'Oui. Chaque client a sa fiche, avec ses chantiers et les devis associés.',
      },
      {
        question: 'Le logiciel fonctionne-t-il sur ordinateur ?',
        answer: 'Oui. Il fonctionne sur smartphone, tablette et ordinateur, avec les mêmes données.',
      },
    ],
    related: [
      { label: 'Le logiciel de devis paysagiste', to: '/logiciel-devis-paysagiste' },
      { label: 'Comment ça marche, étape par étape', to: '/comment-ca-marche' },
      { label: 'L’application sur le terrain', to: '/application-paysagiste' },
    ],
  },
  {
    path: '/application-paysagiste',
    eyebrow: 'Application pour paysagiste',
    h1: 'L’application de chantier du paysagiste.',
    intro:
      'Paysapro AI s’utilise là où vous travaillez : dans le jardin du client. Photos, mesures, prestations et devis se préparent depuis votre smartphone, sans attendre le soir pour tout ressaisir.',
    visual: 'phone',
    sections: [
      {
        heading: 'Conçue d’abord pour le téléphone',
        paragraphs: [
          'Un paysagiste travaille rarement derrière un bureau. L’interface a donc été pensée pour l’écran d’un téléphone : de gros boutons, peu de saisie, une lecture possible en extérieur.',
          'Il n’y a rien à installer depuis un magasin d’applications : Paysapro AI s’ouvre dans le navigateur de votre téléphone et peut être ajouté à l’écran d’accueil.',
        ],
      },
      {
        heading: 'Ce que vous faites sur place',
        list: [
          'Photographier le jardin, les accès et les zones à aménager.',
          'Noter les dimensions : longueur, largeur, linéaires.',
          'Obtenir les surfaces et les quantités calculées.',
          'Choisir les prestations dans votre catalogue.',
          'Montrer le devis au client et le lui faire signer.',
        ],
      },
      {
        heading: 'Le soir, il ne reste rien à recopier',
        paragraphs: [
          'Ce que vous avez saisi sur le chantier est déjà dans le devis. De retour au bureau, vous retrouvez les mêmes informations sur votre ordinateur pour relire, ajuster et envoyer.',
        ],
      },
      {
        heading: 'Vous gardez la main',
        paragraphs: [
          'L’assistant peut suggérer des prestations à partir des informations du chantier. Ces suggestions sont toujours à vérifier : les dimensions, les quantités, les prix et le devis final restent sous votre contrôle.',
        ],
      },
    ],
    faq: [
      {
        question: 'L’application fonctionne-t-elle sur iPhone et Android ?',
        answer: 'Oui. Elle s’utilise dans le navigateur du téléphone, sur iPhone comme sur Android, et peut être ajoutée à l’écran d’accueil.',
      },
      {
        question: 'Dois-je télécharger une application ?',
        answer: 'Non. Il suffit d’ouvrir l’adresse de l’application et de créer votre compte.',
      },
      {
        question: 'Puis-je importer des photos déjà prises ?',
        answer: 'Oui. Vous pouvez prendre une photo depuis l’application ou en importer depuis la galerie de votre téléphone.',
      },
    ],
    related: [
      { label: 'Les outils de calcul gratuits', to: '/outils' },
      { label: 'Le logiciel de gestion pour paysagiste', to: '/logiciel-gestion-paysagiste' },
      { label: 'Comment ça marche', to: '/comment-ca-marche' },
    ],
  },
  {
    path: '/modele-devis-paysagiste',
    eyebrow: 'Modèle de devis paysagiste',
    h1: 'Exemple de devis paysagiste, commenté ligne par ligne.',
    intro:
      'Voici à quoi ressemble un devis de paysagiste complet, et pourquoi chaque rubrique s’y trouve. Vous pouvez vous en inspirer pour votre propre modèle, ou le générer directement dans Paysapro AI avec vos prestations et vos prix.',
    visual: 'quote',
    sections: [
      {
        heading: '1. L’en-tête : qui s’engage, envers qui',
        paragraphs: [
          'En haut du devis figurent votre entreprise (nom, adresse, SIRET, coordonnées, logo), le numéro du devis et sa date. Juste en dessous : le client et l’adresse du chantier, qui peut être différente de son adresse de facturation.',
        ],
      },
      {
        heading: '2. Le détail des prestations',
        paragraphs: [
          'C’est le cœur du devis. Chaque ligne indique une désignation claire, une quantité, une unité et un montant. Dans l’exemple : préparation du terrain et gazon au m², terrasse au m², clôture au mètre linéaire, plantations à l’unité.',
          'Un devis détaillé rassure le client et vous protège : ce qui est écrit est ce qui sera réalisé.',
        ],
      },
      {
        heading: '3. Les quantités estimées',
        paragraphs: [
          'Quand une quantité ne peut pas être connue avec certitude avant de commencer — la longueur exacte d’une clôture en limite de propriété, par exemple — elle est signalée comme estimée, à confirmer par un métré avant travaux.',
        ],
      },
      {
        heading: '4. Les totaux, la TVA et l’acompte',
        paragraphs: [
          'Le devis présente le total HT, le taux et le montant de la TVA, puis le total TTC. L’acompte demandé à la signature et le solde à la fin du chantier sont indiqués clairement.',
          'Le taux de TVA applicable dépend de la nature des travaux et de votre régime : en cas de doute, vérifiez-le avec votre expert-comptable.',
        ],
      },
      {
        heading: '5. La gestion des déchets du chantier',
        paragraphs: ['Pour les travaux de jardinage et de maçonnerie paysagère, la réglementation issue de la loi AGEC demande que le devis précise :'],
        list: [
          'une estimation de la quantité de déchets générés par le chantier ;',
          'la manière dont ils seront gérés et enlevés (tri, broyage sur place, évacuation) ;',
          'le ou les points de collecte prévus : nom, adresse et type d’installation ;',
          'une estimation du coût de cette gestion.',
        ],
      },
      {
        heading: '6. Les conditions et la signature',
        paragraphs: [
          'Durée de validité du devis, période prévue pour les travaux, conditions de paiement : ces éléments évitent les malentendus. Le devis se termine par l’emplacement de signature du client, avec la mention « bon pour accord ».',
          'Selon votre statut et vos activités, d’autres mentions peuvent être exigées (assurance professionnelle, franchise de TVA…). Faites valider votre modèle par votre expert-comptable ou votre chambre de métiers.',
        ],
      },
    ],
    faq: [
      {
        question: 'Puis-je utiliser cet exemple comme modèle ?',
        answer:
          'Vous pouvez vous en inspirer librement. Les montants affichés sont fictifs. Dans Paysapro AI, le même devis se génère automatiquement avec vos informations d’entreprise, vos prestations et vos prix.',
      },
      {
        question: 'Un devis paysagiste doit-il être signé ?',
        answer: 'La signature du client, précédée de la mention « bon pour accord », matérialise son acceptation. Paysapro AI permet au client de consulter le devis et de le signer en ligne.',
      },
      {
        question: 'Faut-il détailler la main-d’œuvre ?',
        answer: 'C’est recommandé : un devis qui distingue fournitures, main-d’œuvre et déplacements est plus clair pour le client et plus facile à défendre.',
      },
    ],
    related: [
      { label: 'Comment faire un devis paysagiste ?', to: '/blog/comment-faire-un-devis-paysagiste' },
      { label: 'Calculer une surface de terrasse', to: '/outils/calcul-surface' },
      { label: 'Le logiciel de devis paysagiste', to: '/logiciel-devis-paysagiste' },
    ],
  },
  {
    path: '/logiciel-paysagiste-services-a-la-personne',
    eyebrow: 'Services à la personne (SAP)',
    h1: 'Devis SAP et attestation fiscale, générés pour vous.',
    intro:
      'Vous êtes déclaré en services à la personne pour l’entretien de jardins ? Paysapro AI ajoute les informations SAP sur vos devis et génère lui-même, en PDF, l’attestation fiscale annuelle de chaque client.',
    visual: 'sap',
    sections: [
      {
        heading: 'Un mode SAP pour les entreprises déclarées',
        paragraphs: [
          'Le mode SAP est une option. Vous l’activez dans les réglages de votre entreprise, puis vous renseignez votre numéro de déclaration SAP, sa date d’enregistrement et l’activité déclarée.',
          'Il est sans effet sur vos devis habituels : si vous ne l’activez pas, ou si un devis ne contient aucune prestation SAP, aucune mention n’apparaît.',
        ],
      },
      {
        heading: 'Vos prestations éligibles, marquées par vous',
        paragraphs: [
          'Dans votre catalogue, vous cochez les prestations qui relèvent de votre déclaration : tonte, taille de haies, désherbage, entretien des massifs… Paysapro AI ne déduit rien à votre place : une prestation est traitée comme SAP uniquement si vous l’avez indiquée.',
        ],
      },
      {
        heading: 'Des devis qui distinguent le SAP du reste',
        list: [
          'Les lignes SAP sont repérées sur le devis.',
          'Votre numéro de déclaration et sa date d’enregistrement sont repris.',
          'Le total des prestations SAP est indiqué à part, en HT et en TTC.',
          'Un même devis peut mêler prestations SAP et travaux hors SAP.',
        ],
      },
      {
        heading: 'L’attestation fiscale annuelle, en PDF',
        paragraphs: [
          'En début d’année, vos clients attendent leur attestation pour déclarer leurs dépenses. Depuis la fiche du client, vous choisissez l’année et Paysapro AI génère le PDF : prestations SAP réalisées, dates d’intervention et montants réellement réglés.',
          'Avant de générer, l’application vérifie que tout est là : client, entreprise, numéro SAP, prestations, interventions, règlements. S’il manque une information, elle vous la signale au lieu de l’inventer.',
        ],
      },
      {
        heading: 'Des montants que vous pouvez justifier',
        paragraphs: [
          'L’attestation ne reprend que les règlements enregistrés dans l’année, avec leur mode de paiement. Quand un devis mêle SAP et hors SAP, les règlements sont répartis au prorata des prestations SAP, et l’application vous invite à vérifier ce montant.',
          'Paysapro AI ne remplace ni votre déclaration SAP, ni votre expert-comptable : vous restez responsable des informations portées sur vos documents. L’application ne gère pas l’avance immédiate de crédit d’impôt.',
        ],
      },
    ],
    faq: [
      {
        question: 'Faut-il être déclaré en services à la personne pour utiliser ce mode ?',
        answer: 'Oui. Le mode SAP s’adresse aux entreprises qui disposent d’une déclaration SAP. Paysapro AI n’effectue pas cette déclaration : il reprend votre numéro sur vos documents.',
      },
      {
        question: 'Paysapro AI génère-t-il lui-même le PDF de l’attestation fiscale ?',
        answer: 'Oui. Depuis la fiche du client, vous choisissez l’année : l’application contrôle les informations puis génère le PDF de l’attestation à partir des prestations SAP et des règlements enregistrés.',
      },
      {
        question: 'Que se passe-t-il s’il manque une information ?',
        answer: 'L’attestation n’est pas générée tant que les points signalés ne sont pas complétés. Aucune donnée n’est inventée.',
      },
      {
        question: 'Un devis peut-il contenir des prestations SAP et non SAP ?',
        answer: 'Oui. Les prestations SAP sont distinguées sur le devis, et les règlements sont répartis au prorata pour l’attestation.',
      },
      {
        question: 'Le mode SAP est-il payant ?',
        answer: 'Il est inclus gratuitement pendant la phase bêta.',
      },
    ],
    related: [
      { label: 'Attestation fiscale SAP jardinage : le guide du paysagiste', to: '/blog/attestation-fiscale-sap-jardinage' },
      { label: 'Le logiciel de devis paysagiste', to: '/logiciel-devis-paysagiste' },
      { label: 'Toutes les fonctionnalités', to: '/fonctionnalites' },
    ],
  },
];

export function landingByPath(path: string) {
  return LANDINGS.find((l) => l.path === path);
}
