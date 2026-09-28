import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Base : '/' sur un domaine (www.paysapro.ai, Vercel) ; '/paysapro-site/' sur GitHub Pages (VITE_BASE_PATH).
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env };
  if (mode === 'production' && !env.VITE_APP_URL) {
    console.warn('\n⚠  VITE_APP_URL n’est pas défini : les boutons « Essayer » renverront vers /contact. Voir .env.example.\n');
  }
  const base = ('/' + (env.VITE_BASE_PATH || '/').replace(/^\/+|\/+$/g, '') + '/').replace('//', '/');

  return {
    base,
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2022',
      cssCodeSplit: true,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/**/*.test.{ts,tsx}'],
      env: {
        VITE_APP_URL: 'https://app.example.test',
        VITE_APP_SIGNUP_PATH: '/inscription',
        VITE_APP_LOGIN_PATH: '/connexion',
        VITE_SITE_URL: 'https://www.example.test',
      },
    },
  };
});
