import type { ReactNode } from 'react';

/**
 * ⚠ TODO AVANT PUBLICATION : remplacer TOUS les [PLACEHOLDERS] par les informations réelles
 * (et faire relire ces textes par un professionnel du droit). Aucune information légale n'a été inventée.
 */

/** Placeholder bien visible. */
export function Ph({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-amber-soft px-1 font-semibold text-amber">{children}</mark>;
}

export type LegalDocId = 'mentions' | 'confidentialite' | 'cgu' | 'cookies';

export interface LegalDoc {
  path: string;
  title: string;
  updated: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}

export const LEGAL_DOCS: Record<LegalDocId, LegalDoc> = {
  mentions: {
    path: '/mentions-legales',
    title: 'Mentions légales',
    updated: <>20 octobre 2026</>,
    sections: [
      {
        heading: 'Éditeur du site',
        body: (
          <>
            <p>
              ADDEG SAAS, <Ph>[FORME JURIDIQUE]</Ph> au capital de <Ph>[CAPITAL]</Ph> €
            </p>
            <p>
              Siège social : <Ph>[ADRESSE]</Ph>
            </p>
            <p>
              SIRET : 584 674 303 87144 · RCS : <Ph>[VILLE RCS ET NUMÉRO]</Ph> · TVA intracommunautaire : <Ph>[NUMÉRO DE TVA]</Ph>
            </p>
            <p>
              Email : contact@paysapro-ai.fr
            </p>
            <p>
              Directeur de la publication : Adrien Degrieck
            </p>
          </>
        ),
      },
      {
        heading: 'Hébergement',
        body: (
          <p>
            Le site est hébergé par GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis (support.github.com). L’application (app.paysapro-ai.fr) est hébergée par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Les données de l’application et les messages envoyés par les formulaires sont enregistrés chez Supabase, dans l’Union européenne (Francfort).
          </p>
        ),
      },
      {
        heading: 'Propriété intellectuelle',
        body: (
          <p>
            L’ensemble des contenus de ce site (textes, interfaces, logo, illustrations) est la propriété de ADDEG SAAS, sauf mention contraire. Toute
            reproduction sans autorisation préalable est interdite.
          </p>
        ),
      },
      {
        heading: 'Contact',
        body: (
          <p>
            Pour toute question, vous pouvez utiliser la page Contact ou écrire à contact@paysapro-ai.fr.
          </p>
        ),
      },
    ],
  },
  confidentialite: {
    path: '/confidentialite',
    title: 'Politique de confidentialité',
    updated: <>30 octobre 2026</>,
    sections: [
      {
        heading: 'Responsable du traitement',
        body: (
          <p>
            ADDEG SAAS, <Ph>[ADRESSE]</Ph>, joignable à contact@paysapro-ai.fr.
          </p>
        ),
      },
      {
        heading: 'Données collectées sur ce site',
        body: (
          <ul className="list-disc space-y-1 pl-5">
            <li>Formulaire de contact : nom, entreprise, email, téléphone (facultatif), type d’entreprise, nombre de salariés, message.</li>
            <li>Inscription aux nouveautés : adresse email et consentement.</li>
            <li>
              Mesure d’audience : pages consultées, site ou moteur de recherche d’origine, campagne (paramètres utm), type d’appareil, langue du navigateur et clics sur
              les boutons principaux. Sans cookie, sans adresse IP ni identifiant durable : une visite est un numéro aléatoire effacé à la fermeture de l’onglet.
            </li>
            <li>Le site ne dépose pas de cookie publicitaire.</li>
          </ul>
        ),
      },
      {
        heading: 'Finalités et bases légales',
        body: (
          <ul className="list-disc space-y-1 pl-5">
            <li>Répondre à vos demandes de contact (intérêt légitime / mesures précontractuelles).</li>
            <li>Vous envoyer les nouveautés Paysapro AI (consentement, retirable à tout moment).</li>
            <li>Produire des statistiques anonymes de fréquentation pour améliorer le site (intérêt légitime ; usage exclusivement interne).</li>
          </ul>
        ),
      },
      {
        heading: 'Durée de conservation',
        body: (
          <p>
            Demandes de contact : 3 ans après le dernier échange. Inscription aux nouveautés : jusqu’à votre désinscription. Comptes de l’application : pendant la durée d’utilisation, puis 3 ans après la dernière activité (sauf suppression du compte, effective sans délai). Pièces comptables liées aux abonnements : 10 ans (obligation légale). Statistiques de fréquentation : 13 mois.
          </p>
        ),
      },
      {
        heading: 'Destinataires et sous-traitants',
        body: (
          <p>
            Les données sont destinées à ADDEG SAAS. Sous-traitants techniques : GitHub, Inc. (hébergement du site, qui peut enregistrer des journaux techniques comme l’adresse IP) et Supabase (enregistrement des messages de contact, des inscriptions aux nouveautés et des statistiques de fréquentation).{' '}
            Les données de Supabase sont hébergées dans l’Union européenne (Francfort, Allemagne). L’application est servie par Vercel et les paiements sont traités par Stripe, qui peuvent effectuer des transferts hors de l’UE encadrés par les clauses contractuelles types de la Commission européenne.
          </p>
        ),
      },
      {
        heading: 'Vos droits',
        body: (
          <p>
            Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité. Pour les exercer : contact@paysapro-ai.fr. Vous pouvez
            également introduire une réclamation auprès de la CNIL (cnil.fr).
          </p>
        ),
      },
      {
        heading: 'Polices de caractères',
        body: <p>Les polices utilisées sont hébergées avec le site : aucune requête n’est envoyée à un service de polices tiers.</p>,
      },
    ],
  },
  cgu: {
    path: '/cgu',
    title: 'Conditions générales d’utilisation et de vente',
    updated: <>20 octobre 2026</>,
    sections: [
      {
        heading: 'Objet',
        body: (
          <p>
            Les présentes conditions encadrent l’utilisation du site et du service Paysapro AI, édité par ADDEG SAAS.
          </p>
        ),
      },
      {
        heading: 'Essai gratuit et abonnements',
        body: (
          <>
            <p>
              Chaque nouvelle entreprise bénéficie d’un essai gratuit de 15 jours, sans carte bancaire, avec toutes les fonctionnalités. Aucun abonnement n’est souscrit
              automatiquement : sans abonnement à la fin de l’essai, le compte passe en lecture seule (données consultables et exportables).
            </p>
            <p>
              Les offres et leurs prix hors taxes figurent sur la page Tarifs. L’abonnement est payable d’avance, au mois ou à l’année, par carte bancaire via Stripe ;
              il se renouvelle automatiquement et se résilie à tout moment depuis l’application, avec effet à la fin de la période payée. Toute évolution de prix est
              annoncée au moins 30 jours à l’avance. Le service est réservé aux professionnels.
            </p>
          </>
        ),
      },
      {
        heading: 'Responsabilité de l’utilisateur',
        body: (
          <p>
            Les suggestions de l’assistant IA sont indicatives. L’utilisateur reste seul responsable des dimensions, quantités, prestations, prix et du contenu des devis
            qu’il émet, ainsi que de leur conformité à ses obligations légales.
          </p>
        ),
      },
      {
        heading: 'Données',
        body: (
          <p>
            Les données saisies dans l’application (clients, chantiers, devis, photos) appartiennent à l’entreprise utilisatrice. Elles sont hébergées dans l’Union européenne (Supabase, Francfort), exportables à tout moment depuis l’application (Paramètres → Données) et supprimées avec le compte. Sans abonnement à l’issue de l’essai, elles restent consultables et exportables.
          </p>
        ),
      },
      {
        heading: 'Droit applicable',
        body: (
          <p>
            Les présentes conditions sont soumises au droit français. Le service est réservé aux professionnels : à défaut d’accord amiable, tout litige relève des tribunaux compétents du ressort du siège d’ADDEG SAAS.
          </p>
        ),
      },
    ],
  },
  cookies: {
    path: '/cookies',
    title: 'Politique cookies',
    updated: <>30 octobre 2026</>,
    sections: [
      {
        heading: 'Cookies utilisés',
        body: (
          <p>
            Ce site n’utilise pas de cookies publicitaires ni de traceurs soumis à consentement. C’est pourquoi aucun bandeau cookies ne vous est présenté.
          </p>
        ),
      },
      {
        heading: 'Mesure d’audience',
        body: (
          <p>
            Le site mesure sa fréquentation sans cookie : pages vues, site d’origine, type d’appareil et clics sur les boutons principaux. Une visite est identifiée par un
            numéro aléatoire conservé dans l’onglet du navigateur puis effacé à sa fermeture ; aucune adresse IP n’est enregistrée et les données ne servent qu’à des
            statistiques internes, conservées 13 mois. Ce dispositif est exempté de consentement selon les recommandations de la CNIL. Le signal « Do Not Track » ou
            « Global Privacy Control » de votre navigateur est respecté ; vous pouvez aussi désactiver la mesure sur votre appareil en ajoutant{' '}
            <code>?stats=off</code> à l’adresse d’une page du site.
          </p>
        ),
      },
      {
        heading: 'Évolutions',
        body: <p>Si des cookies nécessitant votre consentement étaient ajoutés, un bandeau vous permettrait de les accepter ou de les refuser aussi simplement.</p>,
      },
    ],
  },
};
