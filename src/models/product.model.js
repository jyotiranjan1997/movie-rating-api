const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  Title: String,
  image: String,
  rating: String,
  year: String,
  user: String,
});

const MovieModel = mongoose.model("product", noteSchema);

module.exports = { MovieModel};
