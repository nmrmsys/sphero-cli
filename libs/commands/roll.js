module.exports = function (sphero) {
    
    console.log('Let\'s Roll!!');

    setInterval(function () {
        
        var direction = Math.floor(Math.random() * 360);
        sphero.roll(150, direction);
        
    }, 1000);
};



