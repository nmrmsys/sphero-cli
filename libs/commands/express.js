var sphero = require('../sphero-instance')(),
    config = require('../sphero-instance').config,
    expressServer = require('../express-server'),
    executeCustomCommand = require('../execute-command'),
    _ = require('lodash');

var callbackFactory = function(res){
    return function(err, data){
        if(!err) {
            res.send({data: data});
        } else {
            res.send({error: err});
        }
    };
};

var spheroCommandExecuter = function(sphero, requestBody, res) {

    if(_.isString(requestBody.value)) {

        sphero[requestBody.command](requestBody.value, callbackFactory(res));

    } else if(_.isArray(requestBody.value)) {

        requestBody.value.push(callbackFactory(res));

        sphero[requestBody.command].apply(this, requestBody.value);

    } else {

        sphero[requestBody.command](callbackFactory(res));

    }

};

var customCommandExecuter = function(sphero, requestBody, res){

    if(_.isString(requestBody.value) || _.isObject(requestBody.value)) {

        executeCustomCommand.alreadyConnectedSingleValue(sphero, requestBody.command, requestBody.value);

    } else if(_.isArray(requestBody.value)) {

        executeCustomCommand.alreadyConnectedMultipleValues(sphero, requestBody.command, requestBody.value);

    } else {

        executeCustomCommand.alreadyConnectedSingleValue(sphero, requestBody.command, {});

    }

    res.send('Command Executed - ' + requestBody.command);

};

module.exports = function(sphero, options) {

    expressServer(function (req, res) {

        var requestBody = req.body;

        if(requestBody.command && requestBody.mode === 'sphero') {

            spheroCommandExecuter(sphero, req.body, res);

        } else if(requestBody.command && requestBody.mode === 'custom') {

            customCommandExecuter(sphero, req.body, res);

        } else {

            res.send('Command is invalid');

        }

    }, options);
};
