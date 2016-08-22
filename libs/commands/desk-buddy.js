var _ = require('lodash');

var moveHead = function(sphero) {
  sphero.roll(0, Math.floor(Math.random() * 180));
};

module.exports = function (sphero) {
    
    console.log('Place me in my charging station');

    sphero.color('#000000');
    moveHead(sphero);

    var partiallyAppliedMoveHead = _.partial(moveHead, sphero);

    setInterval(partiallyAppliedMoveHead, 4000);
};



