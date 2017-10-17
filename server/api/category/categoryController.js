const Category = require("./categoryModel.js");
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
  Category.findById(id)
    .then(category => {
      if (!category) {
        next(new Error("No category with that id"));
      } else {
        req.category = category;
        next();
      }
    })
    .catch(err => next(err));
};

exports.get = (req, res, next) => {
  Category.find({})
    .then(categories => res.json(categories))
    .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
  const category = req.category;
  res.json(category);
};

exports.put = (req, res, next) => {
  const category = req.category;
  const update = req.body;
  _.merge(category, update);
  category.save()
    .then(saved => res.json(saved))
    .catch(err => next(err));
};

exports.post = (req, res, next) => {
  const newCategory = req.body;
  Category.create(newCategory)
    .then(category => res.json(category))
    .catch(err => next(err));
};

exports.delete = (req, res, next) => {
  req.category.remove()
    .then(removed => res.json(removed))
    .catch(err => next(err));
}
