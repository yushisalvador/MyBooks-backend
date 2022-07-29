import request from "supertest";
import buildServer from "server";
const app = buildServer();

const bookModel = require("../../../../src/books/books.model");
const bookTable = bookModel.booksTable;

describe("books routes", () => {
  it("should repsond with 200", (done) => {
    request(app).get("/books").expect(200, done);
  });
});
