import { LEAD_ENDPOINT } from '../config/marketing';

/**
 * Abstraction d'envoi des formulaires (contact, nouveautés).
 * Le navigateur n'envoie JAMAIS directement à Resend/Brevo : il appelle une fonction serveur
 * (Vercel Function, Supabase Edge Function…) qui détient la clé secrète. Voir README.
 */

export const COMPANY_TYPES = [
  'Paysagiste indépendant',
  'Entreprise de création de jardins',
  'Entreprise d’entretien',
  'Entreprise d’aménagement extérieur',
  'Autre',
] as const;

export const EMPLOYEE_RANGES = ['Seul(e)', '2 à 5', '6 à 20', 'Plus de 20'] as const;

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  companyType: string;
  employees: string;
  topic?: string;
}

export interface NewsletterPayload {
  email: string;
  consent: true;
}

export type LeadResult = { ok: true; simulated?: boolean } | { ok: false; error: string };

export interface LeadProvider {
  name: string;
  sendContact(payload: ContactPayload): Promise<LeadResult>;
  subscribe(payload: NewsletterPayload): Promise<LeadResult>;
}

/** Développement / tant qu'aucun service n'est branché : n'envoie rien et le signale. */
export class MockLeadProvider implements LeadProvider {
  name = 'mock';
  constructor(private delayMs = 500) {}

  private wait() {
    return new Promise((r) => setTimeout(r, this.delayMs));
  }
  async sendContact(): Promise<LeadResult> {
    await this.wait();
    return { ok: true, simulated: true };
  }
  async subscribe(): Promise<LeadResult> {
    await this.wait();
    return { ok: true, simulated: true };
  }
}

/** Envoie en JSON vers VITE_LEAD_ENDPOINT : POST { type: 'contact' | 'newsletter', ...données }. */
export class HttpLeadProvider implements LeadProvider {
  name = 'http';
  constructor(private endpoint: string) {}

  private async post(body: unknown): Promise<LeadResult> {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) return { ok: false, error: 'Le message n’a pas pu être envoyé. Réessayez dans un instant.' };
      return { ok: true };
    } catch {
      return { ok: false, error: 'Connexion impossible. Vérifiez votre réseau puis réessayez.' };
    }
  }
  sendContact(payload: ContactPayload) {
    return this.post({ type: 'contact', ...payload });
  }
  subscribe(payload: NewsletterPayload) {
    return this.post({ type: 'newsletter', ...payload });
  }
}

let current: LeadProvider | null = null;

export function getLeadProvider(): LeadProvider {
  if (!current) current = LEAD_ENDPOINT ? new HttpLeadProvider(LEAD_ENDPOINT) : new MockLeadProvider();
  return current;
}

/** Pour les tests ou un futur SupabaseLeadProvider / BrevoLeadProvider. */
export function setLeadProvider(provider: LeadProvider) {
  current = provider;
}
