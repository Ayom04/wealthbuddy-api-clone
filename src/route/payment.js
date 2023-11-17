const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");
const { completeWalletFunding } = require("../controllers/payment");
router.post(
  "/start-payment",
  authorization,
  authentication,
  completeWalletFunding
);

module.exports = router;
