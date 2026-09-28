# Images du site

Les interfaces (téléphones, devis, tableau de bord) et la « photo » de jardin sont des
composants React/SVG : aucune image externe n'est nécessaire.

Pour ajouter de vraies photos (hero, témoignages, blog) :

1. Utiliser uniquement des images **dont vous détenez les droits** (vos propres photos, ou
   une banque d'images libre de droits en respectant sa licence — conserver la preuve de licence).
2. Exporter en **WebP/AVIF**, largeur max 1600 px, poids < 200 Ko.
3. Déposer ici (`public/images/…`) et référencer avec `/images/nom.webp`,
   avec un texte `alt` descriptif, `width`/`height` et `loading="lazy"` hors premier écran.
4. Photos de témoignages : dans `public/images/testimonials/`, avec l'accord écrit de la personne.
