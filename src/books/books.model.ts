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
    .where("books.registered_by", username)
    .catch(console.error());
};

const addNewBook = (book: Object) => {
  return knex.insert(book).into(booksTable).catch(console.error());
};

const editBook = (id: Number, update: Object) => {
  return knex(booksTable)
    .update(update)
    .where("books.id", id)
    .catch(console.error());
};

const deleteBook = (id: Number) => {
  return knex(booksTable)
    .select("*")
    .where("books.id", id)
    .del()
    .catch(console.error());
};

const deleteUserBooks = (username: String) => {
  return knex(booksTable)
    .select("*")
    .where("books.registered_by", username)
    .del()
    .catch(console.error());
};

module.exports = {
  getAllBooks,
  getUserBooks,
  addNewBook,
  editBook,
  deleteBook,
  deleteUserBooks,
};
