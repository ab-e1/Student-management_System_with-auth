const users = [
  {
    id: 1,
    name: "first user",
    email: "firstUser@email.com",
    password: bcrypt.hashSync("buhedered123", 10),
    role: "user",
  },

  {
    id: 2,
    name: "admin user",
    email: "admin@email.com",
    password: bcrypt.hashSync("akukulualnegam1234", 10),
    role: "admin",
  },
];
const nextId = () => {
  return users.length ? Math.max(users.map((s) => s.id)) + 1 : 1;
};
module.exports = { users, nextId };
