export {};

const config = require("../../knexfile");
const knex = require("knex")(config);
const usersTable = "users";

const getAllUsers = () => {
  return knex.select("*").from(usersTable).catch(console.error);
};

const deleteUser = (username: String) => {
  return knex(usersTable)
    .select("*")
    .where("users.username", username)
    .del()
    .catch(console.error);
};

const loginUser = (username: String, password: String) => {
  return knex
    .select("*")
    .from(usersTable)
    .where("users.username", username)
    .andWhere("users.pass", password)
    .first()
    .catch(console.error);
};

const registerNewUser = (userObj: Object) => {
  return knex.insert(userObj).into(usersTable).catch(console.error);
};

module.exports = {
  getAllUsers,
  deleteUser,
  registerNewUser,
  loginUser,
};
