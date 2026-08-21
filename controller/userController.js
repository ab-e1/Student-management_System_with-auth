const { success, failure } = require("../utils/response.js");
const userServices = require("../services/userServices.js");

const createUser = (req, res) => {
  const result = userServices.createUser(req.body);
  if (!result.ok) {
    return failure(res, result.error, 401);
  }
  return success(res, result.data);
};

const updateUser = (req, res) => {
  const result = userServices.updateUser(req.params.id, req.body);
  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const deleteUser = (req, res) => {
  const result = userServices.deleteUser(req.params.id);
  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const getAllUsers = (req, res) => {
  const result = userServices.getAllUsers();
  return success(res, result.data);
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
