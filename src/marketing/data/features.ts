import {
  Calculator,
  Camera,
  FileText,
  FolderKanban,
  HeartHandshake,
  LayoutDashboard,
  PenLine,
  Smartphone,
  Sparkles,
  Tags,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type FeatureMockup = 'photos' | 'clients' | 'project' | 'calc' | 'catalog' | 'quote' | 'signature' | 'dashboard' | 'ai' | 'mobile' | 'sap';

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  /** description courte (grille de l'accueil) */
  short: string;
  /** description détaillée (page Fonctionnalités) */
  description: string;
  benefit: string;
  mockup: FeatureMockup;
  /** affichée dans la grille de l'accueil */
  home: boolean;
}

export const FEATURES: Feature[] = [
  {
    id: 'photos',
    icon: Camera,
    title: 'Photos chantier',
    short: 'Centralisez les photos associées à chaque chantier.',
    description:
      'Prenez vos photos depuis le chantier ou importez-les depuis la galerie. Elles sont rangées automatiquement avec le bon client et le bon chantier, légendées, et peuvent être jointes au devis.',
    benefit: 'Plus de photos perdues au milieu de la galerie du téléphone.',
    mockup: 'photos',
    home: true,
  },
  {
    id: 'calculs',
    icon: Calculator,
    title: 'Calculs',
    short: 'Calculez rapidement surfaces, quantités et besoins.',
    description:
      'Saisissez longueurs et largeurs : Paysapro AI calcule les surfaces, les mètres linéaires et les volumes, puis reporte les quantités dans vos lignes de devis.',
    benefit: 'Des métrés propres, sans recalculer sur un coin de carnet.',
    mockup: 'calc',
    home: true,
  },
  {
    id: 'catalogue',
    icon: Tags,
    title: 'Catalogue tarifaire',
    short: 'Définissez vos prestations, prix et coûts.',
    description:
      'Construisez votre propre catalogue : prestations, unités (m², ml, unité, heure), prix de vente, coûts et marge. Vous le réutilisez sur chaque devis.',
    benefit: 'Vos prix, vos règles — appliqués de façon cohérente.',
    mockup: 'catalog',
    home: true,
  },
  {
    id: 'devis',
    icon: FileText,
    title: 'Devis professionnels',
    short: 'Générez des devis propres avec vos informations d’entreprise.',
    description:
      'Logo, coordonnées, SIRET, TVA, conditions, acompte : le devis reprend automatiquement vos informations et se présente de façon claire et soignée, en PDF ou en ligne.',
    benefit: 'Un devis qui donne confiance à votre client.',
    mockup: 'quote',
    home: true,
  },
  {
    id: 'signature',
    icon: PenLine,
    title: 'Signature client',
    short: 'Permettez au client de consulter et signer directement en ligne.',
    description:
      'Votre client consulte une page claire avec son projet, les prestations, les photos et le montant, puis signe. Vous suivez le statut : envoyé, consulté, signé.',
    benefit: 'Moins d’allers-retours, une décision plus rapide.',
    mockup: 'signature',
    home: true,
  },
  {
    id: 'clients',
    icon: Users,
    title: 'Gestion clients',
    short: 'Retrouvez facilement vos clients et leurs chantiers.',
    description: 'Coordonnées, adresse du chantier, historique des devis et des interventions : chaque client a sa fiche, accessible en deux gestes.',
    benefit: 'Toutes les informations client au même endroit.',
    mockup: 'clients',
    home: true,
  },
  {
    id: 'projets',
    icon: FolderKanban,
    title: 'Gestion des projets',
    short: 'Centralisez toutes les informations du chantier.',
    description: 'Photos, dimensions, notes, prestations, devis et avancement : chaque chantier regroupe tout ce qu’il faut pour le préparer et le suivre.',
    benefit: 'Un chantier = un dossier complet, sans papier.',
    mockup: 'project',
    home: true,
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Pensé pour le terrain',
    short: 'Utilisable depuis smartphone, tablette ou ordinateur.',
    description:
      'Interface conçue d’abord pour le téléphone : gros boutons, saisie rapide, lisible en extérieur. Vous retrouvez les mêmes données sur tablette et ordinateur.',
    benefit: 'Vous avancez sur vos devis là où vous êtes.',
    mockup: 'mobile',
    home: true,
  },
  {
    id: 'tableau-de-bord',
    icon: LayoutDashboard,
    title: 'Tableau de bord',
    short: 'Visualisez vos devis et projets depuis un seul endroit.',
    description: 'Devis en attente, devis signés, chantiers actifs : le tableau de bord vous montre où vous en êtes et ce qu’il reste à relancer.',
    benefit: 'Une vue claire de votre activité commerciale.',
    mockup: 'dashboard',
    home: true,
  },
  {
    id: 'sap',
    icon: HeartHandshake,
    title: 'Services à la personne (SAP)',
    short: 'Devis avec mentions SAP et attestation fiscale annuelle en PDF.',
    description:
      'Pour les entreprises déclarées en services à la personne : vous marquez vos prestations éligibles, le devis reprend votre numéro SAP et distingue les montants concernés, et l’application génère elle-même le PDF de l’attestation fiscale annuelle de chaque client, à partir des règlements enregistrés.',
    benefit: 'Les attestations de début d’année prêtes en quelques gestes.',
    mockup: 'sap',
    home: false,
  },
  {
    id: 'ia',
    icon: Sparkles,
    title: 'Assistant IA',
    short: 'Une aide pour structurer vos estimations.',
    description:
      'L’assistant vous aide à structurer les informations du chantier et à ne pas oublier de prestations. Chaque suggestion est à valider : vous gardez la main sur les quantités, les prix et le devis final.',
    benefit: 'Une préparation plus rapide, sans perdre le contrôle.',
    mockup: 'ai',
    home: false,
  },
];
