import { type } from "os";

export type User = {
  id: Number;
  username: String;
  password: String;
};

export type Books = {
  id: Number;
  author: String;
  title: String;
  registered_by: String;
  date_finished: Date;
};
