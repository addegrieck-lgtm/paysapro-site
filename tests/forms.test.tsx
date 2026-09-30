import { describe, expect, it, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderPage, renderAt } from './utils';
import { MockLeadProvider, setLeadProvider } from '../src/marketing/leads/LeadProvider';
import { validateContact } from '../src/marketing/leads/validation';

beforeEach(() => setLeadProvider(new MockLeadProvider(0)));

describe('validation du contact', () => {
  it('signale les champs obligatoires et les formats', () => {
    const e = validateContact({ name: '', company: '', email: 'pas-un-email', phone: 'abc', message: 'court', companyType: '', employees: '' });
    expect(Object.keys(e).sort()).toEqual(['company', 'companyType', 'email', 'employees', 'message', 'name', 'phone']);
  });
  it('accepte un formulaire valide, téléphone optionnel', () => {
    expect(
      validateContact({ name: 'Jean', company: 'Jardins', email: 'jean@exemple.fr', phone: '', message: 'Bonjour, une question.', companyType: 'Autre', employees: '2 à 5' }),
    ).toEqual({});
  });
});

describe('formulaire de contact', () => {
  it('affiche les erreurs et place le focus sur le premier champ invalide', async () => {
    const user = userEvent.setup();
    await renderPage('/contact');
    await user.click(screen.getByRole('button', { name: 'Envoyer le message' }));
    const name = screen.getByLabelText('Nom');
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveFocus();
    expect(screen.getByText('Indiquez votre nom.')).toBeInTheDocument();
    expect(name).toHaveAccessibleDescription('Indiquez votre nom.');
  });

  it('envoie via le LeadProvider et signale clairement le mode démonstration', async () => {
    const user = userEvent.setup();
    const { track } = await renderPage('/contact');
    await user.type(screen.getByLabelText('Nom'), 'Jean Dupont');
    await user.type(screen.getByLabelText('Entreprise'), 'Jardins Dupont');
    await user.type(screen.getByLabelText('Email'), 'jean@exemple.fr');
    await user.selectOptions(screen.getByLabelText('Type d’entreprise'), 'Paysagiste indépendant');
    await user.selectOptions(screen.getByLabelText('Nombre de salariés'), 'Seul(e)');
    await user.type(screen.getByLabelText('Message'), 'Bonjour, je souhaite en savoir plus.');
    await user.click(screen.getByRole('button', { name: 'Envoyer le message' }));
    expect(await screen.findByText('Merci, votre message est bien parti.')).toBeInTheDocument();
    expect(screen.getByText(/Mode démonstration/)).toBeInTheDocument();
    expect(track).toHaveBeenCalledWith('contact_submitted', { topic: 'general' });
    // aucune donnée personnelle dans l'événement analytics
    expect(JSON.stringify(track.mock.calls)).not.toMatch(/jean@exemple\.fr|Dupont/);
  });

  it('pré-remplit une demande de démo avec ?sujet=demo', async () => {
    await renderPage('/contact?sujet=demo');
    expect(screen.getByLabelText('Message')).toHaveValue('Bonjour, je souhaite une démonstration de Paysapro AI.');
  });
});

describe('nouveautés (lead capture)', () => {
  it('exige un email valide et le consentement', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const email = screen.getAllByLabelText('Votre adresse email')[0]!;
    const form = email.closest('form')!;
    const submit = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    await user.type(email, 'jean@exemple.fr');
    await user.click(submit);
    expect(form).toHaveTextContent('Merci de cocher la case de consentement.');
    await user.click(form.querySelector('input[type="checkbox"]')!);
    await user.click(submit);
    expect(await screen.findByText(/C’est noté, merci/)).toBeInTheDocument();
  });
});

describe('SupabaseLeadProvider', () => {
  it('insère dans site_messages avec la clé publique, sans relire la ligne', async () => {
    const { SupabaseLeadProvider } = await import('../src/marketing/leads/LeadProvider');
    const calls: { url: string; init: RequestInit }[] = [];
    const original = globalThis.fetch;
    globalThis.fetch = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(null, { status: 201 });
    }) as typeof fetch;
    try {
      const p = new SupabaseLeadProvider('https://projet.supabase.co', 'sb_publishable_test');
      const res = await p.sendContact({ name: ' Jean ', company: 'Jardins', email: 'jean@exemple.fr', phone: '', message: 'Bonjour à vous', companyType: 'Autre', employees: 'Seul(e)' });
      expect(res).toEqual({ ok: true });
      expect(calls[0]!.url).toBe('https://projet.supabase.co/rest/v1/site_messages');
      const headers = calls[0]!.init.headers as Record<string, string>;
      expect(headers.apikey).toBe('sb_publishable_test');
      expect(headers.Prefer).toBe('return=minimal');
      expect(JSON.parse(calls[0]!.init.body as string)).toMatchObject({ type: 'contact', name: 'Jean', phone: null, company_type: 'Autre' });

      await p.subscribe({ email: 'jean@exemple.fr', consent: true });
      expect(JSON.parse(calls[1]!.init.body as string)).toEqual({ type: 'newsletter', email: 'jean@exemple.fr', consent: true });

      globalThis.fetch = (async () => new Response(null, { status: 401 })) as typeof fetch;
      expect((await p.subscribe({ email: 'a@b.fr', consent: true })).ok).toBe(false);
    } finally {
      globalThis.fetch = original;
    }
  });
});
