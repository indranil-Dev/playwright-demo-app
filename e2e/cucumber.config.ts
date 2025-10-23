import { IConfiguration, DEFAULT_CONFIGURATION } from '@cucumber/cucumber';

const config: Partial<IConfiguration> = {
  // Specify the location of step definition files
  require: ['e2e/step-definitions/*.ts'],
  
  // Define where feature files are located
  paths: ['e2e/features/'],
  
  // Configure reporting formats
  format: [
    'progress-bar',        // Shows progress during test execution
    'html:cucumber-report.html' // Generates HTML report
  ],
  
  // Additional configuration options
  formatOptions: { 
    snippetInterface: 'async-await' // Use async-await syntax in generated snippets
    },
    backtrace: false,
    failFast: false,
    dryRun: false,
    forceExit: true,
    parallel: 1,
    retry: 0,
    strict: true
};

// Merge with default configuration
export default { ...DEFAULT_CONFIGURATION, ...config } as IConfiguration;