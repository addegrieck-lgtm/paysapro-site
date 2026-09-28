import { MARKETING_CONFIG } from '../config/marketing';

export interface NavItem {
  label: string;
  to: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Fonctionnalités', to: '/fonctionnalites' },
  { label: 'Comment ça marche', to: '/comment-ca-marche' },
  { label: 'Pour qui ?', to: '/#pour-qui' },
  ...(MARKETING_CONFIG.showPricing ? [{ label: 'Tarifs', to: '/tarifs' }] : []),
  { label: 'FAQ', to: '/faq' },
];

export const FOOTER_NAV: { title: string; links: NavItem[] }[] = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', to: '/fonctionnalites' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Comment ça marche', to: '/comment-ca-marche' },
      { label: 'Bêta', to: '/#beta' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', to: '/a-propos' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Aide', to: '/aide' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'Politique de confidentialité', to: '/confidentialite' },
      { label: 'CGU', to: '/cgu' },
      { label: 'Politique cookies', to: '/cookies' },
    ],
  },
];
