const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.url);

const dataSchema = new mongoose.Schema({
  dataId: Number,
  quote: String,
});

const quoteData = mongoose.model("quoteData", dataSchema);

module.exports = {
  quoteData,
};
