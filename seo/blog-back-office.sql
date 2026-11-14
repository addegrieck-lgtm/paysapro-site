-- Audit SEO du 14/11/2026 : descriptions (excerpt) et un intertitre H2 par article, pour placer le mot-clé visé.
-- À exécuter dans Supabase → SQL Editor (projet de l'application), puis « Mettre en ligne » dans le back-office (rubrique Articles).
-- Sans effet si l'article a déjà été modifié : chaque intertitre n'est remplacé que s'il a encore son ancien texte.

begin;

update public.blog_posts set
  excerpt = 'Comment relancer un devis sans réponse : quand relancer, par quel moyen et avec quels mots, pour obtenir une réponse sans paraître insistant.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Quand relancer' then jsonb_set(e, '{heading}', to_jsonb('Quand relancer un devis'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'relancer-un-devis-sans-reponse';

update public.blog_posts set
  excerpt = 'Préparation du sol, terre, semis ou gazon en rouleau, arrosage : les postes à prévoir pour chiffrer la création d’une pelouse sur un devis juste.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = '4. Semis ou gazon en rouleau' then jsonb_set(e, '{heading}', to_jsonb('4. Création d’une pelouse : semis ou gazon en rouleau'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'comment-chiffrer-creation-pelouse';

update public.blog_posts set
  excerpt = 'Catalogue de prestations, modèles, photos rangées : comment gagner du temps sur ses devis et chiffrer plus vite sans perdre en précision.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Où passe vraiment le temps d’un devis ?' then jsonb_set(e, '{heading}', to_jsonb('Où gagner du temps sur ses devis ?'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'gagner-du-temps-sur-ses-devis';

update public.blog_posts set
  excerpt = 'Organiser ses chantiers en centralisant les informations de chacun : moins d’oublis, moins d’allers-retours et des clients mieux informés.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = '1. Un seul dossier par chantier' then jsonb_set(e, '{heading}', to_jsonb('1. Organiser ses chantiers : un seul dossier par chantier'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'organiser-ses-chantiers';

update public.blog_posts set
  excerpt = 'Mise en page, photos, conditions : comment présenter un devis professionnel qui rassure le client au moment de signer, et les erreurs à éviter.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = '1. Une identité visible dès le premier coup d’œil' then jsonb_set(e, '{heading}', to_jsonb('1. Présenter un devis professionnel : une identité visible'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'presenter-un-devis-professionnel';

update public.blog_posts set
  excerpt = 'Les mentions obligatoires d’une facture de travaux pour un artisan, y compris les nouvelles mentions liées à la facture électronique de 2026-2027.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Le document' then jsonb_set(e, '{heading}', to_jsonb('Les mentions obligatoires de la facture elle-même'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'mentions-obligatoires-facture-artisan';

update public.blog_posts set
  excerpt = 'Numérotation des factures : séquence continue, pas de trou, pas de suppression. Les règles à suivre et comment corriger une erreur avec un avoir.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Une séquence continue' then jsonb_set(e, '{heading}', to_jsonb('Numérotation des factures : une séquence continue'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'numerotation-factures-avoir';

update public.blog_posts set
  excerpt = 'TVA des travaux : quel taux appliquer sur un devis de rénovation, comment combiner 10 % et 5,5 %, et ce qui remplace les attestations 1300-SD.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Plusieurs taux dans le même devis' then jsonb_set(e, '{heading}', to_jsonb('TVA des travaux : plusieurs taux dans le même devis'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'tva-travaux-renovation-taux-reduit';

update public.blog_posts set
  excerpt = 'Les mentions obligatoires d’un devis de travaux : entreprise, assurance décennale, client, prestations, prix, délais et conditions de paiement.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Les mentions selon le chantier' then jsonb_set(e, '{heading}', to_jsonb('Les mentions obligatoires d’un devis selon le chantier'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'mentions-obligatoires-devis-travaux';

update public.blog_posts set
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Les informations à faire figurer' then jsonb_set(e, '{heading}', to_jsonb('L’assurance décennale : les informations à faire figurer'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'assurance-decennale-devis';

update public.blog_posts set
  excerpt = 'Facture électronique : réception dès septembre 2026, émission en septembre 2027 pour les TPE. Le calendrier de la réforme et comment s’y préparer.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Ce que ça change concrètement' then jsonb_set(e, '{heading}', to_jsonb('Ce que la facture électronique change concrètement'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'facturation-electronique-artisans';

update public.blog_posts set
  excerpt = 'Attestation fiscale SAP en jardinage : à quoi elle sert, ce qu’elle contient et comment la préparer pour vos clients sans y passer vos soirées.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Que contient l’attestation ?' then jsonb_set(e, '{heading}', to_jsonb('Que contient l’attestation fiscale SAP ?'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'attestation-fiscale-sap-jardinage';

update public.blog_posts set
  excerpt = 'Comment choisir un logiciel de devis paysagiste : unités métier, usage sur le chantier, catalogue de prix, signature, SAP, prix et données.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = '7. Tester sur un vrai devis' then jsonb_set(e, '{heading}', to_jsonb('7. Choisir un logiciel de devis paysagiste : le tester sur un vrai devis'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'choisir-logiciel-devis-paysagiste';

update public.blog_posts set
  excerpt = 'Pour faire un devis paysagiste clair : métrés, prestations, main-d’œuvre, TVA, acompte et conditions. La méthode pas à pas, avec un exemple chiffré.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = '4. Les informations à faire figurer' then jsonb_set(e, '{heading}', to_jsonb('4. Faire un devis paysagiste : les informations à faire figurer'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'comment-faire-un-devis-paysagiste';

update public.blog_posts set
  excerpt = 'Calculer la surface d’une terrasse en m², y compris les formes irrégulières (L, cercle, triangle), et en déduire les matériaux à commander.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = 'Terrasse rectangulaire' then jsonb_set(e, '{heading}', to_jsonb('Surface d’une terrasse rectangulaire'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'calculer-surface-terrasse';

update public.blog_posts set
  excerpt = 'Mètres linéaires, poteaux, panneaux, portail, pose : la méthode pour calculer le prix d’une clôture sans oublier de poste sur le devis.',
  body = coalesce((select jsonb_agg(case when e->>'heading' = '6. La formule complète' then jsonb_set(e, '{heading}', to_jsonb('6. Le prix d’une clôture : la formule complète'::text)) else e end order by i) from jsonb_array_elements(body) with ordinality as t(e, i)), body)
where slug = 'calculer-prix-cloture';

commit;
