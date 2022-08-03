import { Router, Request, Response } from "express";

const booksController = require("../books/books.controller");
const router = Router();
const middleware = require("../middleware/middleware");
//Get req
router.get("/", booksController.getAllBooks);

// protected so only verified user can see
router.get(
  "/mybooks",
  middleware.authenticateFunction,
  booksController.getUserBooks
);

// Post req
router.post("/", booksController.addNewBook);

//Put
//can only edit date_finished
router.put("/", booksController.editBook);
// Delete req
//delete single book
router.delete("/", booksController.deleteBook);
//deletes all books in user's name
router.delete("/mybooks", booksController.deleteUserBooks);

export default router;
