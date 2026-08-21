const userServices = require("./userServices.js");
const { signToken, verifyToken } = require("../utils/generateToken.js");
const { visibleInfo } = require("../utils/response.js");
const { users } = require("../data/users.js");
const bcrypt = require("bcrypt");

const register = (data) => {
  const user = userServices.createUser(data);
  if (!user.ok) {
    return user;
  }
  const token = signToken(user.data);

  return {
    ok: true,
    data: visibleInfo(user.data),
    token: token,
  };
};

const login = (data) => {
  const user = users.find(
    (u) => u.email.toLowerCase().trim() === data.email.toLowerCase().trim(),
  );
  if (!user) {
    return {
      ok: false,
      error: " no user wth this email",
    };
  }
  const match = bcrypt.compareSync(data.password, user.password);
  if (!match) {
    return {
      ok: false,
      error: "invalid email or password",
    };
  }
  const { password, ...userWithoutPassword } = user;
  const token = signToken(userWithoutPassword);

  return {
    ok: true,
    data: visibleInfo(user),
    token: token,
  };
};

module.exports = { register, login };
