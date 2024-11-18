const express = require("express");
const router = express.Router();
const { getWalletBallence } = require("../controllers/wallet");
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");

router.get("/get-balance", authorization, authentication, getWalletBallence);

module.exports = router;
