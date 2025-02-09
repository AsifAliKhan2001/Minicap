module.exports = {
  preset: "jest-expo",
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["text", "lcov", "text-summary"],
  transformIgnorePatterns: [
    "node_modules/(?!react-native|react-navigation|@react-native|expo|@expo|@unimodules|@react-navigation|@react-native-community|@gluestack-ui)"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
};