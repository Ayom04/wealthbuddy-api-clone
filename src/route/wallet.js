const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");

router.post("/go");

module.exports = router;
