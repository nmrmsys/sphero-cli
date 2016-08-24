# sphero-cli
A Node CLI Tool for Sphero Robot using the [Sphero official Javascript SDK](https://github.com/orbotix/sphero.js)

This project forked [mintuz/BB8-Commander](https://github.com/mintuz/BB8-Commander), and added below features
* `node index.js <command>` shortcuts `sphero <command>` script 
* setup --rfcomm option for old-type Sphero
* send to native command from commandline prompt

# Install
Not yet on npm so you'll have to do it the good'ol fasioned way with a cheeky git clone

* `git clone https://github.com/nmrmsys/sphero-cli.git`
* `npm -g install`
* `sphero setup`
* Use commands below

# Commands

### Utility Commands
* `sphero setup [--rfcomm <device-file>]` - save your Sphero connecting address to config for future reference
* `sphero disconnect` - disconnect from your Sphero

### Action Commands
* `sphero <native_command> [params...]` - send native command to Sphero
* `sphero disco` - turn Sphero into a shining disco ball in the night
* `sphero roll` - make Sphero Randomly roll in any direction.
* `sphero desk-buddy` - keep you company whilst working at desk. Place in it's charging station to watch its head move round randomly.
* `sphero weather --city="manchester" --country="uk" --api-key="ABCD"` - turn Sphero into weather reporter, uses OpenWeather so be sure to get your own API key
* `sphero tweet --hash-tag="mysphero" --delay=5000` - search twitter and run the first hashtag it finds as a command. Eg a tweet "#disco #mysphero" would run the `disco` command --consumer-key xxx --consumer-secret xxx --access-token-key xxx --access-token-secret xxx
* `sphero power` - get details of the battery state.
* `sphero drive` - enable you to take input from the keyboard and 'drive' your Sphero with the arrow keys.
* `sphero express --port=4000` - run an express server which has a single POST endpoint which you can send a JSON object to. See below for more details.
* `sphero dance` - turn Sphero into a shining dancing ball in the night
* `sphero gestures` - Some gestures for Sphero
* `sphero drive` - accept keyboard input--use arrow keys

### Express Server

Having the ability to run an Express server to issue commands to the Sphero opens up a bunch of possibilities. One of the main benefits of having an Express server is that you can integrate into [IFTTT](https://ifttt.com/) and at that point, you have entered the Internet of things.

To get started is really easy, all you need to do is run `sphero express --port=4000` adn once your Sphero is connected, an Express server will be started.

You can then send commands directly to it via a POST request. It supports any SpheroSDK command as well as custom commands we have created. See below for some examples.

### Native Commands

With native commands, the response body will include information the Sphero exposes once that command has been executed. Read the Sphero documentation on what data it returns. http://sdk.sphero.com/community-apis/javascript-sdk/

#### Running the `color` command

Post Request - localhost:3000/

Request Body

```
{
  "mode":"sphero",
  "command":"color",
  "value": "yellow"
}
```

#### Running the `roll` command

Post Request - localhost:3000/

Request Body

```
{
  "mode":"sphero",
  "command":"roll",
  "value": [130, 50]
}
```

With this request, we are passing an array and that's because the roll command in Sphero SDK requires multiple parameters. This is just a simple way to pass those values to that command.

### Custom Commands

#### Running the `disco` command

Post Request - localhost:3000/

Request Body

```
{
  "mode":"custom",
  "command":"disco"
}
```

#### Running the `tweet` command

POST Request - localhost:3000/

Request Body

```
{
  "mode":"custom",
  "command":"tweet",
  "value": {
    "delay": 30,
    "consumerKey": "YOUR_CONSUMER_KEY",
    "consumerSecret": "YOUR_CONSUMER_SECRET",
    "accessTokenKey": "YOUR_ACCESS_TOKEN_KEY",
    "accessTokenSecret": "YOUR_ACCESS_TOKEN_SECRET"
  }
}
```

Obviously you wouldn’t pass your OAuth information like this (sphero-cli supports environment variables for secure data) but the important thing to note here is, anything that can be passed to the CLI tool can also be passed into the express server endpoint.

A suite difference between native commands and custom commands is that native commands that require multiple parameters will be passed as an array whilst custom commands will be objects. The reason for this is custom commands are key value pairs due to them sharing the same code as the CLI tool.

# Examples
* [How to have Hubot talk to Sphero using Express Server](https://medium.com/@saraford/how-to-have-hubot-in-slack-send-commands-to-bb-8-700d2f3c953d) by [@saraford](https://github.com/saraford)

## Licence
[MIT](http://opensource.org/licenses/mit-license.php)

## Author
[nmrmsys](https://github.com/nmrmsys)
