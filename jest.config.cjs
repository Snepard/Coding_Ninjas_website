/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(framer-motion|motion)/)",
  ],
};

module.exports = config;

