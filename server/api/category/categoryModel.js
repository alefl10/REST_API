const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model("categories", CategorySchema);
