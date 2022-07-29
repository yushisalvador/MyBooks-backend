import { Request, Response } from "express";

const bookModel = require("./books.model.ts");

module.exports = {
  async getAllBooks(req: Request, res: Response) {
    const allBooks = await bookModel.getAllBooks;
    res.send(allBooks);
  },
};
