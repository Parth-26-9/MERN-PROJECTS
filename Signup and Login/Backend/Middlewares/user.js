const { User } = require("../Database/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];
  try {
    const decodeValue = jwt.verify(jwtToken, process.env.JWT_SERVER);
    if (decodeValue) {
      next();
    } else {
      return res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (error) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
}

module.exports = userMiddleware;
