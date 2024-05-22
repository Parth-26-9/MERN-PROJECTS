const mongoose = require("mongoose");
const { string } = require("zod");
require("dotenv").config();

mongoose.connect(process.env.URL);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    productId: { type: Number },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: [{ type: Array, required: true, unique: true }],
    color: { type: String },
    price: { type: Number },
    qty: { type: Number },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
});

const addressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    country: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

const cartSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    productId: {
      type: String,
    },
    productName: {
      type: String,
    },
    qty: {
      type: Number,
    },
    color: {
      type: String,
    },
    Price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const Cart = mongoose.model("Cart", cartSchema);
const Address = mongoose.model("Address", addressSchema);

module.exports = {
  User,
  Product,
  Order,
  Cart,
  Address,
};
