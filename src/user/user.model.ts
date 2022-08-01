export {};

const config = require("../../knexfile");
const knex = require("knex")(config);
const usersTable = "users";

const getAllUsers = () => {
  return knex.select("*").from(usersTable).catch(console.error());
};

const deleteUser = (username: String) => {
  return knex(usersTable)
    .select("*")
    .where("users.username", username)
    .del()
    .catch(console.error());
};

module.exports = {
  getAllUsers,
  deleteUser,
};
