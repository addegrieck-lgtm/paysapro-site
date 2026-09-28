/**
 * Architecture de consentement.
 * Aujourd'hui : aucun outil n'utilise de cookie non essentiel → pas de bandeau (CNIL : inutile).
 * Si un jour un adaptateur avec requiresConsent = true est ajouté :
 *  1. afficher un bandeau (Accepter / Refuser, même niveau de visibilité) ;
 *  2. enregistrer le choix via setConsent ;
 *  3. AnalyticsProvider n'initialise l'outil que si hasConsent() est vrai.
 */
const KEY = 'paysapro-consent';

export type ConsentState = 'granted' | 'denied' | 'unknown';

export function getConsent(): ConsentState {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function setConsent(value: Exclude<ConsentState, 'unknown'>) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* stockage indisponible : le choix vaut pour la session */
  }
}

export function hasConsent(): boolean {
  return getConsent() === 'granted';
}
