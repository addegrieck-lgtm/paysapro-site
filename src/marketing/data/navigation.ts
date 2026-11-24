import { MARKETING_CONFIG } from '../config/marketing';

export interface NavItem {
  label: string;
  to: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Fonctionnalités', to: '/fonctionnalites' },
  { label: 'Comment ça marche', to: '/comment-ca-marche' },
  { label: 'Pour qui ?', to: '/#pour-qui' },
  { label: 'Artisans du BTP', to: '/logiciel-devis-batiment' },
  ...(MARKETING_CONFIG.showPricing ? [{ label: 'Tarifs', to: '/tarifs' }] : []),
  { label: 'FAQ', to: '/faq' },
];

// Pied de page : colonnes courtes et équilibrées (chaque page n'y figure qu'une fois).
// Les liens vers les pages métier comptent pour le référencement : on les regroupe, on ne les retire pas.
export const FOOTER_NAV: { title: string; links: NavItem[] }[] = [
  {
    title: 'Logiciel',
    links: [
      { label: 'Fonctionnalités', to: '/fonctionnalites' },
      { label: 'Comment ça marche', to: '/comment-ca-marche' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Logiciel de devis', to: '/logiciel-devis-paysagiste' },
      { label: 'Devis et factures', to: '/logiciel-facturation-artisan' },
      { label: 'Facture électronique', to: '/logiciel-facture-electronique' },
      { label: 'Application mobile', to: '/application-paysagiste' },
    ],
  },
  {
    title: 'Métiers',
    links: [
      { label: 'Paysagistes', to: '/logiciel-gestion-paysagiste' },
      { label: 'Artisans du BTP', to: '/logiciel-devis-batiment' },
      { label: 'Électriciens', to: '/logiciel-devis-electricien' },
      { label: 'Plombiers', to: '/logiciel-devis-plombier' },
      { label: 'Peintres', to: '/logiciel-devis-peintre' },
      { label: 'Maçons', to: '/logiciel-devis-maconnerie' },
    ],
  },
  {
    title: 'Gestion',
    links: [
      { label: 'Suivi de chantier', to: '/logiciel-gestion-chantier-paysagiste' },
      { label: 'Clients (CRM)', to: '/crm-paysagiste' },
      { label: 'Services à la personne', to: '/logiciel-paysagiste-services-a-la-personne' },
      { label: 'Contrats d’entretien', to: '/logiciel-contrat-entretien-espaces-verts' },
      { label: 'Facture électronique paysagiste', to: '/facture-electronique-paysagiste' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Outils de calcul', to: '/outils' },
      { label: 'Modèle de devis', to: '/modele-devis-paysagiste' },
      { label: 'Comparatif des logiciels', to: '/comparatif-logiciel-devis-paysagiste' },
      { label: 'Alternative à Extrabat', to: '/alternative-extrabat-paysage' },
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Aide', to: '/aide' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Qu’est-ce que Paysapro AI ?', to: '/quest-ce-que-paysapro-ai' },
      { label: 'À propos', to: '/a-propos' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

/** Liens légaux : sur une ligne, en bas du pied de page. */
export const LEGAL_NAV: NavItem[] = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Confidentialité', to: '/confidentialite' },
  { label: 'CGU', to: '/cgu' },
  { label: 'Cookies', to: '/cookies' },
];
