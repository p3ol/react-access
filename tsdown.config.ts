import { defineConfig } from 'tsdown';

import pkg from './package.json' with { type: 'json' };

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    outDir: 'dist',
    target: pkg.targets,
    format: ['cjs', 'esm'],
    external: ['react', 'react-dom'],
    sourcemap: true,
    dts: false,
  },
]);
