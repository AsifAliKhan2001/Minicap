# QA Test Procedures

## Introduction

This document outlines the test procedures for the Quality Assurance (QA) team, integrated within the 28-day release cycle. QA activities are structured in three phases, ensuring comprehensive testing throughout the development process.  Refer to the main "Team Work Procedures" document for the overall project workflow.

## QA Phases

* **Phase 1: Test Planning & Preparation (6 Days - Before Coding)**

  * **Timeline:** Days 1-6 of the 28-day release cycle (overlapping with Design Phase and early Code Phase of Sprint 1).
  * **Activities:**
    * Write system tests (automated, to run on `main` branch and ideally for pre-commit hooks on feature branches in future releases).
    * Write automated tests where possible based on user stories and finalized initial code structure.
    * Prepare unit test frameworks and structures in anticipation of development.
    * Review user stories and initial code to understand testing requirements.
* **Phase 2: Unit & Integration Testing (19 Days - During Coding)**

  * **Timeline:** Days 7-25 of the 28-day release cycle (spanning the majority of Code Phase in Sprint 1 and Sprint 2).
  * **Workflow:**
    1. **PR Opened & Moved to "Review/QA":** Developer completes a task, opens a Pull Request (PR) on GitHub, and moves the corresponding task to the `Review/QA` pipeline in Zenhub.
    2. **QA Test Issue Creation and Workflow:** Once a Pull Request (PR) is opened and moved to the `Review/QA` pipeline, the Scrum Master will create a dedicated *QA testing issue*.  This is done by generating a *sub-issue* under the original development task within Zenhub, and labeling it "Test - {original issue name}". This "Test" issue becomes available in the `Sprint Backlog` pipeline, signaling to the QA team that they can start testing the code in the PR.  The QA team will then proceed with testing.  If tests pass, QA will submit a Pull Request containing their test code and GIFs demonstrating successful test results. Conversely, if tests fail or bugs are identified, QA will open a new bug issue to document their findings.
    3. **QA Testing on Sub-Issue:** QA team members take ownership of the sub-issue and perform the following:
       * **Run Unit Tests:** Execute the unit tests written by developers on the PR branch.
       * **Perform System Tests:** Run automated system tests (and manual system tests as needed).
       * **Code Review (Optional):**  Review code changes in the PR for potential quality or testing concerns.
    4. **QA Decision and Actions:** Based on test results:
       * **Tests Pass:** If unit tests and system tests pass, and no critical issues are found, QA will:
         * **Close the QA sub-issue** in Zenhub, indicating testing completion.
         * **Approve the Pull Request** on GitHub, signaling that the code is ready to be merged.
       * **Tests Fail or Bugs Found:** If unit tests or system tests fail, or if QA identifies bugs, QA will:
         * **Open a Bug Report:** Create a new issue in the `Sprint Backlog` pipeline in Zenhub, detailing the bug, steps to reproduce, and failure information.
         * **Reject/Request Changes to the Pull Request:**  Communicate to the developer via the PR comments the reasons for rejection or requested changes.  The PR remains open for developer updates.
* **Phase 3: Quality Reporting (3 Days - Release Preparation)**

  * **Timeline:** Days 25-27 of the 28-day release cycle (Report Phase at the end of Sprint 2).
  * **Activities:**
    * Generate quality reports for the release presentation.
    * Reports should include metrics from SonarQube and CodeCov, summarizing code quality, test coverage, and identified issues.
    * Compile a summary of testing activities and overall quality assessment for the release.

## CI & CD - GitHub Actions

We utilize the following tools within GitHub Actions for Continuous Integration and Continuous Delivery:

* **CodeCov:** Code coverage reporting and analysis.
* **SonarQube:** Automated code quality analysis, bug and vulnerability detection.
* **SuperLinter:** Code linting and style checking.
* **Node.js project workflows:** For build, test, and deployment automation of Node.js based projects (React Native).

## 6.1 Unit Testing (Jest & React Testing Library)

* **Frameworks:** Jest (testing framework), React Testing Library (for React Native component testing).
* **Techniques:**
  * Assertions to verify expected outcomes.
  * Snapshot testing to detect UI changes.
  * Mocking functions, database queries, modules, API calls, and dependencies to isolate unit tests.
* **Scope:** Unit tests cover:
  * React Native components.
  * API call logic.
  * Individual functions.
  * Navigation flows.

## 6.2 System Testing (Appium)

* **Framework:** Appium - open-source automation framework for mobile app testing.
* **Purpose:** End-to-End (E2E) system testing of the application.
* **Capabilities:**
  * Cross-platform testing (iOS and Android).
  * Direct interaction with native components of React Native applications.
  * Automated execution on the `main` branch.  *Ideally, system tests should also be integrated as pre-commit hooks on feature branches for future releases to prevent regressions and enforce "don't break what's already there" principles.*

## Resources

* **React Testing Library:** [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)
* **Jest:** [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
* **CodeCov:**
  * [https://github.com/apps/codecov](https://github.com/apps/codecov)
  * [https://docs.codecov.com/docs/quick-start](https://docs.codecov.com/docs/quick-start)
  * [https://docs.codecov.com/docs/github-tutorial](https://docs.codecov.com/docs/github-tutorial)
 
* **SonarQube:** [https://www.sonarsource.com/products/sonarqube/](https://www.sonarsource.com/products/sonarqube/)

---

**Note:** Implementing pre-commit hooks on feature branches to run system tests helps ensure code quality early in the development cycle by preventing commits that break existing system functionality, embodying a "don't break what's already there" approach to TDD.
