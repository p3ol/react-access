const path = require('node:path');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  fakeTimers: {
    enableGlobally: false,
  },
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'index.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^~tests-utils$': path.resolve(__dirname, 'tests/utils.js'),
  },
};
