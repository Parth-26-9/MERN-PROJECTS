const express = require("express");
const router = express.Router();
const Address = require("../Database/db");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`);
  },
});

const upload = multer({ storage });

router.post("/createAddress", upload.none(), async (req, res) => {
  try {
    const { firstName, lastName, country, street, city, pincode, state } =
      req.body;

    console.log(req.body);

    const newAddress = new Address.Address({
      firstName,
      lastName,
      country,
      street,
      city,
      pincode,
      state,
    });

    const savedAddress = await newAddress.save();

    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getExtension(mimetype) {
  const parts = mimetype.split("/");
  return parts[parts.length - 1];
}

router.get("/address", async (req, res) => {
  const data = await Address.Address.find({});

  res.status(200).json({
    data,
  });
});

module.exports = router;
