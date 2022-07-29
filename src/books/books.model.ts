const config = require("../../knexfile");
const knex = require("knex")(config);

const booksTable = "books";

const getAllBooks = () => {
  return knex.select("*").from(booksTable).catch(console.error());
};
