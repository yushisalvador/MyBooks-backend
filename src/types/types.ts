import { type } from "os";

export type User = {
  id: Number;
  username: String;
  pass: String;
};

export type Book = {
  id: Number;
  author: String;
  title: String;
  registered_by: String;
  date_finished: Date;
};

export type Token = {
  id: Number;
  refreshToken: String;
};
