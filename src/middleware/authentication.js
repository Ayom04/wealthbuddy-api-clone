const authorization = require("./authorization");
const { unauthorized, serverError } = require("../constant/messages");
const models = require("../../models");
const authentication = async (req, res, next) => {
  const email = req.params.userEmail;
  try {
    const userData = await models.Users.findOne({ email_address: email });

    if (!userData) throw new Error(unauthorized);
    req.params.user_id = userData.user_id;
    console.log(req.params.user_id);
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
module.exports = authentication;
