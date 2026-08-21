const { users, nextId } = require("../data/users.js");
const bcrypt = require("bcrypt");
const { visibleInfo } = require("../utils/response.js");

//create a user

const createUser = (data) => {
  const duplicate = users.find(
    (u) => u.email.toLowerCase().trim() === data.email.toLowerCase().trim(),
  );
  if (duplicate) {
    return {
      ok: false,
      error: "user already registered",
    };
  }
  const user = {
    id: nextId(),
    name: data.name,
    email: data.email.toLowerCase(),
    password: bcrypt.hashSync(data.password, 10),
    role: "user",
  };
  users.push(user);
  return {
    ok: true,
    data: visibleInfo(user),
  };
};

//get all users

const getAllUsers = () => {
  return {
    ok: true,
    data: users,
  };
};

const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) {
    return { ok: false, error: "no user found with th given id" };
  }

  const [deleted] = users.splice(index, 1);
  return {
    ok: true,
    data: deleted,
  };
};

const updateUser = (id, data) => {
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) {
    return { ok: false, error: "no user found with the given id" };
  }

  const user = (users[index] = { ...users[index], ...data });
  return {
    ok: true,
    data: user,
  };
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
