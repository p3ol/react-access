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
    '^.+\\.[j|t]sx?$': ['@swc/jest', {
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
      },
    }],
  },
  moduleNameMapper: {
    '^~(.+)': '<rootDir>/$1',
  },
};

export default config;
