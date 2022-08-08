const express = require("express");
const router = express.Router();

const booksController = require("../books/books.controller");
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
router.post("/", middleware.authenticateFunction, booksController.addNewBook);

//Put
//can only edit date_finished
router.put("/", middleware.authenticateFunction, booksController.editBook);
// Delete req
//delete single book
router.delete("/", middleware.authenticateFunction, booksController.deleteBook);
//deletes all books in user's name
router.delete(
  "/mybooks",
  middleware.authenticateFunction,
  booksController.deleteUserBooks
);

export default router;
