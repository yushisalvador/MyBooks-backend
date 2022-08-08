const config = require("../../knexfile");
const knex = require("knex")(config);

const booksTable = "books";

export const getAllBooks = () => {
  return knex.select("*").from(booksTable).catch(console.error);
};

export const getUserBooks = (username: String) => {
  return knex
    .select("*")
    .from(booksTable)
    .where("books.registered_by", username)
    .catch(console.error);
};

export const addNewBook = (book: Object) => {
  return knex.insert(book).into(booksTable).catch(console.error);
};

export const editBook = (id: Number, update: Object) => {
  return knex(booksTable)
    .update(update)
    .where("books.id", id)
    .catch(console.error);
};

export const deleteBook = (id: Number) => {
  return knex(booksTable)
    .select("*")
    .where("books.id", id)
    .del()
    .catch(console.error);
};

export const deleteUserBooks = (username: String) => {
  return knex(booksTable)
    .select("*")
    .where("books.registered_by", username)
    .del()
    .catch(console.error);
};
