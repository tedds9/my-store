import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 75 },
      jpeg: { quality: 75 },
      jpg: { quality: 70 },
      png: { quality: 75 },
      webp: { quality: 70 },
      avif: { quality: 75 }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    minify: true
  }
})
