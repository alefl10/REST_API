const Post = require("./postModel.js");
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
  })

exports.params = (req, res, next, id) => {
  Post.findById(id)
    .populate("author categories")
    .then(post => {
      if (!post) {
        next(new Error("No post with that id"));
      } else {
        req.post = post;
        next();
      }
    })
    .catch(err => next(err));
};

exports.get = (req, res, next) => {
  Post.find({})
    .populate("author categories")
    .then(posts => res.json(posts))
    .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
  const post = req.post;
  res.json(post);
};

exports.put = (req, res, next) => {
  const post = req.post;
  const update = req.body;
  _.merge(post, update);

  post.save()
    .then(saved => res.json(saved))
    .catch(err => next(err));
}

exports.post = (req, res, next) => {
  const newPost = req.body;
  Post.create(newPost)
    .then(post => {
      res.json(post);
    })
    .catch(err => next(err));
}

exports.delete = (req, res, next) => {
  req.post.remove()
    .then(removed => {
      res.json(removed);
    })
    .catch(err => next(err));
}
