import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  esbuild: {
    drop: ['console', 'debugger'],
    pure: ['process.env.NODE_ENV'],
    legalComments: 'none',
  }
})
