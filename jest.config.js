// jest.config.js
export default {
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "__tests__/coverage/",
    "__tests__/server/",
  ],
  globalSetup: "./__tests__/server/setup.js",
  globalTeardown: "./__tests__/server/teardown.js",
  testTimeout: 5000,
};
