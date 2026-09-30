import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pages from '../src/marketing/config/pages.json';
import { LANDINGS } from '../src/marketing/data/landings';
import { TOOLS } from '../src/marketing/data/tools';
import { computeFence, computeSurface, computeVolume, parseNumber } from '../src/marketing/components/tools/Calculators';
import { renderPage } from './utils';

const entries = Object.entries(pages as Record<string, { title: string; description: string; noindex?: boolean }>);

describe('balises SEO', () => {
  it('titres uniques, de longueur raisonnable, avec la marque', () => {
    const titles = entries.map(([, p]) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const [path, p] of entries) {
      expect(p.title.length, `${path} : ${p.title}`).toBeLessThanOrEqual(65);
      expect(p.title, path).toContain('Paysapro AI');
    }
  });

  it('descriptions uniques, entre 50 et 165 caractères pour les pages indexées', () => {
    const descs = entries.map(([, p]) => p.description);
    expect(new Set(descs).size).toBe(descs.length);
    for (const [path, p] of entries.filter(([, p]) => !p.noindex)) {
      expect(p.description.length, `${path} (${p.description.length})`).toBeGreaterThanOrEqual(50);
      expect(p.description.length, `${path} (${p.description.length})`).toBeLessThanOrEqual(165);
    }
  });

  it('chaque page d’atterrissage et chaque outil a ses balises', () => {
    for (const l of LANDINGS) expect(pages, l.path).toHaveProperty([l.path]);
    for (const t of TOOLS) expect(pages, t.path).toHaveProperty([t.path]);
  });

  it('le h1 de l’accueil contient l’expression principale', async () => {
    const { h1 } = await renderPage('/');
    expect(h1).toHaveTextContent(/Logiciel de devis pour paysagistes/);
  });

  it('les pages d’atterrissage ont des contenus distincts', () => {
    const intros = LANDINGS.map((l) => l.intro);
    const h1s = LANDINGS.map((l) => l.h1);
    expect(new Set(intros).size).toBe(LANDINGS.length);
    expect(new Set(h1s).size).toBe(LANDINGS.length);
    for (const l of LANDINGS) expect(l.sections.length, l.path).toBeGreaterThanOrEqual(4);
  });
});

describe('calculateurs', () => {
  it('accepte la virgule et ignore les valeurs invalides', () => {
    expect(parseNumber('2,5')).toBe(2.5);
    expect(parseNumber(' 1 200 ')).toBe(1200);
    expect(parseNumber('abc')).toBe(0);
    expect(parseNumber('-3')).toBe(0);
  });

  it('surface', () => {
    expect(computeSurface('rectangle', 4, 3)).toBe(12);
    expect(computeSurface('l', 5, 3, 2, 2)).toBe(19);
    expect(computeSurface('triangle', 6, 4)).toBe(12);
    expect(computeSurface('cercle', 2, 0)).toBeCloseTo(12.566, 3);
  });

  it('volume et poids', () => {
    const r = computeVolume(48, 10, 1.5);
    expect(r.volume).toBeCloseTo(4.8, 6);
    expect(r.tonnes).toBeCloseTo(7.2, 6);
  });

  it('clôture : poteaux = intervalles + 1, sans erreur d’arrondi', () => {
    expect(computeFence(22, 2.5)).toEqual({ net: 22, panels: 9, posts: 10 });
    expect(computeFence(20, 2.5)).toEqual({ net: 20, panels: 8, posts: 9 });
    expect(computeFence(22, 2.5, 4)).toEqual({ net: 18, panels: 8, posts: 9 });
    expect(computeFence(0, 2.5)).toEqual({ net: 0, panels: 0, posts: 0 });
  });

  it('le calculateur de surface se met à jour à la saisie', async () => {
    const user = userEvent.setup();
    await renderPage('/outils/calcul-surface');
    expect(screen.getByRole('status')).toHaveTextContent('12 m²');
    const longueur = screen.getByLabelText(/Longueur/);
    await user.clear(longueur);
    await user.type(longueur, '5,5');
    expect(screen.getByRole('status')).toHaveTextContent('16,5 m²');
    expect(screen.getByRole('status')).toHaveTextContent('18,15 m²');
  });
});
