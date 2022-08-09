import { Request, Response } from "express";

const bookModel = require("./books.model.ts");

export async function getAllBooks(req: Request, res: Response) {
  const allBooks = await bookModel.getAllBooks();
  res.send(allBooks);
}

export async function getUserBooks(req: Request, res: Response) {
  const username = req.query.username;
  const userBooks = await bookModel.getUserBooks(username);
  res.send(userBooks);
}

export async function addNewBook(req: Request, res: Response) {
  if (req.body.author && req.body.title && req.body.registered_by) {
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
}

export async function editBook(req: Request, res: Response) {
  const id = req.params.id;
  if (req.body.date_finished) {
    const newObj = {
      date_finished: req.body.date_finished,
    };

    await bookModel.editBook(id, newObj);
    res.status(200).send("edit  done!");
  } else {
    res.status(404).send("No content");
  }
}

export async function deleteBook(req: Request, res: Response) {
  const id = req.params.id;
  await bookModel.deleteBook(id);
  res.status(200).send("done!");
}

export async function deleteUserBooks(req: Request, res: Response) {
  const username = req.query.username;
  await bookModel.deleteUserBooks(username);
  res.status(200).send("done!");
}
