import routes from "./routes/index";
import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");

export default function buildServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  return app;
}
