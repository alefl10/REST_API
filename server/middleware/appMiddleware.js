const morgan = require("morgan");
const bodyParser = require("body-parser");

//Setup global middleware
module.exports = app => {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
};
