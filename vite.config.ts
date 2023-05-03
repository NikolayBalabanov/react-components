/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import istanbul from 'vite-plugin-istanbul';

export const pathResolver = (pathStr: string) => {
  return resolve(__dirname, '.', pathStr);
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathResolver('./src'),
    },
  },
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  build: {
    sourcemap: 'hidden',
  },
  server: {
    open: true,
  },
  css: {
    devSourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'c8',
      exclude: [
        'vite-env.d.ts',
        'src/main.tsx',
        'postcss.config.cjs',
        'tailwind.config.cjs',
        'vite.config.ts',
      ],
      skipFull: false,
      reporter: 'text',
      include: ['**/*.{jsx,tsx}'],
    },
  },
});
