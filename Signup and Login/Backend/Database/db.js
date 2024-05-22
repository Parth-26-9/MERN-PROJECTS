const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URL);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
