/**
 * Devis d'exemple du bâtiment (données FICTIVES) : un par page métier.
 * Prix repris du catalogue de départ de l'application (mode « Artisan du BTP »).
 */
export type BtpSampleId = 'renovation' | 'electricien' | 'plombier' | 'peintre' | 'macon';

export interface BtpLine {
  label: string;
  qty: number;
  unit: 'm²' | 'u' | 'forfait';
  price: number;
  /** Taux de TVA de la ligne (%) */
  vat: number;
}

export interface BtpSample {
  title: string;
  client: string;
  city: string;
  number: string;
  trade: string;
  /** Contexte affiché sous le chantier (type de logement / TVA) */
  context: string;
  lots: { name: string; lines: BtpLine[] }[];
}

const r = (label: string, qty: number, unit: BtpLine['unit'], price: number, vat = 10): BtpLine => ({ label, qty, unit, price, vat });

export const BTP_SAMPLES: Record<BtpSampleId, BtpSample> = {
  renovation: {
    title: 'Rénovation de salle de bains',
    client: 'M. et Mme Martin',
    city: '69100 Villeurbanne',
    number: 'DEV-2026-031',
    trade: 'Rénovation tous corps d’état',
    context: 'Logement de plus de 2 ans · TVA 10 % et 5,5 %',
    lots: [
      { name: 'Plomberie – Chauffage', lines: [r('Receveur de douche extra-plat et paroi', 1, 'u', 850), r('WC suspendu (fourniture et pose)', 1, 'u', 480), r('Création d’un point d’eau', 3, 'u', 220)] },
      { name: 'Carrelage – Sols', lines: [r('Pose de faïence murale', 19.5, 'm²', 50)] },
      { name: 'Plâtrerie – Isolation', lines: [r('Doublage isolant collé', 12, 'm²', 38, 5.5)] },
    ],
  },
  electricien: {
    title: 'Rénovation électrique',
    client: 'Mme Bernard',
    city: '69300 Caluire',
    number: 'DEV-2026-027',
    trade: 'Électricité générale',
    context: 'Logement de plus de 2 ans · TVA 10 %',
    lots: [
      {
        name: 'Électricité',
        lines: [r('Tableau électrique équipé', 1, 'u', 850), r('Prise de courant 16 A', 10, 'u', 70), r('Point lumineux', 6, 'u', 85), r('Mise en conformité NF C 15-100', 1, 'forfait', 1600)],
      },
    ],
  },
  plombier: {
    title: 'Chauffage et eau chaude',
    client: 'M. Dupont',
    city: '76600 Le Havre',
    number: 'DEV-2026-019',
    trade: 'Plomberie – Chauffage',
    context: 'Logement de plus de 2 ans · TVA 10 % et 5,5 %',
    lots: [
      { name: 'Plomberie – Chauffage', lines: [r('Chauffe-eau thermodynamique', 1, 'u', 2600, 5.5), r('Radiateur (fourniture et pose)', 4, 'u', 420), r('Création d’un point d’eau', 2, 'u', 220)] },
      { name: 'Divers', lines: [r('Déplacement', 1, 'forfait', 60)] },
    ],
  },
  peintre: {
    title: 'Peinture du séjour',
    client: 'Mme Leroy',
    city: '44000 Nantes',
    number: 'DEV-2026-022',
    trade: 'Peinture – Décoration',
    context: 'Logement de plus de 2 ans · TVA 10 %',
    lots: [
      { name: 'Installation de chantier', lines: [r('Protection des sols et des existants', 1, 'forfait', 120)] },
      { name: 'Peinture', lines: [r('Préparation des supports', 62, 'm²', 7), r('Peinture murs, 2 couches', 62, 'm²', 14), r('Peinture plafond, 2 couches', 24, 'm²', 16)] },
    ],
  },
  macon: {
    title: 'Extension : dalle et murs',
    client: 'M. Garnier',
    city: '35000 Rennes',
    number: 'DEV-2026-016',
    trade: 'Maçonnerie – Gros œuvre',
    context: 'Extension · TVA 20 %',
    lots: [
      { name: 'Installation de chantier', lines: [r('Installation et repli de chantier', 1, 'forfait', 280, 20)] },
      { name: 'Maçonnerie', lines: [r('Dalle béton armé (12 cm)', 20, 'm²', 75, 20), r('Mur en parpaings de 20 cm', 18, 'm²', 65, 20), r('Ouverture dans mur porteur', 1, 'forfait', 2200, 20)] },
      { name: 'Démolition', lines: [r('Évacuation des gravats (benne)', 1, 'forfait', 400, 20)] },
    ],
  },
};

/** Totaux : HT, TVA par taux (du plus élevé au plus faible), TTC. */
export function btpTotals(sample: BtpSample) {
  const lines = sample.lots.flatMap((l) => l.lines);
  const round = (n: number) => Math.round(n * 100) / 100;
  const ht = round(lines.reduce((s, l) => s + l.qty * l.price, 0));
  const bases = new Map<number, number>();
  for (const l of lines) bases.set(l.vat, (bases.get(l.vat) ?? 0) + l.qty * l.price);
  const vat = [...bases.entries()].sort((a, b) => b[0] - a[0]).map(([rate, base]) => ({ rate, base: round(base), amount: round((base * rate) / 100) }));
  const ttc = round(ht + vat.reduce((s, v) => s + v.amount, 0));
  return { ht, vat, ttc };
}
