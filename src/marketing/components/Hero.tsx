import { useEffect, useState } from 'react';
import { Check, FileText, PenLine, Camera, Sparkles, ArrowRight, ArrowDown } from 'lucide-react';
import { AppCta } from './AppLink';
import { DemoCta } from './DemoCta';
import { BetaBadge, ButtonLink, Container } from './ui';
import { PhoneFrame } from './mockups/PhoneFrame';
import { PhotoAnalysisMockup } from './mockups/PhotoAnalysisMockup';
import { QuoteMockup } from './mockups/QuoteMockup';
import { usePrefersReducedMotion } from './Reveal';

const FLOW = [
  { icon: Camera, label: 'Chantier' },
  { icon: Sparkles, label: 'Paysapro AI' },
  { icon: FileText, label: 'Devis' },
  { icon: PenLine, label: 'Signature' },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate -mt-16 overflow-hidden pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]">
      <div className="bg-grid-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
      <div className="absolute top-[-20rem] left-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-mint/70 blur-3xl" aria-hidden="true" />

      <Container className="pt-10 pb-6 text-center sm:pt-16 lg:pt-20">
        <div className="animate-fade-up flex flex-col items-center gap-3">
          <a href="#beta" className="inline-flex items-center gap-2 rounded-full bg-white/80 py-1 pr-3.5 pl-1 text-sm text-muted ring-1 ring-line backdrop-blur hover:ring-brand/30">
            <BetaBadge />
            <span>
              <span className="font-semibold text-ink">Accès bêta gratuit</span>
              <span className="hidden sm:inline"> · construit avec les paysagistes</span>
            </span>
          </a>
        </div>

        <h1
          id="hero-title"
          className="animate-fade-up mx-auto mt-7 max-w-5xl font-display text-[2.9rem] leading-[0.98] font-extrabold tracking-[-0.045em] text-ink [animation-delay:80ms] min-[390px]:text-[3.2rem] sm:text-7xl lg:text-[5.6rem]"
        >
          <span className="mb-4 block font-sans text-[0.95rem] leading-normal font-semibold tracking-normal text-brand sm:text-lg">Logiciel de devis pour paysagistes</span>
          Du chantier au devis.
          <br />
          <span className="bg-gradient-to-r from-brand to-forest bg-clip-text text-transparent">En quelques minutes.</span>
        </h1>

        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted [animation-delay:160ms] sm:text-xl">
          Photographiez votre chantier, renseignez les quelques informations nécessaires et construisez un devis professionnel prêt à envoyer à votre client.
        </p>

        <div className="animate-fade-up mt-9 flex flex-col items-stretch justify-center gap-3 [animation-delay:240ms] sm:flex-row sm:items-center">
          <AppCta location="hero" event="hero_cta_clicked">
            Essayer gratuitement
          </AppCta>
          <ButtonLink to="/comment-ca-marche" variant="secondary" size="lg">
            Voir comment ça marche
          </ButtonLink>
          <DemoCta location="hero" />
        </div>

        <ul className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted [animation-delay:300ms]">
          {['Aucun engagement', 'Pensé pour les paysagistes', 'Accessible sur mobile'].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" strokeWidth={2.6} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pb-16 sm:pb-24">
        <HeroVisual />
      </Container>
    </section>
  );
}

function useCycle(length: number, ms: number) {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(t);
  }, [length, ms, reduced]);
  return reduced ? -1 : i;
}

/** Composition : smartphone (photo du chantier) → flux Paysapro AI → devis signé. */
function HeroVisual() {
  const active = useCycle(FLOW.length, 1600);
  return (
    <figure
      className="animate-fade-up relative mx-auto mt-6 max-w-6xl [animation-delay:360ms]"
      aria-label="Illustration : une photo de chantier devient un devis signé grâce à Paysapro AI"
    >
      <div className="absolute inset-x-0 top-10 bottom-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-white/80 to-mint/40 ring-1 ring-line/80 lg:top-16" aria-hidden="true" />

      {/* Flux — mobile / tablette : ligne horizontale */}
      <ol className="flex flex-wrap items-center justify-center gap-1.5 pt-2 pb-6 lg:hidden" aria-label="Étapes">
        {FLOW.map((f, i) => (
          <li key={f.label} className="flex items-center gap-1.5">
            <FlowPill {...f} active={active === i || active === -1} small />
            {i < FLOW.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-brand/60" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <div className="flex flex-col items-center lg:grid lg:grid-cols-[auto_1fr_minmax(0,27rem)] lg:items-center lg:gap-6 lg:px-10 lg:pt-6 lg:pb-10">
        <div className="relative lg:justify-self-start">
          <PhoneFrame className="w-[248px] sm:w-[270px]" label="Application Paysapro AI : photo d’un jardin avec les zones gazon, terrasse et clôture repérées">
            <PhotoAnalysisMockup />
          </PhoneFrame>
        </div>

        {/* Flux — desktop : colonne centrale */}
        <ol className="relative hidden flex-col items-center gap-3 lg:flex" aria-label="Étapes">
          <span className="absolute top-4 bottom-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-brand/10 via-brand/40 to-brand/10" aria-hidden="true" />
          {FLOW.map((f, i) => (
            <li key={f.label} className="relative flex flex-col items-center gap-3">
              <FlowPill {...f} active={active === i || active === -1} />
              {i < FLOW.length - 1 && <ArrowDown className="h-4 w-4 text-brand/50" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <div className="relative z-10 -mt-24 w-full max-w-[25rem] px-2 sm:-mt-28 lg:mt-0 lg:max-w-none lg:px-0">
          <QuoteMockup compact className="lg:animate-float" maxLines={4} />
        </div>
      </div>
    </figure>
  );
}

function FlowPill({ icon: Icon, label, active, small }: { icon: typeof Camera; label: string; active: boolean; small?: boolean }) {
  return (
    <span
      className={`relative inline-flex items-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-500 ${
        small ? 'px-2.5 py-1.5 text-[0.78rem]' : 'px-4 py-2.5 text-sm'
      } ${active ? 'bg-forest text-white shadow-card' : 'bg-white text-muted ring-1 ring-line'}`}
    >
      <Icon className={small ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
      {label}
    </span>
  );
}
