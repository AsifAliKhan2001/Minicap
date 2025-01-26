# CI & CD with GitHub Actions

We will use **CodeCov**, **SonarQube**, **SuperLinter**, and **Node.js project workflows** for CI/CD.

---

## 6.1 Unit Testing

For unit testing, we will use **Jest** with **React Testing Library**, as React Native comes with built-in support for Jest. React Testing Library will be used in tests to:

- Render React Native components
- Query elements
- Simulate user interactions

Tests will include:
- Assertions
- Snapshot testing
- Mocking (functions, database queries, modules, API calls, and dependencies)

We will use these tools to test:
- React components
- API calls
- Functions
- Navigation

Additionally, we will apply diverse testing techniques such as **IDM**, **Graph**, **Logic Coverage**, and **Jest**.

For **Sprint 1**, no unit tests have been written yet since we have not started feature implementation. We will use **mocking** to:
- Simulate real dependencies
- Define controlled outputs
- Verify interactions with native modules

This approach ensures that components and business logic are tested independently, without relying on external systems like databases, APIs, or device-specific features.

### 📚 Resources
- [React Testing Library - Introduction](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest - Getting Started](https://jestjs.io/docs/getting-started)

---

## 6.2 Test Coverage

**CodeCov** will be used to provide code coverage insights.

📌 **Resources:**
- [GitHub CodeCov App](https://github.com/apps/codecov)
- [CodeCov Quick Start Guide](https://docs.codecov.com/docs/quick-start)
- [GitHub Tutorial for CodeCov](https://docs.codecov.com/docs/github-tutorial)

**Note:** CodeCov requires **admin rights** for setup.

---

## 6.4 System Testing

For system testing, we will use **Appium**, a widely-used, open-source automation framework specifically designed for testing mobile applications.

### **Why Appium?**
- Supports **cross-platform testing** (iOS and Android)
- Integrates seamlessly with **React Native**
- Can interact directly with **native components**
- Ensures comprehensive functionality testing across platforms



