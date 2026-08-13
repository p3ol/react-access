import { defineConfig, globalIgnores } from 'eslint/config';
import pooolint from '@poool/eslint-config-react';

export default defineConfig(
  globalIgnores([
    'dist',
    '**/dist',
    'coverage',
    '.yarn',
    'node_modules',
    'examples/next/.next/**',
    'examples/next/next-env.d.ts',
  ]),
  {
    languageOptions: {
      globals: {
        globalThis: 'readonly',
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pooolint.configs.recommended,
);
