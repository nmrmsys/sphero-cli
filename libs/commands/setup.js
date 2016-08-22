var noble = require('noble'),
    _ = require('lodash');

module.exports = function(rfcomm_device_file) {
    
    // old-type Sphero setup
    if (typeof rfcomm_device_file !== 'undefined') {
        console.log('Beginning old-type Sphero Setup');
        console.log('\nWriting to config file');
        console.log('Name: Sphero');
        console.log('ADDR: ' + rfcomm_device_file);
        var config = require('home-config').load('.sphero', {
            NAME: 'Sphero',
            ADDR: rfcomm_device_file
        });
        config.save();
        process.exit(0);
    }

    // new-type Sphero setup
    console.log('Beginning Setup');

    noble.on('stateChange', function(state) {

        if (state === 'poweredOn') {
            console.log('powered on');
            noble.startScanning();
        } else {
            noble.stopScanning();
        }

    });

    noble.on('discover', function(peripheral){

        if(_.includes(peripheral.advertisement.localName, 'BB-')
            || _.includes(peripheral.advertisement.localName, 'SK-')) {

            //console.log(peripheral);

            var deviceUUID = peripheral.uuid,
            localName = peripheral.advertisement.localName;

            console.log('\nWriting to config file');
            console.log('Name: ' + localName);
            console.log('UUID: ' + deviceUUID);

            var config = require('home-config').load('.sphero', {
                NAME: localName,
                ADDR: deviceUUID
            });

            config.save();

            console.log('Saved config file, you can now ctrl+c this task');

        } else {
            console.log('\nThis isn\'t the droid you are looking for');
            console.log('Name: ' + peripheral.advertisement.localName);
            console.log('UUID: ' + peripheral.uuid);
        }

    });

};
