module.exports = function (sphero) {
    sphero.disconnect(function () {
        var config = require('home-config').load('.sphero');
        console.log('Disconnected from ' + config.NAME);
    });
};
