export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** affichée aussi sur la page Tarifs */
  pricing?: boolean;
}

export const FAQ: FaqItem[] = [
  {
    id: 'reserve-paysagistes',
    question: 'Paysapro AI est-il réservé aux paysagistes ?',
    answer: 'Paysapro AI est conçu en priorité pour les professionnels du paysage et les entreprises d’aménagement extérieur.',
  },
  {
    id: 'ordinateur',
    question: 'Dois-je utiliser un ordinateur ?',
    answer: 'Non. Paysapro AI est conçu pour fonctionner sur smartphone, tablette et ordinateur.',
  },
  {
    id: 'ia-photo',
    question: 'L’IA crée-t-elle automatiquement un devis exact à partir d’une photo ?',
    answer:
      'Non. Une photo ne permet pas de déterminer avec certitude tous les éléments nécessaires à un devis. Paysapro AI utilise l’IA comme assistant et vous permet de compléter et contrôler les informations avant validation.',
  },
  {
    id: 'tarifs-perso',
    question: 'Puis-je utiliser mes propres tarifs ?',
    answer: 'Oui. Vous construisez votre propre catalogue de prestations, avec vos unités, vos prix et vos coûts.',
  },
  {
    id: 'signature',
    question: 'Mon client peut-il signer en ligne ?',
    answer: 'Oui, selon les fonctionnalités activées dans votre compte.',
  },
  {
    id: 'plusieurs-clients',
    question: 'Puis-je gérer plusieurs clients ?',
    answer: 'Oui. Chaque client a sa fiche, avec ses chantiers et ses devis.',
  },
  {
    id: 'chantier',
    question: 'Puis-je utiliser Paysapro AI sur un chantier ?',
    answer: 'Oui. L’interface est conçue pour être utilisable directement depuis un smartphone.',
  },
  {
    id: 'prix',
    question: 'Combien coûte Paysapro AI ?',
    answer: 'Pendant la bêta, l’accès est actuellement gratuit pour les utilisateurs bêta.',
    pricing: true,
  },
  {
    id: 'evolution-tarifs',
    question: 'Les tarifs vont-ils changer ?',
    answer: 'Les conditions pourront évoluer après la bêta. Les utilisateurs concernés seront informés avant tout changement tarifaire.',
    pricing: true,
  },
];
