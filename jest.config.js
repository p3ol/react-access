module.exports = {
  clearMocks: true,
  collectCoverage: true,
  timers: 'real',
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'index.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
