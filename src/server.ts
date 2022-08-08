import routes from "./routes/index";
import { Request, Response, NextFunction } from "express";

const express = require("express");
const cors = require("cors");

export default function buildServer() {
  const app = express();

  app.get("/", (req: Request, res: Response) => {
    res.redirect("https://little-world-of-books.netlify.app");
  });
  app.use(cors());
  app.use(express.json());
  app.use(routes);

  return app;
}
