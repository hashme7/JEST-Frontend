export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  // Fixed: moduleNameMapping should be moduleNameMapper
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/main.tsx',
    '!src/index.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  // Added to handle ES modules
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // Added to handle TypeScript files properly
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // Added for better error messages
  verbose: true
};