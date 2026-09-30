import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LANDINGS } from './data/landings';
import { TOOLS } from './data/tools';

// Page d'accueil chargée immédiatement ; les autres pages sont découpées (chargement à la demande).
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const ToolsIndexPage = lazy(() => import('./pages/ToolPage').then((m) => ({ default: m.ToolsIndexPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** Liste des routes publiques (utilisée aussi par les tests de liens). */
export const ROUTE_PATHS = [
  '/',
  '/fonctionnalites',
  '/comment-ca-marche',
  '/tarifs',
  '/faq',
  '/contact',
  '/a-propos',
  '/aide',
  '/logiciel-devis-paysagiste',
  '/logiciel-gestion-paysagiste',
  '/application-paysagiste',
  '/modele-devis-paysagiste',
  '/outils',
  '/outils/calcul-surface',
  '/outils/calcul-volume',
  '/outils/calcul-cloture',
  '/blog',
  '/blog/:slug',
  '/mentions-legales',
  '/confidentialite',
  '/cgu',
  '/cookies',
] as const;

function PageFallback() {
  return <div className="min-h-[60vh]" aria-busy="true" />;
}

export function MarketingRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Lazy />} />
      </Route>
    </Routes>
  );
}

function Lazy() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="fonctionnalites" element={<FeaturesPage />} />
        <Route path="comment-ca-marche" element={<HowItWorksPage />} />
        <Route path="tarifs" element={<PricingPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="a-propos" element={<AboutPage />} />
        <Route path="aide" element={<HelpPage />} />
        {LANDINGS.map((l) => (
          <Route key={l.path} path={l.path.slice(1)} element={<LandingPage key={l.path} path={l.path} />} />
        ))}
        <Route path="outils" element={<ToolsIndexPage />} />
        {TOOLS.map((t) => (
          <Route key={t.path} path={t.path.slice(1)} element={<ToolPage key={t.path} path={t.path} />} />
        ))}
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogArticlePage />} />
        <Route path="mentions-legales" element={<LegalPage doc="mentions" />} />
        <Route path="confidentialite" element={<LegalPage doc="confidentialite" />} />
        <Route path="cgu" element={<LegalPage doc="cgu" />} />
        <Route path="cookies" element={<LegalPage doc="cookies" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
