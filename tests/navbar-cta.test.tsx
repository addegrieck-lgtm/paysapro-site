import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LOGIN, SIGNUP, renderAt, renderPage } from './utils';
import { APP_LINKS } from '../src/marketing/config/marketing';

describe('Navbar', () => {
  it('affiche la navigation principale', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' });
    for (const label of ['Fonctionnalités', 'Comment ça marche', 'Pour qui ?', 'Tarifs', 'FAQ']) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('ouvre et ferme le menu mobile (aria-expanded, Échap)', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const btn = screen.getByRole('button', { name: 'Ouvrir le menu' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    await user.click(btn);
    expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Navigation mobile' })).toBeVisible();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('« Se connecter » pointe vers l’application et est suivi', async () => {
    const user = userEvent.setup();
    const { track } = renderAt('/');
    const login = screen.getAllByRole('link', { name: 'Se connecter' })[0]!;
    expect(login).toHaveAttribute('href', LOGIN);
    login.addEventListener('click', (e) => e.preventDefault());
    await user.click(login);
    expect(track).toHaveBeenCalledWith('app_login_clicked', { location: 'navbar' });
  });
});

describe('CTA vers l’application', () => {
  it('les URL viennent de VITE_APP_URL (+ chemins configurés)', () => {
    expect(APP_LINKS.configured).toBe(true);
    expect(APP_LINKS.signup).toBe(SIGNUP);
    expect(APP_LINKS.login).toBe(LOGIN);
  });

  it('tous les CTA d’inscription de l’accueil pointent vers l’inscription', () => {
    renderAt('/');
    const ctas = screen.getAllByRole('link', { name: /essayer|rejoindre la bêta|commencer gratuitement|tester paysapro/i });
    expect(ctas.length).toBeGreaterThanOrEqual(6);
    for (const a of ctas) expect(a).toHaveAttribute('href', SIGNUP);
  });

  it('le CTA du hero envoie hero_cta_clicked et signup_clicked', async () => {
    const user = userEvent.setup();
    const { track } = renderAt('/');
    const hero = screen.getAllByRole('link', { name: /Essayer gratuitement/ }).find((a) => a.closest('section[aria-labelledby="hero-title"]'))!;
    hero.addEventListener('click', (e) => e.preventDefault());
    await user.click(hero);
    expect(track).toHaveBeenCalledWith('hero_cta_clicked', { location: 'hero' });
    expect(track).toHaveBeenCalledWith('signup_clicked', { location: 'hero' });
  });

  it('le bouton démo est masqué tant que VITE_ENABLE_DEMO_CTA n’est pas activé', () => {
    renderAt('/');
    expect(screen.queryByRole('link', { name: /démonstration/i })).not.toBeInTheDocument();
  });

  it('la démo interactive change d’écran au clic et au clavier', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(5);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await user.click(tabs[3]!);
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'demo-tab-devis');
    await user.keyboard('{ArrowRight}');
    expect(tabs[4]).toHaveAttribute('aria-selected', 'true');
  });

  it('la page Fonctionnalités a un CTA par fonctionnalité', async () => {
    await renderPage('/fonctionnalites');
    const links = screen.getAllByRole('link', { name: 'Essayer cette fonctionnalité' });
    expect(links.length).toBe(11);
    for (const a of links) expect(a).toHaveAttribute('href', SIGNUP);
  });
});
