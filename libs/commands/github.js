var GithubFactory = require('../services/github');

module.exports = function(options) {

  var githubInstance = GithubFactory({
    accessToken: options.accessToken || false
  });

};