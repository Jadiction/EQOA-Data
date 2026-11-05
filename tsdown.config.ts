import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'esnext',
  outDir: 'dist',
  dts: true,
  clean: true,
  outExtensions: () => ({ js: '.mjs', dts: '.d.ts' }),
});