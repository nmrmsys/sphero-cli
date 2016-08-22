module.exports = function (sphero) {
    console.log('Let\'s Party!!');

    sphero.randomColor();
    setInterval(function () {
        sphero.randomColor();
    }, 1000);
};
