const jwt = require("jsonwebtoken");
const { unauthorized } = require("../constant/messages");

const authorization = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw new Error(unauthorized);

    const tokenSplit = authorization.split(" ");
    console.log(authorization);
    jwt.verify(tokenSplit[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw new Error(unauthorized);

      req.params.userEmail = decoded.email;
      console.log("here", decoded.email);
      next();
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
module.exports = authorization;
