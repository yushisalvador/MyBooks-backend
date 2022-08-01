import { Router, Request, Response } from "express";

const booksController = require("../books/books.controller");
const router = Router();

//Get req
router.get("/", booksController.getAllBooks);
router.get("/mybooks", booksController.getUserBooks);

// Post req
router.post("/", booksController.addNewBook);

// Delete req
router.delete("/", booksController.deleteBook);
router.delete("/mybooks", booksController.deleteUserBooks);

export default router;
