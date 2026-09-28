import { Link } from 'react-router';
import { FAQ as FAQ_DATA } from '../data/faq';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { FAQ } from '../components/FAQ';
import { AppCta } from '../components/AppLink';
import { Container } from '../components/ui';
import { useAnalytics } from '../analytics/AnalyticsProvider';

export default function FaqPage() {
  usePageMeta('/faq');
  const { trackEvent } = useAnalytics();
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Questions fréquentes" intro="Tout ce que les paysagistes nous demandent avant d’essayer Paysapro AI." />
      <Container className="max-w-3xl pb-24">
        <FAQ items={FAQ_DATA} />
        <div className="mt-12 rounded-3xl bg-white p-8 text-center ring-1 ring-line">
          <h2 className="font-display text-2xl font-extrabold text-ink">Vous avez une autre question ?</h2>
          <p className="mt-2 text-muted">
            Essayez l’application gratuitement, ou{' '}
            <Link to="/contact" onClick={() => trackEvent('contact_clicked', { location: 'faq_page' })} className="font-semibold text-brand underline underline-offset-4">
              écrivez-nous
            </Link>
            .
          </p>
          <div className="mt-6 flex justify-center">
            <AppCta location="faq_page">Commencer gratuitement</AppCta>
          </div>
        </div>
      </Container>
    </>
  );
}
