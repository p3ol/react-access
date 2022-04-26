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
  transformIgnorePatterns: [
    'node_modules/(?!(rxjs)/)',
  ],
};
