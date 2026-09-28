import { describe, expect, it } from 'vitest';
import axe from 'axe-core';
import { PAGES, renderPage } from './utils';

// Contrôles automatiques d'accessibilité (axe-core). Le contraste n'est pas mesurable dans jsdom :
// il a été vérifié à la conception (palette) et doit l'être au navigateur (Lighthouse).
describe('accessibilité de base (axe)', () => {
  it.each(PAGES)('%s : aucune violation critique ou sérieuse', async (path) => {
    const { container } = await renderPage(path);
    const res = await axe.run(container.ownerDocument.body, {
      rules: { 'color-contrast': { enabled: false } },
      resultTypes: ['violations'],
    });
    const serious = res.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
    const report = serious.map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join('\n  ')}`).join('\n');
    expect(serious, report).toHaveLength(0);
  }, 20_000);

  it('les images ont un texte alternatif et les boutons un nom', async () => {
    const { container } = await renderPage('/');
    for (const img of container.ownerDocument.querySelectorAll('img')) expect(img.hasAttribute('alt')).toBe(true);
    for (const b of container.ownerDocument.querySelectorAll('button')) {
      expect((b.getAttribute('aria-label') || b.textContent || '').trim().length, b.outerHTML.slice(0, 80)).toBeGreaterThan(0);
    }
  });
});
