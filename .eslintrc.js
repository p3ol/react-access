module.exports = {
  extends: '@poool/eslint-config-react',
  rules: {
    'react/prop-types': 0,
  },
  overrides: [{
    files: ['tests/**/*.test.js'],
    env: {
      jest: true,
    },
  }],
};
