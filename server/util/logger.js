// No const/let/var needed her as colors will be attached to
// to String.prototype

require("colors");
const _ = require("lodash");
const config = require("../config/config.js");

//create a noop (NO OPeration) function for whenever loggin is disabled
const noop = function() {};

/*
 * Check if loggin is enabled in the config
 * If it is, then use console.log
 * If not use noop
 */

const consoleLog = config.logging ? console.log.bind(console) : noop;

const logger = {
  log: function() {
    // arguments is an array like object with the passed in
    // arguments to this function
    const args = _.toArray(arguments)
      .map(arg => {
        if (typeof arg === 'object') {
          // Turn the object to string so we can log all the
          // properties and color it
          const string = JSON.stringify(arg, 2);
          return string.magenta;
        } else {
          arg += "";
          return arg.magenta;
        }
      });

    // Call either console.log or noop her with the console
    // object as the context and the new colored args
    consoleLog.apply(console, args);
  }
};

module.exports = logger;
