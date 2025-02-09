module.exports = {
  preset: "jest-expo",
  collectCoverage: true,
  coverageDirectory: "src/coverage",
  coverageReporters: ["text", "lcov", "text-summary", "clover", "json"],
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "src/test-results", outputName: "junit.xml" }]
  ],
};
