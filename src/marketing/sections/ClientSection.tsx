import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '../components/mockups/PhoneFrame';
import { ClientQuoteMockup } from '../components/mockups/ClientQuoteMockup';
import { StatusTimeline } from '../components/mockups/DemoScreens';
import { Reveal, usePrefersReducedMotion } from '../components/Reveal';
import { Container, Eyebrow, Section } from '../components/ui';
import { SAMPLE_PROJECT } from '../data/sample';

/** Page client simulée + animation Envoyé → Consulté → Signé (démarre quand la section est visible). */
export function ClientSection() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(reduced ? 3 : 1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return setStep(3);
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setStep(3);
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (entry?.isIntersecting) {
          setStep(1);
          timer = setInterval(() => setStep((s) => (s >= 3 ? 1 : s + 1)), 1700);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [reduced]);

  return (
    <Section labelledBy="client-title">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <Eyebrow>Côté client</Eyebrow>
          <h2 id="client-title" className="mt-4 font-display text-[2.1rem] leading-[1.08] font-extrabold text-ink sm:text-5xl">
            Votre client reçoit une expérience professionnelle.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Une page claire, lisible sur téléphone : le projet, le résumé des travaux, les prestations, les photos, le montant et les conditions. Il n’a plus qu’à signer.
          </p>
          <div ref={ref} className="mt-9 max-w-md rounded-3xl bg-white p-5 ring-1 ring-line">
            <p className="text-sm font-semibold text-muted">Suivi du devis {SAMPLE_PROJECT.number}</p>
            <div className="mt-3">
              <StatusTimeline step={step} size="md" />
            </div>
            <p className="mt-3 text-sm text-muted" aria-live="polite">
              {step === 1 && 'Devis envoyé au client.'}
              {step === 2 && 'Le client a consulté son devis.'}
              {step === 3 && 'Devis signé : vous pouvez planifier le chantier.'}
            </p>
          </div>
        </Reveal>
        <div className="flex justify-center">
          <PhoneFrame className="w-[258px] sm:w-[284px]" label="Page client : projet « Aménagement du jardin », prestations, photos, montant et bouton Signer le devis">
            <ClientQuoteMockup highlightSign={step === 2} />
          </PhoneFrame>
        </div>
      </Container>
    </Section>
  );
}
