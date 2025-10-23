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
}