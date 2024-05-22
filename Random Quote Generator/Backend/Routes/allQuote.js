const express = require("express");
const app = express();
const { Router } = require("express");
const router = Router();
const { zodSchema } = require("../ZodSchema/zod");
const { quoteData } = require("../Database/db");
// app.use(express.json());

router.get("/allData", async (req, res) => {
  const allData = await quoteData.find({});

  res.json({
    allData,
  });

  
});
router.get("/allData/:dataId", async (req, res) => {
  const dataId = req.params.dataId; // Fix: Specify the parameter you want to extract

  const myQuote = await quoteData.findOne({
    dataId: parseInt(dataId),
  });

  if (myQuote) {
    res.json({
      myQuote,
    });
  } else {
    res.status(404).json({
      message: "Quote not found",
    });
  }
});

router.post("/allData", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = zodSchema.safeParse(createPayload);
  const dataId = req.body.dataId;
  const quote = req.body.quote;
  if (!parsePayload.success) {
    res.status(411).json({
      msg: "You sent wrong input",
    });
    return;
  }

  const findQuoteId = await quoteData.findOne({
    dataId,
  });
  const findQuoteData = await quoteData.findOne({
    quote,
  });

  if (findQuoteId && findQuoteData) {
    res.json({
      msg: "This quote is already exist",
    });
    return;
  }

  // this lines hold the latest quote id which add latest in database
  const lastQuoteId = await quoteData.findOne().sort({ dataId: -1 }).limit(1);
  // this line check if there is id then +1 else 1
  const myQuoteId = lastQuoteId ? lastQuoteId.dataId + 1 : 1;

  const newQuote = new quoteData({
    dataId: myQuoteId,
    quote,
  });

  await newQuote.save();

  try {
    res.json({
      msg: "Quote Added Successfully",
      data: newQuote,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
