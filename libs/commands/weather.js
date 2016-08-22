var WeatherFactory = require('../services/open-weather');

module.exports = function (sphero, options) {

    if (process.env.WEATHER_KEY || options.accessToken) {
        var weatherRequester = WeatherFactory({
            accessToken: options.accessToken || process.env.WEATHER_KEY,
            city: options.city || 'manchester',
            country: options.country || 'uk'
        });

        console.log('Rain Rain go away, come back another day!');

        // Every 10 seconds, lets poll the weather
        setInterval(function () {

            weatherRequester(function (error, weatherData) {

                if (!error && weatherData) {

                    if (weatherData.main.temp >= 8) {
                        sphero.color('yellow');
                    } else if (weatherData.main.temp >= 20) {
                        sphero.color('orange');
                    } else if (weatherData.main.temp >= 25) {
                        sphero.color('red');
                    } else {
                        sphero.color('blue');
                    }

                }
            });

        }, 10000);

    } else {
        console.log('WEATHER_KEY env for openweather is not present');
    }

};
