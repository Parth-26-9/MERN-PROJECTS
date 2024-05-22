const { Router } = require("express");
const router = Router();
const userMiddleware = require("../Middleware/md");
const { User } = require("../Database/db");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createUser } = require("../ZodSchema/zod");
const nodemailer = require("nodemailer");

router.post("/signup", async (req, res) => {
  const createPayload = req.body;
  console.log(createPayload);
  const parsePayload = createUser.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(411).json({
      msg: "You sent the wrong input",
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    res.json({
      message: "User already exists",
    });
    return;
  }

  const lastUserId = await User.findOne().sort({ userId: -1 }).limit(1);
  const myUserId = lastUserId ? lastUserId.userId + 1 : 1;

  const newUser = new User({
    userId: myUserId,
    email,
    password,
  });

  try {
    await newUser.save();
    res.json({
      message: "User Created Successfully!!",
      data: newUser,
    });
  } catch (error) {
    console.log("Error saving new user", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email, password });

  if (user) {
    const token = jwt.sign(
      {
        user,
      },
      process.env.JWT_SERVER
    );

    res.json({
      token,
    });
  } else {
    res.status(411).json({
      message: "Incorrect email or password",
    });
  }
});

router.get("/allUser", async (req, res) => {
  
  const allUser = await User.find({});

  res.json({
    allUser,
  });
});

router.delete("/deleteUser/:_id", userMiddleware, async (req, res) => {
  const id = req.params._id;

  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if (deleteUser) {
      res.json({
        msg: "Delete Successfully",
      });
    } else {
      res.status(404).json({
        msg: "User not found",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/forgetPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    const secret = process.env.JWT_SERVER + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, _id: oldUser._id }, secret);
    const oldUserId = oldUser._id;
    if (!oldUser) {
      return res.send("User not exists!");
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "parthbhatti867@gmail.com",
        pass: "tvnt gjrn nynx xspp",
      },
    });

    transporter
      .sendMail({
        to: "parthbhatti562@gmail.com",
        subject: "Forget Password Link!",
        html: `http://localhost:5173/reset-password/${oldUserId}/${token}`,
      })
      .then(() => {
        console.log("Email Sent");
      })
      .catch((err) => {
        console.log(err);
      });

    res.json({
      msg: "Success!",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/reset-password/:_id/:token", async (req, res) => {
  const { _id, token } = req.params;

  try {
    const { password } = req.body;

    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid password format" });
    }

    const oldUser = await User.findOne({ _id: _id });

    if (!oldUser) {
      return res.json({ status: "User Not Exists!" });
    }

    const secret = process.env.JWT_SERVER + oldUser.password;

    const verify = jwt.verify(token, secret);

    if (verify) {
      oldUser.password = password;
      await oldUser.save();

      return res.json({ status: "Password Updated Successfully" });
    }
  } catch (error) {
    console.error("Error is :- ", error);
    res.status(400).send("Error resetting password");
  }
});

module.exports = router;
