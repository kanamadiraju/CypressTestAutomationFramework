// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//require('cypress-xpath')

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

var chai = require('chai');
import chaiSorted from 'chai-sorted'
chai.use(chaiSorted)

/* const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays); */

var chai = require("chai")
    expect = chai.expect; // preference and tested with expect
 
chai.use(require("chai-sorted")); 

module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // in Chromium, preferences can exist in Local State, Preferences, or Secure Preferences
      // via launchOptions.preferences, these can be acccssed as `localState`, `default`, and `secureDefault`

      // for example, to set `somePreference: true` in Preferences:
      launchOptions.preferences.default['preference'] = true

      return launchOptions
    }

    if (browser.family === 'firefox') {
      // launchOptions.preferences is a map of preference names to values
      launchOptions.preferences['some.preference'] = true

      return launchOptions
    }

    if (browser.name === 'electron') {
      // launchOptions.preferences is a `BrowserWindow` `options` object
      launchOptions.preferences.darkTheme = true

      return launchOptions
    }
  })
}