import type {Config} from 'jest';

const config: Config = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/[\\w/]*test/_[a-zA-Z]+\\.ts',
    '<rootDir>/[\\w/]*/types\\.ts',
    '<rootDir>/[\\w/]*__testing/',
    '<rootDir>/node_modules/'
  ],
  coverageReporters: ['text'],
  maxWorkers: '50%',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/test/_setup.ts'],
  testEnvironment: 'jsdom',
  testRegex: '(\\.|/)(test|spec)\\.[jt]sx?$'
};

export default config;
