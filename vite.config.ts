import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
const { visualizer } = require('rollup-plugin-visualizer');

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 8080,
    open: true,
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    VitePWA({
      srcDir: 'src',
      filename: 'service-worker.js',
      strategies: 'injectManifest',
      injectRegister: false,
      devOptions: {
        enabled: true,
      },
      manifest: false,
      injectManifest: {
        injectionPoint: undefined,
      },
    }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, './src/'),
    },
  },
  build: {
    rollupOptions: {
      cache: true,
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      plugins: [visualizer()],
      output: {
        manualChunks(id) {
          if (id.includes('@mui')) {
            return 'mui';
          }
          if (id.includes('lodash')) {
            return 'lodash';
          }
          if (id.includes('date-fns') || id.includes('moment') || id.includes('dayjs')) {
            return 'date-time';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {},
});
