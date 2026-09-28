import {
  BadgeCheck,
  Calculator,
  Camera,
  Clock,
  Cloud,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  FolderOpen,
  Images,
  LayoutDashboard,
  Lock,
  PenLine,
  Phone,
  PhoneCall,
  Ruler,
  Send,
  Smartphone,
  Sparkles,
  StickyNote,
  Tags,
  type LucideIcon,
} from 'lucide-react';

export interface IconText {
  icon: LucideIcon;
  title: string;
  text: string;
}

/* ─── Section Problème ─── */
export const PROBLEMS: IconText[] = [
  { icon: Images, title: 'Photos partout', text: 'Les photos du chantier restent dans la galerie du téléphone.' },
  { icon: Ruler, title: 'Calculs manuels', text: 'Surfaces, quantités et matériaux doivent être recalculés.' },
  { icon: FileText, title: 'Devis chronophages', text: 'Chaque devis demande de nombreuses saisies.' },
  { icon: PhoneCall, title: 'Trop d’allers-retours', text: 'Le client doit souvent attendre ou rappeler.' },
  { icon: FolderOpen, title: 'Informations dispersées', text: 'Clients, chantiers, prix et documents ne sont pas centralisés.' },
];

/* ─── Section Solution (accueil, 5 étapes) ─── */
export const SOLUTION_STEPS: IconText[] = [
  { icon: Camera, title: 'Photographiez', text: 'Ajoutez les photos du chantier directement depuis votre smartphone.' },
  { icon: Ruler, title: 'Mesurez & renseignez', text: 'Ajoutez les dimensions et informations nécessaires au calcul.' },
  { icon: Sparkles, title: 'Laissez Paysapro AI vous assister', text: 'L’application vous aide à structurer l’estimation et les éléments du devis.' },
  { icon: FileText, title: 'Générez votre devis', text: 'Utilisez vos propres prestations et tarifs.' },
  { icon: PenLine, title: 'Envoyez & faites signer', text: 'Votre client reçoit une page professionnelle et peut signer.' },
];

/* ─── Page Comment ça marche (6 étapes) ─── */
export type HowScreen = 'capture' | 'analysis' | 'info' | 'estimate' | 'quote' | 'client' | 'sign';

export const HOW_STEPS: (IconText & { screen: HowScreen; details: string[] })[] = [
  {
    icon: Camera,
    title: 'Prenez vos photos',
    text: 'Sur place, photographiez le jardin, les zones à aménager et les contraintes d’accès. Les photos sont rangées dans le chantier.',
    details: ['Depuis l’appareil photo ou la galerie', 'Légendes et annotations', 'Jointes au devis si vous le souhaitez'],
    screen: 'capture',
  },
  {
    icon: Ruler,
    title: 'Ajoutez les informations',
    text: 'Longueurs, largeurs, type de sol, accès : renseignez les quelques informations utiles au chiffrage.',
    details: ['Surfaces et linéaires calculés', 'Notes de chantier', 'Coordonnées du client'],
    screen: 'info',
  },
  {
    icon: Calculator,
    title: 'Construisez votre estimation',
    text: 'Choisissez vos prestations dans votre catalogue. L’assistant vous aide à structurer, vous validez chaque ligne.',
    details: ['Vos prix et vos unités', 'Quantités reprises des métrés', 'Suggestions à valider, jamais imposées'],
    screen: 'estimate',
  },
  {
    icon: FileText,
    title: 'Générez le devis',
    text: 'Le devis reprend vos informations d’entreprise, la TVA, l’acompte et vos conditions.',
    details: ['Logo et mentions de votre entreprise', 'Totaux HT, TVA, TTC', 'Aperçu avant envoi'],
    screen: 'quote',
  },
  {
    icon: Send,
    title: 'Envoyez au client',
    text: 'Votre client reçoit une page claire : projet, prestations, photos, montant et conditions.',
    details: ['Présentation professionnelle', 'Lisible sur téléphone', 'Suivi : envoyé, consulté'],
    screen: 'client',
  },
  {
    icon: PenLine,
    title: 'Faites signer',
    text: 'Le client signe le devis. Vous êtes informé et pouvez planifier le chantier.',
    details: ['Bon pour accord daté', 'Statut « signé » dans votre tableau de bord', 'Acompte indiqué sur le devis'],
    screen: 'sign',
  },
];

/* ─── Avant / Après ─── */
export const BEFORE: IconText[] = [
  { icon: Smartphone, title: 'Photos téléphone', text: '' },
  { icon: StickyNote, title: 'Notes papier', text: '' },
  { icon: FileSpreadsheet, title: 'Excel', text: '' },
  { icon: FileText, title: 'Word', text: '' },
  { icon: Phone, title: 'Appels', text: '' },
  { icon: Clock, title: 'Temps administratif', text: '' },
];

export const AFTER: IconText[] = [
  { icon: Camera, title: 'Photos chantier', text: '' },
  { icon: Ruler, title: 'Calculs', text: '' },
  { icon: Tags, title: 'Tarifs', text: '' },
  { icon: FileText, title: 'Devis', text: '' },
  { icon: PenLine, title: 'Signature', text: '' },
  { icon: LayoutDashboard, title: 'Suivi', text: '' },
];

/* ─── Section IA : ce que vous contrôlez toujours ─── */
export const AI_CONTROLS = ['Les dimensions', 'Les quantités', 'Les prestations', 'Les prix', 'La marge', 'Le devis final'];

/* ─── Section Confiance ─── */
export const TRUST: IconText[] = [
  { icon: FolderKanban, title: 'Données organisées', text: 'Clients, chantiers, photos et devis rangés au même endroit.' },
  { icon: BadgeCheck, title: 'Interface professionnelle', text: 'Des documents soignés, à l’image de votre entreprise.' },
  { icon: Smartphone, title: 'Utilisable sur mobile', text: 'Conçu d’abord pour le téléphone, sur le terrain.' },
  { icon: Tags, title: 'Vos tarifs personnalisables', text: 'Votre catalogue, vos unités, vos prix.' },
  { icon: Lock, title: 'Vos devis restent sous votre contrôle', text: 'Rien n’est envoyé sans votre validation.' },
  { icon: Cloud, title: 'Architecture cloud sécurisée', text: 'Hébergement et accès conçus selon les bonnes pratiques de sécurité.' },
];

/* ─── Temps / ROI (flux) ─── */
export const TIME_BEFORE = ['Photos', 'Notes', 'Calculs', 'Devis', 'Envoi'];
