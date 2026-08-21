const { success, failure } = require("../utils/response.js");
const studentServices = require("../services/studentServices.js");

const createStudent = (req, res) => {
  const result = studentServices.createStudent(req.body);
  if (!result.ok) {
    return failure(res, result.error, 409);
  }
  return success(res, result.data, 201);
};

const updateStudent = (req, res) => {
  const result = studentServices.updateStudent(req.params.id, req.body);
  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const deleteStudent = (req, res) => {
  const result = studentServices.deleteStudent(req.params.id);
  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const getAllStudents = (req, res) => {
  const result = studentServices.getAllStudent(req.query);
  return success(res, result.data);
};

const getStudentById = (req, res) => {
  const result = studentServices.getStudentById(req.params.id);
  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const getStats = (req, res) => {
  const result = studentServices.getStats();
  return success(res, result.data);
};

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  getStats,
};
