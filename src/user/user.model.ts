export {};

const config = require("../../knexfile");
const knex = require("knex")(config);
const usersTable = "users";
const tokensTable = "tokens";

export const getAllUsers = () => {
  return knex.select("*").from(usersTable).catch(console.error);
};

export const deleteUser = (username: String) => {
  return knex(usersTable)
    .select("*")
    .where("users.username", username)
    .del()
    .catch(console.error);
};

export const getUser = (username: String, password: String) => {
  return knex
    .select("*")
    .from(usersTable)
    .where("users.username", username)
    .first()
    .catch(console.error);
};

export const registerNewUser = (userObj: Object) => {
  return knex.insert(userObj).into(usersTable).catch(console.error);
};

export const logout = (id: Number) => {
  return knex.select("*").from(tokensTable).where("user_id", id).del();
};

module.exports = {
  getAllUsers,
  deleteUser,
  registerNewUser,
  getUser,
  logout,
};
