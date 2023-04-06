const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jest-environment-jsdom", // Change this to 'jest-environment-jsdom' instead of 'node'
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/$1", // Map @/* to your source directory
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Handle styles
//   },
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use Babel for transforming files
//   },
// };
