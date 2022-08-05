import routes from "./routes/index";
import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");

export default function buildServer() {
  const app = express();

  function solveCorsIssue(req: Request, res: Response, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
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
