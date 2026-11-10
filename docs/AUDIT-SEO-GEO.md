# Audit SEO + GEO de Paysapro AI — rapport du 10 novembre 2026

Périmètre : le site public `www.paysapro-ai.fr` (dépôt `paysapro-site`), le back-office de l'application (dépôt `paysapro-ai`) pour la mesure, et le plan d'actions externes.

**Limite de cet audit.** Il a été mené sur le code et sur le site construit localement (56 pages générées et analysées une par une). Le site en ligne n'était pas joignable depuis l'environnement de travail : l'état réel de l'indexation, les redirections `http → https` et `paysapro-ai.fr → www`, et les Core Web Vitals mesurés sur de vrais visiteurs **n'ont pas pu être vérifiés** et restent à contrôler dans Search Console (voir § 8).

Documents liés : [MOTS-CLES.md](MOTS-CLES.md) · [PLAN-EDITORIAL.md](PLAN-EDITORIAL.md) · [PLAN-LIENS.md](PLAN-LIENS.md) · [ACTIONS-SEO.md](ACTIONS-SEO.md).

## 1. Conclusion en cinq lignes

1. **La technique est saine.** Le site était déjà bien construit : il n'y avait rien à reconstruire.
2. **Le frein n'est pas le site, c'est sa notoriété.** Le site est visible dans Google depuis le 29 septembre 2026 ; sur « logiciel devis paysagiste », il est en page 8. Les concurrents en première page sont des éditeurs installés et des comparateurs. Sans liens ni mentions externes, aucune optimisation interne ne suffira.
3. **Pour les IA, même constat.** Les assistants reprennent surtout les comparatifs tiers ; Paysapro AI n'y figure quasiment pas. C'est l'action la plus rentable (PLAN-LIENS.md, étape 4).
4. **Trois intentions de recherche n'avaient pas de page** : suivi de chantier, CRM / gestion des clients, calcul de marge. Elles sont créées.
5. **Un point critique hors SEO** : les mentions légales en ligne contiennent encore des champs à remplir entre crochets.

## 2. Architecture actuelle

| Élément | État |
|---|---|
| Site | React 19, Vite, Tailwind, React Router. Chaque page est **pré-rendue en HTML** au build : le contenu est lisible sans JavaScript. |
| Hébergement | GitHub Pages, domaine `www.paysapro-ai.fr`, déploiement à chaque push sur `main` et chaque matin. |
| Application | `app.paysapro-ai.fr`, en `noindex` : pas de doublon avec le site. |
| Blog | Écrit dans le back-office (Supabase), copié dans le site au build ; brouillons, programmation et conseils SEO déjà en place. |
| Mesure | Table `site_events` : visites sans cookie ni adresse IP, avec la source (moteurs, assistants IA, réseaux, campagnes utm). Back-office : onglets Site et SEO. |
| Tests | 114 tests automatiques : routes, liens, balises, formulaires, accessibilité. |

## 3. Points forts constatés

| Vérification | Résultat sur les pages indexables |
|---|---|
| Balise title | Unique sur chaque page, 45 à 60 caractères |
| Meta description | Unique, 113 à 159 caractères |
| Canonical | Présente et correcte partout ; version avec « / » final canonisée |
| H1 | Un seul par page ; hiérarchie H1 → H2 → H3 respectée |
| Liens internes cassés | Aucun |
| Images | Toutes ont un attribut alt (les illustrations sont en HTML/SVG, pas de photos lourdes) |
| Données structurées | Organization, WebSite, SoftwareApplication (accueil), BreadcrumbList, FAQPage, BlogPosting, WebApplication (outils) : JSON valide partout, sans note ni avis inventés |
| robots.txt | Tout autorisé, sitemap déclaré ; aucun robot d'IA bloqué |
| llms.txt | Présent, généré au build |
| Open Graph | Présent sur chaque page |
| Pages légales, 404, versions intégrables | En `noindex`, hors sitemap |
| Contenu | « L'essentiel » en tête de page, FAQ, limites du produit dites clairement, comparatif sourcé et daté |

## 4. Problèmes détectés

| # | Problème | Gravité | Traitement |
|---|---|---|---|
| 1 | Mentions légales en ligne avec des champs non remplis (`[FORME JURIDIQUE]`, `[CAPITAL]`, `[ADRESSE]`, RCS, TVA) | **Critique** (obligation légale, confiance) | À compléter par vous : `src/marketing/data/legal.tsx` |
| 2 | Aucune page pour « logiciel gestion chantier paysagiste » et « CRM paysagiste » | Élevée | **Corrigé** : deux pages créées |
| 3 | Aucun outil sur la marge, alors que c'est une question fréquente et un bon support de liens | Moyenne | **Corrigé** : calculateur de marge |
| 4 | Sitemap : la date `lastmod` de toutes les pages changeait chaque matin (date du build) | Moyenne : Google ignore une date qui n'est pas fiable | **Corrigé** : date réelle, ou pas de date |
| 5 | Le comparatif, page commerciale importante, n'avait que 2 liens internes | Moyenne | **Corrigé** : pied de page et pages liées |
| 6 | Présentation de la marque différente selon les endroits ; llms.txt en retard sur le produit (Factur-X) ; PLAN-LIENS.md annonçait encore « gratuit pendant la bêta » | Moyenne pour les IA | **Corrigé** : une présentation de référence unique |
| 7 | FAQ : réponse vague sur la signature en ligne ; rien sur les factures, l'équipe, la micro-entreprise | Faible | **Corrigé** : 13 questions |
| 8 | Articles de blog déclarés comme `website` dans Open Graph | Faible | **Corrigé** : `article` + dates |
| 9 | Page « À propos » : 150 mots, pas d'histoire ni d'équipe ; articles signés par l'organisation seulement | Moyenne (confiance, E-E-A-T) | À compléter par vous : rien ne doit être inventé |
| 10 | `sameAs` ne contient que YouTube ; pas de fiche Google Business ni de page LinkedIn | Moyenne | À faire par vous (PLAN-LIENS.md, étape 1) |
| 11 | Fichier JavaScript principal de 520 Ko (151 Ko compressé) | Faible : la page s'affiche sans lui, grâce au pré-rendu | Non traité : à mesurer d'abord (§ 8) |
| 12 | Les inscriptions, essais et abonnements ne sont pas rattachés à la source du visiteur | Élevée pour le pilotage | Proposition au § 7, **en attente de votre accord** |
| 13 | Positionnement partagé entre paysage et bâtiment (7 pages bâtiment ou artisans sur 30 pages hors blog) | À surveiller | Aucune page bâtiment ajoutée ; priorité au paysage |

## 5. Modifications réalisées

### Nouvelles pages

| Adresse | Intention visée |
|---|---|
| `/logiciel-gestion-chantier-paysagiste` | Suivi de chantier : étapes, fiche chantier, planning, paiements, équipe |
| `/crm-paysagiste` | Gestion des clients : fiche client, historique, relances |
| `/outils/calcul-marge` (+ version intégrable `/integrer/calcul-marge`) | Marge, taux de marge, taux de marque, coefficient, prix de vente |

Chaque page n'annonce que ce que l'application fait réellement (vérifié dans le code de l'application) et dit ce qu'elle ne fait pas : pas de pointage des heures, pas de géolocalisation, pas de campagnes d'e-mails.

### SEO technique

- **Sitemap** : `lastmod` = date de parution ou de mise à jour pour les articles, champ `updated` de `pages.json` pour les pages ; absent si la date n'est pas connue.
- **Open Graph** : `og:type = article`, `article:published_time` et `article:modified_time` sur les articles.
- **Maillage** : comparatif, suivi de chantier et CRM dans le pied de page ; la page « logiciel de gestion » renvoie vers ses deux pages détaillées ; « À propos » renvoie vers la présentation complète ; le calculateur de marge est lié depuis l'accueil, la page devis, la page outils et le calculateur de clôture.

### GEO

- **Présentation de référence** unique (`REFERENCE` dans `src/entry-server.tsx`), reprise dans llms.txt, llms-full.txt et PLAN-LIENS.md.
- **llms.txt** mis à jour ; **llms-full.txt** créé : fonctionnalités, tarifs, limites, FAQ, « L'essentiel » de chaque page, outils et guides, générés depuis les mêmes données que les pages.
- **FAQ** : 3 questions ajoutées, 1 réponse précisée (balisage FAQPage mis à jour automatiquement).

Ces fichiers aident les assistants à comprendre le produit. Ils ne garantissent ni l'indexation, ni une citation, ni une recommandation.

### Fichiers modifiés

| Fichier | Changement |
|---|---|
| `src/marketing/data/landings.ts` | 2 pages, liens internes |
| `src/marketing/data/tools.ts`, `components/tools/Calculators.tsx`, `pages/ToolPage.tsx` | Calculateur de marge |
| `src/marketing/config/pages.json` | Balises des 3 pages, champ `updated` |
| `src/marketing/routes.tsx`, `data/navigation.ts`, `sections/BlogTeaserSection.tsx` | Routes et liens |
| `src/marketing/data/faq.ts`, `pages/AboutPage.tsx` | FAQ, lien de présentation |
| `src/entry-server.tsx`, `scripts/postbuild.mjs` | Sitemap, Open Graph, llms.txt, llms-full.txt |
| `tests/` | Tests du calculateur de marge, des nouvelles pages et de la FAQ |
| `docs/` | Ce rapport, MOTS-CLES.md, PLAN-EDITORIAL.md, PLAN-LIENS.md mis à jour |

Aucun tarif, aucune condition commerciale, aucun formulaire et aucun élément d'authentification n'a été modifié. Aucune dépendance ajoutée. Le dépôt de l'application n'a pas été modifié.

## 6. Résultats des contrôles

| Contrôle | Résultat |
|---|---|
| `npm run lint` | Aucun avertissement |
| `npm test` | 114 tests réussis sur 114 |
| `npm run build` | 56 pages pré-rendues, sitemap de 48 adresses |
| Recherche de clés secrètes | Aucune |
| Analyse des 48 pages indexables | Titres, descriptions et H1 uniques ; canonicals corrects ; aucun lien interne cassé ; JSON-LD valide partout |
| Navigateur, 390 px et 1280 px | Nouvelles pages et calculateur : affichage correct, aucun débordement horizontal, aucune erreur |

Non vérifié : le site en ligne, les outils de validation de Google (test des résultats enrichis) et les performances réelles.

## 7. Mesure : ce qui existe et ce qui manque

Déjà mesuré, sans cookie et sans donnée personnelle (back-office → Site) : visites par source (Google, Bing, ChatGPT, Perplexity, Claude, Gemini, Copilot, Mistral, réseaux sociaux, accès direct, campagnes utm), pages d'arrivée, consultation des tarifs, clics « Essayer » par source.

**Ce qui manque** : après le clic « Essayer », le visiteur passe sur `app.paysapro-ai.fr` et la source est perdue. On ne peut donc pas dire aujourd'hui combien de comptes, d'essais activés ou d'abonnements viennent de Google ou d'un assistant IA.

**Proposition, à valider avant réalisation** (elle touche l'inscription et la base de production) :

1. Le site ajoute au lien d'inscription la source de la visite, par exemple `?src=ai&source=ChatGPT`. Aucune donnée personnelle : c'est une catégorie, comme le paramètre `metier=btp` déjà transmis.
2. L'application enregistre ces deux valeurs sur l'entreprise à la création du compte (une migration SQL, deux colonnes).
3. Le back-office affiche, par source : comptes créés, comptes activés (premier devis), abonnements payés.

À prévoir : une mention dans la politique de confidentialité ; la migration est à exécuter par vous dans Supabase.

**Tableau de bord SEO.** Les clics, impressions, positions et pages indexées viennent de Google Search Console, qui reste l'outil de référence, gratuit. Les intégrer au back-office demande un compte de service Google et une fonction serveur : faisable, facultatif, à décider plus tard. Les backlinks se suivent dans Search Console → *Liens*, les mentions de marque avec une alerte Google sur « Paysapro ».

## 8. Actions restantes

### Critique

- [ ] **Compléter les mentions légales** (forme juridique, capital, adresse, RCS, TVA) dans `src/marketing/data/legal.tsx`.
- [ ] **Fusionner cette branche et vérifier la mise en ligne**, puis dans Search Console : *Sitemaps* → renvoyer `sitemap.xml` ; *Inspection de l'URL* → demander l'indexation de `/logiciel-gestion-chantier-paysagiste`, `/crm-paysagiste` et `/outils/calcul-marge`.
- [ ] **Search Console → Pages** : relever le nombre réel de pages indexées et les motifs d'exclusion. C'est la seule source fiable sur l'indexation.

### Prioritaire

- [ ] **Fiches de marque** : Google Business Profile, LinkedIn, lien du site sur YouTube (PLAN-LIENS.md, étape 1). Puis ajouter ces adresses dans `sameAs` (`index.html`) et `CONTACT.socials`.
- [ ] **Comparatifs tiers** : Appvizer, Capterra, Tool Advisor, Logiciels.pro (PLAN-LIENS.md, étape 4).
- [ ] **Décider de l'attribution des inscriptions** (§ 7).
- [ ] **Back-office** : compléter l'article sur le prix d'une clôture (ACTIONS-SEO.md, étape C) et ajouter les liens internes listés dans PLAN-EDITORIAL.md, § 2.
- [ ] **Bing Webmaster Tools** : déclarer le site et le sitemap (gratuit). ChatGPT et Copilot s'appuient sur l'index de Bing.

### Important

- [ ] Relire et programmer les deux brouillons d'articles (PLAN-EDITORIAL.md, § 3).
- [ ] Page « À propos » : l'histoire réelle du projet, qui est derrière, depuis quand. Signer les articles d'un nom réel.
- [ ] Demander un avis sur Capterra ou Appvizer aux premiers utilisateurs satisfaits, sans contrepartie.
- [ ] Mesurer les performances réelles : [PageSpeed Insights](https://pagespeed.web.dev) sur l'accueil et une page d'atterrissage, sur mobile. Si le LCP dépasse 2,5 s ou l'INP 200 ms, alléger le JavaScript de l'accueil.
- [ ] Presse et partenaires du paysage (PLAN-LIENS.md, étape 3).
- [ ] Vérifier une fois par mois, à la main, ce que répondent ChatGPT, Perplexity et Gemini à « quel logiciel de devis pour un paysagiste ? » et noter si Paysapro AI est cité, et d'après quelle source.

### Facultatif

- [ ] Intégrer Search Console au back-office (compte de service Google).
- [ ] Vidéo de démonstration de 2 à 3 minutes sur YouTube.
- [ ] Une image de partage propre à chaque article (aujourd'hui, la même pour toutes les pages).

## 9. Ce qui n'a pas été fait, et pourquoi

| Élément | Raison |
|---|---|
| Vérification du site en ligne et de l'indexation | Site injoignable depuis l'environnement de travail ; l'indexation ne se constate que dans Search Console |
| Volumes de recherche | Aucune donnée vérifiable : la cartographie donne des priorités qualitatives |
| Publication d'articles | Les articles se publient depuis le back-office, après votre relecture : brouillons fournis |
| Attribution des inscriptions par source | Touche l'inscription et la base de production : en attente de votre accord |
| Pages « logiciel facturation paysagiste » et « logiciel devis jardinier » | Même intention que `/logiciel-devis-paysagiste` : elles se concurrenceraient |
| Règles robots.txt par robot d'IA | Inutile : tout est déjà autorisé |
| Avis et notes dans les données structurées | Il n'existe pas encore d'avis réels : rien n'est inventé |
| Liens externes | Ils ne se créent pas depuis le code : liste de prospects et messages fournis |

## 10. Quand refaire le point

Fin novembre, puis chaque mois, dans Search Console (*Performances*, 28 jours) : position de « paysapro » (objectif : 1), impressions et position de « logiciel devis paysagiste », apparition des trois nouvelles pages, nombre de pages indexées. Dans le back-office (*Site*) : part des visites venant des moteurs et des assistants IA, et clics « Essayer » par source. Compter trois à six mois avant un effet net sur les requêtes concurrentielles : aucun classement ne peut être promis.
