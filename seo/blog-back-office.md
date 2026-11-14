# Articles du blog : changements à faire dans le back-office

Audit SEO du 14/11/2026. Les articles sont lus dans la base Supabase à chaque build (`scripts/fetch-blog.mjs`) :
modifier `src/marketing/data/blog.generated.json` ne servirait à rien, il est réécrit depuis la base.

Les changements sont déjà dans `blog.generated.json` (utilisé tant que la table `blog_posts` n'existe pas : migration 0010 de l'application non appliquée). Si la table existe un jour, ce sont les articles de la base qui comptent : appliquer alors le script ci-dessous.

Deux façons de les appliquer :

1. **En une fois** : exécuter [`blog-back-office.sql`](blog-back-office.sql) dans Supabase → *SQL Editor*, puis *Mettre en ligne* dans le back-office.
2. **À la main** : back-office → *Articles* → l'article → remplacer la description (extrait) et l'intertitre indiqués.

Mots-clés correspondants (à coller dans l'audit) : [`mots-cles-audit.txt`](mots-cles-audit.txt).

## /blog/relancer-un-devis-sans-reponse

Mot-clé : **relancer un devis**

- Description, avant : Quand relancer, par quel moyen et avec quels mots : une méthode simple pour obtenir une réponse sans paraître insistant.
- Description, après : **Comment relancer un devis sans réponse : quand relancer, par quel moyen et avec quels mots, pour obtenir une réponse sans paraître insistant.** (141 caractères)
- Intertitre H2, avant : Quand relancer
- Intertitre H2, après : **Quand relancer un devis**

## /blog/comment-chiffrer-creation-pelouse

Mot-clé : **création d’une pelouse**

- Description, avant : Préparation du sol, apport de terre, semis ou gazon en rouleau, arrosage : les postes à prévoir pour un devis de pelouse juste et complet.
- Description, après : **Préparation du sol, terre, semis ou gazon en rouleau, arrosage : les postes à prévoir pour chiffrer la création d’une pelouse sur un devis juste.** (145 caractères)
- Intertitre H2, avant : 4. Semis ou gazon en rouleau
- Intertitre H2, après : **4. Création d’une pelouse : semis ou gazon en rouleau**

## /blog/gagner-du-temps-sur-ses-devis

Mot-clé : **gagner du temps sur ses devis**

- Description, avant : Catalogue de prestations, modèles, photos rangées : organiser sa préparation commerciale pour chiffrer plus vite sans perdre en précision.
- Description, après : **Catalogue de prestations, modèles, photos rangées : comment gagner du temps sur ses devis et chiffrer plus vite sans perdre en précision.** (137 caractères)
- Intertitre H2, avant : Où passe vraiment le temps d’un devis ?
- Intertitre H2, après : **Où gagner du temps sur ses devis ?**

## /blog/organiser-ses-chantiers

Mot-clé : **organiser ses chantiers**

- Description, avant : Centraliser les informations de chaque chantier pour moins d’oublis, moins d’allers-retours et des clients mieux informés.
- Description, après : **Organiser ses chantiers en centralisant les informations de chacun : moins d’oublis, moins d’allers-retours et des clients mieux informés.** (138 caractères)
- Intertitre H2, avant : 1. Un seul dossier par chantier
- Intertitre H2, après : **1. Organiser ses chantiers : un seul dossier par chantier**

## /blog/presenter-un-devis-professionnel

Mot-clé : **présenter un devis professionnel**

- Description, avant : Mise en page, photos, conditions : ce qui rassure un client au moment de signer, et les erreurs qui font hésiter.
- Description, après : **Mise en page, photos, conditions : comment présenter un devis professionnel qui rassure le client au moment de signer, et les erreurs à éviter.** (143 caractères)
- Intertitre H2, avant : 1. Une identité visible dès le premier coup d’œil
- Intertitre H2, après : **1. Présenter un devis professionnel : une identité visible**

## /blog/mentions-obligatoires-facture-artisan

Mot-clé : **mentions obligatoires d’une facture**

- Description, avant : La liste des informations à faire figurer sur une facture de travaux, y compris les nouvelles mentions liées à la facture électronique.
- Description, après : **Les mentions obligatoires d’une facture de travaux pour un artisan, y compris les nouvelles mentions liées à la facture électronique de 2026-2027.** (146 caractères)
- Intertitre H2, avant : Le document
- Intertitre H2, après : **Les mentions obligatoires de la facture elle-même**

## /blog/numerotation-factures-avoir

Mot-clé : **numérotation des factures**

- Description, avant : Séquence continue, pas de trou, pas de suppression : comment numéroter ses factures et corriger une erreur avec un avoir.
- Description, après : **Numérotation des factures : séquence continue, pas de trou, pas de suppression. Les règles à suivre et comment corriger une erreur avec un avoir.** (145 caractères)
- Intertitre H2, avant : Une séquence continue
- Intertitre H2, après : **Numérotation des factures : une séquence continue**

## /blog/tva-travaux-renovation-taux-reduit

Mot-clé : **TVA des travaux**

- Description, avant : Quel taux appliquer sur un devis de rénovation, comment combiner 10 % et 5,5 %, et ce qui remplace les attestations 1300-SD depuis 2025.
- Description, après : **TVA des travaux : quel taux appliquer sur un devis de rénovation, comment combiner 10 % et 5,5 %, et ce qui remplace les attestations 1300-SD.** (142 caractères)
- Intertitre H2, avant : Plusieurs taux dans le même devis
- Intertitre H2, après : **TVA des travaux : plusieurs taux dans le même devis**

## /blog/mentions-obligatoires-devis-travaux

Mot-clé : **mentions obligatoires d’un devis**

- Description, avant : La liste des informations à faire figurer sur un devis du bâtiment : entreprise, assurance, client, prestations, prix, délais et conditions.
- Description, après : **Les mentions obligatoires d’un devis de travaux : entreprise, assurance décennale, client, prestations, prix, délais et conditions de paiement.** (143 caractères)
- Intertitre H2, avant : Les mentions selon le chantier
- Intertitre H2, après : **Les mentions obligatoires d’un devis selon le chantier**

## /blog/assurance-decennale-devis

Mot-clé : **assurance décennale**

- Intertitre H2, avant : Les informations à faire figurer
- Intertitre H2, après : **L’assurance décennale : les informations à faire figurer**

## /blog/facturation-electronique-artisans

Mot-clé : **facture électronique**

- Description, avant : Réception dès septembre 2026, émission en septembre 2027 pour les TPE : le calendrier de la réforme et comment s’y préparer.
- Description, après : **Facture électronique : réception dès septembre 2026, émission en septembre 2027 pour les TPE. Le calendrier de la réforme et comment s’y préparer.** (146 caractères)
- Intertitre H2, avant : Ce que ça change concrètement
- Intertitre H2, après : **Ce que la facture électronique change concrètement**

## /blog/attestation-fiscale-sap-jardinage

Mot-clé : **attestation fiscale SAP**

- Description, avant : Services à la personne et jardinage : à quoi sert l’attestation fiscale annuelle, ce qu’elle contient et comment la préparer sans y passer vos soirées.
- Description, après : **Attestation fiscale SAP en jardinage : à quoi elle sert, ce qu’elle contient et comment la préparer pour vos clients sans y passer vos soirées.** (143 caractères)
- Intertitre H2, avant : Que contient l’attestation ?
- Intertitre H2, après : **Que contient l’attestation fiscale SAP ?**

## /blog/choisir-logiciel-devis-paysagiste

Mot-clé : **choisir un logiciel de devis paysagiste**

- Description, avant : Les critères qui comptent vraiment pour un paysagiste : unités métier, usage sur le chantier, catalogue de prix, signature, SAP, prix et données.
- Description, après : **Comment choisir un logiciel de devis paysagiste : unités métier, usage sur le chantier, catalogue de prix, signature, SAP, prix et données.** (139 caractères)
- Intertitre H2, avant : 7. Tester sur un vrai devis
- Intertitre H2, après : **7. Choisir un logiciel de devis paysagiste : le tester sur un vrai devis**

## /blog/comment-faire-un-devis-paysagiste

Mot-clé : **faire un devis paysagiste**

- Description, avant : Les éléments indispensables d’un devis paysagiste clair : métrés, prestations, main-d’œuvre, TVA, acompte et conditions, avec un exemple chiffré.
- Description, après : **Pour faire un devis paysagiste clair : métrés, prestations, main-d’œuvre, TVA, acompte et conditions. La méthode pas à pas, avec un exemple chiffré.** (148 caractères)
- Intertitre H2, avant : 4. Les informations à faire figurer
- Intertitre H2, après : **4. Faire un devis paysagiste : les informations à faire figurer**

## /blog/calculer-surface-terrasse

Mot-clé : **surface d’une terrasse**

- Description, avant : Méthode simple pour mesurer une terrasse en m², y compris les formes irrégulières (L, cercle, triangle), et en déduire les matériaux à commander.
- Description, après : **Calculer la surface d’une terrasse en m², y compris les formes irrégulières (L, cercle, triangle), et en déduire les matériaux à commander.** (139 caractères)
- Intertitre H2, avant : Terrasse rectangulaire
- Intertitre H2, après : **Surface d’une terrasse rectangulaire**

## /blog/calculer-prix-cloture

Mot-clé : **prix d’une clôture**

- Description, avant : Mètres linéaires, poteaux, panneaux, portail, terrassement et pose : la méthode pour chiffrer une clôture sans oublier de poste sur le devis.
- Description, après : **Mètres linéaires, poteaux, panneaux, portail, pose : la méthode pour calculer le prix d’une clôture sans oublier de poste sur le devis.** (135 caractères)
- Intertitre H2, avant : 6. La formule complète
- Intertitre H2, après : **6. Le prix d’une clôture : la formule complète**
