const { Router } = require("express");
const router = Router();
const userMiddleware = require("../Middlewares/user");
const { User } = require("../Database/db");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
require("dotenv").config();
const { createUser } = require("../ZodSchema/zod");

router.post("/signup", async (req, res) => {
  const createPayload = req.body;
  console.log(createPayload)
  const parsePayload = createUser.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(411).json({
      msg: "You sent the wrong input",
    });
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({
    username,
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
    username,
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
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username, password });

  if (user) {
    const token = jwt.sign(
      {
        user,
      },
      process.env.SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(411).json({
      message: "Incorrect username or password",
    });
  }
});

router.get("/allUser", userMiddleware, async (req, res) => {
  const allUser = await User.find({});

  res.json({
    allUser,
  });
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const id = req.params.userId;

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

module.exports = router;
