module.exports = {
  extends: '@poool/eslint-config-react',
  rules: {
    'react/react-in-jsx-scope': 0,
  },
  overrides: [{
    files: ['src/**/*.test.js'],
    env: {
      jest: true,
    },
  }, {
    files: ['src/**/*.{ts,tsx}'],
    extends: ['plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    globals: {
      JSX: 'readonly',
      React: 'readonly',
    },
    rules: {
      // function params are considered as unused vars
      // 'no-unused-vars': 0,
      '@typescript-eslint/no-explicit-any': 0,
    },
  }],
};
