import { useId, useState, type FormEvent } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { getLeadProvider } from '../leads/LeadProvider';
import { isValidEmail } from '../leads/validation';
import { useAnalytics } from '../analytics/AnalyticsProvider';

/** « Recevoir les nouveautés Paysapro AI » — email + consentement explicite. */
export function NewsletterForm({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const id = useId();
  const { trackEvent } = useAnalytics();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [simulated, setSimulated] = useState(false);
  const light = tone === 'light';

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) return setError('Indiquez une adresse email valide.');
    if (!consent) return setError('Merci de cocher la case de consentement.');
    setError(null);
    setState('sending');
    const res = await getLeadProvider().subscribe({ email: email.trim(), consent: true });
    if (!res.ok) {
      setState('idle');
      return setError(res.error);
    }
    trackEvent('newsletter_submitted');
    setSimulated(Boolean(res.simulated));
    setState('done');
  }

  if (state === 'done') {
    return (
      <p role="status" className={`flex items-start gap-2 text-sm ${light ? 'text-white/85' : 'text-ink'}`}>
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
        <span>
          C’est noté, merci !{simulated && <em className="block opacity-70">Mode démonstration : aucune inscription n’a été enregistrée.</em>}
        </span>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Votre adresse email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="vous@entreprise.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(error) && !isValidEmail(email)}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`min-h-12 flex-1 rounded-full px-5 outline-none transition ${
            light ? 'bg-white/10 text-white placeholder:text-white/50 ring-1 ring-white/20 focus:ring-leaf' : 'bg-white ring-1 ring-line focus:ring-brand'
          }`}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition ${
            light ? 'bg-white text-forest hover:bg-mint' : 'bg-ink text-white hover:bg-forest'
          }`}
        >
          {state === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Recevoir les nouveautés
        </button>
      </div>
      <label className={`mt-3 flex items-start gap-2.5 text-[0.8rem] leading-snug ${light ? 'text-white/65' : 'text-muted'}`}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand" />
        <span>
          J’accepte de recevoir les nouveautés Paysapro AI par email. Désinscription possible à tout moment.{' '}
          <Link to="/confidentialite" className="underline underline-offset-2">
            Confidentialité
          </Link>
        </span>
      </label>
      {error && (
        <p id={`${id}-err`} role="alert" className={`mt-2 text-sm font-medium ${light ? 'text-amber-soft' : 'text-red-700'}`}>
          {error}
        </p>
      )}
    </form>
  );
}
