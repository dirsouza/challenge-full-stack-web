export default {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['jest-expect-message', '<rootDir>/tests/unit/base-test.ts'],
  transform: {
    '^.+\\.vue$': require.resolve('vue-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': require.resolve('jest-transform-stub'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/tests/unit/$1',
    'App/(.*)$': '<rootDir>/src/app/$1',
    'Domain/(.*)$': '<rootDir>/src/domains/$1',
    'Support/(.*)$': '<rootDir>/src/support/$1',
  },
  collectCoverage: true,
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{(j|t)s),vue}',
    '!**/node_modules/**',
    '!<rootDir>/src/main.(j|t)s',
    '!<rootDir>/src/App.vue',
    '!<rootDir>/src/support/enums/**/*.(j|t)s',
  ],
};
