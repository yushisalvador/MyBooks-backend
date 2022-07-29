import { Router, Request, Response } from "express";

const booksController = require("../books/books.controller");
const router = Router();

router.get("/", booksController.getUserBooks);

export default router;
