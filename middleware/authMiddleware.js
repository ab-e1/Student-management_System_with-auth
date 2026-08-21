const { verifyToken } = require("../utils/generateToken.js");
const { failure } = require("../utils/response.js");

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return failure(res, "no token provided", 401);
  }
  const token = header.split(" ")[1];
  try {
    const verifiedHeader = verifyToken(token);
    req.user = verifiedHeader;
    next();
  } catch (err) {
    return failure(res, "invalid token or expired", 401);
  }
};

module.exports = auth;
