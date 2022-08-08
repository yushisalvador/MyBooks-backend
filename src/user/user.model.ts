export {};

const config = require("../../knexfile");
const knex = require("knex")(config);
const usersTable = "users";
const tokensTable = "tokens";

export function getAllUsers() {
  return knex.select("*").from(usersTable).catch(console.error);
}

export function deleteUser(username: String) {
  return knex(usersTable)
    .select("*")
    .where("users.username", username)
    .del()
    .catch(console.error);
}

export function getUser(username: String, password: String) {
  return knex
    .select("*")
    .from(usersTable)
    .where("users.username", username)
    .first()
    .catch(console.error);
}

export function registerNewUser(userObj: Object) {
  return knex.insert(userObj).into(usersTable).catch(console.error);
}

export function logout(id: Number) {
  return knex.select("*").from(tokensTable).where("user_id", id).del();
}
