export {};
import { User, Token } from "../types/types";

const config = require("../../knexfile");
const knex = require("knex")(config);
const usersTable = "users";
const tokensTable = "tokens";

export function getAllUsers(): Promise<Array<User>> {
  return knex.select("*").from(usersTable).catch(console.error);
}

export function deleteUser(username: String): Promise<void> {
  return knex(usersTable)
    .select("*")
    .where("users.username", username)
    .del()
    .catch(console.error);
}

export function getUser(username: String): Promise<Array<User>> {
  return knex
    .select("*")
    .from(usersTable)
    .where("users.username", username)
    .first()
    .catch(console.error);
}

export function registerNewUser(userObj: Object): Promise<void> {
  return knex.insert(userObj).into(usersTable).catch(console.error);
}

export function logout(id: Number): Promise<void> {
  return knex.select("*").from(tokensTable).where("user_id", id).del();
}

export function getRefreshToken(refreshToken: String): Promise<Array<Token>> {
  return knex
    .select("*")
    .from(tokensTable)
    .where("tokens.refreshToken", refreshToken);
}
