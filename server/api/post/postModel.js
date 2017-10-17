const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: "categories"
  }]
});

module.exports = mongoose.model("posts", PostSchema);
