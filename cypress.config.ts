import codeCoverageTask from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      // implement node event listeners here
    },
  },
});
