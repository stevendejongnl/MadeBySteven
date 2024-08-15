/* jshint node: true */
/* jshint esversion: 2020 */
/* jshint strict: false */

import { defaultReporter } from '@web/test-runner'
import { junitReporter } from '@web/test-runner-junit-reporter'
import { playwrightLauncher } from '@web/test-runner-playwright'

const browsers = {
  chromium: playwrightLauncher({ product: 'chromium' }),
  firefox: playwrightLauncher({ product: 'firefox', concurrency: 1 }),
  webkit: playwrightLauncher({ product: 'webkit' }),
}

// Prepend BROWSERS=x,y to `npm run test` to run a subset of browsers
// e.g. `BROWSERS=chromium,firefox npm run test`
const noBrowser = (b) => {
  throw new Error(`No browser configured named '${b}'; using defaults`)
}
let commandLineBrowsers
try {
  commandLineBrowsers = process.env.BROWSERS?.split(',').map(
    (browser) => browsers[browser] ?? noBrowser(browser)
  )
} catch (e) {
  console.warn(e)
}

export default {
  nodeResolve: true,
  concurrency: 10,
  browsers: commandLineBrowsers ?? Object.values(browsers),
  filterBrowserLogs: ({ type }) => type !== 'warn',
  reporters: [
    defaultReporter({
      reportTestResults: true,
      reportTestProgress: true
    }),
    junitReporter({
      outputPath: './junit-test-results.xml',
      reportLogs: true,
    }),
  ],
  files: ['dist/**/*.test.js'],
  testRunnerHtml: (testFramework) => `
    <html lang="en-US">
      <head></head>
      <body>
        <link rel="stylesheet" href="dist/main.css">
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `
}
