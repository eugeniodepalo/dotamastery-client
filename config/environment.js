/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dotamastery',
    podModulePrefix: 'dotamastery/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      apiHost: '//localhost:3000',
      mixpanelToken: '',
      driftId: ''
    },

    torii: {},

    featureFlags: {
      heroPages: true
    },

    webFontConfig: {
      custom: {
        families: ['FontAwesome']
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.apiHost = '//api.dotamastery.io';
    ENV.APP.mixpanelToken = '';
    ENV.APP.googleAnalyticsId = '';
    ENV.featureFlags.heroPages = false;
  }

  return ENV;
};
