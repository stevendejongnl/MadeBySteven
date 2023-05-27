/* jshint esversion: 6 */
/* jshint strict: false */

import {env} from 'process';
import {playwrightLauncher} from '@web/test-runner-playwright';
import {esbuildPlugin} from '@web/dev-server-esbuild';

export default {
  nodeResolve: true,
  concurrency: 10,
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })],
  browsers: [
    ...(!env.PLAYWRIGHT_SKIP_CHROMIUM ? [playwrightLauncher({ product: 'chromium' })] : []),
    ...(!env.PLAYWRIGHT_SKIP_FIREFOX ? [playwrightLauncher({ product: 'firefox' })] : []),
    ...(!env.PLAYWRIGHT_SKIP_WEBKIT ? [playwrightLauncher({ product: 'webkit' })] : []),
  ],
  testRunnerHtml: (testFramework) => `
    <html lang="en-US">
      <head></head>
      <body>
        <link rel="stylesheet" href="dist/main.css">
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  files: ['src/**/*.test.ts'],
};
