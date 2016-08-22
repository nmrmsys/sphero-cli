var TwitterClient = require('../services/twitter'),
    _ = require('lodash'),
    alreadyTriggeredTweets = {};

function getLatestStatus(tweets) {

    if(tweets && !tweets.errors) {

        var latestTweet = tweets.statuses[0];

        if(alreadyTriggeredTweets[latestTweet.id_str]) {
            return false;
        }

        alreadyTriggeredTweets[latestTweet.id_str] = true;

        return tweets.statuses[0];
    }

    return false;

}

var executeTwitterCommand = function (sphero, options) {

    var twitter = TwitterClient(options),
        hashTag = options.hashTag || 'spherocode';

    twitter.get('search/tweets', {q: hashTag}, function (error, tweets) {
        
        var latestStatus = getLatestStatus(tweets);

        if(latestStatus) {

            var command = _.trim(_.replace(_.replace(latestStatus.text, /#/g, ''), hashTag, '')),
                user = latestStatus.user;

            console.log('Twitter Command issued by: ', user.name + ' (' + user.screen_name + ')');
            console.log('Issued command: ', command);

            require('./commands/' + command)(sphero);
        }
    });
};

module.exports = function (sphero, options) {
    var intervalDelay = options.delay || 10000;

    console.log('Let\'s get tweets!');

    var commanderExecuter = _.partial(executeTwitterCommand, sphero, options);

    commanderExecuter();

    setInterval(function () {
        commanderExecuter();
    }, intervalDelay);
};



