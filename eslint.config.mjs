import { defineConfig } from 'eslint/config';
import pooolint from '@poool/eslint-config-react';
import globals from 'globals';

export default defineConfig(
  { ignores: [
    'dist',
    '**/dist',
    'coverage',
    '.yarn',
    'node_modules',
    'examples/next/.next/**',
  ] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
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
  ...pooolint.configs.recommended,
);
