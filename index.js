/*
* Entry point to our server.
* PRO-TIP: If you have an index.js file on the root of a folder
* in node you can just require that folder and node will
* automatically require the index.js on the root
*/

//Setup config first before anything by requiring it
const config = require("./server/config/config.js");
const app = require("./server/server.js");

/*
* Logger is a wrapper around console.log that adds color,
* logs object as json and can bbe conditionally turned off
* so you don't have to erase calls to it
*/
const logger = require("./server/util/logger.js");

app.listen(config.port);
logger.log(`Listening on http://localhost:${config.port}`);
