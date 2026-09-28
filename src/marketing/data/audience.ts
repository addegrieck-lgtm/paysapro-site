import { BrickWall, Fence, Flower2, Gem, House, Scissors, Sprout, TreeDeciduous, type LucideIcon } from 'lucide-react';

export interface AudienceItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const AUDIENCE: AudienceItem[] = [
  { icon: Flower2, title: 'Création de jardins', text: 'Du premier relevé au devis complet, massifs et allées compris.' },
  { icon: House, title: 'Aménagement extérieur', text: 'Plusieurs zones, plusieurs métiers : un seul devis structuré.' },
  { icon: Scissors, title: 'Entretien', text: 'Contrats et interventions récurrentes, chiffrés à l’heure ou au forfait.' },
  { icon: BrickWall, title: 'Terrasses', text: 'Surfaces, matériaux et main-d’œuvre calculés au m².' },
  { icon: Fence, title: 'Clôtures', text: 'Métrés au mètre linéaire, portails et poteaux inclus.' },
  { icon: TreeDeciduous, title: 'Plantations', text: 'Arbres, arbustes, haies : quantités et fournitures à l’unité.' },
  { icon: Sprout, title: 'Gazon', text: 'Préparation, terre végétale, semis ou placage, au m².' },
  { icon: Gem, title: 'Minéral', text: 'Gravier, bordures, pas japonais : volumes et linéaires justes.' },
];

/** Profils d'entreprise ciblés (texte d'introduction de la section). */
export const COMPANY_PROFILES = [
  'Paysagistes indépendants',
  'Entreprises de paysage',
  'Équipes de 2 à 20 personnes',
  'Entretien d’espaces verts',
  'Aménagement extérieur',
];
