// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

/**
 * GitHub Pages serve o site em subdiretório (https://<user>.github.io/njal-brasil/).
 * O workflow de deploy exporta BASE_PATH=/njal-brasil; local roda na raiz.
 */
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://viniciusextremxd.github.io',
  base,
  /* Porta do dev server: respeita PORT (preview do app) e cai em 4321 fora dele. */
  server: { port: Number(process.env.PORT) || 4321 },
  trailingSlash: 'ignore',
  compressHTML: true,
  build: { assets: '_astro', inlineStylesheets: 'auto' },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Tektur',
      cssVariable: '--font-display',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      display: 'swap',
      fallbacks: ['Impact', 'Arial Narrow', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Comfortaa',
      cssVariable: '--font-body',
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      display: 'swap',
      fallbacks: ['Nunito', 'Segoe UI', 'system-ui', 'sans-serif'],
    },
  ],
});
