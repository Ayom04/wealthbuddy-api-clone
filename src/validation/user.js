const Joi = require("joi");
const validateCreateAccount = (data) => {
  const validateRegisterUser = Joi.object({
    lastName: Joi.string().min(3).required(),
    firstName: Joi.string().min(3).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone_number: Joi.string().min(11).required(),
    referral_code: Joi.string().min(5),
  });
  return validateRegisterUser.validate(data);
};
const validatePassword = (data) => {
  const passwordValidation = Joi.object({
    password: Joi.string()
      .min(8)
      .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
      .required()
      .label("Password")
      .messages({
        "string.empty": `"Password" cannot be an empty`,
        "string.min": `"Password" should have a minimum length of {#limit}`,
        "any.required": `"Password" is a required field`,
        "object.regex": `Must have at least 8 characters`,
        "string.pattern.base": `Password must contain at least a number, letter and special characters`,
      }),
    comfirmPassword: Joi.string()
      .min(8)
      .valid(Joi.ref("password"))
      .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
      .required()
      .label("Password")
      .messages({
        "string.empty": `"Password" cannot be an empty`,
        "string.min": `"Password" should have a minimum length of {#limit}`,
        "any.required": `"Password" is a required field`,
        "object.regex": `Must have at least 8 characters`,
        "string.pattern.base": `Password must contain at least a number, letter and special characters`,
      }),
    email: Joi.string(),
  });
  return passwordValidation.validate(data);
};
const validateLogin = (data) => {
  const loginValidation = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
      .required()
      .label("Password")
      .messages({
        "string.empty": `"Password" cannot be an empty`,
        "string.min": `"Password" should have a minimum length of {#limit}`,
        "any.required": `"Password" is a required field`,
        "object.regex": `Must have at least 8 characters`,
        "string.pattern.base": `Password must contain at least a number, letter and special characters`,
      }),
  });
  return loginValidation.validate(data);
};
module.exports = { validateCreateAccount, validatePassword, validateLogin };
