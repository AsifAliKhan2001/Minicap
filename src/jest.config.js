module.exports = {
    preset: "jest-expo",
    collectCoverage: true,
    coverageDirectory: "coverage",
    testPathIgnorePatterns: ["/node_modules/"], // Make sure `app/` is not ignored
    coverageReporters: ["text", "lcov", "text-summary"],
    reporters: [
      "default",
      ["jest-junit", { outputDirectory: "./test-results", outputName: "junit.xml" }]
    ]
  };
  