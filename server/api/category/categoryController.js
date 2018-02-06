const Category = require('./categoryModel');
const _ = require('lodash');

exports.params = (req, res, next, id) => {
  Category.findById(id)
    .then((category) => {
      if (!category) {
        next(new Error('No category with that id'));
      } else {
        req.category = category;
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  Category.find({})
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getOne = (req, res) => {
  const {
    category,
  } = req;
  res.json(category);
};

exports.put = (req, res, next) => {
  const {
    category,
    body: update,
  } = req;
  _.merge(category, update);
  category.save()
    .then((saved) => {
      res.json(saved);
    })
    .catch((err) => {
      next(err);
    });
};

exports.post = (req, res, next) => {
  const newcategory = req.body;
  Category.create(newcategory)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      next(err);
    });
};

exports.delete = (req, res, next) => {
  req.category.remove()
    .then((removed) => {
      res.json(removed);
    })
    .catch((err) => {
      next(err);
    });
};
