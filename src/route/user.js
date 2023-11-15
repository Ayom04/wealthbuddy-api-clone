const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyOtp,
  addPassword,
  resendOtp,
  getUserProfile,
  Login,
} = require("../controllers/user");
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");

router.post("/register", createUser);
router.patch("/verify-otp/:email/:otp", verifyOtp);
router.patch("/add-password", addPassword);
router.post("/resend-otp/:email", resendOtp);
router.post("/login", Login);
router.get("/get-profile", authorization, authentication, getUserProfile);
module.exports = router;
