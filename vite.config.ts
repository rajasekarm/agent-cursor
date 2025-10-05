import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/agent-cursor/demo/',
  root: 'demo',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
