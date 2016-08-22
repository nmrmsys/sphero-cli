var express = require('express'),
    server = express(),
    bodyParser = require('body-parser');

module.exports = function(callback, options) {

  var port = options.port || 3000;

  server.use(bodyParser.json());

  server.post('/', callback);

  server.listen(port, function () {
    console.log( 'Server listening on port ' + port );
  });

}
