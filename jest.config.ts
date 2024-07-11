import path from 'node:path';

import type { Config } from 'jest';

const config: Config = {
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
    '^.+\\.[j|t]sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^~tests-utils$': path.resolve(__dirname, 'tests/utils.js'),
  },
};

export default config;
