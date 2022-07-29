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

const addNewBook = (book: Object) => {
  return knex.insert(book).into(booksTable).catch(console.error());
};

const editBook = (bookId: Number, update: Object) => {
  return knex(booksTable)
    .update(update)
    .where(bookId, "id")
    .catch(console.error());
};

const deleteBook = (id: Number) => {
  return knex(booksTable)
    .select("*")
    .where("id", id)
    .del()
    .catch(console.error());
};

module.exports = {
  getAllBooks,
  getUserBooks,
  addNewBook,
  editBook,
  deleteBook,
};
