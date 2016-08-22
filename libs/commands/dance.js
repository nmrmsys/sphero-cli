module.exports = function (sphero) {
    console.log("sphero got moves!!");

    var movesTimer = setInterval(function() {
        var direction = Math.floor(Math.random() * 360);
        var distance = Math.floor(Math.random() * (150 - 10)) + 10
        sphero.roll(distance, direction);
      }, 100);

    var colorTimer = setInterval(function () {
        sphero.randomColor();
    }, 250);

    //only bother Sphero for 5 seconds
    setTimeout(function() {
       clearInterval(movesTimer);
       clearInterval(colorTimer);
    }, 5000);

};
