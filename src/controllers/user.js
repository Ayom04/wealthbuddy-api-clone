const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const {
  serverError,
  createUserMessage,
  invalidOtp,
  errorSendingOtp,
  userExists,
  otpMismatch,
  userVerified,
  errorResendingOtp,
  passwordSaved,
  serviceUnavailable,
  invalidEmail,
  passwordExists,
  loginMessage,
  userNotFound,
  invalidCredentials,
  emailHasNotBeenVerified,
} = require("../constant/messages");
const models = require("../../models");
const {
  hashPassword,
  generateOtp,
  comparePassword,
} = require("../utils/helper");
const {
  validateCreateAccount,
  validatePassword,
  validateLogin,
} = require("../validation/user");
const { redisClient } = require("../../config/redis");
const createUser = async (req, res) => {
  const { firstName, lastName, email, phone_number, referral_code } = req.body;
  try {
    const { error, value } = validateCreateAccount(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);

    const checkIfUserExist = await models.Users.findOne({
      where: {
        email,
        phone_number,
      },
    });

    if (checkIfUserExist) throw new Error(userExists);

    const _otp = generateOtp(6);
    const cachedOtp = await redisClient.set(email, JSON.stringify(_otp), {
      EX: 60 * 10,
    });
    if (cachedOtp != "OK") throw new Error(errorSendingOtp);
    await models.Users.create({
      user_id: uuidv4(),
      lastName,
      firstName,
      phone_number,
      email,
      referral_code,
    });

    res.status(200).json({
      status: true,
      message: createUserMessage,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const addPassword = async (req, res) => {
  const { password, comfirmPassword, email } = req.body;
  console.log(email);
  try {
    const { error, value } = validatePassword(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);
    const isEmailValid = await models.Users.findOne({
      where: {
        email: email,
      },
    });
    if (!isEmailValid) throw new Error(invalidEmail);

    if (isEmailValid.password_hash || isEmailValid.password_salt)
      throw new Error(passwordExists);

    const { hash, salt } = await hashPassword(password);

    await models.Users.update(
      { password_hash: hash, password_salt: salt },
      {
        where: {
          email,
        },
      }
    );

    res.status(200).json({
      status: true,
      message: passwordSaved,
    });
  } catch (error) {
    res.status(400).json({
      ststus: false,
      message: error.message || serverError,
    });
  }
};
const verifyOtp = async (req, res) => {
  const { otp, email } = req.params;

  try {
    const checkIfUserIsVerified = await models.Users.findOne({
      where: { is_verified: true, email: email },
    });

    if (checkIfUserIsVerified) throw new Error(serviceUnavailable);
    const cachedOtp = await redisClient.get(email);
    console.log(cachedOtp);
    if (!cachedOtp) throw new Error(invalidOtp);
    if (cachedOtp !== otp) throw new Error(otpMismatch);
    await models.Users.update(
      { is_verified: true },
      {
        where: {
          email,
        },
      }
    );
    res.status(200).json({
      status: true,
      message: userVerified,
    });
  } catch (error) {
    res.status(400).json({
      ststus: false,
      message: error.message || serverError,
    });
  }
};
const resendOtp = async (req, res) => {
  const { email } = req.params;
  try {
    const _otp = generateOtp(6);
    const cachedOtp = await redisClient.set(email, JSON.stringify(_otp), {
      EX: 60 * 10,
    });
    if (cachedOtp !== "OK") throw new Error(errorResendingOtp);
  } catch (error) {
    res.status(400).json({
      ststus: false,
      message: error.message || serverError,
    });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = validateLogin(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);
    console.log(email, password);
    const user = await models.Users.findOne({
      where: {
        email,
      },
    });
    console.log(req.body);
    if (!user) throw new Error(userNotFound);

    if (user.is_verified === false) throw new Error(emailHasNotBeenVerified);

    const checkPasssword = await comparePassword(password, user.password_hash);

    if (!checkPasssword) {
      res.status(400);
      throw new Error(invalidCredentials);
    }

    const token = jwt.sign(
      {
        email: user.dataValues.email_address,
        _id: uuidv4(),
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      status: true,
      message: loginMessage,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ststus: false,
      message: error.message || serverError,
    });
  }
};
module.exports = { createUser, addPassword, verifyOtp, resendOtp, Login };
