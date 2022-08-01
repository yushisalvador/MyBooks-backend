import request from "supertest";
import buildServer from "server";
import { expect } from "chai";
const bookModel = require("../../../../src/books/books.model");
const fixtures = require("../fixtures.ts");
const app = buildServer();

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
  before(async () => {
    await request(app).delete("/books/mybooks?username=test_user");
  });

  after(async () => {
    await request(app).delete("/books/mybooks?username=test_user");
  });

  it("should increment the length of the books in the db ", async () => {
    const fixturesObj = fixtures.getBook();
    const res1 = await request(app).get("/books");
    const numBooksBefore = res1.body.length;
    await request(app).post("/books").send(fixturesObj);
    const res2 = await request(app).get("/books");
    const numBooksAfter = res2.body.length;

    expect(numBooksAfter).greaterThan(numBooksBefore);
  });
});

describe("DELETE /books routes", () => {
  let id: Number;
  before(async () => {
    const addBook = await fixtures.getBook();
    await request(app).post("/books").send(addBook);
    const currBooks = await request(app).get(
      "/books/mybooks?username=test_user"
    );
    const idArr = await currBooks.body.map((book: any) => book.id);
    id = idArr[0];
  });

  after(async () => {
    await request(app).delete("/books/mybooks?username=test_user");
  });

  it("should decrease the length of the books in the db", async () => {
    const res1 = await request(app).get("/books");
    const prevLength = res1.body.length;
    console.log("id", id);
    await request(app).delete(`/books?id=${id}`);
    const res2 = await request(app).get("/books");
    const afterLength = res2.body.length;

    expect(afterLength).lessThan(prevLength);
  });
});
