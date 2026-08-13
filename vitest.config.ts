import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    projects: [{
      extends: true,
      test: {
        name: 'e2e',
        include: ['src/**/*.e2e.test.ts', 'src/**/*.e2e.test.tsx'],
        environment: 'node',
      },
    }, {
      extends: true,
      test: {
        name: 'unit',
        include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
        exclude: ['node_modules', 'src/**/*.e2e.test.ts', 'src/**/*.e2e.test.tsx'],
        environment: 'jsdom',
      },
    }]
  },
  resolve: {
    alias: {
      '~': path.resolve('./'),
    },
  },
});
