const { failure } = require("../utils/response.js");

const roleCheck = (...allowedRole) => {
  const result = (req, res, next) => {
    if (!allowedRole.includes(req.user.role)) {
      return failure(res, `access forbidden requires ${allowedRole} role`, 403);
    }
    next();
  };
  return result;
};

module.exports = roleCheck;
