var sphero = require("sphero"),
    config = require('home-config').load('.sphero');

module.exports = function() {

  if(typeof(config.ADDR) !== 'undefined') {
    return sphero(config.ADDR); // UUID or /dev/rfcomm0
  }

  return false;
};

module.exports.config = config;
