/**
 * Données FICTIVES utilisées par les mockups (aucun client, aucune entreprise réels).
 * Les tarifs sont des exemples visuels, entièrement personnalisables dans l'application.
 */

export interface CatalogItem {
  label: string;
  unit: 'm²' | 'ml' | 'unité' | 'h';
  price: number;
  category: 'Engazonnement' | 'Maçonnerie paysagère' | 'Clôtures' | 'Plantations' | 'Terrassement' | 'Main-d’œuvre';
}

export const CATALOG: CatalogItem[] = [
  { label: 'Gazon', unit: 'm²', price: 45, category: 'Engazonnement' },
  { label: 'Terrasse', unit: 'm²', price: 120, category: 'Maçonnerie paysagère' },
  { label: 'Clôture', unit: 'ml', price: 85, category: 'Clôtures' },
  { label: 'Plantation', unit: 'unité', price: 35, category: 'Plantations' },
  { label: 'Préparation du terrain', unit: 'm²', price: 18, category: 'Terrassement' },
  { label: 'Main-d’œuvre', unit: 'h', price: 45, category: 'Main-d’œuvre' },
];

export interface QuoteLine {
  label: string;
  detail: string;
  qty: number;
  unit: CatalogItem['unit'];
  price: number;
  /** quantité issue d'une estimation, à confirmer par un métré */
  estimated?: boolean;
}

export const SAMPLE_PROJECT = {
  title: 'Aménagement du jardin',
  client: 'M. et Mme Martin',
  address: '12 allée des Tilleuls',
  city: '44000 Nantes',
  number: 'DEV-2026-014',
  date: '28/09/2026',
  validity: '30 jours',
  company: 'Votre entreprise',
  companyLine: 'Paysagiste · SIRET 000 000 000 00000',
  dims: { lawn: { l: 8, w: 6 }, terrace: { l: 4, w: 3 }, fence: 22 },
};

export const SAMPLE_LINES: QuoteLine[] = [
  { label: 'Préparation du terrain', detail: 'Décompactage, nivellement', qty: 48, unit: 'm²', price: 18 },
  { label: 'Gazon', detail: 'Semis, terre végétale incluse', qty: 48, unit: 'm²', price: 45 },
  { label: 'Terrasse', detail: 'Dalles sur plots', qty: 12, unit: 'm²', price: 120 },
  { label: 'Clôture', detail: 'Panneaux rigides h. 1,50 m', qty: 22, unit: 'ml', price: 85, estimated: true },
  { label: 'Plantation', detail: 'Arbustes en fond de massif', qty: 6, unit: 'unité', price: 35 },
];

export const VAT_RATE = 0.2;
export const DEPOSIT_RATE = 0.3;

export function quoteTotals(lines: QuoteLine[] = SAMPLE_LINES) {
  const ht = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const vat = Math.round(ht * VAT_RATE * 100) / 100;
  const ttc = ht + vat;
  const deposit = Math.round(ttc * DEPOSIT_RATE * 100) / 100;
  return { ht, vat, ttc, deposit };
}

const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const moneyRound = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const num = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

/** Espaces insécables fines → espaces insécables classiques (rendu homogène sur tous les navigateurs). */
const nb = (s: string) => s.replace(/\u202f/g, '\u00a0');

export const formatMoney = (n: number) => nb(money.format(n));
export const formatMoneyRound = (n: number) => nb(moneyRound.format(n));
export const formatNumber = (n: number) => nb(num.format(n));
