const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '445uuj',
  e2e: {
    viewportHeight: 1080,
    viewportHeight: 1440,
    baseUrl: 'https://www.drogerienatura.pl',
    chromeWebSecurity: false,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
