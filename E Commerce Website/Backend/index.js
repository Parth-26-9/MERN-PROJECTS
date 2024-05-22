const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const userRouter = require("./Routes/user");
const userProduct = require("./Routes/product");
const userCart = require("./Routes/cart");
const userAddress = require("./Routes/address")
const userMessage = require("./WhatsApp/wap")
const bodyParser = require("body-parser");
const userMagicInput = require("./MagicalInput/mg")
const path = require("path");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.use("/user", userRouter);
app.use("/product", userProduct);
app.use("/cart", userCart);
app.use("/address",userAddress)
app.use("/sendMessage",userMessage)
app.use("/magic",userMagicInput)

app.listen(PORT, () => {
  console.log("Listen on Port :- ", PORT);
});
