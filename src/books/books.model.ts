import { Book } from "types/types";

const config = require("../../knexfile");
const knex = require("knex")(config);

const booksTable = "books";

export function getAllBooks(): Promise<Array<Book>> {
  return knex.select("*").from(booksTable).catch(console.error);
}

export function getUserBooks(username: String): Promise<Array<Book>> {
  return knex
    .select("*")
    .from(booksTable)
    .where("books.registered_by", username)
    .catch(console.error);
}

export function addNewBook(book: Object): Promise<void> {
  return knex.insert(book).into(booksTable).catch(console.error);
}

export function editBook(id: Number, update: Object): Promise<void> {
  return knex(booksTable)
    .update(update)
    .where("books.id", id)
    .catch(console.error);
}

export function deleteBook(id: Number): Promise<void> {
  return knex(booksTable)
    .select("*")
    .where("books.id", id)
    .del()
    .catch(console.error);
}

export function deleteUserBooks(username: String): Promise<void> {
  return knex(booksTable)
    .select("*")
    .where("books.registered_by", username)
    .del()
    .catch(console.error);
}
