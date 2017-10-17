const express = require("express");
const app = express();
const api = require("./api/api.js"); //This is a router
const error = require("./middleware/errorHandler.js");

//Setup app's middleware
require("./middleware/appMiddleware")(app);

//Setup the api
app.use("/api", api);

//Set up global error handling
app.use(error());

//Export the app for testing
module.exports = app;
