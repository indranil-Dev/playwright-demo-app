# Running End-to-End Tests

This guide explains how to run the end-to-end tests using Playwright and Cucumber.

## Prerequisites

Make sure you have installed all dependencies:

```bash
npm install
```

Also install the Playwright browsers:

```bash
npx playwright install
```

## Test Scripts

The following test scripts are available:

1. **Run all E2E tests**
   ```bash
   npm run e2e
   ```
   This will:
   - Start the Angular development server
   - Wait for the server to be ready
   - Run all Cucumber/Playwright tests

2. **Debug mode**
   ```bash
   npm run e2e:debug
   ```
   This will:
   - Start the Angular development server
   - Wait for the server to be ready
   - Run tests with Playwright's debug mode enabled
   - Show the Playwright Inspector for debugging

## Configuration Files

1. `cucumber.config.ts`: Configures Cucumber test runner
   - Defines step definition and feature file locations
   - Sets up reporting formats
   - Controls test execution behavior

2. `playwright.config.ts`: Configures Playwright
   - Sets up browser configurations
   - Defines test timeouts and retries
   - Configures the development server
   - Sets up reporting

## Test Reports

After running the tests:
- Cucumber HTML report: `cucumber-report.html`
- Playwright report: `playwright-report/index.html`

## Debugging Tips

1. **Using Playwright Inspector**
   - Run tests in debug mode: `npm run e2e:debug`
   - Use the step-through functionality
   - Inspect page state at each step

2. **Common Issues**
   - If tests fail to start, ensure the dev server is running (`npm run e2e:serve`)
   - Check browser console for JavaScript errors
   - Verify that test data is properly set up