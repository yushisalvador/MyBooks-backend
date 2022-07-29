import { Request, Response } from "express";

const bookModel = require("./books.model.ts");

module.exports = {
  async getAllBooks(req: Request, res: Response) {
    const allBooks = await bookModel.getAllBooks();
    res.send(allBooks);
  },
  async getUserBooks(req: Request, res: Response) {
    const username = req.query.username;
    const userBooks = await bookModel.getUserBooks(username);
    res.send(userBooks);
  },
};
