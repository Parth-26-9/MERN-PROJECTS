const { Router } = require("express");
const router = Router();
const { Product } = require("../Database/db");
const express = require("express");
const buffer = require("buffer");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image (JPG, JPEG or PNG)."));
    }
    cb(null, true);
  },
});

router.post("/createProduct", upload.array("img"), async (req, res) => {
  try {
    const { productId, title, desc, color, price, qty } = req.body;

    if (!title || !desc) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }


    const newProduct = new Product({
      productId,
      title,
      desc,
      img: req.files.map((file) => {
        const base64Image = `data:image/jpeg;base64,${file.buffer.toString(
          "base64"
        )}`;
        return base64Image;
      }),
      color,
      price,
      qty,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
router.get("/products/:productId", async (req, res) => {
  const product = await Product.findOne({ productId: req.params.productId });
  console.log(req.params.productId);
  res.json(product);
});

router.put("/products/:id", async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedProduct);
});

router.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
});

module.exports = router;
