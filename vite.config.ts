import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A base muda conforme o destino:
//  - dev e preview local  -> "/"
//  - GitHub Pages (projeto) -> "/<nome-do-repo>/" via VITE_BASE
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
});
