# Actions SEO — suite à l'analyse Search Console (4 novembre 2026)

Les chiffres portent sur les 3 derniers mois : **725 impressions**, **28 clics** environ, CTR 3,9 %, **position moyenne 36,4**.
Google ne montre le site que depuis le 29/09/2026.

## 1. Diagnostic par requête

| Requête | Clics | Impressions | Position | Diagnostic |
|---|---|---|---|---|
| paysapro ai | 6 | 12 | 1,2 | Parfait. |
| **paysapro** | 4 | **148** | **6,1** | **Problème n°1** : 6ᵉ sur son propre nom. |
| paysa pro | 0 | 9 | 6,0 | Même problème. |
| calculer le prix d'une clôture en grillage | 0 | 11 | **25,4** | La plus proche de la page 1. |
| logiciel devis paysagiste | 0 | 44 | 73,1 | Page 8 : il faut des liens et du temps. |
| logiciel facturation paysagiste | 0 | 13 | 77,7 | Page 8. |
| logiciel devis facture paysagiste | 0 | 28 | 83,1 | Page 9. |
| logiciel devis electricien | 0 | 17 | 86,6 | Pas prioritaire. |
| faire un devis paysagiste | 0 | 19 | 88,7 | Page 9. |
| logiciel devis peintre | 0 | 11 | 90,9 | Pas prioritaire. |

## 2. Ce qui a été modifié sur le site (fait)

- [x] **Accueil** : le titre commence par la marque, « Paysapro AI : logiciel de devis pour paysagistes ».
- [x] **Données structurées** : `alternateName` « Paysapro » et « Paysa Pro » ajoutés (Organization et WebSite).
- [x] **/logiciel-devis-paysagiste** : titre « Logiciel devis et facture paysagiste », description, H1 et intro parlent maintenant de facturation.
- [x] **/outils/calcul-clôture** : titre et H1 incluent « grillage », nouvelle section « Clôture en grillage : rouleaux, poteaux et prix ».

## 3. À faire par vous, dans l'ordre

### A. Search Console : demander la réindexation (5 min, après la mise en ligne)

*Inspection de l'URL* → coller l'adresse → **Demander une indexation**, pour chacune :

- https://www.paysapro-ai.fr/
- https://www.paysapro-ai.fr/logiciel-devis-paysagiste
- https://www.paysapro-ai.fr/outils/calcul-cloture
- https://www.paysapro-ai.fr/blog/calculer-prix-cloture (après l'étape C)

### B. Vérifier qui passe devant vous sur « paysapro » (2 min)

Taper `paysapro` dans Google (en navigation privée) et noter les 5 résultats au-dessus du site.
Si ce sont vos propres comptes (YouTube, GitHub, application), ce n'est pas grave. Si ce sont des homonymes, l'étape D est prioritaire.

### C. Back-office : compléter l'article « Comment calculer le prix d'une clôture ? » (10 min)

L'article vient du back-office (Supabase) : une modification dans le code serait écrasée. Dans le back-office :

- **Mots-clés** : ajouter `clôture grillage`, `prix clôture grillage`.
- **Nouvelle section**, à coller telle quelle :

> **Prix d'une clôture en grillage**
>
> Le grillage soudé ou simple torsion se vend en rouleaux, le plus souvent de 25 m. Comptez un rouleau par tranche de 25 m
> (arrondi au supérieur) et un poteau tous les 2 à 2,5 m, plus un en bout de ligne. Ajoutez une jambe de force à chaque angle
> et à chaque extrémité, ainsi que le fil de tension, les tendeurs et les ligatures.
>
> Exemple : 60 m de grillage avec un entraxe de 2,5 m demandent 3 rouleaux et 25 poteaux.
>
> Pour le prix, additionnez les fournitures, le béton de scellement, les heures de pose multipliées par votre taux horaire,
> la préparation du terrain (débroussaillage, dépose, évacuation) et le déplacement. Divisez le total HT par la longueur :
> vous obtenez votre prix au mètre linéaire posé, à présenter sur le devis.
>
> Pour compter vos poteaux et vos panneaux sans erreur : [calculateur de clôture gratuit](/outils/calcul-cloture).

### D. Fiches de marque : ce qui vous met 1ᵉʳ sur « paysapro » (1 h)

Utilisez partout **exactement** le même nom, la même adresse et la même description.

- **Nom** : Paysapro AI
- **Site** : https://www.paysapro-ai.fr
- **Description courte** (moins de 160 caractères) :

> Paysapro AI, le logiciel de devis et de facturation pour paysagistes : photos, métrés, devis signé sur mobile. Essai gratuit 15 jours.

- **Description longue** (Google Business, LinkedIn, annuaires) :

> Paysapro AI est un logiciel de devis et de facturation conçu pour les paysagistes et les artisans du bâtiment.
> Sur le chantier, depuis un smartphone : photos, métrés au m², au ml et au m³, prestations issues de votre catalogue de prix,
> devis professionnel signé en ligne par le client, puis facture en un clic. Essai gratuit 15 jours, sans carte bancaire.

| Ordre | Fiche | Adresse |
|---|---|---|
| 1 | Google Business Profile (catégorie « Éditeur de logiciels ») | https://business.google.com |
| 2 | Page LinkedIn entreprise | https://www.linkedin.com/company/setup/new/ |
| 3 | Chaîne YouTube : mettre le lien du site dans « À propos » | https://www.youtube.com/@PAYSAPRO-AI |
| 4 | Appvizer | https://www.appvizer.fr/partenaires |
| 5 | Capterra | https://www.capterra.fr |

La suite (presse paysage, partenaires, calculateurs à proposer) est dans [PLAN-LIENS.md](PLAN-LIENS.md).

### E. Blog : un article par semaine

Priorité aux sujets proches des recherches déjà visibles :

1. Logiciel de facturation pour paysagiste : ce qu'il doit faire (cible « logiciel facturation paysagiste »).
2. Prix d'une clôture en grillage au mètre linéaire (cible « clôture grillage »).
3. Combien coûte la pose d'un gazon en rouleau ?
4. Devis d'entretien de jardin : modèle et prix.

## 4. Quand refaire le point

Fin novembre, puis fin décembre, dans Search Console (*Performances*, 28 jours) : comparer la **position** de « paysapro »
(objectif : 1), celle de « calculer le prix d'une clôture en grillage » (objectif : moins de 15) et le nombre de pages indexées.
