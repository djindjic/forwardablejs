//

var geSaLaKaCuLa = require('gesalakacula');

module.exports = function (config) {

  var customLaunchers = geSaLaKaCuLa({
    'Linux': {
      'chrome': '37'
    }
  });

  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/*.spec.js'
    ],
    reporters: ['dots', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true,

    browserDisconnectTimeout: 10 * 1000, // 10s
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 2 * 60 * 1000, // 2m
    captureTimeout: 0,

    browsers: Object.keys(customLaunchers),
    sauceLabs: {
      testName: 'forwardablejs',
      recordScreenshots: false
    },
    customLaunchers: customLaunchers
  });


  if (process.env.TRAVIS) {
    var buildLabel = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';

    config.sauceLabs.build = buildLabel;
    config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
  }
};
