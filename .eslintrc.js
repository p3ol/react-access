module.exports = {
  extends: '@poool/eslint-config-react',
  rules: {
    'react/react-in-jsx-scope': 0,
  },
  overrides: [{
    files: ['tests/**/*.test.js'],
    env: {
      jest: true,
    },
  }],
};
