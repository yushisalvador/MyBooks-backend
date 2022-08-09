const express = require("express");
const router = express.Router();

const booksController = require("../books/books.controller");
const middleware = require("../middleware/middleware");

// @desc Fetch all books
// @access Public
// @route GET /api/books

router.get("/books", booksController.getAllBooks);

// @desc Fetch books for single user
// @access Authenticated users only
// @route GET /api/books/mybooks?username

router.get(
  "/books/mybooks",
  middleware.authenticateFunction,
  booksController.getUserBooks
);

// @desc Add new book to the database
// @access Authenticated users only
// @route POST /api/books

router.post(
  "/books",
  middleware.authenticateFunction,
  booksController.addNewBook
);

// @desc Update date_finished for a single book
// @access Authenticated users only
// @route PUT /api/books/:id

router.put(
  "/books/:id",
  middleware.authenticateFunction,
  booksController.editBook
);

// @desc Delete single book
// @access Authenticated users only
// @route DELETE /api/books/:id

router.delete(
  "/books/:id",
  middleware.authenticateFunction,
  booksController.deleteBook
);

// @desc Delete all books under user's account
// @access Authenticated users only
// @route PUT /api/books/mybooks?username=

router.delete(
  "/books/mybooks",
  middleware.authenticateFunction,
  booksController.deleteUserBooks
);

export default router;
