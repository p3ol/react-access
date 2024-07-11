module.exports = {
  extends: [
    '@poool/eslint-config-react',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
  overrides: [{
    files: ['src/**/*.test.{ts,tsx}'],
    env: {
      jest: true,
    },
  }],
};
