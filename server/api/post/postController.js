const Post = require('./postModel');
const _ = require('lodash');
const logger = require('../../util/logger');

exports.params = (req, res, next, id) => {
  Post.findById(id)
    .populate('author', 'username')
    .exec()
    .then((post) => {
      if (!post) {
        next(new Error('No post with that id'));
      } else {
        req.post = post;
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  Post.find({})
    .populate('author categories')
    .exec()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getOne = (req, res) => {
  const {
    post,
  } = req;
  res.json(post);
};

exports.put = (req, res, next) => {
  const {
    post,
    body: update,
  } = req;
  _.merge(post, update);
  post.save()
    .then((saved) => {
      res.json(saved);
    })
    .catch((err) => {
      next(err);
    });
};

exports.post = (req, res, next) => {
  const {
    body: newPost,
  } = req;
  Post.create(newPost)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.delete = (req, res, next) => {
  req.post.remove()
    .then((removed) => {
      res.json(removed);
    })
    .catch((err) => {
      next(err);
    });
};
