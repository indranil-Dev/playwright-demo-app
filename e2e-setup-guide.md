# Angular Todo App with Playwright and Cucumber Testing Guide

This guide explains how to set up and implement end-to-end testing using Playwright with Cucumber in an Angular application. We'll walk through each step in detail, explaining what each component does and why we need it.

## Understanding the Technologies

Before we dive in, let's understand the key technologies we're using:

### Angular
- **What is it?** A modern web application framework
- **Why use it?** Provides a structured way to build single-page applications with components, services, and dependency injection
- **Our usage:** We're building a todo application to demonstrate testing capabilities

### Playwright
- **What is it?** A modern automation testing framework by Microsoft
- **Why use it?** 
  - Provides reliable end-to-end testing
  - Supports multiple browsers (Chrome, Firefox, Safari)
  - Better performance than older tools like Selenium
  - Built-in auto-waiting capabilities
  - Modern features like network interception
- **Our usage:** We use it to automate browser interactions in our tests

### Cucumber
- **What is it?** A tool that supports Behavior-Driven Development (BDD)
- **Why use it?**
  - Allows writing tests in plain English (Gherkin syntax)
  - Bridges communication between technical and non-technical team members
  - Provides structured way to organize test scenarios
- **Our usage:** Writing test scenarios in a human-readable format

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Installing Dependencies](#installing-dependencies)
4. [Setting up E2E Test Structure](#setting-up-e2e-test-structure)
5. [Writing Feature Files](#writing-feature-files)
6. [Implementing Step Definitions](#implementing-step-definitions)
7. [Setting up Test Configuration](#setting-up-test-configuration)
8. [Running Tests](#running-tests)
9. [Troubleshooting](#troubleshooting)

## Prerequisites Explained

### Required Software
1. **Node.js (version 14 or higher)**
   - **What is it?** JavaScript runtime environment
   - **Why needed?** Powers our development environment and runs our tests
   - **How to check:** Run `node --version` in terminal

2. **npm (Node Package Manager)**
   - **What is it?** Package manager for JavaScript
   - **Why needed?** Installs and manages project dependencies
   - **How to check:** Run `npm --version` in terminal

3. **Angular CLI**
   - **What is it?** Command-line interface for Angular
   - **Why needed?** Creates and manages Angular projects
   - **How to install:** `npm install -g @angular/cli`
   - **How to check:** Run `ng version` in terminal

4. **VS Code or preferred IDE**
   - **Why needed?** For code editing and debugging
   - **Recommended extensions:**
     - Angular Language Service
     - Cucumber (Gherkin) Full Support
     - Prettier - Code formatter

### Knowledge Prerequisites
- **TypeScript basics:** Angular uses TypeScript for type safety
- **Angular fundamentals:** Components, modules, and services
- **Terminal/Command Line:** Basic commands for navigation and running scripts

## Project Setup Explained

1. First, create a new Angular project with minimal setup:
   ```bash
   ng new playwright-demo-app
   cd playwright-demo-app
   ```
   - Choose "CSS" for styling
   - Choose "No" for routing (we'll keep it simple)

2. Create the basic todo application structure:
   ```bash
   mkdir -p src/app/components
   ```

3. Create the Todo interface:
   ```bash
   touch src/app/todo.interface.ts
   ```

## Understanding Dependencies

### Core Testing Dependencies

1. **@playwright/test**
   - **What is it?** Playwright's test runner and assertion library
   - **Why needed?** Provides browser automation and test assertions
   - **Key features:**
     - Browser automation
     - Network request handling
     - Screenshot and video capture
     - Cross-browser testing support

2. **@cucumber/cucumber**
   - **What is it?** BDD testing framework
   - **Why needed?** Enables writing tests in Gherkin syntax
   - **Key features:**
     - Feature file support
     - Step definition organization
     - Test scenario management
     - Hooks for test lifecycle

3. **@types/cucumber**
   - **What is it?** TypeScript type definitions for Cucumber
   - **Why needed?** Provides code completion and type safety
   - **Benefits:**
     - Better IDE support
     - Catch errors at compile time
     - Improved code documentation

4. **ts-node**
   - **What is it?** TypeScript execution engine for Node.js
   - **Why needed?** Runs TypeScript files directly without compilation
   - **Benefits:**
     - No separate compilation step
     - Faster development cycle
     - Source map support

### Development Dependencies

1. **prettier**
   - **What is it?** Code formatter
   - **Why needed?** Maintains consistent code style
   - **Benefits:**
     - Automatic code formatting
     - Consistent coding standards
     - Better code readability

### Installation Commands

```bash
# Install testing dependencies
npm install --save-dev @playwright/test @cucumber/cucumber @types/cucumber ts-node

# Install development dependencies
npm install --save-dev prettier
```

## Understanding E2E Test Structure

### Directory Structure Explained

```
e2e/
├── features/       # Contains Cucumber feature files
├── steps/          # Step definitions that map to feature files
└── support/        # Helper files and setup code
```

### Each Directory's Purpose

1. **features/ directory**
   - **What is it?** Contains `.feature` files written in Gherkin syntax
   - **Why needed?** Stores human-readable test scenarios
   - **Key aspects:**
     - Written in plain English
     - Describes behavior from user's perspective
     - Can be understood by non-technical stakeholders

2. **steps/ directory**
   - **What is it?** Contains step definition files (`.ts`)
   - **Why needed?** Implements the actual test code for each feature step
   - **Key aspects:**
     - Maps Gherkin steps to actual code
     - Contains Playwright test commands
     - Handles test assertions

3. **support/ directory**
   - **What is it?** Contains helper and setup files
   - **Why needed?** Provides reusable code and test configuration
   - **Contains:**
     - `page.ts`: Page object model setup
     - `hooks.ts`: Test lifecycle hooks

### Setup Commands

```bash
# Create directory structure
mkdir -p e2e/features e2e/steps e2e/support

# Create necessary files
touch e2e/features/todo.feature    # Test scenarios
touch e2e/steps/todo.steps.ts      # Step implementations
touch e2e/support/page.ts          # Page object setup
touch e2e/support/hooks.ts         # Test hooks
touch cucumber.js                  # Cucumber configuration
```

## Understanding Feature Files and BDD

### What is BDD (Behavior-Driven Development)?
- A development approach that starts with describing the behavior of an application
- Focuses on business value and user experience
- Uses natural language that all stakeholders can understand

### Gherkin Syntax Explained
- **Feature:** Describes a functional area of the application
- **Scenario:** A specific test case or user interaction
- **Given:** Sets up the initial context/state
- **When:** Describes an action or event
- **Then:** Describes the expected outcome
- **And:** Adds additional context, actions, or assertions

### Feature File Structure
1. **Feature Description**
   ```gherkin
   Feature: Todo List Application

   As a user
   I want to manage my todo list
   So that I can keep track of my tasks
   ```
   - **Purpose:** Describes the feature's business value
   - **Format:** Title followed by user story format
   - **Why needed:** Provides context for all scenarios

2. **Test Scenarios**
   ```gherkin
   Scenario: Add a new todo item
     Given I am on the todo application
     When I add a todo item with text "Buy groceries"
     Then I should see "Buy groceries" in the todo list
   ```
   - **Purpose:** Tests adding new items
   - **Steps Breakdown:**
     - `Given`: Sets up initial state (application loaded)
     - `When`: Performs the action (adding item)
     - `Then`: Verifies the result (item visible)

   ```gherkin
   Scenario: Complete a todo item
     Given I am on the todo application
     And I have added a todo item "Walk the dog"
     When I mark the todo item "Walk the dog" as complete
     Then the todo item "Walk the dog" should be marked as complete
   ```
   - **Purpose:** Tests marking items as complete
   - **Steps Breakdown:**
     - `Given & And`: Multiple setup steps
     - `When`: Performs completion action
     - `Then`: Verifies completion state

   ```gherkin
   Scenario: Delete a todo item
     Given I am on the todo application
     And I have added a todo item "Pay bills"
     When I delete the todo item "Pay bills"
     Then I should not see "Pay bills" in the todo list
   ```
   - **Purpose:** Tests item deletion
   - **Steps Breakdown:**
     - `Given & And`: Setup with item creation
     - `When`: Performs deletion
     - `Then`: Verifies item removal

### Best Practices for Feature Files
1. **Naming Conventions**
   - Use descriptive feature names
   - Write scenarios in user story format
   - Keep steps focused and atomic

2. **Organization**
   - One feature per file
   - Related scenarios grouped together
   - Clear progression of complexity

3. **Writing Tips**
   - Use present tense
   - Be specific in expectations
   - Avoid technical details in feature files
   ```

## Understanding Test Implementation

### Page Object Pattern
The Page Object Model (POM) is a design pattern that creates an object repository for web UI elements. It helps reduce code duplication and improves test maintenance.

1. **Page Object (`e2e/support/page.ts`)**
   ```typescript
   import { chromium, Page, Browser, BrowserContext } from '@playwright/test';

   let browser: Browser;
   let context: BrowserContext;
   let page: Page;

   export async function createPage() {
     browser = await chromium.launch({ 
       headless: false,  // Shows the browser while running tests
       slowMo: 500      // Slows down operations for visibility
     });
     context = await browser.newContext({
       viewport: { width: 1280, height: 720 }  // Sets browser window size
     });
     page = await context.newPage();
     return page;
   }

   export async function closeBrowser() {
     if (context) await context.close();  // Clean up browser context
     if (browser) await browser.close();   // Clean up browser instance
   }

   export { browser, page };

   // Key Components Explained:
   // - browser: Main browser instance (Chrome/Firefox/Safari)
   // - context: Isolated browser context (like incognito mode)
   // - page: Individual page/tab in the browser
   // - slowMo: Adds delay between actions for better visibility
   // - viewport: Sets browser window size for consistency
   ```

2. **Test Hooks (`e2e/support/hooks.ts`)**
   Hooks are special functions that run at specific times in the test lifecycle.
   ```typescript
   import { Before, After } from '@cucumber/cucumber';
   import { createPage, closeBrowser } from './page';

   // Runs before each scenario
   Before(async function () {
     await createPage();  // Creates fresh browser instance
   });

   // Runs after each scenario
   After(async function () {
     await closeBrowser();  // Cleans up browser resources
   });

   // Hook Types Explained:
   // - Before: Setup actions before tests
   // - After: Cleanup actions after tests
   // - BeforeAll: One-time setup before all tests
   // - AfterAll: One-time cleanup after all tests
   ```

3. **Step Definitions (`e2e/steps/todo.steps.ts`)**
   Step definitions connect Gherkin steps to actual test code.
   ```typescript
   import { Given, When, Then, Before } from '@cucumber/cucumber';
   import { expect, Page } from '@playwright/test';
   import { createPage } from '../support/page';

   // Declare page variable at module level for access across steps
   let page: Page;

   // Initialize page before each scenario
   Before(async () => {
     page = await createPage();
   });

   // Import Explanation:
   // - @cucumber/cucumber: Provides step definition decorators
   // - @playwright/test: Provides browser automation and assertions
   // - page.ts: Our custom page object implementation

   // Step 1: Application Navigation
   Given('I am on the todo application', async function() {
     // Navigate to application
     await page.goto('http://localhost:4200');
     // Verify page loaded correctly
     await expect(page.locator('h1')).toContainText('Todo App');
   });

   // Step 2: Adding Todo Items
   When('I add a todo item with text {string}', async function(text: string) {
     // Fill in the todo input
     await page.locator('.todo-input').fill(text);
     // Click the add button
     await page.locator('.todo-button').click();
   });

   // Step 3: Verifying Todo Items
   Then('I should see {string} in the todo list', async function(text: string) {
     // Find the specific todo item
     const todoItem = page.locator('.todo-text', { hasText: text });
     // Verify it's visible on the page
     await expect(todoItem).toBeVisible();
   });

   // Playwright Concepts Used:
   // - page.goto(): Navigates to URL
   // - page.locator(): Finds elements on page
   // - fill(): Types text into input fields
   // - click(): Clicks elements
   // - expect(): Assertions for verification

   // Reusable Step: Adding Todo Item
   Given('I have added a todo item {string}', async function(text: string) {
     // Combines multiple actions into one step
     await page.locator('.todo-input').fill(text);
     await page.locator('.todo-button').click();
     const todoItem = page.locator('.todo-text', { hasText: text });
     await expect(todoItem).toBeVisible();
   });

   // Step: Marking Todo as Complete
   When('I mark the todo item {string} as complete', async function(text: string) {
     // Advanced locator using nested selectors
     const todoItem = page.locator('.todo-item', { 
       has: page.locator('.todo-text', { hasText: text }) 
     });
     // Click the checkbox
     await todoItem.locator('.todo-checkbox').click();
   });

   // Step: Verifying Completion Status
   Then('the todo item {string} should be marked as complete', async function(text: string) {
     // Find the specific todo item
     const todoItem = page.locator('.todo-item', { 
       has: page.locator('.todo-text', { hasText: text }) 
     });
     // Check for 'completed' class
     await expect(todoItem.locator('.todo-text')).toHaveClass(/completed/);
   });

   // Advanced Concepts Used:
   // - Nested locators: Finding elements within elements
   // - Regular expressions: Flexible class matching
   // - Step reuse: Combining actions for efficiency

   // Step: Deleting Todo Items
   When('I delete the todo item {string}', async function(text: string) {
     // Find item using compound selector
     const todoItem = page.locator('.todo-item', { 
       has: page.locator('.todo-text', { hasText: text }) 
     });
     // Click delete button
     await todoItem.locator('.delete-button').click();
   });

   // Step: Verifying Item Deletion
   Then('I should not see {string} in the todo list', async function(text: string) {
     // Find item by text
     const todoItem = page.locator('.todo-text', { hasText: text });
     // Verify it's not visible (negative assertion)
     await expect(todoItem).not.toBeVisible();
   });

   // Testing Concepts Used:
   // - Negative testing: Verifying absence of elements
   // - Complex selectors: Finding nested elements
   // - Async/await: Handling asynchronous operations
   // - Test isolation: Each scenario runs independently
   ```

## Understanding Test Configuration

### Cucumber Configuration
The `cucumber.js` file in the root directory configures how Cucumber runs our tests.

1. **Basic Configuration (`cucumber.js`)**
   ```javascript
   module.exports = {
     default: {
       paths: ['e2e/features/**/*.feature'],
       require: ['e2e/register.js', 'e2e/steps/**/*.ts', 'e2e/support/**/*.ts'],
       format: ['@cucumber/pretty-formatter'],
       formatOptions: {
         snippetInterface: 'async-await'
       },
       publishQuiet: true,
       worldParameters: {
         appUrl: 'http://localhost:4200'
       },
       requireModule: ['ts-node/register'],
       timeout: 60000
     }
   };
   ```

2. Create TypeScript Register File (`e2e/register.js`):
   ```javascript
   require('ts-node').register({
     transpileOnly: true,
     compilerOptions: {
       module: 'commonjs'
     }
   });
   ```

3. Update package.json Scripts:
   ```json
   {
     "scripts": {
       "ng": "ng",
       "start": "ng serve",
       "build": "ng build",
       "watch": "ng build --watch --configuration development",
       "test": "ng test",
       "e2e:serve": "ng serve --port 4200",
       "e2e": "npm run e2e:serve & sleep 5 && cucumber-js --config cucumber.js",
       "e2e:debug": "PWDEBUG=1 cucumber-js --config cucumber.js"
     }
   }
   ```

## Running Tests

1. Start the Angular application:
   ```bash
   npm start
   ```

2. In a new terminal, run the E2E tests:
   ```bash
   npm run e2e
   ```

For debugging tests:
   ```bash
   npm run e2e:debug
   ```

## Troubleshooting

Common issues and solutions:

1. **Port already in use error**:
   ```bash
   pkill -f 'ng serve'
   ```
   Then try running the tests again.

2. **Module not found errors**:
   - Check that all dependencies are installed
   - Verify file paths in imports are correct
   - Make sure TypeScript configuration is correct

3. **Browser doesn't open**:
   - Check that Playwright is installed correctly
   - Verify the `headless` option is set to `false` in `page.ts`

4. **Tests timing out**:
   - Increase the timeout value in `cucumber.js`
   - Check if the application is running before starting tests

## Additional Tips

1. Keep the browser window visible during test development by setting `headless: false`
2. Use `slowMo` option to slow down test execution for better visibility
3. Always clean up resources after tests using hooks
4. Use descriptive feature and scenario names
5. Keep step definitions organized and reusable

Remember to handle errors gracefully and clean up resources properly after test execution.