const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const allQuote = require('./Routes/allQuote')
app.use(express.json())
app.use(
  cors()
);
app.use("/quote", allQuote);
app.listen(PORT, () => {
  console.log("Listen on port :- ", PORT);
});
