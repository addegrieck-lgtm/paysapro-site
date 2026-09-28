import { useEffect, useId, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { MAIN_NAV } from '../data/navigation';
import { APP_LINKS } from '../config/marketing';
import { useAnalytics } from '../analytics/AnalyticsProvider';
import { AppCta } from './AppLink';
import { Logo } from './Logo';
import { Container } from './ui';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const { trackEvent } = useAnalytics();
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer le menu à chaque navigation
  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const loginClick = () => trackEvent('app_login_clicked', { location: 'navbar' });
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-2.5 py-2 text-[0.93rem] font-medium whitespace-nowrap transition-colors xl:px-3 ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open ? 'bg-cream/85 shadow-[0_1px_0_rgb(23_33_28/0.08)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link to="/" className="shrink-0 rounded-lg" aria-label="Paysapro AI — accueil">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                {item.to.includes('#') ? (
                  <Link to={item.to} className={linkCls({ isActive: false })}>
                    {item.label}
                  </Link>
                ) : (
                  <NavLink to={item.to} className={linkCls}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={APP_LINKS.login} onClick={loginClick} className="hidden rounded-full px-4 py-2 text-[0.93rem] font-semibold whitespace-nowrap text-ink hover:bg-ink/5 xl:inline-flex">
            Se connecter
          </a>
          <span className="hidden sm:contents">
            <AppCta location="navbar" size="md" arrow={false} className="whitespace-nowrap">
              Essayer gratuitement
            </AppCta>
          </span>
          <span className="contents sm:hidden">
            <AppCta location="navbar_mobile" size="md" arrow={false} className="!min-h-10 !px-4">
              Essayer
            </AppCta>
          </span>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      <div id={menuId} hidden={!open} className="xl:hidden">
        <nav aria-label="Navigation mobile" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-cream">
          <Container className="flex flex-col gap-1 py-6">
            {MAIN_NAV.map((item) => (
              <Link key={item.to} to={item.to} className="rounded-2xl px-4 py-4 font-display text-2xl font-bold text-ink hover:bg-white">
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
              <AppCta location="navbar_menu" className="w-full">
                Essayer gratuitement
              </AppCta>
              <a
                href={APP_LINKS.login}
                onClick={loginClick}
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-white font-semibold text-ink ring-1 ring-line"
              >
                Se connecter
              </a>
            </div>
          </Container>
        </nav>
      </div>
    </header>
  );
}
