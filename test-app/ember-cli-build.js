'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['ember-sundries'],
    },
    snippetSearchPaths: ['app', '../ember-sundries/src/utils', 'config'],
    'ember-cli-addon-docs': {
      documentingAddonAt: '../ember-sundries',
    },
  });

  // const { maybeEmbroider } = require('@embroider/test-setup');

  // return maybeEmbroider(app);

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    // staticAddonTestSupportTrees: true,
    // staticAddonTrees: true,
    // staticHelpers: true,
    // staticModifiers: true,
    // staticComponents: true,
    // staticEmberSource: true,
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
