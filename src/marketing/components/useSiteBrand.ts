import { useLocation } from 'react-router';
import { landingByPath } from '../data/landings';

/** Paysapro sur tout le site, Batipro AI sur les pages des artisans du BTP (landings `metier: 'btp'`). */
export type SiteBrand = 'paysapro' | 'batipro';

export function brandOfPath(pathname: string): SiteBrand {
  return landingByPath(pathname.replace(/\/+$/, '') || '/')?.metier === 'btp' ? 'batipro' : 'paysapro';
}

export function useSiteBrand(): SiteBrand {
  return brandOfPath(useLocation().pathname);
}
