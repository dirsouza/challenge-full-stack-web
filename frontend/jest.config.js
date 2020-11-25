module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!vee-validate/dist/rules|vue-sweetalert2/)'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/base-test.ts'],
  transform: {
    '^.+\\.vue$': require.resolve('vue-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': require.resolve('jest-transform-stub'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
    'vee-validate/dist/rules': require.resolve('babel-jest'),
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.{js,vue}',
  ],
};
