const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
// middlewares
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/user", userRouter);
app.listen(PORT, () => {
  console.log("Listen on Port :- ", PORT);
});
