import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Polices auto-hébergées : aucune requête vers un service tiers (RGPD), chargement rapide.
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/manrope/wght.css';
import './index.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
