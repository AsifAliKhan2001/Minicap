CI & CD Github Actions
We will use CodeCov, SonarQcube, SuperLinter, and Node.js project workflows for CI/CD.


6.1 Unit Testing (Hudson)
For unit testing, we will be using Jest with React Testing Library as React Native comes with built-in support for Jest. React Testing Library will be used in tests to render React Native components, querying elements, and simulating user interactions. Tests will include assertions, snapshot testing, and mocking functions, database queries, modules, API calls, and dependencies. We will be using these tools to test React components, API calls, functions, and navigation. 

We will also be using diverse testing techniques like IDM, Graph, Logic Coverage, and Jest.

For Sprint 1, we have no unit test written yet as we have not started working on the feature implementation yet. We will use mocking to simulate real dependencies, define controlled outputs, and verify interactions with native modules to effectively isolate unit tests. This ensures that our components and business logic are tested independently, without relying on external systems like databases, APIs, or device-specific features.


Ressources
https://testing-library.com/docs/react-testing-library/intro/
https://jestjs.io/docs/getting-started

6.2 Test Coverage
CodeCov is a tool used to provide code coverage insights.
https://github.com/apps/codecov
https://docs.codecov.com/docs/quick-start
https://docs.codecov.com/docs/github-tutorial
CodeCov – admin rights


System Testing 
For system testing, we will use Appium, a widely-used, open-source automation framework specifically designed for testing mobile applications. Appium is an ideal choice for our project because it supports cross-platform testing (iOS and Android) and integrates seamlessly with React Native applications. Its ability to interact directly with native components ensures that we can test all aspects of the app’s functionality, regardless of the platform.  
