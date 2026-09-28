import type { ContactPayload } from './LeadProvider';

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,20}$/;

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

export function validateContact(v: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = 'Indiquez votre nom.';
  if (!v.company.trim()) e.company = 'Indiquez le nom de votre entreprise.';
  if (!v.email.trim()) e.email = 'Indiquez votre adresse email.';
  else if (!isValidEmail(v.email)) e.email = 'Cette adresse email ne semble pas valide.';
  if (v.phone && v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = 'Ce numéro ne semble pas valide.';
  if (!v.companyType) e.companyType = 'Choisissez votre type d’entreprise.';
  if (!v.employees) e.employees = 'Choisissez le nombre de salariés.';
  if (v.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.';
  return e;
}
