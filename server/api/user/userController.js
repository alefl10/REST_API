const User = require("./userModel");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/Lynda', {
    useMongoClient: true,
  })
  .then(db => {
    console.log("Connected to mongoDB!!");
  })
  .catch(err => {
    console.log(err);
  });

exports.params = (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        next(new Error("No user with that id"));
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => next(err));
};

exports.get = (req, res, next) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
  const user = req.user;
  res.json(user);
};

exports.put = (req, res, next) => {
  const user = req.user;
  const update = req.body;

  _.merge(user, update);

  user.save()
    .then(saved => res.json(saved))
    .catch(err => next(err));
};

exports.post = (req, res, next) => {
  const newUser = req.body;

  User.create(newUser)
    .then(user => {
      res.json(user);
    })
    .catch(err => next(err));
};

exports.delete = (req, res, next) => {
  req.user.remove()
    .then(removed => res.json(removed))
    .catch(err => next(err));
}
