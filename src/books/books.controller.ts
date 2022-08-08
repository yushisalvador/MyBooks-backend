import { Request, Response } from "express";

const bookModel = require("./books.model.ts");

export const getAllBooks = async (req: Request, res: Response) => {
  const allBooks = await bookModel.getAllBooks();
  res.send(allBooks);
};

export const getUserBooks = async (req: Request, res: Response) => {
  const username = req.query.username;
  const userBooks = await bookModel.getUserBooks(username);
  res.send(userBooks);
};

export const addNewBook = async (req: Request, res: Response) => {
  if (req.body.author && req.body.title) {
    const bookObj = {
      author: req.body.author,
      title: req.body.title,
      date_finished: req.body.date_finished,
      registered_by: req.body.registered_by,
    };
    await bookModel.addNewBook(bookObj);
    res.status(200).send("done!");
  } else {
    res.status(404).send("title and author are required!");
  }
};

export const editBook = async (req: Request, res: Response) => {
  const id = req.query.id;
  if (req.body.date_finished) {
    const newObj = {
      date_finished: req.body.date_finished,
    };

    await bookModel.editBook(id, newObj);
    res.status(200).send("edit  done!");
  } else {
    res.status(404).send("No content");
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = req.query.id;
  await bookModel.deleteBook(id);
  res.status(200).send("done!");
};

export const deleteUserBooks = async (req: Request, res: Response) => {
  const username = req.query.username;
  await bookModel.deleteUserBooks(username);
  res.status(200).send("done!");
};
