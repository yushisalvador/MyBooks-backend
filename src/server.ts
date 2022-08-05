import routes from "./routes/index";
import { Request, Response, NextFunction } from "express";

const express = require("express");
const cors = require("cors");

export default function buildServer() {
  const app = express();

  function solveCorsIssue(req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://d317g6gtx7oo04.cloudfront.net/"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  }

  app.use(solveCorsIssue);
  app.use(cors());
  app.use(express.json());
  app.use(routes);

  return app;
}
