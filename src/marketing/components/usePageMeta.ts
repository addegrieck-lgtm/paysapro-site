import { useEffect } from 'react';
import pages from '../config/pages.json';
import { SITE } from '../config/marketing';

type PageMeta = { title: string; description: string };
const PAGES = pages as Record<string, PageMeta & { priority: string; noindex?: boolean }>;

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Met à jour title / description / canonical / OpenGraph à la navigation.
 * Le HTML initial de chaque page est déjà correct grâce à scripts/postbuild.mjs.
 */
export function usePageMeta(path: string, override?: Partial<PageMeta> & { noindex?: boolean }) {
  const title = override?.title ?? PAGES[path]?.title ?? PAGES['/']!.title;
  const description = override?.description ?? PAGES[path]?.description ?? PAGES['/']!.description;
  const noindex = override?.noindex ?? PAGES[path]?.noindex ?? false;

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    if (SITE.url) {
      const url = SITE.url + (path === '/' ? '/' : path);
      setMeta('link[rel="canonical"]', 'href', url);
      setMeta('meta[property="og:url"]', 'content', url);
    }
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow');
  }, [title, description, path, noindex]);
}
