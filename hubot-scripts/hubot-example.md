### How to have Hubot send commands to Sphero

These steps assume you have a working Express server connection with Sphero and a [local working copy of Hubot](https://hubot.github.com/docs/)

1. Start the Express server `node index.js express --port=4000`
2. Do a couple of `curl` commands to keep the connection to Sphero active, e.g. `curl -v -H "Content-Type: application/json" -X POST -d '{"mode":"sphero","command":"color","value": "yellow"}' http://localhost:4000` 
3. From your local hubot prompt, run the sphero.js scripts, e.g. `test-bot> test-bot ask sphero to turn green`
