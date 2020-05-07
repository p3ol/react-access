module.exports = {
  'preset': 'jest-puppeteer',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  'setupFilesAfterEnv': [
    '<rootDir>/tests/config/enzyme.js',
    //'<rootDir>/tests/config/crypto.js',
    //'<rootDir>/tests/config/script.js',
  ],
};
