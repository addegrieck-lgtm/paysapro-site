# SEO Roast : www.paysapro-ai.fr (2026-11-12)

**Verdict : la technique est propre ; ce qui manque, ce sont des liens. Les 18 articles du blog parlaient du produit sans jamais pointer vers les pages qui vendent.**

Pages qui rapportent : `/logiciel-devis-paysagiste`, `/tarifs`, l'accueil. Conversion : inscription à l'essai gratuit (`app.paysapro-ai.fr/#/signup`).

Méthode : audit du code et d'un build de production local (`npm run build`). Le site en ligne n'était pas joignable depuis l'environnement de l'audit ; les points marqués « à vérifier en ligne » restent donc à contrôler.

## Ce qui a été contrôlé et qui va bien (aucun bloqueur fatal)

| Point | Résultat |
|---|---|
| robots.txt | `Allow: /` pour tous les robots + ligne `Sitemap` : Bing, ChatGPT, Perplexity et Claude peuvent explorer le site |
| sitemap.xml | 49 URL, pages en `noindex` exclues (`/integrer/*`, 404) |
| Pré-rendu | 56 pages en HTML complet, contenu lisible sans JavaScript, avant le pied de page |
| Langues | une seule (fr), pas de hreflang à gérer |
| Fausses pages 200 | `404.html` en `noindex` ; GitHub Pages renvoie un vrai code 404 (à vérifier en ligne) |
| Canonicals | présents partout ; `/blog` et `/blog/` pointent vers la même URL |
| Prix pour les IA | 19 / 39 / 69 € HT en texte brut sur `/tarifs`, identiques à l'application (`paysapro-ai/src/features/plans/plans.ts`) |
| Mur de démo | démo sans inscription dès le premier écran de l'accueil, sur ordinateur et mobile |
| Application | `app.paysapro-ai.fr` en `noindex` : elle ne fait pas concurrence au site dans Google |
| Widgets `/integrer/*` | `noindex`, avec un lien de marque « Paysapro AI » vers l'outil |

## Feuille de route (par impact sur le chiffre d'affaires)

| # | Niveau | Problème | Ce que ça coûte | Correction | Responsable | Statut |
|---|---|---|---|---|---|---|
| 1 | REVENU | 0 lien dans le texte des 18 articles (seulement la liste « À lire aussi » en bas) | Le trafic du blog ne transmet pas d'autorité aux pages qui vendent, et Google ne sait pas lesquelles comptent | `data/blogLinks.ts` : 35 liens dans le texte (« Paysapro AI » → page produit de l'article, plus des expressions métier), et syntaxe `[texte](/chemin)` disponible dans le back-office | agent | fait dans cette branche |
| 2 | REVENU | Prix du JSON-LD tapés à la main (`'19'`, `'69'`, `3`) ; aucune offre en JSON-LD sur `/tarifs` | Au premier changement de prix, Google et les IA lisent un prix périmé et le produit perd leur confiance | Prix lus dans `config/pricing.ts` ; offres Starter / Pro / Business en JSON-LD sur `/tarifs` ; test qui fait échouer le build si pages.json, llms.txt ou le JSON-LD ne correspondent plus | agent | fait dans cette branche |
| 3 | REVENU | `.env.example` pointait vers l'ancien domaine `paysapro.ai` | Un build local fait à partir de ce modèle produirait des canonicals et un sitemap vers un domaine qui n'est pas le vôtre | Domaine corrigé en `paysapro-ai.fr` | agent | fait dans cette branche |
| 4 | REVENU | `/logiciel-paysagiste-services-a-la-personne` ne reçoit qu'1 lien dans le contenu ; `/crm-paysagiste` et `/logiciel-gestion-chantier-paysagiste` 2 chacun | Pages trop profondes pour se classer sur « logiciel paysagiste SAP » ou « CRM paysagiste » | Dans le back-office, ajouter `[attestation fiscale SAP](/logiciel-paysagiste-services-a-la-personne)` dans les articles sur l'entretien et le contrat de jardin ; ajouter un lien depuis la section « Pour qui » de l'accueil | fondateur | à faire |
| 5 | REVENU | Indexation jamais vérifiée depuis l'audit | Une page qui vend mais n'est pas indexée ne rapporte rien | Search Console → *Pages* : vérifier que `/`, `/logiciel-devis-paysagiste` et `/tarifs` sont indexées ; demander l'indexation des articles récents | fondateur | à faire |
| 6 | DURABLE | Autorité inconnue : site récent (premiers articles en septembre 2026), aucune donnée Ahrefs ou DataForSEO | Les requêtes « logiciel devis paysagiste » sont tenues par Robbin, Obat et Tolteck, qui ont des années de liens | Brancher Ahrefs ou DataForSEO (skill ahrefs-research), compter les domaines référents propres des 3 concurrents, puis suivre `docs/PLAN-LIENS.md` (annuaires pros, fiche Google Business, fournisseurs) | fondateur | à faire |
| 7 | DURABLE | Les devis envoyés aux clients (`paysapro-ai/src/pages/ClientQuotePage.tsx`, PDF) ne mentionnent pas Paysapro AI | Chaque devis envoyé est une occasion perdue de faire connaître la marque | Ajouter « Devis réalisé avec Paysapro AI » (lien vers l'accueil, ancre = nom de marque) en pied de page du devis en ligne et du PDF. Gain attendu : surtout de la notoriété et des visites. Pour le SEO, l'effet sera faible, car la page du devis doit rester en `noindex` | agent | à faire (dépôt paysapro-ai) |
| 8 | DURABLE | Widgets `/integrer/*` prêts mais diffusés nulle part | Pas de liens gagnés par l'usage | Proposer le calculateur de clôture et le calculateur de volume aux blogs de jardinage et aux sites de fournisseurs (code d'intégration dans `/outils/*`) | fondateur | à faire |
| 9 | DURABLE | Présence dans les réponses de ChatGPT, Perplexity et Gemini non mesurée | Impossible de savoir si llms.txt et les prix en HTML sont repris | Suivre 10 questions du type « meilleur logiciel devis paysagiste » chaque mois (skill aiseotracker ou à la main) | fondateur | à faire |

## Détails sans importance (à ignorer tant que les lignes au-dessus ne sont pas faites)

- La maquette du tableau de bord affichait `app.paysapro.ai` : corrigé au passage, car c'était une seule ligne.

## Vérifier après la mise en ligne

```bash
curl -s https://www.paysapro-ai.fr/robots.txt
curl -s -o /dev/null -w '%{http_code}\n' https://www.paysapro-ai.fr/page-qui-n-existe-pas   # doit afficher 404
curl -s https://www.paysapro-ai.fr/tarifs | grep -o '"price":"[0-9]*"'                       # 19, 39, 69
curl -s https://www.paysapro-ai.fr/blog/choisir-logiciel-devis-paysagiste | grep -o 'href="/comparatif-logiciel-devis-paysagiste"'
```

Ensuite, passer `/tarifs` dans le test des résultats enrichis de Google (https://search.google.com/test/rich-results).
