const _ = require("lodash");

//Default config object for our api
const config = {
  dev: "development",
  test: "testing",
  prod: "production",
  port: process.env.PORT || 3000
};

//check to see if the NODE_ENV was set, set it to dev otherwise
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

//set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;

/* TODO:
* envConfig is nothing right now, but it should be an object.
* Depending on whatever config.env is, load the appropiate file
* add/assign the value to envConfig so that the meger at the bottom
* actually works.
* What is happening here is that we have a base config in this file
* we conditionally load in another config file depending o what env
* env we are in. We then merge those objects with the env config
* overwriting the default config if here.
* We then export the new objectfor our app to use
*/

/*
* require could error out if the does not exist so let's try the
* followin statement and fall back to an empty object if it actually
* errors out
*/
let envConfig;
try {
  envConfig = require(`./${config.dev}`);
  // Just making sure the require got something (file) back
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}



module.exports = _.merge(config, envConfig);
