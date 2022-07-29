const config = require("../../knexfile");
const knex = require("knex")(config);

const booksTable = "books";

const getAllBooks = () => {
  return knex.select("*").from(booksTable).catch(console.error());
};

const getUserBooks = (username: String) => {
  return knex
    .select("*")
    .from(booksTable)
    .where("registered_by", username)
    .catch(console.error());
};

module.exports = {
  getAllBooks,
  getUserBooks,
};
