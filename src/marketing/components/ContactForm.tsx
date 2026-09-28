import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { COMPANY_TYPES, EMPLOYEE_RANGES, getLeadProvider, type ContactPayload } from '../leads/LeadProvider';
import { validateContact, type ContactErrors } from '../leads/validation';
import { useAnalytics } from '../analytics/AnalyticsProvider';
import { Button } from './ui';

const EMPTY: ContactPayload = { name: '', company: '', email: '', phone: '', message: '', companyType: '', employees: '' };

const inputCls =
  'mt-1.5 block min-h-12 w-full rounded-2xl bg-white px-4 py-3 text-ink ring-1 ring-line outline-none transition placeholder:text-muted/60 focus:ring-2 focus:ring-brand aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600';

export function ContactForm({ topic }: { topic?: string }) {
  const uid = useId();
  const { trackEvent } = useAnalytics();
  const [values, setValues] = useState<ContactPayload>({
    ...EMPTY,
    message: topic === 'demo' ? 'Bonjour, je souhaite une démonstration de Paysapro AI.' : '',
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [simulated, setSimulated] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const set = (k: keyof ContactPayload) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const fid = (k: string) => `${uid}-${k}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSendError(null);
    const errs = validateContact(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(fid(first))?.focus();
      return;
    }
    if (honeypot) return setStatus('sent'); // robot : on ne transmet rien
    setStatus('sending');
    const res = await getLeadProvider().sendContact({ ...values, topic });
    if (!res.ok) {
      setStatus('idle');
      setSendError(res.error);
      return;
    }
    trackEvent('contact_submitted', { topic: topic ?? 'general' });
    setSimulated(Boolean(res.simulated));
    setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-3xl bg-mint p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand" aria-hidden="true" />
        <p className="mt-3 font-display text-2xl font-extrabold text-forest">Merci, votre message est bien parti.</p>
        <p className="mt-2 text-forest/80">Nous revenons vers vous dès que possible.</p>
        {simulated && (
          <p className="mt-4 rounded-2xl bg-white/70 p-3 text-sm text-amber">
            Mode démonstration : aucun service d’envoi n’est encore branché, ce message n’a pas été transmis.
          </p>
        )}
      </div>
    );
  }

  const field = (k: keyof ContactPayload, label: string, input: ReactNode, hint?: string) => (
    <div>
      <label htmlFor={fid(k)} className="text-sm font-semibold text-ink">
        {label}
        {hint && <span className="font-normal text-muted"> {hint}</span>}
      </label>
      {input}
      {errors[k] && (
        <p id={`${fid(k)}-err`} className="mt-1.5 text-sm font-medium text-red-700">
          {errors[k]}
        </p>
      )}
    </div>
  );
  const a11y = (k: keyof ContactPayload) => ({
    id: fid(k),
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': errors[k] ? `${fid(k)}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Formulaire de contact">
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Nom', <input {...a11y('name')} autoComplete="name" required value={values.name} onChange={set('name')} className={inputCls} />)}
        {field('company', 'Entreprise', <input {...a11y('company')} autoComplete="organization" required value={values.company} onChange={set('company')} className={inputCls} />)}
        {field('email', 'Email', <input {...a11y('email')} type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={set('email')} className={inputCls} />)}
        {field('phone', 'Téléphone', <input {...a11y('phone')} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className={inputCls} />, '(optionnel)')}
        {field(
          'companyType',
          'Type d’entreprise',
          <select {...a11y('companyType')} required value={values.companyType} onChange={set('companyType')} className={inputCls}>
            <option value="">Choisir…</option>
            {COMPANY_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>,
        )}
        {field(
          'employees',
          'Nombre de salariés',
          <select {...a11y('employees')} required value={values.employees} onChange={set('employees')} className={inputCls}>
            <option value="">Choisir…</option>
            {EMPLOYEE_RANGES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>,
        )}
      </div>
      {field('message', 'Message', <textarea {...a11y('message')} required rows={5} value={values.message} onChange={set('message')} className={`${inputCls} resize-y`} />)}

      {/* Anti-spam invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <p className="text-xs leading-relaxed text-muted">
        Vos informations servent uniquement à répondre à votre demande. Voir notre{' '}
        <Link to="/confidentialite" className="underline underline-offset-2">
          politique de confidentialité
        </Link>
        .
      </p>
      {sendError && (
        <p role="alert" className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-800">
          {sendError}
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
        {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Envoyer le message
      </Button>
    </form>
  );
}
