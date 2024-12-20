export default {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while
  // executing the test
  collectCoverage: false,
  // An array of glob patterns indicating a set of files for which coverage
  // information should be collected
  collectCoverageFrom: [
    "!src/**/*.tsx",
    "!**/*.d.ts",
    "!**/*.stories.{ts,tsx}",
    "!**/node_modules/**",
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__tests__/fileMock.ts",
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "/lib",
    "/dist",
    "<rootDir>/src/__tests__/setup.ts",
    "<rootDir>/src/__tests__/fileMock.ts",
    "<rootDir>/src/__tests__/mediaMatchMock.ts",
  ],
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    "./node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
