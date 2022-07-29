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

  async addNewBook(req: Request, res: Response) {
    const bookObj = {
      author: req.body.author,
      title: req.body.title,
      date_finished: req.body.date_finished,
      registered_by: req.body.username,
    };

    await bookModel.addNewBook(bookObj);
    res.status(200).send("done!");
  },

  async deleteBook(req: Request, res: Response) {
    const id = req.query.id;
    await bookModel.deleteBook(id);
    res.status(200).send("done!");
  },
};
