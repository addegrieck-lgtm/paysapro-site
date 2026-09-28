import { Gift, MessageSquareHeart } from 'lucide-react';
import { Link } from 'react-router';
import { FAQ as FAQ_DATA } from '../data/faq';
import { FAQ } from '../components/FAQ';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { NewsletterForm } from '../components/NewsletterForm';
import { AppCta } from '../components/AppLink';
import { Reveal } from '../components/Reveal';
import { BetaBadge, Container, Section, SectionHeading } from '../components/ui';
import { MARKETING_CONFIG } from '../config/marketing';

export function TestimonialsSection() {
  if (!MARKETING_CONFIG.showTestimonials) return null;
  return (
    <Section labelledBy="temoignages-title">
      <Container>
        <SectionHeading id="temoignages-title" eyebrow="Témoignages" title="Ils utilisent Paysapro AI." />
        <div className="mt-12">
          <Testimonials />
        </div>
      </Container>
    </Section>
  );
}

export function PricingSection() {
  if (!MARKETING_CONFIG.showPricing) return null;
  return (
    <Section id="tarifs" labelledBy="tarifs-title">
      <Container>
        <SectionHeading id="tarifs-title" eyebrow="Tarifs" title="Commencez gratuitement." intro="Pendant la bêta, Paysapro AI est accessible gratuitement, avec toutes ses fonctionnalités." />
        <div className="mt-12">
          <Pricing location="home_pricing" />
        </div>
      </Container>
    </Section>
  );
}

export function BetaSection() {
  if (!MARKETING_CONFIG.betaMode) return null;
  return (
    <Section id="beta" labelledBy="beta-title" className="pt-0 sm:pt-0">
      <Container>
        <Reveal>
          <div className="grid gap-10 rounded-[2rem] bg-mint p-7 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <BetaBadge />
              <h2 id="beta-title" className="mt-4 font-display text-3xl leading-tight font-extrabold text-forest sm:text-4xl">
                Construisons Paysapro AI avec les paysagistes.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-forest/80">
                Nous développons Paysapro AI avec les besoins réels des professionnels du terrain. Vos retours nous permettent d’améliorer l’outil.
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-forest/70">
                <MessageSquareHeart className="h-4 w-4" aria-hidden="true" /> Paysapro AI évolue avec les retours des professionnels du paysage.
              </p>
              <div className="mt-7">
                <AppCta location="beta_section">Rejoindre la bêta</AppCta>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <h3 className="font-sans text-base font-bold tracking-normal text-ink">Pas encore prêt ? Suivez les nouveautés.</h3>
              <p className="mt-1 mb-4 text-sm text-muted">Recevoir les nouveautés Paysapro AI.</p>
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Programme ambassadeur — préparé, désactivé tant que le programme n'existe pas. */
export function AmbassadorSection() {
  if (!MARKETING_CONFIG.showAmbassador) return null;
  return (
    <Section labelledBy="ambassadeur-title" className="pt-0 sm:pt-0">
      <Container>
        <div className="flex flex-col items-start gap-5 rounded-[2rem] bg-white p-8 ring-1 ring-line sm:flex-row sm:items-center">
          <Gift className="h-10 w-10 text-brand" aria-hidden="true" />
          <div className="flex-1">
            <h2 id="ambassadeur-title" className="font-display text-2xl font-extrabold text-ink">
              Recommandez Paysapro AI
            </h2>
            <p className="mt-1 text-muted">[CONDITIONS DU PROGRAMME À DÉFINIR]</p>
          </div>
          <Link to="/contact" className="font-semibold text-brand underline underline-offset-4">
            En savoir plus
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export function FAQSection() {
  return (
    <Section id="faq" labelledBy="faq-title" className="bg-white">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading id="faq-title" align="left" eyebrow="FAQ" title="Questions fréquentes" intro="Les réponses aux questions que les paysagistes nous posent le plus souvent." />
          <div className="mt-8">
            <AppCta location="faq" variant="primary">
              Commencer gratuitement
            </AppCta>
          </div>
        </div>
        <FAQ items={FAQ_DATA} />
      </Container>
    </Section>
  );
}
