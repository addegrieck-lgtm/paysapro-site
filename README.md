# Paysapro AI — site commercial

Site marketing officiel de **Paysapro AI** (`www.paysapro.ai`), séparé de l'application SaaS (`app.paysapro.ai`).
React 19 · TypeScript · Vite · Tailwind CSS 4 · Lucide. Aucune dépendance superflue, aucun cookie non essentiel.

## Commandes

```bash
npm install          # installation
npm run dev          # développement (http://localhost:5173)
npm run build        # vérif. TypeScript + build + pages SEO, sitemap.xml, robots.txt
npm run preview      # tester le build
npm run lint         # ESLint
npm test             # tests (routes, liens, CTA, FAQ, formulaires, tarifs, 404, accessibilité axe)
npm run check:secrets  # vérifie qu'aucune clé secrète n'est dans src/, public/ ou dist/
npm run images       # régénère favicon PNG, icônes et og-image.png (sharp)
```

## Variables d'environnement

Toutes **publiques** (préfixe `VITE_`, intégrées au JavaScript du navigateur). Modèle : [`.env.example`](.env.example).
En local : copier en `.env.local`. **Ne jamais y mettre de clé secrète** (Stripe secret, Supabase service role, Resend, Brevo…).

| Variable | Rôle | Exemple |
|---|---|---|
| `VITE_BASE_PATH` | Sous-dossier de publication | `/` (Vercel) · `/paysapro-site/` (GitHub Pages) |
| `VITE_SITE_URL` | URL du site (canonical, sitemap, OpenGraph) | `https://www.paysapro.ai` |
| `VITE_APP_URL` | URL de l'application — **tous les CTA** | `https://app.paysapro.ai` |
| `VITE_APP_SIGNUP_PATH` | Chemin d'inscription ajouté à `VITE_APP_URL` | `/inscription` (vide = accueil de l'app) |
| `VITE_APP_LOGIN_PATH` | Chemin de connexion ajouté à `VITE_APP_URL` | `/connexion` |
| `VITE_CONTACT_EMAIL` | Email public affiché (rien si vide) | |
| `VITE_CONTACT_PHONE` | Téléphone public affiché (rien si vide) | |
| `VITE_LEAD_ENDPOINT` | Fonction serveur recevant les formulaires (vide = mode démo) | `https://…/api/lead` |
| `VITE_ANALYTICS_PROVIDER` | `none` · `console` · `plausible` | `none` |
| `VITE_PLAUSIBLE_DOMAIN` / `VITE_PLAUSIBLE_SCRIPT_URL` | Plausible (sans cookie) | `paysapro.ai` |
| `VITE_ENABLE_DEMO_CTA` | Affiche « Demander une démonstration » | `false` |
| `VITE_DEMO_VIDEO_URL` | Vidéo de démo (.mp4 ou URL d'intégration) | |

> Application actuelle (bêta sur GitHub Pages) : `VITE_APP_URL=https://addegrieck-lgtm.github.io/paysapro-ai/`, `VITE_APP_SIGNUP_PATH=#/onboarding`, `VITE_APP_LOGIN_PATH=#/app`.

## Mise en ligne gratuite sur GitHub Pages (actuel)

Adresse : **https://addegrieck-lgtm.github.io/paysapro-site/**

1. Une seule fois : sur GitHub, *Settings → Pages → Build and deployment → Source : **GitHub Actions***.
2. Ensuite, chaque `git push` sur `main` lance `.github/workflows/deploy.yml` : lint, tests, build, recherche de secrets, puis publication.
3. Les valeurs par défaut (sous-dossier `/paysapro-site/`, app sur `addegrieck-lgtm.github.io/paysapro-ai`) sont dans le workflow ;
   elles se remplacent par des *Variables* du dépôt (`VITE_APP_URL`, `VITE_CONTACT_EMAIL`…), sans toucher au code.

Tester localement le build « GitHub Pages » : `npm run build` avec `VITE_BASE_PATH=/paysapro-site/`, puis `npm run preview:pages`.

## Déploiement sur Vercel (domaine www.paysapro.ai, plus tard)

1. Pousser ce dossier sur GitHub (dépôt dédié, ex. `paysapro-site`).
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importer le dépôt.
   Vercel détecte **Vite** : Build Command `npm run build`, Output Directory `dist` (laisser par défaut).
3. **Settings → Environment Variables** : ajouter au minimum `VITE_SITE_URL` et `VITE_APP_URL`
   (+ `VITE_APP_SIGNUP_PATH`, `VITE_APP_LOGIN_PATH` si besoin) pour l'environnement *Production*.
4. **Deploy**. Chaque push sur `main` redéploie ; chaque pull request obtient une URL de prévisualisation.
5. **Settings → Domains** : ajouter `www.paysapro.ai` (et `paysapro.ai` en redirection vers `www`),
   puis créer chez le registrar les enregistrements DNS indiqués par Vercel.
6. Après le premier déploiement : déclarer `https://www.paysapro.ai/sitemap.xml` dans Google Search Console.

`vercel.json` est nécessaire : `cleanUrls` sert `/tarifs` depuis `tarifs.html` (HTML pré-rempli pour le SEO),
les autres URL retombent sur l'application React (404 personnalisée), et il ajoute cache et en-têtes de sécurité.

## CI GitHub

- `.github/workflows/deploy.yml` (push sur `main`) : vérifications complètes puis publication GitHub Pages.
- `.github/workflows/build.yml` (pull requests) : `npm ci` → lint → typecheck → tests → build → recherche de secrets.

## Architecture

```
src/
  App.tsx                      Router + AnalyticsProvider
  index.css                    Design system (tokens Tailwind, animations, reduced-motion)
  marketing/
    routes.tsx                 Routes (pages chargées à la demande)
    config/
      marketing.ts             MARKETING_CONFIG (interrupteurs), APP_LINKS, CONTACT, ANALYTICS
      pricing.ts               Plans (bêta aujourd'hui ; Starter/Pro/Premium prêts) — un seul fichier à modifier
      pages.json               Title / description SEO par page (utilisé aussi au build)
    analytics/                 AnalyticsProvider, trackEvent, adaptateurs (none/console/plausible), consentement
    leads/                     LeadProvider (Mock + HTTP), validation du contact
    components/                Navbar, Hero, Footer, FAQ, Pricing, Workflow, FeatureCard, AppCta, DemoCta,
                               ContactForm, NewsletterForm, Testimonials, VideoPlaceholder, Reveal, Logo…
      mockups/                 PhoneFrame, GardenPhoto (SVG), PhotoAnalysisMockup, QuoteMockup,
                               ClientQuoteMockup, DashboardMockup, CatalogMockup, DemoScreens, FeatureMockups
    sections/                  Sections de l'accueil (Problème, Solution, Démo, IA, Tarifs, FAQ, CTA final…)
    data/                      Contenus : features, faq, audience, content, sample (fictif), blog, testimonials, legal
    pages/                     Accueil, Fonctionnalités, Comment ça marche, Tarifs, FAQ, Contact, À propos,
                               Aide, Blog, Article, Légal (×4), 404
scripts/                       postbuild (HTML SEO par page, sitemap, robots), check-secrets, generate-images
tests/                         Vitest + Testing Library + axe-core
```

## Brancher les formulaires (Resend, Brevo, Supabase…)

Le navigateur n'appelle **jamais** directement Resend/Brevo. Créer une fonction serveur qui détient la clé,
puis renseigner son URL dans `VITE_LEAD_ENDPOINT`. Elle reçoit `POST` JSON :
`{ type: "contact", name, company, email, phone?, message, companyType, employees, topic? }`
ou `{ type: "newsletter", email, consent: true }`, et répond `200` en cas de succès.
Pour une intégration spécifique (ex. client Supabase), implémenter l'interface `LeadProvider`
dans `src/marketing/leads/` et l'activer avec `setLeadProvider()`.

## À faire avant la mise en ligne publique

- [ ] Remplacer tous les `[PLACEHOLDERS]` des pages légales (`src/marketing/data/legal.tsx`) et les faire relire.
- [ ] Renseigner `VITE_CONTACT_EMAIL` et brancher `VITE_LEAD_ENDPOINT` (sinon les formulaires restent en mode démo, signalé à l'écran).
- [ ] Vérifier que les promesses produit correspondent à l'application au moment du lancement :
      signature en ligne par le client, comptes (« Se connecter »), « Architecture cloud sécurisée » (`data/content.ts`).
- [ ] Ajouter de vrais témoignages (avec accord écrit) puis `showTestimonials: true`.
- [ ] Optionnel : vidéo de démo (`VITE_DEMO_VIDEO_URL`), mesure d'audience (`VITE_ANALYTICS_PROVIDER=plausible`).
