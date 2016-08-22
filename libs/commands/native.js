var _ = require('lodash');

var callbackFactory = function(){
    return function(err, data){
        if(!err) {
            console.log(data);
        } else {
            console.error(err);
        }
    };
};

module.exports = function(sphero, args) {
    var requestBody = {};
    requestBody.command =　args.shift();
    switch(args.length){
        case 0:
            break;
        case 1:
            requestBody.value = args[0];
            break;
        default:
            requestBody.value = args;
    }
    
    if(_.isString(requestBody.value)) {

        sphero[requestBody.command](requestBody.value, callbackFactory());

    } else if(_.isArray(requestBody.value)) {

        requestBody.value.push(callbackFactory());

        sphero[requestBody.command].apply(this, requestBody.value);

    } else {

        sphero[requestBody.command](callbackFactory());

    }
};
