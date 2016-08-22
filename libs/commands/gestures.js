var keypress = require('keypress');

module.exports = function (sphero) {

  var stdin = process.stdin;
  stdin.setEncoding('utf8');
  keypress(stdin);

  console.log("Welcome to Sphero Gestures!");
  console.log("Press 'e' to calibrate. Press 'q' to finish calibration.");
  console.log("Press 'y' for yes. Press 'n' for no. Press 't' to do the twist!");
  console.log("Put Sphero into the dock and press 'h' for head roll. ");
  console.log("Press ctrl+c to exit.");
  console.log("Listening for key presses...");
  sphero.color("white");

  stdin.on("keypress", function(ch,key) {

    if (key && key.ctrl && key.name === 'c') {
      sphero.disconnect(function() {
        console.log("Sphero says goodbye!");
      });

      process.stdin.pause();
      process.exit();
    }

    // how to use setRawMotors - from https://github.com/orbotix/DeveloperDocumentation/blob/0a4b007600f55c05889734aa3aa6727f86dc1d51/src/content/imports/sphero-js/devices/sphero.md#setrawmotorsopts-callback
    // Possible modes:
    //
    // 0x00: Off (motor is open circuit)
    // 0x01: Forward
    // 0x02: Reverse
    // 0x03: Brake (motor is shorted)
    // 0x04: Ignore (motor mode and power is left unchanged

    if(key && key.name === 'h') {

      // head roll
      setTimeout(function() { opts = {lmode: 1, lpower: 100, rmode: 0, rpower: 0}; sphero.setRawMotors(opts, function() { }); }, 100);
      setTimeout(function() { opts = {lmode: 0, lpower: 0, rmode: 0, rpower:  0}; sphero.setRawMotors(opts, function() { }); sphero.setStabilization(1, function() { }); }, 800);
    }

    // let's do the twist
    if(key && key.name === 't') {

      sphero.setStabilization(0, function() { });

      // twist right
      setTimeout(function() { opts = {lmode: 1, lpower: 150, rmode: 2, rpower: 150}; sphero.setRawMotors(opts, function() { }); }, 100);
      setTimeout(function() { opts = {lmode: 0, lpower: 0, rmode: 0, rpower:  0}; sphero.setRawMotors(opts, function() { } ); }, 300);

      // twist left
      setTimeout(function() { opts = {lmode: 2, lpower: 150, rmode: 1, rpower: 150}; sphero.setRawMotors(opts, function() { }); }, 400);
      setTimeout(function() { opts = {lmode: 0, lpower: 0, rmode: 0, rpower:  0}; sphero.setRawMotors(opts, function() { }); sphero.setStabilization(1, function() { }); }, 600);

      // twist right
      setTimeout(function() { opts = {lmode: 1, lpower: 150, rmode: 2, rpower: 150}; sphero.setRawMotors(opts, function() { }); }, 700);
      setTimeout(function() { opts = {lmode: 0, lpower: 0, rmode: 0, rpower:  0}; sphero.setRawMotors(opts, function() { }); sphero.setStabilization(1, function() { }); }, 900);

    }

    // Found at https://github.com/orbotix/sphero.js/issues/45#issuecomment-221169893
    if(key && key.name === 'y') {

      // YES
      opts = {lmode: 2, lpower: 80, rmode: 2, rpower: 80};
      sphero.setRawMotors(opts, function() { });
      setTimeout(function() { opts = {lmode: 1, lpower: 80, rmode: 1, rpower: 80}; sphero.setRawMotors(opts, function() { }); }, 100);
      setTimeout(function() { opts = {lmode: 2, lpower: 80, rmode: 2, rpower: 80}; sphero.setRawMotors(opts, function() { }); }, 200);
      setTimeout(function() { opts = {lmode: 1, lpower: 80, rmode: 1, rpower: 80}; sphero.setRawMotors(opts, function() { }); }, 300);
      setTimeout(function() { opts = {lmode: 0, lpower:  0, rmode: 0, rpower:  0}; sphero.setRawMotors(opts, function() { }); sphero.setStabilization(1, function() { }); }, 400);

    }

    if(key && key.name === 'n') {

      // NO
      sphero.roll(0,60);
      setTimeout(function() { sphero.roll(0,300); }, 200);
      setTimeout(function() { sphero.roll(0,60); }, 400);
      setTimeout(function() { sphero.roll(0,300); }, 600);
      setTimeout(function() { sphero.roll(0,60); }, 400);
      setTimeout(function() { sphero.roll(0,300); }, 600);
      setTimeout(function() { sphero.roll(0,0); }, 800);

    }

    // Calbiration from drive.js
    if(key && key.name === 'e') {
      sphero.startCalibration ();
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
  });

  stdin.setRawMode(true);
  stdin.resume();

};
