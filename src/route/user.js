const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyOtp,
  addPassword,
  resendOtp,
  Login,
} = require("../controllers/user");

router.post("/register", createUser);
router.patch("/verify-otp/:email/:otp", verifyOtp);
router.patch("/add-password", addPassword);
router.post("/resend-otp/:email", resendOtp);
router.post("/login", Login);
module.exports = router;
