const User = require('./userModel');
const _ = require('lodash');
const {
  signToken,
} = require('../../auth/auth');

exports.params = (req, res, next, id) => {
  User.findById(id)
    .select('-password')
    .then((user) => {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getOne = (req, res) => {
  const {
    user,
  } = req;
  res.json(user);
};

exports.put = (req, res, next) => {
  const {
    user,
    body: update,
  } = req;
  _.merge(user, update);
  user.save()
    .then((saved) => {
      res.json(saved);
    })
    .catch((err) => {
      next(err);
    });
};

exports.post = (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save()
    .then((saved) => {
      const token = signToken(saved._id);
      res.json({
        token,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.delete = (req, res, next) => {
  req.user.remove()
    .then((removed) => {
      res.json(removed);
    })
    .catch((err) => {
      next(err);
    });
};

exports.me = (req, res) => {
  res.json(req.user.toJson());
};
