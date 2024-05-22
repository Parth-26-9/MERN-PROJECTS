const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const accountSID = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const twilio = require("twilio");
const client = twilio(accountSID, authToken);

const sendMessage = async (req, res) => {
  try {
    client.messages
      .create({
        body: req.body.message,
        from: "whatsapp:+14155238886",
        to: `whatsapp:+91${req.body.to}`,
      })
      .then((message) => console.log("Message sent successfully"));
    return res
      .status(200)
      .json({ success: true, msg: "Message sent successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

app.post("/whatsApp", (req, res) => {
  sendMessage(req, res);
});

module.exports = sendMessage;
