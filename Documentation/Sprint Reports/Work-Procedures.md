
# Team Work Procedures (Updated 26-01-2025)

## Introduction

To effectively develop our application with a team of 11, we operate with overlapping roles across two key phases: **Design** and **Development**, aiming for a 2-sprint release cycle.  We target completing the Design phase within the first 3 days of Sprint 1 to maximize development time.  Sprint 2 will then focus on feature development completion, bug fixing, report generation, and thorough testing.  Ideally, we aim to deliver approximately two features per release, recognizing that effective testing can only commence after Pull Requests are submitted and code is integrated. We are using the MVVM (Model-View-ViewModel) design pattern. Our sprints are 2 weeks long.

## Team Roles and Responsibilities

Roles will be assigned per release. If you wish to change your role for the next release, please discuss it with the Scrum Masters beforehand.

*   **Scrum Master (3 people):** Responsible for sprint planning, project management, meeting documentation requirements, writing user stories and tasks, and ensuring smooth sprint execution.
*   **Team Leads (4 people):** Responsible for communication between their subteams and Scrum Masters, conveying information in both directions, and presenting team progress during stand-ups.
*   **System Designer (3 people):** Responsible for creating system diagrams (e.g., system context diagrams, component diagrams), operation contracts, and ERDs. All necessary diagrams for the selected user stories for the sprint must be completed before coding begins.
*   **UI/UX Designer (2 people):** Responsible for delivering wireframes for the user stories, considering user personas and usability principles. Wireframes are needed before the development phase.
*   **QA Tester (2-3 people):** Responsible for producing code quality reports using SonarQube, writing unit tests, and performing manual system testing.
*   **Frontend Developers (6-7 people):** Responsible for implementing the UI based on the provided wireframes and adhering to the chosen styling and UI library.
*   **Backend Developers (2 people):** Responsible for developing and maintaining APIs, ensuring adherence to the data model, and handling data persistence.

## General Procedures (Applying to Both Phases)

*   **Bi-weekly Meetings (Scrum Masters & Team Leads):** Scrum Masters and Team Leads will meet bi-weekly to review progress, close Pull Requests (PRs), and ensure alignment. This bi-weekly cadence is our approach to approximating an ideal sprint burndown and managing workload within our 2-sprint release cycle.
*   **PR Closing during Bi-weeklies:**  Pull Requests will be merged and closed during these bi-weekly meetings.  Closing a PR means merging the approved code into the main development branch.
*   **Sprint Backlog Management:** Scrum Masters will populate the `Sprint Backlog` pipeline in Zenhub with tasks for the current sprint. When you begin working on a task, assign yourself in Zenhub and move it to the `In Progress` pipeline. Create a dedicated branch on GitHub for your commits related to the task.
*   **Pull Requests and Code Reviews:** Upon completion of a task, open a Pull Request on GitHub and move the task to the `Review/QA` pipeline (renamed as `Ready for Review/QA` for clarity). Team members are encouraged to provide code reviews to earn points and ensure code quality. Aim for at least 3 reviews per PR.
*   **Scrum Master - Project Manager Meetings:** Scrum Masters will meet with the Project Manager once a week to provide updates and gather feedback.
*   **Subteam Meetings:** Subteams will schedule meetings with their respective Team Leaders as needed, based on their task dependencies and progress. Tasks are ideally sized to be completed within 3 days to maintain sprint momentum, especially within Sprint 1 to allow ample time for Sprint 2 development and testing.

## Procedures for Design Phase (Week 1 or Less)

*   **User Stories and Task Creation (Scrum Masters):** Scrum Masters will write user stories and break them down into actionable tasks for the release. They will also organize these tasks, build dependency trees, and populate the sprint backlog.  A key goal is to finalize user stories and design tasks within the first 3 days of Sprint 1 to enable rapid transition to the Development phase.
*   **Design Outputs (System Designers, UI/UX Designers, QA Analysts):** System Designers, UI/UX Designers, and QA Analysts will create their respective outputs based on the user stories. This includes system diagrams, operation contracts, ERDs, wireframes, and initial test plans. These design phase outputs are crucial inputs for the development phase and must be completed swiftly in Sprint 1.

## Procedures for Development Phase (Week 2)

*   **Task Assignment and Dependency Management (Scrum Masters):** Based on the dependency tree established in the design phase, Scrum Masters will strive to ensure that independent tasks are available in the sprint backlog, facilitating parallel development across both Sprint 1 and Sprint 2.
*   **Teamwork in Pairs (Recommended):** Development tasks are sized for teams of two. It is recommended that each pair includes at least one Team Lead or Scrum Master to facilitate stand-up within the pair if needed. This pairing is optional, but individuals working alone will be expected to attend team stand-ups (if implemented). Development will primarily occur in Sprint 1 and the beginning of Sprint 2, allowing time for testing and bug fixing in the latter part of Sprint 2.
*   **Unit Testing - "Implement then Test, Immediately":**  Following the marking scheme's guidance and for practical workflow, we will adopt an "Implement then Test, Immediately" approach to unit testing. After implementing a feature or component, the *immediate next step* is to write unit tests for it using Jest. For each development task in Zenhub, consider creating a sub-task called "Write Unit Tests" to ensure this step is tracked and completed.

## Test-Driven Development (Discussion)

While pure Test-Driven Development (TDD) with tests written before implementation is a valuable practice, our current approach is "Implement then Test, Immediately" to align with the marking scheme and enable a quicker initial adoption of testing within our sprint timeline. We acknowledge the importance of unit testing and aim to integrate it systematically into our development workflow, recognizing that comprehensive system testing is most effective after code integration via PRs.

## Scrum Master Guidelines

*   **Design Phase Task Size:** Design phase issues should be scoped to be solvable by one person to minimize dependencies during this phase and ensure rapid design phase completion within Sprint 1.
*   **Development Phase Task Size:** Development phase tasks will be sized for teams of two, considering the team structure and available resources, and to facilitate completion within the Sprint 1 and early Sprint 2 timeframe.
*   **Unit Testing Sub-tasks:** Scrum Masters should consider adding "Write Unit Tests" sub-tasks to development tasks in Zenhub to ensure unit testing is explicitly planned and tracked throughout both sprints.

## Misc Comments

Due to the significant workload associated with meetings and code reviews, Team Leaders and Scrum Masters are expected to have slightly reduced coding contributions compared to other team members. This is especially true for Scrum Masters who also handle report writing and QA Testers who are responsible for code analysis and test writing, especially in Sprint 2. Let's all support each other and distribute workload fairly as needed across both sprints.

## Rationale for Updates

*   **25-01-2025** - Initial documentation after Sprint 1 review.  **Reasoning:**  Sprint 1 retrospective highlighted issues with task dependencies making progress tracking difficult and weekly meetings insufficient for timely issue resolution. **Changes Implemented:** Tasks to be sized for 1-2 people, solvable within 3 days to reduce dependencies. Bi-weekly issue closing implemented to improve sprint burndown visibility and responsiveness.
*   **26-01-2025** - Updated documentation based on further discussions. **Reasoning:** To clarify unit testing approach for practical implementation and align with marking scheme requirements.  To detail PR/QA flow for better understanding of code integration and testing stages. To add Technology Stack and Tools sections for comprehensive project context. **Changes Implemented:** "Implement then Test, Immediately" unit testing approach described. PR/QA flow clarified. Technology Stack and Tools sections added.
*   **26-01-2025 (Further Sprint Granularity)** - Added more detail to sprint structure and timeline. **Reasoning:** To provide a clearer understanding of the 2-sprint release cycle, emphasizing the Design phase in early Sprint 1, Development across Sprint 1 and early Sprint 2, and Testing/Bug fixing in late Sprint 2.  **Changes Implemented:** Introduction and Procedures sections refined to reflect the desired sprint timeline and phase distribution across the 2-sprint release.

# Technology Stack

## Wireframing

*   Figma

## Core Technologies

*   **Technology:** React Native
*   **Package Manager:** npm LTS (Long Term Support)
*   **Framework:** Expo ([Expo Docs here](https://docs.expo.dev/))

## Development Environment

*   **IDE:** Android Studio (and your preferred additional IDE)
*   **Emulator:**
    *   Device: Pixel 7
    *   API Level: 33
    *   Purpose: Responsiveness Testing

# Tools and Technologies

## Project Management & Workflow

*   **Zenhub:** Sprint planning, task management, workflow pipelines (Sprint Backlog, In Progress, Ready for Review/QA).
*   **GitHub:** Version control, code repository, Pull Requests, issue tracking.
    *   **CI/CD:** GitHub Workflow - Automates build, test, and potentially deployment processes. PR submission triggers SonarQube and Codecov analysis.

## Code Quality & Testing

*   **SonarQube:** Automated code quality analysis, identifies bugs, vulnerabilities, and code smells.
*   **Codecov:** Code coverage reporting, measures the percentage of code covered by tests.
*   **Jest:** Unit testing framework for JavaScript.
*   **Appium:** End-to-End (E2E) testing framework for mobile apps.

## UI Library (Potentially)

*   **NativeBase:**  UI component library for React Native (under consideration for consistent styling and UI elements).

## Communication

*   *(Add your team's communication platform here, e.g., Slack, Microsoft Teams)*
