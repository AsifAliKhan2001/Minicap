module.exports = {
    preset: "jest-expo",
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
    reporters: [
      "default",
      ["jest-junit", { outputDirectory: "./test-results", outputName: "junit.xml" }]
    ]
  };
  