require("dotenv").config();

import request from "supertest";
import buildServer from "../../../../src/server";
import { expect } from "chai";
import { Book } from "../../../../src/types/types";

const app = buildServer();
const fixtures = require("../fixtures.ts");
const token = process.env.token;
const auth = { Authorization: "Bearer " + token };

describe("GET /books routes", () => {
  it("should respond with 200", async () => {
    const res = await request(app).get("/books");

    expect(res.statusCode).equals(200);
  });

  it("should respond with 200 when retrieving books for a single user", async () => {
    const res = await request(app)
      .get("/books/mybooks?username=caoh_the_nerd")
      .set(auth);

    expect(res.statusCode).equals(200);
  });

  it("should respond with 403 when retrieving books for a single user, and no header is sent", async () => {
    const res = await request(app).get("/books/mybooks?username=caoh_the_nerd");

    expect(res.statusCode).equals(403);
  });

  it("should return the array of books owned by the user", async () => {
    const expected = [
      {
        id: 3,
        author: "James Clear",
        title: "Atomic Habits",
        date_finished: "2022-05-22T15:00:00.000Z",
        registered_by: "crazy_toffer",
      },
    ];

    const res = await request(app)
      .get("/books/mybooks?username=crazy_toffer")
      .set(auth);

    expect(res.body).to.deep.equal(expected);
    expect(res.statusCode).equals(200);
  });
});

describe("POST /books routes", () => {
  before(async () => {
    await request(app).delete("/books/mybooks?username=test_user").set(auth);
  });

  after(async () => {
    await request(app).delete("/books/mybooks?username=test_user").set(auth);
  });

  it("should increment the length of the books in the db ", async () => {
    const res1 = await request(app).get("/books");
    const numBooksBefore = res1.body.length;

    const book = fixtures.getBook();
    await request(app).post("/books").send(book);

    const res2 = await request(app).get("/books");
    const numBooksAfter = res2.body.length;

    expect(numBooksAfter).greaterThan(numBooksBefore);
  });

  it("should return status 404 when no author or title is entered", async () => {
    const postObj1 = {
      author: null,
      title: "JLPT N4 Book",
    };
    const postObj2 = {
      author: "Stephen King",
      title: null,
    };

    const res1 = await request(app).post("/books").send(postObj1);
    const res2 = await request(app).post("/books").send(postObj2);

    expect(res1.statusCode).equals(404);
    expect(res2.statusCode).equals(404);
  });
});

describe("DELETE /books routes", () => {
  let id: Number;
  const addBook = fixtures.getBook();

  before(async () => {
    await request(app).post("/books").send(addBook);
    const currBooks = await request(app)
      .get(`/books/mybooks?username=${addBook.registered_by}`)
      .set(auth);

    const idArr = await currBooks.body.map((book: Book) => book.id);
    id = idArr[0];
  });

  after(async () => {
    await request(app).delete(
      `/books/mybooks?username=${addBook.registered_by}`
    );
  });

  it("should decrease the length of the books in the db", async () => {
    const res1 = await request(app).get("/books");
    const prevLength = res1.body.length;

    await request(app).delete(`/books?id=${id}`);

    const res2 = await request(app).get("/books");
    const afterLength = res2.body.length;

    expect(afterLength).lessThan(prevLength);
  });
});

describe("PUT books", () => {
  const addBook = fixtures.getBook();
  const editObj = {
    date_finished: "2022-03-22T15:00:00.000Z",
  };

  beforeEach(async () => {
    await request(app).post("/books").send(addBook);
  });

  afterEach(async () => {
    await request(app)
      .delete(`/books/mybooks?username=${addBook.registered_by}`)
      .set(auth);
  });

  it("should return status 200 when the edit is success", async () => {
    const currBooks = await request(app)
      .get(`/books/mybooks?username=${addBook.registered_by}`)
      .set(auth);

    const idArr = await currBooks.body.map((book: Book) => book.id);
    const id = idArr[0];

    const edit = await request(app).put(`/books?id=${id}`).send(editObj);

    expect(edit.statusCode).equals(200);
  });

  it("should modify the object", async () => {
    const currBooks = await request(app)
      .get(`/books/mybooks?username=${addBook.registered_by}`)
      .set(auth);

    const idArr = await currBooks.body.map((book: Book) => book.id);
    const id = idArr[0];
    await request(app).put(`/books?id=${id}`).send(editObj);

    const afterBooks = await request(app)
      .get(`/books/mybooks?username=${addBook.registered_by}`)
      .set(auth);

    expect(afterBooks.body).to.not.deep.equal(currBooks.body);
  });

  it("should return status 204 when body is empty", async () => {
    const currBooks = await request(app)
      .get(`/books/mybooks?username=${addBook.registered_by}`)
      .set(auth);

    const idArr = await currBooks.body.map((book: Book) => book.id);
    const id = idArr[0];
    const res = await request(app)
      .put(`/books?id=${id}`)
      .send({ date_finished: null });

    expect(res.statusCode).equals(404);
  });
});
