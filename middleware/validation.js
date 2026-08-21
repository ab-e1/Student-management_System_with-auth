const { failure } = require("../utils/response.js");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return failure(res, "missing required fields");
  }
  if (typeof name !== "string" || typeof email !== "string") {
    return failure(res, "name , email should be a string");
  }
  if (name.trim() === "" || email.trim() === "") {
    return failure(res, "name and email can not be empyt");
  }
  if (!emailRegex.test(email)) {
    return failure(
      res,
      "email should be in a valid email form and must conatain @",
    );
  }
  const passwordError = validatePassword(password);
  if (passwordError.length > 0) {
    return failure(res, passwordError.join(", "));
  }
  next();
};
// validate student

const validateStudent = (req, res, next) => {
  const { name, email, age, course, gpa, status } = req.body;
  if (!name || !email || !age || !course || !gpa || !status) {
    return failure(res, "missing required fields");
  }
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof course !== "string" ||
    typeof status !== "string"
  ) {
    return failure(res, "name , email, course, and satus should be strings");
  }
  if (
    name.trim() === "" ||
    email.trim() === "" ||
    course.trim() === "" ||
    status.trim() === ""
  ) {
    return failure(res, "fileds can not be empty");
  }
  if (status !== "active" && status !== "inactive") {
    return failure(res, "status should be either active or inactive.");
  }
  if (typeof age !== "number" || typeof gpa !== "number") {
    return failure(res, "age and gpa should be a number");
  }
  if (age <= 0) {
    return failure(res, "age should be a positive number ");
  }
  if (gpa < 0 || gpa > 4.0) {
    return failure(res, "gpa should be non negative and less than 4");
  }
  next();
};

const validatePassword = (password) => {
  let error = [];
  if (password.length < 8) {
    error.push("password must be aleast 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    error.push("password must conatain atleast one capital letter");
  }
  if (!/[a-z]/.test(password)) {
    error.push("password must contain atleast one small letter");
  }
  if (!/\d/.test(password)) {
    error.push("password must contain atleast one number");
  }
  if (!/[#!?#@$%^*-_]/.test(password)) {
    error.push("password must conatain at least one special character");
  }

  return error;
};

module.exports = { validateUser, validateStudent };
