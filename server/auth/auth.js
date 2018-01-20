let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let config = require('../config/config');
let checkToken = expressJwt({
  secret: config.secrets.jwt
});
let User = require('../api/user/userModel');

exports.decodeToken = function() {
  return function(req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attach
    // the decoded token to req.user
    checkToken(req, res, next);
  };
};

exports.getFreshUser = function() {
  return function(req, res, next) {
    console.log("Getting Fresh Usser");
    // we'll have access to req.user here because we'll use decodeToken in before
    // this function in the middleware stack.
    // req.user will just be an object with the user id on it.
    User.findById(req.user._id)
      .then(user => {
        // If no user is found, it was a valid JWT but didn't decode
        // to a real user in our DB. Either the user was deleted
        // since the client got the JWT, or it was a JWT from some other source
        if (!user) {
          res.status(401).send("Unauthorized Access");
        } else {
          // update req.user with fresh user from the
          // stale token data
          req.user = user;
          next();
        }
      })
      .catch(err => {
        next(err);
      })
  }
};

exports.verifyUser = function() {
  return function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    //Send response if no username or password
    if (!username || !password) {
      res.status(400).send('You need a username and password');
      return;
    }

    // look user up in the DB so we can check
    User.findOne({
        username: username
      })
      .then(user => {
        // if the passwords match for the username
        if (!user) {
          res.status(401).send("No user was found with the given username");
        } else {
          // Passing in the posted password, it will hash the
          // password the same way as the current passwords got hashed
          if (!user.authenticate(password)) {
            res.status(401).send("Wrong password");
          } else {
            console.log("Username and Password --> OK");
            //Both username and password are valid
            //Attach user to req.user
            req.user = user
            next();
          }
        }
      })
      .catch(err => {
        next(err);
      })



  };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
  return jwt.sign({
      _id: id
    },
    config.secrets.jwt, {
      expiresIn: config.expireTime
    }
  );
};
