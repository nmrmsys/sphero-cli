var keypress = require('keypress');

module.exports = function (sphero) {

  //variation of the roll command to enable input from keyboard
  //useful when it you get commands from the Internet or just to play with
  //Sphero using nodejs

  console.log('Drive mode enabled\n Press e to calibrate and tap e again to point the Sphero in the direction you want to drive and q to finish calibration\n Use w,s,a,d style control the sphero \n Use spacebar to stop the sphero');
  console.log('Press ctrl+c to exit');

  var stdin = process.stdin;
  stdin.setEncoding('utf8');
  keypress(stdin);

  console.log("starting to listen for arrow key presses");

  stdin.on("keypress", function(ch,key) {
    //console.log('got "keypress"', key);
    sphero.color('#000000');

    if(key && key.name === 'e') {
      sphero.startCalibration();
      sphero.roll(1, 90, 2, function() {
        setTimeout(function() {
          sphero.setHeading(0, function() {
            sphero.roll(0,0,1);
          });
        }, 300);
      });
    }
    if(key && key.name === 'q') {
      sphero.finishCalibration();
    }
    if(key && key.name === 'w'){
      //console.log('up');
      sphero.stop();
      sphero.roll(150, 0);
    }
    if(key && key.name === 'd'){
      //console.log('right');
      sphero.stop();
      sphero.roll(150, 90);
    }
    if(key && key.name === 's'){
      //console.log('down');
      sphero.stop();
      sphero.roll(150, 180);
    }
    if(key && key.name === 'a'){
      //console.log('left');
      sphero.stop();
      sphero.roll(150, 270);
    }
    if(key && key.name === 'space'){
      //console.log('space');
      sphero.stop();
    }
    if (key && key.ctrl && key.name === 'c') {
      process.stdin.pause();
      process.exit();
    }
  });

  stdin.setRawMode(true);
  stdin.resume();
};
