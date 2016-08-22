var sphero,
    appRootPath = require('app-root-path'),
    _ = require('lodash');

module.exports = function (command, options) {
  sphero = require('./sphero-instance')();
  if (sphero) {
    sphero.connect(function () {
      require(appRootPath + '/libs/commands/' + command)(sphero, options);
    });
  }
};

module.exports.alreadyConnected = function(sphero, command) {
  if (sphero) {
    require(appRootPath + '/libs/commands/' + command)(sphero);
  }
};

module.exports.alreadyConnectedSingleValue = function(sphero, command, options) {
  if (sphero) {
    require(appRootPath + '/libs/commands/' + command)(sphero, options);
  }
};

module.exports.alreadyConnectedMultipleValues = function(sphero, command, options) {

  if (sphero) {
    var parameters = _.union([sphero], options);
    require(appRootPath + '/libs/commands/' + command).apply(this, parameters);
  }

};
