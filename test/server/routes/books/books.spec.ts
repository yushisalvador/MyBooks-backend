import request from "supertest";
import buildServer from "server";
import { expect } from "chai";

const app = buildServer();

const bookModel = require("../../../../src/books/books.model");

describe("GET /books routes", () => {
  it("should respond with 200", (done) => {
    request(app).get("/books").expect(200, done);
  });

  it("should respond with 200 when retrieving books for a single user", (done) => {
    request(app).get("/books/mybooks?username=caoh_the_nerd").expect(200, done);
  });

  it("should return the array of books owned by the user", (done) => {
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

describe("POST /books routes", () => {
  it("should increment the length of the books in the db", async () => {
    const newBook = {
      author: "Stephenie Meyer",
      title: "Twilight",
      registered_by: "crazy_toffer",
    };
    const res1 = await request(app).get("/books");
    const numBooksBefore = res1.body.length;
    await request(app).post("/books").send(newBook);
    const res2 = await request(app).get("/books");
    const numBooksAfter = res2.body.length;
    expect(numBooksAfter).equals(numBooksBefore + 1);
  });
});
