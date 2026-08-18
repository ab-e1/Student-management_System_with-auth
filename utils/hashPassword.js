const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

module.exports = hashPassword;
