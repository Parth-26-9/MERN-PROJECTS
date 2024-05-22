const express = require("express");
const router = express.Router();
const Cart = require("../Database/db");
const Product = require("../Database/db");
const User = require("../Database/db");
const twilio = require("twilio");
const accountSID = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSID, authToken);

const sendMessage = async (number, cartMessage) => {
  try {
    const message = await client.messages.create({
      body: cartMessage,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${number}`,
    });
    console.log("Cart information sent to WhatsApp successfully:", message.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
};

router.post("/input", async (req, res) => {
  const message = req.body;
  const key = message.inputValue;
  const number = message.number;

  if (key === "remove 1 product from cart") {
    try {
      const cart = await Cart.Cart.find({});
      const result = await Cart.Cart.deleteOne({
        productId: cart[0].productId,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  } else if (key === "add iphone 14 Pro Max product") {
    try {
      const images = [
        "https://swisscomvbc.scene7.com/is/image/Swisscom/scs-11059307-de-180?wid=400&hei=400&fmt=webp-alpha&qlt=90",
        "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.og.jpg?202405161729",
        "https://www.notebookcheck.net/uploads/tx_nbc2/AppleiPhone14Pro__1__01.JPG",
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MPU73?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1678830616240",
      ];

      const newProduct = new Product.Product({
        productId: 10,
        title: "Iphone 14 Pro Max",
        desc: "The iPhone 14 Pro Max is Apple's most powerful phone with a stunning display, pro camera system, and long battery life.",
        img: images,
        color: "Black",
        price: "50000",
        qty: "1",
      });

      const savedProduct = await newProduct.save();
      console.log(savedProduct);
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "An error occurred" }); // Send a generic error response
    }
  } else if (key === "send me current cart information") {
    try {
      const cart = await Cart.Cart.find({});
      if (cart.length === 0) {
        const cartMessage = "Your cart is currently empty.";
        res.status(200).json({ message });
        return;
      }
      let cartMessage = "";

      for (const item of cart) {
        cartMessage += `- ${item.productName}  (Quantity: ${item.qty})\n`;
      }
      await sendMessage(number, cartMessage);
      res.status(200).json({ message: "Cart information sent!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else if (key === "send about me") {
    try {
      const userInfo = await User.User.find({});

      let userMessage = "";
      let myName = "";
      for (let i = 0; i < userInfo[0].email.length; i++) {
        if (userInfo[0].email.charAt(i) === "@") {
          break;
        } else {
          myName += userInfo[0].email.charAt(i);
        }
      }

      userMessage += `Hi ${myName} Your Email Id is :- ${userInfo[0].email}`;

      await sendMessage(number, userMessage);
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = router;
