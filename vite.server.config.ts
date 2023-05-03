import { defineConfig } from 'vite';
import baseConfig, { pathResolver } from './vite.config';

// https://vitejs.dev/config/
export default defineConfig({
  ...baseConfig,
  build: {
    outDir: 'dist/server',
    ssr: pathResolver('./src/mainServer.tsx'),
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
