const { failure } = require("../utils/response.js");
const errorHandeler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    ok: false,
    error: err.message || "internal server error",
  });
};
module.exports = errorHandeler;
