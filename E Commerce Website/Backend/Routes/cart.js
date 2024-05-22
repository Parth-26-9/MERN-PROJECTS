const express = require("express");
const router = express.Router();
const Cart = require("../Database/db");
const Product = require("../Database/db");

router.post("/carts/:productId", async (req, res) => {
  const productId = req.params.productId;

  const myProduct = await Product.Product.find({ productId: productId });

  const productInCart = await Cart.Cart.find({
    productId: myProduct[0].productId,
  });

  if (productInCart.length > 0) {
    productInCart.forEach(async (cartItem) => {
      cartItem.qty = cartItem.qty + 1;
      await cartItem.save();
    });
  } else {
    try {
      const newCartItem = new Cart.Cart({
        img: myProduct[0].img[0][0],
        productId: myProduct[0].productId,
        productName: myProduct[0].title,
        qty: myProduct[0].qty,
        color: myProduct[0].color,
        Price: myProduct[0].price,
      });

      const savedCartItem = await newCartItem.save();

      res.status(201).json(savedCartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

router.get("/cartItem", async (req, res) => {
  const cart = await Cart.Cart.find({});

  res.status(200).json({
    cart,
  });
});
router.delete("/carts/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const myProduct = await Product.Product.find({ productId: productId });

    const productInCart = await Cart.Cart.find({
      productId: myProduct[0].productId,
    });

    if (productInCart.length > 0) {
      productInCart.forEach(async (x) => {
        x.qty = x.qty - 1;
        await x.save();
      });

      if (productInCart.length === 1 && productInCart[0].qty <= 0) {
        await Cart.Cart.deleteOne({ productId: productInCart[0].productId });
      }
    }

    res.status(200).json({ msg: "Product Delete Successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
