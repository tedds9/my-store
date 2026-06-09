import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
    jpeg: { quality: 75 },
    webp: { quality: 80 }
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comment: false
      }
    }
  }
})
