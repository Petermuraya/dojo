import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dojo/',
  plugins: [
    react(),
    imagetools(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
