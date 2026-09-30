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
    updated: <Ph>[DATE DE MISE À JOUR]</Ph>,
    sections: [
      {
        heading: 'Éditeur du site',
        body: (
          <>
            <p>
              <Ph>[NOM DE L’ENTREPRISE]</Ph>, <Ph>[FORME JURIDIQUE]</Ph> au capital de <Ph>[CAPITAL]</Ph> €
            </p>
            <p>
              Siège social : <Ph>[ADRESSE]</Ph>
            </p>
            <p>
              SIRET : <Ph>[SIRET]</Ph> · RCS : <Ph>[VILLE RCS ET NUMÉRO]</Ph> · TVA intracommunautaire : <Ph>[NUMÉRO DE TVA]</Ph>
            </p>
            <p>
              Email : <Ph>[EMAIL]</Ph> · Téléphone : <Ph>[TÉLÉPHONE]</Ph>
            </p>
            <p>
              Directeur de la publication : <Ph>[NOM DU DIRECTEUR DE LA PUBLICATION]</Ph>
            </p>
          </>
        ),
      },
      {
        heading: 'Hébergement',
        body: (
          <p>
            Le site est hébergé par GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis (support.github.com). Les messages envoyés par les formulaires sont enregistrés chez Supabase.
          </p>
        ),
      },
      {
        heading: 'Propriété intellectuelle',
        body: (
          <p>
            L’ensemble des contenus de ce site (textes, interfaces, logo, illustrations) est la propriété de <Ph>[NOM DE L’ENTREPRISE]</Ph>, sauf mention contraire. Toute
            reproduction sans autorisation préalable est interdite.
          </p>
        ),
      },
      {
        heading: 'Contact',
        body: (
          <p>
            Pour toute question, vous pouvez utiliser la page Contact ou écrire à <Ph>[EMAIL]</Ph>.
          </p>
        ),
      },
    ],
  },
  confidentialite: {
    path: '/confidentialite',
    title: 'Politique de confidentialité',
    updated: <Ph>[DATE DE MISE À JOUR]</Ph>,
    sections: [
      {
        heading: 'Responsable du traitement',
        body: (
          <p>
            <Ph>[NOM DE L’ENTREPRISE]</Ph>, <Ph>[ADRESSE]</Ph>, joignable à <Ph>[EMAIL]</Ph>.
          </p>
        ),
      },
      {
        heading: 'Données collectées sur ce site',
        body: (
          <ul className="list-disc space-y-1 pl-5">
            <li>Formulaire de contact : nom, entreprise, email, téléphone (facultatif), type d’entreprise, nombre de salariés, message.</li>
            <li>Inscription aux nouveautés : adresse email et consentement.</li>
            <li>Aucune donnée n’est collectée à votre insu : le site ne dépose pas de cookie publicitaire.</li>
          </ul>
        ),
      },
      {
        heading: 'Finalités et bases légales',
        body: (
          <ul className="list-disc space-y-1 pl-5">
            <li>Répondre à vos demandes de contact (intérêt légitime / mesures précontractuelles).</li>
            <li>Vous envoyer les nouveautés Paysapro AI (consentement, retirable à tout moment).</li>
          </ul>
        ),
      },
      {
        heading: 'Durée de conservation',
        body: (
          <p>
            <Ph>[DURÉES DE CONSERVATION À DÉFINIR — ex. demandes de contact, liste de diffusion]</Ph>
          </p>
        ),
      },
      {
        heading: 'Destinataires et sous-traitants',
        body: (
          <p>
            Les données sont destinées à <Ph>[NOM DE L’ENTREPRISE]</Ph>. Sous-traitants techniques : GitHub, Inc. (hébergement du site, qui peut enregistrer des journaux techniques comme l’adresse IP) et Supabase (enregistrement des messages de contact et des inscriptions aux nouveautés). Aucun outil de mesure d’audience n’est actif à ce jour.{' '}
            <Ph>[PRÉCISER LA RÉGION D’HÉBERGEMENT SUPABASE ET LES GARANTIES POUR LES TRANSFERTS HORS UE]</Ph>
          </p>
        ),
      },
      {
        heading: 'Vos droits',
        body: (
          <p>
            Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité. Pour les exercer : <Ph>[EMAIL]</Ph>. Vous pouvez
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
    title: 'Conditions générales d’utilisation',
    updated: <Ph>[DATE DE MISE À JOUR]</Ph>,
    sections: [
      {
        heading: 'Objet',
        body: (
          <p>
            Les présentes conditions encadrent l’utilisation du site et du service Paysapro AI, édité par <Ph>[NOM DE L’ENTREPRISE]</Ph>.
          </p>
        ),
      },
      {
        heading: 'Phase bêta',
        body: (
          <p>
            Le service est actuellement proposé en version bêta, gratuitement. Des fonctionnalités peuvent évoluer, être ajoutées ou retirées. Les conditions tarifaires
            pourront évoluer après la période bêta ; les utilisateurs concernés seront informés avant toute évolution payante.
          </p>
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
            <Ph>[CONDITIONS DE TRAITEMENT DES DONNÉES DU SERVICE — HÉBERGEMENT, SAUVEGARDES, EXPORT, SUPPRESSION]</Ph>
          </p>
        ),
      },
      {
        heading: 'Droit applicable',
        body: (
          <p>
            <Ph>[DROIT APPLICABLE ET JURIDICTION COMPÉTENTE]</Ph>
          </p>
        ),
      },
    ],
  },
  cookies: {
    path: '/cookies',
    title: 'Politique cookies',
    updated: <Ph>[DATE DE MISE À JOUR]</Ph>,
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
            Aucune mesure d’audience n’est active à ce jour. Si elle était activée, elle utiliserait un outil sans cookie qui ne permet pas de vous identifier.
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
