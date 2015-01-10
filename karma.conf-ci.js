var browsers = {                                 // 1
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  }
};
 
module.exports = function(config) {
  config.set({
    // all other options that are defined in
    // local.karma.conf.js were elided for the
    // purpose of this blog post.
    reporters: ['saucelabs', 'spec'],            // 2
    browsers: Object.keys(browsers),             // 3
    customLaunchers: browsers                    // 4
  });
};