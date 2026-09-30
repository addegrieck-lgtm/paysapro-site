import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Polices auto-hébergées : aucune requête vers un service tiers (RGPD), chargement rapide.
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/manrope/wght.css';
import './index.css';
import { App } from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production : le HTML est pré-rendu au build (SEO) → on l'hydrate. Développement : rendu client simple.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
