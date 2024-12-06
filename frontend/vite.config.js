import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // This disables the use of eval during minification
    legalComments: 'none',
    // You can also try using different target options like es2015
    target: 'es2015',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
