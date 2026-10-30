/**
 * Pages d'atterrissage SEO : une page par intention de recherche, avec un contenu propre
 * (pas de pages « satellites » dupliquées, pas de pages par ville).
 * Règles : n'annoncer que ce que l'application fait ; aucun chiffre de gain inventé ; l'IA assiste, elle ne décide pas.
 * Title / description : src/marketing/config/pages.json.
 */
import type { BtpSampleId } from './sampleBtp';

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
  /** « L’essentiel » : 3 à 5 phrases qui répondent directement (repris par les moteurs et assistants IA) */
  summary: string[];
  visual: LandingVisual;
  sections: LandingSection[];
  faq: { question: string; answer: string }[];
  /** liens internes « pour aller plus loin » */
  related: { label: string; to: string }[];
  /** Métier présélectionné à l'inscription + bouton vers la démo correspondante */
  metier?: 'btp';
  /** Devis d'exemple du bâtiment affiché à la place du devis de paysagiste */
  btpSample?: BtpSampleId;
}

export const LANDINGS: Landing[] = [
  {
    path: '/logiciel-facturation-artisan',
    btpSample: 'renovation',
    eyebrow: 'Devis et factures pour artisans',
    h1: 'Devis et factures d’artisan, depuis votre téléphone.',
    intro: 'Le devis signé devient une facture d’acompte, puis une facture de solde, en un clic. Numérotation continue, mentions obligatoires, PDF à vos couleurs et suivi des encaissements : pour les artisans du bâtiment comme pour les paysagistes.',
    summary: [
      'Paysapro AI établit vos factures d’acompte, de solde et vos avoirs directement depuis le devis signé, sans ressaisie.',
      'Les factures sont numérotées automatiquement dans une séquence continue et ne peuvent plus être modifiées une fois émises, comme l’exige la loi.',
      'Elles reprennent les mentions obligatoires : identité de l’entreprise, assurance décennale, TVA par taux, échéance, pénalités de retard et indemnité de 40 €.',
      'Vous voyez à tout moment ce qui a été facturé et ce qui reste à encaisser.',
      'Chaque facture est produite au format électronique Factur-X (profil EN 16931), l’un des formats de la réforme de 2026-2027 ; le raccordement à une plateforme agréée est en préparation pour septembre 2027.',
    ],
    visual: 'quote',
    sections: [
      {
        heading: 'Du devis signé à la facture, en un clic',
        paragraphs: [
          'Dès que le client a signé, le devis propose deux boutons : « Facture d’acompte » et « Facturer tout le devis ». L’acompte reprend le pourcentage de votre choix, ventilé par taux de TVA. La facture de solde reprend toutes les prestations et déduit automatiquement les acomptes déjà facturés.',
          'Aucun chiffre n’est ressaisi : quantités, prix, lots et taux de TVA viennent du devis que votre client a accepté.',
        ],
      },
      {
        heading: 'Une facture conforme, sans y penser',
        list: [
          'Numérotation chronologique et continue, attribuée automatiquement (F2026-0001, F2026-0002…).',
          'Coordonnées de l’entreprise et du client figées au moment de l’émission.',
          'TVA détaillée par taux, franchise de TVA ou autoliquidation selon votre situation.',
          'Assurance décennale, date d’échéance, pénalités de retard et indemnité forfaitaire de 40 €.',
          'SIREN du client professionnel et catégorie de l’opération, demandés par la réforme.',
          'PDF à vos couleurs, à télécharger, partager ou envoyer par e-mail.',
          'Format Factur-X : le PDF contient aussi les données structurées de la facture, lisibles par les logiciels comptables.',
        ],
      },
      {
        heading: 'Une erreur ? Un avoir',
        paragraphs: [
          'Une facture émise ne se modifie pas et ne se supprime pas : c’est la règle. Paysapro AI le garantit. Pour corriger, vous créez un avoir qui annule la facture, puis vous émettez une facture corrigée. L’historique reste complet et lisible pour votre expert-comptable.',
        ],
      },
      {
        heading: 'Ce qui reste à encaisser',
        paragraphs: [
          'Les acomptes et soldes reçus s’enregistrent sur le chantier. Chaque facture affiche son état : payée, partiellement payée ou à encaisser, et la liste des factures totalise ce qui reste dû.',
        ],
      },
      {
        heading: 'Prêt pour la facture électronique de 2027',
        paragraphs: [
          'À partir du 1er septembre 2027, les TPE et micro-entreprises devront émettre leurs factures entre professionnels au format électronique, via une plateforme agréée. Vos factures Paysapro AI sont déjà au format Factur-X (profil EN 16931) : un PDF lisible qui contient aussi les données structurées de la facture. Le raccordement à une plateforme agréée est en préparation, pour que vous n’ayez pas à changer d’outil.',
        ],
      },
    ],
    faq: [
      { question: 'Puis-je faire une facture sans devis ?', answer: 'Les factures partent d’un devis accepté ou signé : c’est ce qui garantit que les montants correspondent à ce que le client a validé. Pour une petite intervention, créez un devis rapide, faites-le accepter, puis facturez-le.' },
      { question: 'Puis-je modifier une facture après l’avoir émise ?', answer: 'Non, et c’est voulu : une facture émise est un document comptable définitif. En cas d’erreur, créez un avoir depuis la facture, puis émettez une nouvelle facture corrigée.' },
      { question: 'Paysapro AI est-il compatible avec la facture électronique 2027 ?', answer: 'Oui pour le format : chaque facture est produite en Factur-X, profil EN 16931, l’un des formats retenus par la réforme. Le raccordement à une plateforme agréée, nécessaire pour transmettre les factures et les données à l’administration, est en préparation pour l’échéance de septembre 2027 qui concerne les TPE.' },
      { question: 'Mes factures sont-elles conservées ?', answer: 'Oui : elles sont enregistrées en ligne, ne peuvent être ni modifiées ni supprimées depuis l’application, et restent consultables même sans abonnement actif.' },
    ],
    related: [
      { label: 'Facture électronique Factur-X', to: '/logiciel-facture-electronique' },
      { label: 'Batipro AI, pour les artisans du BTP', to: '/logiciel-devis-batiment' },
      { label: 'Facture d’acompte : mode d’emploi', to: '/blog/facture-acompte-travaux' },
      { label: 'Mentions obligatoires d’une facture', to: '/blog/mentions-obligatoires-facture-artisan' },
      { label: 'Tarifs', to: '/tarifs' },
    ],
  },
  {
    path: '/logiciel-facture-electronique',
    btpSample: 'renovation',
    eyebrow: 'Facture électronique Factur-X',
    h1: 'Vos factures d’artisan au format électronique Factur-X.',
    intro: 'La facture électronique devient obligatoire entre professionnels pour les TPE et micro-entreprises le 1er septembre 2027. Paysapro AI produit déjà chaque facture au format Factur-X : un PDF que votre client lit normalement, avec les données de la facture intégrées pour les logiciels.',
    summary: [
      'Paysapro AI produit chaque facture, facture d’acompte et avoir au format Factur-X, profil EN 16931, l’un des formats retenus par la réforme française.',
      'Une facture Factur-X est un PDF lisible (PDF/A-3) qui contient un fichier XML : les montants, la TVA, le SIREN et l’échéance y sont lisibles par les logiciels comptables et les plateformes.',
      'Les fichiers sont contrôlés avec un outil de validation de référence du format Factur-X : PDF/A-3 et règles de la norme européenne EN 16931.',
      'Pour transmettre les factures et les données à l’administration, il faudra passer par une plateforme agréée : ce raccordement est en préparation dans Paysapro AI pour septembre 2027.',
      'Vous n’avez rien à faire de plus : la facture électronique est créée depuis le devis signé, comme la facture habituelle.',
    ],
    visual: 'quote',
    sections: [
      {
        heading: 'Factur-X, c’est quoi ?',
        paragraphs: [
          'Factur-X est un format de facture électronique franco-allemand (appelé ZUGFeRD en Allemagne). C’est un fichier PDF au format d’archivage PDF/A-3, dans lequel est joint un fichier XML qui décrit la facture de façon structurée : vendeur, client, lignes, taux de TVA, totaux, date d’échéance, coordonnées bancaires.',
          'Votre client voit une facture ordinaire. Son logiciel comptable, lui, lit directement les données, sans ressaisie. C’est l’un des trois formats de base acceptés par la réforme de la facturation électronique, avec UBL et CII.',
        ],
      },
      {
        heading: 'Ce que Paysapro AI produit déjà',
        list: [
          'Facture, facture d’acompte et avoir au format Factur-X, profil EN 16931 (le profil complet de la norme européenne).',
          'TVA ventilée par taux (20 %, 10 %, 5,5 %), franchise en base de TVA ou autoliquidation en sous-traitance, avec le motif d’exonération attendu.',
          'SIREN du vendeur et du client professionnel, numéro de TVA intracommunautaire, adresse et e-mail.',
          'Numéro du devis, date de réalisation des travaux, échéance, IBAN, acomptes déjà facturés et net à payer.',
          'Avoir relié à la facture qu’il annule.',
          'Unités du bâtiment et du paysage converties dans les codes officiels : m², ml, m³, heure, forfait.',
        ],
      },
      {
        heading: 'Contrôlé, pas seulement « compatible »',
        paragraphs: [
          'Un fichier Factur-X mal formé peut être refusé par la plateforme de votre client. Les factures de Paysapro AI sont contrôlées avec un outil de validation de référence du format, qui vérifie à la fois l’archivage PDF/A-3 et les règles métier de la norme EN 16931 : totaux cohérents, TVA, identifiants, références.',
        ],
      },
      {
        heading: 'Le calendrier de la réforme',
        list: [
          '1er septembre 2026 : toutes les entreprises doivent pouvoir recevoir des factures électroniques.',
          '1er septembre 2026 : les grandes entreprises et les ETI doivent les émettre.',
          '1er septembre 2027 : les PME, TPE et micro-entreprises doivent les émettre et transmettre leurs données à l’administration (e-reporting).',
        ],
      },
      {
        heading: 'Et la plateforme agréée ?',
        paragraphs: [
          'Entre professionnels, la facture électronique ne s’envoie plus par simple e-mail : elle transite par une plateforme agréée par l’administration, qui la transmet au client et déclare les données au fisc. Paysapro AI prépare ce raccordement pour l’échéance de septembre 2027. Les factures étant déjà au bon format, vous n’aurez pas à changer d’outil.',
          'Pour vos clients particuliers, la facture n’est pas une facture électronique au sens de la réforme : vous continuez à l’envoyer en PDF ; seules ses données font l’objet d’un e-reporting.',
        ],
      },
    ],
    faq: [
      { question: 'Une facture Factur-X, est-ce un PDF ?', answer: 'Oui : c’est un PDF lisible par tout le monde, au format d’archivage PDF/A-3, qui contient en plus un fichier XML avec les données de la facture. Votre client particulier peut l’ouvrir comme n’importe quel PDF.' },
      { question: 'Le format Factur-X est-il accepté par la réforme ?', answer: 'Oui, Factur-X fait partie des trois formats de base de la facturation électronique en France, avec UBL et CII. Paysapro AI utilise le profil EN 16931, qui couvre toutes les données de la norme européenne.' },
      { question: 'Faut-il une plateforme agréée en plus ?', answer: 'Oui, pour transmettre les factures entre professionnels et déclarer les données à l’administration à partir de septembre 2027. Le raccordement de Paysapro AI à une plateforme agréée est en préparation pour cette échéance.' },
      { question: 'Les micro-entrepreneurs sont-ils concernés ?', answer: 'Oui. Ils doivent pouvoir recevoir des factures électroniques depuis septembre 2026 et les émettre à partir de septembre 2027. Paysapro AI gère la franchise en base de TVA dans le format Factur-X.' },
      { question: 'Dois-je faire quelque chose de spécial pour obtenir une facture Factur-X ?', answer: 'Non : le bouton PDF de chaque facture produit directement le fichier Factur-X. Pensez seulement à renseigner votre SIRET et, pour vos clients professionnels, leur SIREN.' },
    ],
    related: [
      { label: 'Factur-X expliqué aux artisans', to: '/blog/factur-x-artisan' },
      { label: 'Facture électronique : ce qui change en 2026-2027', to: '/blog/facturation-electronique-artisans' },
      { label: 'Devis et factures pour artisans', to: '/logiciel-facturation-artisan' },
      { label: 'Tarifs', to: '/tarifs' },
    ],
  },
  {
    path: '/logiciel-devis-batiment',
    metier: 'btp',
    btpSample: 'renovation',
    eyebrow: 'Artisans du BTP · tous corps de métier',
    h1: 'Le logiciel de devis pour les artisans du bâtiment.',
    intro:
      'Rénovation ou neuf, maçonnerie, plâtrerie, électricité, plomberie, peinture, carrelage, couverture : Batipro AI transforme votre visite technique en devis conforme, chiffré par lot, puis le fait signer par votre client. Depuis votre téléphone.',
    summary: [
      'Batipro AI, la version BTP de Paysapro AI, est un logiciel de devis pour tous les corps de métier du bâtiment, en rénovation comme en neuf.',
      'Le devis est organisé par lots (corps d’état) avec sous-totaux, et chaque ligne peut avoir son taux de TVA : 20 %, 10 % ou 5,5 %.',
      'Les mentions du bâtiment sont reprises sur chaque devis : assurance décennale, immatriculation, qualifications (RGE…), début et durée des travaux, retenue de garantie, autoliquidation.',
      'Métrés de murs avec ouvertures déduites, calculateurs (peinture, carrelage, béton, plaques de plâtre) et catalogue d’environ 50 prestations types sont inclus.',
      'L’essai est gratuit pendant 15 jours, sans carte bancaire.',
    ],
    visual: 'quote',
    sections: [
      {
        heading: 'Un devis du bâtiment, organisé par lots',
        paragraphs: [
          'Un chantier de rénovation mélange souvent plusieurs corps d’état : démolition, plomberie, électricité, carrelage, peinture. Batipro AI range chaque prestation dans son lot et affiche un sous-total par lot : votre client comprend ce qu’il paie, et vous retrouvez votre chiffrage d’un coup d’œil.',
          'Le catalogue de départ contient des prestations types pour chaque lot — installation de chantier, maçonnerie, plâtrerie et isolation, électricité, plomberie et chauffage, menuiserie, peinture, carrelage, couverture, façade — avec unité, prix de vente et coût. Vous les adaptez à vos tarifs.',
        ],
      },
      {
        heading: 'TVA 20 %, 10 % ou 5,5 % : sans erreur de calcul',
        paragraphs: [
          'Sur chaque devis, vous indiquez le type de chantier : neuf ou local professionnel (20 %), rénovation d’un logement de plus de deux ans (10 %), rénovation énergétique (5,5 %). Chaque ligne peut garder son propre taux, par exemple une isolation à 5,5 % dans une rénovation à 10 %.',
          'Le devis présente un récapitulatif de TVA par taux et porte la mention par laquelle le client certifie, en signant, que son logement remplit les conditions du taux réduit (elle remplace depuis février 2025 les anciennes attestations 1300-SD et 1301-SD). L’autoliquidation en sous-traitance et la franchise de TVA des micro-entreprises sont prises en charge.',
        ],
      },
      {
        heading: 'Les mentions du bâtiment, une fois pour toutes',
        list: [
          'Assurance décennale : assureur, coordonnées, numéro de contrat et couverture géographique.',
          'Immatriculation au répertoire des métiers ou au RCS, SIRET, numéro de TVA.',
          'Qualifications (RGE, Qualibat…) affichées sous vos coordonnées.',
          'Date de début et durée estimée des travaux.',
          'Retenue de garantie de 5 % si vous l’utilisez.',
          'Vos conditions : acompte, avenants, pénalités de retard, droit de rétractation.',
        ],
      },
      {
        heading: 'Des métrés justes, directement sur place',
        paragraphs: [
          'Relevez les pièces, les murs (périmètre × hauteur) et les ouvertures à déduire. Chaque ligne du devis choisit sa mesure : la faïence sur les murs, le carrelage sur le sol, la peinture sur les plafonds. Les chutes sont ajoutées automatiquement.',
          'Les calculateurs intégrés donnent en un instant la surface nette d’un mur, les litres de peinture, le nombre de cartons de carrelage, le volume de béton et les sacs de ciment, ou le nombre de plaques de plâtre.',
        ],
      },
      {
        heading: 'Du devis signé au chantier suivi',
        paragraphs: [
          'Le client consulte le devis en ligne et le signe sur son téléphone. Vous suivez ensuite le chantier : planning, checklist (métré confirmé, matériaux commandés, réception), photos avant et après, acompte et solde reçus. Votre marge reste visible par vous seul, ligne par ligne.',
        ],
      },
    ],
    faq: [
      {
        question: 'Quels corps de métier du bâtiment sont concernés ?',
        answer:
          'Tous : rénovation tous corps d’état, maçonnerie et gros œuvre, plâtrerie, isolation, électricité, plomberie, chauffage, menuiserie, peinture, carrelage et sols, couverture, charpente, façade, serrurerie, démolition. Le catalogue de départ couvre les principaux lots et se complète avec vos propres prestations.',
      },
      {
        question: 'Comment Batipro AI gère-t-il les taux de TVA réduits ?',
        answer:
          'Vous choisissez le type de chantier sur le devis (20 %, 10 % ou 5,5 %) et chaque ligne peut avoir son propre taux. Le devis affiche le détail de la TVA par taux et porte la certification du client exigée pour le taux réduit. Vérifiez les cas particuliers avec votre comptable.',
      },
      {
        question: 'Puis-je utiliser Batipro AI si je suis aussi paysagiste ?',
        answer: 'Oui : Batipro AI et Paysapro sont le même logiciel, avec un compte et un abonnement. Le métier se choisit à l’inscription et se change à tout moment dans « Mon entreprise » : catalogue, modèles de devis, calculateurs, assistant et habillage s’adaptent.',
      },
      {
        question: 'Les mentions de mes devis sont-elles garanties conformes ?',
        answer:
          'Batipro AI reprend les mentions que vous renseignez (assurance décennale, immatriculation, conditions…). Il ne remplace pas un conseil juridique : faites valider vos mentions et vos conditions par votre conseiller.',
      },
    ],
    related: [
      { label: 'Logiciel de devis électricien', to: '/logiciel-devis-electricien' },
      { label: 'Logiciel de devis plombier', to: '/logiciel-devis-plombier' },
      { label: 'Logiciel de devis peintre', to: '/logiciel-devis-peintre' },
      { label: 'Logiciel de devis maçonnerie', to: '/logiciel-devis-maconnerie' },
      { label: 'Tarifs', to: '/tarifs' },
    ],
  },
  {
    path: '/logiciel-devis-electricien',
    metier: 'btp',
    btpSample: 'electricien',
    eyebrow: 'Logiciel de devis électricien',
    h1: 'Le logiciel de devis pensé pour les électriciens.',
    intro: 'Comptez les points lumineux et les prises pièce par pièce, ajoutez le tableau et les circuits, et envoyez un devis clair, signé en ligne par votre client. Directement depuis le chantier.',
    summary: [
      'Batipro AI est un logiciel de devis utilisable sur smartphone, conçu pour les artisans du BTP et adapté aux électriciens.',
      'Le catalogue de départ contient les prestations courantes : point lumineux, prise 16 A, tableau équipé, mise en conformité NF C 15-100, câbles et gaines au mètre.',
      'Un modèle « Rénovation électrique » prérempli se charge en un geste, puis s’ajuste au chantier.',
      'La TVA (20 %, 10 % ou 5,5 %), l’assurance décennale et vos qualifications apparaissent sur chaque devis.',
      'L’essai est gratuit pendant 15 jours, sans carte bancaire.',
    ],
    visual: 'quote',
    sections: [
      {
        heading: 'Un devis d’électricité structuré, sans recopier vos prix',
        paragraphs: [
          'Un devis d’électricité se construit à l’unité et au mètre : des points lumineux, des prises, un tableau, des longueurs de câble. Vous enregistrez une fois vos prestations avec leur prix de vente et leur coût, puis vous les ajoutez au devis en quelques touches.',
          'Le modèle « Rénovation électrique » regroupe tableau, prises, points lumineux, câblage et mise en conformité : vous ajustez les quantités et le devis est prêt.',
        ],
      },
      {
        heading: 'Rénovation ou neuf : la bonne TVA, ligne par ligne',
        paragraphs: [
          'En rénovation d’un logement de plus de deux ans, vos travaux passent à 10 % ; en neuf ou en local professionnel, à 20 %. Batipro AI applique le taux du type de chantier choisi, affiche le récapitulatif de TVA et ajoute la certification du client exigée en cas de taux réduit.',
        ],
      },
      {
        heading: 'Ce que votre client reçoit',
        list: [
          'Un devis à vos couleurs, organisé par lots (électricité, installation de chantier…).',
          'Vos mentions : assurance décennale, immatriculation, qualifications (Qualifelec, RGE…).',
          'La date de début et la durée estimée des travaux.',
          'Un lien pour consulter et signer le devis sur son téléphone.',
        ],
      },
      {
        heading: 'Votre marge, visible par vous seul',
        paragraphs: [
          'Chaque ligne porte un prix de vente et un coût interne : vous voyez la marge du devis avant de l’envoyer, sans qu’elle n’apparaisse jamais sur le document du client.',
        ],
      },
    ],
    faq: [
      { question: 'Batipro AI gère-t-il l’attestation Consuel ?', answer: 'Non. Batipro AI prépare et fait signer vos devis ; la mise en conformité et l’attestation Consuel restent à mentionner dans la description des travaux si elles sont prévues.' },
      { question: 'Puis-je créer mes propres prestations ?', answer: 'Oui. Le catalogue de départ est un exemple à tarifs indicatifs : vous modifiez les prix, ajoutez vos prestations (domotique, borne de recharge, VMC…) et créez vos propres modèles de devis.' },
    ],
    related: [
      { label: 'Batipro AI, pour les artisans du BTP', to: '/logiciel-devis-batiment' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Logiciel de devis plombier', to: '/logiciel-devis-plombier' },
      { label: 'Logiciel de devis peintre', to: '/logiciel-devis-peintre' },
      { label: 'Logiciel de devis maçonnerie', to: '/logiciel-devis-maconnerie' },
    ],
  },
  {
    path: '/logiciel-devis-plombier',
    metier: 'btp',
    btpSample: 'plombier',
    eyebrow: 'Logiciel de devis plombier',
    h1: 'Le logiciel de devis des plombiers et chauffagistes.',
    intro: 'De la rénovation de salle de bains au remplacement d’un chauffe-eau, chiffrez sur place, appliquez la bonne TVA et faites signer votre client depuis votre téléphone.',
    summary: [
      'Batipro AI, la version BTP de Paysapro AI, est un logiciel de devis adapté aux plombiers et chauffagistes, utilisable sur smartphone.',
      'Le catalogue de départ comprend la création de points d’eau, le WC suspendu, la douche extra-plate, le meuble vasque, les radiateurs et le chauffe-eau thermodynamique.',
      'Le modèle « Rénovation de salle de bains » assemble dépose, plomberie, carrelage et évacuation des gravats en un geste.',
      'Chaque ligne peut avoir son taux de TVA, par exemple 5,5 % pour un chauffe-eau thermodynamique dans une rénovation à 10 %.',
      'L’essai est gratuit pendant 15 jours, sans carte bancaire.',
    ],
    visual: 'quote',
    sections: [
      {
        heading: 'Une salle de bains chiffrée sur place',
        paragraphs: [
          'Relevez le sol et les murs à faïencer (périmètre × hauteur, porte déduite) : chaque ligne du devis choisit sa surface, et les chutes sont ajoutées automatiquement. Les équipements se comptent à l’unité.',
          'Le devis présente les lots (démolition, plomberie, carrelage) avec leurs sous-totaux : votre client comprend ce qu’il paie.',
        ],
      },
      {
        heading: 'TVA réduite : 10 % et 5,5 % dans le même devis',
        paragraphs: [
          'Pour un logement de plus de deux ans, les travaux de plomberie passent à 10 %, et certains équipements performants peuvent relever du taux de 5,5 %. Batipro AI calcule la TVA ligne par ligne et affiche un récapitulatif par taux. Vérifiez les conditions d’éligibilité avec votre comptable.',
        ],
      },
      {
        heading: 'Vos prix, vos marges',
        paragraphs: [
          'Chaque prestation porte un prix de vente et un coût d’achat. Ajustez le catalogue de départ à vos tarifs et à vos fournisseurs : la marge de chaque devis s’affiche pour vous seul, jamais sur le document du client.',
        ],
      },
      {
        heading: 'Du devis signé au chantier',
        list: [
          'Le client signe le devis en ligne, vous êtes prévenu.',
          'Vous planifiez l’intervention et suivez la checklist du chantier.',
          'Vous enregistrez l’acompte et le solde reçus.',
          'Les photos avant et après restent rangées avec le chantier.',
        ],
      },
    ],
    faq: [
      { question: 'Puis-je faire un devis de dépannage rapide ?', answer: 'Oui : déplacement, main-d’œuvre à l’heure et petites fournitures sont dans le catalogue. Le devis se crée en quelques minutes et se signe sur place.' },
      { question: 'Les tarifs du catalogue sont-ils ceux du marché ?', answer: 'Ce sont des tarifs indicatifs pour démarrer. Remplacez-les par vos prix d’achat et de vente : ils seront repris sur tous vos devis.' },
    ],
    related: [
      { label: 'Batipro AI, pour les artisans du BTP', to: '/logiciel-devis-batiment' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Logiciel de devis électricien', to: '/logiciel-devis-electricien' },
      { label: 'Logiciel de devis peintre', to: '/logiciel-devis-peintre' },
      { label: 'Logiciel de devis maçonnerie', to: '/logiciel-devis-maconnerie' },
    ],
  },
  {
    path: '/logiciel-devis-peintre',
    metier: 'btp',
    btpSample: 'peintre',
    eyebrow: 'Logiciel de devis peintre',
    h1: 'Le logiciel de devis pour les peintres en bâtiment.',
    intro: 'Mesurez les murs et les plafonds, déduisez les ouvertures, et obtenez un devis précis au mètre carré, prêt à être signé par votre client.',
    summary: [
      'Batipro AI, la version BTP de Paysapro AI, est un logiciel de devis utilisable sur smartphone pour les peintres en bâtiment.',
      'Les métrés se saisissent sur place : murs en périmètre × hauteur, plafonds, ouvertures à déduire.',
      'Un calculateur donne les litres de peinture selon la surface, le nombre de couches et le rendement du produit.',
      'Le catalogue de départ comprend protection, préparation des supports, peinture des murs et plafonds en deux couches, toile de verre.',
      'L’essai est gratuit pendant 15 jours, sans carte bancaire.',
    ],
    visual: 'quote',
    sections: [
      {
        heading: 'Des surfaces justes, ouvertures déduites',
        paragraphs: [
          'Le devis d’un peintre se joue sur les mètres carrés. Saisissez le périmètre et la hauteur sous plafond de chaque pièce, déduisez portes et fenêtres : la surface nette alimente directement les lignes du devis, préparation comprise.',
          'Plafonds et murs gardent chacun leur surface : la peinture des plafonds ne se calcule pas sur les murs, et inversement.',
        ],
      },
      {
        heading: 'Les quantités de produit en un instant',
        paragraphs: [
          'Le calculateur de peinture convertit une surface en litres selon le nombre de couches et le rendement indiqué sur le pot. Pratique pour commander juste et vérifier votre coût de fournitures.',
        ],
      },
      {
        heading: 'Signé sur place, suivi jusqu’à la réception',
        paragraphs: [
          'Présentez le devis sur votre téléphone ou envoyez le lien : le client le signe en ligne. Vous planifiez ensuite le chantier, cochez la checklist (protection, préparation, finitions, nettoyage) et gardez les photos avant et après pour vos prochains clients.',
        ],
      },
      {
        heading: 'Pour les particuliers comme pour les professionnels',
        list: [
          'TVA 10 % pour la rénovation d’un logement de plus de deux ans, 20 % pour les locaux professionnels.',
          'Retenue de garantie de 5 % proposée pour les marchés avec des professionnels.',
          'Autoliquidation de la TVA en sous-traitance.',
          'Devis par lots avec sous-totaux.',
        ],
      },
    ],
    faq: [
      { question: 'Puis-je chiffrer une pièce entière avec un modèle ?', answer: 'Oui : le modèle « Peinture d’une pièce » ajoute protection, préparation, murs et plafond. Il ne reste qu’à saisir les mesures.' },
      { question: 'Le calcul des litres tient-il compte des chutes ?', answer: 'Le calcul se base sur la surface, les couches et le rendement. Ajoutez une marge si le support est très absorbant, selon votre expérience.' },
    ],
    related: [
      { label: 'Batipro AI, pour les artisans du BTP', to: '/logiciel-devis-batiment' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Logiciel de devis électricien', to: '/logiciel-devis-electricien' },
      { label: 'Logiciel de devis plombier', to: '/logiciel-devis-plombier' },
      { label: 'Logiciel de devis maçonnerie', to: '/logiciel-devis-maconnerie' },
    ],
  },
  {
    path: '/logiciel-devis-maconnerie',
    metier: 'btp',
    btpSample: 'macon',
    eyebrow: 'Logiciel de devis maçonnerie',
    h1: 'Le logiciel de devis pour les maçons.',
    intro: 'Dalles, murs, chapes, ouvertures : chiffrez vos travaux de maçonnerie au m², au m³ et au forfait, avec vos prix, et faites signer le devis depuis le chantier.',
    summary: [
      'Batipro AI, la version BTP de Paysapro AI, est un logiciel de devis utilisable sur smartphone, adapté à la maçonnerie et au gros œuvre.',
      'Le catalogue de départ comprend dalle béton armé, mur en parpaings, chape ciment, béton prêt à l’emploi au m³, ouverture dans un mur porteur et évacuation des gravats.',
      'Un calculateur donne le volume de béton et le nombre de sacs de ciment selon la surface, l’épaisseur et le dosage.',
      'Votre assurance décennale (assureur, contrat, couverture géographique) figure sur chaque devis.',
      'L’essai est gratuit pendant 15 jours, sans carte bancaire.',
    ],
    visual: 'quote',
    sections: [
      {
        heading: 'Surfaces, volumes et forfaits dans le même devis',
        paragraphs: [
          'Une dalle se chiffre au m², le béton fourni au m³ selon l’épaisseur, une ouverture de mur porteur au forfait. Batipro AI calcule les quantités à partir de vos mesures et applique les pertes prévues.',
          'L’installation de chantier, la location d’échafaudage et l’évacuation des gravats s’ajoutent en un geste depuis le catalogue.',
        ],
      },
      {
        heading: 'Un devis qui rassure votre client',
        list: [
          'Lots et sous-totaux : installation, démolition, maçonnerie.',
          'Assurance décennale, immatriculation et qualifications.',
          'Date de début, durée estimée, acompte et solde.',
          'Signature en ligne et suivi du chantier jusqu’à la réception.',
        ],
      },
      {
        heading: 'Des coûts maîtrisés',
        paragraphs: [
          'Ciment, granulats, location de matériel : chaque ligne garde son coût d’achat à côté de son prix de vente. Vous voyez la marge du devis avant de l’envoyer, et vous l’ajustez d’un geste si les prix des matériaux ont bougé.',
        ],
      },
      {
        heading: 'Neuf ou rénovation',
        paragraphs: [
          'Construction neuve et agrandissements importants restent à 20 % ; la rénovation d’un logement de plus de deux ans peut relever du taux de 10 %. Le type de chantier choisi fixe le taux, que vous pouvez ajuster ligne par ligne.',
        ],
      },
    ],
    faq: [
      { question: 'Puis-je suivre plusieurs chantiers en même temps ?', answer: 'Oui. Chaque chantier a son devis, ses photos, son planning, sa checklist et ses paiements reçus. Le tableau de bord montre ce qui est en cours.' },
      { question: 'Le logiciel fait-il les situations de travaux ?', answer: 'Pas encore : Batipro AI couvre le devis, la signature, le suivi du chantier et la facturation (facture d’acompte, facture de solde, avoirs). Les acomptes et le solde reçus s’enregistrent dans le chantier.' },
    ],
    related: [
      { label: 'Batipro AI, pour les artisans du BTP', to: '/logiciel-devis-batiment' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Logiciel de devis électricien', to: '/logiciel-devis-electricien' },
      { label: 'Logiciel de devis plombier', to: '/logiciel-devis-plombier' },
      { label: 'Logiciel de devis peintre', to: '/logiciel-devis-peintre' },
    ],
  },
  {
    path: '/logiciel-devis-paysagiste',
    eyebrow: 'Logiciel de devis paysagiste',
    h1: 'Le logiciel de devis pensé pour les paysagistes.',
    intro:
      'Paysapro AI transforme votre visite de chantier en devis professionnel : photos, métrés, prestations issues de votre catalogue, total TTC et signature du client. Le tout depuis votre téléphone.',
    summary: [
      "Paysapro AI est un logiciel de devis conçu pour les paysagistes, utilisable depuis un smartphone.",
      "Il calcule les surfaces, linéaires et volumes à partir de vos mesures, et applique les prix de votre propre catalogue.",
      "Le devis reprend vos informations d’entreprise, la TVA, l’acompte et vos conditions ; le client peut le signer en ligne.",
      "L’essai est gratuit pendant 15 jours, sans carte bancaire."
    ],
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
          'Pour vos devis et vos factures, oui : facture d’acompte et de solde en un clic depuis le devis signé, avoirs, numérotation continue et mentions obligatoires. Paysapro AI ne tient pas votre comptabilité : vos factures se transmettent à votre expert-comptable.',
      },
      {
        question: 'Puis-je faire un devis directement chez le client ?',
        answer: 'Oui. L’application est conçue pour le téléphone : vous pouvez saisir les dimensions, choisir vos prestations et préparer le devis sur place.',
      },
      {
        question: 'Combien coûte le logiciel ?',
        answer: 'L’essai est gratuit pendant 15 jours, sans carte bancaire. Ensuite, les offres commencent à 19 € HT par mois, sans engagement.',
      },
      {
        question: 'Mes tarifs sont-ils imposés par le logiciel ?',
        answer: 'Non. Vous créez votre propre catalogue de prestations, avec vos unités, vos prix et vos coûts.',
      },
    ],
    related: [
      { label: 'Comparatif 2026 des logiciels de devis pour paysagistes', to: '/comparatif-logiciel-devis-paysagiste' },
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
    summary: [
      "Paysapro AI réunit clients, chantiers, photos, catalogue de prix et devis dans un seul outil.",
      "Un tableau de bord montre les devis en attente et les devis signés.",
      "Planning des chantiers, statistiques et travail en équipe avec des rôles sont disponibles.",
      "Il fonctionne sur smartphone, tablette et ordinateur, avec les mêmes données."
    ],
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
    summary: [
      "Paysapro AI s’utilise dans le navigateur du téléphone, sur iPhone comme sur Android, sans installation.",
      "Sur le chantier : photos, mesures, surfaces calculées et prestations issues de votre catalogue.",
      "Le devis se prépare sur place et se retrouve ensuite sur ordinateur."
    ],
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
    summary: [
      "Un devis paysagiste comprend l’en-tête de l’entreprise, le client et le chantier, le détail des prestations, les totaux HT, TVA et TTC, l’acompte, les conditions et la signature.",
      "Chaque prestation indique une quantité, une unité (m², ml, m³, unité, heure) et un prix.",
      "Les travaux de jardinage et de maçonnerie paysagère doivent aussi préciser la gestion des déchets du chantier.",
      "Les quantités incertaines sont signalées comme estimées, à confirmer par un métré."
    ],
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
    summary: [
      "Paysapro AI propose un mode SAP pour les entreprises déclarées en services à la personne.",
      "Vous marquez vos prestations éligibles ; le devis reprend votre numéro SAP et distingue les montants concernés.",
      "L’application génère elle-même le PDF de l’attestation fiscale annuelle de chaque client, à partir des règlements enregistrés.",
      "Elle signale les informations manquantes au lieu de les inventer."
    ],
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
        answer: 'Il est inclus dans les offres Pro et Business, et pendant les 15 jours d’essai gratuit.',
      },
    ],
    related: [
      { label: 'Attestation fiscale SAP jardinage : le guide du paysagiste', to: '/blog/attestation-fiscale-sap-jardinage' },
      { label: 'Le logiciel de devis paysagiste', to: '/logiciel-devis-paysagiste' },
      { label: 'Toutes les fonctionnalités', to: '/fonctionnalites' },
    ],
  },
  {
    path: '/quest-ce-que-paysapro-ai',
    eyebrow: 'Présentation',
    h1: 'Qu’est-ce que Paysapro AI ?',
    intro:
      'Paysapro AI est un logiciel de devis et de gestion de chantiers pour les paysagistes. Il permet de passer de la visite du chantier à un devis professionnel signé par le client, depuis un smartphone.',
    summary: [
      'Paysapro AI est un logiciel de devis en ligne pour les paysagistes et les entreprises d’aménagement extérieur.',
      'Il sert à photographier le chantier, mesurer, chiffrer avec ses propres prix, générer le devis et le faire signer en ligne.',
      'Il propose aussi un mode services à la personne qui génère l’attestation fiscale annuelle en PDF.',
      'Il fonctionne sur smartphone, tablette et ordinateur, sans installation.',
      'L’essai est gratuit pendant 15 jours ; les offres commencent ensuite à 19 € HT par mois, sans engagement.',
    ],
    visual: 'phone',
    sections: [
      {
        heading: 'Ce que fait Paysapro AI',
        list: [
          'Fiches clients et dossiers de chantier.',
          'Photos du chantier, rangées avec le bon client.',
          'Mesures et calcul des surfaces, linéaires et volumes.',
          'Catalogue de prestations avec vos unités, prix de vente et coûts.',
          'Devis professionnels en PDF, à vos couleurs, et modèles de devis.',
          'Lien client : consultation et signature du devis en ligne.',
          'Planning des chantiers, statistiques, suivi de la marge.',
          'Mode services à la personne avec attestation fiscale annuelle.',
          'Travail en équipe, avec plusieurs utilisateurs et des rôles.',
          'Un assistant qui suggère des prestations, toujours à valider.',
        ],
      },
      {
        heading: 'À qui s’adresse Paysapro AI ?',
        paragraphs: [
          'Aux paysagistes indépendants et aux entreprises du paysage de 1 à 20 personnes : création de jardins, aménagement extérieur, entretien d’espaces verts, terrasses, clôtures, plantations, engazonnement et aménagements minéraux.',
        ],
      },
      {
        heading: 'Comment fonctionne Paysapro AI ?',
        list: [
          'Créez le client et le chantier.',
          'Prenez les photos et saisissez les dimensions.',
          'Ajoutez les prestations depuis votre catalogue : les quantités sont reprises des mesures.',
          'Vérifiez l’aperçu du devis puis envoyez-le.',
          'Le client consulte le devis et le signe en ligne ; vous suivez son statut.',
        ],
      },
      {
        heading: 'Ce que Paysapro AI ne fait pas',
        paragraphs: [
          'Paysapro AI est centré sur le chantier, le devis et la facture : il ne tient pas votre comptabilité. Il ne gère pas l’avance immédiate de crédit d’impôt des services à la personne. Et son assistant ne fixe pas les prix à votre place : les quantités, les prix et le devis final restent sous votre contrôle.',
        ],
      },
      {
        heading: 'Combien coûte Paysapro AI ?',
        paragraphs: [
          'L’essai est gratuit pendant 15 jours, avec toutes les fonctionnalités et sans carte bancaire. Ensuite, trois offres sans engagement (Starter, Pro et Business, au mois ou à l’année) ; les utilisateurs seront informés avant toute évolution payante. Le détail est sur la page Tarifs.',
        ],
      },
    ],
    faq: [
      {
        question: 'Paysapro AI est-il un logiciel ou une application ?',
        answer: 'Les deux : c’est un logiciel en ligne qui s’utilise dans le navigateur, sur ordinateur comme sur téléphone, et qui peut être ajouté à l’écran d’accueil du téléphone comme une application.',
      },
      {
        question: 'Qui édite Paysapro AI ?',
        answer: 'Paysapro AI est développé avec les retours de professionnels du paysage et du bâtiment qui l’utilisent. Les informations sur l’éditeur figurent dans les mentions légales.',
      },
      {
        question: 'Où sont stockées les données ?',
        answer: 'Les données de votre compte sont enregistrées dans une base de données en ligne, accessible uniquement aux membres de votre entreprise.',
      },
    ],
    related: [
      { label: 'Toutes les fonctionnalités', to: '/fonctionnalites' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Comment choisir un logiciel de devis paysagiste ?', to: '/blog/choisir-logiciel-devis-paysagiste' },
    ],
  },
  {
    // Comparatif : uniquement des informations publiées par les éditeurs, datées et sourcées ; aucun avis
    // client repris, aucun dénigrement (publicité comparative, art. L122-1 du Code de la consommation).
    path: '/comparatif-logiciel-devis-paysagiste',
    eyebrow: 'Comparatif 2026',
    h1: 'Logiciel de devis pour paysagiste : le comparatif 2026',
    intro: 'Six logiciels de devis et de facturation utilisés par les paysagistes, comparés sur ce qui compte au quotidien : spécialisation paysage, usage sur le chantier, signature en ligne, services à la personne et prix publics. Comparatif rédigé par l’éditeur de Paysapro AI, à partir des informations publiées par chaque éditeur et vérifiées le 30 octobre 2026.',
    summary: [
      'Trois logiciels sont pensés pour le paysage : Paysapro AI, Robbin et Extrabat Paysage. Obat et Tolteck visent les artisans du bâtiment, Henrri la facturation de toutes les petites entreprises.',
      'Paysapro AI se distingue par le devis fait sur le chantier : photos, mesures au m² et au mètre linéaire qui calculent les quantités, puis signature du client en ligne.',
      'Robbin est un logiciel de devis et facturation en ligne pour jardiniers paysagistes, avec attestation SAP et avance immédiate ; Extrabat Paysage est une suite de gestion plus large (CRM, interventions, contrats d’entretien).',
      'Prix publics d’entrée : de la version gratuite d’Henrri à 49 € HT par mois pour Extrabat Paysage ; Paysapro AI commence à 19 € HT par mois, avec 15 jours d’essai gratuit.',
      'Le meilleur choix dépend de votre activité : taille de l’équipe, part d’entretien et de services à la personne, besoin d’une gestion complète ou d’un outil de devis rapide.',
    ],
    visual: 'quote',
    sections: [
      {
        heading: 'Comment nous avons comparé',
        paragraphs: [
          'Nous sommes l’éditeur de Paysapro AI : ce comparatif n’est donc pas neutre, et nous le disons. Pour qu’il reste utile, il ne s’appuie que sur des éléments vérifiables publiés par chaque éditeur sur son site (fonctionnalités annoncées, prix publics, durée d’essai), relevés le 30 octobre 2026. Les prix sont hors taxes ; ils peuvent évoluer et des promotions ponctuelles peuvent s’appliquer : vérifiez-les sur le site de chaque éditeur avant de choisir.',
          'Une information est inexacte ou a changé ? Écrivez-nous depuis la page Contact : nous la corrigeons rapidement.',
        ],
      },
      {
        heading: 'Paysapro AI',
        paragraphs: ['Logiciel de devis en ligne pour paysagistes et artisans du bâtiment, conçu pour être utilisé sur le chantier depuis un téléphone.'],
        list: [
          'Points forts : photos et mesures du chantier (surfaces, longueurs, volumes) qui calculent les quantités du devis ; catalogue de prix avec coût et marge ; devis en ligne que le client signe sur son téléphone ; factures d’acompte et de solde au format Factur-X ; mode services à la personne avec attestation fiscale annuelle.',
          'Pour qui : paysagistes seuls ou petites équipes qui veulent faire leurs devis plus vite, sur place.',
          'Prix publics : Starter 19 €, Pro 39 €, Business 69 € HT par mois, 25 % de moins à l’année ; essai gratuit de 15 jours sans carte bancaire. Le mode SAP est inclus à partir de l’offre Pro.',
        ],
      },
      {
        heading: 'Robbin',
        paragraphs: ['Logiciel de devis et facturation 100 % en ligne pour jardiniers paysagistes, édité par ISAGRI.'],
        list: [
          'Points forts annoncés : bibliothèque d’ouvrages, devis avec signature électronique, factures, dossiers clients, planning de l’équipe, marges et temps de chantier, attestation de services à la personne et avance immédiate, attestation de TVA, contrats d’entretien.',
          'Pour qui : jardiniers paysagistes, notamment ceux qui ont une activité importante en services à la personne.',
          'Prix publics : Essentiel 19 € HT par mois (15 € à l’année), Pro 49 € HT par mois (39 € à l’année) ; essai gratuit de 14 jours sans carte bancaire.',
        ],
      },
      {
        heading: 'Extrabat Paysage',
        paragraphs: ['Suite de gestion en ligne d’Extrabat déclinée pour les paysagistes, avec des applications pour les équipes de terrain.'],
        list: [
          'Points forts annoncés : CRM, devis et factures, signature électronique, planning et charge de travail, rapports d’intervention avec photos sur mobile, y compris hors connexion, suivi des contrats d’entretien, commandes fournisseurs, compatibilité avec les services à la personne.',
          'Pour qui : entreprises du paysage structurées, avec plusieurs équipes et une part importante d’entretien.',
          'Prix publics : à partir de 49 € HT par mois, sans engagement de durée ; démonstration sur demande.',
        ],
      },
      {
        heading: 'Obat',
        paragraphs: ['Logiciel de devis et facturation pour les artisans et entreprises du bâtiment.'],
        list: [
          'Points forts annoncés : devis et factures illimités, modèles de devis et bibliothèque d’ouvrages chiffrés, signature électronique, facture électronique, applications iOS et Android, agenda et planning dans les offres supérieures.',
          'Pour qui : artisans du bâtiment ; le paysage n’est pas présenté comme un métier ciblé.',
          'Prix publics : de 32 € HT par mois pour une micro-entreprise non assujettie à la TVA, et 49 € HT par mois pour un artisan assujetti (moins cher à l’année) ; essai gratuit de 14 jours.',
        ],
      },
      {
        heading: 'Tolteck',
        paragraphs: ['Logiciel de devis et factures pour le bâtiment, utilisable sur ordinateur, tablette et téléphone.'],
        list: [
          'Points forts annoncés : devis et factures personnalisés, bibliothèque d’ouvrages, suivi des documents, fonctionnement même sans connexion internet, accompagnement à la prise en main.',
          'Pour qui : artisans du bâtiment qui veulent un outil de devis simple ; le paysage n’est pas présenté comme un métier ciblé.',
          'Prix publics : 25 € HT par mois, ou 19 € HT par mois à l’année ; un mois d’essai gratuit.',
        ],
      },
      {
        heading: 'Henrri',
        paragraphs: ['Logiciel de facturation en ligne généraliste, pour les petites entreprises de tous secteurs.'],
        list: [
          'Points forts annoncés : devis et factures illimités dans la version gratuite, facture électronique, validation des devis en ligne ; options payantes pour la signature, le multi-utilisateur et les relances automatiques.',
          'Pour qui : entreprises qui cherchent avant tout une facturation simple et peu coûteuse, sans fonctions propres au paysage.',
          'Prix publics : version gratuite, puis offres payantes Expert, Smart et VIP.',
        ],
      },
      {
        heading: 'Quel logiciel choisir ?',
        list: [
          'Vous faites vos devis sur le chantier et voulez les envoyer le jour même : un outil pensé pour le téléphone, avec photos, mesures et signature en ligne, comme Paysapro AI.',
          'Votre activité repose surtout sur les services à la personne : vérifiez l’attestation fiscale et l’avance immédiate, proposées par Robbin et Extrabat Paysage, l’attestation par Paysapro AI.',
          'Vous dirigez plusieurs équipes et beaucoup de contrats d’entretien : une suite de gestion complète comme Extrabat Paysage.',
          'Vous faites aussi beaucoup de maçonnerie ou de rénovation : Obat ou Tolteck couvrent le bâtiment, Paysapro AI propose aussi un mode bâtiment.',
          'Vous voulez seulement facturer au moindre coût : Henrri et sa version gratuite.',
        ],
        paragraphs: [
          'Dans tous les cas, profitez des essais gratuits : refaites un vrai devis récent avec chaque logiciel et comparez le temps passé et le résultat envoyé au client.',
        ],
      },
    ],
    faq: [
      {
        question: 'Quel est le meilleur logiciel de devis pour paysagiste ?',
        answer: 'Il n’existe pas de meilleur logiciel pour tous : un paysagiste seul qui chiffre sur le chantier, une entreprise centrée sur les services à la personne et une entreprise avec plusieurs équipes d’entretien n’ont pas les mêmes besoins. Comparez la spécialisation paysage, l’usage sur téléphone, la signature en ligne, la gestion des services à la personne et le prix, puis testez sur un vrai devis pendant l’essai gratuit.',
      },
      {
        question: 'Existe-t-il un logiciel de devis paysagiste gratuit ?',
        answer: 'Henrri propose une version gratuite de facturation, sans fonctions propres au paysage. Les logiciels spécialisés comme Paysapro AI ou Robbin sont payants mais proposent un essai gratuit, de 15 jours pour Paysapro AI et de 14 jours pour Robbin, sans carte bancaire.',
      },
      {
        question: 'Ce comparatif est-il indépendant ?',
        answer: 'Non : il est rédigé par l’éditeur de Paysapro AI. Il se limite aux informations publiées par chaque éditeur, vérifiées le 30 octobre 2026, et toute erreur signalée est corrigée.',
      },
      {
        question: 'Quel logiciel gère l’attestation fiscale des services à la personne ?',
        answer: 'Parmi les logiciels comparés, Paysapro AI, Robbin et Extrabat Paysage annoncent la gestion des services à la personne. Paysapro AI génère l’attestation fiscale annuelle de chaque client à partir des paiements enregistrés ; Robbin et Extrabat Paysage annoncent aussi l’avance immédiate.',
      },
    ],
    related: [
      { label: 'Comment choisir un logiciel de devis paysagiste ?', to: '/blog/choisir-logiciel-devis-paysagiste' },
      { label: 'Le logiciel de devis paysagiste Paysapro AI', to: '/logiciel-devis-paysagiste' },
      { label: 'Tarifs et essai gratuit', to: '/tarifs' },
    ],
  },
];

export function landingByPath(path: string) {
  return LANDINGS.find((l) => l.path === path);
}
