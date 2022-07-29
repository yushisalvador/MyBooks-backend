import request from "supertest";
import buildServer from "server";
import { response } from "express";
import { expect } from "chai";

const app = buildServer();

const bookModel = require("../../../../src/books/books.model");
const bookTable = bookModel.booksTable;

describe("books routes", () => {
  it("should respond with 200", (done) => {
    request(app).get("/books").expect(200, done);
  });

  it("should respond with 200 when retrieving books for a single user", (done) => {
    request(app).get("/books/mybooks?username=caoh_the_nerd").expect(200, done);
  });

  it("should return the right book array", (done) => {
    const expected = [
      {
        id: 3,
        author: "James Clear",
        title: "Atomic Habits",
        date_finished: "2022-05-22T15:00:00.000Z",
        registered_by: "crazy_toffer",
      },
    ];
    request(app)
      .get("/books/mybooks?username=crazy_toffer")
      .expect(200, expected, done);
  });
});
