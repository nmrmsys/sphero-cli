var program = require('commander'),
    packageFile = require('./package.json'),
    executeCommand = require('./libs/execute-command'),
    command, params;

program.version(packageFile.version);

// Utility Actions

program
    .command('setup')
    .description('setup your Sphero with PC')
    .option('--rfcomm <device-file>', 'old-type Sphero setup')
    .action(function (options) {
        require('./libs/commands/setup')(options.rfcomm);
    });

program
    .command('disconnect')
    .description('disconnect from your Sphero')
    .action(function () {
        executeCommand('disconnect');
    });

// Real Actions

program
    .command("dance")
    .description("dance dance Sphero")
    .action(function () {
        executeCommand("dance");
    });

program
    .command('disco')
    .description('make Sphero A disco ball')
    .action(function () {
        executeCommand('disco');
    });

program
    .command('weather')
    .description('get the weather colour from Sphero')
    .option('-c, --city <city>', 'City name such as manchester')
    .option('-cc, --country <country>', 'Country name such as uk')
    .option('-t, --access-token <accessToken>', 'API Key')
    .action(function(options) {
        executeCommand('weather', options);
    });

program
    .command('github')
    .description('get notifications of new issues and PRs')
    .option('-t, --access-token <accessToken>', 'API Key')
    .action(require('github'));

program
    .command('roll')
    .description('Sphero will roll!')
    .action(function () {
        executeCommand('roll');
    });

program
    .command('tweet')
    .description('Sphero will respond to tweets!')
    .option('-#, --hash-tag <hashTag>', 'Hashtag to search for. Defaults to "#to_sphero"')
    .option('-d, --delay <delay>', 'Interval delay for retrieving new tweets. Defaults to 10000')
    .option('--consumer-key <consumerKey>', 'Twitter api consumer key')
    .option('--consumer-secret <consumerSecret>', 'Twitter api consumer secret')
    .option('--access-token-key <accessTokenKey>', 'Twitter api access token key')
    .option('--access-token-secret <accessTokenSecret>', 'Twitter api access token secret')
    .action(function (options) {
        executeCommand('tweet', options);
    });

program
    .command('express')
    .description('setup express server')
    .option('-p, --port <port>', 'Port to run express on. Defaults to 3000')
    .action(function (options) {
        executeCommand('express', options);
    });

program
  .command('desk-buddy')
  .description('keep you company whilst working at desk. Place Sphero in the charging station.')
  .action(function (options) {
      executeCommand('desk-buddy');
  });

program
    .command('power')
    .description('get the power state of the Sphero')
    .action(function (options) {
        command = 'power';
        executeCommand('power');
    });

program
  .command('gestures')
  .description('Some gestures for Sphero')
  .action(function (options) {
    executeCommand('gestures');
  });

program
  .command('drive')
  .description('accept keyboard input--use arrow keys')
  .action(function (options) {
    executeCommand('drive');
  });

program
    .command('* [params...]')
    .description('send native command to Sphero')
    .action(function (args) {
        executeCommand('native', args);
    });

try {
    program.parse(process.argv);
    if (process.argv.length == 2) {
        program.outputHelp();
    }
} catch (e) {
    console.error(e);
}
