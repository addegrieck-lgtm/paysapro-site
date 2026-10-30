import type { FaqItem } from './faq';

/**
 * Centre d'aide : premiers pas et questions pratiques (« comment faire… »), distinctes de la FAQ commerciale
 * (/faq) pour ne pas dupliquer son balisage FAQPage. Ne décrire que ce que l'application fait réellement.
 */
export const HELP_STEPS: { title: string; text: string }[] = [
  {
    title: 'Créez votre compte et votre entreprise',
    text: 'Renseignez le nom de l’entreprise, vos coordonnées et votre logo. Ces informations apparaissent sur chaque devis et chaque facture.',
  },
  {
    title: 'Préparez votre catalogue',
    text: 'Ajoutez vos prestations avec leur unité (m², m³, mètre linéaire, heure, forfait), votre prix de vente et votre coût. Un catalogue de départ est proposé : modifiez-le plutôt que de partir de zéro.',
  },
  {
    title: 'Faites votre premier devis sur le chantier',
    text: 'Le parcours guidé enchaîne client, chantier, photos, mesures et prix. Le brouillon est enregistré automatiquement : vous pouvez l’interrompre et le reprendre plus tard.',
  },
  {
    title: 'Envoyez-le et faites-le signer',
    text: 'Partagez le lien du devis : votre client le consulte sur son téléphone, l’accepte et signe en ligne. Vous êtes prévenu quand il l’ouvre et quand il le signe.',
  },
  {
    title: 'Facturez et suivez le chantier',
    text: 'Une fois le devis signé, établissez les factures d’acompte et de solde, enregistrez les paiements reçus et suivez l’avancement du chantier.',
  },
];

export const HELP_FAQ: FaqItem[] = [
  {
    id: 'aide-installer',
    question: 'Comment installer Paysapro AI sur mon téléphone ?',
    answer:
      'Paysapro AI s’utilise dans le navigateur, sans passer par un magasin d’applications. Ouvrez l’application sur votre téléphone puis ajoutez-la à l’écran d’accueil (menu Partager sur iPhone, menu du navigateur sur Android) : elle s’ouvre ensuite comme une application classique.',
  },
  {
    id: 'aide-logo',
    question: 'Comment mettre mon logo et mes couleurs sur mes devis ?',
    answer:
      'Dans Paramètres, rubrique Entreprise : ajoutez votre logo et choisissez la couleur de votre entreprise. Ils sont repris sur le devis en ligne, sur le PDF et sur les factures.',
  },
  {
    id: 'aide-tarifs',
    question: 'Comment enregistrer mes propres tarifs ?',
    answer:
      'Dans Paramètres, rubrique Catalogue : créez, modifiez ou dupliquez vos prestations. Pour chacune, indiquez l’unité, le prix de vente et le coût interne : la marge est calculée automatiquement et reste visible uniquement par vous.',
  },
  {
    id: 'aide-mesures',
    question: 'Comment les mesures du chantier arrivent-elles dans le devis ?',
    answer:
      'Dans l’étape Mesures, saisissez vos zones (rectangle, triangle, cercle ou surface connue) et vos longueurs, en déduisant si besoin les parties à exclure. Les quantités calculées alimentent directement les lignes de prix correspondantes.',
  },
  {
    id: 'aide-signature',
    question: 'Comment mon client signe-t-il le devis ?',
    answer:
      'Envoyez-lui le lien du devis. Il voit votre devis avec les photos du chantier, l’accepte et signe du doigt sur son téléphone ou à la souris. Le statut du devis passe alors à Signé et vous recevez une notification.',
  },
  {
    id: 'aide-equipe',
    question: 'Puis-je travailler à plusieurs sur le même compte ?',
    answer:
      'Oui, selon votre offre. Dans Paramètres, rubrique Équipe, invitez un collègue par e-mail : il rejoint votre entreprise et retrouve les mêmes clients, chantiers et devis.',
  },
  {
    id: 'aide-sap',
    question: 'Comment produire l’attestation fiscale de services à la personne ?',
    answer:
      'Activez le mode SAP dans la rubrique Entreprise et renseignez votre numéro de déclaration. En fin d’année, depuis la fiche du client, générez le PDF de l’attestation fiscale à partir des paiements enregistrés. Vérifiez toujours le document avant de l’envoyer.',
  },
  {
    id: 'aide-demo',
    question: 'Puis-je essayer sans saisir mes propres données ?',
    answer:
      'Oui. L’espace de démonstration contient une entreprise, des clients, des chantiers et des devis fictifs. Il est séparé de votre compte : vous pouvez tout tester puis quitter la démo sans rien mélanger.',
  },
];
