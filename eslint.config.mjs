import tseslint from 'typescript-eslint';
import pooolint from '@poool/eslint-config-react';
import globals from 'globals';

export default tseslint.config(
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
  },
  ...pooolint.configs.recommended,
);
