const authServices = require("../services/authServices.js");
const { success, failure } = require("../utils/response.js");

const register = (req, res) => {
  const result = authServices.register(req.body);
  if (!result.ok) {
    return failure(res, result.error, 400);
  }
  return success(res, result.data, 201, result.token);
};

const login = (req, res) => {
  const result = authServices.login(req.body);
  if (!result.ok) {
    return failure(res, result.error, 400);
  }
  return success(res, result.data, 200, result.token);
};
const logout = (req, res) => {
  return success(res, { message: "logout succesfull" });
};
const me = (req, res) => {
  return success(res, req.user);
};

module.exports = { register, login, logout, me };
